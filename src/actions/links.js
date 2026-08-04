import { v4 } from "uuid";
import database from "../firebase/firebase";
import setHashTags from "./hashtags";
import setHashTags2WithCount from "./hashtags2withcount";

// ADD_LINK
export const addLink = (link) => ({
  type: "ADD_LINK",
  link,
});

export const emailSharableLink = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      showpublic = false,
      longname = "",
      description = "",
      Url = "",
      yturl = "",
      note = "",
      foldername = "",
      amount = 0,
      createdAt = 0,
      faviconURL = "",
    } = linkData;
    const link = {
      showpublic,
      longname,
      description,
      Url,
      yturl,
      note,
      foldername,
      amount,
      createdAt,
      faviconURL,
    };

    //////
    //return false;

    console.log("emailSharableLink, link=" + JSON.stringify(link));
    //call email code here
  };
};

export const startAddLink = (linkData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      showpublic = false,
      longname = "",
      description = "",
      Url = "",
      yturl = "",
      note = "",
      foldername = "",
      amount = 0,
      createdAt = 0,
      faviconURL = "",
    } = linkData;
    const link = {
      showpublic,
      longname,
      description,
      Url,
      yturl,
      note,
      foldername,
      amount,
      createdAt,
      faviconURL,
    };

    //////
    //return false;

    console.log("startAddLink, link=" + JSON.stringify(link));
    return database
      .ref(`users/${uid}/links`)
      .push(link)
      .then((ref) => {
        dispatch(
          addLink({
            id: ref.key,
            ...link,
          }),
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

export const setLinks2 = (links) => ({
  type: "SET_LINKS2",
  links,
});

export const setLinksAll = (links) => ({
  type: "SET_LINKS_ALL",
  links,
});



const removeDuplicates = (stringArray) => {
  const stringifiedArray = stringArray.join(" ");
  const lcstring = stringifiedArray; //.toLowerCase();
  const lcStringArray = lcstring.split(" ");
  return [...new Set(lcStringArray)];
};

const extractHashtags = (link) => {
  
  const regex = /#([a-zA-Z0-9_]+)/g;
  const hashtags10 = [];
  let match;

  while ((match = regex.exec(link.note)) !== null) {
    hashtags10.push({
       hashtag:match[0],
       showpublic:parseInt(link.showpublic)===1?1:0
    });
  }
  //console.log("hashtags=" + JSON.stringify(hashtags));
  return hashtags10;
};


const countTimesEachHashTagIsUsed = (hashtags) => {
  //const length = hashtags.length;
  let newArray = [];

  hashtags.forEach((s) => {
    let count = 0;
    hashtags.forEach((s2) => {
      if (s.hashtag === s2.hashtag) {
        count = count + 1;
      }
    });
    newArray.push({ //this is the hashtag array that is used in LinkListFilter.js if showpublic === 1 it displays the menu item
      hashtag: s.hashtag,
      count: count,
      longname: "",
      showpublic: s.showpublic,
    });
  });
  return newArray;
};

const seen = (hashtag, theSeenArray) => {
  let boolvalue = false;
  theSeenArray.forEach((h1) => {
    if (hashtag === h1) {
      boolvalue = true;
    }
  });
  return boolvalue;
};


const isInOkArray = (uid) => {
  const okarray = [
    "tWKNG14PYYYY0hDPurLouWtYjtq1",
    "D9LSg6elood8Yc5gd5oDMp3JNAQ2",
  ];
  let val = false;
  okarray.forEach((id) => {
    if (uid === id) val = true;
  });

  return val;
};

export const startSetLinks = (uid) => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    const hashtags = [];

    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        const links2 = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log("tt,childSnapshot=" + JSON.stringify(childSnapshot));
          console.log(
            "tt,childSnapshot.key=" + JSON.stringify(childSnapshot.key),
          );
          console.log(
            "tt,childSnapshot.val()=" + JSON.stringify(childSnapshot.val()),
          );
          links2.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        //console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinks(links2)); //links2[0].showpublic

        //XLFFo8DQ7LZh8oR8CnvBGInpjsZ2
        let hashtags = [];
        const longnamesnowhitespace = [];
        const longnames = [];
       let x1 = []; //"";

        
        //this loop builds an array of all of the hashtags and is called hashtags
        links2.forEach((link) => {
          
          x1 =  extractHashtags(link) //converst text string into an array of hashtags
          hashtags.push(...x1); 
          
        });

        console.log("actions/links.js, hashtags="+JSON.stringify(hashtags))

        let hashtags3 = [];
         hashtags.forEach((s) => {
           hashtags3.push({
             hashtag: !!s.hashtag?s.hashtag.trim().substring(1):"",
             showpublic: s.showpublic,
           });
         });
		  

        let hashtags4 = [];

        hashtags3.forEach((s) => {
          //the following line uppercase's the first character and adds a space for example TheCatIsGreat to The Cat Is Great
          let str2 = !!s.hashtag?s.hashtag
            .trim()
            .replace(
              /(^|[^a-zA-Z0-9])([a-zA-Z])/g,
              (match, p1, p2) => p1 + p2.toUpperCase(),
            ):""
          let cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //this removes the space so The Cat Is Great becomes TheCatIsGreat
          let hashtagresult = "#" + cleaned; //This produces #TheCatIsGreat
          hashtags4.push({
            hashtag: hashtagresult,
            showpublic: s.showpublic
          });
        });

        hashtags = hashtags4;

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
        //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        hashTags2WithCount.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });
        //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        //
        //let hashtags2 = removeDuplicates(hashtags);
        let hashtags2 = hashtags;

        hashtags2.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase()
            ? 1
            : -1;
          //return a > b ? 1 : -1;
        });

        let hashTags3WithCount = [];
        let seenArray = [];

        hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (
              !seen(ht1.hashtag, seenArray) &&
              ht1.hashtag === ht2.hashtag
            ) {
              seenArray.push(ht1.hashtag);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashTags3WithCount.push(ht2);
            }
          });
        });

        //dispatch(setHashTags(hashtags2));
        //console.log("1 hashTags3WithCount="+JSON.stringify(hashTags3WithCount))
        dispatch(setHashTags(hashTags2WithCount));
        //dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));
  };
};

