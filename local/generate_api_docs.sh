#!/bin/bash -x

# paths
CURRENT_DIR=$PWD
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd app && pwd )"

# install apidoc
cd "$PROJECT_ROOT"
meteor npm install apidoc

# run apidoc
$(meteor npm bin)/apidoc -i imports/api/ -o ../docs

cd "$CURRENT_DIR"
