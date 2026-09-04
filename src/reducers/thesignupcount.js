const thesignupcountReducerDefaultState = {
  signupcount:0
};

export default (state = thesignupcountReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THESIGNUPCOUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesignupcount
      }
    
    case "INCREMENT_SIGNUP_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesignupcount
      }

    case "DECREMENT_SIGNUP_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesignupcount
      }
    
    default:
      return state;
  }
};