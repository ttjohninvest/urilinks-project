// Links Reducer

const linksReducerDefaultState = [];

export default (state = linksReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_LINK_FILEDATE":
      return [...state, action.link];
    case "REMOVE_LINK_FILEDATE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_LINK_FILEDATE":
      return state.map((link) => {
        if (link.id === action.id) {
          return {
            ...link,
            ...action.updates,
          };
        } else {
          return link;
        }
      });
    case "SET_LINKS_FILEDATE":
      return action.links;
    
    default:
      return state;
  }
};
