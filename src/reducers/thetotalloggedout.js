const thetotalloggedoutReducerDefaultState = {
  totalloggedout:0
};

export default (state = thetotalloggedoutReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THETOTALLOGGEDOUT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thetotalloggedout
      }
    
    case "INCREMENT_TOTAL_LOGGEDOUT_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thetotalloggedout
      }

    case "DECREMENT_TOTAL_LOGGEDOUT_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thetotalloggedout
      }
    
    default:
      return state;
  }
};