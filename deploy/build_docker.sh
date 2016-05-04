#!/bin/bash -x

# paths
CURRENT_DIR=$PWD
DEPLOY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# go to the app folder
cd "$DEPLOY_DIR/../app"

# build the docker images
APP_NAME="mdicaire/app"
docker build -t "$APP_NAME" .
BUILD_RC=$?

# go back to the original dir
cd "$CURRENT_DIR"

# provide the build return code
exit $BUILD_RC
