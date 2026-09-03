const thesharablelinkReducerDefaultState = {
  sharablelink:0
};

export default (state = thesharablelinkReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THESHARABLELINK":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesharablelink
      }
    
    case "INCREMENT_SHARABLE_LINK_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesharablelink
      }

    case "DECREMENT_SHARABLE_LINK_COUNT":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thesharablelink
      }
    
    default:
      return state;
  }
};