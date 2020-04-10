import { combineReducers } from 'redux';
import authReducer from './auth';
import sidebarReducer from './sidebar';
import cryptocompareReducer from './cryptocompare';
import walletsReducer from './wallets';

const rootReducer = combineReducers({
  authReducer,
  sidebarReducer,
  cryptocompareReducer,
  walletsReducer,
});

export default rootReducer;
