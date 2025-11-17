const emailReducerDefaultState = {
  email:""
};

export default (state = emailReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...action.email
      }
    default:
      return state;
  }
};