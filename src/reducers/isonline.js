// Links Reducer

const isonlineReducerDefaultState = [];

export default (state = isonlineReducerDefaultState, action) => {
  switch (action.type) {

    case "SET_NEW_ISONLINE":
      return action.isonline;
    
    case "ADD_NEW_ISONLINE":
      return [...state, action.isonline];
    case "REMOVE_NEW_ISONLINE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_NEW_ISONLINE":
      return state.map((isonline) => {
        if (isonline.id === action.id) {
          return {
            ...isonline,
            ...action.updates,
          };
        } else {
          return isonline;
        }
      });
      
   
    default:
      return state;
  }
};
