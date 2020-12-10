import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../modules/auth/Login';
import SignupPage from '../modules/auth/Signup';
import Layout from '../components/Layout';

function Routes() {
  const isLoggedIn = useSelector(state => !!state.auth.profile);

  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      {isLoggedIn && (
        <Layout>
          <Switch>
            <Route path="/home" component={() => <h4>Home Page</h4>} />
          </Switch>
        </Layout>
      )}
    </Switch>
  );
};
export default Routes;