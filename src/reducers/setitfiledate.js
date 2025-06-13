// Links Reducer

const setitReducerDefaultState = false

export default (state = setitReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_SETIT_FILEDATE":
      return action.setit;
    default:
      return state;
  }
};