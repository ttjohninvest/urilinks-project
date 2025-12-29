import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

// const actionCodeSettings = {
//   url: 'https://yourapp.com/return-to-page', // This is the continue URL
//   handleCodeInApp: true, // Optional: enables handling the link in a mobile app if installed
//   iOS: {
//     bundleId: 'com.example.ios' // iOS bundle ID
//   },
//   android: {
//     packageName: 'com.example.android', // Android package name
//     installApp: true, // Optional: prompts user to install the app if not installed
//     minimumVersion: '12' // Optional: minimum app version required
//   }
// };

export const startLogin = () => {
  console.log("startLogin")
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider) 
     //return firebase.auth().signInWithPopup(googleAuthProvider,actionCodeSettings) 
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


