import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setTextFilter, sortByHashTag } from "../actions/filters";

export const SeeHashTagsPage = (props) => {
  //const [count, setCount] = useState(0);
  const [uniqueData, setUniqueData] = useState([]);

  const scrollInterval4 = useRef(null);
  const buttonRef4 = useRef(null);

  useEffect(() => {
    console.log(
      "SeeHashTagsPage.js, hashtags=" + JSON.stringify(props.hashtags),
    );
  });

  useEffect(() => {
    const uniqueData2 = props.hashtags.filter((value, index, array) => {
      // Returns the first index where the name matches
      const firstIndex = array.findIndex(
        (item) => item.matchesstring === value.matchesstring,
      );
      // Keep the item only if it is the first occurrence
      return firstIndex === index;
    });

    uniqueData2.sort((a, b) => {
      const valA = a.matchesstring.toLowerCase();
      const valB = b.matchesstring.toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    uniqueData2.forEach((e) => {
      console.log("DisplayHashtags.js, hashtag=" + e.matchesstring);
    });

    setUniqueData(uniqueData2);
    //console.log("DisplayHashtags.js, uniqueData="+JSON.stringify(uniqueData))
  }, []);

  const handleClick = () => {
    // Identify the clicked element
    const clickedElement = event.target;

    // Extract data from data attributes
    const itemId = clickedElement.dataset.itemId;

    if (itemId) {
      window.document.getElementById("termid").value = itemId;

      //alert("props.changeSortBy")
      props.changeSortBy("hashtag");
      //props.changeSortBy();

      props.setTextFilter(itemId);

      props.sortByHashTag();

      // const selectElement = document.getElementById('mode');
      // selectElement.value = 'hashtag';
      // selectElement.click()

      //alert(`Clicked item with ID: ${itemId}`)
      console.log(`Clicked item with ID: ${itemId}`);
      // Add your logic here, e.g., update state
    }
  };

  const startScrollingUp4 = () => {
    // Prevent multiple intervals
    if (scrollInterval4.current) return;

    scrollInterval4.current = setInterval(() => {
      document.getElementById("ls3").scrollBy({
        top: 1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      if (
        document.getElementById("ls3").scrollTop +
          document.getElementById("ls3").clientHeight >=
        document.getElementById("ls3").scrollHeight
      ) {
        buttonRef4.current.click();
      }
    }, 20); // Every 20 milliseconds
  };

  const stopScrolling4 = () => {
    clearInterval(scrollInterval4.current);
    scrollInterval4.current = null;
  };

  const startScrollingDown4 = () => {
    // Prevent multiple intervals
    if (scrollInterval4.current) return;

    scrollInterval4.current = setInterval(() => {
      document.getElementById("ls3").scrollBy({
        top: -1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      // Stop automatically when reaching the top
      if (document.getElementById("ls3").scrollTop === 0) {
        buttonRef4.current.click();

        //stopScrolling();
      }
    }, 20); // Every 20 milliseconds
  };

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  return (
    <div>
      <div className="margin-top-1 margin-left-11">
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title borderRadius55 padding-bottom-5z1-">
              <span className="color-purple color-black-2">Hashtags</span>
              {/* <button
                className="ib margin-left-11 button-2 text-size-1"
                onClick={() => props.handleClose3()}
              >
                Close
              </button> */}
            </h1>
          </div>
        </div>
        <div>
          <div className="margin-left-11- margin-bottom-1 margin-top-1">
            <button
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
              title="Click the button to begin auto scroll."
              onClick={startScrollingDown4}
              className="button-2 ib margin-left-11 widthxpx1"
            >
              <span>ScrollDn</span>
            </button>
             <button
                className={`button-2 ib ${isMobile()===false?'margin-left-11':'margin-top-1'} widthxpx1`}
                onClick={() => props.handleClose3()}
              >
                Close
              </button>
          </div>
        </div>
        {uniqueData.length} results
        <div
          id="ls3"
          className={`content-containerht ${
            
            isMobile()===true
            ?'widthhashtagcolumn':'widthx1'} heightx1 overflowyauto borderLightOrange overflowxhidden`}
        >
          <ul className="liststylenone cursor-pointer" onClick={handleClick}>
            {uniqueData.map(
              (item, index) =>
                !!item.matchesstring && (
                  <li key={index} key={index} data-item-id={item.matchesstring}>
                    {item.matchesstring}
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hashtags: state.hashtags,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByHashTag: () => dispatch(sortByHashTag()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SeeHashTagsPage),
);
