const theuserscountiReducerDefaultState = {
  userscounti:0
};

export default (state = theuserscountiReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THEUSERSCOUNTI":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscounti
      }
    
    case "INCREMENT_USERS_COUNTI":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscounti
      }

    case "DECREMENT_USERS_COUNTI":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theuserscounti
      }
    
    default:
      return state;
  }
};