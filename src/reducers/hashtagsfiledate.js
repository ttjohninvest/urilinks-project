// Links Reducer

const hashtagsReducerDefaultState = [];

export default (state = hashtagsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAGS_FILEDATE":
      //return [...state, ...action.hashtags];
      return action.hashtags;
    
    default:
      return state;
  }
};
