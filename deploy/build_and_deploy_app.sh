#!/bin/bash -xe

DEPLOY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# build the docker container
"$DEPLOY_DIR/build_docker.sh"

# deploy the container
"$DEPLOY_DIR/deploy_app.sh"
