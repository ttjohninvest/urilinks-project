// Settings Reducer

const settingsReducerDefaultState = {};

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_SETTINGS":
      return action.settings
    case "REMOVE_SETTINGS":
      return state.settings
    case "EDIT_SETTINGS":
      return state.setting
    case "SET_SETTINGS":
      return action.settings;
    default:
      return state;
  }
};