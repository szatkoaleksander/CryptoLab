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
