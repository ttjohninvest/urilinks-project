// Settings Reducer

const settingsReducerDefaultState = [];

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_SETTINGS":
      return [...state, action.settings];
    case "REMOVE_SETTINGS":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_SETTINGS":
      return state.map((settings) => {
        if (settings.id === action.id) {
          return {
            ...settings,
            ...action.updates,
          };
        } else {
          return settings;
        }
      });
    case "SET_SETTINGS":
      return action.settings;
    default:
      return state;
  }
};