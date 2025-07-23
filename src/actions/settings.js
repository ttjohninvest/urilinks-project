
import database from "../firebase/firebase";

export const getSettings = () => {
  console.log("actions/getSettings")
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  console.log("actions/getSettings, uid="+uid)
   return database
      .ref(`users/${uid}/settings`)
      .once("value")
      .then((snapshot) => {
        
        console.log("action/getSettings from db, ...snapshot")
        console.log("action/getSettings from db, ...snapshot="+JSON.stringify({...snapshot}))
        console.log("action/getSettings from db, snapshot.plan="+snapshot.plan)
        //settings={...snapshot}
      
        dispatch(setSettings({...snapshot}));
      })
    }
};

// ADD_LINK
export const addSettings = (settings) => ({
  type: "ADD_SETTINGS",
  settings,
});


export const startAddSettings = (settingsData = {}) => {
  console.log("startAddSettings, settingsData="+JSON.stringify(settingsData))
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
  
    return database
      .ref(`users/${uid}/settings`)
      //.push(settingsData)
      .update(settingsData)
      .then(() => {
        console.log("in startAddSettings, just before the call to dispatch to add settingsData to redux")
        dispatch(
          addSettings({
            ...settingsData,
          })
        );
      });
  };
};

// REMOVE_SETTINGS
export const removeSettings = () => ({
  type: "REMOVE_SETTINGS",
});

export const startRemoveSettings = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/settings`)
      .remove()
      .then(() => {
        dispatch(removeSettings());
      });
  };
};

// EDIT_LINK
export const editSettings = (updates) => ({
  type: "EDIT_SETTINGS",
  updates,
});

export const startEditSettings = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/settings`)
      .update(updates)
      .then(() => {
        dispatch(editSettings(updates));
      });
  };
};

// SET_SETTINGS
export const setSettings = (settings) => ({
  type: "SET_SETTINGS",
  settings,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetSettings = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/settings`)
      .once("value")
      .then((snapshot) => {
        console.log("on startup, startSetSettings, about to call dispatch(setSettings(settings));, settings="+JSON.stringify(snapshot));
        console.log("on startup, startSetSettings, about to call dispatch(setSettings(settings));, snapshot.selectionOption1="+snapshot.selectedOption1);
        console.log("on startup, startSetSettings, about to call dispatch(setSettings(settings));, snapshot.selectionOption2="+snapshot.selectedOption2);
        const xy1 = JSON.parse(JSON.stringify(snapshot))
        let xy
        if(xy1) {
          console.log(xy1.selectedOption1)
          console.log(xy1.selectedOption2)
          xy={
            selectedOption1:xy1.selectedOption1,
            selectedOption2:xy1.selectedOption2
          }
        } else {
          xy={
            selectedOption1:"",
            selectedOption2:""
          }
        }
       
        dispatch(setSettings(xy))
      
      }).catch(error=>console.log("error="+error));
  };

};

