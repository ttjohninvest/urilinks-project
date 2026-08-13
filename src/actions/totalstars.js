import database from "../firebase/firebase";

// ADD_LINK
export const addTotalStars = (totalstars) => ({
  type: "ADD_TOTALSTARS",
  totalstars,
});

// SET_SETTINGS
export const setTotalStars = (totalstars) => ({
  type: "SET_TOTALSTARS",
  totalstars,
});

export const startAddTotalStars = (totalstarsData = {}) => {
  console.log("startAddTotalStars, totalstarsData=" + JSON.stringify(totalstarsData));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return (
      database
        .ref(`users/${uid}/totalstars`)
        //.push(settingsData)
        .update(totalstarsData)
        .then(() => {
          console.log(
            "in startAddTotalStars, just before the call to dispatch to add totalstarsData to redux"
          );
          // dispatch(
          //   addTotalStars({
          //     ...totalstarsData,
          //   })
          // );

          dispatch(addTotalStars(totalstarsData));
          
        })
    );
  };
};

export const getTotalStars = (id) => {
  console.log("actions/getTotalStars");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("actions/getTotalStars, uid=" + uid);
    let s;
    return database
     
      .ref(`users/${uid}/totalstars`)
      .once("value")
      .then((snapshot) => {
        let totalstars
       
        console.log(
          "action/getTotalStars from db, snapshot.val()=" + JSON.stringify(snapshot.val())
        );

        let zplan={
          totalstars:0
        }

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddTotalStars(zplan))
        } else {
          //theplan=snapshot.val();
          //zplan=snapshot.val();
          dispatch(addTotalStars(snapshot.val()));
        }
       
      });
  };
};




