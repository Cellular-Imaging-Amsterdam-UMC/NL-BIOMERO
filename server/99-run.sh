#!/bin/bash

set -eu

omero=/opt/omero/server/venv3/bin/omero
cd /opt/omero/server
echo "Starting OMERO.server with targets debug and trace"
exec $omero admin start --foreground debug trace
