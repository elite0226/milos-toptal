import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

import configureStore, { history } from './store';
import Routes from './routes';
import Toast from 'src/components/Toast';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <ConfirmProvider>
            <CssBaseline />
            <Toast />
            <Routes />
          </ConfirmProvider>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
