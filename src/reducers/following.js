// Links Reducer

const followingReducerDefaultState = [];

export default (state = followingReducerDefaultState, action) => {
  switch (action.type) {

    case "SET_NEW_FOLLOWING":
      return action.following;
    
    case "ADD_NEW_FOLLOWING":
      return [...state, action.following];
    case "REMOVE_NEW_FOLLOWING":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_NEW_FOLLOWING":
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
      
   
    default:
      return state;
  }
};
