import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  console.log("startLogin")
  return () => {
     return firebase.auth().signInWithPopup(googleAuthProvider) 
  };
};

export const logout = () => {
  console.log("SSSSSSSSSSSSSSSSSSSSSS, in actions/auth.js/logout function")
  return {
    type: 'LOGOUT',
    uid:''
  }
};

export const startLogout = () => {
  return () => {
    
    return firebase.auth().signOut();
  };
};


