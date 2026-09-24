
import database from "../firebase/firebase";
import {v4} from "uuid"

export const getGoogleUserData = () => {
  console.log("actions/getGoogleUserData")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getPhotourl, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/gud`)
      .once("value")
      .then((snapshot) => {
        
       let gud
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        gud = snapshot.val()

         if(gud === undefined || gud === null)
                    dispatch(setGoogleUserData({gud:{}}));
                else dispatch(setGoogleUserData(gud));
       
      })
    }
};


export const addGoogleUserData = (gud) => ({
  type: "ADD_GOOGLEUSERDATA",
  gud,
});

export const startAddGoogleUserData = (gud = {}) => {
  const gud2 = gud
  console.log("startAddGoogleUserData, gud2="+JSON.stringify(gud2))

  return (dispatch, getState) => { //0
    const uid = getState().auth.uid;
  
    database
      .ref(`users/${uid}/gud/gud`)
      .once("value")
      .then((snapshot) => { //1
        console.log("startAddGoogleUserData, snapshot.val()="+JSON.stringify(snapshot.val()))
        console.log("startAddGoogleUserData, snapshot.val().theatname="+snapshot.val().theatname)
         console.log("startAddGoogleUserData, gud2.theatname="+gud2.theatname)
        if(snapshot.val().theatname !== gud2.theatname) {
            console.log("!==, startAddGoogleUserData")
            return database
              .ref(`users/${uid}/gud`)
              .update(gud2)
              .then(() => { //2
               console.log("actions/gud.js, startAddGoogleUserData, just before the call to dispatch to add google user Data to redux, gud="+JSON.stringify(gud))
              dispatch(
                addGoogleUserData({
                ...gud2,
              }))
            }) //2

  } else {
    //apend the guid to the user name
    //
    console.log("!==, startAddGoogleUserData")
    gud2.theatname = gud2.theatname+v4()
    console.log("!==, startAddGoogleUserData, gud2.theatname="+gud2.theatname)
    return database
              .ref(`users/${uid}/gud`)
              .update(gud)
              .then(() => { //2
               console.log("actions/gud.js, startAddGoogleUserData, just before the call to dispatch to add google user Data to redux, gud="+JSON.stringify(gud))
              dispatch(
                addGoogleUserData({
                ...gud,
              }))
            }) //2
  }
  }) //1
} //0
}


// export const startAddGoogleUserData = (gud = {}) => {
//   console.log("actions/photourl.js, startAddPhotourl, photourl="+JSON.stringify(gud))
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
  
//     return database
//       .ref(`users/${uid}/gud`)
//       .update(gud)
//       .then(() => {
//         console.log("actions/gud.js, startAddGoogleUserData, just before the call to dispatch to add google user Data to redux, gud="+JSON.stringify(gud))
//         dispatch(
//           addGoogleUserData({
//             ...gud,
//           })
//         );
//       });
//   };
// };

export const removeGoogleUserData = () => ({
  type: "REMOVE_GOOGLEUSERDATA",
});

export const startRemoveGoogleUserData = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/gud`)
      .remove()
      .then(() => {
        dispatch(removeGoogleUserData());
      });
  };
};

// EDIT_LINK
export const editGoogleUserData = (updates) => ({
  type: "EDIT_GOOGLEUSERDATA",
  updates,
});

export const startEditGoogleUserData = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/gud`)
      .update(updates)
      .then(() => {
        dispatch(editGoogleUserData(updates));
      });
  };
};

// SET_SETTINGS
export const setGoogleUserData = (gud) => ({
  type: "SET_GOOGLEUSERDATA",
  gud,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetGoogleUserData = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/gud`)
      .once("value")
      .then((snapshot) => {
          
        let gud
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          gud = "";
        } else if (snapshot.val() === undefined) {
          gud = "";
        } else {
          gud=snapshot.val();
        }
       
        dispatch(setGoogleUserData(gud))
      
      }).catch(error=>console.log("error="+error));
  };

};

