// Settings Reducer

const settingsReducerDefaultState = {
  settingsOption1:"",
  settingsOption2:""
};

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_SETTINGS":
      return {
        ...state,
        ...action.settings
      }
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