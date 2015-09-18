import Reflux from 'reflux';
import * as ChatMessageUtils from './utils/ChatMessageUtils';
import * as ChatExampleDataServer from './ChatExampleDataServer';

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

loadRawMessages.listen(function () {
  ChatExampleDataServer.getMessages(this.completed);
});

export let clickThread = Reflux.createAction();

export let createMessage = Reflux.createAction({
  asyncResult: true,
  children: ['formattedMessage']
});

createMessage.listen(function (text, currentThreadID) {
  let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  this.formattedMessage(message);
  ChatExampleDataServer.postMessage(message, rawMessage => {
    this.completed({ rawMessage, tempMessageID: message.id });
  });
});
