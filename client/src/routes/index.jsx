import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../modules/auth/Login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/home" component={() => <h4>Home Page</h4>} />
    </Switch>
  );
};
export default Routes;