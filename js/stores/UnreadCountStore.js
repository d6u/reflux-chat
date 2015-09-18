import Reflux from 'reflux';
import last from 'lodash/array/last';
import ThreadStore from './ThreadStore';

let UnreadCountStore = Reflux.createStore({

  init() {
    this.listenTo(ThreadStore, this.onThreadChange);
  },

  onThreadChange(threads) {
    this.trigger(Object.keys(threads).reduce((count, threadID) => {
      return count + (last(threads[threadID]).isRead ? 0 : 1);
    }, 0));
  },

});

export default UnreadCountStore;
