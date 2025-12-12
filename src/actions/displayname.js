
import database from "../firebase/firebase";

export const getDisplayname = () => {
  console.log("actions/getDisplayname")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getDisplayname, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/displayname`)
      .once("value")
      .then((snapshot) => {
        
       let displayname
        console.log("action/getDisplayname from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        displayname = snapshot.val()

         if(displayname === undefined || displayname === null)
                    dispatch(setDisplayname({displayname:""}));
                else dispatch(setDisplayname(displayname));
       
      })
    }
};


export const addDisplayname = (displayname) => ({
  type: "ADD_DISPLAYNAME",
  displayname,
});


export const startAddDisplayname = (displayname = {}) => {
  console.log("actions/photourl.js, startAddPhotourl, displayname="+JSON.stringify(displayname))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/displayname`)
      .update(displayname)
      .then(() => {
        console.log("actions/displayname.js, startAddDisplayname, just before the call to dispatch to add data to redux, displayname="+JSON.stringify(displayname))
        dispatch(
          addDisplayname({
            ...displayname,
          })
        );
      });
  };
};

export const removeDisplayname = () => ({
  type: "REMOVE_DISPLAYNAME",
});

export const startRemoveDisplayname = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/displayname`)
      .remove()
      .then(() => {
        dispatch(removeDisplayname());
      });
  };
};

// EDIT_LINK
export const editDisplayname = (updates) => ({
  type: "EDIT_DISPLAYNAME",
  updates,
});

export const startEditPhotourl = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/displayname`)
      .update(updates)
      .then(() => {
        dispatch(editDisplayname(updates));
      });
  };
};

// SET_SETTINGS
export const setDisplayname = (displayname) => ({
  type: "SET_DISPLAYNAME",
  displayname,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetDisplayname = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/displayname`)
      .once("value")
      .then((snapshot) => {
          
        let displayname
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          displayname = "";
        } else if (snapshot.val() === undefined) {
          displayname = "";
        } else {
          displayname=snapshot.val();
        }
       
        dispatch(setDisplayname(displayname))
      
      }).catch(error=>console.log("error="+error));
  };

};

