# Message Management REST API App

This app provides a REST API to MongoDB and offers a UI to interact with the server.

You can find the latest code on [GitHub](https://github.com/mdicaire/message_management_rest_api_app)

## Implementation Architecture Description

The app has been designed to expose a REST API interface to manage a collection of messages.

The app uses many different modules and tools to perform the following operations:
- The Restivus module is used to provide the REST API.
- The Blaze module is used to provide a UI to interact with the service.
- Meteor.js, mocha, phantomjs and curl are used to run automated tests.
- Meteor.js, MeteorD and docker are used to build a docker container of the app and deploy it.

The project has been segmented as follows:
- ./app/: Meteor.js app with REST API
- ./deploy/: docker container build and deployment scripts
- ./local/: automated app testing, rest api documentation generation and diagram generation
- ./docs/: generated documentation

## Use Case Sequence Diagrams

### Add New Message
![AddNewMessage](./local/uml/add_new_message.png?raw=true)

### Get All Messages
![GetAllMessages](./local/uml/get_all_messages.png?raw=true)

### Check If Message Is A Palindrome
![IsMessagePalindrome](./local/uml/is_message_palindrome.png?raw=true)

## How To: Build, Test, Deploy and Access the App

### Building

To build the app into a docker container, run the build_docker.sh script under the deploy folder.

```bash
cd "deploy"
./build_docker.sh
```

It is also possible to build and run the app using the meteor app

```bash
cd "app"
meteor
```

### Testing

You can run functional and system tests by running the run_tests.sh script in under the local folder.

```bash
cd "local"
./run_tests.sh
```

Note: the REST API operations will be tested and eslint will also be executed on the app code

### Deployment

You can deploy the previously built docker container after setting your environment to point to your target docker daemon

```bash
cd "deploy"
./deploy_app.sh
```

### Accessing the App

Use your favorite browser or curl to open http://ec2-52-34-65-22.us-west-2.compute.amazonaws.com:3000/ or access its REST API here http://ec2-52-34-65-22.us-west-2.compute.amazonaws.com:3000/api/v1/messages

A UI is provided to interact with the NoSQL/MongoDB storage in addition to the REST API.
The UI:
- shows the list of messages posted by the users
- allows users to post new messages
- allows to select a given message to see extra details at the top of the page

## REST API documentation

Please see ./docs/index.html for the REST API [Documentation](https://cdn.rawgit.com/mdicaire/message_management_rest_api_app/master/docs/index.html)

## Automation

A continuous integration script located in ./local/ci.sh can be used to build, test and deploy the app.

```bash
cd "local"
./ci.sh
```

Note: A non-zero return code will be returned on error.