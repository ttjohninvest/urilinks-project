export default (state = {}, action) => {
  console.log("in auth reducer, action.type="+action.type)
  console.log("in auth reducer, action.settings="+JSON.stringify(action.settings))
  if(action.type==="LOGIN") console.log("LOGIN happened")
  switch (action.type) {
    
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        uid:''
      };
    default:
      return state;
  }
};
