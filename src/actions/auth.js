import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  console.log("startLogin")
  return () => {
     return firebase.auth().signInWithPopup(googleAuthProvider) 
// .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`).then((r)=>{
// console.log("r="+JSON.stringify(r,null,4))
//     })
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });
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


