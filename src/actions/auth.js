import { firebase, googleAuthProvider } from '../firebase/firebase';
import {decrementSignupCount} from "./thesignupcount"

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  console.log("startLogin")
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
    //firebase project settings has the values to initial firebase 
    //1) has see-my-index-project-7.firebaseapp.com/__/auth/handler which is assigned in google cloud console identity platform client 2.0, the second one that has the __/auth/handler 
    //2) firebase.google.com has authorized domains list and one of the them is see-my-index-project-7.firebaseapp.com
    //3) heroku.com has config env variable values to initialize firebase which includes authDomain that is set to see-my-index-project-7.firebaseapp.com and this is used in call to firebase.initializeApp(config) in firebase.js to initialize firebase with the config set the see-my-index-project-7 project then setlect gear icon and scroll to the bottom of the page for the config structure
  };
};

export const logout = () => {
  console.log("SSSSSSSSSSSSSSSSSSSSSS, in actions/auth.js/logout function")
  return {
    type: 'LOGOUT',
    uid:''
  }
};

export const startLogout = (signupcount) => {
  const x = {
    thesignupcount:signupcount
  }
  console.log("before, startLogout, x="+JSON.stringify(x))
  decrementSignupCount(x)
  console.log("after decrementSignupCount, startLogout, x="+JSON.stringify(x))
  return () => {
    
    return firebase.auth().signOut();
  };
};


