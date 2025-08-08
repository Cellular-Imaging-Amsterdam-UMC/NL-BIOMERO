#!/bin/bash
trap "exit" INT

# Load environment variables
source .env

# Stop and remove existing containers if they are running
containers=(
    "${CONTAINER_DATABASE}" 
    "${CONTAINER_OMEROSERVER}"
)

for container in "${containers[@]}"; do
    echo "Checking $container state"
    if podman ps -a --filter "name=$container" | grep -q "$container"; then
        echo "Stopping and forcefully removing $container container..."
        if ! podman rm -f "$container"; then
            echo "Forceful removal failed for $container, retrying with additional kill..."
            podman kill "$container" || true
            podman rm -f "$container"
        fi
    fi
done

# Create log directories
log_dirs=(
    "$(pwd)/logs/${CONTAINER_DATABASE}"
    "$(pwd)/logs/${CONTAINER_OMEROSERVER}"
)

echo "Ensuring log directories exist..."
for dir in "${log_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "Creating directory: $dir"
        mkdir -p "$dir"
    else
        echo "Directory already exists: $dir"
    fi
done

#### Create the required network ####
echo "Creating network..."
podman network rm ${OMERO_NETWORK_NAME} 2>/dev/null || true
podman network create --driver bridge ${OMERO_NETWORK_NAME}

#### Run the database container ####
echo "Starting database..."
podman run -d --rm --name ${CONTAINER_DATABASE} \
  --network=${OMERO_NETWORK_NAME} \
  -e POSTGRES_USER="${POSTGRES_USER}" \
  -e POSTGRES_DB="${POSTGRES_NAME}" \
  -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" \
  -v "${POSTGRES_DATA_PATH}:/var/lib/postgresql/data:z" \
  -v "$(pwd)/logs/${CONTAINER_DATABASE}:/var/lib/postgresql/data/logs:Z" \
  -p "${POSTGRES_HOST_PORT}:5432" \
  postgres:16

#### Run the omeroserver container ####
echo "Starting OMERO server..."
sleep 10
podman run -d --rm --name ${CONTAINER_OMEROSERVER} \
  -e CONFIG_omero_db_host="${CONTAINER_DATABASE}" \
  -e CONFIG_omero_db_user="${POSTGRES_USER}" \
  -e CONFIG_omero_db_pass="${POSTGRES_PASSWORD}" \
  -e CONFIG_omero_db_name="${POSTGRES_NAME}" \
  -e CONFIG_omero_db_poolsize="${CONFIG_OMERO_DB_POOLSIZE}" \
  -e CONFIG_omero_scripts_timeout="${CONFIG_OMERO_SCRIPTS_TIMEOUT}" \
  -e CONFIG_omero_server_nodedescriptors="${CONFIG_OMERO_SERVER_NODEDESCRIPTORS}" \
  -e CONFIG_omero_master_host="${CONFIG_OMERO_MASTER_HOST}" \
  -e ROOTPASS="${OMERO_ROOT_PASSWORD}" \
  --network ${OMERO_NETWORK_NAME} \
  --volume "${OMERO_DATA_PATH}":/OMERO:z \
  --volume "${IMPORT_DATA_PATH}":/data \
  --volume "$(pwd)/logs/${CONTAINER_OMEROSERVER}:/opt/omero/server/OMERO.server/var/log:Z" \
  -p "${OMERO_PORT_UNSECURED}:${OMERO_PORT_UNSECURED}" \
  -p "${OMERO_PORT_SSL}:${OMERO_PORT_SSL}" \
  -p "4061:4061" \
  --userns=keep-id:uid=${OMERO_SERVER_UID},gid=${OMERO_SERVER_GID} \
  cellularimagingcf/omeroserver:"$NL_BIOMERO_VERSION"

# Check status
echo "OMERO Server deployment complete!"
podman ps