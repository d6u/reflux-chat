import React from 'react';
import last from 'lodash/array/last';
import ThreadListItem from '../components/ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';
import CurrentThreadStore from '../stores/CurrentThreadStore';

export default class ThreadSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      threads: {},
      currentThreadID: null
    };
  }

  componentDidMount() {
    this.unsubscribe = ThreadStore.listen(this._onChangeThread.bind(this));
    this.unsubscribe = CurrentThreadStore.listen(this._onChangeCurrentThread.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let threadListItems = Object.keys(this.state.threads).map(threadID => {
      let messages = this.state.threads[threadID];
      return (
        <ThreadListItem
          key={threadID}
          lastMessage={last(messages)}
          currentThreadID={this.state.currentThreadID}
        />
      );
    });

    let unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
      </div>
    );
  }

  _onChangeThread(threads) {
    this.setState({ threads });
  }

  _onChangeCurrentThread(currentThreadID) {
    this.setState({ currentThreadID });
  }

};
