import uuid from "uuid";
import database from "../firebase/firebase";
import setHashTags from "./hashtags"
import setHashTags2WithCount from "./hashtags2withcount"

// ADD_LINK
export const addLink = (link) => ({
  type: "ADD_LINK",
  link,
});

export const startAddLink = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      longname="",
      description = "",
      Url = "",
      yturl = "",
      note = "",
      foldername = "",
      amount = 0,
      createdAt = 0,
      faviconURL = "",
    } = linkData;
    const link = {longname, description, Url, yturl, note, foldername, amount, createdAt, faviconURL };
   
    //////
    //return false;
    
    console.log("startAddLink, link="+JSON.stringify(link))
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
        return true;
      })
      .catch((error) => {
        console.log("error adding link data in firebase, error=" + error);
        return false;
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
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
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
      })
      .catch((error) => {
        console.log("error editing link data in firebase, error=" + error);
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

 const extractHashtags = (text) => {
    console.log("extractHashTags, text=" + text);
    const regex = /#([a-zA-Z0-9_]+)/g;
    const hashtags = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      hashtags.push(match[0]);
    }
    console.log("hashtags=" + JSON.stringify(hashtags));
    return hashtags;
  };


  const removeDuplicates = (stringArray) => {
    const stringifiedArray = stringArray.join(" ");
    const lcstring = stringifiedArray.toLowerCase();
    const lcStringArray = lcstring.split(" ");
    return [...new Set(lcStringArray)];
  };

  const countTimesEachHashTagIsUsed = (hashtags) => {
     const length = hashtags.length
     let newArray = []

     hashtags.forEach((hashtag)=>{
      let count=0
       hashtags.forEach((hashtag2)=>{
         if(hashtag===hashtag2) {
          count = count + 1
         }
       })
       newArray.push({hashtag:hashtag,count:count,longname:""})
     })
     return newArray
  }

  const seen=(hashtag,theSeenArray) =>{
    let boolvalue=false
    theSeenArray.forEach((h1)=>{
      if(hashtag===h1) {
        boolvalue=true
      }
    })
    return boolvalue
  }

//this puts the links array in the global redux store to be used to list the output
export const startSetLinks = () => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    //dispatch(setLinks([]));
    const uid = getState().auth.uid;
    const hashtags = [];
    

    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        const links = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
         
          links.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        //console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinks(links));

         let hashtags = [];
         const longnamesnowhitespace = []
         const longnames = []

        //if(this.props.links.length>0) {
        links.forEach((link) => {
          
          let x1 = extractHashtags(link.note);
          hashtags.push(...x1);
          

          
        });
//console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))
        // let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags)
        //  hashTags2WithCount.sort((a, b) => {
        //   return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
        // });
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        

        let hashtags2 = removeDuplicates(hashtags);
        hashtags2.sort((a, b) => {
          return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
        
        //// let hashtags3withcount=[]
        // let seenArray=[]

        // hashtags2.forEach((ht1)=>{
        //   hashTags2WithCount.forEach((ht2)=>{
        //          if(!seen(ht1,seenArray) && (ht1===ht2.hashtag)) {
        //           seenArray.push(ht1)
        //           console.log("ZZZZZZZZZZZZZZZZ, seenArray="+JSON.stringify(seenArray))
        //           hashtags3withcount.push(ht2)
        //          }
        //   })
        ////})

    dispatch(setHashTags(hashtags2));
    
        // dispatch(setHashTags(hashtags3withcount));
        // dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));
  };
};

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
