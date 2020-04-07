import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Ticker from 'react-ticker';
import styles from './TickerWallet.module.scss';

const TickerWallet = () => {
  const [text, setText] = useState('');
  const wallets = useSelector(state => state.walletsReducer.wallets);

  useEffect(() => {
    if (wallets) {
      const walletsInfo = wallets.map(item => (
        <span className={styles.message__element}>
          <b>{item.currency}</b> - {item.amountOfMoney},
        </span>
      ));
      setText(walletsInfo);
    }
  }, [wallets]);

  return text ? (
    <p className={styles.message}>Your wallet: {text}</p>
  ) : (
    <p className={styles.message__hidden}>Loading...</p>
  );
};

function StockTicker() {
  return (
    <Ticker
      mode="chain"
      offset="run-in"
      speed={7}
    >
      {() => <TickerWallet />}
    </Ticker>
  );
}

export default StockTicker;
