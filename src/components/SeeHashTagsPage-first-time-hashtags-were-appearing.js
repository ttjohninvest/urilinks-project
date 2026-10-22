import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  setTextFilter,
  sortByHashTag,
} from "../actions/filters";

import InfiniteScrollNewHashtags
  from "./InfiniteScrollNewHashtags-first time hashtags were appearing";


export const SeeHashTagsPage = (
  props,
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
   * This ref will hold the load-more function from
   * InfiniteScrollNewHashtags.
   */
  const loadMoreHashtagsRef =
    useRef(null);


  /*
   * Every time InfiniteScrollNewHashtags updates
   * Redux props.hashtags, rebuild the displayed list.
   */
  useEffect(() => {
    console.log(
      "SeeHashTagsPage props.hashtags=",
      JSON.stringify(
        props.hashtags,
      ),
    );


    if (
      !Array.isArray(
        props.hashtags,
      )
    ) {
      setUniqueData([]);

      return;
    }


    let htsArray2 = [];


    props.hashtags.forEach(
      (obj) => {
        if (!obj) {
          return;
        }


        /*
         * Your old data uses matchesstring.
         *
         * description is included as a fallback.
         */
        const hashtagString =
          obj.matchesstring ||
          obj.description ||
          "";


        if (
          typeof hashtagString !==
          "string"
        ) {
          return;
        }


        /*
         * A matchesstring can contain more than one
         * hashtag.
         */
        const foundHashtags =
          hashtagString.match(
            /#\w+/g,
          ) || [];


        htsArray2.push(
          ...foundHashtags,
        );
      },
    );


    /*
     * Sort alphabetically.
     */
    htsArray2.sort((a, b) => {
      const valA =
        a.toLowerCase();

      const valB =
        b.toLowerCase();


      if (valA < valB) {
        return -1;
      }

      if (valA > valB) {
        return 1;
      }

      return 0;
    });


    /*
     * Remove duplicate hashtags.
     */
    const uniqueHashtags = [
      ...new Set(htsArray2),
    ];


    console.log(
      "SeeHashTagsPage uniqueHashtags=",
      JSON.stringify(
        uniqueHashtags,
      ),
    );


    setUniqueData(
      uniqueHashtags,
    );

  }, [props.hashtags]);


  /*
   * IMPORTANT:
   *
   * If the first 10 hashtags do not make #ls3 tall
   * enough to scroll, there would be no scroll event.
   *
   * Therefore after the displayed hashtags change,
   * check whether #ls3 needs another page.
   */
  useEffect(() => {
    const timer = setTimeout(
      () => {
        const element =
          document.getElementById(
            "ls3",
          );


        if (!element) {
          return;
        }


        console.log(
          "ls3 clientHeight=",
          element.clientHeight,
        );

        console.log(
          "ls3 scrollHeight=",
          element.scrollHeight,
        );


        /*
         * No scrollbar yet.
         *
         * Ask InfiniteScrollNewHashtags for another
         * Firebase page.
         */
        if (
          element.scrollHeight <=
            element.clientHeight +
              2 &&
          loadMoreHashtagsRef.current
        ) {
          console.log(
            "ls3 not full - loading another hashtag page",
          );

          loadMoreHashtagsRef.current();
        }
      },
      50,
    );


    return () => {
      clearTimeout(timer);
    };

  }, [uniqueData]);


  /*
   * Called whenever the user scrolls #ls3.
   */
  const handleHashtagScroll = (
    event,
  ) => {
    const element =
      event.currentTarget;


    const nearBottom =
      element.scrollTop +
        element.clientHeight >=
      element.scrollHeight - 20;


    if (nearBottom) {
      console.log(
        "Hashtag list reached bottom",
      );


      if (
        loadMoreHashtagsRef.current
      ) {
        loadMoreHashtagsRef.current();
      }
    }
  };


  const handleClick = (
    event,
  ) => {
    const clickedElement =
      event.target;


    const itemId =
      clickedElement.dataset.itemId;


    if (itemId) {
      const termElement =
        window.document.getElementById(
          "termid",
        );


      if (termElement) {
        termElement.value =
          itemId;
      }


      props.changeSortBy(
        "hashtag",
        1,
      );


      props.setTextFilter(
        itemId,
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
        setInterval(() => {
          const element =
            document.getElementById(
              "ls3",
            );


          if (!element) {
            return;
          }


          element.scrollBy({
            top: 1,
            left: 0,
            behavior: "auto",
          });


          /*
           * Auto-scroll reached bottom.
           */
          if (
            element.scrollTop +
              element.clientHeight >=
            element.scrollHeight -
              2
          ) {
            /*
             * First request another hashtag page.
             */
            if (
              loadMoreHashtagsRef.current
            ) {
              loadMoreHashtagsRef.current();
            }


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
        }, 40);
    };


  const stopScrolling4 = () => {
    clearInterval(
      scrollInterval4.current,
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
        setInterval(() => {
          const element =
            document.getElementById(
              "ls3",
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
        }, 40);
    };


  /*
   * Stop the interval if this popup closes.
   */
  useEffect(() => {
    return () => {
      if (
        scrollInterval4.current
      ) {
        clearInterval(
          scrollInterval4.current,
        );
      }
    };
  }, []);


  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    return regex.test(
      navigator.userAgent,
    );
  };


  return (
    <div
      className=
        "position-absolute z-index99 opaque100"
        style={{
  width: "400px", //"100%",
  height: "300px",
  overflowY: "scroll",
  overflowX: "hidden",
  boxSizing: "border-box",
  border: "1px solid #f0a060"
}}
    >

      {/*
       * This component reads Firebase.
       *
       * It does not display the list itself.
       */}
      <InfiniteScrollNewHashtags
        uid={props.auth.uid}
        loadMoreRef={
          loadMoreHashtagsRef
        }
      />


      <div
        className=
          "margin-top-1- margin-left-11"
      >

        <div
          className="page-header-2"
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


        {/*
         * THIS is the actual scrolling element.
         */}
        <div
          id="ls3"

          onScroll={
            handleHashtagScroll
          }

          className={`content-containerht ${
            isMobile() === true
              ? "widthhashtagcolumn"
              : "widthx1"
          } heightx1 overflowyauto borderLightOrange overflowxhidden padding-bottom-1`}
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
                index,
              ) =>
                !!item && (
                  <li
                    key={
                      index
                    }

                    data-item-id={
                      item
                    }
                  >
                    {item}
                  </li>
                ),
            )}

          </ul>

        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (
  state,
) => ({
  hashtags:
    state.hashtags,

  auth:
    state.auth,
});


const mapDispatchToProps = (
  dispatch,
) => ({
  setTextFilter: (text) =>
    dispatch(
      setTextFilter(text),
    ),

  sortByHashTag: () =>
    dispatch(
      sortByHashTag(),
    ),
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    SeeHashTagsPage,
  ),
);