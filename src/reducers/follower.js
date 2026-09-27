// Links Reducer

const followerReducerDefaultState = [];

export default (state = followerReducerDefaultState, action) => {
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
    case "SET_FOLLOWER":
      return action.follower;
    
    default:
      return state;
  }
};
