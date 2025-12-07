const spReducerDefaultState = {
  sp:false
};

export default (state = spReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SP":
      return {
        ...action.sp
      }
    default:
      return state;
  }
};