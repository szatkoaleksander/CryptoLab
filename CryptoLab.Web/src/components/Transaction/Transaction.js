import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { getToken } from '../../services/jwt.service';

const Transaction = ({ currency }) => {
  const [amountOfMoneyToBuy, setAmountOfMoneyToBuy] = useState(0);
  const [amountOfMoneyToSell, setAmountOfMoneyToSell] = useState(0);
  const [errorBuy, setErrorBuy] = useState('');
  const [errorSell, setErrorSell] = useState('');

  const handleBuy = async e => {
    e.preventDefault();
    setErrorBuy('');

    if (amountOfMoneyToBuy > 0) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/transactions/fastbuy`,
          {
            toCurrency: currency,
            amount: amountOfMoneyToBuy,
          },
          {
            headers: { Authorization: 'Bearer ' + getToken() },
          },
        );

        toast.info(`You bought some ${currency}!`);
      } catch (e) {
        setErrorBuy('You dont have enought money');
        console.error(e);
      }
    } else {
      setErrorBuy('The amount is too small');
    }
  };

  const handleSell = async e => {
    e.preventDefault();
    setErrorSell('');

    if (amountOfMoneyToSell > 0) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/transactions/fastsell`,
          {
            fromCurrency: currency,
            amount: amountOfMoneyToSell,
          },
          {
            headers: { Authorization: 'Bearer ' + getToken() },
          },
        );

                toast.info(`You sold some ${currency}!`);
      } catch (e) {
        setErrorSell('You dont have enought money');
        console.error(e);
      }
    } else {
      setErrorSell('The amount is too small');
    }
  };

  return (
    <div className="box">
      <div className="columns is-block-tablet-only">
        <div className="column is-6 is-12-tablet is-6-desktop">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                value={amountOfMoneyToBuy}
                onChange={e => setAmountOfMoneyToBuy(e.target.value)}
                name="buy"
                type="text"
                placeholder="Value"
              />
            </div>
            <div className="control">
              <a href="/" className="button is-info" onClick={handleBuy}>
                Buy
              </a>
            </div>
          </div>
          {errorBuy && <p className="has-text-danger">{errorBuy}</p>}
        </div>
        <div className="column is-6 is-12-tablet is-6-desktop">
          <div className=" field has-addons">
            <div className="control">
              <input
                className="input"
                value={amountOfMoneyToSell}
                onChange={e => setAmountOfMoneyToSell(e.target.value)}
                name="sell"
                type="text"
                placeholder="Sell"
              />
            </div>
            <div className="control">
              <a href="/" className="button is-info" onClick={handleSell}>
                Sell
              </a>
            </div>
          </div>
          {errorSell && <p className="has-text-danger">{errorSell}</p>}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
