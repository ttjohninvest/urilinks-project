// Links Reducer

const hashtagsReducerDefaultState = "";

export default (state = hashtagsReducerDefaultState, action) => {
  switch (action.type) {
  
    case "SET_HASHTAGS":
      return action.hashtags;
    default:
      return state;
  }
};
