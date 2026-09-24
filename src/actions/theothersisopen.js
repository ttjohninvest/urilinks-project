import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setTheothersisopen = (theothersisopen) => ({
  type: "SET_THEOTHERSISOPEN",
  theothersisopen,
});

export const startAddTheothersisopen = (theothersisopenData = {}) => {
  console.log("startAddTheothersisopen, theothersisopenData=" + JSON.stringify(theothersisopenData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theothersisopen`)
        //.push(settingsData)
        .update(theothersisopenData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          //dispatch(addTheothersisopen(theothersisopenData));
          dispatch(setTheothersisopen(theothersisopenData));
          
        })
    );
  };
};

export const getTheothersisopen2 = (id) => {
  console.log("actions/getTheothersisopen");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTheothersisopen2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/theothersisopen`)
      .once("value")
      .then((snapshot) => {
        let theothersisopen
       
        console.log(
          "action/getTheothersisopen2 from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zothersisopen={
           othersisopen:0
        }

         dispatch(startAddTheothersisopen(zothersisopen)) //always reinitialize it if it was open when the program was closed

        // if (snapshot.val() === null) {
        //   //theplan = "free";
        //   dispatch(startAddTheothersisopen(zothersisopen))
        // } else {
        //   //theplan=snapshot.val();
        //   //zplan=snapshot.val();
        //   dispatch(addTheothersisopen(snapshot.val()));
        // }
       
      });
  };
};

export const getTheothersisopen = (uid) => {
  console.log("actions/getTheothersisopen, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheothersisopen, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/theothersisopen`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getTheothersisopen from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zothersisopen={
           othersisopen:0
        }
////
        dispatch(startAddTheothersisopen(zothersisopen)) //always reinitialize it if it was open when the program was closed

        // if (snapshot.val() === null) {
        //   //theplan = "free";
        //   dispatch(startAddTheothersisopen(zothersisopen))
        // } else {
        //   //theplan=snapshot.val();
        //   //zplan=snapshot.val();
        //   //console.log("app.js, zplan="+JSON.stringify(zplan))
        //   dispatch(addTheothersisopen(snapshot.val()));
        // }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeTheothersisopen = () => ({
  type: "REMOVE_THEOTHERSISOPEN",
});

export const startRemoveTheothersisopen = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theothersisopen`)
      .remove()
      .then(() => {
        dispatch(removeTheothersisopen());
      });
  };
};

// EDIT_LINK
export const editTheothersisopen = (updates) => ({
  type: "EDIT_THEOTHERSISOPEN",
  updates,
});

export const startEditTheothersisopen = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theothersisopen`)
      .update(updates)
      .then(() => {
        dispatch(editTheothersisopen(updates));
      });
  };
};


export const addTheothersisopen = (theothersisopen) => ({
  type: "ADD_THEOTHERSISOPEN",
  theothersisopen,
});

export const incrementOthersIsOpenClickCount2 = (theothersisopen) => ({
  type: "INCREMENT_OTHERS_ISOPEN_COUNT",
  theothersisopen,
});

export const decrementOthersIsOpenClickCount2 = (theothersisopen) => ({
  type: "DECREMENT_OTHERS_ISOPEN_COUNT",
  theothersisopen,
});

export const incrementOthersIsOpenClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theothersisopen`)
      .update({othersisopen:parseInt(x.othersisopen)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementOthersIsOpenClickCount2({othersisopen:parseInt(x.othersisopen)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementOthersIsOpenClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theothersisopen`)
      .update({othersisopen:parseInt(x.othersisopen)-1}) //{showpublic:0}
      //.update({totalstars:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementOthersIsOpenClickCount2({othersisopen:parseInt(x.othersisopen)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
