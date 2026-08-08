// Links Reducer

const linksReducerDefaultState = [];

export default (state = linksReducerDefaultState, action) => {
  switch (action.type) {
 
     case "INCREMENT_LINK_COUNT":
       return state.map((link) => {
        if (link.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...link,
           frequency: link.frequency + 1,
          };
        } else {
          return link;
        }
      });
     case "ARCHIVE_LINK":
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
     case "PRIVATE_LINK":
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
    case "ADD_LINK":
      return [...state, action.link];
    case "REMOVE_LINK":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_LINK":
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
    case "SET_LINKS":
      return action.links;
    
    default:
      return state;
  }
};
