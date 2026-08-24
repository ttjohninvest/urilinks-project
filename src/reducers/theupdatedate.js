const theupdatedateReducerDefaultState = {
  updatedate:""
};

export default (state = theupdatedateReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_THEUPDATEDATE":
      
        //return { ...state, theplan: action.theplan };
        return {
        ...action.theupdatedate
      }
     
    default:
      return state;
  }
};