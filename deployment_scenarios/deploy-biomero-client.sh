#!/bin/bash
trap "exit" INT

# Load environment variables
source .env

# Stop and remove existing containers if they are running
containers=(
    "${CONTAINER_BIOMEROWORKER}" 
    "${CONTAINER_OMEROWEB}"
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
    "$(pwd)/logs/${CONTAINER_BIOMEROWORKER}"
    "$(pwd)/logs/${CONTAINER_OMEROWEB}"
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
echo "Creating biomero network..."
podman network rm ${BIOMERO_NETWORK_NAME} 2>/dev/null || true
podman network create --driver bridge ${BIOMERO_NETWORK_NAME}

#### Run the biomeroworker container ####
echo "Starting BIOMERO worker..."
podman run -d --rm --name ${CONTAINER_BIOMEROWORKER} \
  -e CONFIG_omero_master_host="${EXTERNAL_OMERO_HOST}" \
  -e CONFIG_omero_master_port="${EXTERNAL_OMERO_PORT}" \
  -e OMERO_WORKER_NAME="${CONTAINER_BIOMEROWORKER}" \
  -e CONFIG_omero_logging_level=10 \
  -e CONFIG_omero_scripts_timeout="${CONFIG_OMERO_SCRIPTS_TIMEOUT}" \
  -e PERSISTENCE_MODULE="eventsourcing_sqlalchemy" \
  -e SQLALCHEMY_URL="${BIOMERO_SQLALCHEMY_URL}" \
  -e OMERO_USER="${EXTERNAL_OMERO_USER}" \
  -e OMERO_PASSWORD="${EXTERNAL_OMERO_PASSWORD}" \
  --network ${BIOMERO_NETWORK_NAME} \
  --volume "${OMERO_DATA_PATH}":/OMERO:z \
  --volume ~/.ssh:/tmp/.ssh:ro \
  --volume "./web/slurm-config.ini:/opt/omero/server/slurm-config.ini:rw" \
  --volume "${IMPORT_DATA_PATH}":/data \
  --volume "./biomeroworker/99-run-external.sh:/startup/99-run.sh:ro" \
  --volume "$(pwd)/logs/${CONTAINER_BIOMEROWORKER}:/opt/omero/server/OMERO.server/var/log:Z" \
  --userns=keep-id:uid=${OMERO_SERVER_UID},gid=${OMERO_SERVER_GID} \
  cellularimagingcf/biomero:"$NL_BIOMERO_VERSION"

#### Run the omeroweb container ####
echo "Starting OMERO web..."
podman run -d --rm --name ${CONTAINER_OMEROWEB} \
  -e OMEROHOST="${EXTERNAL_OMERO_HOST}" \
  -e OMEROPORT="${EXTERNAL_OMERO_PORT}" \
  -e ENV="TEST" \
  -e ROOTPASS="${EXTERNAL_OMERO_PASSWORD}" \
  --network ${BIOMERO_NETWORK_NAME} \
  --volume "$(pwd)/logs/${CONTAINER_OMEROWEB}:/opt/omero/web/OMERO.web/var/log:Z" \
  --volume "./web/slurm-config.ini:/opt/omero/web/OMERO.web/var/slurm-config.ini:rw" \
  --volume "${IMPORT_DATA_PATH}":/data:rw \
  --userns=keep-id:uid=${OMERO_WEB_UID},gid=${OMERO_WEB_GID} \
  -p "0.0.0.0:${BIOMERO_WEB_HOST_PORT}:4080" \
  cellularimagingcf/omeroweb:"$NL_BIOMERO_VERSION"

# Check status
echo "BIOMERO Client deployment complete!"
podman ps