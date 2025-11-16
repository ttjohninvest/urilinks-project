const photourlReducerDefaultState = {
  photourl:""
};

export default (state = photourlReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_PHOTOURL":
      return {
        ...action.photourl
      }
    default:
      return state;
  }
};