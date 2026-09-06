import database from "../firebase/firebase";
import subscriptionid from "../reducers/subscriptionid";

// SET_SETTINGS
export const setThesignupcount = (thesignupcount) => ({
  type: "SET_THESIGNUPCOUNT",
  thesignupcount,
});

export const startAddThesignupcount = (thesignupcountData = {}) => {
  console.log(
    "startAddThesignupcount, thesignupcountData=" +
      JSON.stringify(thesignupcountData),
  );
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;

    return (
      database
        .ref(`users/thesignupcount`)
        //.push(settingsData)
        .update(thesignupcountData)
        .then(() => {
          console.log(
            "in startAddTheplan, just before the call to dispatch to add theplanData to redux",
          );

          dispatch(addThesignupcount(thesignupcountData));
        })
    );
  };
};

export const getThesignupcount2 = () => {
  console.log("actions/getThesignupcount2");
  return (dispatch, getState) => {
   
    return database

      .ref(`users/thesignupcount`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() === null) {
        } else {
          dispatch(addThesignupcount(snapshot.val()));
        }
      });
  };
};

export const getThesignupcount = (v) => {
  console.log("actions/getThesignupcount");
  return (dispatch, getState) => {
    let s;
    return database

      .ref(`users/thesignupcount`)
      .once("value")
      .then((snapshot) => {
        let zsignupcount = {
          signupcount: 0,
        };

        if (snapshot.val() === null) {
          //theplan = "free";
          dispatch(startAddThesignupcount(zsignupcount));
        } else {
          
          let x = snapshot.val();
          if(!!z===true && z!==2)
          if (x.signupcount === undefined || x.signupcount === null)
            x.signupcount = 0;
          else x.signupcount += 1;
          console.log(
            "updating signupcount,zsignupcounti.signupcount=" +
              JSON.stringify(x),
          );

          return database
            .ref(`users/thesignupcount`)
            .update(x) //{showpublic:0}
            .then(() => {
              dispatch(addThesignupcount(x));
            })
            .catch((error) => {
              console.log(
                "error removing link data in firebase, error=" + error,
              );
            });
        }
      });
  };
};

// REMOVE_SETTINGS
export const removeThesignupcount = () => ({
  type: "REMOVE_THESIGNUPCOUNT",
});

export const startRemoveThesignupcount = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/thesignupcount`)
      .remove()
      .then(() => {
        dispatch(removeThesignupcount());
      });
  };
};

// EDIT_LINK
export const editThesignupcount = (updates) => ({
  type: "EDIT_THESIGNUPCOUNT",
  updates,
});

export const startEditThesignupcount = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/thesignupcount`)
      .update(updates)
      .then(() => {
        dispatch(editThesignupcount(updates));
      });
  };
};

export const addThesignupcount = (thesignupcount) => ({
  type: "ADD_THESIGNUPCOUNT",
  thesignupcount,
});

export const incrementSignupClickCount2 = (thesignupcount) => ({
  type: "INCREMENT_SIGNUP_COUNT",
  thesignupcount,
});

export const decrementSignupClickCount2 = (thesignupcount) => ({
  type: "DECREMENT_SIGNUP_COUNT",
  thesignupcount,
});

export const incrementSignupClickCount = (x) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // alert("incrementClickCount, uid="+uid)
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/thesignupcount`)
      .update({ signupcount: parseInt(x.signupcount) + 1 }) //{showpublic:0}
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(
          incrementSignupClickCount2({
            signupcount: parseInt(x.signupcount) + 1,
          }),
        );
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};




// export const decrementSignupCount = (x) => {
//   console.log("actions/decrementSignupCount");
//   return (dispatch, getState) => {
   
//     database.ref(`users/thesignupcount`)
//             .update(x) 
//             .then(() => {
//               dispatch(addThesignupcount(x));
//             })
//             .catch((error) => {
//               console.log(
//                 "error decrementSignupCount, error=" + error,
//               );
//             });
        
//           }
// }

export const decrementSignupCount = (x) => {
  //alert("incrementLinkClickCount, id="+id+", frequency="+frequency)
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    //update(dbRef, { value: increment(1) });
    return database
      .ref(`users/thesignupcount`)
      .update({signupcount:parseInt(x.signupcount)-0}) //{showpublic:0}
      //.update({totalstars:4}) 
      .then(() => {
        //alert("success")
        //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
        dispatch(decrementSignupClickCount2({signupcount:parseInt(x.signupcount)-0}));
      })
      .catch((error) => {
        console.log("error removing link data in firebase, error=" + error);
      });
  };
};