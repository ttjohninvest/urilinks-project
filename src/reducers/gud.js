const gudReducerDefaultState = {
  gud:{}
};

export default (state = gudReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_GOOGLEUSERDATA":
      return {
        ...action.gud
      }
    default:
      return state;
  }
};