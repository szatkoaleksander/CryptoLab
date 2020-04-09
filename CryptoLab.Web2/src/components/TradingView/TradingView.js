import React, { useEffect, useRef } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import cx from 'classnames';
import styles from './TradingView.module.scss';
import Helmet from 'react-helmet';

const TradingView = ({ currency }) => {
  return (
    <div className={cx('box', styles.wrapper)}>
      <TradingViewWidget
        symbol={`BITFINEX:${currency}USD`}
        theme={Themes.LIGHT}
        locale="en"
        autosize
      />
      <div id="myContainer">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </div>
  );
};

export default TradingView;
