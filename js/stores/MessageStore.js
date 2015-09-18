import Reflux from 'reflux';
import remove from 'lodash/array/remove';
import last from 'lodash/array/last';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';
import * as Actions from '../actions';

let MessageStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.loadedRawMessages);
    this.listenTo(Actions.createMessage.formattedMessage, this.messageCreated);
    this.listenTo(Actions.createMessage.completed, this.receiveNewMessage);
    this.listenTo(Actions.clickThread, this.changeThread);
  },

  loadedRawMessages(messages) {
    let lastThreadID = last(messages).threadID;
    this._messages = messages.map(m => {
      let message = ChatMessageUtils.convertRawMessage(m);
      message.isRead = message.threadID === lastThreadID ? true : false;
      return message;
    });
    this.triggerEvent();
  },

  messageCreated(message) {
    this._messages.push(message);
    this.triggerEvent();
  },

  receiveNewMessage({rawMessage, tempMessageID}) {
    remove(this._messages, m => m.id === tempMessageID);
    let message = ChatMessageUtils.convertRawMessage(rawMessage);
    message.isRead = true;
    this._messages.push(message);
    this.triggerEvent();
  },

  changeThread(threadID) {
    for (let message of this._messages) {
      if (message.threadID === threadID) {
        message.isRead = true;
      }
    }
    this.triggerEvent();
  },

  triggerEvent() {
    this.trigger(this._messages);
  }

});

export default MessageStore;
