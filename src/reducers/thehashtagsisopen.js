const thehashtagsisopenReducerDefaultState = {
  hashtagsisopen:0
};

export default (state = thehashtagsisopenReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THEHASHTAGSISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thehashtagsisopen
      }
    
    case "INCREMENT_HASHTAGS_ISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thehashtagsisopen
      }

    case "DECREMENT_HASHTAGS_ISOPEN":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thehashtagsisopen
      }
    
    default:
      return state;
  }
};