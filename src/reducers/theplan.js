const theplanReducerDefaultState = {
  plan:"free"
};

export default (state = theplanReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_THEPLAN":
      return {
        ...action.theplan
      }
    default:
      return state;
  }
};