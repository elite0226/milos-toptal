import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ROLES from 'src/constants';

const AdminRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector((state) => !!state.auth.profile);
  const { profile } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) return <Redirect to="/login" />;
        if (profile.role === ROLES.ADMIN) return <Component {...props} />;
        return <Redirect to="/" />;
      }}
    />
  );
};

export default AdminRoute;
