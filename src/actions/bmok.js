
import database from "../firebase/firebase";

export const getBmok = () => {
  console.log("actions/getBmok")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getBmok, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/bmok`)
      .once("value")
      .then((snapshot) => {
        
       let bmok
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        bmok = snapshot.val()

         if(bmok === undefined || bmok === null)
                    dispatch(setPhotourl({bmok:""}));
                else dispatch(setPhotourl(bmok));
       
      })
    }
};


export const addBmok = (bmok) => ({
  type: "ADD_BMOK",
  bmok,
});


export const startAddBmok = (bmok = {}) => {
  console.log("actions/bmok.js, startAddBmok, bmok="+JSON.stringify(bmok))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/bmok`)
      .update(bmok)
      .then(() => {
        console.log("actions/bmok.js, startAddBmok, just before the call to dispatch to add settingsData to redux, bmok="+JSON.stringify(bmok))
        dispatch(
          addBmok({
            ...bmok,
          })
        );
      });
  };
};

export const removeBmok = () => ({
  type: "REMOVE_BMOK",
});

export const startRemoveBmok = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bmok`)
      .remove()
      .then(() => {
        dispatch(removeBmok());
      });
  };
};

// EDIT_LINK
export const editBmok = (updates) => ({
  type: "EDIT_BMOK",
  updates,
});

export const startEditBmok = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/bmok`)
      .update(updates)
      .then(() => {
        dispatch(editBmok(updates));
      });
  };
};

// SET_SETTINGS
export const setBmok = (bmok) => ({
  type: "SET_BMOK",
  bmok,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetBmok = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/bmok`)
      .once("value")
      .then((snapshot) => {
          
        let bmok
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getBmok from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          bmok = "";
        } else if (snapshot.val() === undefined) {
          bmok = "";
        } else {
          bmok=snapshot.val();
        }
       
        dispatch(setPhotourl(bmok))
      
      }).catch(error=>console.log("error="+error));
  };

};

