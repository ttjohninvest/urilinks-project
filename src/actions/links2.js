import { v4 as uuidv4 } from 'uuid'
import database from "../firebase/firebase";
import setHashTags2 from "./hashtags2"
import setHashTags2WithCount2 from "./hashtags2withcount2"

// ADD_LINK
export const addLink2 = (link) => ({
  type: "ADD_LINK2",
  link,
});

export const startAddLink2 = (linkData = {}) => {
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
export const removeLink2 = ({ id } = {}) => ({
  type: "REMOVE_LINK2",
  id,
});

export const startRemoveLink2 = ({ id } = {}) => {
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
export const editLink2 = (id, updates) => ({
  type: "EDIT_LINK2",
  id,
  updates,
});

export const startEditLink2 = (id, updates) => {
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



export const setLinks2 = (links) => ({
  type: "SET_LINKS2",
  links,
});



export const setLinksAll2 = (links) => ({
  type: "SET_LINKS_ALL2",
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


//   async function fetchDataForIds(idArray,dispatch) {
//     console.log("in fetchDataForIds")
//     const promises = idArray.map(uid => {
//          return database.ref(`users/${uid}`).once("value")

//   });

async function fetchDataForIds(links2, userIds ,dispatch) {

  try {
    // const snapshot = await db.ref('users').once('value');
    // const users = snapshot.val();

    // if (!users) {
    //   console.log('No users found.');
    //   return [];
    // }

    // // Extract user IDs (keys) from the users object
    // const userIds = Object.keys(users);
    // console.log('All user IDs:', userIds);
    //return userIds;
	
	
	
	//const userIds = ['uid1', 'uid2', 'uid3']; // Your sequence of user IDs
//ddjkdjfa;kldjf;alskd
const userDataPromises = userIds.map(userId => {
  return database.ref(`users/${userId}/links`).once('value')
    .then(snapshot => {
      const data = snapshot.val();
      //return { userId, data }; // Return the user ID and their data
      return { data }
    })
    .catch(error => {
      console.error(`Error reading data for user ${userId}:`, error);
      return { userId, error };
    });
});

let links3=[]
Promise.all(userDataPromises)
  .then(snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.error) {
        console.log(childSnapshot.error);
      } else {
        // console.log("11,childSnapshot="+JSON.stringify(childSnapshot))
        //   console.log("11,childSnapshot.key="+JSON.stringify(childSnapshot.key))
        //   console.log("11,childSnapshot.val()="+JSON.stringify(childSnapshot.val()))

//  links3.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val(),
//         })

        console.log(`User ${childSnapshot.userId}:`, childSnapshot.data);
        //const data = snapshot.val();
    const arrayData = Object.values(childSnapshot.data);
   const updatedArray = arrayData.map(obj => ({ ...obj, id: uuidv4() }));
    console.log("updatedArray="+JSON.stringify(updatedArray,null,2));
         links3.push(updatedArray);

         /*
const array = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const updatedArray = array.map(obj => ({ ...obj, id: obj.name.toLowerCase() }));

console.log(updatedArray);
         */
        
        
        //dispatch(setLinks2(result.data.links));
      }
    });
    // console.log("b,links3="+JSON.stringify(links3,null,2))
    // console.log("b,links3.length="+links3.length)
    dispatch(setLinks2(links3));
    //console.log("links3="+JSON.stringify(links3,null,2));

  });   
	
	
	
  } catch (error) {
    console.error('Error retrieving user IDs:', error);
    throw error;
  }
}

//this puts the links array in the global redux store to be used to list the output
//you will need to call urilinks-project-read-all-data to get the database data
export const startSetLinks2 = () => {
  console.log("startSetLinks2");
  return (dispatch, getState) => {
    let links2 = [];
    const hashtags = [];
    return database.ref(`users`).once('value').then((snapshot) => {
    const users = snapshot.val();

    if (!users) {
      console.log('No users found.');
      res.json({ message:"no user ids" });
    }

    
    const userIds = Object.keys(users);
    console.log('All user IDs:', userIds);
    const ids = ['D9LSg6elood8Yc5gd5oDMp3JNAQ2','Gj6I5M7qf8ODZCsFqC3zAuFTXgx2','RZOEMMu7Nwa5bQ51sf71FfDX3A93', 'W4XCM1PRqtZeAzCZ0ALlEFrIwaw1', 'WJGHkWycjKQxPK83Fi4zqx53bCl1', 'XLFFo8DQ7LZh8oR8CnvBGInpjsZ2', 'cvo17Ph52BcJ3gRMgSTL7gxrBUp1', 'm8f0YMF5bucp9uhblPZhM8CTjq12', 'tWKNG14PYYYY0hDPurLouWtYjtq1']
    
    // Example array of IDs
//const ids = ["id1", "id2", "id3"];




console.log("Call the function fetchDataForIds")
fetchDataForIds(links2,ids,dispatch).then((r)=>{
console.log("Call the function fetchDataForIds, r="+r)
})
//console.log("after, Call the function fetchDataForIds, links2="+JSON.stringify(links2))
//const links3 = fetchDataForIds(links2,ids);
//console.log("after, Call the function fetchDataForIds, links3="+links3)
    
    
    
    
    // arr.map((uid) =>{

    //     database
    //   .ref(`users/${uid}/links`)
    //   .once("value")
    //   .then((snapshot) => {
    //     //const links2 = [];

    //     //console.log("snapshot=" + JSON.stringify(snapshot));
    //     snapshot.forEach((childSnapshot) => {
         
    //       links2.push({
    //         id: childSnapshot.key,
    //         ...childSnapshot.val(),

    //       });
    //     });
    //     //console.log("startSetLinks, about to call dispatch(setLinks(links));");
    //     dispatch(setLinks2(links2));
        

    //      let hashtags = [];
    //      const longnamesnowhitespace = []
    //      const longnames = []

    //     //if(this.props.links.length>0) {
    //     links2.forEach((link) => {
          
    //       let x1 = extractHashtags(link.note);
    //       hashtags.push(...x1);
          

          
    //     });

    //     let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags)
    //      hashTags2WithCount.sort((a, b) => {
    //       return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
    //     });
    //     // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))
        

    //     let hashtags2 = removeDuplicates(hashtags);
    //     hashtags2.sort((a, b) => {
    //       return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    //     });
        
    //     let hashtags3withcount=[]
    //     let seenArray=[]

    //     hashtags2.forEach((ht1)=>{
    //       hashTags2WithCount.forEach((ht2)=>{
    //              if(!seen(ht1,seenArray) && (ht1===ht2.hashtag)) {
    //               seenArray.push(ht1)
    //               console.log("ZZZZZZZZZZZZZZZZ, seenArray="+JSON.stringify(seenArray))
    //               hashtags3withcount.push(ht2)
    //              }
    //       })
    //     })

    // dispatch(setHashTags(hashtags2));
    
    //     dispatch(setHashTags2(hashtags3withcount));
    //     dispatch(setHashTags2WithCount2(hashTags2WithCount));
    // //links2=[]
    //   })
    //   .catch((error) => console.log("error=" + error));

   
    
    // })

    
      })
      .catch((error) => console.log("error=" + error));



  };
};



export const startSetLinksAll2 = () => {
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
              dispatch(setLinksAll2(linksAll));
            })
            .catch((error) => console.log("error=" + error));
        });
      })
      .catch((error) => console.log("error=" + error));
  };
};
