import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import { connect } from "react-redux";

import {
  withRouter,
} from "react-router-dom";

import {
  setTextFilter,
  sortByHashTag,
} from "../actions/filters";

import InfiniteScrollNewHashtags
  from "./InfiniteScrollNewHashtags-latest-search-not-automatically-activating";


export const SeeHashTagsPage = (
  props
) => {

  const [
    uniqueData,
    setUniqueData,
  ] = useState([]);


  const scrollInterval4 =
    useRef(null);

  const buttonRef4 =
    useRef(null);

  const scrolldownref8 =
    useRef(null);

  const scrollupref8 =
    useRef(null);


  /*
   * Redux now already contains one
   * object for each hashtag:
   *
   * {
   *   matchesstring: "#travel",
   *   count: 3
   * }
   */
  useEffect(() => {

    console.log(
      "SeeHashTagsPage props.hashtags=",
      JSON.stringify(
        props.hashtags
      )
    );


    if (
      !Array.isArray(
        props.hashtags
      )
    ) {

      setUniqueData([]);

      return;

    }


    const hashtags =
      [...props.hashtags];


    /*
     * Alphabetical order.
     */
    hashtags.sort(
      (a, b) => {

        const valA =
          (
            a.matchesstring ||
            ""
          ).toLowerCase();


        const valB =
          (
            b.matchesstring ||
            ""
          ).toLowerCase();


        if (valA < valB) {
          return -1;
        }


        if (valA > valB) {
          return 1;
        }


        return 0;

      }
    );


    setUniqueData(
      hashtags
    );


  }, [props.hashtags]);


  const handleClick = (
    event
  ) => {

    const clickedElement =
      event.target;


    const listItem =
      clickedElement.closest(
        "[data-item-id]"
      );


    if (!listItem) {
      return;
    }


    const itemId =
      listItem.dataset.itemId;


    if (itemId) {

      const termElement =
        window.document.getElementById(
          "termid"
        );


      if (termElement) {

        termElement.value =
          itemId;

      }


      props.changeSortBy(
        "hashtag",
        1
      );


      props.setTextFilter(
        itemId
      );


      props.sortByHashTag();

    }

  };


  const startScrollingUp4 =
    () => {

      if (
        buttonRef4.current
      ) {

        buttonRef4.current.click();

      }


      if (
        scrollInterval4.current
      ) {

        return;

      }


      scrollInterval4.current =
        setInterval(
          () => {

            const element =
              document.getElementById(
                "ls3"
              );


            if (!element) {
              return;
            }


            element.scrollBy({

              top: 1,

              left: 0,

              behavior: "auto",

            });


            if (
              element.scrollTop +
                element.clientHeight >=
              element.scrollHeight -
                2
            ) {

              if (
                buttonRef4.current
              ) {

                buttonRef4.current.click();

              }


              if (
                scrolldownref8.current
              ) {

                scrolldownref8.current.click();

              }

            }

          },
          40
        );

    };


  const stopScrolling4 =
    () => {

      clearInterval(
        scrollInterval4.current
      );


      scrollInterval4.current =
        null;

    };


  const startScrollingDown4 =
    () => {

      if (
        buttonRef4.current
      ) {

        buttonRef4.current.click();

      }


      if (
        scrollInterval4.current
      ) {

        return;

      }


      scrollInterval4.current =
        setInterval(
          () => {

            const element =
              document.getElementById(
                "ls3"
              );


            if (!element) {
              return;
            }


            element.scrollBy({

              top: -1,

              left: 0,

              behavior: "auto",

            });


            if (
              element.scrollTop <=
              2
            ) {

              if (
                buttonRef4.current
              ) {

                buttonRef4.current.click();

              }


              if (
                scrollupref8.current
              ) {

                scrollupref8.current.click();

              }

            }

          },
          40
        );

    };


  useEffect(() => {

    return () => {

      if (
        scrollInterval4.current
      ) {

        clearInterval(
          scrollInterval4.current
        );

      }

    };

  }, []);


  const isMobile = () => {

    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;


    return regex.test(
      navigator.userAgent
    );

  };


  return (

    <div
      className=
        "position-absolute z-index99 opaque100"
    >

      <InfiniteScrollNewHashtags
        uid={
          props.auth.uid
        }
      />


      <div
        className=
          "margin-top-1- margin-left-11"
      >

        <div
          className=
            "page-header-2"
        >

          <div
            className=
              "content-container"
          >

            <h2
              className=
                "page-header__title borderRadius55"
            >

              <span
                className=
                  "color-purple color-black-2"
              >

                Hashtags

              </span>

            </h2>

          </div>

        </div>


        <div>

          <div
            className=
              "margin-left-11- margin-bottom-1 margin-top-1"

            style={{
              position:
                "sticky",

              top: 0,
            }}
          >

            <button
              ref={
                scrollupref8
              }

              title=
                "Click the button to begin auto scroll."

              onClick={
                startScrollingUp4
              }

              className=
                "button-2 widthxpx1"
            >

              <span>
                ScrollUp
              </span>

            </button>


            <button
              ref={
                buttonRef4
              }

              title=
                "Click the button to stop auto scroll."

              onClick={
                stopScrolling4
              }

              className=
                "button-2 ib margin-left-11"
            >

              <span>
                Stop
              </span>

            </button>


            <button
              ref={
                scrolldownref8
              }

              title=
                "Click the button to begin auto scroll."

              onClick={
                startScrollingDown4
              }

              className=
                "button-2 ib margin-left-11 widthxpx1"
            >

              <span>
                ScrollDn
              </span>

            </button>


            <button
              className={`button-2 ib ${
                isMobile() ===
                false
                  ? "margin-left-11"
                  : "margin-top-1"
              } widthxpx1`}

              onClick={
                props.handleClose3
              }
            >

              Close

            </button>

          </div>

        </div>


        {uniqueData.length}

        {`${
          uniqueData.length === 1
            ? " hashtag"
            : " hashtags"
        }`}


        <div
          id="ls3"

          className={`content-containerht ${
            isMobile() === true
              ? "widthhashtagcolumn"
              : "widthx1"
          } borderLightOrange padding-bottom-1`}

          style={{

            //width: "100%",
            width:"400px",

            height: "400px",

            overflowY:
              "scroll",

            overflowX:
              "hidden",

            boxSizing:
              "border-box",

          }}
        >

          <ul
            className=
              "liststylenone cursor-pointer"

            onClick={
              handleClick
            }
          >

            {uniqueData.map(
              (
                item,
                index
              ) =>

                !!item &&
                !!item.matchesstring && (

                  <li
                    key={
                      index
                    }

                    data-item-id={
                      item.matchesstring
                    }
                  >

                    {
                      item.matchesstring
                    }

                    {" ("}

                    {
                      item.count
                    }

                    {")"}

                  </li>

                )

            )}

          </ul>

        </div>

      </div>

    </div>

  );

};


const mapStateToProps = (
  state
) => ({

  hashtags:
    state.hashtags,

  auth:
    state.auth,

});


const mapDispatchToProps = (
  dispatch
) => ({

  setTextFilter: (
    text
  ) =>
    dispatch(
      setTextFilter(
        text
      )
    ),

  sortByHashTag: () =>
    dispatch(
      sortByHashTag()
    ),

});


export default withRouter(

  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    SeeHashTagsPage
  )

);