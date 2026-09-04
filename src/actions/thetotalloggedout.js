import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setThetotalloggedout = (thetotalloggedout) => ({
  type: "SET_THETOTALLOGGEDOUT",
  thetotalloggedout,
});

export const startAddThetotalloggedout = (thetotalloggedoutData = {}) => {
  console.log("startAddThetotalloggedout, thetotalloggedoutData=" + JSON.stringify(thetotalloggedoutData));
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;

    return (
      database
        .ref(`users/thetotalloggedout`)
        //.push(settingsData)
        .update(thetotalloggedoutData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addThetotalloggedout(thetotalloggedoutData));
          
        })
    );
  };
};

export const getThetotalloggedout = (uid) => {
  console.log("actions/getThetotalloggedout, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getThetotalloggedout, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/thetotalloggedout`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getThetotalloggedout from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let ztotalloggedout={
           totalloggedout:0
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThetotalloggedout(ztotalloggedout))
        } else {
          
          dispatch(addThetotalloggedout(snapshot.val()));
         

          
        }
        
      });
  };
};


export const getThetotalloggedout2 = (id) => {
  console.log("actions/getThetotalloggedout");
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getThetotalloggedout2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/thetotalloggedout`)
      .once("value")
      .then((snapshot) => {
        let thetotalloggedout
       
        console.log(
          "action/getThetotalloggedout from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let ztotalloggedout={
           totalloggedout:0
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThetotalloggedout(ztotalloggedout))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addThetotalloggedout(snapshot.val()));
        }
       
      });
  };
};





// REMOVE_SETTINGS
export const removeThetotalloggedout = () => ({
  type: "REMOVE_THETOTALLOGGEDOUT",
});

export const startRemoveThetotalloggedout = () => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    return database
      .ref(`users/thetotalloggedout`)
      .remove()
      .then(() => {
        dispatch(removeThetotalloggedout());
      });
  };
};

// EDIT_LINK
export const editThetotalloggedout = (updates) => ({
  type: "EDIT_THETOTALLOGGEDOUT",
  updates,
});

export const startEditThetotalloggedout = (updates) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    return database
      .ref(`users/thetotalloggedout`)
      .update(updates)
      .then(() => {
        dispatch(editThetotalloggedout(updates));
      });
  };
};


export const addThetotalloggedout = (thetotalloggedout) => ({
  type: "ADD_THETOTALLOGGEDOUT",
  thetotalloggedout,
});

export const incrementTotalLoggedOutClickCount2 = (thetotalloggedout) => ({
  type: "INCREMENT_TOTAL_LOGGEDOUT_COUNT",
  thetotalloggedout,
});

export const decrementTotalLoggedOutClickCount2 = (thetotalloggedout) => ({
  type: "DECREMENT_TOTAL_LOGGEDOUT_COUNT",
  thetotalloggedout,
});

export const incrementTotalLoggedOutClickCount = (x) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/thetotalloggedout`)
      .update({totalloggedout:parseInt(x.totalloggedout)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementTotalLoggedOutClickCount2({totalloggedout:parseInt(x.totalloggedout)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementTotalLoggedOutClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/thetotalloggedout`)
      .update({totalloggedout:parseInt(x.totalloggedout)-1}) //{showpublic:0}
      //.update({totalloggedout:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementTotalLoggedOutClickCount2({totalloggedout:parseInt(x.totalloggedout)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
