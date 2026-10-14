const isinfinitescrollReducerDefaultState = {
  isinfinitescroll:true
};

export default (state = isinfinitescrollReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ISINFINITESCROLL":
      return {
        ...action.isinfinitescroll
      }
    default:
      return state;
  }
};