// Links Reducer

const hashtags2withcount2ReducerDefaultState = [];

export default (state = hashtags2withcount2ReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAGS2WITHCOUNT2":
      //return [...state, ...action.hashtags];
      return action.hashtags;
    default:
      return state;
  }
};