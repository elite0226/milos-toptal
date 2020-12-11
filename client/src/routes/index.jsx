import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from '../modules/auth/Login';
import SignupPage from '../modules/auth/Signup';
import { Loader, Layout } from '../components';
import { getProfile } from 'src/store/actions/auth';

function Routes() {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => !!state.auth.profile);

  const fetchProfile = React.useCallback(async () => {
    setLoading(true);
    await dispatch(getProfile());
    setLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    if (!!localStorage.getItem('token')) {
      fetchProfile();
    }
  }, [fetchProfile]);

  if (loading) {
    return (<Loader />);
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn) return <Redirect to="/home" />;
          return <Redirect to="/login" />;
        }}
      />
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