export const startSetLinksNew = (uid) => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    const hashtags = [];

    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        const links2 = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log("tt,childSnapshot=" + JSON.stringify(childSnapshot));
          console.log(
            "tt,childSnapshot.key=" + JSON.stringify(childSnapshot.key),
          );
          console.log(
            "tt,childSnapshot.val()=" + JSON.stringify(childSnapshot.val()),
          );
          links2.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        //console.log("startSetLinks, about to call dispatch(setLinks(links));");
        dispatch(setLinks(links2));

        
      let hashtags = [];
        const longnamesnowhitespace = [];
        const longnames = [];
       let x1 = []; //"";

        
        //this loop builds an array of all of the hashtags and is called hashtags
        links2.forEach((link) => {
          
          x1 =  extractHashtags(link) //converst text string into an array of hashtags
          hashtags.push(...x1); 
          
        });

        console.log("actions/links.js, hashtags="+JSON.stringify(hashtags))

        let hashtags3 = [];
         hashtags.forEach((s) => {
           hashtags3.push({
             hashtag: !!s.hashtag?s.hashtag.trim().substring(1):"",
             showpublic: s.showpublic,
           });
         });
		  

        let hashtags4 = [];

        hashtags3.forEach((s) => {
          //the following line uppercase's the first character and adds a space for example TheCatIsGreat to The Cat Is Great
          let str2 = !!s.hashtag?s.hashtag
            .trim()
            .replace(
              /(^|[^a-zA-Z0-9])([a-zA-Z])/g,
              (match, p1, p2) => p1 + p2.toUpperCase(),
            ):""
          let cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //this removes the space so The Cat Is Great becomes TheCatIsGreat
          let hashtagresult = "#" + cleaned; //This produces #TheCatIsGreat
          hashtags4.push({
            hashtag: hashtagresult,
            showpublic: s.showpublic
          });
        });

        hashtags = hashtags4;

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
        //console.log("2 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        hashTags2WithCount.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        //
        //let hashtags2 = removeDuplicates(hashtags);
        let hashtags2 = hashtags;

        hashtags2.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase()
            ? 1
            : -1;
          //return a > b ? 1 : -1;
        });

        let hashtags3withcount = [];
        let seenArray = [];

        hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (
              !seen(ht1.hashtag, seenArray) &&
              ht1.hashtag === ht2.hashtag
            ) {
              seenArray.push(ht1);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashtags3withcount.push(ht2);
            }
          });
        });

        //dispatch(setHashTags(hashtags2));
console.log("2 hashtags3withcount="+JSON.stringify(hashtags3withcount))
        dispatch(setHashTags(hashtags3withcount));
        //dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));
  };
};

//link.filename
//link.description
//link.Url
//write a file with these three things on one line first

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
                "startSetLinksAll, about to call dispatch(setLinksAll(links));",
              );
              dispatch(setLinksAll(linksAll));
            })
            .catch((error) => console.log("error=" + error));
        });
      })
      .catch((error) => console.log("error=" + error));
  };
};
