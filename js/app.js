// This file bootstraps the entire application.

import React from 'react';
import ChatApp from './components/ChatApp.react';
import * as Actions from './actions';

Actions.loadRawMessages();

React.render(
  <ChatApp />,
  document.getElementById('react')
);
