import React, { useEffect, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import { toast } from "react-toastify";

const FollowingOnlineToasts = (props) => {
  const previousStatusRef = useRef({});
  const listenersRef = useRef([]);


  useEffect(() => {
    if (!props.uid) return;

    const followingRef = firebase
      .database()
      .ref(`users/${props.uid}/following`);

    const loadFollowing = async () => {
      const snapshot = await followingRef.once("value");

      if (!snapshot.exists()) {
        return;
      }

      snapshot.forEach((childSnapshot) => {
  const followedUid = childSnapshot.key;
  const followedEmail = childSnapshot.val();

  const onlineRef = firebase
    .database()
    .ref(`users/${followedUid}/online`);

  const handleOnlineChange = (onlineSnapshot) => {
    const isOnline = onlineSnapshot.val() === true;

    if (
      previousStatusRef.current[followedUid] === undefined
    ) {
      previousStatusRef.current[followedUid] = isOnline;
      return;
    }

    if (
      previousStatusRef.current[followedUid] === false &&
      isOnline === true
    ) {
      let displayName = "Someone you are following";

      if (typeof followedEmail === "string") {
        displayName = followedEmail.split("@")[0];
      }

      toast(`${displayName} is online`);
    }

    previousStatusRef.current[followedUid] = isOnline;
  };

  onlineRef.on("value", handleOnlineChange);
});

//       snapshot.forEach((childSnapshot) => {
//         const followedUid = childSnapshot.key;

//         const onlineRef = firebase
//           .database()
//           .ref(`users/${followedUid}/online`);

//         const userRef = firebase
//           .database()
//           .ref(`users/${followedUid}`);

//         const handleOnlineChange = async (onlineSnapshot) => {
//           const isOnline = onlineSnapshot.val() === true;

//           console.log(
//             "ONLINE CHANGE:",
//             followedUid,
//             onlineSnapshot.val()
//           );

//           console.log(
//             "PREVIOUS:",
//             previousStatusRef.current[followedUid],
//             "NOW:",
//             isOnline
//           );

        
//           if (
//             previousStatusRef.current[followedUid] === undefined
//           ) {
//             previousStatusRef.current[followedUid] = isOnline;
//             return;
//           }

         
//           if (
//             previousStatusRef.current[followedUid] === false &&
//             isOnline === true
//           ) {
//             let displayName = "Someone you follow";

//             try {
//               const userSnapshot = await userRef.once("value");
//               const userData = userSnapshot.val();

//               // if (userData) {
//               //   displayName =
//               //     userData.displayName ||
//               //     userData.displayname ||
//               //     userData.gud ||
//               //     displayName;
//               // }

//               let displayName = "Someone you follow";

// if (
//   userData &&
//   typeof userData.email === "string"
// ) {
//   displayName = userData.email.split("@")[0];
// }
//             } catch (error) {
//               console.log(
//                 "Could not get display name:",
//                 error
//               );
//             }

//             console.log("SHOWING TOAST FOR:", displayName);

//             toast(`${displayName} is online`);
//           }

//           previousStatusRef.current[followedUid] = isOnline;
//         };

//         onlineRef.on("value", handleOnlineChange);

//         listenersRef.current.push({
//           ref: onlineRef,
//           callback: handleOnlineChange,
//         });
//       });





    };

    loadFollowing();

    return () => {
      listenersRef.current.forEach((listener) => {
        listener.ref.off(
          "value",
          listener.callback
        );
      });

      listenersRef.current = [];
    };
  }, [props.uid]);

  return null;
};

export default FollowingOnlineToasts;

// import React, { useEffect, useRef } from "react";

// import firebase from "firebase/app";
// import "firebase/database";

// import { toast } from "react-toastify";

// const FollowingOnlineToasts = (props) => {
//   const previousStatusRef = useRef({});
//   const listenersRef = useRef([]);

//   useEffect(() => {
//     if (!props.uid) return;

//     const followingRef = firebase
//       .database()
//       .ref(`users/${props.uid}/following`);

//     const loadFollowing = async () => {
//       const snapshot = await followingRef.once("value");

//       if (!snapshot.exists()) {
//         return;
//       }

//       snapshot.forEach((childSnapshot) => {
//         const followedUid = childSnapshot.key;

//         const onlineRef = firebase
//           .database()
//           .ref(`users/${followedUid}/online`);

//         const userRef = firebase
//           .database()
//           .ref(`users/${followedUid}`);

    
//           const isOnline = onlineSnapshot.val() === true;

         
//           if (
//             previousStatusRef.current[followedUid] === undefined
//           ) {
//             previousStatusRef.current[followedUid] = isOnline;
//             return;
//           }

         
//           if (
//             previousStatusRef.current[followedUid] === false &&
//             isOnline === true
//           ) {
//             let displayName = "Someone you follow";

//             try {
//               const userSnapshot = await userRef.once("value");
//               const userData = userSnapshot.val();

//               if (userData) {
//                 displayName =
//                   userData.displayName ||
//                   userData.displayname ||
//                   userData.gud ||
//                   displayName;
//               }
//             } catch (error) {
//               console.log(
//                 "Could not get display name:",
//                 error
//               );
//             }

//             toast(`${displayName} is online`);
//           }

//           previousStatusRef.current[followedUid] = isOnline;
//         };

//         onlineRef.on("value", handleOnlineChange);

//         listenersRef.current.push({
//           ref: onlineRef,
//           callback: handleOnlineChange,
//         });


//       });
//     };

//     loadFollowing();

//     return () => {
//       listenersRef.current.forEach((listener) => {
//         listener.ref.off(
//           "value",
//           listener.callback
//         );
//       });

//       listenersRef.current = [];
//     };
//   }, [props.uid]);

//   return null;
// };

// export default FollowingOnlineToasts;