#!/bin/bash -x

# paths
CURRENT_DIR=$PWD
LOCAL_FOLDER="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd app && pwd )"

# go to the app folder
cd "$PROJECT_ROOT"

# install npm packages
meteor npm install

# run tests
meteor npm run test
if [ "$?" != "0" ]; then
 echo "FAILED DURING APP TESTING"

 # go back to the original location
 cd $CURRENT_DIR

 exit 1
fi

# start meteor
meteor>output & 
METEOR_PID="$!"

# wait until we see app started and remove the output file
timeout 300 grep -q 'App running' <(tail -f output)

# run the tests
"$LOCAL_FOLDER/run_design_tests.sh"
TEST_RETURN_CODE=$?

# kill the meteor app
kill -9 $METEOR_PID
rm -f output

# go back to the original location
cd $CURRENT_DIR

exit $TEST_RETURN_CODE
