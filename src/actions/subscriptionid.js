const setSubscriptionId = (subscriptionId) => ({
  type: "SET_SUBSCRIPTIONID",
  subscriptionId
});

export default setSubscriptionId;

export const getSubscriptionId = () => {
  console.log("actions/getEmail")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getSubscriptionId, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/subscriptionId`)
      .once("value")
      .then((snapshot) => {
        
       let subscriptionId
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        subscriptionId = snapshot.val()

         if(subscriptionId === undefined || subscriptionId === null)
                    dispatch(setSubscriptionId({subscriptionId:""}));
                else dispatch(setSubscriptionId(subscriptionId));
       
      })
    }
};