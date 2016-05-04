#!/bin/bash -x

# paths
CURRENT_DIR=$PWD
DEPLOY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# go to the app folder
cd "$DEPLOY_DIR/../app"

# build the docker images
APP_NAME="mdicaire/app"
docker-compose -f docker-compose.yml up -d

# go back to the original dir
cd "$CURRENT_DIR"
