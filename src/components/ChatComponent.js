import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";

import Channel from "./Channel";
import AnotherComponent from "./AnotherComponent";
//import Loader from './Loader';




const ChatComponent = (props) => {
  //const {user,setUser} = useState({})
  //const user = firebase.auth().currentUser
  console.log("ChatComponent,firebase.auth().currentUser="+JSON.stringify(firebase.auth().currentUser))
  // const params = new URLSearchParams(window.location.search);

  // const id2 = params.get("id2");
  // const id = params.get("id");
const id2 = props.match.params.id2
const id = props.match.params.id

const name2 = props.match.params.name2
const name1 = props.match.params.name1

const params = new URLSearchParams(window.location.search);
const chatsetting = params.get("chatsetting");

console.log("ChatComponent, id2="+id2)
console.log("ChatComponent, id="+id)

  console.log("ChatComponent, name2="+name2)
  console.log("ChatComponent, name1="+name1)
  

  // useEffect(() => {
  //  //setUser(firebase.auth().currentUser)
  // //  console.log("ChatComponent,firebase.auth().currentUser="+JSON.stringify(firebase.auth().currentUser))
  // }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
        style={{ height: "var(--topbar-height)" }}
      >
        <div className="flex items-center"></div>
      </header>
      <main
        className="flex-1"
        style={{ maxHeight: "calc(100% - var(--topbar-height))" }}
      >
        {firebase.auth().currentUser !== null ? <Channel user={firebase.auth().currentUser} id2={id2} id={id}
        name2={name2} name1={name1} chatsetting={chatsetting}
        />:<div>User not found, The user is not logged in.</div>}
        {/* <AnotherComponent /> */}
      </main>
    </div>
  );
};

//export default ChatComponent;
// const mapStateToProps = (state) => ({

// });

export default connect(undefined, undefined)(ChatComponent);
