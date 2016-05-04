import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';

import './messages-show.html';

import {
  insert,
  remove,
} from '../../api/messages/methods.js';

import { Messages } from '../../api/messages/messages.js';

import { displayError } from '../lib/errors.js';


Template.Messages_show.onCreated(function messageShowOnCreated() {
  this.selection = new ReactiveDict();
  this.selection.setDefault({
    messageId: '',
  });
});

Template.Messages_show.helpers({
  messages() {
    return Messages.find({});
  },
  selected_message() {
    const instance = Template.instance();
    return Messages.findOne(instance.selection.get('messageId'));
  },
});

Template.Messages_show.events({
  'click .text-message'(event, instance) {
    // get the id of the message to show more details
    const messageId = event.target.id;
    instance.selection.set('messageId', messageId);
  },

  'click .js-delete-message'(event, instance) { // eslint-disable-line
    // get the id of the message to delete
    const messageId = event.target.parentElement.id;

    // delete the message
    remove.call({ messageId });
  },

  'click .js-message-add'(event, instance) {
    instance.$('.js-message-new input').focus();

    // get the message
    const input = event.target.previousElementSibling;
    const message = input.value;

    // stop here if there is no message
    if (!message) {
      return;
    }

    // create a new message entry
    insert.call({
      text: message,
    }, displayError);

    input.value = '';
  },

  'submit .js-message-new'(event) {
    event.preventDefault();

    // get the message
    const $input = $(event.target).find('[type=text]');
    if (!$input.val()) {
      return;
    }

    // create a new message entry
    insert.call({
      text: $input.val(),
    }, displayError);

    $input.val('');
  },
});
