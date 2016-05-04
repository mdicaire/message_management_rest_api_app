/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { StubCollections } from 'meteor/stub-collections';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { sinon } from 'meteor/practicalmeteor:sinon';


import { withRenderedTemplate } from '../../test-helpers.js';
import '../messages-show-page.js';

import { Messages } from '../../../api/messages/messages.js';

describe('Messages_show_page', function () {
  beforeEach(function () {
    StubCollections.stub([Messages]);
    Template.registerHelper('_', key => key);
    sinon.stub(Meteor, 'subscribe', () => ({
      subscriptionId: 0,
      ready: () => true,
    }));
  });

  afterEach(function () {
    StubCollections.restore();
    Template.deregisterHelper('_');
    Meteor.subscribe.restore();
  });

  it('renders correctly with simple data', function () {
    const messages = [Factory.create('message', { text: 'laval', createdAt: new Date })];

    withRenderedTemplate('Messages_show_page', {}, el => {
      const messagesText = messages.map(t => t.text).reverse();
      const renderedText = $(el).find('.list-item-text input[type=text]')
        .map((i, e) => $(e).val())
        .toArray();
      chai.assert.deepEqual(renderedText, messagesText);
    });
  });
});
