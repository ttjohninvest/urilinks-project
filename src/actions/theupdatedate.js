import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";


// SET_SETTINGS
export const setTheupdatedate = (theupdatedate) => ({
  type: "SET_THEUPDATEDATE",
  theupdatedate,
});

export const startAddTheupdatedate = (theupdatedateData = {}) => {
  console.log("startAddTheupdatedate, theupdatedateData=" + JSON.stringify(theupdatedateData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/theupatedate`)
        //.push(settingsData)
        .update(theupdatedateData)
        .then(() => {
          console.log(
            "in startAddTheupdateate, just before the call to dispatch to add theupdatedateData to redux"
          );
         

          dispatch(addTheupdatedate(theupdatedateData));
          
        })
    );
  };
};

export const getTheupdatedate2 = (id) => {
  console.log("actions/getTheupdatedate2");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTheupdatedate2, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/theupatedate`)
      .once("value")
      .then((snapshot) => {
        let theupdatedate
       
        console.log(
          "action/getTheupdatedate from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zupdatedate={
           updatedate:""
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheupdatedate(zupdatedate))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addTheupdatedate(snapshot.val()));
        }
       
      });
  };
};

export const getTheupdatedate = (uid) => {
  console.log("actions/getTheupdatedate, uid="+uid);
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    console.log("actions/getTheupdatedate, uid=" + uid);
    let s;
    return database
      //.ref(`users/${uid}/theplan/plan`)
      .ref(`users/${uid}/theupdatedate`)
      .once("value")
      .then((snapshot) => {
       
        console.log(
          "11 action/getTheupdatedate from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zupdatedate={
           updatedate:""
        }
////
        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTheupdatedate(zupdatedate))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          //console.log("app.js, zplan="+JSON.stringify(zplan))
          dispatch(addTheupdatedate(snapshot.val()));
        }
        
      });
  };
};









export const addTheupdatedate = (theupdatedate) => ({
  type: "ADD_THEUPDATEDATE",
  theupdatedate,
});





