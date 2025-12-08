
import database from "../firebase/firebase";

export const getShowPublic2 = (uid) => {
  console.log("actions/getShowPublic2")
  return (dispatch, getState) => {
    
  console.log("actions/getShowPublic2, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/showpublic`)
      .once("value")
      .then((snapshot) => {
        
       let sp
        console.log("action/getShowPublic2 from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        sp = snapshot.val()

         if(sp.showpublic === undefined || sp.showpublic === null)
                    dispatch(setShowPublic({sp:""}));
                else dispatch(setShowPublic(sp));
       
      })
    }
};

// export const getShowPublic2 = (uid) => {
//   console.log("actions/getShowPublic2")
//   return (dispatch, getState) => {
    
//   console.log("actions/getShowPublic2, uid="+uid)
//   let s
//    return database
//       .ref(`users/${uid}/showpublic`)
//       .once("value")
//       .then((snapshot) => {
        
//        let sp
//         console.log("action/getShowPublic2 from db, snapshot.val()="+JSON.stringify(snapshot.val()))
//         sp = snapshot.val()

//          if(sp.showpublic === undefined || sp.showpublic === null)
//                     dispatch(setShowPublic({sp:""}));
//                 else dispatch(setShowPublic(sp));
       
//       })
//     }
// };

export const getShowPublic = () => {
  console.log("actions/getShowPublic")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getEmail, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/showpublic`)
      .once("value")
      .then((snapshot) => {
        
       let sp
        console.log("action/getShowPublic from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        sp = snapshot.val()

         if(sp.showpublic === undefined || sp.showpublic === null)
                    dispatch(setShowPublic({sp:""}));
                else dispatch(setShowPublic(sp));
       
      })
    }
};


export const addShowPublic = (sp) => ({
  type: "ADD_SP",
  sp,
});


export const startAddShowPublic = (sp = {}) => {
  console.log("actions/email.js, startAddEmail, email="+JSON.stringify(sp))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/showpublic`)
      .update(sp)
      .then(() => {
        console.log("actions/email.js, startAddEmail, just before the call to dispatch to add settingsData to redux, photpurl="+JSON.stringify(email))
        dispatch(
          addShowPublic({
            ...sp,
          })
        );
      });
  };
};

export const removeShowPublic = () => ({
  type: "REMOVE_SP",
});

export const removeAccount = () => ({
  type: "ADD_SP",
});

export const startRemoveShowPublic = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/showpublic`)
      .remove()
      .then(() => {
        dispatch(removeShowPublic());
      });
  };
};

export const startDeleteAccount = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}`)
      .remove()
      .then(() => {
        dispatch(removeAccount());
      });
  };
};

// EDIT_LINK
export const editShowPublic = (updates) => ({
  type: "EDIT_SP",
  updates,
});

export const startEditShowPublic = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/showpublic`)
      .update(updates)
      .then(() => {
        dispatch(editShowPublic(updates));
      });
  };
};

// SET_SETTINGS
export const setShowPublic = (sp) => ({
  type: "SET_SP",
  sp,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetShowPublic = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/showpublic`)
      .once("value")
      .then((snapshot) => {
          
        let sp
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + snapshot.val()
        );

        if (snapshot.val() === null) {
          sp = "";
        } else if (snapshot.val() === undefined) {
          sp = "";
        } else {
          sp=snapshot.val();
        }
       
        dispatch(setShowPublic(sp))
      
      }).catch(error=>console.log("error="+error));
  };

};
