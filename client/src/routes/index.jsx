import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../modules/auth/Login';
import SignupPage from '../modules/auth/Signup';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route path="/home" component={() => <h4>Home Page</h4>} />
    </Switch>
  );
};
export default Routes;