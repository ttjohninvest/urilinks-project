import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SeeHashTagsPage from "./SeeHashTagsPage";

import {
  incrementHashtagsIsOpenClickCount,
  decrementHashtagsIsOpenClickCount,
} from "../actions/thehashtagsisopen";

const HashTagsButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const storeScrollPosition4 = (hashtagsisopen, event) => {
      
  
      let x1 = 0;
      if (hashtagsisopen === undefined || hashtagsisopen === null || hashtagsisopen === "NaN") x1 = 0;
      else x1 = hashtagsisopen;
      //const x = event.target.getAttribute("data-value"); //x is link id
  
      if (x1 === 0) {
        //alert("going to increment")
        //props.incrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 0 });
        props.incrementHashtagsIsOpenClickCount({ hashtagsisopen: 0 });
      } else {
        //alert("going to decrement")
        //props.decrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 1 });
        props.decrementHashtagsIsOpenClickCount({ hashtagsisopen: 1 });
      }
  
      window.localStorage.setItem("scrollPosition", window.scrollY);
    };

  const handleClose = () => {
    storeScrollPosition4(props.thehashtagsisopen.hashtagsisopen)
    setIsDisplayed(false);
  };

  

  const handleDisplay = () => {
    try {
      storeScrollPosition4(props.hashtagsisopen, event)
      setIsDisplayed(true);
    } catch (err) {
      console.error("Failed to display:", err);
    }
  };



  return (
    <div style={{ display: "inline" }}>
      <button
        className={`margin-left-11 height48 button-2w- button-2 ib ${isMobile() === false ? "" : "width295 margin-top-1"}`}
        onClick={handleDisplay}
      >
        {isDisplayed ? "Displayed" : "See HashTags"}
      </button>
      {isDisplayed === true && (
        <div>
          <SeeHashTagsPage
            elementRef2 = {props.elementRef2}
            changeSortBy={()=>props.changeSortBy("hashtag")}
            handleClose3={() => handleClose()}
          />
        </div>
      )}
    </div>
  );
};

//export default HashTagsButton;

const mapStateToProps = (state) => ({
  thehashtagsisopen: state.thehashtagsisopen,
  signup: state.signup,

  
});

const mapDispatchToProps = (dispatch, props) => ({
  incrementHashtagsIsOpenClickCount: (data) =>
    dispatch(incrementHashtagsIsOpenClickCount(data)),
  decrementHashtagsIsOpenClickCount: (data) =>
    dispatch(decrementHashtagsIsOpenClickCount(data)),
  
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HashTagsButton),
);
