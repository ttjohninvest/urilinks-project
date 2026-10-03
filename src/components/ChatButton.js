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

const FollowButton = (props) => {
  const [isFollowed, setIsFollowed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const id2 = params.get("id2");
     const z10 = params.get("z10");
     const z12 = params.get("z12");
     const isFollowing = params.get("isFollowing");
    
     console.log("FollowButton, isFollowing="+isFollowing)


     let theemail
     let theemail2 

     if(!!z10 && !!z12) {
       theemail = decrypt(z10, "125434") 
       theemail2 = decrypt(z12, "125434") 
     } else {
       theemail = ""
       theemail2 = ""
     }
     


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleChat = () => {
    try {
      //id2,id //id2 is loggedin user, id is subpage
      window.open("/chat")
      
     
    } catch (err) {
      console.error('Failed to Start Chat:', err);
    }
  };

  return (
    <div className="margin-left-11- margin-top-1">
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
const mapStateToProps = (state) => ({
  
  gud: state.gud,
  
});//
export default connect(mapStateToProps, undefined)(FollowButton);