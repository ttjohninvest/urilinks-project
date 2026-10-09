import React, { useEffect, useState, useRef } from "react";
//import PropTypes from 'prop-types';
//import firebase from 'firebase/app';
//import 'firebase/database'; // Import the Realtime Database SDK
import firebase from "firebase";
import database from "./../firebase/firebase";
import { useRtdbQuery } from "./../chat/hooks"; // Replaced Firestore hook with RTDB hook
// Components
import Message from "./Message";

//const Channel = ({ user = null }) => {
const Channel = (props) => {
  const [photourl, setPhotourl] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState(null);
  // console.log("Channel, user="+JSON.stringify(user))
  //const theurl=`chat/messages/${props.id2}/${props.name2}/${props.id}/${props.name1}/3`

  //const params = new URLSearchParams(window.location.search);
  const chatsetting = props.chatsetting; //params.get("chatsetting");

  const theurl = `chat/messages/${props.id2}/${props.name2}/${props.id}/${props.name1}`;
  //alert("theurl="+theurl)
  //alert("Channel, theurl=")
  //alert(`chat/messages/${props.id2}/${props.name2}/${props.id}/${props.name1}`)
  //`chat/messages/D9/name2/XL/name1`
  //const theurl=`chat/messages/${props.id2}/${props.id}`
  //`chat/messages/D9/XL`
  console.log("Channel, theurl=" + theurl);
  //const messagesRef= database.ref(`chat/messages/${props.id2}/${props.id}`)
  const messagesRef = database.ref(theurl);
  // // Realtime Database query replacing Firestore query
  const messages = useRtdbQuery(
    messagesRef.orderByChild("createdAt").limitToLast(100),
  );
  //alert("messages="+JSON.stringify(messages))
  //alert("messages.messages="+JSON.stringify(messages.messages))
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();
  const bottomListRef = useRef();
  const {
    uid,
    displayName,
    //,
    photoUrl
  } = props.user; // || {};
  useEffect(() => {
    console.log(
      "firebase.auth().currentUser.photoURL=" +
        firebase.auth().currentUser.photoURL,
    );
    //console.log("messages="+JSON.stringify(messages))
    //alert("messages="+JSON.stringify(messages))
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (bottomListRef.current)
      bottomListRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages.length]);

  const saveProfilePictureToStorage = async (user) => {
  try {
    const response = await fetch(user.photoURL);

    const blob = await response.blob();

    const storageRef = firebase
      .storage()
      .ref()
      .child(`profilePictures/${user.uid}.jpg`);

    await storageRef.put(blob);

    const downloadURL = await storageRef.getDownloadURL();

    console.log("Stored profile picture URL =", downloadURL);
    //alert("Stored profile picture URL =", downloadURL)

    return downloadURL;
  } catch (error) {
    console.log("Error saving profile picture:", error);
    return null;
  }
};

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
//       if (user) {
//         // setPhotourl(user.photoURL); src={profilePhotoURL || "/default-profile.png"}
//           const storedPhotoURL = await saveProfilePictureToStorage(user);
          

//            await database
//         .ref(`users/${user.uid}/profilePhotoURL`)
//         .set(storedPhotoURL);

//       } else {
//         setPhotourl(null);
//       }
//     });

//     return () => unsubscribe();
//   });

//   useEffect(() => {
//   const user = firebase.auth().currentUser;

//   if (user) {
   
//       database
//       .ref(`users/${user.uid}/profilePhotoURL`)
//       .once("value")
//       .then((snapshot) => {
//         //setProfilePhotoURL(snapshot.val());
//         setPhotourl(snapshot.val())   // || "/default-profile.png"); //src={profilePhotoURL || "/default-profile.png"}
//       });
//   }
// }, []);

useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const storedPhotoURL =
        await saveProfilePictureToStorage(user);

      if (storedPhotoURL) {
        setPhotourl(storedPhotoURL);

        await database
          .ref(`users/${user.uid}/profilePhotoURL`)
          .set(storedPhotoURL);
      } else {
        setPhotourl("/default-profile.png");
      }
    } else {
      setPhotourl("/default-profile.png");
    }
  });

  return () => unsubscribe();
}, []);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {

      const structure = {
        text: trimmedMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        uid2: props.id2,
        displayName2: firebase.auth().currentUser.displayName, //props.name2,
        uid1: props.id,
        displayName1: props.name1, //name1 is wrong, but not every time, it is saying John
        photoURL: photourl
      };

      console.log("structure=" + JSON.stringify(structure));

      messagesRef
        .push(structure)
        .then(() => {
          //this pushes the chat message into the datbase
        })
        .catch((error) => {});

      setNewMessage("");
      // Scroll down to the bottom of the list
      if (!!bottomListRef === true && !!bottomListRef.current === true)
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      else {
      }
    }
  };
  //alert("chatsetting="+chatsetting)
  const welcomemessage2 = `Welcome to urilinks chat. ${props.name2} and ${props.name1} are in communication. You can still send a message to ${props.name1} if the other person is not online.`;
  const welcomemessage1 = `Welcome to urilinks chat. ${props.name1} and ${props.name2} are in communication. You can still send a message to ${props.name2} if the other person is not online.`;
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">{`${chatsetting === "2" ? welcomemessage2 : welcomemessage1}`}</p>
            </div>
            {/* <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p> */}
          </div>
          <ul style={{ listStyle: "none" }}>
            {!!messages === true &&
              messages.map((message, i) => (
                <li key={i}>
                  <Message {...message} chatsetting={props.chatsetting} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1- bg-transparent- outline-none channel-input"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={!newMessage}
            //className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            className="button-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

// Channel.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string,
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
//   }),
// };

export default Channel;
