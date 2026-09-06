const theloggedinReducerDefaultState = {
  loggedin:0
};

export default (state = theloggedinReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THELOGGEDIN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theloggedin
      }
    
    case "INCREMENT_LOGGEDIN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theloggedin
      }

    case "DECREMENT_LOGGEDIN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theloggedin
      }
    
    default:
      return state;
  }
};