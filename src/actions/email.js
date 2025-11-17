
import database from "../firebase/firebase";

export const getEmail = () => {
  console.log("actions/getEmail")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getEmail, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/email`)
      .once("value")
      .then((snapshot) => {
        
       let email
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        email = snapshot.val()

         if(email === undefined || email === null)
                    dispatch(setEmail({email:""}));
                else dispatch(setEmail(email));
       
      })
    }
};


export const addEmail = (email) => ({
  type: "ADD_PHOTOURL",
  email,
});


export const startAddEmail = (email = {}) => {
  console.log("actions/email.js, startAddEmail, email="+JSON.stringify(email))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/email`)
      .update(email)
      .then(() => {
        console.log("actions/email.js, startAddEmail, just before the call to dispatch to add settingsData to redux, photpurl="+JSON.stringify(email))
        dispatch(
          addEmail({
            ...email,
          })
        );
      });
  };
};

export const removeEmail = () => ({
  type: "REMOVE_SETTINGS",
});

export const startRemoveEmail = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/email`)
      .remove()
      .then(() => {
        dispatch(removeEmail());
      });
  };
};

// EDIT_LINK
export const editEmail = (updates) => ({
  type: "EDIT_PHOTOURL",
  updates,
});

export const startEditEmail = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/email`)
      .update(updates)
      .then(() => {
        dispatch(editEmail(updates));
      });
  };
};

// SET_SETTINGS
export const setEmail = (email) => ({
  type: "SET_PHOTOURL",
  email,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetEmail = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/email`)
      .once("value")
      .then((snapshot) => {
          
        let email
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          email = "";
        } else if (snapshot.val() === undefined) {
          email = "";
        } else {
          email=snapshot.val();
        }
       
        dispatch(setEmail(email))
      
      }).catch(error=>console.log("error="+error));
  };

};

