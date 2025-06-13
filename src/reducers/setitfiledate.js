// Links Reducer

const setitReducerDefaultState = false

export default (state = setitReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SETIT":
      return action.setit;
    default:
      return state;
  }
};