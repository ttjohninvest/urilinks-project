const frommenuReducerDefaultState = {
  frommenu:false
};

export default (state = frommenuReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_FROMMENU":
      return {
        ...action.frommenu
      }
    default:
      return state;
  }
};