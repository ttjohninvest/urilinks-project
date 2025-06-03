const functions = require('firebase-functions');

   exports.myOnDeleteFunction = functions.database.ref('/users/{userId}')
       .onDelete((snapshot, context) => {
           // Get the value that was deleted
           const deletedValue = snapshot.val();
           const pushId = context.params.pushId;
           // Perform actions here
           console.log(`Data deleted at /users/${userId}:`, deletedValue);
           // return null or a promise
           return null;
       });