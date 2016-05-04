#!/bin/bash -xe

# paths
CURRENT_DIR="$PWD"
LOCAL_FOLDER="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# run tests
"$LOCAL_FOLDER/run_tests.sh"

# build and deploy
"$LOCAL_FOLDER/../deploy/build_and_deploy_app.sh"
