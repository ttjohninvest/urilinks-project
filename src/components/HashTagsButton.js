import React, { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SeeHashTagsPage from "./SeeHashTagsPage";

import {
  incrementHashtagsIsOpenClickCount,
  decrementHashtagsIsOpenClickCount,
} from "../actions/thehashtagsisopen";

const HashTagsButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    return regex.test(navigator.userAgent);
  };

  const storeScrollPosition4 = (hashtagsisopen) => {
    let x1 = 0;

    if (
      hashtagsisopen === undefined ||
      hashtagsisopen === null ||
      hashtagsisopen === "NaN"
    ) {
      x1 = 0;
    } else {
      x1 = hashtagsisopen;
    }

    if (x1 === 0) {
      props.incrementHashtagsIsOpenClickCount({
        hashtagsisopen: 0,
      });
    } else {
      props.decrementHashtagsIsOpenClickCount({
        hashtagsisopen: 1,
      });
    }

    window.localStorage.setItem("scrollPosition", window.scrollY);
  };

  const handleClose = () => {
    storeScrollPosition4(props.thehashtagsisopen.hashtagsisopen);

    setIsDisplayed(false);
  };

  const handleDisplay = () => {
    try {
      storeScrollPosition4(props.thehashtagsisopen.hashtagsisopen);

      //setIsDisplayed(true);
      props.setOpenHt(true)
    } catch (err) {
      console.error("Failed to display:", err);
    }
  };

  return (
    <div
      style={{
        display: "inline",
      }}
    >
      <button
        className={`margin-left-11 height48- button-2w- button-2 ib ${
          isMobile() === false ? "" : "width295 margin-top-1"
        }`}
        onClick={handleDisplay}
      >
        {isDisplayed ? "Displayed" : "See Hashtags"}
      </button>

      {/* {isDisplayed === true && (
        <div>
          <SeeHashTagsPage
            elementRef2={props.elementRef2}
            changeSortBy={props.changeSortBy}
            handleClose3={handleClose}
            search={props.search}
          />
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  thehashtagsisopen: state.thehashtagsisopen,

  signup: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
  incrementHashtagsIsOpenClickCount: (data) =>
    dispatch(incrementHashtagsIsOpenClickCount(data)),

  decrementHashtagsIsOpenClickCount: (data) =>
    dispatch(decrementHashtagsIsOpenClickCount(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HashTagsButton),
);
