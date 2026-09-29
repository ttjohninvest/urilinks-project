// Links Reducer

const followingReducerDefaultState = [];

export default (state = followingReducerDefaultState, action) => {
  switch (action.type) {

   
    case "ADD_FOLLOWING":
      return [...state, action.following];
    case "REMOVE_FOLLOWING":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_FOLLOWING":
      return state.map((following) => {
        if (following.id === action.id) {
          return {
            ...following,
            ...action.updates,
          };
        } else {
          return following;
        }
      });
    case "SET_FOLLOWING":
      return action.following;
      
     case "SET_NEW_FOLLOWING_LINKS":
      return action.newfollowinglinks;
    
    default:
      return state;
  }
};
