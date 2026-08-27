import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setThehashtagsisopen = (thehashtagsisopen) => ({
  type: "SET_THETHEHASHTAGSISOPEN",
  thehashtagsisopen,
});

export const startAddThehashtagsisopen = (thehashtagsisopenData = {}) => {
  console.log("startAddThehashtagsisopen, thehashtagsisopenData=" + JSON.stringify(thehashtagsisopenData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/thehashtagsisopen`)
        //.push(settingsData)
        .update(thehashtagsisopenData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addThehashtagsisopen(thehashtagsisopenData));
          
        })
    );
  };
};

export const getThehashtagsisopen2 = (id) => {
  console.log("actions/getThehashtagsisopen");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getThehashtagsisopen2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/thehashtagsisopen`)
      .once("value")
      .then((snapshot) => {
        let thehashtagsisopen
       
        console.log(
          "action/getThehashtagsisopen from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zhashtagsisopen={
           hashtagsisopen:0
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThehashtagsisopen(zhashtagsisopen))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addThehashtagsisopen(snapshot.val()));
        }
       
      });
  };
};

export const getThehashtagsisopen = (uid) => {
  console.log("actions/getThehashtagsisopen, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getThehashtagsisopen, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/thehashtagsisopen`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getThehashtagsisopen from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zhashtagsisopen={
           hashtagsisopen:0
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThehashtagsisopen(zhashtagsisopen))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addThehashtagsisopen(snapshot.val()));
        }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeThehashtagsisopen = () => ({
  type: "REMOVE_THEHASHTAGSISOPEN",
});

export const startRemoveThehashtagsisopen = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thehashtagsisopen`)
      .remove()
      .then(() => {
        dispatch(removeThehashtagsisopen());
      });
  };
};

// EDIT_LINK
export const editThehashtagsisopen = (updates) => ({
  type: "EDIT_THEHASHTAGSISOPEN",
  updates,
});

export const startEditThehastagsisopen = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thehashtagsisopen`)
      .update(updates)
      .then(() => {
        dispatch(editThehashtagsisopen(updates));
      });
  };
};


export const addThehashtagsisopen = (thehashtagsisopen) => ({
  type: "ADD_THEHASHTAGSISOPEN",
  thehashtagsisopen,
});

export const incrementHashtagsIsOpenClickCount2 = (thehashtagsisopen) => ({
  type: "INCREMENT_HASHTAGS_ISOPEN_COUNT",
  thehashtagsisopen,
});

export const decrementHashtagsIsOpenClickCount2 = (thehashtagsisopen) => ({
  type: "DECREMENT_TOTAL_STAR_COUNT",
  thehashtagsisopen,
});

export const incrementHashtagsIsOpenClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thehashtagsisopen`)
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

export const decrementHashtagsIsOpenClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thehashtagsisopen`)
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
