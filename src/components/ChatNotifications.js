import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";

const ChatNotifications = (props) => {
  const [selectedChat, setSelectedChat] = useState("");

  const handleChange = (uid2, dn2, uid1, dn) => {
  console.log(uid2);
  console.log(dn2);
  console.log(uid1);
  console.log(dn);
  //   alert(uid2);
//   alert(dn2);
//   alert(uid1);
//   alert(dn);
  window.open(`/chat/${uid2}/${dn2}/${uid1}/${dn}`)

};

const filteredChats = props.ischat.filter(
  (n) => n.uid1 === props.auth.uid
);

const uniqueChats = filteredChats.filter(
  (chat, index, array) =>
    index === array.findIndex((item) => item.uid2 === chat.uid2)
);
return (
  <select
    onChange={(e) => {
      const n = uniqueChats[e.target.value];

      if (n) {
        handleChange(n.uid2, n.dn2, n.uid1, n.dn);
      }
    }}
  >
    <option value="">Select a chat</option>

    {uniqueChats.map((n, index) => (
      <option key={n.uid2} value={index}>
        {n.dn2}
      </option>
    ))}
  </select>
);


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

