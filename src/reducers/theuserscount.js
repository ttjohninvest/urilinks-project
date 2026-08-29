const theuserscountReducerDefaultState = {
  userscount:0
};

export default (state = theuserscountReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THEUSERSCOUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscount
      }
    
    case "INCREMENT_USERS_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscount
      }

    case "DECREMENT_USERS_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscount
      }
    
    default:
      return state;
  }
};