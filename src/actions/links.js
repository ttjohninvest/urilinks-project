import { v4 } from "uuid";
//import { getDatabase, ref, update, serverValue } from "firebase/database";
//import { ServerValue } from "../firebase/firebase";
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
      showpublic = 1,
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
      star = 0,
      likes = 0,
      frequency = 0,
      archive = 0,
      showpublic = 1,
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
      star,
      likes,
      frequency,
      archive,
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

export const incrementLinkClickCount2 = (id, updates) => ({
  type: "INCREMENT_LINK_COUNT",
  id,
  updates,
});

export const incrementLinkLikesClickCount2 = (id, updates) => ({
  type: "INCREMENT_LINK_LIKES_COUNT",
  id,
  updates,
});

export const decrementLinkLikesClickCount2 = (id, updates) => ({
  type: "DECREMENT_LINK_LIKES_COUNT",
  id,
  updates,
});

export const incrementLinkStarClickCount2 = (id, updates) => ({
  type: "INCREMENT_LINK_STAR_COUNT",
  id,
  updates,
});

export const incrementLinkTotalStarClickCount2 = (id, updates) => ({
  type: "INCREMENT_LINK_TOTAL_STAR_COUNT",
  id,
  updates,
});

export const decrementLinkStarClickCount2 = (id, updates) => ({
  type: "DECREMENT_LINK_STAR_COUNT",
  id,
  updates,
});


export const privateLink = (id, updates) => ({
  type: "PRIVATE_LINK",
  id,
  updates,
});

export const privateLink2 = (id, updates) => ({
  type: "PRIVATE_LINK",
  id,
  updates,
});

export const archiveLink = (id, updates) => ({
  type: "ARCHIVE_LINK",
  id,
  updates,
});

