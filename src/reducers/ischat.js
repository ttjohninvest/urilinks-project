// Links Reducer

const ischatReducerDefaultState = [];

export default (state = ischatReducerDefaultState, action) => {
  switch (action.type) {

    case "SET_NEW_ISCHAT":
      return action.ischat;
    
    case "ADD_NEW_ISCHAT":
      return [...state, action.ischat];
    case "REMOVE_NEW_ISCHAT":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_NEW_ISCHAT":
      return state.map((ischat) => {
        if (ischat.id === action.id) {
          return {
            ...ischat,
            ...action.updates,
          };
        } else {
          return ischat;
        }
      });
      
   
    default:
      return state;
  }
};
