
const functions = require('firebase-functions/v1');
// const admin = require('firebase-admin');
// admin.initializeApp();

exports.deleteData = functions.database.ref('/users/{userId}').onDelete((snapshot, context) => {
    // const deletedData = snapshot.val(); // Get the data that was deleted
    // // Perform actions based on the deleted data
    // console.log('Data deleted:', deletedData);
    // For example, you could delete related data in another part of the database
    // admin.database().ref('/other/path').child('/some/related/data').set(null);
});