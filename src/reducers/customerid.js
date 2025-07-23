const customeridReducerDefaultState = ""

export default (state = customeridReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_CUSTOMERID":
      return action.customerId;
    default:
      return state;
  }
};