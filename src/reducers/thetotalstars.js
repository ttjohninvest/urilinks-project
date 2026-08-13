const thetotalstarsReducerDefaultState = {
  totalstars:0
};

export default (state = thetotalstarsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THETOTALSTARS":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.thetotalstars
      }
    
    default:
      return state;
  }
};