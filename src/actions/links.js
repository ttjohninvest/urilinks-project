import uuid from "uuid";
import database from "../firebase/firebase";
import {setHashTags} from "./hashtags"
// ADD_LINK
export const addLink = (link) => ({
  type: "ADD_LINK",
  link,
});

export const startAddLink = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      Url = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = linkData;
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



export const setLinksAll = (links) => ({
  type: "SET_LINKS_ALL",
  links,
});

const extractHashtags=(text)=>{
    console.log("extractHashTags, text="+text)
  const regex = /#([a-zA-Z0-9_]+)/g;
  const hashtags = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[0]);
  }
  console.log("hashtags="+JSON.stringify(hashtags))
  return hashtags;
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

//this puts the links array in the global redux store to be used to list the output
export const startSetLinks = () => {
  console.log("startSetLinks")
   return (dispatch, getState) => {
     const uid = getState().auth.uid;
     const hashtags = []

    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        const links = [];
        
        console.log("snapshot="+JSON.stringify(snapshot))
        snapshot.forEach((childSnapshot) => {
          let x = JSON.stringify(childSnapshot.val().note)
          let x1 = extractHashtags(x)
          hashtags.push(...x1)
          console.log("startSetLinks, hashtags="+JSON.stringify(hashtags))
          links.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinks(links));
        let hashtags2 = removeDuplicates(hashtags)
        console.log("startSetLinks, hashtags2="+JSON.stringify(hashtags2))
        //dispatch(setHashTags(JSON.stringify(hashtags2)))
      })
      .catch((error) => console.log("error=" + error));
};
}

export const startSetLinksAll = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => {
        const linksAll = [];

        snapshot.forEach((childSnapshot) => {
          return database
            .ref(`users/${childSnapshot.key}/links`)
            .once("value")
            .then((snapshot2) => {
              snapshot2.forEach((childSnapshot2) => {
                linksAll.push({
                  id: childSnapshot2.key,
                  ...childSnapshot2.val(),
                });
              });
              console.log(
                "startSetLinksAll, about to call dispatch(setLinksAll(links));"
              );
              dispatch(setLinksAll(linksAll));
            })
            .catch((error) => console.log("error=" + error));
        });
      })
      .catch((error) => console.log("error=" + error));
  };
};
