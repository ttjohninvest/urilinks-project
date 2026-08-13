const theplanReducerDefaultState = {
  totalstars:0,
 
};

export default (state = totalstarsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_TOTALSTARS":
      
        //return { ...state, totalstars: action.totalstars };
        return {
        ...action.totalstars
      }
    
    default:
      return state;
  }
};