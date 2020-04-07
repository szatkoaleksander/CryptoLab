import jwtDecode from 'jwt-decode';
import moment from 'moment';

const ID_TOKEN_KEY = 'jwt-token';

export const getToken = () => {
  if (!tokenHasExpired()) {
    return localStorage.getItem(ID_TOKEN_KEY);
  }
  return '';
};

export const saveToken = token => {
  localStorage.setItem(ID_TOKEN_KEY, token);
//   window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const destroyToken = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
};

export const tokenHasExpired = () => {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) {
    return true;
  }

  const now = moment();
  const expire = moment.unix(jwtDecode(token).exp);

  if (now > expire) {
    destroyToken();
    return true;
  }
  return false;
};
