/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { DDP } from 'meteor/ddp-client';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { assert } from 'meteor/practicalmeteor:chai';
import { Promise } from 'meteor/promise';
import { $ } from 'meteor/jquery';

import { generateData } from './../../api/generate-data.app-tests.js';
import { Messages } from '../../api/todos/todos.js';


// Utility -- returns a promise which resolves when all subscriptions are done
const waitForSubscriptions = () => new Promise(resolve => {
  const poll = Meteor.setInterval(() => {
    if (DDP._allSubscriptionsReady()) {
      clearInterval(poll);
      resolve();
    }
  }, 200);
});

// Tracker.afterFlush runs code when all consequent of a tracker based change
//   (such as a route change) have occured. This makes it a promise.
const afterFlushPromise = Promise.denodeify(Tracker.afterFlush);

if (Meteor.isClient) {
  describe('data available when routed', () => {
    // First, ensure the data that we expect is loaded on the server
    //   Then, route the app to the homepage
    beforeEach(() => generateData().then(() => FlowRouter.go('/')));

    it('renders the correct messages when routed to', () => {
      FlowRouter.go('Messages.show');

      return afterFlushPromise()
          .then(() => {
            assert.equal($('.title-message').html(), 'No message here');
          })
          .then(() => waitForSubscriptions())
          .then(() => {
            assert.equal(Messages.find({}).count(), 3);
          });
    });
  });
}
