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

     const theemail = decrypt(z10, "125434") 
     const theemail2 = decrypt(z12, "125434") 


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleFollow = () => {
    try {
      //alert(props.gud.gud.email)
      console.log("before call to startAddFollower="+id+", "+id2)
      if(isFollowed === false) { //so can not press multiple times, protects db from duplicates being stored
     
      startAddFollower(id2,id,{email:theemail},{email:theemail2}) //id is the one being followed
     
      console.log("after call to startAddFollower="+id+", "+id2)
      setIsFollowed(true);
      //setTimeout(() => setIsFollowed(false), 2000); // Reset after 2 seconds
      }
    } catch (err) {
      console.error('Failed to Follow:', err);
    }
  };

  return (
    <div className="margin-left-11- margin-top-1">
    <button 
    className={`ib pointereventsnone- height48 button-2w ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    onClick={handleFollow}>
      {/* {isCopied ? 'URL Copied' : 'Copy Sharable URL to Your Page.'} */}
      {/* {`${isCopied?"URL Copied":"Copy Sharable Url for "+props.accountpagename+"'s Page"}`} */}
      {/* {`${isCopied?"URL Copied":(props.readonly)?"Copy Sharable Url to reshare "+props.accountpagename+"'s Page":"Copy Your Sharable Url." }`} */}
    {/* {`${isFollowed?"Followed":(props.readonly)?"Follow":"Follow" }`} */}
    {`${isFollowed?"Followed":"Follow" }`}
    </button>
    </div>
  );
};

//export default FollowButton;
const mapStateToProps = (state) => ({
  
  gud: state.gud,
  
});//
export default connect(mapStateToProps, undefined)(FollowButton);