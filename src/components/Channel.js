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
  const [language, setLanguage] = useState("en");
  const [photourl, setPhotourl] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState(null);
  const [deletedNotice, setDeletedNotice] = useState("");
  // console.log("Channel, user="+JSON.stringify(user))
  //const theurl=`chat/messages/${props.id2}/${props.name2}/${props.id}/${props.name1}/3`

  //const params = new URLSearchParams(window.location.search);
  const chatsetting = props.chatsetting; //params.get("chatsetting");

  const theurl = `chat/messages/${props.id2}/${props.name2}/${props.id}/${props.name1}`;

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

  /*
 sp: {
    selectChat: "",
    messagePlaceholder: "",
    send: "",
    deleteChat: "",
    titlepart1: "",
    titlepart2: "",
    titlepart3: "",
    titlepart4: ""
  }
  */

  const text = {
    en: {
      selectChat: "Select a chat",
      messagePlaceholder: "Enter a message",
      send: "Send",
      deleteChat: "Delete Chat",
      titlepart1: "Welcome to urilinks chat. ",
      titlepart2: "and",
      titlepart3: "are in communication. You can still send a message to ",
      titlepart4: " if the other person is not online.",
    },

    ja: {
      selectChat: "チャットを選択",
      messagePlaceholder: "メッセージを入力",
      send: "送信",
      deleteChat: "チャットを削除",
      titlepart1: "「urilinksチャットへようこそ。",
      titlepart2: "と",
      titlepart3: "は通信中です。相手がオンラインでなくても、",
      titlepart4: "にメッセージを送信できます。」",
    },

    es: {
      selectChat: "Seleccionar un chat",
      messagePlaceholder: "Escriba un mensaje",
      send: "Enviar",
      deleteChat: "Eliminar chat",
      titlepart1: "Bienvenido al chat de urilinks. ",
      titlepart2: "y",
      titlepart3: "Están en comunicación. Puedes seguir enviando un mensaje a ",
      titlepart4: "No está conectado.",
    },

    fr: {
      selectChat: "Sélectionner une discussion",
      messagePlaceholder: "Entrez un message",
      send: "Envoyer",
      deleteChat: "Supprimer la discussion",
      titlepart1: "Bienvenue sur le chat UriLinks. ",
      titlepart2: "et",
      titlepart3:
        "sont en communication. Vous pouvez toujours envoyer un message à ",
      titlepart4: " si l’autre personne n’est pas en ligne.",
    },
  };

  const t = text[language];

  const {
    uid,
    displayName,
    //,
    photoUrl,
  } = props.user; // || {};

 
