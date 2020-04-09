import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Market from '../Market/Market';
import History from '../History/History';
import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import { routes } from '../../common/routes';
import styles from './Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWallets } from '../../redux/actions/wallets';

const Home = ({ match }) => {
  const isExpand = useSelector(state => state.sidebarReducer.isExpand);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallets());
  });

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={!isExpand ? styles.content : ''}>
        <Navbar></Navbar>
        <Switch>
          <Route path={routes.dashboard} component={Dashboard} />
          <Route path={routes.market} component={Market} />
          <Route path={routes.history} component={History} />
          <Route path={routes.about} component={About} />
          <Route path={routes.notFound} component={NotFound} />
          <Redirect to={routes.notFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
