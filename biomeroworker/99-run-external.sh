#!/bin/bash
set -eu

omero=/opt/omero/server/venv3/bin/omero
cd /opt/omero/server

# Get master IP
MASTER_ADDR=$(getent hosts $CONFIG_omero_master_host | cut -d\  -f1)
WORKER_ADDR=$(getent hosts $OMERO_WORKER_NAME | cut -d\  -f1)

# For external worker, use host.docker.internal and exposed port
WORKER_ADDR_H=$MASTER_ADDR
WORKER_PORT="4062"

echo "Master addr: $MASTER_ADDR Worker addr: $WORKER_ADDR:$WORKER_PORT ($WORKER_ADDR_H)"

# Generate worker config with external address and port
cat > OMERO.server/etc/$OMERO_WORKER_NAME.cfg << EOF
# OMERO worker configuration for external worker
IceGrid.Node.Endpoints=tcp -h $WORKER_ADDR -p $WORKER_PORT
IceGrid.Node.Name=$OMERO_WORKER_NAME
IceGrid.Node.Data=var/$OMERO_WORKER_NAME
IceGrid.Node.Output=var/log

Ice.StdOut=var/log/$OMERO_WORKER_NAME.out
Ice.StdErr=var/log/$OMERO_WORKER_NAME.err
EOF

sed \
    -e "s/@omero.master.host@/$MASTER_ADDR/" \
    OMERO.server/etc/templates/ice.config > \
    OMERO.server/etc/ice.config

echo "Starting node $OMERO_WORKER_NAME"
exec $omero node $OMERO_WORKER_NAME start --foreground