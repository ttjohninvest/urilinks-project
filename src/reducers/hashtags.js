// Links Reducer

const hashtagsReducerDefaultState = [];

export default (state = hashtagsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAGS":
      return [...state, ...action.hashtags];
    default:
      return state;
  }
};
