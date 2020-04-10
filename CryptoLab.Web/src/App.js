import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, HashRouter } from 'react-router-dom';
import Root from './views/Root/Root';
import Home from './views/Home/Home';
import { routes } from './common/routes';
import './scss/Global.scss';
import AuthenticatedRoute from './authGuard/AuthenticatedRoute';
import UnauthenticatedRoute from './authGuard/UnauthenticatedRoute';

import { AUTHENTICATED } from '../src/redux/actions/auth';
import { useDispatch } from 'react-redux';

import { getToken } from './services/jwt.service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getToken();
    if (user) {
      dispatch({ type: AUTHENTICATED });
    }
  });

  return (
    <>
      <HashRouter>
        <Switch>
          <UnauthenticatedRoute path={routes.login} component={Root} />
          <AuthenticatedRoute path={routes.home} component={Home} />
        </Switch>
      </HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
