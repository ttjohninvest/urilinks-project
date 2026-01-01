const bmokReducerDefaultState = {
  bmok:true
};

export default (state = bmokReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_BMOK":
      return {
        ...action.bmok
      }
    default:
      return state;
  }
};