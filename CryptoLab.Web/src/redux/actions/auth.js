import axios from 'axios';
import { saveToken } from '../../services/jwt.service';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export const signInAction = (email, password, history) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, {
        email,
        password,
      });
      dispatch({ type: AUTHENTICATED });
      saveToken(response.data.token);
      history.push('/dashboard');
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password',
      });
    }
  };
};

export const signOutAction = () => {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED,
  };
};
