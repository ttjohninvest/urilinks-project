const signupReducerDefaultState = {
  signup: false
};

export default (state = signupReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SIGNUP":
      return {
        ...action.v
      };

    default:
      return state;
  }
};