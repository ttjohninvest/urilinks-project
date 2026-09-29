// Links Reducer

const newfollowinglinksReducerDefaultState = [];

export default (state = newfollowinglinksReducerDefaultState, action) => {
  switch (action.type) {

   
    case "ADD_NEW_FOLLOWING_LINKS":
      return [...state, action.newfollowinglinks];
    case "REMOVE_NEW_FOLLOWING_LINKS":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_NEW_FOLLOWING_LINKS":
      return state.map((newfollowinglinks) => {
        if (newfollowinglinks.id === action.id) {
          return {
            ...newfollowinglinks,
            ...action.updates,
          };
        } else {
          return newfollowinglinks;
        }
      });
      
     case "SET_NEW_FOLLOWING_LINKS":
      return action.newfollowinglinks;
    
    default:
      return state;
  }
};
