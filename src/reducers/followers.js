// Links Reducer

const followersReducerDefaultState = [];

export default (state = followersReducerDefaultState, action) => {
  switch (action.type) {

   
    case "ADD_FOLLOWER":
      return [...state, action.follower];
    case "REMOVE_FOLLOWER":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_FOLLOWER":
      return state.map((follower) => {
        if (follower.id === action.id) {
          return {
            ...follower,
            ...action.updates,
          };
        } else {
          return follower;
        }
      });
    case "SET_FOLLOWERS":
      return action.followers;
    
    default:
      return state;
  }
};
