import { v4 } from "uuid";
import database from "../firebase/firebase";
import setHashTags2 from "./hashtags2";
import setHashTags2WithCount2 from "./hashtags2withcount2";

// ADD_LINK
// export const addLink2 = (link) => ({
//   type: "ADD_LINK2",
//   link,
// });

// export const startAddLink2 = (linkData = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     const {
//       longname = "",
//       description = "",
//       Url = "",
//       yturl = "",
//       note = "",
//       foldername = "",
//       amount = 0,
//       createdAt = 0,
//       faviconURL = "",
//     } = linkData;
//     const link = {
//       longname,
//       description,
//       Url,
//       yturl,
//       note,
//       foldername,
//       amount,
//       createdAt,
//       faviconURL,
//     };

//     //////
//     //return false;

//     console.log("startAddLink, link=" + JSON.stringify(link));
//     return database
//       .ref(`users/${uid}/links`)
//       .push(link)
//       .then((ref) => {
//         dispatch(
//           addLink({
//             id: ref.key,
//             ...link,
//           })
//         );
//         return true;
//       })
//       .catch((error) => {
//         console.log("error adding link data in firebase, error=" + error);
//         return false;
//       });
//   };
// };

// // REMOVE_LINK
// export const removeLink2 = ({ id } = {}) => ({
//   type: "REMOVE_LINK2",
//   id,
// });

// export const startRemoveLink2 = ({ id } = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;

//     return database
//       .ref(`users/${uid}/links/${id}`)
//       .remove()
//       .then(() => {
//         dispatch(removeLink({ id }));
//       })
//       .catch((error) => {
//         console.log("error removing link data in firebase, error=" + error);
//       });
//   };
// };

// // EDIT_LINK
// export const editLink2 = (id, updates) => ({
//   type: "EDIT_LINK2",
//   id,
//   updates,
// });

// export const startEditLink2 = (id, updates) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;

//     return database
//       .ref(`users/${uid}/links/${id}`)
//       .update(updates)
//       .then(() => {
//         dispatch(editLink(id, updates));
//       })
//       .catch((error) => {
//         console.log("error editing link data in firebase, error=" + error);
//       });
//   };
// };

export const setPeople = (people) => ({
  type: "SET_PEOPLE",
  people,
});

// export const setLinksAll2 = (links) => ({
//   type: "SET_LINKS_ALL2",
//   links,
// });

// const extractHashtags = (text) => {
//   console.log("extractHashTags, text=" + text);
//   const regex = /#([a-zA-Z0-9_]+)/g;
//   const hashtags = [];
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     hashtags.push(match[0]);
//   }
//   console.log("hashtags=" + JSON.stringify(hashtags));
//   return hashtags;
// };

// const removeDuplicates = (stringArray) => {
//   const stringifiedArray = stringArray.join(" ");
//   const lcstring = stringifiedArray.toLowerCase();
//   const lcStringArray = lcstring.split(" ");
//   return [...new Set(lcStringArray)];
// };

// const countTimesEachHashTagIsUsed = (hashtags) => {
//   const length = hashtags.length;
//   let newArray = [];

//   hashtags.forEach((hashtag) => {
//     let count = 0;
//     hashtags.forEach((hashtag2) => {
//       if (hashtag === hashtag2) {
//         count = count + 1;
//       }
//     });
//     newArray.push({ hashtag: hashtag, count: count, longname: "" });
//   });
//   return newArray;
// };

// const seen = (hashtag, theSeenArray) => {
//   let boolvalue = false;
//   theSeenArray.forEach((h1) => {
//     if (hashtag === h1) {
//       boolvalue = true;
//     }
//   });
//   return boolvalue;
// };

//this puts the links array in the global redux store to be used to list the output
//you will need to call urilinks-project-read-all-data to get the database data
export const startSetPeople = () => {
  console.log("startSetPeople");
  return (dispatch, getState) => {
    const hashtags = [];
    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => {
        const users = snapshot.val();

        if (!users) {
          console.log("No users found.");
          res.json({ message: "no user ids" });
        }

        const userIds = Object.keys(users);
        // console.log("All user IDs:", userIds);
        // const ids = [
        //   "D9LSg6elood8Yc5gd5oDMp3JNAQ2",
        //   "Gj6I5M7qf8ODZCsFqC3zAuFTXgx2",
        //   "RZOEMMu7Nwa5bQ51sf71FfDX3A93",
        //   "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2",
        //   "WJGHkWycjKQxPK83Fi4zqx53bCl1",
        //   "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2",
        //   "cvo17Ph52BcJ3gRMgSTL7gxrBUp1",
        //   "m8f0YMF5bucp9uhblPZhM8CTjq12",
        //   "tWKNG14PYYYY0hDPurLouWtYjtq1",
        // ];
        // const userIds = ids;

        /////////////////////////////////////////
        const userDataPromises = userIds.map((userId) => {
          return database
            .ref(`users/${userId}/gud`)
            .once("value")
            .then((snapshot) => {
              const data = snapshot.val();
              const data2 = { gud: {} };
              console.error(
                `the photourl for user ${userId}:`,
                JSON.stringify(data)
              );

              // if(!!data===false) {
              //   //data={data:{}}
              //   return { userId, data2};
              // } else {
              return { userId, data: !!data ? data : { gud: "" } };
              //}
            })
            .catch((error) => {
              console.error(`Error reading data for user ${userId}:`, error);
              return { userId, error };
            });
        });
        let people = [];
        Promise.all(userDataPromises).then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            let gudData = Object.values(childSnapshot.data);
            console.log("1001,gudData=" + JSON.stringify(gudData[0])); //gudData[0]
            //   let updatedPerson = personData[0] //.map((obj) => ({ ...obj, id: v4(), uid:childSnapshot.userId }));
            //   console.log("1001,personData[0]="+JSON.stringify(personData[0]))
            // let updatedArray = arrayData.map((obj) => {

            //     if(obj.showpublic === true) {
            //       return { ...obj, id: v4(), uid:childSnapshot.userId }
            //     }

            //   });

            people.push(gudData[0]); //pushing strings
          });
          console.log("thepeople=" + JSON.stringify(people));
          dispatch(setPeople(people));
        });
      })
      .catch((error) => console.log("error=" + error));
  };
};

// export const startSetLinksAll2 = () => {
//   return (dispatch, getState) => {
//     return database
//       .ref(`users`)
//       .once("value")
//       .then((snapshot) => {
//         const linksAll = [];

//         snapshot.forEach((childSnapshot) => {
//           return database
//             .ref(`users/${childSnapshot.key}/links`)
//             .once("value")
//             .then((snapshot2) => {
//               snapshot2.forEach((childSnapshot2) => {
//                 linksAll.push({
//                   id: childSnapshot2.key,
//                   ...childSnapshot2.val(),
//                 });
//               });
//               console.log(
//                 "startSetLinksAll, about to call dispatch(setLinksAll(links));"
//               );
//               dispatch(setLinksAll2(linksAll));
//             })
//             .catch((error) => console.log("error=" + error));
//         });
//       })
//       .catch((error) => console.log("error=" + error));
//   };
// };
