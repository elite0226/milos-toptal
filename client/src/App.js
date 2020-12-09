import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';

import configureStore, { history } from './store';
import Routes from './routes';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
