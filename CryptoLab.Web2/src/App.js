import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Root from './views/Root/Root';
import Home from './views/Home/Home';
import { routes } from './common/routes';
import './scss/Global.scss';

import AuthenticatedRoute from './authGuard/AuthenticatedRoute';
import UnauthenticatedRoute from './authGuard/UnauthenticatedRoute';

import { AUTHENTICATED } from '../src/redux/actions/auth';
import { useDispatch } from 'react-redux';

import { getToken } from './services/jwt.service';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getToken();
    if (user) {
      dispatch({ type: AUTHENTICATED });
    }
  });

  return (
    <BrowserRouter>
      <Switch>
        <UnauthenticatedRoute path={routes.login} component={Root} />
        <AuthenticatedRoute path={routes.home} component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
