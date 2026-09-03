import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setTheuserscounti = (theuserscounti) => ({
  type: "SET_THEUSERSCOUNTI",
  theuserscounti,
});

export const startAddTheuserscounti = (theuserscountiData = {}) => {
  console.log("startAddTheuserscounti, theuserscountiData=" + JSON.stringify(theuserscountiData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theuserscounti`)
        //.push(settingsData)
        .update(theuserscountiData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addTheuserscounti(theuserscountiData));
          
        })
    );
  };
};

export const getTheuserscounti = (uid) => {
  console.log("actions/getTheuserscounti");
  //const uid = getState().auth.uid;
  return (dispatch, getState) => {
    let s;
    return database
     
      .ref(`users/${uid}/theuserscounti`)
      .once("value")
      .then((snapshot) => {

         let zuserscounti={
                   userscounti:0
                }
        
                if (snapshot.val() === null) {
                  //theplan = "free";
                  dispatch(startAddTheuserscounti(zuserscounti))
                } else {
                  //theplan=snapshot.val();
                  //zplan=snapshot.val();
                  dispatch(addTheuserscounti(snapshot.val()));
                }

        // if (snapshot.val() === null) {
          
        // } else {
          
        //   dispatch(addTheuserscounti(snapshot.val()));
        // }
       
      });
  };
};

export const getTheuserscounti2 = () => {
  console.log("actions/getTheuserscounti2");
  
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let s;
    return database
     
      .ref(`users/${uid}/theuserscounti`)
      .once("value")
      .then((snapshot) => {

         let zuserscounti={
                   userscounti:0
                }
        
                if (snapshot.val() === null) {
                  //theplan = "free";
                  dispatch(startAddTheuserscounti(zuserscounti))
                } else {
                  //theplan=snapshot.val();
                  //zplan=snapshot.val();
                  dispatch(addTheuserscounti(snapshot.val()));
                }

        // if (snapshot.val() === null) {
          
        // } else {
          
        //   dispatch(addTheuserscounti(snapshot.val()));
        // }
       
      });
  };
};

// REMOVE_SETTINGS
export const removeTheuserscounti = () => ({
  type: "REMOVE_THEUSERSCOUNTI",
});

export const startRemoveTheuserscounti = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theuserscounti`)
      .remove()
      .then(() => {
        dispatch(removeTheuserscounti());
      });
  };
};

// EDIT_LINK
export const editTheuserscounti = (updates) => ({
  type: "EDIT_THEUSERSCOUNTI",
  updates,
});

export const startEditTheuserscounti = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theuserscounti`)
      .update(updates)
      .then(() => {
        dispatch(editTheuserscounti(updates));
      });
  };
};


export const addTheuserscounti = (theuserscounti) => ({
  type: "ADD_THEUSERSCOUNTI",
  theuserscounti,
});

export const incrementUsersClickCounti2 = (theuserscounti) => ({
  type: "INCREMENT_USERS_COUNTI",
  theuserscounti,
});

export const decrementUsersClickCounti2 = (theuserscounti) => ({
  type: "DECREMENT_USERS_COUNTI",
  theuserscounti,
});

export const incrementUsersClickCounti = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theuserscounti`)
      .update({userscounti:parseInt(x.userscounti)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementUsersClickCounti2({userscounti:parseInt(x.userscounti)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementUsersCounti = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theuserscounti`)
      .update({userscounti:parseInt(x.userscounti)-1}) //{showpublic:0}
      //.update({userscounti:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementUsersClickCounti2({userscounti:parseInt(x.userscounti)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
