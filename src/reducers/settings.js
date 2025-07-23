// Settings Reducer

const settingsReducerDefaultState = {
  settingsOption1:"",
  settingsOption2:"",
  group:"",
  photoURL:"",
  plan:"free"
};

export default (state = settingsReducerDefaultState, action) => {
  console.log("in settings reducer, action.type="+action.type)
  console.log("in settings reducer, action.settings="+JSON.stringify(action.settings))
  switch (action.type) {
    case "ADD_SETTINGS":
      return {
        ...action.settings
      }
    case "REMOVE_SETTINGS":
      return state.settings
    case "EDIT_SETTINGS":
      return state.setting
    case "SET_SETTINGS":
      return {
        ...action.settings
      }
    default:
      return state;
  }
};