// Links Reducer

const hashtags2ReducerDefaultState = [];

export default (state = hashtags2ReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAGS2":
      //return [...state, ...action.hashtags];
      return action.hashtags;
    
    default:
      return state;
  }
};