useEffect(() => {
  let stoppedUserId = "";
  let stoppedName = "";

  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (!user) return;

    stoppedUserId = user.uid;
    stoppedName = user.email
      ? user.email.split("@")[0]
      : "User";
  });

  const handleBeforeUnload = () => {
    if (!stoppedUserId || !theurl) return;

    const messageRef = firebase.database().ref(theurl).push();

    messageRef.set({
      uid: stoppedUserId,
      name: stoppedName,
      text: stoppedName + " stopped the chat session.",
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      systemMessage: true,
    });
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    unsubscribe();
  };
}, [theurl]);


  //   useEffect(() => {
  //   let disconnectRef = null;

  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (!user || !theurl) {
  //       return;
  //     }

  //     const stoppedUserId = user.uid;

  //     const stoppedName =
  //       user.email
  //         ? user.email.split("@")[0]
  //         : "User";

  //     disconnectRef = firebase
  //       .database()
  //       .ref(theurl)
  //       .push();

  //     disconnectRef.onDisconnect().set({
  //       uid: stoppedUserId,
  //       name: stoppedName,
  //       text: stoppedName + " stopped the chat session.",
  //       createdAt: firebase.database.ServerValue.TIMESTAMP,
  //       systemMessage: true
  //     });
  //   });

  //   return () => {
  //     if (disconnectRef) {
  //       disconnectRef.onDisconnect().cancel();
  //     }

  //     unsubscribe();
  //   };
  // }, [theurl]);

  useEffect(() => {
    let disconnectRef = null;
    let currentUser = null;
    let isDeleted = false;
    let initialNoticeLoaded = false;
    let effectActive = true;

    const deletionRef = database.ref(
      `chat/deleted/${props.id2}/${props.name2}/${props.id}/${props.name1}`,
    );

    const registerDisconnect = () => {
      if (
        !effectActive ||
        !initialNoticeLoaded ||
        !currentUser ||
        isDeleted ||
        disconnectRef
      ) {
        return;
      }

      const stoppedName = currentUser.email
        ? currentUser.email.split("@")[0]
        : "User";

      disconnectRef = database.ref(theurl).push();

      const registeredRef = disconnectRef;

      registeredRef
        .onDisconnect()
        .set({
          uid: currentUser.uid,
          name: stoppedName,
          text: stoppedName + " stopped the chat session.",
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          systemMessage: true,
        })
        .then(() => {
          if (isDeleted || !effectActive) {
            return registeredRef.onDisconnect().cancel();
          }
        })
        .catch((error) => {
          console.log("Disconnect registration error:", error);
        });
    };

    const handleDeletion = (snapshot) => {
      if (!effectActive) return;

      initialNoticeLoaded = true;
      isDeleted = snapshot.exists();

      if (isDeleted) {
        const notice = snapshot.val();

        setDeletedNotice(notice.deletedBy + " has deleted this chat session.");

        if (disconnectRef) {
          disconnectRef
            .onDisconnect()
            .cancel()
            .catch((error) => {
              console.log("Unable to cancel disconnect:", error);
            });
        }
      } else {
        setDeletedNotice("");
        registerDisconnect();
      }
    };

    deletionRef.on("value", handleDeletion);

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      currentUser = user;
      registerDisconnect();
    });

    return () => {
      effectActive = false;

      deletionRef.off("value", handleDeletion);

      if (disconnectRef) {
        disconnectRef
          .onDisconnect()
          .cancel()
          .catch((error) => {
            console.log("Disconnect cleanup error:", error);
          });
      }

      unsubscribe();
    };
  }, [theurl, props.id2, props.name2, props.id, props.name1]);

  // useEffect(() => {
  //   let disconnectRef = null;
  //   let chatRef = null;
  //   let chatListener = null;
  //   let chatWasCreated = false;
  //   let disconnectRegistered = false;
  //   let effectActive = true;

  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (!user || !theurl || !effectActive) {
  //       return;
  //     }

  //     const stoppedUserId = user.uid;

  //     const stoppedName = user.email
  //       ? user.email.split("@")[0]
  //       : "User";

  //     chatRef = firebase.database().ref(theurl);

  //     chatListener = (snapshot) => {
  //       if (!effectActive) return;

  //       if (snapshot.exists()) {
  //         chatWasCreated = true;

  //         // Register the close message only once.
  //         if (!disconnectRegistered) {
  //           disconnectRegistered = true;

  //           disconnectRef = chatRef.push();

  //           disconnectRef.onDisconnect().set({
  //             uid: stoppedUserId,
  //             name: stoppedName,
  //             text: stoppedName + " stopped the chat session.",
  //             createdAt: firebase.database.ServerValue.TIMESTAMP,
  //             systemMessage: true,
  //           }).then(() => {
  //             // The chat may have been deleted while
  //             // Firebase was registering the message.
  //             if (!effectActive || !disconnectRegistered) {
  //               return disconnectRef.onDisconnect().cancel();
  //             }
  //           }).catch((error) => {
  //             console.log("Chat disconnect error:", error);
  //           });
  //         }
  //       } else if (chatWasCreated) {
  //         // The chat existed and was subsequently deleted.
  //         // Cancel the scheduled close message.
  //         console.log("Chat deleted. Cancelling close message.");

  //         chatWasCreated = false;
  //         disconnectRegistered = false;

  //         if (disconnectRef) {
  //           disconnectRef.onDisconnect().cancel().catch((error) => {
  //             console.log("Chat cancellation error:", error);
  //           });
  //         }
  //       }
  //     };

  //     chatRef.on("value", chatListener);
  //   });

  //   return () => {
  //     effectActive = false;

  //     if (chatRef && chatListener) {
  //       chatRef.off("value", chatListener);
  //     }

  //     // Keep cancellation on component cleanup.
  //     // Firebase executes onDisconnect only if the
  //     // connection ends before cancellation completes.
  //     if (disconnectRef) {
  //       disconnectRef.onDisconnect().cancel();
  //     }

  //     unsubscribe();
  //   };
  // }, [theurl]);

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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const storedPhotoURL = await saveProfilePictureToStorage(user);

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
        //displayName2: firebase.auth().currentUser.displayName, //props.name2,
        displayName2: props.name2,
        uid1: props.id,
        displayName1: props.name1,
        photoURL: photourl, //,
        //t:t
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
  //const welcomemessage2 = `${t.titlepart1} ${props.name2} ${t.titlepart2} ${props.name1} ${t.titlepart3} ${props.name1} ${t.titlepart4}`;
  //const welcomemessage1 = `${t.titlepart1} ${props.name1} ${t.titlepart2} ${props.name2} ${t.titlepart3} ${props.name2} ${t.titlepart4}`;

  return (
    <div className="flex flex-col h-full">
      {deletedNotice && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#664d03",
            padding: "12px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {deletedNotice}
        </div>
      )}
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center fixed-element">
              {/*<p className="mb-1 margin-left-11">{`${chatsetting === "2" ? welcomemessage2 : welcomemessage1}`}</p>*/}

              {chatsetting === "2" ? (
                <p className="mb-1 margin-left-11">
                  <span>
                    {t.titlepart1}{" "}
                    <span style={{ color: "green" }}>{props.name1}</span>{" "}
                    {t.titlepart2}{" "}
                    <span style={{ color: "green" }}>{props.name2}</span>{" "}
                    {t.titlepart3}{" "}
                    <span style={{ color: "green" }}>{props.name2}</span>{" "}
                    {t.titlepart4}
                  </span>
                </p>
              ) : (
                <p className="mb-1 margin-left-11">
                  <span>
                    {t.titlepart1}{" "}
                    <span style={{ color: "green" }}>{props.name2}</span>{" "}
                    {t.titlepart2}{" "}
                    <span style={{ color: "green" }}>{props.name1} </span>
                    {t.titlepart3}{" "}
                    <span style={{ color: "green" }}>{props.name1} </span>
                    {t.titlepart4}
                  </span>
                </p>
              )}

              <p className="padding-left-1 bg-color-yellow margin-bottom-1 language-dropdown">
                <select
                  className="outline-none custom-select2"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">French</option>
                  <option value="ja">日本語</option>
                </select>
              </p>
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
          {chatsetting === "2" ? (
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="Type your message here..."
              className="ib flex-1- bg-transparent- outline-none channel-input margin-top-1"
              maxLength={1000}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="Type your message here..."
              className="ib flex-1- bg-transparent- outline-none channel-input"
              maxLength={1000}
            />
          )}

          <button
            type="submit"
            disabled={!newMessage}
            //className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            className="button-2"
          >
            {t.send}
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
