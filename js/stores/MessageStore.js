import Reflux from 'reflux';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';
import * as Actions from '../actions';

let MessageStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.loadedRawMessages);
  },

  loadedRawMessages(messages) {
    this._messages = messages.map(m => ChatMessageUtils.convertRawMessage(m));
    this.trigger(this._messages);
  }

});

export default MessageStore;
