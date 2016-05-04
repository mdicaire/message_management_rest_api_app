#!/bin/bash -x

# paths
CURRENT_DIR=$PWD
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# go into the uml generator folder
cd "$SCRIPT_DIR/uml/sequence-diagram-generator"
npm install

# install phantomjs when missing
phantomjs --version 2>/dev/null 1>/dev/null
if [ "$?" != "0" ]; then
 #sudo npm -g install phantomjs-prebuilt
 sudo apt-get install -y phantomjs
fi

# generate the sequence diagram images
./generate-sequence-diagram.js -f ../add_new_message.txt -o ../add_new_message.png
./generate-sequence-diagram.js -f ../is_message_palindrome.txt -o ../is_message_palindrome.png
./generate-sequence-diagram.js -f ../get_all_messages.txt -o ../get_all_messages.png

# go back to the previous path
cd "$CURRENT_DIR"
