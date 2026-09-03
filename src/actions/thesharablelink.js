import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setThesharablelink = (thesharablelink) => ({
  type: "SET_THESHARABLELINK",
  thesharablelink,
});

export const startAddThesharablelink = (thesharablelinkData = {}) => {
  console.log("startAddThesharablelink, thesharablelinkData=" + JSON.stringify(thesharablelinkData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/thesharablelink`)
        //.push(settingsData)
        .update(thesharablelinkData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addThesharablelink(thesharablelinkData));
          
        })
    );
  };
};

export const getThesharablelink2 = (id) => {
  console.log("actions/getThesharablelink");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getThesharablelink2, uid=" + uid);
    let s;
    return database
      .ref(`users/${uid}/thesharablelink`)
      .once("value")
      .then((snapshot) => {
        let thesharablelink
       
        console.log(
          "action/getThesharablelink from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zsharablelink={
           sharablelink:"https://urilinks.com/dashboard?signup=0&x=readonly&id="+uid
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThesharablelink(zsharablelink))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addThesharablelink(snapshot.val()));
        }
       
      });
  };
};

export const getThesharablelink = (uid) => {
  console.log("actions/getThesharablelink, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getThesharablelink, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/thesharablelink`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getThesharablelink from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zsharablelink={
           sharablelink:"https://urilinks.com/dashboard?signup=0&x=readonly&id="+uid
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThesharablelink(zsharablelink))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addThesharablelink(snapshot.val()));
        }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeThesharablelink = () => ({
  type: "REMOVE_THESHARABLELINK",
});

export const startRemoveThesharablelink = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thesharablelink`)
      .remove()
      .then(() => {
        dispatch(removeThesharablelink());
      });
  };
};

// EDIT_LINK
export const editThesharablelink = (updates) => ({
  type: "EDIT_THESHARABLELINK",
  updates,
});

export const startEditThesharablelink = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/thesharablelink`)
      .update(updates)
      .then(() => {
        dispatch(editThesharablelink(updates));
      });
  };
};


export const addThesharablelink = (thesharablelink) => ({
  type: "ADD_THESHARABLELINK",
  thesharablelink,
});

export const incrementSharableLinkClickCount2 = (thesharablelink) => ({
  type: "INCREMENT_SHARABLE_LINK_COUNT",
  thesharablelink,
});

export const decrementSharableLinkClickCount2 = (thesharablelink) => ({
  type: "DECREMENT_SHARABLE_LINK_COUNT",
  thesharablelink,
});

export const incrementSharableLinkClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thesharablelink`)
      .update({sharablelink:parseInt(x.sharablelink)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementSharableLinkClickCount2({sharablelink:parseInt(x.sharablelink)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementSharableLinkClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/thesharablelink`)
      .update({sharablelink:parseInt(x.sharablelink)-1}) //{showpublic:0}
      //.update({sharablelink:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementSharableLinkClickCount2({sharablelink:parseInt(x.sharablelink)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
