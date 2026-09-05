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

export const getThetotalloggedout = () => {
  return (dispatch, getState) => {
    
    return database
      .ref(`users/thetotalloggedout`)
      .once("value")
      .then((snapshot) => {

        let ztotalloggedout={
           totalloggedout:0
        }

        if (snapshot.val() === null) {
          dispatch(startAddThetotalloggedout(ztotalloggedout))
        } else {
          dispatch(addThetotalloggedout(snapshot.val()));      
        }
        
      });
  };
};


export const getThetotalloggedout2 = () => {
  console.log("actions/getThetotalloggedout");
  return (dispatch, getState) => {
    
    return database
      .ref(`users/thetotalloggedout`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() === null) {
        } else {
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

export const incrementTotalLoggedOutClickCount = async (x) => {
     console.log("incrementTotalLoggedOutClickCount success 1")
  return async (dispatch, getState) => {
     console.log("incrementTotalLoggedOutClickCount success 2")
    //const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    //return 
    
    await database
      .ref(`users/thetotalloggedout`)
      .update({totalloggedout:parseInt(x.totalloggedout)+1}) //{showpublic:0}
      .then(() => {
        console.log("incrementTotalLoggedOutClickCount success 3")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementTotalLoggedOutClickCount2({totalloggedout:parseInt(x.totalloggedout)+1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

// export const incrementTotalLoggedOutClickCount = (uid) => {
//   console.log("actions/incrementTotalLoggedOutClickCount");
//   //const uid = getState().auth.uid;
//   return (dispatch, getState) => {
//     //const uid = getState().auth.uid;
//     let s;
//     return database

//       .ref(`users/thetotalloggedout`)
//       .once("value")
//       .then((snapshot) => {
//         let ztotalloggedout = {
//           totalloggedout: 0,
//         };

//         if (snapshot.val() === null) {
//           //theplan = "free";
//           dispatch(startAddThetotalloggedout(ztotalloggedout));
//         } else {
//           //theplan=snapshot.val();

//           let x = snapshot.val();
//           if (x.totalloggedout === undefined || x.totalloggedout === null)
//             x.userscount = 0;
//           else x.totalloggedout += 1;
//           console.log(
//             "updating totalloggedout,ztotalloggedout.totalloggedout=" +
//               JSON.stringify(x),
//           );
//           //incrementUsersClickCounti(uid,zuserscounti) //update the database

//           return database
//             .ref(`users/${uid}/thetotalloggedout`)
//             .update(x) //{showpublic:0}
//             .then(() => {
//               dispatch(addThetotalloggedout(x));
//             })
//             .catch((error) => {
//               console.log(
//                 "error removing link data in firebase, error=" + error,
//               );
//             });
//         }
//       });
//   };
// };

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
