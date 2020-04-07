import { FETCH_WALLETS } from '../actions/wallets';

const walletsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_WALLETS:
      return { ...state, wallets: action.payload };
    default:
      return state;
  }
};

export default walletsReducer;
