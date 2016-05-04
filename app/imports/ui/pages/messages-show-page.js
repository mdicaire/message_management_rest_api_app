import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './messages-show-page.html';

import { listRenderHold } from '../launch-screen.js';

// Components used inside the template
import './app-not-found.js';
import '../components/messages-show.js';

Template.Messages_show_page.onCreated(function messagesShowPageOnCreated() {
  this.getMessageId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('messages');
  });
});

Template.Messages_show_page.onRendered(function messagesShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release();
    }
  });
});
