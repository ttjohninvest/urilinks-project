const subscriptionidReducerDefaultState = {
  subscriptionid:""
};

export default (state = subscriptionidReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SUBSCRIPTIONID":
      return {
        ...action.subscriptionId
      }
    default:
      return state;
  }
};