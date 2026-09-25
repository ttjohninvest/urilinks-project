import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import Draggable from 'react-draggable';

import { setTextFilter, sortByOthers } from "../actions/filters";

export const SeeOthersPage = (props) => {
  //const [count, setCount] = useState(0);
  const [uniqueData, setUniqueData] = useState([]);

  const scrollInterval4 = useRef(null);
  const buttonRef4 = useRef(null);
  const scrolldownref8 = useRef(null);
  const scrollupref8 = useRef(null);
  //const [nodeRef, setNodeRef] = useState(null);

  useEffect(() => {
    console.log("SeeOthersPage.js, users=" + JSON.stringify(props.users));
  });

  //   const removeDuplicates = (stringArray) => {
  //   const stringifiedArray = stringArray.join(" ");
  //   const lcstring = stringifiedArray;
  //   const lcStringArray = lcstring.split(" ");
  //   return [...new Set(lcStringArray)];
  // };

  useEffect(() => {

     const array3 = props.users.sort((a, b) => {
      const valA = a.gud.displayname.toLowerCase();
      const valB = b.gud.displayname.toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    })

    //console.log("setUniqueData, props.users=" + JSON.stringify(props.users));
    console.log("setUniqueData, props.users=" + JSON.stringify(array3));
    //setUniqueData(props.users);
    setUniqueData(array3);
  }, []);

  


  const otherPage = (id,dn,purl,email) => {
    console.log("otherPage, id=" + id);
    console.log("otherPage, purl="+purl)

    window.open(
      "https://urilinks.com/dashboard?signup=0&x=readonly&id=" + id +"&dn="+dn+"&purl="+purl+"&z10="+email,
      "_blank",
    );
  };

  function encrypt(text, key) {
    return [...text].map((x, i) => 
        (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
        .toString(16)
        .padStart(2, "0")
    ).join('');
}

  const handleClick = () => {
    // Identify the clicked element
    const clickedElement = event.target;

    // Extract data from data attributes
    const itemId = clickedElement.dataset.itemId;
    const array3 = itemId.split(";")
    console.log("handleClick, itemId=" + itemId);
    console.log("handleClick, process.env.REACT_APP_EKEY="+process.env.REACT_APP_EKEY)
    const email = encrypt(array3[3], process.env.REACT_APP_EKEY) //"125434")

    if (array3[0]) {
      otherPage(array3[0], array3[1], array3[2], email);
    }

    // props.changeSortBy("others",1);

    // props.setTextFilter("");

    // props.sortByOthers(); 
  };

  const startScrollingUp4 = () => {
    buttonRef4.current.click();
    // Prevent multiple intervals
    if (scrollInterval4.current) return;

    scrollInterval4.current = setInterval(() => {
      document.getElementById("ls3").scrollBy({
        top: 1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      if (!!document.getElementById("ls3") === true)
        if (
          document.getElementById("ls3").scrollTop +
            document.getElementById("ls3").clientHeight >=
          (document.getElementById("ls3").scrollHeight - 2 ||
            document.getElementById("ls3").scrollHeight + 2)
        ) {
          buttonRef4.current.click();
          if (!!scrolldownref8 === true) scrolldownref8.current.click();
        }
    }, 40); // Every 20 milliseconds
  };

  const stopScrolling4 = () => {
    clearInterval(scrollInterval4.current);
    scrollInterval4.current = null;
  };

  const startScrollingDown4 = () => {
    buttonRef4.current.click();
    // Prevent multiple intervals
    if (scrollInterval4.current) return;

    scrollInterval4.current = setInterval(() => {
      document.getElementById("ls3").scrollBy({
        top: -1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      // Stop automatically when reaching the top
      if (!!document.getElementById("ls3") === true)
        if (
          document.getElementById("ls3").scrollTop === 0 ||
          document.getElementById("ls3").scrollTop <= 2
        ) {
          buttonRef4.current.click();
          if (!!scrollupref8 === true) scrollupref8.current.click();

          //stopScrolling();
        }
    }, 40); // Every 20 milliseconds
  };

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  return (
    // <Draggable nodeRef={nodeRef}>
    <div
      //ref={setNodeRef}
      className="position-absolute z-index99 opaque100"
    >
      <div className="margin-top-1- margin-left-11">
        <div className="page-header-2">
          <div className="content-container">
            <h2 className="page-header__title borderRadius55">
              <span className="color-purple color-black-2">Users</span>
            </h2>
          </div>
        </div>
        <div>
          <div
            className="margin-left-11- margin-bottom-1 margin-top-1"
            style={{ position: "sticky", top: 0 }}
          >
            <button
              ref={scrollupref8}
              title="Click the button to begin auto scroll."
              onClick={startScrollingUp4}
              className="button-2 widthxpx1"
            >
              <span>ScrollUp</span>
            </button>

            <button
              ref={buttonRef4}
              title="Click the button to stop auto scroll."
              onClick={stopScrolling4}
              className="button-2 ib margin-left-11"
            >
              <span>Stop</span>
            </button>

            <button
              ref={scrolldownref8}
              title="Click the button to begin auto scroll."
              onClick={startScrollingDown4}
              className="button-2 ib margin-left-11 widthxpx1"
            >
              <span>ScrollDn</span>
            </button>
            <button
              className={`button-2 ib ${isMobile() === false ? "margin-left-11" : "margin-top-1"} widthxpx1`}
              onClick={() => props.handleClose3()}
            >
              Close
            </button>
          </div>
        </div>
        {uniqueData.length-1}
        {`${(uniqueData.length-1) > 1 ? " others" : uniqueData.length === 1 ? " others" : " others"}`}
        <div
          id="ls3"
          className={`content-containerht ${
            isMobile() === true ? "widthhashtagcolumn" : "widthx1"
          } heightx1 overflowyauto borderLightOrange overflowxhidden padding-bottom-1`}
        >
          <ul className="liststylenone cursor-pointer" onClick={handleClick}>
            {uniqueData.map((item, index) => {
              if (props.auth.uid !== item.gud.uid) {
                return (
                  <li key={index} data-item-id={item.gud.uid+";"+item.gud.displayname+";"+item.gud.photourl+";"+item.gud.email}>
                    { item.gud.displayname + ", " + item.gud.theatname}
                  </li>
                )
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    </div>
    // </Draggable>
  );
};

const mapStateToProps = (state) => ({
  //hashtags: state.hashtags,
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByOthers: () => dispatch(sortByOthers()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SeeOthersPage),
);
