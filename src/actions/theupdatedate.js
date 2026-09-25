import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setTheupdatedate = (theupdatedate) => ({
  type: "SET_THEUPDATEDATE",
  theupdatedate,
});

export const startAddTheupdatedate = (theupdatedateData = {}) => {
  console.log("startAddTheupdatedate, theupdatedateData=" + JSON.stringify(theupdatedateData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theupdatedate`)
        //.push(settingsData)
        .update(theupdatedateData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addTheupdatedate(theupdatedateData));
          
        })
    );
  };
};

export const getTheupdatedate2 = (uid) => {
  console.log("actions/getTheupdatedate2");
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheupdatedate2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/theupdatedate`)
      .once("value")
      .then((snapshot) => {
        let theupdatedate
       
        console.log(
          "action/getTheupdatedate2 from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zupdatedate={
           updatedate:0
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheupdatedate(zupdatedate))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addTheupdatedate(snapshot.val()));
        }
       
      });
  };
};

export const getTheupdatedate = (uid) => {
  console.log("actions/getTheupdatedate, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheupdatedate, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/theupdatedate`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getTheupdatedate from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zupdatedate={
           updatedate:0
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheupdatedate(zupdatedate))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addTheupdatedate(snapshot.val()));
        }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeTheupdatedate = () => ({
  type: "REMOVE_THEUPDATEDATE",
});

export const startRemoveTheupdatedate = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theupdatedate`)
      .remove()
      .then(() => {
        dispatch(removeTheupdatedate());
      });
  };
};

// EDIT_LINK
export const editTheupdatedate = (updates) => ({
  type: "EDIT_THEUPDATEDATE",
  updates,
});

export const startEditTheupdatedate = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theupdatedate`)
      .update(updates)
      .then(() => {
        dispatch(editTheupdatedate(updates));
      });
  };
};


export const addTheupdatedate = (theupdatedate) => ({
  type: "ADD_THEUPDATEDATE",
  theupdatedate,
});

export const incrementTotalStarClickCount2 = (theupdatedate) => ({
  type: "INCREMENT_TOTAL_STAR_COUNT",
  theupdatedate,
});

export const decrementTotalStarClickCount2 = (theupdatedate) => ({
  type: "DECREMENT_TOTAL_STAR_COUNT",
  theupdatedate,
});

export const incrementTotalStarClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theupdatedate`)
      .update({updatedate:parseInt(x.updatedate)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementTotalStarClickCount2({updatedate:parseInt(x.updatedate)+1}));
       
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
      .ref(`users/${uid}/theupdatedate`)
      .update({updatedate:parseInt(x.updatedate)-1}) //{showpublic:0}
      //.update({updatedate:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementTotalStarClickCount2({updatedate:parseInt(x.updatedate)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
