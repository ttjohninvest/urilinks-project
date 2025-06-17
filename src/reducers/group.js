// Settings Reducer

const groupReducerDefaultState = ""

export default (state = groupReducerDefaultState, action) => {
 
  switch (action.type) {
    case "ADD_GROUP":
      return action.group
    default:
      return state;
  }
};