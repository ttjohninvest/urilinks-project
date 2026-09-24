const theothersisopenReducerDefaultState = {
  othersisopen:0
};

export default (state = theothersisopenReducerDefaultState, action) => {
  switch (action.type) {
    
      case "SET_THEOTHERSISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theothersisopen
      }
    
    case "ADD_THEOTHERSISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theothersisopen
      }
    
    case "INCREMENT_OTHERS_ISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theothersisopen
      }

    case "DECREMENT_OTHERS_ISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theothersisopen
      }
    
    default:
      return state;
  }
};