import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";

// SET_SETTINGS
export const setTheloggedin = (theloggedin) => ({
  type: "SET_THELOGGEDIN",
  theloggedin,
});

export const startAddTheloggedin = (theloggedinData = {}) => {
  console.log(
    "startAddTheloggedin, theloggedinData=" + JSON.stringify(theloggedinData),
  );
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theloggedin`)
        //.push(settingsData)
        .update(theloggedinData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux",
          );

          dispatch(addTheloggedin(theloggedinData));
        })
    );
  };
};

// export const getTheloggedin2 = (id) => {
//   console.log("actions/getTheloggedin");
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     console.log("actions/getTheloggedin2, uid=" + uid);
//     let s;
//     return database

//       .ref(`users/${uid}/theloggedin`)
//       .once("value")
//       .then((snapshot) => {
//         let x = {
//           loggedin: 0,
//         };

//         return database
//           .ref(`users/${uid}/theloggedin`)
//           .update(x) //{showpublic:0}
//           .then(() => {
//             dispatch(addTheloggedin(x));
//           })
//           .catch((error) => {
//             console.log("error removing link data in firebase, error=" + error);
//           });
//       });
//   };
// };

export const getTheloggedin2 = (id) => {
  console.log("actions/getTheloggedin");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTheloggedin2, uid=" + uid);

    let x = {
      loggedin: 0,
    };

    return database
      .ref(`users/${uid}/theloggedin`)
      .update(x) //{showpublic:0}
      .then(() => {
        dispatch(addTheloggedin(x));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

// export const getTheloggedin = (uid) => {
//   console.log("actions/getTheloggedin, uid="+uid);
//   return (dispatch, getState) => {
//     //const uid = getState().auth.uid;
//     console.log("actions/getTheloggedin, uid=" + uid);
//     let s;
//     return database
//       //.ref(`users/${uid}/theplan/plan`)
//       .ref(`users/${uid}/theloggedin`)
//       .once("value")
//       .then((snapshot) => {

//       if(snapshot.val()===null || snapshot.val().loggedin === 0) { //if not loggedin because snapshot.val().loggedin is zero, set it to loggedin
//            let x = {
//             loggedin:1
//          }

//           return database
//             .ref(`users/${uid}/theloggedin`)
//             .update(x) //{showpublic:0}
//             .then(() => {
//               dispatch(addTheloggedin(x));
//             })
//             .catch((error) => {
//               console.log(
//                 "error removing link data in firebase, error=" + error,
//               );
//             });
//       } else {

//       }

//       });
//   };
// };

export const getTheloggedin = (uid) => {
  console.log("actions/getTheloggedin, uid=" + uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheloggedin, uid=" + uid);

    let x = {
      loggedin: 1,
    };

    return database
      .ref(`users/${uid}/theloggedin`)
      .update(x) //{showpublic:0}
      .then(() => {
        console.log("getTheloggedin succeeded");
        dispatch(addTheloggedin(x));
      })
      .catch((error) => {
        console.log("error getTheloggedin, error=" + error);
      });
  };
};

// REMOVE_SETTINGS
export const removeTheloggedin = () => ({
  type: "REMOVE_THELOGGEDIN",
});

export const startRemoveTheloggedin = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theloggedin`)
      .remove()
      .then(() => {
        dispatch(removeTheloggedin());
      });
  };
};

// EDIT_LINK
export const editTheloggedin = (updates) => ({
  type: "EDIT_THELOGGEDIN",
  updates,
});

export const startEditLoggedIn = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theloggedin`)
      .update(updates)
      .then(() => {
        dispatch(editTheloggedin(updates));
      });
  };
};

export const addTheloggedin = (theloggedin) => ({
  type: "ADD_THELOGGEDIN",
  theloggedin,
});

export const incrementLoggedInClickCount2 = (theloggedin) => ({
  type: "INCREMENT_LOGGEDIN_COUNT",
  theloggedin,
});

export const decrementLoggedInClickCount2 = (theloggedin) => ({
  type: "DECREMENT_LOGGEDIN_COUNT",
  theloggedin,
});

export const incrementLoggedInClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/theloggedin`)
      .update({ loggedin: parseInt(x.loggedin) + 1 }) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(
          incrementLoggedInClickCount2({ loggedin: parseInt(x.loggedin) + 1 }),
        );
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementLoggedInClickCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return (
      database
        .ref(`users/${uid}/theloggedin`)
        .update({ loggedin: parseInt(x.loggedin) - 1 }) //{showpublic:0}
        //.update({totalstars:4})
        .then(() => {
          //alert("success")
          //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
          dispatch(
            decrementLoggedInClickCount2({
              loggedin: parseInt(x.loggedin) - 1,
            }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        })
    );
  };
};
