import Reflux from 'reflux';
import groupBy from 'lodash/collection/groupBy';
import MessageStore from './MessageStore';

let ThreadStore = Reflux.createStore({

  init() {
    this.listenTo(MessageStore, this.messagesChanged);
  },

  messagesChanged(messages) {
    this.trigger(groupBy(messages, 'threadID'));
  }

});

export default ThreadStore;
