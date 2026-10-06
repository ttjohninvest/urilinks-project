import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import database from "./../firebase/firebase";

const ChatNotifications = (props) => {
  const [selectedChat, setSelectedChat] = useState("");
  const [uniqueChats, setUniqueChats] = useState([]);

  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [selectedChatName, setSelectedChatName] = useState("Select a chat");

  const handleChange = (uid2, dn2, uid1, dn) => {
    console.log(uid2);
    console.log(dn2);
    console.log(uid1);
    console.log(dn);
    //   alert(uid2);
    //   alert(dn2);
    //   alert(uid1);
    //   alert(dn);
    window.open(`/chat/${uid2}/${dn2}/${uid1}/${dn}/?ni=3`);
  };

  const filteredChats = props.ischat.filter((n) => n.uid1 === props.auth.uid);

  useEffect(() => {
    const uniqueChats = filteredChats.filter(
      (chat, index, array) =>
        index === array.findIndex((item) => item.uid2 === chat.uid2),
    );
    setUniqueChats(uniqueChats);
  }, []);

  const removeChatNotification = (uid2, dn2, uid1, dn1) => {
    const confirmation = window.prompt(
      "To delete this chat with "+dn2+", type exactly: delete chat",
    );

    if (confirmation !== "delete chat") {
      alert("Chat was not deleted.");
      return;
    }

    // Put your Firebase deletion code here
    console.log("calling the database to delete the chat from the firebase realtime database");
    database
      .ref(`chat/messages/${uid2}/${dn2}/${uid1}/${dn1}`)
      .remove()
      .then(() => {
        alert("The chat with "+dn2+" is removed.")
        console.log("Chat removed");
      })
      .catch((error) => {
        console.log("Error removing chat:", error);
      });
  };

  return (
    <div className="chat-dropdown">
      <button
        type="button"
        className="chat-dropdown-button"
        onClick={() => setChatDropdownOpen(!chatDropdownOpen)}
      >
        {selectedChatName}
        <span>▼</span>
      </button>
      {chatDropdownOpen && (
        <div className="chat-dropdown-list">
          {uniqueChats.map((n) => (
            <div
              key={n.uid2}
              className="chat-dropdown-item"
              onClick={() => {
                setSelectedChatName(n.dn2);
                setChatDropdownOpen(false);

                handleChange(n.uid2, n.dn2, n.uid1, n.dn);
              }}
            >
              <span className="color-black-3">{n.dn2}</span>

              <button
                type="button"
                className="chat-delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeChatNotification(n.uid2, n.dn2, n.uid1, n.dn);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // return (<div>
  //   <select
  //     className="pretty-select"
  //     onChange={(e) => {
  //       const n = uniqueChats[e.target.value];

  //       if (n) {
  //         handleChange(n.uid2, n.dn2, n.uid1, n.dn);
  //       }
  //     }}
  //   >
  //     <option value="">Select a chat</option>

  //     {uniqueChats.map((n, index) => (
  //       <option key={n.uid2} value={index}>
  //         {n.dn2}
  //       </option>
  //     ))}
  //   </select>
  //   <button
  //   type="button"
  //   onClick={() => {
  //     const n = uniqueChats[selectedChat];

  //     if (n) {
  //       removeChatNotification(n.uid2);
  //     }
  //   }}
  // >
  //   Remove
  // </button>
  // </div>
  // );
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  ischat: state.ischat,
});

export default connect(mapStateToProps, undefined)(ChatNotifications);

// const handleChange = (dn, uid1, dn2, uid2) => {

//   alert(dn+" "+uid1+", "+dn2+" "+uid2)
//   console.log(dn+" "+uid1+", "+dn2+" "+uid2);

// };

// //return (
// //   <select onChange={handleChange}>
// //     <option value="">Select a chat</option>

// //     {props.ischat
// //       .filter((n) => n.uid1 === props.auth.uid)
// //       .map((n, index) => (
// //         <option key={index} value={n.uid2+";"+n.dn2+";"+n.uid1+";"+n.dn}>
// //           {n.dn2}
// //         </option>
// //       ))}
// //   </select>
// //)

// return (
//   <div>
//      <div>Select a chat</div>
//     {props.ischat
//       .filter((n) => n.uid1 === props.auth.uid)
//       .map((n, index) => (
//         <button
//           key={index}
//           onClick={() =>
//             handleChange(n.dn, n.uid1, n.dn2, n.uid2)
//           }
//         >
//           {n.dn2}
//         </button>
//       ))}
//   </div>
// )
