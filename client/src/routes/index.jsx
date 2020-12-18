import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomePage from '../modules/main/HomePage';
import LoginPage from '../modules/auth/Login';
import SignupPage from '../modules/auth/Signup';
import RestaurantList from '../modules/restaurant/RestaurantList';
import RestaurantDetails from '../modules/restaurant/RestaurantDetails';
import UserList from '../modules/user/UserList';
import Settings from '../modules/settings/Settings';
import { Loader, Layout } from '../components';
import AdminRoute from './AdminRoute';
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
            <Route path="/home" component={HomePage} />
            <Route exact path="/restaurants" component={RestaurantList} />
            <Route exact path="/restaurants/:restaurantId" component={RestaurantDetails} />
            <AdminRoute exact path="/users" component={UserList} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </Layout>
      )}
    </Switch>
  );
};
export default Routes;