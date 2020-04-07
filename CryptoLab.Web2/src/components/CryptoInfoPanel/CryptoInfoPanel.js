import React, { useState, useEffect } from 'react';
import { dataUnpack } from '../../common/CryptoCompareDispatcher';
import { MdArrowUpward } from 'react-icons/md';
import { MdArrowDownward } from 'react-icons/md';
import io from 'socket.io-client';

const CryptoInfoPanel = ({ currency }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io.connect('https://streamer.cryptocompare.com/');

    const subscription = currency => {
      const subscription = ['5~CCCAGG~' + currency + '~USD', '11~' + currency];
      socket.emit('SubAdd', {
        subs: subscription,
      });
    };

    subscription(currency);

    socket.on('m', message => {
      let messageType = message.substring(0, message.indexOf('~'));
      if (messageType === '5') {
        setData([dataUnpack(message)]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currency]);

  return (
    <div className="box">
      {data[0] ? (
        <>
          {data[0].FLAGS === '1' && (
            <h5 className="has-text-success has-text-weight-medium">
              Price - {data[0].PRICE} <MdArrowUpward />
            </h5>
          )}
          {data[0].FLAGS === '2' && (
            <h5 className="has-text-danger has-text-weight-medium">
              Price - {data[0].PRICE} <MdArrowDownward />
            </h5>
          )}
          {data[0].FLAGS === '4' && (
            <h5 className="has-text-weight-medium">Price - {data[0].PRICE}</h5>
          )}

          <h6>
            24h Change: {data[0].CHANGE24HOUR}
            {data[0].CHANGE24HOURPCT}
          </h6>
          <h6>Open Hour: {data[0].OPENHOUR}</h6>
          <h6>High Hour: {data[0].HIGHHOUR}</h6>
          <h6>Low Hour: {data[0].LOWHOUR}</h6>
          <h6>Open Day: {data[0].OPEN24HOUR}</h6>
          <h6>High Day: {data[0].HIGH24HOUR}</h6>
          <h6>Low Day: {data[0].LOW24HOUR}</h6>
          <h6>Last Trade Volume To: {parseInt(data[0].LASTVOLUMETO).toFixed(2)}</h6>
          <h6>24h VolumeTo: {parseInt(data[0].VOLUME24HOURTO).toFixed(2)}</h6>
        </>
      ) : (
        <h6>LOADING...</h6>
      )}
    </div>
  );
};

export default CryptoInfoPanel;
