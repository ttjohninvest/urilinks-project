import { v4 } from "uuid";
//import { getDatabase, ref, update, serverValue } from "firebase/database";
//import { ServerValue } from "../firebase/firebase";
import database from "../firebase/firebase";
import setHashTags from "./hashtags";
//import {toggleItemShow} from '../features/toggle/creatslice'
import setHashTags2WithCount from "./hashtags2withcount";

//   export const handleToggle = (data) => ({
//   type: "UPDATE_LINKS_SHOW",
//   data,
// });

export const incrementHandleToggle2 = (id, updates) => ({
  type: "INCREMENT_UPDATE_LINKS_SHOW",
  id,
  updates,
});

export const decrementHandleToggle2 = (id, updates) => ({
  type: "DECREMENT_UPDATE_LINKS_SHOW",
  id,
  updates,
});

export const incrementHandleToggle = ({ id, show } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ show: parseInt(show) + 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(incrementHandleToggle2(id, { show: parseInt(show) + 1 }));
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const decrementHandleToggle = ({ id, show } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ show: parseInt(show) - 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(decrementHandleToggle2(id, { show: parseInt(show) - 1 }));
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

// export const removeAllData = ({ id } = {}) => {

//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     //update(dbRef, { value: increment(1) });
//     if(id !== null && id !== undefined && id !== "")
//     return database
//       .ref(`users/${uid}`)
//       .update(null) //{showpublic:0}
//       .then(() => {
//         //alert("success")
//         console.log("account "+uid+ " deleted")

//       })
//       .catch((error) => {
//         console.log("error deleting account "+uid+", error=" + error);
//       });
//   };
// };

export const incrementHandleToggle3 = ({ id, show } = {}) => {
  return (dispatch, getState) => {
    dispatch(incrementHandleToggle2(id, { show: parseInt(show) + 1 }));
  };
};

export const decrementHandleToggle3 = ({ id, show } = {}) => {
  return (dispatch, getState) => {
    dispatch(decrementHandleToggle2(id, { show: parseInt(show) - 1 }));
  };
};

// export const handleToggle = ({ id,linkid } = {}) => {

//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     //update(dbRef, { value: increment(1) });
//     return database
//       .ref(`users/${uid}/links/${id}`)
//       .update({show:getState().show===0?1:0}) //{showpublic:0}
//       .then(() => {
//         //alert("success")

//         dispatch(handleToggle2(id,{show:getState().show===0?1:0}));
//       })
//       .catch((error) => {
//         console.log("error removing link data in firebase, error=" + error);
//       });
//   };
// };

// ADD_LINK
export const addFollower = (follower) => ({
  type: "ADD_FOLLOWER",
  follower,
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

export const startAddFollower = (
  uid,
  id,
  followingData = {},
  followingData2 = {},
) => {
  console.log("startAddFollower, uid=" + uid);
  console.log(
    "startAddFollower, followingData=" + JSON.stringify(followingData),
  );
  console.log(
    "startAddFollower, followingData2=" + JSON.stringify(followingData2),
  );

  database
    .ref("users/" + uid + "/following/" + id)
    .set(followingData)
    .then((ref) => {
      console.log("Data saved successfully.");

      database
        .ref("users/" + id + "/follower/" + uid)
        .set(followingData2)
        .then((ref) => {
          console.log("Data saved successfully.");
        })
        .catch((error) => {
          console.log("Data not saved successfully1,error=" + error);
        });
    })
    .catch((error) => {
      console.log("Data not saved successfully2,error=" + error);
    });
};

// export const startAddFollower = async (followingData = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     // const {

//     //   following = 0,

//     // } = followingData;
//     // const link = {

//     //   following,

//     // };

//     //////
//     //return false;

//     //console.log("startAddLink, link=" + JSON.stringify(link));
//     //if(link !== null && link !== undefined && link !== "")
//     return database
//       .ref(`users/${uid}/following`)
//       .push(followingData)
//       .then((ref) => {
//         dispatch(
//           addFollower({
//             id: ref.key,
//             ...followingData,
//           }),
//         );
//         return true;
//       })
//       .catch((error) => {
//         console.log("error adding link data in firebase, error=" + error);
//         return false;
//       });
//   };
// };

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

export const startDeleteFollowing = (id2, id) => {
  //const uid = getState().auth.uid;
  if (
    id !== null &&
    id !== undefined &&
    id !== "" &&
    id2 !== null &&
    id2 !== undefined &&
    id2 !== ""
  )
    return database
      .ref(`users/${id2}/following/${id}`)
      .remove()
      .then(() => {
        return database
          .ref(`users/${id}/follower/${id2}`)
          .remove()
          .then(() => {
            //alert("Unfollowed")
            return "success"; //snapshot.val()
            //dispatch(removeLink({ id }));
          })
          .catch((error) => {
            //alert("Not unfollowed")
            return "failed";
            console.log(
              "error removing following data in firebase, error=" + error,
            );
          });
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
};

export const startRemoveLink = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (id !== null && id !== undefined && id !== "")
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
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ showpublic: 0 })
        .then(() => {
          dispatch(privateLink(id, { showpublic: 0 }));
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const incrementLinkClickCount = ({ id, frequency } = {}) => {
  //alert("incrementLinkClickCount, x="+JSON.stringify(x))

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ frequency: parseInt(frequency) + 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")
          //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
          dispatch(
            incrementLinkClickCount2(id, {
              frequency: parseInt(frequency) + 1,
            }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const incrementLinkLikesClickCount = ({ id, likes } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ likes: parseInt(likes) + 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(
            incrementLinkLikesClickCount2(id, { likes: parseInt(likes) + 1 }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const decrementLinkLikesClickCount = ({ id, likes } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ likes: parseInt(likes) - 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(
            decrementLinkLikesClickCount2(id, { likes: parseInt(likes) - 1 }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const incrementLinkStarClickCount = ({ id, star } = {}) => {
  //alert("incrementLinkStarClickCount, id="+id+", star="+star)

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ star: parseInt(star) + 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(
            incrementLinkStarClickCount2(id, { star: parseInt(star) + 1 }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const decrementLinkStarClickCount = ({ id, star } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ star: parseInt(star) - 1 }) //{showpublic:0}
        .then(() => {
          //alert("success")

          dispatch(
            decrementLinkStarClickCount2(id, { star: parseInt(star) - 1 }),
          );
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const startPrivateLink2 = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ showpublic: 1 })
        .then(() => {
          dispatch(privateLink2(id, { showpublic: 1 }));
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const startArchiveLink = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ archive: 0 })
        .then(() => {
          dispatch(archiveLink(id, { archive: 0 }));
        })
        .catch((error) => {
          console.log("error removing link data in firebase, error=" + error);
        });
  };
};

export const startArchiveLink2 = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (id !== null && id !== undefined && id !== "")
      return database
        .ref(`users/${uid}/links/${id}`)
        .update({ archive: 1 })
        .then(() => {
          dispatch(archiveLink2(id, { archive: 1 }));
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
    if (id !== null && id !== undefined && id !== "")
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

export const setFollowing = (following) => ({
  type: "SET_FOLLOWING",
  following,
});

export const setNewFollowingLinks = (newfollowinglinks) => ({
  type: "SET_NEW_FOLLOWING_LINKS",
  newfollowinglinks,
});

export const setFollower = (follower) => ({
  type: "SET_FOLLOWER",
  follower,
});

export const addFollowing = (following) => ({
  type: "ADD_FOLLOWING",
  following,
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
    if (i === 0)
      //matchesstring += "\n"+match[0]
      matchesstring += match[0];
    else {
      //matchesstring += "\n"+match[0]
      matchesstring += match[0];
    }
    i = i + 1;
  }

  hashtags10.push({
    matchesstring: matchesstring,
    //hashtag:match[0],
    description: !!link.description && link.description.toLowerCase(),
    description2: link.description, //preserves the letter case for display
    showpublic: parseInt(link.showpublic) === 1 ? 1 : 0,
    archive: parseInt(link.archive) === 1 ? 1 : 0,
  });

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
    newArray.push({
      //this is the hashtag array that is used in LinkListFilter.js if showpublic === 1 it displays the menu item
      matchesstring: s.matchesstring,
      //hashtag: s.hashtag,
      //count: count,
      description: s.description,
      description2: s.description2,
      showpublic: s.showpublic,
      archive: s.archive,
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

export const startSetFollowing = (uid) => {
  console.log("startSetFollowing, uid=" + uid);
  return (dispatch, getState) => {
    return database
      .ref(`users/${uid}/following`)
      .once("value")
      .then((snapshot) => {
        const following = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log(
            "startSetFollowing,childSnapshot=" + JSON.stringify(childSnapshot),
          );
          console.log(
            "startSetFollowing,childSnapshot.key=" +
              JSON.stringify(childSnapshot.key),
          );
          console.log(
            "startSetFollowing,childSnapshot.val()=" +
              JSON.stringify(childSnapshot.val()),
          );

          following.push({
            uid: childSnapshot.key, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
            ...childSnapshot.val(),
          });
        });
        console.log(
          "1234567, startSetFollowing, about to call dispatch(setFollowers(following)),following=" +
            JSON.stringify(following),
        );
        dispatch(setFollowing(following)); //links2[0].showpublic
      })
      .catch((error) => console.log("startSetFollowing, error=" + error));
  };
};

export const startSetFollower = (uid) => {
  console.log("startSetFollower, uid=" + uid);
  return (dispatch, getState) => {
    return database
      .ref(`users/${uid}/follower`)
      .once("value")
      .then((snapshot) => {
        const follower = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log(
            "startSetFollower,childSnapshot=" + JSON.stringify(childSnapshot),
          );
          console.log(
            "startSetFollower,childSnapshot.key=" +
              JSON.stringify(childSnapshot.key),
          );
          console.log(
            "startSetFollower,childSnapshot.val()=" +
              JSON.stringify(childSnapshot.val()),
          );

          follower.push({
            uid: childSnapshot.key, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
            ...childSnapshot.val(),
          });
        });
        console.log(
          "1234567, startSetFollower, about to call dispatch(setFollowers(following)),follower=" +
            JSON.stringify(follower),
        );
        dispatch(setFollower(follower)); //links2[0].showpublic
      })
      .catch((error) => console.log("startSetFollowing, error=" + error));
  };
};

export const startSetFollowingNewLinks = (uid) => {
  console.log("startSetFollowingNewLinks, uid=" + uid);
  
  return (dispatch, getState) => {
    //const newlinks3 = [];
    const newlinks = [];
    const promises = []
    const newlinks3 = []

     promises.push(database
      .ref(`users/${uid}/following`)
      .once("value")
      .then((snapshot) => {
        
        
        console.log("newlinks,snapshot=" + JSON.stringify(snapshot));

        snapshot.forEach((childSnapshot) => {
          newlinks.push({
            uid: childSnapshot.key, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
            ...childSnapshot.val(),
          });
        });

         console.log("newlinks=" + JSON.stringify(newlinks));

       
        
        newlinks.forEach((rec) => {
         
          promises.push(database
            .ref(`users/${rec.uid}/newlinks`)
            .once("value")
            .then((childSnapshot3) => {

              newlinks3.push({ //all of these uids are following the logged in user
                uid: rec.uid, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
                newlinks: childSnapshot3.val(), //this is {"newlinks":"yes"}
              });
              //return true
              console.log("2 startSetFollowingNewLinks, newLinks3="+JSON.stringify(newlinks3))
              
            })
            .catch((error) =>
              console.log("startSetFollowingNewLinks, error=" + error),
            ));
          console.log("3 startSetFollowingNewLinks, newLinks3="+JSON.stringify(newlinks3)) //newlinks3 is [] when it gets to here
          //newlinks4=newlinks3
        }) //forEach

          console.log("4 startSetFollowingNewLinks, newlinks3="+JSON.stringify(newlinks3))
          //return 
         

        })
      .catch((error) =>
        console.log("startSetFollowingNewLinks, error=" + error),
      ))

       return Promise.all(promises).then(()=>{
             dispatch(setNewFollowingLinks(newlinks3));
          })

      
  };
};

// export const startSetFollowingNewLinks = (uid) => {
//   console.log("startSetFollowingNewLinks, uid=" + uid);
  
//   return (dispatch, getState) => {
//     //const newlinks3 = [];
//     const newlinks = [];
//     const promises = []
//     database
//       .ref(`users/${uid}/following`)
//       .once("value")
//       .then((snapshot) => {
        
        
//         console.log("newlinks,snapshot=" + JSON.stringify(snapshot));

//         snapshot.forEach((childSnapshot) => {
//           newlinks.push({
//             uid: childSnapshot.key, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
//             ...childSnapshot.val(),
//           });
//         });

//         console.log("newlinks=" + JSON.stringify(newlinks));

       
//         const newlinks3 = []
       
//         newlinks.forEach((rec) => {
//           console.log(
//             "newlinks,rec.uid=" + JSON.stringify(rec.uid),
//           );
//           console.log(
//             "newlinks,rec.email=" +
//               JSON.stringify(rec.email),
//           );

//           //const Promises = []
//           promises.push(database
//             .ref(`users/${rec.uid}/newlinks`)
//             .once("value")
//             .then((childSnapshot3) => {

//               newlinks3.push({ //all of these uids are following the logged in user
//                 uid: rec.uid, //I am using set to write and the key is the following uid so only need the email address under that and that is in ...chidSnapshot.val()
//                 newlinks: childSnapshot3.val(), //this is {"newlinks":"yes"}
//               });
//               //return true
//               console.log("2 startSetFollowingNewLinks, newLinks3="+JSON.stringify(newlinks3))
              
//             })
//             .catch((error) =>
//               console.log("startSetFollowingNewLinks, error=" + error),
//             ));
//           //newlinks3 is [] when it gets to here
//           console.log("3 startSetFollowingNewLinks, newLinks3="+JSON.stringify(newlinks3)) 
         
//         }) //forEach

//           console.log("4 startSetFollowingNewLinks, newlinks3="+JSON.stringify(newlinks3))
//           return Promise.all(promises).then(()=>{
//              dispatch(setNewFollowingLinks(newlinks3));
//          })
      

//       })
//       .catch((error) =>
//         console.log("startSetFollowingNewLinks, error=" + error),
//       )

       

//           //console.log("2 startSetFollowingNewLinks, newlinks3=" + JSON.stringify(newlinks3));
//                //dispatch(setNewFollowingLinks(newlinks3));
//         // console.log("2 startSetFollowingNewLinks, newlinks3=" + JSON.stringify(newlinks3));
//       // dispatch(setNewFollowingLinks(newlinks3));
//       console.log("2 startSetFollowingNewLinks, newlinks3=" + JSON.stringify(newlinks3));
      
//   };
// };

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
  console.log("startSetLinksNew");
  return (dispatch, getState) => {
    const hashtags = [];

    return database
      .ref(`users/${uid}/links`)
      .once("value")
      .then((snapshot) => {
        const links2 = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log(
            "startSetLinksNew,childSnapshot=" + JSON.stringify(childSnapshot),
          );
          console.log(
            "startSetLinksNew,childSnapshot.key=" +
              JSON.stringify(childSnapshot.key),
          );
          console.log(
            "startSetLinksNew,childSnapshot.val()=" +
              JSON.stringify(childSnapshot.val()),
          );
          let aval = childSnapshot.val();
          if (aval.frequency === undefined || aval.frequency === null)
            aval.frequency = parseInt(0); //9999999
          if (aval.likes === undefined || aval.likes === null)
            aval.likes = parseInt(0);
          if (aval.star === undefined || aval.star === null)
            aval.star = parseInt(0);
          if (aval.show === undefined || aval.show === null || aval.show === 1)
            aval.show = parseInt(0);

          links2.push({
            id: childSnapshot.key,
            ...aval, //...childSnapshot.val(),
          });
        });
        console.log(
          "1234567, startSetLinks, about to call dispatch(setLinks(links)),links2=" +
            JSON.stringify(links2),
        );
        dispatch(setLinks(links2)); //links2[0].showpublic

        //XLFFo8DQ7LZh8oR8CnvBGInpjsZ2
        let hashtags = [];
        const longnamesnowhitespace = [];
        const longnames = [];
        let x1 = []; //"";

        //this loop builds an array of all of the hashtags and is called hashtags
        links2.forEach((link) => {
          x1 = extractHashtags(link); //converst text string into an array of hashtags
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
          return a.description > b.description ? 1 : -1;
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
