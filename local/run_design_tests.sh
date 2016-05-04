#!/bin/bash

# get the root project folder path
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd app && pwd )"
echo "-= Environment Variables =-"
echo "PROJECT_ROOT = $PROJECT_ROOT"
echo ""

# testing functions
RED_COLOR=`tput setaf 1`
GREEN_COLOR=`tput setaf 2`
RESET_COLOR=`tput sgr0`
TEST_COUNT=0
ERROR_COUNT=0
TEST_FAILED="Y"
function process_test_result {
 TEST_NAME="$1"
 TEST_COUNT=$(($TEST_COUNT + 1))
 if [[ "$TEST_FAILED" == "0" || "$TEST_FAILED" == "N" ]]; then
  echo "TEST - $TEST_NAME: ${GREEN_COLOR}PASSED${RESET_COLOR}"
 else
  ERROR_COUNT=$(($ERROR_COUNT + 1))
  echo "TEST - $TEST_NAME: ${RED_COLOR}FAILED${RESET_COLOR}"
 fi
 TEST_FAILED="Y"
}

## REST API TESTS

# TEST: Submit/Post messages
MSG1_ID=$(curl -i -X POST "http://localhost:3000/api/v1/messages/" -d "text=laval" 2>/dev/null | grep "_id" | sed 's/.* "//g' | sed 's/".*//g')
MSG2_ID=$(curl -X POST "http://localhost:3000/api/v1/messages/" -d "text=something" 2>/dev/null | grep "_id" | sed 's/.* "//g' | sed 's/".*//g')
if [[ ! -z "$MSG1_ID" && ! -z "$MSG2_ID" ]]; then TEST_FAILED="N"; fi
process_test_result "REST API - post messages"

# TEST: List received messages
curl -X GET "http://localhost:3000/api/v1/messages/" 2>/dev/null | grep '"status": "success"' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - get message list"

# TEST: Retrieve a specific message
curl -X GET "http://localhost:3000/api/v1/messages/$MSG1_ID" 2>/dev/null | grep '"status": "success"' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - get a message using id"

# TEST: Retrieve a specific message that is missing
curl -X GET "http://localhost:3000/api/v1/messages/MISSING$MSG1_ID" 2>/dev/null | grep '"status": "fail"' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - check that a message is a palindrome"

# TEST: Retrieve a specific message on demand and determine that it is not a palindrome
curl -X GET "http://localhost:3000/api/v1/messages/$MSG2_ID/is_palindrome" 2>/dev/null | grep '"palindrome": false' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - check that a message is not a palindrome"

# TEST: Delete specified message
curl -X DELETE "http://localhost:3000/api/v1/messages/$MSG2_ID" 2>/dev/null | grep '"status": "success"' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - delete a message using id"

# TEST: Delete specified message that is missing
curl -X DELETE "http://localhost:3000/api/v1/messages/$MSG2_ID" 2>/dev/null | grep '"status": "fail"' 1>/dev/null && TEST_FAILED="N"
process_test_result "REST API - fail to delete a missing message"


## CLOUD PROVIDER

# REQUIREMENT: provision compute instance programmatically

# REQUIREMENT: application can be reached via a public DNS record


## SERVICE UI INTERACTION

# REQUIREMENT: show list of messages posted by the users

# REQUIREMENT: allow to post new messages

# REQUIREMENT: allow to select a given message to see extra details


# REQUIREMENT: APPLICATION IS DEPLOYED IN A CONTAINER


## EXTRA TESTS

# TEST: has License
if [ -f "$PROJECT_ROOT/../LICENSE" ]; then TEST_FAILED="N"; fi
process_test_result "has license file"

# REQUIREMENT: has code committed to a public GitHub/Bitbucket repository

# TEST: has a README.md file
if [ -f "$PROJECT_ROOT/../README.md" ]; then TEST_FAILED="N"; fi
process_test_result "has a README.md file"

# REQUIREMENT: README.md file contains "Implementation Architecture Description"

# REQUIREMENT: README.md file contains "Use Case Sequence Diagrams"

# REQUIREMENT: README.md file contains "How To: Build, Deploy and Access the App"

# REQUIREMENT: README.md file contains "REST API documentation"


## EVALUATION CRITERIA

# code quality (style, complexity, good practices)

# application architecture (design patterns, modularity)

# API design quality (follows standards and good practice)

# Documentation quality (content quality, completeness and accuracy)

# Deployment automation (reduced number of manual steps)


# test summary
echo ""
echo "-= Design Test Summary =-"
echo "Design Test Count: $TEST_COUNT"
if [ "$ERROR_COUNT" == "0" ]; then
 echo "Failing Test Count: ${GREEN_COLOR}$ERROR_COUNT${RESET_COLOR}"
else
 echo "Failing Test Count: ${RED_COLOR}$ERROR_COUNT${RESET_COLOR}"
fi

# set the amount of error as the return code
exit $ERROR_COUNT
