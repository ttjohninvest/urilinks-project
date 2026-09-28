import React, { useState } from 'react';
import { connect } from "react-redux";
import { getFollowerEmail } from "../actions/email";
import SendEmailPage from './SendEmailPage';



function decrypt(text, key) {
    if(text === null) return null
    return String.fromCharCode(...text.match(/.{1,2}/g)
        .map((e, i) => 
            parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    );
}

const EmailButton = (props) => {
  const [isEmailed, setIsEmailed] = useState(false);
  const [send, setSend] = useState(false)
  //const textToCopy = "text being copied to the clipboard";
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const id2 = params.get("id2");
    const z10 = params.get("z10");
    //  const z12 = params.get("z12");
     //const isEmailing = params.get("isEmailing");
    
     //console.log("EmailButton, isEmailing="+isEmailing)


    //  const theemail = decrypt(z10, "125434") 
    //  const theemail2 = decrypt(z12, "125434") 


    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleEmail = () => {
    try {
        //getFollowerEmail(id2,id)
        //setSend(true)
        window.open("/openemailform?z10="+z10,"_blank")
    
    } catch (err) {
      console.error('Failed to Email:', err);
    }
  };

  return (
    <div className="margin-left-11 margin-top-1">
    {send === false ? <button 
    className={`ib pointereventsnone- height48 button-2w ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    onClick={handleEmail}>
      {/* {isCopied ? 'URL Copied' : 'Copy Sharable URL to Your Page.'} */}
      {/* {`${isCopied?"URL Copied":"Copy Sharable Url for "+props.accountpagename+"'s Page"}`} */}
      {/* {`${isCopied?"URL Copied":(props.readonly)?"Copy Sharable Url to reshare "+props.accountpagename+"'s Page":"Copy Your Sharable Url." }`} */}
    {/* {`${isFollowed?"Followed":(props.readonly)?"Follow":"Follow" }`} */}
    {`${isEmailed ?"Emailed":"Email" }`}
    </button>: <div></div>
    
    // <SendEmailPage
    //                             sharablelink=""
    //                             uid={id2}
    //                             isFormOpen={false} //{isFormOpen}
    //                             handleClose={()=>{}} //{handleClose}
    // />
    
    }
    </div>
  );
};

//export default FollowButton;
const mapStateToProps = (state) => ({
  
  gud: state.gud,
  
});//
export default connect(mapStateToProps, undefined)(EmailButton);