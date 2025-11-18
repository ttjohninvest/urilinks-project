import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";

// ADD_LINK
export const addTheplan = (theplan) => ({
  type: "ADD_THEPLAN",
  theplan,
});

// SET_SETTINGS
export const setTheplan = (theplan) => ({
  type: "SET_THEPLAN",
  theplan,
});

export const startAddTheplan = (theplanData = {}) => {
  console.log("startAddTheplan, theplanData=" + JSON.stringify(theplanData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theplan`)
        //.push(settingsData)
        .update(theplanData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux"
          );
          // dispatch(
          //   addTheplan({
          //     ...theplanData,
          //   })
          // );
          dispatch(setTheplan(theplanData));
        })
    );
  };
};


export const getTheplan = () => {
  console.log("actions/getTheplan");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTheplan, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/theplan`)
      .once("value")
      .then((snapshot) => {
        let theplan
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );
//startAddTheplan
        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //
        let zplan={
          plan:"free",
          subscriptionid:"",
          customerId:""
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          startAddTheplan(zplan)
        } else {
          //theplan=snapshot.val();
          zplan=snapshot.val();
        }
        //dispatch(setTheplan(theplan));
        //dispatch(setTheplan(snapshot.val()));
        dispatch(setTheplan(zplan));
        // if(theplan === undefined || theplan === null)
        //     dispatch(setTheplan({plan:"free"}));
        // //else dispatch(setTheplan(theplan));
        // else {
        //     const p = snapshot().val().plan
        //     dispatch(setTheplan({plan:p}));
        // }
      });
  };
};




// REMOVE_SETTINGS
export const removeTheplan = () => ({
  type: "REMOVE_THEPLAN",
});

export const startRemoveTheplan = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theplan`)
      .remove()
      .then(() => {
        dispatch(removeTheplan());
      });
  };
};

// EDIT_LINK
export const editTheplan = (updates) => ({
  type: "EDIT_THEPLAN",
  updates,
});

export const startEditTheplan = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/theplan`)
      .update(updates)
      .then(() => {
        dispatch(editTheplan(updates));
      });
  };
};



//this puts the links array in the global redux store to be used to list the output
// export const startSetTheplan = () => {

//   return (dispatch, getState) => {

//     const uid = getState().auth.uid;

//     return database
//       .ref(`users/${uid}/theplan`)
//       .once("value")
//       .then((snapshot) => {
//         console.log("on startup, startSetTheplan, about to call dispatch(setTheplan(settings));, theplan="+JSON.stringify(snapshot));
//         const xy1 = JSON.parse(JSON.stringify(snapshot))
//         let xy
//         if(xy1) {
//           console.log(xy1.selectedOption1)
//           console.log(xy1.selectedOption2)
//           xy={
//             selectedOption1:xy1.selectedOption1,
//             selectedOption2:xy1.selectedOption2
//           }
//         } else {
//           xy={
//             selectedOption1:"",
//             selectedOption2:""
//           }
//         }

//         dispatch(setSettings(xy))

//       }).catch(error=>console.log("error="+error));
//   };

// };
