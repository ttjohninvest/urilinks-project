// Links Reducer

const links2ReducerDefaultState = [];

export default (state = links2ReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_LINK2":
      return [...state, action.link];
    case "REMOVE_LINK2":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_LINK2":
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
    case "SET_LINKS2":
      return action.links;
    
    default:
      return state;
  }
};
