
const sidebarReducer = (state = true, action) => {
  switch (action.type) {
    case 'EXPAND':
      return { ...state, isExpand: !state.isExpand };
    default:
      return state;
  }
};

export default sidebarReducer;
