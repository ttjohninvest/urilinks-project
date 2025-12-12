
import database from "../firebase/firebase";

export const getPhotourl = () => {
  console.log("actions/getPhotourl")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getPhotourl, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/photourl`)
      .once("value")
      .then((snapshot) => {
        
       let photourl
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        photourl = snapshot.val()

         if(photourl === undefined || photourl === null)
                    dispatch(setPhotourl({photourl:""}));
                else dispatch(setPhotourl(photourl));
       
      })
    }
};


export const addPhotourl = (photourl) => ({
  type: "ADD_PHOTOURL",
  photourl,
});


export const startAddPhotourl = (photourl = {}) => {
  console.log("actions/photourl.js, startAddPhotourl, photourl="+JSON.stringify(photourl))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/photourl`)
      .update(photourl)
      .then(() => {
        console.log("actions/photourl.js, startAddPhotourl, just before the call to dispatch to add settingsData to redux, photpurl="+JSON.stringify(photourl))
        dispatch(
          addPhotourl({
            ...photourl,
          })
        );
      });
  };
};

export const removePhotourl = () => ({
  type: "REMOVE_SETTINGS",
});

export const startRemovePhotourl = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/photourl`)
      .remove()
      .then(() => {
        dispatch(removePhotourl());
      });
  };
};

// EDIT_LINK
export const editPhotourl = (updates) => ({
  type: "EDIT_PHOTOURL",
  updates,
});

export const startEditPhotourl = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/photourl`)
      .update(updates)
      .then(() => {
        dispatch(editPhotourl(updates));
      });
  };
};

// SET_SETTINGS
export const setPhotourl = (photourl) => ({
  type: "SET_PHOTOURL",
  photourl,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetPhotourl = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/photourl`)
      .once("value")
      .then((snapshot) => {
          
        let photourl
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getTheplan from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          photourl = "";
        } else if (snapshot.val() === undefined) {
          photourl = "";
        } else {
          photourl=snapshot.val();
        }
       
        dispatch(setPhotourl(photourl))
      
      }).catch(error=>console.log("error="+error));
  };

};

