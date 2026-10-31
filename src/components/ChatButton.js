import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { startAddFollower } from "../actions/following";
import firebase from "firebase/app"


function decrypt(text, key) {
    if(text === null) return null
    return String.fromCharCode(...text.match(/.{1,2}/g)
        .map((e, i) => 
            parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    );
}

const ChatButton = (props) => {


    const [showDeleteChatButton,setShowDeleteChatButton] = useState(true)
    const params = new URLSearchParams(window.location.search);
    const id2 = props.id2 //params.get("id2");
    const id = props.id //params.get("id");
    const name2 = props.name2
    const name1 = props.name1
  
    //  console.log("ChatButton, id2="+id2)
    //  console.log("ChatButton, id="+id)
     
    //  alert("ChatButton, id2="+id2)
    //  alert("ChatButton, id="+id)

     console.log("ChatButton(), id2="+id2)
     console.log("ChatButton(), name2="+name2)
     console.log("ChatButton(), id="+id)
     console.log("ChatButton(), name1="+name1)


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  // useEffect(() => {
  // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //   if (user && user.photoURL) {
  //     setPhotoUrl(user.photoURL);
  //   }
  // });

  // return unsubscribe;
//}, []);

useEffect(() => {
checkForChatMessages()
  .then((hasMessages) => {
    if (hasMessages) {
      console.log("There are chat messages");
      setShowDeleteChatButton(true)
    } else {
      console.log("There are no chat messages");
      setShowDeleteChatButton(false)
    }
  });
}, []);

const openNewTabWithCustomTitleType = (url, type, customTitle) => {
  const newWindow = window.open(url, type);
  
  if (newWindow) {
    // Option 1: Using addEventListener (Recommended)
    newWindow.addEventListener('load', () => {
      newWindow.document.title = customTitle 
    });

    // Option 2: Using setTimeout (Fallback if load event is unreliable)
    // setTimeout(() => {
    //   if (newWindow && !newWindow.closed) {
    //     newWindow.document.title = customTitle;
    //   }
    // }, 500); 
  }
};


const checkForChatMessages = () => {
  return firebase.database()
    .ref(`chat/messages/${id2}/${name2}/${id}/${name1}`)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Chat messages exist");
        return true;
      } else {
        console.log("No chat messages");
        return false;
      }
    })
    .catch((error) => {
      console.log("Error checking chat messages:", error);
      return false;
    });
};

const handleChatDelete = () => {
  //alert("handleChatDelete")
  console.log("handleChatDelete(), id2="+id2)
  console.log("handleChatDelete(), name2="+name2)
  console.log("handleChatDelete(), id="+id)
  console.log("handleChatDelete(), name1="+name1)

   try {
    const confirmation = window.prompt(
      "To delete this chat with "+name2+", type exactly: delete chat",
    );

    if (confirmation !== "delete chat") {
      alert("Chat was not deleted.");
      return;
    }

    // Put your Firebase deletion code here
    console.log("calling the database to delete the chat from the firebase realtime database");
    firebase.database().ref(`chat/messages/${id2}/${name2}/${id}/${name1}`)
      .remove()
      .then(() => {
        alert("The chat with "+name2+" is removed.")
        window.location.reload();
        console.log("Chat removed");
      })
      .catch((error) => {
        alert("The chat with "+name2+" was not removed.")
        
        console.log("Error removing chat:", error);
      });
   } catch(error) {
    console.log("handleChatDelete error. error="+error)
   }

}


  const handleChat = (props) => {
    try {
      //id2,id //id2 is loggedin user, id is subpage
      //window.open(`/chat/${id2}/${name2}/${id}/${name1}/3`) //names are hard coded because i am not passing them in the url yet
      
    openNewTabWithCustomTitleType(`/chat/${id2}/${name2}/${id}/${name1}/?ni=3&chatsetting=2`, "_blank", "urilinks-chat" )

//window.open(`/chat/${id2}/${name2}/${id}/${name1}/?ni=3&chatsetting=2`)
      
      
     
    } catch (err) {
      console.error('Failed to Start Chat:', err);
    }
  };

  return (
    <div className="margin-left-11 margin-top-1">
    <button 
    className={`ib pointereventsnone- button-2b padding-top-and-bottom ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    title="Press to 'Start Chat.'"
    onClick={handleChat}>
    Start Chat with {name1}
    </button>
    {showDeleteChatButton && 
     <button 
    className={`ib margin-left-11 pointereventsnone- button-2b padding-top-and-bottom ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    title={`Delete Chat with ${name1}`}
    
    onClick={()=>handleChatDelete()}>
    Delete Chat with {name1}
    </button>
}
    </div>
  );
};

//export default FollowButton;
// const mapStateToProps = (state) => ({
  
//   gud: state.gud,
  
//});//
export default ChatButton
//export default connect(mapStateToProps, undefined)(ChatButton);