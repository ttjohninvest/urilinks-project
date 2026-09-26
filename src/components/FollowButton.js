import React, { useState } from 'react';
import { connect } from "react-redux";

const FollowButton = (props) => {
  const [isFollowed, setIsFollowed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const id2 = params.get("id2");


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleFollow = async () => {
    try {
      alert(id+", "+id2)
      setIsFollowed(true);
      setTimeout(() => setIsFollowed(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to Follow:', err);
    }
  };

  return (
    <div className="margin-left-11-">
    <button 
    className={`ib height48 button-2w ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    onClick={handleFollow}>
      {/* {isCopied ? 'URL Copied' : 'Copy Sharable URL to Your Page.'} */}
      {/* {`${isCopied?"URL Copied":"Copy Sharable Url for "+props.accountpagename+"'s Page"}`} */}
      {/* {`${isCopied?"URL Copied":(props.readonly)?"Copy Sharable Url to reshare "+props.accountpagename+"'s Page":"Copy Your Sharable Url." }`} */}
    {`${isFollowed?"Followed":(props.readonly)?"Follow":"Follow" }`}
    </button>
    </div>
  );
};

//export default FollowButton;
// const mapStateToProps = (state) => ({
  
//   auth: state.auth,
  
// });
export default connect(undefined, undefined)(FollowButton);