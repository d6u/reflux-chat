import Reflux from 'reflux';
import groupBy from 'lodash/collection/groupBy';
import last from 'lodash/array/last';
import * as Actions from '../actions';

let CurrentThreadStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.gotRawMessages);
    this.listenTo(Actions.clickThread, this.changeThread)
  },

  gotRawMessages(rawMessages) {
    this.trigger(last(rawMessages).threadID);
  },

  changeThread(threadID) {
    this.trigger(threadID);
  }

});

export default CurrentThreadStore;
