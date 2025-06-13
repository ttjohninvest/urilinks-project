// Links Reducer

const hashtags2withcountReducerDefaultState = [];

export default (state = hashtags2withcountReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HASHTAGS2WITHCOUNT":
      //return [...state, ...action.hashtags];
      return action.hashtags;
    default:
      return state;
  }
};
