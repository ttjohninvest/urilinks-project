// Links Reducer

const setitReducerDefaultState = true;

export default (state = setitReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SETIT":
      //return [...state, ...action.hashtags];
      return action.setit;
    default:
      return state;
  }
};