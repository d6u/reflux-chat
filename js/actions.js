import Reflux from 'reflux';
// import * as ChatMessageUtils from './utils/ChatMessageUtils';
import * as ChatExampleDataServer from './ChatExampleDataServer';

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

loadRawMessages.listen(function () {
  ChatExampleDataServer.getMessages(this.completed);
});

export let clickThread = Reflux.createAction();
