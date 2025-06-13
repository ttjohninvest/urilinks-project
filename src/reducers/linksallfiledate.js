// Links Reducer

const linksallReducerDefaultState = [];

export default (state = linksallReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_LINK_ALL_FILEDATE":
      return [...state, action.linkall];
    case "REMOVE_LINK_ALL_FILEDATE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_LINK_ALL_FILEDATE":
      return state.map((link) => {
        if (linkall.id === action.id) {
          return {
            ...linkall,
            ...action.updates,
          };
        } else {
          return linkall;
        }
      });
    case "SET_LINKS_ALL_FILEDATE":
      return action.linksall;
    
    default:
      return state;
  }
};