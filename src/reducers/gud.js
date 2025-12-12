const gudReducerDefaultState = {
  gud:{}
};

export default (state = photourlReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_GOOGLEUSERDATA":
      return {
        ...action.gud
      }
    default:
      return state;
  }
};