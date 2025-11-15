const hasrefreshedReducerDefaultState = {
  hasrefreshed:true
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