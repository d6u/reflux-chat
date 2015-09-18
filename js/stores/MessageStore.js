import Reflux from 'reflux';
import remove from 'lodash/array/remove';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';
import * as Actions from '../actions';

let MessageStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.loadedRawMessages);
    this.listenTo(Actions.createMessage.formattedMessage, this.messageCreated);
    this.listenTo(Actions.createMessage.completed, this.receiveNewMessage);
  },

  loadedRawMessages(messages) {
    this._messages = messages.map(m => ChatMessageUtils.convertRawMessage(m));
    this.triggerEvent();
  },

  messageCreated(message) {
    this._messages.push(message);
    this.triggerEvent();
  },

  receiveNewMessage({rawMessage, tempMessageID}) {
    remove(this._messages, m => m.id === tempMessageID);
    this._messages.push(ChatMessageUtils.convertRawMessage(rawMessage));
    this.triggerEvent();
  },

  triggerEvent() {
    this.trigger(this._messages);
  }

});

export default MessageStore;
