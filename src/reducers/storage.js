// Firebase Storage Url Reducer

const storageReducerDefaultState = "";

export default (state = storageReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_STORAGEURL":
      //return [...state, ...action.hashtags];
      return action.url;
    default:
      return state;
  }
};