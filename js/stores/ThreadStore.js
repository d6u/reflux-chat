import Reflux from 'reflux';
import groupBy from 'lodash/collection/groupBy';
import MessageStore from './MessageStore';

let ThreadStore = Reflux.createStore({

  init() {
    this.listenTo(MessageStore, this.messagesChanged);
  },

  messagesChanged(messages) {
    let threads = groupBy(messages, 'threadID');
    Object.keys(threads).forEach(threadID => {
      let messages = threads[threadID];
      let threadName = messages[0].threadName;
      for (let message of messages) {
        message.threadName = threadName;
      }
    });
    this.trigger(threads);
  }

});

export default ThreadStore;
