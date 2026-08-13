const thetotalstarsReducerDefaultState = {
  totalstars:0
};

export default (state = thetotalstarsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THETOTALSTARS":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.totalstars
      }
    
    case "INCREMENT_TOTAL_STAR_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.totalstars
      }

    case "DECREMENT_TOTAL_STAR_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.totalstars
      }
    
    default:
      return state;
  }
};