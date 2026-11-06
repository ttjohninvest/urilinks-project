import { firebase, googleAuthProvider } from '../firebase/firebase';
import { history } from "../routers/AppRouter";
import {decrementSignupCount} from "./thesignupcount"

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

// export const startLogin = () => {
//   console.log("startLogin");

//   return () => {
//     return firebase
//       .auth()
//       .setPersistence(
//         firebase.auth.Auth.Persistence.SESSION
//       )
//       .then(() => {
//         return firebase
//           .auth()
//           .signInWithPopup(googleAuthProvider);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

export const startLogin = () => {
  console.log("startLogin");

  return (dispatch, getState) => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
      })
      .then((result) => {
        // if (result && result.user) {
        //   history.replace("/dashboard?signup=signup&z2=1");
        // }
         if (result && result.user) {
    console.log("GOOGLE LOGIN UID =", result.user.uid);
    dispatch(login(result.user.uid));
    history.replace("/dashboard?signup=signup&z2=1");
    //console.log("REDUX LOGIN DISPATCHED =", result.user.uid);
    console.log("REDUX UID AFTER LOGIN =", getState().auth.uid);
  }
      })
      .catch((error) => {
        console.log(error);
      });
  };

};

//   export const startLogin = () => {
//   console.log("startLogin")
// firebase
//   .auth()
//   .setPersistence(
//     firebase.auth.Auth.Persistence.SESSION
//   )
//   .then(() => {
//     return firebase
//       .auth()
//       .signInWithPopup(googleAuthProvider);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// };

// export const startLogin = () => {
//   console.log("startLogin")
//   return () => {
//     return firebase.auth().signInWithPopup(googleAuthProvider)
//     //firebase project settings has the values to initial firebase 
//     //1) has see-my-index-project-7.firebaseapp.com/__/auth/handler which is assigned in google cloud console identity platform client 2.0, the second one that has the __/auth/handler 
//     //2) firebase.google.com has authorized domains list and one of the them is see-my-index-project-7.firebaseapp.com
//     //3) heroku.com has config env variable values to initialize firebase which includes authDomain that is set to see-my-index-project-7.firebaseapp.com and this is used in call to firebase.initializeApp(config) in firebase.js to initialize firebase with the config set the see-my-index-project-7 project then setlect gear icon and scroll to the bottom of the page for the config structure
//   };
// };

export const logout = () => {
  console.log("SSSSSSSSSSSSSSSSSSSSSS, in actions/auth.js/logout function")
  return {
    type: 'LOGOUT',
    uid:''
  }
};

// export const startLogout = () => {
  
//   return () => {
    
//     return firebase.auth().signOut();
//   };
// };

export const startLogout = () => {
  return (dispatch,getState) => {
    return firebase.auth().signOut().then(() => {
      console.log("FIREBASE SIGNOUT SUCCESS");
      dispatch(logout());

console.log("REDUX UID AFTER CLEAR =", getState().auth.uid);
    

    }).catch((error) => {
      console.log("FIREBASE SIGNOUT ERROR =", error);
    });
  };
};


