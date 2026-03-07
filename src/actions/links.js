import { v4 } from "uuid";
import database from "../firebase/firebase";
import setHashTags from "./hashtags";
import setHashTags2WithCount from "./hashtags2withcount";

// ADD_LINK
export const addLink = (link) => ({
  type: "ADD_LINK",
  link,
});

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
  const lcstring = stringifiedArray; //.toLowerCase();
  const lcStringArray = lcstring.split(" ");
  return [...new Set(lcStringArray)];
};

const countTimesEachHashTagIsUsed = (hashtags) => {
  const length = hashtags.length;
  let newArray = [];

  hashtags.forEach((hashtag) => {
    let count = 0;
    hashtags.forEach((hashtag2) => {
      if (hashtag === hashtag2) {
        count = count + 1;
      }
    });
    newArray.push({ hashtag: hashtag, count: count, longname: "" });
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

//this puts the links array in the global redux store to be used to list the output
export const startSetLinks = (uid) => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    //dispatch(setLinks([]));
    //const uid = getState().auth.uid;
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

        //7CzFYQjw2aUhHgCYjS2eDODrfVE2
        let hashtags = [];
        const longnamesnowhitespace = [];
        const longnames = [];
        let x1 = "";

        let ht =
          "#Computer#Animals#Schools#Banks#Libraries#Stores#Books#Ebooks#Entertainment#Church#Politics#Music#Movies#Delivery#Hotels#Motels#Rentals#Maps#Directions#Laundry#Theater#Mechanics#Vehicles#Insurance#Travel";
        let homelesslist =
          "#HomelessInAlaska#HomelessInAlabama#HomelessInArkansas#HomelessInAmericanSamoa#HomelessInArizona#HomelessInCalifornia#HomelessInColorado#HomelessInConnecticut#HomelessInDistrictOfColumbia#HomelessInDelaware#HomelessInFlorida#HomelessInGeorgia#HomelessInGuam#HomelessInHawaii#HomelessInIowa#HomelessInIdaho#HomelessInIllinois#HomelessInIndiana#HomelessInKansas#HomelessInKentucky#HomelessInLouisiana#HomelessInMassachusetts#HomelessInMaryland#HomelessInMaine#HomelessInMichigan#HomelessInMinnesota#HomelessInMissouri#HomelessInMississippi#HomelessInMontana#HomelessInNorthCarolina#HomelessInNorthDakota#HomelessInNebraska#HomelessInNewHampshire#HomelessInNewJersey#HomelessInNewMexico#HomelessInNevada#HomelessInNewYork#HomelessInOhio#HomelessInOklahoma#HomelessInOregon#HomelessInPennsylvania#HomelessInPuertoRico#HomelessInRhodeIsland#HomelessInSouthCarolina#HomelessInSouthDakota#HomelessInTennessee#HomelessInTexas#NorthernMarianaIslands#HomelessInUtah#HomelessInVirginia#HomelessInVirginIslands#HomelessInVermont#HomelessInWashington#HomelessInWisconsin#HomelessInWestVirginia#HomelessInWyoming";
        let prisonerslist =
          "#PrisonersInAlaska#PrisonersInAlabama#PrisonersInArkansas#PrisonersInAmericanSamoa#PrisonersInArizona#PrisonersInCalifornia#PrisonersInColorado#PrisonersInConnecticut#PrisonersInDistrictOfColumbia#PrisonersInDelaware#PrisonersInFlorida#PrisonersInGeorgia#PrisonersInGuam#PrisonersInHawaii#PrisonersInIowa#PrisonersInIdaho#PrisonersInIllinois#PrisonersInIndiana#PrisonersInKansas#PrisonersInKentucky#PrisonersInLouisiana#PrisonersInMassachusetts#PrisonersInMaryland#PrisonersInMaine#PrisonersInMichigan#PrisonersInMinnesota#PrisonersInMissouri#PrisonersInMississippi#PrisonersInMontana#PrisonersInNorthCarolina#PrisonersInNorthDakota#PrisonersInNebraska#PrisonersInNewHampshire#PrisonersInNewJersey#PrisonersInNewMexico#PrisonersInNevada#PrisonersInNewYork#PrisonersInOhio#PrisonersInOklahoma#PrisonersInOregon#PrisonersInPennsylvania#PrisonersInPuertoRico#PrisonersInRhodeIsland#PrisonersInSouthCarolina#PrisonersInSouthDakota#PrisonersInTennessee#PrisonersInTexas#NorthernMarianaIslands#PrisonersInUtah#PrisonersInVirginia#PrisonersInVirginIslands#PrisonersInVermont#PrisonersInWashington#PrisonersInWisconsin#PrisonersInWestVirginia#PrisonersInWyoming";
        let htc =
          "#JesusChrist#SalvationOfJesusChrist#LifeOfJesusChrist#GraceOfJesusChrist#FaithOfJesusChrist#AudioHolyBible#Fellowship#Kindness#Devine#Love#MysteryOfJesusChrist#FaithOfJesusChrist#LivingWaters#DeathOfChrist#ResurrectionOfChrist#Prayers#Sermons#Healings#CatholicChurches#Happy#Joy#Cathedrals#Homilies#Israel#Nuns#Priests#Saints#Angels#Music#Pictures#Videos#Movies#Testimonies#Pastors#Deacons#Christmas#ChristmasTrees#Easter#HolyBibles#Maps#Directions#Convents#Vatican#Popes#HolyGodTheFather#Donations#Forgiveness#Humility#Services#Disciples#BlessedMary#Flowers#Cardinals#Blessings#CatholicPriests";
        
             
        
          let h2 = homelesslist + prisonerslist + ht + htc;

          if (uid === "7CzFYQjw2aUhHgCYjS2eDODrfVE2") 
        x1=""
          else if(uid==="XLFFo8DQ7LZh8oR8CnvBGInpjsZ2") 
          //x1 = extractHashtags(h2);

        x1 = extractHashtags(h2);

        hashtags.push(...x1);

        links2.forEach((link) => {
          x1 = extractHashtags(link.note);
          hashtags.push(...x1);
        });

        let hashtags3 = [];

        hashtags.forEach((hashtag) => {
          hashtags3.push(hashtag.trim().substring(1));
        });

        let hashtags4 = [];

        hashtags3.forEach((hashtag) => {
          //the following line uppercase's the first character and adds a space for example TheCatIsGreat to The Cat Is Great
          let str2 = hashtag
            .trim()
            .replace(
              /(^|[^a-zA-Z0-9])([a-zA-Z])/g,
              (match, p1, p2) => p1 + p2.toUpperCase(),
            );
          let cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //this removes the space so The Cat Is Great becomes TheCatIsGreat
          let hashtagresult = "#" + cleaned; //This produces #TheCatIsGreat
          hashtags4.push(hashtagresult);
        });

        //after the hash
        // let str2

        // const cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //leave the showing characters in

        // const lc = cleaned

        // const hashtag = "#" + lc;

        //     hashtags.forEach((hashtag)=>{
        //        str2=hashtag.trim().replace(/(^|[^a-zA-Z0-9])([a-zA-Z])/g, (match, p1, p2) => p1 + p2.toUpperCase());

        //     })

        hashtags = hashtags4;

        //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
        hashTags2WithCount.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))

        let hashtags2 = removeDuplicates(hashtags);
        hashtags2.sort((a, b) => {
          return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
          //return a > b ? 1 : -1;
        });

        let hashtags3withcount = [];
        let seenArray = [];

        hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (!seen(ht1, seenArray) && ht1 === ht2.hashtag) {
              seenArray.push(ht1);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashtags3withcount.push(ht2);
            }
          });
        });

        dispatch(setHashTags(hashtags2));

        dispatch(setHashTags(hashtags3withcount));
        dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));

    //the following is another way and it said it is faster but it does not work
    //      database().ref(`users/${uid}/links`).on('value', (snapshot) => {
    //       const links2 = []
    //   snapshot.forEach((childSnapshot) => {
    //     // Push the child's value directly into your array
    //     //globalReduxArray.push(childSnapshot.val());
    //       links2.push({
    //             id: childSnapshot.key,
    //             ...childSnapshot.val(),
    //           });
    //   });
    // dispatch(setLinks(links2));

    // let hashtags = [];
    //          const longnamesnowhitespace = []
    //          const longnames = []

    //         //if(this.props.links.length>0) {
    //         links2.forEach((link) => {

    //           let x1 = extractHashtags(link.note);
    //           hashtags.push(...x1);

    //         });
    // //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))
    //         let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags)
    //          hashTags2WithCount.sort((a, b) => {
    //           return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
    //           //return a.hashtag > b.hashtag ? 1 : -1;
    //         });
    //         // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))

    //         let hashtags2 = removeDuplicates(hashtags);
    //         hashtags2.sort((a, b) => {
    //           return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    //           //return a > b ? 1 : -1;
    //         });

    //         let hashtags3withcount=[]
    //         let seenArray=[]

    //         hashtags2.forEach((ht1)=>{
    //           hashTags2WithCount.forEach((ht2)=>{
    //                  if(!seen(ht1,seenArray) && (ht1===ht2.hashtag)) {
    //                   seenArray.push(ht1)
    //                   console.log("ZZZZZZZZZZZZZZZZ, seenArray="+JSON.stringify(seenArray))
    //                   hashtags3withcount.push(ht2)
    //                  }
    //           })
    //         })
    //         dispatch(setHashTags(hashtags3withcount));
    //         dispatch(setHashTags2WithCount(hashTags2WithCount));
    // }).catch((error) => console.log("error=" + error));
  };
};

