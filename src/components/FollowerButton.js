import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SeeFollowerPage from "./SeeFollowerPage";

import {
  incrementOthersIsOpenClickCount,
  decrementOthersIsOpenClickCount,
} from "../actions/theothersisopen";

const FollowerButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const storeScrollPosition4 = (othersisopen, event) => {
      
  
      let x1 = 0;
      if (othersisopen === undefined || othersisopen === null || othersisopen === "NaN") x1 = 0;
      else x1 = othersisopen;
      //const x = event.target.getAttribute("data-value"); //x is link id
  
      if (x1 === 0) {
        //alert("going to increment")
        //props.incrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 0 });
        props.incrementOthersIsOpenClickCount({ othersisopen: 0 });
      } else {
        //alert("going to decrement")
        //props.decrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 1 });
        props.decrementOthersIsOpenClickCount({ othersisopen: 1 });
      }
  
      window.localStorage.setItem("scrollPosition", window.scrollY);
    };

  const handleClose = () => {
    storeScrollPosition4(props.theothersisopen.othersisopen)
    setIsDisplayed(false);
  };

  

  const handleDisplay = () => {
    try {
      storeScrollPosition4(props.theothersisopen.othersisopen, event)
      setIsDisplayed(true);
    } catch (err) {
      console.error("Failed to display:", err);
    }
  };



  return (
    <div style={{ display: "inline" }}>
      <button
        title="See the ones that are following you."
        className={`margin-left-11 height48 button-2w- button-2 ib ${isMobile() === false ? "" : "width295 margin-top-1"}`}
        onClick={handleDisplay}
      >
        {isDisplayed ? "Displayed" : "Followers"}
      </button>
      {isDisplayed === true && (
        <div>
          <SeeFollowerPage
            whichone = {2}
            email={props.email}
            uid={props.uid}
            elementRef2 = {props.elementRef2}
            changeSortBy={()=>props.changeSortBy("follower",1)}
            handleClose3={() => handleClose()}
          />
        </div>
      )}
    </div>
  );
};

//export default HashTagsButton;

const mapStateToProps = (state) => ({
  theothersisopen: state.theothersisopen,
  signup: state.signup,

  
});

const mapDispatchToProps = (dispatch, props) => ({
  incrementOthersIsOpenClickCount: (data) =>
    dispatch(incrementOthersIsOpenClickCount(data)),
  decrementOthersIsOpenClickCount: (data) =>
    dispatch(decrementOthersIsOpenClickCount(data)),
  
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FollowerButton),
);
