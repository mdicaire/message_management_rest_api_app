import { Messages } from '../../messages/messages.js';
import { Restivus } from 'meteor/nimble:restivus';

// Global API configuration
const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  version: 'v1',
});

// Generates: GET, POST on /api/messages and GET, DELETE on
// /api/messages/:id for the Messages collection
Api.addCollection(Messages, {
  excludedEndpoints: ['put'],
  path: 'messages',
});

// Generate route to check if message is a palindrome
Api.addRoute('messages/:_id/is_palindrome', {
  get: {
    action() {
      const id = this.urlParams._id;
      const message = Messages.findOne(id);
      if (message) {
        return { status: 'success', data: { palindrome: message.isPalindrome() } };
      }
      return {
        statusCode: 404,
        body: { status: 'fail', message: 'Message not found' },
      };
    },
  },
});

// / REST API documentation (used by apidocs)
// GET messages
/**
 * @api {get} /api/v1/messages Get Messages
 * @apiVersion 0.1.0
 * @apiExample {curl} Example usage:
 *     curl -i -X GET http://localhost:3000/api/v1/messages
 * @apiName GetMessages
 * @apiGroup Messages
 *
 * @apiSuccess {String} status  REST operation status.
 * @apiSuccess {String} data  List of all messages.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "data": [
 *         {
 *           "_id": "hLRsday5aqhByzqkx",
 *           "text": "laval",
 *           "createdAt": "2016-05-01T00:42:42.553Z"
 *         }
 *       ]
 *     }
 */

// POST messages
/**
 * @api {post} /api/v1/messages Add New Message
 * @apiVersion 0.1.0
 * @apiExample {curl} Example usage:
 *     curl -i -X POST "http://localhost:3000/api/v1/messages/" -d "text=laval"
 * @apiName PostMessage
 * @apiGroup Messages
 *
 * @apiParam {String} text  Content of the message.
 *
 * @apiSuccess {String} status  REST operation status.
 * @apiSuccess {String} data  The message object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "success",
 *       "data": {
 *         "_id": "hLRsday5aqhByzqkx",
 *         "text": "laval",
 *         "createdAt": "2016-05-01T00:42:42.553Z"
 *       }
 *     }
 *
 * @apiError TextIsRequired The text parameter of the message was not provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     Error: Text is required
 */

// GET messages/:_id
/**
 * @api {get} /api/v1/messages/:_id Get Specified Message
 * @apiVersion 0.1.0
 * @apiExample {curl} Example usage:
 *     curl -i -X GET "http://localhost:3000/api/v1/messages/hLRsday5aqhByzqkx"
 * @apiName GetMessage
 * @apiGroup Messages
 *
 * @apiParam {String} _id  The _id of the message.
 *
 * @apiSuccess {String} status  REST operation status.
 * @apiSuccess {String} data  The message object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "data": {
 *         "_id": "hLRsday5aqhByzqkx",
 *         "text": "laval",
 *         "createdAt": "2016-05-01T00:42:42.553Z"
 *       }
 *     }
 *
 * @apiError NotFound The message with the specified _id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "fail",
 *       "message": "Item not found"
 *     }
 */

// GET messages/:_id/is_palindrome
/**
 * @api {get} /api/v1/messages/:_id/is_palindrome Is Specified Message A Palindrome
 * @apiVersion 0.1.0
 * @apiExample {curl} Example usage:
 *     curl -i -X GET "http://localhost:3000/api/v1/messages/hLRsday5aqhByzqkx/is_palindrome"
 * @apiName IsMessagePalindrome
 * @apiGroup Messages
 *
 * @apiParam {String} _id  The _id of the message.
 *
 * @apiSuccess {String} status  REST operation status.
 * @apiSuccess {String} data  Object with key "palindrome" set to either true or false.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "data": {
 *         "palindrome": true
 *       }
 *     }
 *
 * @apiError NotFound The message with the specified _id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "fail",
 *       "message": "Message not found"
 *     }
 */

// DELETE messages/:_id
/**
 * @api {delete} /api/v1/messages Remove Message
 * @apiVersion 0.1.0
 * @apiExample {curl} Example usage:
 *     curl -i -X DELETE http://localhost:3000/api/v1/messages/hLRsday5aqhByzqkx
 * @apiName DeleteMessage
 * @apiGroup Messages
 *
 * @apiParam {String} _id  The _id of the message.
 *
 * @apiSuccess {String} status  REST operation status.
 * @apiSuccess {String} data  Object with key "message" stating the executed operation.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "data": {
 *         "message": "Item removed"
 *       }
 *     }
 *
 * @apiError NotFound The message with the specified _id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "fail",
 *       "message": "Item not found"
 *     }
 */
