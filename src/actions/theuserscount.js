import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";



// SET_SETTINGS
export const setTheuserscount = (theuserscount) => ({
  type: "SET_THEUSERSCOUNT",
  theuserscount,
});

export const startAddTheuserscount = (theuserscountData = {}) => {
  console.log("startAddTheuserscount, theuserscountData=" + JSON.stringify(theuserscountData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/theuserscount`)
        //.push(settingsData)
        .update(theuserscountData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
         

          dispatch(addTheuserscount(theuserscountData));
          
        })
    );
  };
};

export const getTheuserscount2 = (id) => {
  console.log("actions/getTheuserscount");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTheuserscount2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/theuserscount`)
      .once("value")
      .then((snapshot) => {
        let theuserscount
       
        console.log(
          "action/getTheuserscount from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zuserscount={
           userscount:0
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheuserscount(zuserscount))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addTheuserscount(snapshot.val()));
        }
       
      });
  };
};

export const getTheuserscount = (uid) => {
  console.log("actions/getTheuserscount, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheuserscount, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/theuserscount`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getTheuserscount from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zuserscount={
           userscount:0
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheuserscount(zuserscount))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addTheuserscount(snapshot.val()));
        }
        
      });
  };
};




// REMOVE_SETTINGS
export const removeTheuserscount = () => ({
  type: "REMOVE_THEUSERSCOUNT",
});

export const startRemoveTheuserscount = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/theuserscount`)
      .remove()
      .then(() => {
        dispatch(removeTheuserscount());
      });
  };
};

// EDIT_LINK
export const editTheuserscount = (updates) => ({
  type: "EDIT_THEUSERSCOUNT",
  updates,
});

export const startEditTheuserscount = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/theuserscount`)
      .update(updates)
      .then(() => {
        dispatch(editTheuserscount(updates));
      });
  };
};


export const addTheuserscount = (theuserscount) => ({
  type: "ADD_THEUSERSCOUNT",
  theuserscount,
});

export const incrementUsersClickCount2 = (theuserscount) => ({
  type: "INCREMENT_USERS_COUNT",
  theuserscount,
});

export const decrementUsersClickCount2 = (theuserscount) => ({
  type: "DECREMENT_USERS_COUNT",
  theuserscount,
});

export const incrementUsersClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/theuserscount`)
      .update({userscount:parseInt(x.userscount)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementUsersClickCount2({userscount:parseInt(x.userscount)+1}));
       
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementUsersCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/theuserscount`)
      .update({userscount:parseInt(x.userscount)-1}) //{showpublic:0}
      //.update({userscount:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementUsersClickCount2({userscount:parseInt(x.userscount)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};
