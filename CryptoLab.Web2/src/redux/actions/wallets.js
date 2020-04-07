import axios from 'axios';
import { getToken } from '../../services/jwt.service';

export const FETCH_WALLETS = 'fetch_wallets';

export const fetchWallets = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/wallets`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      dispatch({ type: FETCH_WALLETS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_WALLETS });
      //   dispatch({
      //     type: AUTHENTICATION_ERROR,
      //     payload: 'Failed fetched wallets',
      //   });
    }
  };
};
