// Links Reducer

const hashtagReducerDefaultState = "";

export default (state = hashtagReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAG":
      return action.hashtag;
    
    default:
      return state;
  }
};
