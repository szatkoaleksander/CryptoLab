import moment from 'moment';
import axios from 'axios';

export const fetchHistory = () => {
  const coin = ['btc', 'eth', 'ltc'];
  return async dispatch => {
    let data = {};
    data.labels = [];
    data.datasets = [];

    coin.forEach(async item => {
      const response = await axios.get(
        `${process.env.REACT_APP_CC}/v2/histoday?fsym=${item.toUpperCase()}&tsym=USD&limit=10`,
      );

      // const response = {
      //   data: {
      //     Response: 'Success',
      //     Message: '',
      //     HasWarning: false,
      //     Type: 100,
      //     RateLimit: {},
      //     Data: {
      //       Aggregated: false,
      //       TimeFrom: 1584921600,
      //       TimeTo: 1585785600,
      //       Data: [
      //         {
      //           time: 1584921600,
      //           high: 138.33,
      //           low: 133.06,
      //           open: 122.51,
      //           volumefrom: 1717734.85,
      //           volumeto: 234709856.11,
      //           close: 136.64,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585008000,
      //           high: 142.92,
      //           low: 138.46,
      //           open: 136.64,
      //           volumefrom: 1691896.6,
      //           volumeto: 235170035.84,
      //           close: 139,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585094400,
      //           high: 141.05,
      //           low: 135.69,
      //           open: 139,
      //           volumefrom: 1290204.79,
      //           volumeto: 175760951.78,
      //           close: 136.23,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585180800,
      //           high: 139.42,
      //           low: 136.44,
      //           open: 136.23,
      //           volumefrom: 1168908.93,
      //           volumeto: 162254253.25,
      //           close: 138.81,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585267200,
      //           high: 132.32,
      //           low: 129.83,
      //           open: 138.81,
      //           volumefrom: 1174339.63,
      //           volumeto: 154633712.05,
      //           close: 131.68,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585353600,
      //           high: 132.55,
      //           low: 127.99,
      //           open: 131.68,
      //           volumefrom: 1248270.98,
      //           volumeto: 163822790.2,
      //           close: 131.24,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585440000,
      //           high: 125.11,
      //           low: 122.76,
      //           open: 131.24,
      //           volumefrom: 902059.46,
      //           volumeto: 112330013.27,
      //           close: 124.53,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585526400,
      //           high: 136.39,
      //           low: 131.01,
      //           open: 124.53,
      //           volumefrom: 1170545.56,
      //           volumeto: 154854263.42,
      //           close: 132.29,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585612800,
      //           high: 133.93,
      //           low: 131.17,
      //           open: 132.29,
      //           volumefrom: 879133.02,
      //           volumeto: 117010142.69,
      //           close: 133.1,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585699200,
      //           high: 140.94,
      //           low: 135.87,
      //           open: 133.1,
      //           volumefrom: 1441456.61,
      //           volumeto: 196140910.28,
      //           close: 136.07,
      //           conversionType: 'multiply',
      //           conversionSymbol: 'BTC',
      //         },
      //         {
      //           time: 1585785600,
      //           high: 150.15,
      //           low: 135.64,
      //           open: 136.05,
      //           volumefrom: 578546.49,
      //           volumeto: 81640149.03,
      //           close: 141.26,
      //           conversionType: 'direct',
      //           conversionSymbol: '',
      //         },
      //       ],
      //     },
      //   },
      // };

      if (response.data.Response !== 'Error') {
        data.labels = response.data.Data.Data.map(itemm => {
          return moment.unix(itemm.time).format('DD-MM-YYYY');
        });

        data.datasets.push({
          label: item.toUpperCase(),
          fill: false,
          lineTension: 0.1,
          data: response.data.Data.Data.map(item => {
            return item.close;
          }),
        });
      } else {
        console.error(response.data.Message);
      }
    });

    dispatch({ type: 'HISTORY', payload: data });
  };
};
