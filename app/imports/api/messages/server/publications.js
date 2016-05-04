/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Messages } from '../messages.js';

Meteor.publish('messages', function messagesPublic() {
  return Messages.find({}, {
    fields: Messages.publicFields,
  });
});
