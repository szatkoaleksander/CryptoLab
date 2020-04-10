import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../services/jwt.service';

export default ({ component: Component, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        getToken() ? (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
