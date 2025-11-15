const hasrefreshedReducerDefaultState = {
  hasrefreshed:false
};

export default (state = hasrefreshedReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASREFRESHED":
      return {
        ...action.hasrefreshed
      }
    default:
      return state;
  }
};