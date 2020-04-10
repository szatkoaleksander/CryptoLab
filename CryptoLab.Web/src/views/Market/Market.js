import React from 'react';
import TradingView from '../../components/TradingView/TradingView';
import CryptoInfoPanel from '../../components/CryptoInfoPanel/CryptoInfoPanel';
import Transaction from '../../components/Transaction/Transaction';
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';
import TickerWallet from '../../components/TickerWallet/TickerWallet';

const Market = ({ match }) => {
  const currency = match.params.currency.toUpperCase();

  return (
    <section className="section p-t-md">
      <div className="container">
        <TickerWallet />
        <div className="columns">
          <div className="column is-8">
            <TradingView currency={currency} />
          </div>
          <div className="column is-4">
            <CryptoInfoPanel currency={currency}></CryptoInfoPanel>
          </div>
        </div>
        <div className="columns">
          <div className="column is-8 ">
            <Transaction currency={currency} />
            <TransactionHistory currency={currency} />
          </div>
          <div className="column is-4"></div>
        </div>
        <div className="columns">
          <div className="column"></div>
        </div>
      </div>
    </section>
  );
};

export default Market;
