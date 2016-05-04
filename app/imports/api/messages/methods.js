import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Messages } from './messages.js';

export const insert = new ValidatedMethod({
  name: 'messages.insert',
  validate: new SimpleSchema({
    text: { type: String },
  }).validator(),
  run({ text }) {
    const message = {
      text,
      createdAt: new Date(),
    };

    Messages.insert(message);
  },
});

export const remove = new ValidatedMethod({
  name: 'Messages.remove',
  validate: new SimpleSchema({
    messageId: { type: String },
  }).validator(),
  run({ messageId }) {
    Messages.remove(messageId);
  },
});

// Get list of all method names on Messages
const MESSAGES_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(MESSAGES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
