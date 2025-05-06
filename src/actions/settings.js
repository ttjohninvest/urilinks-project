
import database from "../firebase/firebase";


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
        console.log("on startup, startSetSettings, about to call dispatch(setSettings(settings));, settings="+snapshot);
        //dispatch(setSettings(snapshot));
        dispatch(
          setSettings({
            selectedOption1:"option1",
            selectedOption2:"option2"
      })
      //   dispatch(
      //     setSettings({
      //       ...snapshot
      // })
        );
        console.log("after call to dispatch(setSettings(snapshot)), spapshot="+JSON.stringify(snapshot))
      }).catch(error=>console.log("error="+error));
  };

};

