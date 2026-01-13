import * as firebase from "firebase";

import "firebase/storage";

let config = {};

fetch("http://urilinks-project-env-vars.vercel.app") //cloud function that stores the environment variables
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    config = {
      apiKey: data.FIREBASE_API_KEY,
      authDomain: data.FIREBASE_AUTH_DOMAIN,
      databaseURL: data.FIREBASE_DATABASE_URL,
      projectId: data.FIREBASE_PROJECT_ID,
      storageBucket: data.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: data.FIREBASE_MESSAGING_SENDER_ID,
    };
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };

// const config = {
//   apiKey: "AIzaSyDV2yr2TVpIIMgcwLonAIdPgc3epMipvxs",
//   authDomain: "see-my-index-project-4.firebaseapp.com",
//   databaseURL: "https://see-my-index-project-4-default-rtdb.firebaseio.com",
//   projectId: "see-my-index-project-4",
//   storageBucket: "see-my-index-project-4.firebasestorage.app",
//   messagingSenderId: "754943560663",
// };

console.log("A ABOUT TO CALL firebase.initializeApp");
const app = firebase.initializeApp(config);
const storage = firebase.storage();

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//prompt: "select_account"
googleAuthProvider.setCustomParameters({
  //this fixed the google email selection dialog from not coming up
  //prompt: "consent"
  prompt: "select_account",
});
export { storage, firebase, googleAuthProvider, database as default };

// // child_removed
// database.ref('links').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('links').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref('links').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // database.ref('links')
// //   .once('value')
// //   .then((snapshot) => {
// //     const links = [];

// //     snapshot.forEach((childSnapshot) => {
// //       links.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log(links);
// //   });

// // database.ref('links').on('value', (snapshot) => {
// //   const links = [];

// //   snapshot.forEach((childSnapshot) => {
// //     links.push({
// //       id: childSnapshot.key,
// //       ...childSnapshot.val()
// //     });
// //   });

// //   console.log(links);
// // });

// database.ref('links').push({
//   description: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt: 976123498763
// });

// // database.ref('notes/-Krll52aVDQ3X6dOtmS7').remove();

// // database.ref('notes').push({
// //   title: 'Course Topics',
// //   body: 'React Native, Angular, Python'
// // });

// // database.ref().on('value', (snapshot) => {
// //   const val = snapshot.val();
// //   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// // })

// // Setup data sub -> Andrew is a Software Developer at Amazon.

// // Change the data and make sure it reprints

// // database.ref('location/city')
// //   .once('value')
// //   .then((snapshot) => {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch((e) => {
// //     console.log('Error fetching data', e);
// //   });

// // database.ref().set({
// //   name: 'Andrew Mead',
// //   age: 26,
// //   stressLevel: 6,
// //   job: {
// //     title: 'Software developer',
// //     company: 'Google'
// //   },
// //   location: {
// //     city: 'Philadelphia',
// //     country: 'United States'
// //   }
// // }).then(() => {
// //   console.log('Data is saved!');
// // }).catch((e) => {
// //   console.log('This failed.', e);
// // });

// // database.ref().update({
// //   stressLevel: 9,
// //   'job/company': 'Amazon',
// //   'location/city': 'Seattle'
// // });

// // database.ref()
// //   .remove()
// //   .then(() => {
// //     console.log('Data was removed');
// //   }).catch((e) => {
// //     console.log('Did not remove data', e);
// //   });
