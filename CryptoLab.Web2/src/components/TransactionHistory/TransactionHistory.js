import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './TransactionHistory.module.scss';
import axios from 'axios';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { getToken } from '../../services/jwt.service';

const TransactionHistory = ({ currency }) => {
  const [hubConnection, setHubConnection] = useState({});
  const [historiesPurchase, setHistoriesPurchase] = useState([]);
  const [historiesSale, setHistoriesSale] = useState([]);

  const fetchHistoriesPurchase = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/histories/${currency}/0`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });

      setHistoriesPurchase(response.data.slice(0, 15));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHistoriesSale = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/histories/${currency}/1`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });

      setHistoriesSale(response.data.slice(0, 15));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const hubConnect = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_WS}/histories`, {
        accessTokenFactory: () => getToken(),
      })
      .build();

    const createHubConnection = async () => {
      try {
        await hubConnect.start();
        setHubConnection(hubConnect);

        hubConnect.on('Add', history => {
          if (history.operationType === 0) {
            setHistoriesPurchase(prevState => [history, ...prevState.slice(0, 14)]);
          }
        });

        hubConnect.on('Add', history => {
          if (history.operationType === 1) {
            setHistoriesSale(prevState => [history, ...prevState.slice(0, 14)]);
          }
        });
      } catch (e) {
        console.error('Error while establishing connection' + e);
      }
    };

    createHubConnection();
    fetchHistoriesPurchase();
    fetchHistoriesSale();
    return () => {
      hubConnect.stop();
    };
  }, [currency]);

  return (
    <div className={cx('box', styles.wrapper)}>
      <div className=" columns is-block-tablet-only">
        <div className="column is-6  is-12-tablet is-6-desktop">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>AmountOf</th>
                <th>Price</th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
              {historiesPurchase.map(item => (
                <tr key={item.id}>
                  <td>{item.amountOfMoney}</td>
                  <td>{item.price}</td>
                  <td>{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column is-6 is-12-tablet is-6-desktop">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>AmountOf</th>
                <th>Price</th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
              {historiesSale.map(item => (
                <tr key={item.id}>
                  <td>{item.amountOfMoney}</td>
                  <td>{item.price}</td>
                  <td>{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