export const startSetLinksNew = (uid) => {
  console.log("startSetLinks");
  return (dispatch, getState) => {
    //dispatch(setLinks([]));
    //const uid = getState().auth.uid;
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
        let x1 = "";

        // let homelesslist = "#HomelessInAlaska#HomelessInAlabama#HomelessInArkansas#HomelessInAmericanSamoa#HomelessInArizona#HomelessInCalifornia#HomelessInColorado#HomelessInConnecticut#HomelessInDistrictOfColumbia#HomelessInDelaware#HomelessInFlorida#HomelessInGeorgia#HomelessInGuam#HomelessInHawaii#HomelessInIowa#HomelessInIdaho#HomelessInIllinois#HomelessInIndiana#HomelessInKansas#HomelessInKentucky#HomelessInLouisiana#HomelessInMassachusetts#HomelessInMaryland#HomelessInMaine#HomelessInMichigan#HomelessInMinnesota#HomelessInMissouri#HomelessInMississippi#HomelessInMontana#HomelessInNorthCarolina#HomelessInNorthDakota#HomelessInNebraska#HomelessInNewHampshire#HomelessInNewJersey#HomelessInNewMexico#HomelessInNevada#HomelessInNewYork#HomelessInOhio#HomelessInOklahoma#HomelessInOregon#HomelessInPennsylvania#HomelessInPuertoRico#HomelessInRhodeIsland#HomelessInSouthCarolina#HomelessInSouthDakota#HomelessInTennessee#HomelessInTexas#NorthernMarianaIslands#HomelessInUtah#HomelessInVirginia#HomelessInVirginIslands#HomelessInVermont#HomelessInWashington#HomelessInWisconsin#HomelessInWestVirginia#HomelessInWyoming"
        // let ht="#Computer#Animals#Schools#Banks#Libraries#Stores#Prayer#Books#Ebooks#Entertainment#Church#Politics#Music#Movies#Delivery#Hotels#Motels#Rentals#Maps#Directions#Laundry#Theater#Mechanics#Vehicles#Insurance#Travel"
        // let htc = "#christ#prayer#sermons#healings#churches#cathedrals#homilies#israel#nuns#priests#saints#angels#music#pictures#videos#movies#testimonies#pastors#deacons#christmas#easter#bible#salvation#maps#directions#convents#vatican#popes#god#father#donations#forgiveness#humility#services#disciples#mary#flowers#cardinals#blessings"
        // let h2 = homelesslist+ht+htc
        let h1 = ""; //"#General"

        let ht =
          "#Computer#Animals#Schools#Banks#Libraries#Stores#Books#Ebooks#Entertainment#Church#Politics#Music#Movies#Delivery#Hotels#Motels#Rentals#Maps#Directions#Laundry#Theater#Mechanics#Vehicles#Insurance#Travel";
        let homelesslist =
          "#HomelessInAlaska#HomelessInAlabama#HomelessInArkansas#HomelessInAmericanSamoa#HomelessInArizona#HomelessInCalifornia#HomelessInColorado#HomelessInConnecticut#HomelessInDistrictOfColumbia#HomelessInDelaware#HomelessInFlorida#HomelessInGeorgia#HomelessInGuam#HomelessInHawaii#HomelessInIowa#HomelessInIdaho#HomelessInIllinois#HomelessInIndiana#HomelessInKansas#HomelessInKentucky#HomelessInLouisiana#HomelessInMassachusetts#HomelessInMaryland#HomelessInMaine#HomelessInMichigan#HomelessInMinnesota#HomelessInMissouri#HomelessInMississippi#HomelessInMontana#HomelessInNorthCarolina#HomelessInNorthDakota#HomelessInNebraska#HomelessInNewHampshire#HomelessInNewJersey#HomelessInNewMexico#HomelessInNevada#HomelessInNewYork#HomelessInOhio#HomelessInOklahoma#HomelessInOregon#HomelessInPennsylvania#HomelessInPuertoRico#HomelessInRhodeIsland#HomelessInSouthCarolina#HomelessInSouthDakota#HomelessInTennessee#HomelessInTexas#NorthernMarianaIslands#HomelessInUtah#HomelessInVirginia#HomelessInVirginIslands#HomelessInVermont#HomelessInWashington#HomelessInWisconsin#HomelessInWestVirginia#HomelessInWyoming";
        let prisonerslist =
          "#PrisonersInAlaska#PrisonersInAlabama#PrisonersInArkansas#PrisonersInAmericanSamoa#PrisonersInArizona#PrisonersInCalifornia#PrisonersInColorado#PrisonersInConnecticut#PrisonersInDistrictOfColumbia#PrisonersInDelaware#PrisonersInFlorida#PrisonersInGeorgia#PrisonersInGuam#PrisonersInHawaii#PrisonersInIowa#PrisonersInIdaho#PrisonersInIllinois#PrisonersInIndiana#PrisonersInKansas#PrisonersInKentucky#PrisonersInLouisiana#PrisonersInMassachusetts#PrisonersInMaryland#PrisonersInMaine#PrisonersInMichigan#PrisonersInMinnesota#PrisonersInMissouri#PrisonersInMississippi#PrisonersInMontana#PrisonersInNorthCarolina#PrisonersInNorthDakota#PrisonersInNebraska#PrisonersInNewHampshire#PrisonersInNewJersey#PrisonersInNewMexico#PrisonersInNevada#PrisonersInNewYork#PrisonersInOhio#PrisonersInOklahoma#PrisonersInOregon#PrisonersInPennsylvania#PrisonersInPuertoRico#PrisonersInRhodeIsland#PrisonersInSouthCarolina#PrisonersInSouthDakota#PrisonersInTennessee#PrisonersInTexas#NorthernMarianaIslands#PrisonersInUtah#PrisonersInVirginia#PrisonersInVirginIslands#PrisonersInVermont#PrisonersInWashington#PrisonersInWisconsin#PrisonersInWestVirginia#PrisonersInWyoming";
        let htc =
          "#JesusChrist#SalvationOfJesusChrist#LifeOfJesusChrist#GraceOfJesusChrist#FaithOfJesusChrist#AudioHolyBible#Fellowship#Kindness#Devine#Love#MysteryOfJesusChrist#FaithOfJesusChrist#LivingWaters#DeathOfChrist#ResurrectionOfChrist#Prayers#Sermons#Healings#CatholicChurches#Happy#Joy#Cathedrals#Homilies#Israel#Nuns#Priests#Saints#Angels#Music#Pictures#Videos#Movies#Testimonies#Pastors#Deacons#Christmas#ChristmasTrees#Easter#HolyBibles#Maps#Directions#Convents#Vatican#Popes#HolyGodTheFather#Donations#Forgiveness#Humility#Services#Disciples#BlessedMary#Flowers#Cardinals#Blessings#CatholicPriests";
        let h2 = homelesslist + prisonerslist + ht + htc;

        if (uid === "7CzFYQjw2aUhHgCYjS2eDODrfVE2") 
        x1=""
          else if(uid==="XLFFo8DQ7LZh8oR8CnvBGInpjsZ2") 
          x1 = extractHashtags(h2);
        else x1 = extractHashtags(h1);
        //x1 = extractHashtags(h2);

        //  let ht=""
        //  let htc=""
        //           if(isInOkArray(uid)===true)
        //           //if(false)
        //           {
        //   ht="#Computer#Animals#Schools#Banks#Libraries#Stores#Prayer#Books#Ebooks#Entertainment#Church#Politics#Music#Movies#Delivery#Hotels#Motels#Rentals#Maps#Directions#Laundry#Theater#Mechanics#Vehicles#Insurance#Travel"
        //     x1 = extractHashtags(ht);
        //           }
        //                 else {
        //  htc="#christ#prayer#sermons#healings#churches#cathedrals#homilies#israel#nuns#priests#saints#angels#music#pictures#videos#movies#testimonies#pastors#deacons#christmas#easter#bible#salvation#maps#directions#convents#vatican#popes#god#father#donations#forgiveness#humility#services#disciples#mary#flowers#cardinals#blessings"

        //  x1 = extractHashtags(htc);
        //                 }

        hashtags.push(...x1);

        links2.forEach((link) => {
          x1 = extractHashtags(link.note);
          hashtags.push(...x1);
        });

        let hashtags3 = [];

        hashtags.forEach((hashtag) => {
          hashtags3.push(hashtag.trim().substring(1));
        });

        let hashtags4 = [];

        hashtags3.forEach((hashtag) => {
          //the following line uppercase's the first character and adds a space for example TheCatIsGreat to The Cat Is Great
          let str2 = hashtag
            .trim()
            .replace(
              /(^|[^a-zA-Z0-9])([a-zA-Z])/g,
              (match, p1, p2) => p1 + p2.toUpperCase(),
            );
          let cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //this removes the space so The Cat Is Great becomes TheCatIsGreat
          let hashtagresult = "#" + cleaned; //This produces #TheCatIsGreat
          hashtags4.push(hashtagresult);
        });

        //after the hash
        // let str2

        // const cleaned = str2.replace(/[^a-zA-Z0-9]/g, ""); //leave the showing characters in

        // const lc = cleaned

        // const hashtag = "#" + lc;

        //     hashtags.forEach((hashtag)=>{
        //        str2=hashtag.trim().replace(/(^|[^a-zA-Z0-9])([a-zA-Z])/g, (match, p1, p2) => p1 + p2.toUpperCase());

        //     })

        hashtags = hashtags4;

        //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))

        let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags);
        hashTags2WithCount.sort((a, b) => {
          return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
          //return a.hashtag > b.hashtag ? 1 : -1;
        });
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))

        let hashtags2 = removeDuplicates(hashtags);
        hashtags2.sort((a, b) => {
          return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
          //return a > b ? 1 : -1;
        });

        let hashtags3withcount = [];
        let seenArray = [];

        hashtags2.forEach((ht1) => {
          hashTags2WithCount.forEach((ht2) => {
            if (!seen(ht1, seenArray) && ht1 === ht2.hashtag) {
              seenArray.push(ht1);
              console.log(
                "ZZZZZZZZZZZZZZZZ, seenArray=" + JSON.stringify(seenArray),
              );
              hashtags3withcount.push(ht2);
            }
          });
        });

        dispatch(setHashTags(hashtags2));

        dispatch(setHashTags(hashtags3withcount));
        dispatch(setHashTags2WithCount(hashTags2WithCount));
      })
      .catch((error) => console.log("error=" + error));

    //the following is another way and it said it is faster but it does not work
    //      database().ref(`users/${uid}/links`).on('value', (snapshot) => {
    //       const links2 = []
    //   snapshot.forEach((childSnapshot) => {
    //     // Push the child's value directly into your array
    //     //globalReduxArray.push(childSnapshot.val());
    //       links2.push({
    //             id: childSnapshot.key,
    //             ...childSnapshot.val(),
    //           });
    //   });
    // dispatch(setLinks(links2));

    // let hashtags = [];
    //          const longnamesnowhitespace = []
    //          const longnames = []

    //         //if(this.props.links.length>0) {
    //         links2.forEach((link) => {

    //           let x1 = extractHashtags(link.note);
    //           hashtags.push(...x1);

    //         });
    // //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP, hashtags="+JSON.stringify(hashtags))
    //         let hashTags2WithCount = countTimesEachHashTagIsUsed(hashtags)
    //          hashTags2WithCount.sort((a, b) => {
    //           return a.hashtag.toLowerCase() > b.hashtag.toLowerCase() ? 1 : -1;
    //           //return a.hashtag > b.hashtag ? 1 : -1;
    //         });
    //         // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz, hashTags2WithCount="+JSON.stringify(hashTags2WithCount))

    //         let hashtags2 = removeDuplicates(hashtags);
    //         hashtags2.sort((a, b) => {
    //           return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    //           //return a > b ? 1 : -1;
    //         });

    //         let hashtags3withcount=[]
    //         let seenArray=[]

    //         hashtags2.forEach((ht1)=>{
    //           hashTags2WithCount.forEach((ht2)=>{
    //                  if(!seen(ht1,seenArray) && (ht1===ht2.hashtag)) {
    //                   seenArray.push(ht1)
    //                   console.log("ZZZZZZZZZZZZZZZZ, seenArray="+JSON.stringify(seenArray))
    //                   hashtags3withcount.push(ht2)
    //                  }
    //           })
    //         })
    //         dispatch(setHashTags(hashtags3withcount));
    //         dispatch(setHashTags2WithCount(hashTags2WithCount));
    // }).catch((error) => console.log("error=" + error));
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
