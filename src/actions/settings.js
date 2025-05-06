
import database from "../firebase/firebase";
//import { useSelector } from 'react-redux';

// ADD_LINK
export const addSettings = (settings) => ({
  type: "ADD_SETTINGS",
  settings,
});


export const startAddSettings = (settingsData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //const { setting1 = "", setting2 = "", createdAt = 0} = settingsData;
    const { setting1 = "", setting2 = "" } = settingsData;
    //const settings = { setting1, setting2, createdAt };
    const settings = { setting1, setting2 };
    ////
    return database
      .ref(`users/${uid}/settings`)
      .push(settingsData)
      .then((ref) => {
        dispatch(
          addSettings({
            id: ref.key,
            ...settingsData,
          })
        );
      });
  };
};

// REMOVE_LINK
export const removeSettings = ({ id } = {}) => ({
  type: "REMOVE_SETTINGS",
  id,
});

export const startRemoveSettings = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/settings/${id}`)
      .remove()
      .then(() => {
        dispatch(removeSettings({ id }));
      });
  };
};

// EDIT_LINK
export const editSettings = (id, updates) => ({
  type: "EDIT_SETTINGS",
  id,
  updates,
});

export const startEditSettings = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/settings/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editSettings(id, updates));
      });
  };
};

// SET_LINKS
export const setSettings = (settings) => ({
  type: "SET_SETTINGS",
  links,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetSettings = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/settings`)
      .once("value")
      .then((snapshot) => {
        console.log("startSetSettings, about to call dispatch(setSettings(settings));");
        dispatch(setSettings(snapshot));
      }).catch(error=>console.log("error="+error));
  };

};

