import React from 'react';
import cx from 'classnames';
import styles from './TopCoinPanel.module.scss';

const TopCoinPanel = ({ top }) => {
  return (
    <div className={cx('box', styles.wrapper)}>
      {top.map(item => (
        <span key={item.CoinInfo.Id}>
          <div className="m-b-md level">
            <div className="level-left">
              <div className="level-item">
                <figure className="image is-24x24">
                  <img
                    src={`https://www.cryptocompare.com${item.CoinInfo.ImageUrl}`}
                    alt="cryptoIcon"
                  />
                </figure>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <p>{item.CoinInfo.FullName}</p>
                </div>
              </div>
            </div>
            <div className="level-right">
              <p>{item.RAW.USD.PRICE.toFixed(2)}$</p>
            </div>
          </div>
          <hr className="m-t-sm m-b-sm" />
        </span>
      ))}
    </div>
  );
};

export default TopCoinPanel;
