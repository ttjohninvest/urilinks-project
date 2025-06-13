import uuid from "uuid";
import database from "../firebase/firebase";
import setHashTagsFileDate from "./hashtagsfiledate"
import setHashTags2WithCountFileDate from "./hashtags2withcountfiledate"
// ADD_LINK
export const addLinkFileDate = (link) => ({
  type: "ADD_LINK_FILEDATE",
  link,
});

export const startAddLinkFileDate = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      Url = "",
      note = "",
      amount = 0,
      createdAt = 0,
      faviconURL = "",
    } = linkData;
    const link = { description, Url, note, amount, createdAt, faviconURL };
    ////
    //return false;
    console.log("startAddLink, link="+JSON.stringify(link))
    return database
      .ref(`users/${uid}/linksfiledate`)
      .push(link)
      .then((ref) => {
        dispatch(
          addLinkFileDate({
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
export const removeLinkFileDate = ({ id } = {}) => ({
  type: "REMOVE_LINK_FILEDATE",
  id,
});

export const startRemoveLinkFileDate = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/linksfiledate/${id}`)
      .remove()
      .then(() => {
        dispatch(removeLinkFileDate({ id }));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

// EDIT_LINK
export const editLinkFileDate = (id, updates) => ({
  type: "EDIT_LINK_FILEDATE",
  id,
  updates,
});

export const startEditLinkFileDate = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/linksfiledate/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editLinkFileDate(id, updates));
      })
      .catch((error) => {
        console.log("error editing link data in firebase, error=" + error);
      });
  };
};

// SET_LINKS
export const setLinksFileDate = (links) => ({
  type: "SET_LINKS_FILEDATE",
  links,
});



export const setLinksAllFileDate = (links) => ({
  type: "SET_LINKS_ALL_FILEDATE",
  links,
});

 const extractHashtags = (text) => {
    console.log("extractHashTags, text=" + text);
    const regex = /#([a-zA-Z0-9_]+)/g;
    const hashtagsfiledate = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      hashtagsfiledate.push(match[0]);
    }
    console.log("hashtagsfiledate=" + JSON.stringify(hashtagsfiledate));
    return hashtagsfiledate;
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
       newArray.push({hashtag:hashtag,count:count})
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
export const startSetLinksFileDate = () => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const hashtags = [];

    return database
      .ref(`users/${uid}/linksfiledate`)
      .once("value")
      .then((snapshot) => {
        const linksfiledate = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
         
          linksfiledate.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        //console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinksFileDate(linksfiledate));

        let hashtagsfiledate = [];

        //if(this.props.links.length>0) {
        linksfiledate.forEach((linkfiledate) => {
          //console.log("YYYYYYYYYYYYYYYYYYYYY, link.note="+link.note)
          let x1 = extractHashtags(linkfiledate.note);
          //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, x1="+JSON.stringify(x1))
          hashtagsfiledate.push(...x1);
          //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))
        });
       
        //at this point hashtags contains the number of times each hashtag is being used
        let hashTags2WithCountFileDate = countTimesEachHashTagIsUsed(hashtagsfiledate)
         hashTags2WithCountFileDate.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
        });
        console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCountFileDate))
        

        let hashtags2filedate = removeDuplicates(hashtagsfiledate);
        hashtags2filedate.sort((a, b) => {
          return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
        
        let hashtags3withcountFileDate=[]
        let seenArray=[]

        hashtags2filedate.forEach((ht1)=>{
          hashTags2WithCountFileDate.forEach((ht2)=>{
                 if(!seen(ht1,seenArray) && (ht1===ht2.hashtag)) {
                  seenArray.push(ht1)
                  console.log("ZZZZZZZZZZZZZZZZ, seenArray="+JSON.stringify(seenArray))
                  hashtags3withcountFileDate.push(ht2)
                 }
          })
        })

        console.log("ZZZZZZZZZZZZZZZZZZZZZZZ, hashtags3withcountFileDate="+JSON.stringify(hashtags3withcountFileDate))



        //console.log("actions/links.js, ZZZZZZZZZZZZZZZZZ, hashtags2="+JSON.stringify(hashtags2))
        //dispatch(setHashTags(hashtags2));
        dispatch(setHashTagsFileDate(hashtags3withcountFileDate));
        dispatch(setHashTags2WithCountFileDate(hashTags2WithCountFileDate));
      })
      .catch((error) => console.log("error=" + error));
  };
};

export const startSetLinksAllFileDate = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => {
        const linksAllfiledate = [];

        snapshot.forEach((childSnapshot) => {
          return database
            .ref(`users/${childSnapshot.key}/linksfiledate`)
            .once("value")
            .then((snapshot2) => {
              snapshot2.forEach((childSnapshot2) => {
                linksAllfiledate.push({
                  id: childSnapshot2.key,
                  ...childSnapshot2.val(),
                });
              });
              console.log(
                "startSetLinksAll, about to call dispatch(setLinksAll(links));"
              );
              dispatch(setLinksAllFileDate(linksAllfiledate));
            })
            .catch((error) => console.log("error=" + error));
        });
      })
      .catch((error) => console.log("error=" + error));
  };
};
