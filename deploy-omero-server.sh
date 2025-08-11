#!/bin/bash
trap "exit" INT
set -euo pipefail

CONTAINER_DATABASE="${CONTAINER_DATABASE:-postgres-omero}"
CONTAINER_OMEROSERVER="${CONTAINER_OMEROSERVER:-master}"

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
    podman rm -f "$container" || true
  fi
done

mkdir -p "logs/${CONTAINER_OMEROSERVER}"
chmod 777 "logs/${CONTAINER_OMEROSERVER}" || true
chmod +x server/99-run.sh

#### Run the database container ####
echo "Starting database..."
podman run -d --rm --name ${CONTAINER_DATABASE} \
  -e POSTGRES_USER="${POSTGRES_USER:-omero}" \
  -e POSTGRES_DB="${POSTGRES_NAME:-omero}" \
  -e POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-omero}" \
  -v "${POSTGRES_DATA_PATH}:/var/lib/postgresql/data:z" \
  -p "0.0.0.0:5432:5432" \
  postgres:16

#### Run the omeroserver container ####
echo "Starting OMERO server..."
podman run -d --rm --name ${CONTAINER_OMEROSERVER} \
  -e CONFIG_omero_db_host="${CONFIG_OMERO_MASTER_HOST}" \
  -e CONFIG_omero_db_port="${POSTGRES_PORT:-5432}" \
  -e CONFIG_omero_db_user="${POSTGRES_USER:-omero}" \
  -e CONFIG_omero_db_pass="${POSTGRES_PASSWORD:-omero}" \
  -e CONFIG_omero_db_name="${POSTGRES_NAME:-omero}" \
  -e CONFIG_omero_host="${CONFIG_OMERO_MASTER_HOST}" \
  -e CONFIG_omero_server_nodedescriptors="master:Blitz-0,Tables-0,Indexer-0,PixelData-0,DropBox,MonitorServer,FileServer,Storm worker:Processor-0" \
  -e CONFIG_omero_master_host="${CONFIG_OMERO_MASTER_HOST}" \
  -e ROOTPASS="${OMERO_ROOT_PASSWORD:-test}" \
  --volume "${OMERO_DATA_PATH}":/OMERO:z \
  --volume "$(pwd)/logs/${CONTAINER_OMEROSERVER}:/opt/omero/server/OMERO.server/var/log:Z" \
  --volume "$(pwd)/server/99-run.sh:/startup/99-run.sh:ro" \
  --network=host \
  --userns=keep-id:uid=1000,gid=994 \
  openmicroscopy/omero-server:5.6.16

echo "OMERO Server deployment complete!"
podman ps