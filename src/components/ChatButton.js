import React, { useState } from 'react';
import { connect } from "react-redux";
import { startAddFollower } from "../actions/following";


function decrypt(text, key) {
    if(text === null) return null
    return String.fromCharCode(...text.match(/.{1,2}/g)
        .map((e, i) => 
            parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    );
}

const ChatButton = (props) => {
    const params = new URLSearchParams(window.location.search);
    const id2 = props.id2 //params.get("id");
    const id = props.id //params.get("id2");
    const name2 = props.name2
    const name1 = props.name1
  
     console.log("ChatButton, id2="+id2)
     console.log("ChatButton, id="+id)


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleChat = (props) => {
    try {
      //id2,id //id2 is loggedin user, id is subpage
      window.open(`/chat/${id2}/${name2}/${id}/${name1}`) //names are hard coded because i am not passing them in the url yet
      
     
    } catch (err) {
      console.error('Failed to Start Chat:', err);
    }
  };

  return (
    <div className="margin-left-11 margin-top-1">
    <button 
    className={`ib pointereventsnone- height48 button-2w ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    title="Press to follow."
    onClick={handleChat}>
    Chat
    </button>
    </div>
  );
};

//export default FollowButton;
// const mapStateToProps = (state) => ({
  
//   gud: state.gud,
  
//});//
export default ChatButton
//export default connect(mapStateToProps, undefined)(ChatButton);