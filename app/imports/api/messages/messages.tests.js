/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/factory';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from './messages.js';

if (Meteor.isServer) {
  require('./server/publications.js');

  describe('messages', function () {
    describe('mutators', function () {
      it('builds correctly from factory', function () {
        const message = Factory.create('message');
        assert.typeOf(message, 'object');
        assert.typeOf(message.createdAt, 'date');
        assert.typeOf(message.text, 'string');
      });
    });

    it('leaves createdAt on update', function () {
      const createdAt = new Date(new Date() - 1000);
      let message = Factory.create('message', { createdAt });

      const text = 'some new text';
      Messages.update(message, { $set: { text } });

      message = Messages.findOne(message._id);
      assert.equal(message.text, text);
      assert.equal(message.createdAt.getTime(), createdAt.getTime());
    });


    describe('methods', function () {
      let messageId;
      let messagePalindromeId;

      beforeEach(function () {
        // Clear
        Messages.remove({});

        // Create non-palindrome message
        messageId = Factory.create('message')._id;

        // Create palindrome message
        const text = 'laval';
        messagePalindromeId = Factory.create('message', { text })._id;
      });

      describe('isPalindrome', function () {
        it('identifies messages with and without palindromes', function () {
          // Non-palindrome message
          assert.isFalse(Messages.findOne(messageId).isPalindrome());

          // Palindrome message
          assert.isTrue(Messages.findOne(messagePalindromeId).isPalindrome());
        });
      });
    });
  });
}
