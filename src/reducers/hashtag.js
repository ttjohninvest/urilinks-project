// Links Reducer

const hashtagReducerDefaultState = "#default";

export default (state = hashtagReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAG":
      return action.hashtag;
    
    default:
      return state;
  }
};
