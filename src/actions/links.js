import uuid from "uuid";
import database from "../firebase/firebase";
import { getAuth } from "firebase/auth";

// ADD_LINK
export const addLink = (link) => ({
  type: "ADD_LINK",
  link,
});

export const documentCountMaximum = () => {
  //uid
  // const coll = collection(db, "users");
  // const q = query(coll, where("state", "==", "CA"));
  // const snapshot = await getCountFromServer(q);
  const uid = getAuth().uid //getState().auth.uid;
  const count =  database
      .ref(`users/${uid}/links`)
      .count()
      
  return count
}

export const startAddLink = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { description = "", Url = "", note = "", amount = 0, createdAt = 0 } = linkData;
    const link = { description, Url, note, amount, createdAt };
    ////
    return database
      .ref(`users/${uid}/links`)
      .push(link)
      .then((ref) => {
        dispatch(
          addLink({
            id: ref.key,
            ...link,
          })
        );
      });
  };
};

// REMOVE_LINK
export const removeLink = ({ id } = {}) => ({
  type: "REMOVE_LINK",
  id,
});

export const startRemoveLink = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/links/${id}`)
      .remove()
      .then(() => {
        dispatch(removeLink({ id }));
      });
  };
};

// EDIT_LINK
export const editLink = (id, updates) => ({
  type: "EDIT_LINK",
  id,
  updates,
});

export const startEditLink = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/links/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editLink(id, updates));
      });
  };
};

// SET_LINKS
export const setLinks = (links) => ({
  type: "SET_LINKS",
  links,
});

//this puts the links array in the global redux store to be used to list the output
export const startSetLinks = () => {
  
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    
    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        
        const links = [];

        snapshot.forEach((childSnapshot) => {
          links.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinks(links));
      }).catch(error=>console.log("error="+error));
  };

};
