import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import faker from 'faker';

export const Messages = new Mongo.Collection('Messages');

// Deny all client-side updates since we will be using methods to manage this collection
Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Messages.schema = new SimpleSchema({
  text: { type: String },
  createdAt: { type: Date, denyUpdate: true, defaultValue: new Date },
});

Messages.attachSchema(Messages.schema);

// This represents the keys from Messages objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Messages.publicFields = {
  text: 1,
  createdAt: 1,
};

Factory.define('message', Messages, {
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

// Allow checking if a string is a palindrome
function palindrome(str) {
    /* remove special characters, spaces and make lowercase */
  const removeChar = str.replace(/[^A-Z0-9]/ig, '').toLowerCase();

    /* reverse removeChar for comparison */
  const checkPalindrome = removeChar.split('').reverse().join('');

    /* check to see if str is a palindrome */
  return (removeChar === checkPalindrome);
}

Messages.helpers({
  isPalindrome() {
    return !this.text || palindrome(this.text);
  },
});
