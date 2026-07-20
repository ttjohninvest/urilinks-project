const theplanReducerDefaultState = {
  customerId:"",
  plan:"free",
  subscriptionId:"",
  uid:""
};

export default (state = theplanReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THEPLAN":
      return {
        ...action.theplan
      }
    default:
      return state;
  }
};