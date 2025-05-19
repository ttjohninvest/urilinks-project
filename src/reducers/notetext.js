// Links Reducer

const notetextReducerDefaultState = [];

export default (state = notetextReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_NOTETEXT":
      return [...state, ...action.notetext];
    default:
      return state;
  }
};
