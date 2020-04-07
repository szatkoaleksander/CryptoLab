import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import cx from 'classnames';
import styles from './TradingView.module.scss';

const TradingView = ({ currency }) => (
  <div className={cx('box', styles.wrapper)}>
    <TradingViewWidget
      symbol={`BITFINEX:${currency}USD`}
      theme={Themes.LIGHT}
      locale="en"
      autosize
    />
  </div>
);

export default TradingView;
