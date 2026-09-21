
import database from "../firebase/firebase";

export const getFrommenu = () => {
  console.log("actions/getFrommenu")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getFrommenu, uid="+uid)
  let s
   return database
      .ref(`users/${uid}/frommenu`)
      .once("value")
      .then((snapshot) => {
        
       let frommenu
        console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        frommenu = snapshot.val()

         if(frommenu === undefined || frommenu === null)
                    dispatch(setPhotourl({frommenu:""}));
                else dispatch(setPhotourl(frommenu));
       
      })
    }
};


export const addFrommenu = (frommenu) => ({
  type: "ADD_FROMMENU",
  frommenu,
});


export const startAddFrommenu= (frommenu = {}) => {
  console.log("actions/frommenu.js, startAddFrommenu, frommenu="+JSON.stringify(frommenu))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/frommenu`)
      .update(frommenu)
      .then(() => {
        console.log("actions/frommenu.js, startAddFrommenu, just before the call to dispatch to add settingsData to redux, frommenu="+JSON.stringify(frommenu))
        dispatch(
          addFrommenu({
            ...frommenu,
          })
        );
      });
  };
};

export const removeFrommenu = () => ({
  type: "REMOVE_FROMMENU",
});

export const startRemoveFrommenu = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/frommenu`)
      .remove()
      .then(() => {
        dispatch(removeFrommenu());
      });
  };
};

// EDIT_LINK
export const editFrommenu = (updates) => ({
  type: "EDIT_FROMMENU",
  updates,
});

export const startEditFrommenu = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/frommenu`)
      .update(updates)
      .then(() => {
        dispatch(editFrommenu(updates));
      });
  };
};

// SET_SETTINGS
export const setFrommenu = (frommenu) => ({
  type: "SET_FROMMENU",
  frommenu,
});

export const setFrommenu2 = (frommenu) => ({
  type: "SET_FROMMENU",
  frommenu,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetFrommenu = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/frommenu`)
      .once("value")
      .then((snapshot) => {
          
        let frommenu
        //console.log("action/getSettings from db, snapshot.val()="+JSON.stringify(snapshot.val()))
        //console.log("action/getSettings from db, snapshot.val().plan="+snapshot.val().plan)

        console.log(
          "action/getFrommenu from db, snapshot.val()=" + snapshot.val()
        );

        //theplan = JSON.stringify(snapshot.val())//JSON.parse(JSON.stringify(snapshot.val()))
        //

        if (snapshot.val() === null) {
          frommenu = "";
        } else if (snapshot.val() === undefined) {
          frommenu = "";
        } else {
          frommenu=snapshot.val();
        }
       
        dispatch(setFrommenu(frommenu))
      
      }).catch(error=>console.log("error="+error));
  };

};

