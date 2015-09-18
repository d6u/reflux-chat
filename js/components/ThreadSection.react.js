import React from 'react';
import last from 'lodash/array/last';
import ThreadListItem from '../components/ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';

export default class ThreadSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {threads: {}};
  }

  componentDidMount() {
    this.unsubscribe = ThreadStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let threadListItems = Object.keys(this.state.threads).map(threadID => {
      let messages = this.state.threads[threadID];
          // currentThreadID={this.state.currentThreadID}
      return (
        <ThreadListItem
          key={threadID}
          lastMessage={last(messages)}
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

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange(threads) {
    this.setState({ threads });
  }

};
