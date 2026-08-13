import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";

// ADD_LINK
export const addThetotalstars = (thetotalstars) => ({
  type: "ADD_THETOTALSTARS",
  thetotalstars,
});

// SET_SETTINGS
export const setThetotalstars = (thetotalstars) => ({
  type: "SET_THETOTALSTARS",
  thetotalstars,
});

export const startAddThetotalstars = (thetotalstarsData = {}) => {
  console.log("startAddThetotalstars, thetotalstarsData=" + JSON.stringify(thetotalstarsData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/thetotalstars`)
        //.push(settingsData)
        .update(thetotalstarsData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
          // dispatch(
          //   addTheplan({
          //     ...theplanData,
          //   })
          // );

          dispatch(addThetotalstars(thetotalstarsData));
          
        })
    );
  };
};

export const getThetotalstars2 = (id) => {
  console.log("actions/getThetotalstars");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getThetotalstars2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/thetotalstars`)
      .once("value")
      .then((snapshot) => {
        let thetotalstars
       
        console.log(
          "action/getThetotalstars from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let ztotalstars={
           totalstars:5
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThetotalstars(ztotalstars))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addThetotalstars(snapshot.val()));
        }
       
      });
  };
};

export const getThetotalstars = (uid) => {
  console.log("actions/getThetotalstars, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getThetotalstars, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/thetotalstars`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getThetotalstars from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let ztotalstars={
           totalstars:0
        }
//
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThetotalstars(ztotalstars))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addThetotalstars(snapshot.val()));
        }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeThetotalstars = () => ({
  type: "REMOVE_THETOTALSTARS",
});

export const startRemoveThetotalstars = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thetotalstars`)
      .remove()
      .then(() => {
        dispatch(removeThetotalstars());
      });
  };
};

// EDIT_LINK
export const editThetotalstars = (updates) => ({
  type: "EDIT_THETOTALSTARS",
  updates,
});

export const startEditThetotalstars = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thetotalstars`)
      .update(updates)
      .then(() => {
        dispatch(editThetotalstars(updates));
      });
  };
};

export const incrementTotalStarClickCount2 = (id, thetotalstars) => ({
  type: "INCREMENT_TOTAL_STAR_COUNT",
  thetotalstars,
});

export const decrementTotalStarClickCount2 = (id, thetotalstars) => ({
  type: "DECREMENT_TOTAL_STAR_COUNT",
  thetotalstars,
});

export const incrementTotalStarClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thetotalstars`)
      .update({totalstars:parseInt(x.totalstars)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementTotalStarClickCount2({totalstars:parseInt(x.totalstars)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementTotalStarClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thetotalstars`)
      .update({totalstars:parseInt(x.totalstars)-1}) //{showpublic:0}
      //.update({totalstars:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementTotalStarClickCount2({totalstars:parseInt(x.totalstars)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
