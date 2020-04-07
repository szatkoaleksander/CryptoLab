import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoughnutOverlay from '../../components/DoughnutOverlay/DoughnutOverlay';
import NewsList from '../../components/News/NewsList';
import TopCoinPanel from '../../components/TopCoinPanel/TopCoinPanel';
import LineOverlay from '../../components/LineOverlay/LineOverlay';
import TickerWallet from '../../components/TickerWallet/TickerWallet';
import moment from 'moment';

import { fetchHistory } from '../../redux/actions/cryptocompare';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [top, setTop] = useState([]);
  const [history, setHistory] = useState({ datasets: [], labels: [] });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const his = useSelector(state => state.cryptocompareReducer);
  const wallets = useSelector(state => state.walletsReducer.wallets);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_CC}/v2/news/?lang=EN`);
      if (response.data.Response !== 'Error') setNews(response.data.Data.slice(0, 5));
      else console.error(response.data.Message);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTop = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CC}/top/totalvolfull?limit=10&tsym=USD`,
      );
      console.log(response.data.Data);
      if (response.data.Response !== 'Error') setTop(response.data.Data);
      else console.error(response.data.Message);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // fetchNews();
    // fetchTop();
    // dispatch(fetchHistory());
    // setIsLoading(his.isFetched);
  }, [his.isFetched]);

  return (
    <section className="section p-t-md">
      <div className="container">
        <TickerWallet />
        <div className="columns">
          <div className="column is-8">
            <h1 className="title">Your wallet</h1>
            {/* {isLoading ? <LineOverlay data={his.history} /> : <p>Loading...</p>} */}
            {wallets ? <DoughnutOverlay data={wallets} /> : <p>Loading...</p>}
          </div>
          <div className="column is-4">
            <h1 className="title">TABLE INFO</h1>
            <TopCoinPanel top={top} />
          </div>
        </div>
        <hr />
        <div className="columns">
          {/* <div className="column is-7"></div> */}
          <div className="column is-12">
            <h1 className="title">News</h1>
            <NewsList news={news} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
