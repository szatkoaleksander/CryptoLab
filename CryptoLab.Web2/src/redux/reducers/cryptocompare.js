const cryptocompareReducer = (state = [], action) => {
  switch (action.type) {
    case 'HISTORY':
      return { ...state, history: action.payload, isFetched: true };
    default:
      return state;
  }
};

export default cryptocompareReducer;