export const archiveLink2 = (id, updates) => ({
  type: "ARCHIVE_LINK",
  id,
  updates,
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

export const startPrivateLink = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/links/${id}`)
      .update({showpublic:0})
      .then(() => {
        dispatch(privateLink(id, {showpublic:0}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const incrementLinkClickCount = ({ id,frequency } = {}) => {
    //alert("incrementLinkClickCount, x="+JSON.stringify(x))

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/links/${id}`)
      .update({frequency:parseInt(frequency)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(incrementLinkClickCount2(id,{frequency:parseInt(frequency)+1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const incrementLinkLikesClickCount = ({ id,likes } = {}) => {
  
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/links/${id}`)
      .update({likes:parseInt(likes)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        
        dispatch(incrementLinkLikesClickCount2(id,{likes:parseInt(likes)+1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const decrementLinkLikesClickCount = ({ id,likes } = {}) => {
  
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/links/${id}`)
      .update({likes:parseInt(likes)-1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        
        dispatch(decrementLinkLikesClickCount2(id,{likes:parseInt(likes)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};


export const incrementLinkStarClickCount = ({ id,star } = {}) => {
    //alert("incrementLinkStarClickCount, id="+id+", star="+star)

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/links/${id}`)
      .update({star:parseInt(star)+1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        
        dispatch(incrementLinkStarClickCount2(id,{star:parseInt(star)+1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};



export const decrementLinkStarClickCount = ({ id,star } = {}) => {
  
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/${uid}/links/${id}`)
      .update({star:parseInt(star)-1}) //{showpublic:0}
      .then(() => {
        //alert("success")
        
        dispatch(decrementLinkStarClickCount2(id,{star:parseInt(star)-1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const startPrivateLink2 = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/links/${id}`)
      .update({showpublic:1})
      .then(() => {
        dispatch(privateLink2(id, {showpublic:1}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const startArchiveLink = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/links/${id}`)
      .update({archive:0})
      .then(() => {
        dispatch(archiveLink(id, {archive:0}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};

export const startArchiveLink2 = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/links/${id}`)
      .update({archive:1})
      .then(() => {
        dispatch(archiveLink2(id, {archive:1}));
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
  const lcstring = stringifiedArray; 
  const lcStringArray = lcstring.split(" ");
  return [...new Set(lcStringArray)];
};

const extractHashtags = (link) => {
  
  const regex = /#([a-zA-Z0-9_]+)/g;
  const hashtags10 = [];
  let match;
  let matchesstring = "";
  let i = 0;

   while ((match = regex.exec(link.note)) !== null) {
    if(i===0)
      //matchesstring += "\n"+match[0]
    matchesstring += match[0]
    else {
      //matchesstring += "\n"+match[0]
      matchesstring += match[0]
    }
    i=i+1
  }

    hashtags10.push({
       matchesstring:matchesstring,
       //hashtag:match[0],
       description:!!link.description && link.description.toLowerCase(),
       description2:link.description, //preserves the letter case for display
       showpublic:parseInt(link.showpublic)===1?1:0,
       archive:parseInt(link.archive)===1?1:0
    })

  return hashtags10;
};


const countTimesEachHashTagIsUsed = (hashtags) => {
  //const length = hashtags.length;
  let newArray = [];

  hashtags.forEach((s) => {
    // let count = 0;
    // hashtags.forEach((s2) => {
    //   if (s.hashtag === s2.hashtag) {
    //     count = count + 1;
    //   }
    // });
    newArray.push({ //this is the hashtag array that is used in LinkListFilter.js if showpublic === 1 it displays the menu item
      matchesstring:s.matchesstring,
      //hashtag: s.hashtag,
      //count: count,
      description: s.description,
      description2:s.description2,
      showpublic: s.showpublic,
      archive:s.archive,
    });
  });
  return newArray;
};

// const seen = (hashtag, theSeenArray) => {
//   let boolvalue = false;
//   theSeenArray.forEach((h1) => {
//     if (hashtag === h1) {
//       boolvalue = true;
//     }
//   });
//   return boolvalue;
// };

const seen = (description, theSeenArray) => {
  let boolvalue = false;
  theSeenArray.forEach((d) => {
    if (description === d) {
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
          let aval = childSnapshot.val()
          if(aval.frequency === undefined || aval.frequency === null)
            aval.frequency = parseInt(0) //9999999
          if(aval.likes === undefined || aval.likes === null)
            aval.likes = parseInt(0) 
           if(aval.star === undefined || aval.star === null)
            aval.star = parseInt(0) 
         
          links2.push({
            id: childSnapshot.key,
            ...aval //...childSnapshot.val(),
          });
        });
        console.log("1234567, startSetLinks, about to call dispatch(setLinks(links)),links2="+JSON.stringify(links2))
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

        

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
      

          hashTags2WithCount.sort((a, b) => {
          return a.description > b.description ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });



        //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        
        //let hashtags2 = removeDuplicates(hashtags);
        let hashtags2 = hashtags;

     

        hashtags2.sort((a, b) => {
          return a.description > b.description
            ? 1
            : -1;
          //return a > b ? 1 : -1;
        });

        let hashTags3WithCount = [];
        let seenArray = [];

         hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (
              !seen(ht1.description, seenArray) &&
              ht1.description === ht2.description
            ) {
              seenArray.push(ht1.description);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashTags3WithCount.push(ht2);
            }
          });
        });

        //dispatch(setHashTags(hashtags2));
        //console.log("1 hashTags3WithCount="+JSON.stringify(hashTags3WithCount))
        dispatch(setHashTags(hashTags3WithCount));
        //dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));
  };
};

// export const startSetLinksNew =  (uid) => {
//   console.log("startSetLinks");
//   return (dispatch, getState) => {
//     const hashtags = [];

//     return database
//       .ref(`users/${uid}/links`)
//       .once("value")
//       .then((snapshot) => {
//         const links2 = [];

//         //console.log("snapshot=" + JSON.stringify(snapshot));
//         snapshot.forEach((childSnapshot) => {
//           console.log("tt,childSnapshot=" + JSON.stringify(childSnapshot));
//           console.log(
//             "tt,childSnapshot.key=" + JSON.stringify(childSnapshot.key),
//           );
//           console.log(
//             "tt,childSnapshot.val()=" + JSON.stringify(childSnapshot.val()),
//           );
//           links2.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val(),
//           });
//         });
//         //console.log("startSetLinks, about to call dispatch(setLinks(links));");
//         dispatch(setLinks(links2));

        
//   let hashtags = [];
//         const longnamesnowhitespace = [];
//         const longnames = [];
//        let x1 = []; //"";

        
//         //this loop builds an array of all of the hashtags and is called hashtags
//         links2.forEach((link) => {
          
//           x1 =  extractHashtags(link) //converst text string into an array of hashtags
//           hashtags.push(...x1); 
          
//         });

        
//         let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
//         //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))


       

//           hashTags2WithCount.sort((a, b) => {
//           return a.description > b.description ? 1 : -1;
//           //return a.hashtag > b.hashtag ? 1 : -1;
//         });



//         //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        
//         //let hashtags2 = removeDuplicates(hashtags);
//         let hashtags2 = hashtags;

      

//         hashtags2.sort((a, b) => {
//           return a.description > b.description
//             ? 1
//             : -1;
//           //return a > b ? 1 : -1;
//         });

//         let hashTags3WithCount = [];
//         let seenArray = [];

       

//          hashtags2.forEach((ht1) => {
//           hashTags2WithCount.forEach((ht2) => {
//             if (
//               !seen(ht1.description, seenArray) &&
//               ht1.description === ht2.description
//             ) {
//               seenArray.push(ht1.description);
//               console.log(
//                 "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
//               );
//               hashTags3WithCount.push(ht2);
//             }
//           });
//         });
// //
//         //dispatch(setHashTags(hashtags2));
//         //console.log("1 hashTags3WithCount="+JSON.stringify(hashTags3WithCount))
//         dispatch(setHashTags(hashTags3WithCount));
//         //dispatch(setHashTags2WithCount(hashTags2WithCount));
//       })
//       .catch((error) => console.log("error=" + error));
//   };
// };

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
          let aval = childSnapshot.val()
          if(aval.frequency === undefined || aval.frequency === null)
            aval.frequency = parseInt(0) //9999999
          if(aval.likes === undefined || aval.likes === null)
            aval.likes = parseInt(0) 
           if(aval.star === undefined || aval.star === null)
            aval.star = parseInt(0) 
         
          links2.push({
            id: childSnapshot.key,
            ...aval //...childSnapshot.val(),
          });
        });
        console.log("1234567, startSetLinks, about to call dispatch(setLinks(links)),links2="+JSON.stringify(links2))
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

        

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
      

          hashTags2WithCount.sort((a, b) => {
          return a.description > b.description ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });



        //console.log("1 hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        
        //let hashtags2 = removeDuplicates(hashtags);
        let hashtags2 = hashtags;

     

        hashtags2.sort((a, b) => {
          return a.description > b.description
            ? 1
            : -1;
          //return a > b ? 1 : -1;
        });

        let hashTags3WithCount = [];
        let seenArray = [];

         hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (
              !seen(ht1.description, seenArray) &&
              ht1.description === ht2.description
            ) {
              seenArray.push(ht1.description);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashTags3WithCount.push(ht2);
            }
          });
        });

        //dispatch(setHashTags(hashtags2));
        //console.log("1 hashTags3WithCount="+JSON.stringify(hashTags3WithCount))
        dispatch(setHashTags(hashTags3WithCount));
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
