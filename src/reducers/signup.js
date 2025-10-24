const signupReducerDefaultState = {
  signup:true
};

export default (state = signupReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SIGNUP":
      return {
        ...action.signup
      }
    default:
      return state;
  }
};