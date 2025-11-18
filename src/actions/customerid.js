import database from "../firebase/firebase";

const setCustomerId = (customerId) => ({
  type: "SET_CUSTOMERID",
  customerId
});

export default setCustomerId;

export const getCustomerId = (uid) => {
  console.log("actions/getCustomerId")
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
  //console.log("actions/getEmail, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/customerId`)
      .once("value")
      .then((snapshot) => {
        
       let customerId
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        customerId = snapshot.val()

         if(customerId === undefined || customerId === null)
                    dispatch(setCustomerId({customerId:""}));
                else dispatch(setCustomerId(customerId));
       
      })
    }
};