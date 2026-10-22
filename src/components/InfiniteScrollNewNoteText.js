import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";


const PAGE_SIZE = 20;


const params =
  new URLSearchParams(
    window.location.search
  );

const rt =
  params.get("x");


const InfiniteScrollNewNoteText = (
  props
) => {

  console.log(
    "abc InfiniteScrollNewNoteText"
  );


  const [
    links,
    setLinks,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    hasMore,
    setHasMore,
  ] = useState(true);


  /*
   * Used specifically for hashtag
   * searches.
   */
  const [
    noMoreHashtags,
    setNoMoreHashtags,
  ] = useState(false);


  /*
   * Keeps track of where the previous
   * Firebase query stopped.
   */
  const cursorRef =
    useRef(null);


  /*
   * Keeps track of cached page number.
   */
  const pageRef =
    useRef(0);


  /*
   * Prevent duplicate loads before
   * React updates loading state.
   */
  const loadingRef =
    useRef(false);


  /*
   * IntersectionObserver watches this.
   */
  const loaderRef =
    useRef(null);


  /*
   * Keeps the current complete list
   * available immediately.
   *
   * This avoids waiting for setLinks()
   * before checking how many links
   * have been found.
   */
  const linksRef =
    useRef([]);


  /*
   * Normalize search text.
   */
  const normalizeSearch = (
    value
  ) => {

    return (
      value || ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      )
      .toLowerCase();

  };


  /*
   * Get the expected number of links
   * for the clicked hashtag.
   *
   * SeeHashTagsPage stores these when
   * the user clicks the hashtag:
   *
   * hashtagSearchTerm
   * hashtagExpectedCount
   */
  const getHashtagExpectedCount =
    () => {

      if (
        props.theSortBy !==
        "hashtag"
      ) {

        return 0;

      }


      const currentSearch =
        normalizeSearch(
          props.searchText
        );


      const savedSearch =
        normalizeSearch(
          window.sessionStorage
            .getItem(
              "hashtagSearchTerm"
            )
        );


      /*
       * Make sure the saved count belongs
       * to this hashtag.
       */
      if (
        currentSearch !==
        savedSearch
      ) {

        return 0;

      }


      const count =
        parseInt(
          window.sessionStorage
            .getItem(
              "hashtagExpectedCount"
            ),
          10
        );


      if (
        Number.isNaN(count)
      ) {

        return 0;

      }


      return count;

    };


  /*
   * Prevent a link from being counted
   * twice.
   */
  const removeDuplicateLinks =
    (
      array
    ) => {

      const ids =
        new Set();


      return array.filter(
        (link) => {

          if (
            !link ||
            !link.id
          ) {

            return false;

          }


          if (
            ids.has(
              link.id
            )
          ) {

            return false;

          }


          ids.add(
            link.id
          );


          return true;

        }
      );

    };


  /*
   * Check whether the hashtag search
   * has found item.count links.
   */
  const checkHashtagComplete =
    (
      foundLinks
    ) => {

      if (
        props.theSortBy !==
        "hashtag"
      ) {

        return false;

      }


      const expectedCount =
        getHashtagExpectedCount();


      console.log(
        "Hashtag expected count=",
        expectedCount
      );


      console.log(
        "Hashtag links found=",
        foundLinks.length
      );


      if (
        expectedCount > 0 &&
        foundLinks.length >=
          expectedCount
      ) {

        console.log(
          "All expected hashtag links found"
        );


        setNoMoreHashtags(
          true
        );


        setHasMore(
          false
        );


        return true;

      }


      return false;

    };


  /*
   * Unique cache key.
   */
  const getCacheBaseKey =
    (
      search
    ) => {

      return [
        "urilinks",
        "notetext",
        props.uid || "",
        props.databasePath || "",
        props.theSortBy || "",
        search,
      ].join("|");

    };


  /*
   * Cache key for one page.
   */
  const getPageCacheKey =
    (
      search,
      pageNumber
    ) => {

      return (
        getCacheBaseKey(
          search
        ) +
        "|page|" +
        pageNumber
      );

    };


  /*
   * Cache key for total count.
   */
  const getCountCacheKey =
    (
      search
    ) => {

      return (
        getCacheBaseKey(
          search
        ) +
        "|count"
      );

    };


  const loadLinks =
    async (
      reset = false
    ) => {

      if (
        loadingRef.current
      ) {

        return;

      }


      if (
        !reset &&
        !hasMore
      ) {

        return;

      }


      /*
       * Hashtag has already reached
       * item.count.
       */
      if (
        !reset &&
        props.theSortBy ===
          "hashtag" &&
        noMoreHashtags
      ) {

        return;

      }


      loadingRef.current =
        true;


      setLoading(
        true
      );


      try {

        const search =
          normalizeSearch(
            props.searchText
          );


        const pageNumber =
          reset
            ? 0
            : pageRef.current;


        const cacheKey =
          getPageCacheKey(
            search,
            pageNumber
          );


        /*
         * -----------------------------------------
         * CHECK SESSION CACHE FIRST
         * -----------------------------------------
         */

        const cachedString =
          window.sessionStorage
            .getItem(
              cacheKey
            );


        if (
          cachedString
        ) {

          try {

            const cachedPage =
              JSON.parse(
                cachedString
              );


            console.log(
              "InfiniteScrollNewNoteText: using cached page " +
                pageNumber
            );


            /*
             * Restore cursor.
             */
            cursorRef.current =
              cachedPage.cursor ||
              null;


            const cachedMatches =
              Array.isArray(
                cachedPage.matches
              )
                ? cachedPage.matches
                : [];


            /*
             * Build complete list.
             */
            let updatedLinks;


            if (
              reset
            ) {

              updatedLinks =
                removeDuplicateLinks(
                  cachedMatches
                );

            } else {

              updatedLinks =
                removeDuplicateLinks(
                  [
                    ...linksRef.current,
                    ...cachedMatches,
                  ]
                );

            }


            /*
             * Save immediately in ref.
             */
            linksRef.current =
              updatedLinks;


            setLinks(
              updatedLinks
            );


            /*
             * NEW:
             * Stop when item.count links
             * have been found.
             */
            const hashtagComplete =
              checkHashtagComplete(
                updatedLinks
              );


            if (
              hashtagComplete ===
              false
            ) {

              setHasMore(
                cachedPage.hasMore
              );

            }


            pageRef.current =
              pageNumber + 1;


            return;

          } catch (
            error
          ) {

            console.log(
              "Note text cache read error:",
              error
            );


            window.sessionStorage
              .removeItem(
                cacheKey
              );

          }

        }


        /*
         * -----------------------------------------
         * NOT CACHED - GET FROM FIREBASE
         * -----------------------------------------
         */

        console.log(
          "InfiniteScrollNewNoteText: getting Firebase page=" +
            pageNumber
        );


        let query =
          firebase
            .database()
            .ref(
              props.databasePath
            )
            .orderByChild(
              "note"
            );


        /*
         * Continue from previous cursor.
         */
        if (
          !reset &&
          cursorRef.current
        ) {

          query =
            query.startAt(
              cursorRef.current
                .value,

              cursorRef.current
                .key
            );

        }


        /*
         * Request extra records.
         */
        query =
          query.limitToFirst(
            PAGE_SIZE +
              (
                !reset &&
                cursorRef.current
                  ? 2
                  : 1
              )
          );


        const snapshot =
          await query.once(
            "value"
          );


        let allFetched =
          [];


        snapshot.forEach(
          (
            child
          ) => {

            allFetched.push({
              id:
                child.key,

              ...child.val(),
            });

          }
        );


        /*
         * startAt includes previous
         * cursor record.
         */
        if (
          !reset &&
          cursorRef.current
        ) {

          allFetched =
            allFetched.filter(
              (item) =>
                item.id !==
                cursorRef.current
                  .key
            );

        }


        const moreAvailable =
          allFetched.length >
          PAGE_SIZE;


        /*
         * Actual Firebase page.
         */
        const fetchedPage =
          allFetched.slice(
            0,
            PAGE_SIZE
          );


        /*
         * Apply normalized search.
         */
        const matches =
          fetchedPage.filter(
            (item) =>
              item.note &&
              item.note
                .toLowerCase()
                .includes(
                  search
                )
          );


        /*
         * Save cursor from final
         * Firebase record.
         */
        if (
          fetchedPage.length >
          0
        ) {

          const lastItem =
            fetchedPage[
              fetchedPage.length -
                1
            ];


          cursorRef.current =
            {
              key:
                lastItem.id,

              value:
                lastItem.note,
            };

        } else {

          cursorRef.current =
            null;

        }


        console.log(
          "InfiniteScrollNewNoteText, matches=" +
            JSON.stringify(
              matches
            )
        );


        /*
         * -----------------------------------------
         * SAVE PAGE IN SESSION CACHE
         * -----------------------------------------
         */

        const pageToCache =
          {
            matches:
              matches,

            cursor:
              cursorRef.current,

            hasMore:
              moreAvailable,
          };


        window.sessionStorage
          .setItem(
            cacheKey,
            JSON.stringify(
              pageToCache
            )
          );


        /*
         * -----------------------------------------
         * BUILD COMPLETE RESULTS LIST
         * -----------------------------------------
         */

        let updatedLinks;


        if (
          reset
        ) {

          updatedLinks =
            removeDuplicateLinks(
              matches
            );

        } else {

          updatedLinks =
            removeDuplicateLinks(
              [
                ...linksRef.current,
                ...matches,
              ]
            );

        }


        /*
         * Save immediately.
         */
        linksRef.current =
          updatedLinks;


        setLinks(
          updatedLinks
        );


        /*
         * -----------------------------------------
         * NEW HASHTAG STOP
         * -----------------------------------------
         *
         * If item.count says there are 3,
         * stop immediately when 3 unique
         * links have been found.
         */
        const hashtagComplete =
          checkHashtagComplete(
            updatedLinks
          );


        if (
          hashtagComplete ===
          false
        ) {

          setHasMore(
            moreAvailable
          );

        }


        pageRef.current =
          pageNumber + 1;


      } catch (
        error
      ) {

        console.log(
          "Firebase note text search error:",
          error
        );


      } finally {

        loadingRef.current =
          false;


        setLoading(
          false
        );

      }

    };


  /*
   * -----------------------------------------
   * GET TOTAL COUNT
   * -----------------------------------------
   */

  const getTotalCount =
    async () => {

      const search =
        normalizeSearch(
          props.searchText
        );


      /*
       * For a hashtag search,
       * SeeHashTagsPage has already
       * calculated the exact count.
       *
       * There is no reason to scan
       * Firebase again for the count.
       */
      if (
        props.theSortBy ===
        "hashtag"
      ) {

        const expectedCount =
          getHashtagExpectedCount();


        if (
          expectedCount > 0
        ) {

          console.log(
            "Using hashtag item.count=",
            expectedCount
          );


          if (
            props.onLinksCountChange
          ) {

            props.onLinksCountChange(
              expectedCount
            );

          }


          return;

        }

      }


      const countCacheKey =
        getCountCacheKey(
          search
        );


      /*
       * Check session cache first.
       */
      const cachedCount =
        window.sessionStorage
          .getItem(
            countCacheKey
          );


      if (
        cachedCount !==
        null
      ) {

        console.log(
          "InfiniteScrollNewNoteText: using cached count=" +
            cachedCount
        );


        if (
          props.onLinksCountChange
        ) {

          props.onLinksCountChange(
            parseInt(
              cachedCount,
              10
            )
          );

        }


        return;

      }


      /*
       * Not cached.
       */
      const snapshot =
        await firebase
          .database()
          .ref(
            props.databasePath
          )
          .once(
            "value"
          );


      let count =
        0;


      snapshot.forEach(
        (
          child
        ) => {

          const item =
            child.val();


          if (
            item.note &&
            item.note
              .toLowerCase()
              .includes(
                search
              )
          ) {

            count++;

          }

        }
      );


      /*
       * Cache total count.
       */
      window.sessionStorage
        .setItem(
          countCacheKey,
          count.toString()
        );


      if (
        props.onLinksCountChange
      ) {

        props.onLinksCountChange(
          count
        );

      }

    };


  /*
   * Start a new search.
   */
  useEffect(
    () => {

      cursorRef.current =
        null;


      pageRef.current =
        0;


      linksRef.current =
        [];


      setLinks(
        []
      );


      setHasMore(
        true
      );


      setNoMoreHashtags(
        false
      );


      getTotalCount();


      loadLinks(
        true
      );

    },
    [
      props.searchText,
      props.uid,
      props.theSortBy,
    ]
  );


  /*
   * Infinite scroll.
   */
  useEffect(
    () => {

      const observer =
        new IntersectionObserver(
          (
            entries
          ) => {

            const firstEntry =
              entries[0];


            if (
              firstEntry
                .isIntersecting &&
              !loadingRef.current &&
              hasMore &&
              !noMoreHashtags
            ) {

              loadLinks(
                false
              );

            }

          },
          {
            root:
              null,

            rootMargin:
              "200px",

            threshold:
              0,
          }
        );


      const loader =
        loaderRef.current;


      if (
        loader
      ) {

        observer.observe(
          loader
        );

      }


      return () => {

        if (
          loader
        ) {

          observer.unobserve(
            loader
          );

        }

      };

    },
    [
      loading,
      hasMore,
      noMoreHashtags,
      props.searchText,
    ]
  );


  const removeDeletedLinkFromSessionStorage =
    (
      search,
      id
    ) => {

      const baseKey =
        getCacheBaseKey(
          search
        );


      for (
        let i = 0;
        i <
        sessionStorage.length;
        i++
      ) {

        const key =
          sessionStorage.key(
            i
          );


        if (
          key &&
          key.startsWith(
            baseKey +
              "|page|"
          )
        ) {

          const cachedString =
            sessionStorage
              .getItem(
                key
              );


          if (
            !cachedString
          ) {

            continue;

          }


          try {

            const cachedPage =
              JSON.parse(
                cachedString
              );


            if (
              Array.isArray(
                cachedPage.matches
              )
            ) {

              cachedPage.matches =
                cachedPage.matches
                  .filter(
                    (link) =>
                      link.id !==
                      id
                  );


              sessionStorage
                .setItem(
                  key,
                  JSON.stringify(
                    cachedPage
                  )
                );

            }

          } catch (
            error
          ) {

            console.log(
              "Error updating sessionStorage:",
              error
            );

          }

        }

      }


      /*
       * Cached count is outdated.
       */
      const countKey =
        getCountCacheKey(
          search
        );


      sessionStorage.removeItem(
        countKey
      );

    };


  const sessionRemoveLink =
    (
      id
    ) => {

      console.log(
        "InfiniteScrollNewNoteText, sessionRemoveLink"
      );


      const search =
        normalizeSearch(
          props.searchText
        );


      removeDeletedLinkFromSessionStorage(
        search,
        id
      );


      props.setLinksCount(
        props.linksCount -
          1
      );

    };


  return (

    <div>

      <div>

        {links &&
        links.length ===
          0
          ? null
          : links.map(
              (
                link,
                index
              ) => {

                if (
                  rt ===
                    "readonly" &&
                  link.showpublic ===
                    0
                ) {

                  return null;

                }


                return (

                  <div
                    id={
                      link.id
                    }

                    key={
                      link.id
                    }

                    className=
                      "border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                  >

                    <LinkListItem
                      sessionRemoveLink={
                        sessionRemoveLink
                      }

                      scrollContainerRef={
                        props.scrollContainerRef
                      }

                      link={
                        link
                      }

                      rt={
                        rt
                      }

                      {...link}

                      index={
                        index
                      }

                      signup={
                        props
                          .signup
                          .signup
                      }

                      idexists={
                        props.idexists
                      }

                      theSortBy={
                        props.theSortBy
                      }
                    />

                  </div>

                );

              }
            )}

      </div>


      {loading && (

        <p>
          Loading...
        </p>

      )}


      {!loading &&
        !hasMore &&
        links.length ===
          0 && (

          <p>
            No results found.
          </p>

        )}


      <div
        ref={
          loaderRef
        }

        style={{
          height:
            "20px",
        }}
      />


      {!hasMore &&
        links.length >
          0 && (

          <p>
            No more results.
          </p>

        )}

    </div>

  );

};


const mapStateToProps = (
  state
) => {

  return {

    signup:
      state.signup,

  };

};


export default connect(
  mapStateToProps
)(
  InfiniteScrollNewNoteText
);


// import React, { useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
// import firebase from "firebase/app";
// import "firebase/database";

// import LinkListItem from "./LinkListItem";

// const PAGE_SIZE = 20;

// const params = new URLSearchParams(window.location.search);
// const rt = params.get("x");

// const InfiniteScrollNewNoteText = (props) => {
//    console.log("abc InfiniteScrollNewNoteText")
//   const [links, setLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Keeps track of where the previous Firebase query stopped.
//   const cursorRef = useRef(null);

//   // Keeps track of the cached page number.
//   const pageRef = useRef(0);

//   // Prevents duplicate loads before React updates loading state.
//   const loadingRef = useRef(false);

//   // This element will be watched by IntersectionObserver.
//   const loaderRef = useRef(null);

//   /*
//    * Normalize search text.
//    *
//    * "  Dog   Rescue  "
//    * becomes:
//    * "dog rescue"
//    */
//   const normalizeSearch = (value) => {
//     return (value || "")
//       .trim()
//       .replace(/\s+/g, " ")
//       .toLowerCase();
//   };

//   /*
//    * Unique cache key for note-text searches.
//    */
//   const getCacheBaseKey = (search) => {
//     return [
//       "urilinks",
//       "notetext",
//       props.uid || "",
//       props.databasePath || "",
//       props.theSortBy || "",
//       search,
//     ].join("|");
//   };

//   /*
//    * Cache key for one page.
//    */
//   const getPageCacheKey = (search, pageNumber) => {
//     return getCacheBaseKey(search) + "|page|" + pageNumber;
//   };

//   /*
//    * Cache key for total count.
//    */
//   const getCountCacheKey = (search) => {
//     return getCacheBaseKey(search) + "|count";
//   };

//   const loadLinks = async (reset = false) => {
//     if (loadingRef.current) return;

//     if (!reset && !hasMore) return;

//     loadingRef.current = true;
//     setLoading(true);

//     try {
//       const search = normalizeSearch(props.searchText);

//       const pageNumber = reset ? 0 : pageRef.current;

//       const cacheKey = getPageCacheKey(
//         search,
//         pageNumber,
//       );

//       /*
//        * -----------------------------------------
//        * CHECK SESSION CACHE FIRST
//        * -----------------------------------------
//        */

//       const cachedString =
//         window.sessionStorage.getItem(cacheKey);

//       if (cachedString) {
//         try {
//           const cachedPage =
//             JSON.parse(cachedString);

//           console.log(
//             "InfiniteScrollNewNoteText: using cached page " +
//               pageNumber,
//           );

//           /*
//            * Restore the cursor so the next page
//            * can continue from the correct Firebase position.
//            */
//           cursorRef.current =
//             cachedPage.cursor || null;

//           if (reset) {
//             setLinks(cachedPage.matches || []);
//           } else {
//             setLinks((previousLinks) => [
//               ...previousLinks,
//               ...(cachedPage.matches || []),
//             ]);
//           }

//           setHasMore(cachedPage.hasMore);

//           pageRef.current =
//             pageNumber + 1;

//           return;
//         } catch (error) {
//           console.log(
//             "Note text cache read error:",
//             error,
//           );

//           window.sessionStorage.removeItem(
//             cacheKey,
//           );
//         }
//       }

//       /*
//        * -----------------------------------------
//        * NOT CACHED - GET FROM FIREBASE
//        * -----------------------------------------
//        */

//       console.log(
//         "InfiniteScrollNewNoteText: getting Firebase page=" +
//           pageNumber,
//       );

//       let query = firebase
//         .database()
//         .ref(props.databasePath)
//         .orderByChild("note");

//       /*
//        * Continue from previous Firebase cursor.
//        */
//       if (
//         !reset &&
//         cursorRef.current
//       ) {
//         query = query.startAt(
//           cursorRef.current.value,
//           cursorRef.current.key,
//         );
//       }

//       /*
//        * Request extra records so we can determine
//        * whether another page exists.
//        */
//       query = query.limitToFirst(
//         PAGE_SIZE +
//           (!reset &&
//           cursorRef.current
//             ? 2
//             : 1),
//       );

//       const snapshot =
//         await query.once("value");

//       let allFetched = [];

//       snapshot.forEach((child) => {
//         allFetched.push({
//           id: child.key,
//           ...child.val(),
//         });
//       });

//       /*
//        * startAt includes the previous cursor record,
//        * so remove that duplicate.
//        */
//       if (
//         !reset &&
//         cursorRef.current
//       ) {
//         allFetched =
//           allFetched.filter(
//             (item) =>
//               item.id !==
//               cursorRef.current.key,
//           );
//       }

//       const moreAvailable =
//         allFetched.length >
//         PAGE_SIZE;

//       /*
//        * Actual 20 Firebase records for this page.
//        */
//       const fetchedPage =
//         allFetched.slice(
//           0,
//           PAGE_SIZE,
//         );

//       /*
//        * Apply normalized note-text search.
//        */
//       const matches =
//         fetchedPage.filter(
//           (item) =>
//             item.note &&
//             item.note
//               .toLowerCase()
//               .includes(search),
//         );

//       /*
//        * Save cursor from the last Firebase record,
//        * not from the last matching record.
//        */
//       if (
//         fetchedPage.length > 0
//       ) {
//         const lastItem =
//           fetchedPage[
//             fetchedPage.length - 1
//           ];

//         cursorRef.current = {
//           key: lastItem.id,
//           value: lastItem.note,
//         };
//       } else {
//         cursorRef.current = null;
//       }

//       console.log(
//         "InfiniteScrollNewNoteText, matches=" +
//           JSON.stringify(matches),
//       );

//       /*
//        * -----------------------------------------
//        * SAVE PAGE IN SESSION CACHE
//        * -----------------------------------------
//        */

//       const pageToCache = {
//         matches: matches,
//         cursor:
//           cursorRef.current,
//         hasMore:
//           moreAvailable,
//       };

//       window.sessionStorage.setItem(
//         cacheKey,
//         JSON.stringify(pageToCache),
//       );

//       /*
//        * Display this page.
//        */
//       if (reset) {
//         setLinks(matches);
//       } else {
//         setLinks(
//           (previousLinks) => [
//             ...previousLinks,
//             ...matches,
//           ],
//         );
//       }

//       setHasMore(
//         moreAvailable,
//       );

//       pageRef.current =
//         pageNumber + 1;
//     } catch (error) {
//       console.log(
//         "Firebase note text search error:",
//         error,
//       );
//     } finally {
//       loadingRef.current = false;
//       setLoading(false);
//     }
//   };

//   /*
//    * -----------------------------------------
//    * GET TOTAL COUNT
//    * -----------------------------------------
//    */

//   const getTotalCount = async () => {
//     const search =
//       normalizeSearch(
//         props.searchText,
//       );

//     const countCacheKey =
//       getCountCacheKey(search);

//     /*
//      * Check session cache first.
//      */
//     const cachedCount =
//       window.sessionStorage.getItem(
//         countCacheKey,
//       );

//     if (
//       cachedCount !== null
//     ) {
//       console.log(
//         "InfiniteScrollNewNoteText: using cached count=" +
//           cachedCount,
//       );

//       if (
//         props.onLinksCountChange
//       ) {
//         props.onLinksCountChange(
//           parseInt(
//             cachedCount,
//             10,
//           ),
//         );
//       }

//       return;
//     }

//     /*
//      * Not cached, so calculate count from Firebase.
//      */
//     const snapshot =
//       await firebase
//         .database()
//         .ref(
//           props.databasePath,
//         )
//         .once("value");

//     let count = 0;

//     snapshot.forEach(
//       (child) => {
//         const item =
//           child.val();

//         if (
//           item.note &&
//           item.note
//             .toLowerCase()
//             .includes(search)
//         ) {
//           count++;
//         }
//       },
//     );

//     /*
//      * Cache total count.
//      */
//     window.sessionStorage.setItem(
//       countCacheKey,
//       count.toString(),
//     );

//     if (
//       props.onLinksCountChange
//     ) {
//       props.onLinksCountChange(
//         count,
//       );
//     }
//   };

//   /*
//    * Start a new search whenever searchText
//    * or uid changes.
//    */
//   useEffect(() => {
//     cursorRef.current = null;
//     pageRef.current = 0;

//     setLinks([]);
//     setHasMore(true);

//     getTotalCount();
//     loadLinks(true);
//   }, [
//     props.searchText,
//     props.uid,
//   ]);

//   /*
//    * Infinite scroll.
//    */
//   useEffect(() => {
//     const observer =
//       new IntersectionObserver(
//         (entries) => {
//           const firstEntry =
//             entries[0];

//           if (
//             firstEntry.isIntersecting &&
//             !loadingRef.current &&
//             hasMore
//           ) {
//             loadLinks(false);
//           }
//         },
//         {
//           root: null,
//           rootMargin: "200px",
//           threshold: 0,
//         },
//       );

//     const loader =
//       loaderRef.current;

//     if (loader) {
//       observer.observe(
//         loader,
//       );
//     }

//     return () => {
//       if (loader) {
//         observer.unobserve(
//           loader,
//         );
//       }
//     };
//   }, [
//     loading,
//     hasMore,
//     props.searchText,
//   ]);
// const removeDeletedLinkFromSessionStorage = (search, id) => {
//   const baseKey = getCacheBaseKey(search);

//   for (let i = 0; i < sessionStorage.length; i++) {
//     const key = sessionStorage.key(i);

//     if (
//       key &&
//       key.startsWith(baseKey + "|page|")
//     ) {
//       const cachedString =
//         sessionStorage.getItem(key);

//       if (!cachedString) continue;

//       try {
//         const cachedPage =
//           JSON.parse(cachedString);

//         if (Array.isArray(cachedPage.matches)) {
//           cachedPage.matches =
//             cachedPage.matches.filter(
//               (link) => link.id !== id
//             );

//           sessionStorage.setItem(
//             key,
//             JSON.stringify(cachedPage)
//           );
//         }
//       } catch (error) {
//         console.log(
//           "Error updating sessionStorage:",
//           error
//         );
//       }
//     }
//   }

//   // Remove the cached count because it is now outdated.
//   const countKey = getCountCacheKey(search);

//   sessionStorage.removeItem(countKey);
// };

// const sessionRemoveLink=(id) => {
//   console.log("inifinteScrollNewDescription.js, sessionRemoveLink, about to call sessionStorage.clear()")
//   //normalizeSearch(props.searchText)
//   //sessionStorage.clear()
//    const search =
//       normalizeSearch(props.searchText);

//     removeDeletedLinkFromSessionStorage(
//       search,
//       id
//     );

//     props.setLinksCount(props.linksCount-1)
// }
//   return (
//     <div>
//       <div>
//         {links &&
//         links.length === 0
//           ? null
//           : links.map(
//               (
//                 link,
//                 index,
//               ) => {
//                 if (
//                   rt ===
//                     "readonly" &&
//                   link.showpublic ===
//                     0
//                 ) {
//                   return null;
//                 } else {
//                   return (
//                     <div
//                       id={
//                         link.id
//                       }
//                       key={
//                         link.id
//                       }
//                       className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
//                     >
//                       <LinkListItem
//                         sessionRemoveLink={sessionRemoveLink}
//                         scrollContainerRef={
//                           props.scrollContainerRef
//                         }
//                         link={
//                           link
//                         }
//                         rt={
//                           rt
//                         }
//                         {...link}
//                         index={
//                           index
//                         }
//                         signup={
//                           props
//                             .signup
//                             .signup
//                         }
//                         idexists={
//                           props.idexists
//                         }
//                         theSortBy={
//                           props.theSortBy
//                         }
//                       />
//                     </div>
//                   );
//                 }
//               },
//             )}
//       </div>

//       {loading && (
//         <p>Loading...</p>
//       )}

//       {!loading &&
//         !hasMore &&
//         links.length ===
//           0 && (
//           <p>
//             No results found.
//           </p>
//         )}

//       <div
//         ref={loaderRef}
//         style={{
//           height: "20px",
//         }}
//       />

//       {!hasMore &&
//         links.length >
//           0 && (
//           <p>
//             No more results.
//           </p>
//         )}
//     </div>
//   );
// };

// const mapStateToProps = (
//   state,
// ) => {
//   return {
//     signup:
//       state.signup,
//   };
// };

// export default connect(
//   mapStateToProps,
// )(
//   InfiniteScrollNewNoteText,
// );

// import React, { useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
// import firebase from "firebase/app";
// import "firebase/database";

// import LinkListItem from "./LinkListItem"

// const PAGE_SIZE = 20;

// const params = new URLSearchParams(window.location.search);
// const rt = params.get("x");

// const InfiniteScrollNewNoteText = (props) => {
//   const [links, setLinks] = useState([]);
//   //const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Keeps track of where the previous Firebase query stopped.
//   const cursorRef = useRef(null);

//   // This element will be watched by IntersectionObserver.
//   const loaderRef = useRef(null);

//   const loadLinks = async (reset = false) => {
//     if (loading) return;

//     if (!reset && !hasMore) return;

//     setLoading(true);

//     try {
//       //const search = props.searchText.trim().toLowerCase();
//       //const search = "Da"; //.toLocaleLowerCase();
//       //const search = "e"; //this worked
//       const search = props.searchText.trim().toLowerCase();

//       //       .startAt("res")
//       // .endAt("res" + "\uf8ff")

//       console.log("InfiniteScrollNewDescription, props.theSortBy="+props.theSortBy)

//       let query
    
//         query = firebase
//         .database()
//         .ref(props.databasePath)
//         .orderByChild("note");
     
     

//       // SEARCH
//       //   if (search) {
//       //     query = query.startAt(search).endAt(search + "\uf8ff");
//       //   }

//       /*
//        * If this is another page,
//        * begin where the previous page stopped.
//        */
//       if (!reset && cursorRef.current) {
//         query = query.startAt(cursorRef.current.value, cursorRef.current.key);
//       }

//       /*
//        * We request one extra item.
//        *
//        * The extra item helps determine whether
//        * another page may exist.
//        */
//       //query = query.limitToFirst(PAGE_SIZE + 1);
//       query = query.limitToFirst(
//   PAGE_SIZE + (!reset && cursorRef.current ? 2 : 1)
// );

//       const snapshot = await query.once("value");

//       //   let results = [];
//       //   snapshot.forEach((child) => {
//       //     const item = child.val();

//       //     if (
//       //       item.description &&
//       //       //item.description.toLowerCase().includes(search)
//       //       item.description.includes(search)
//       //     ) {
//       //       results.push({
//       //         id: child.key,
//       //         ...item,
//       //       });
//       //     }
//       //   });

//       let allFetched = [];

//       snapshot.forEach((child) => {
//         allFetched.push({
//           id: child.key,
//           ...child.val(),
//         });
//       });

//       if (!reset && cursorRef.current) {
//         allFetched = allFetched.filter(
//           (item) => item.id !== cursorRef.current.key,
//         );
//       }

//       const moreAvailable = allFetched.length > PAGE_SIZE;

//       const fetchedPage = allFetched.slice(0, PAGE_SIZE);

//       let matches
     
//         matches = fetchedPage.filter(
//            (item) => item.note && item.note.toLowerCase().includes(search))
//             if (fetchedPage.length > 0) {
//         const lastItem = fetchedPage[fetchedPage.length - 1];

//         cursorRef.current = {
//           key: lastItem.id,
//           value: lastItem.note,
//         };

//     }
      

    
      

     

//       console.log("InfiniteScrollDescription, matches=" + JSON.stringify(matches));

//       //   if (!reset && cursorRef.current) {
//       //     results = results.filter((item) => item.id !== cursorRef.current.key);
//       //   }

//       //const moreAvailable = results.length > PAGE_SIZE;

//       /*
//        * Only display PAGE_SIZE records.
//        */


//       if (reset) {
//         setLinks(matches);
//       } else {
//         setLinks((previousLinks) => [...previousLinks, ...matches]);
//       }

//       setHasMore(moreAvailable);

//     } catch (error) {
//       console.log("Firebase search error:", error);
//     }

//     setLoading(false);
//   };

//   /*
//    * Run a new search whenever searchText changes.
//    */
//    const getTotalCount = async () => {
//    const search = props.searchText.trim().toLowerCase();
 
//    const snapshot = await firebase
//      .database()
//      .ref(props.databasePath)
//      .once("value");
 
//    let count = 0;
 
//    snapshot.forEach((child) => {
//      const item = child.val();
 
//      if (
       
      
//        item.note &&
//        item.note.toLowerCase().includes(search)
//      ) {
//        count++;
//      }
//    });
 
//    if (props.onLinksCountChange) {
//     props.onLinksCountChange(count);
   
//    }
//  };
  
 
//  useEffect(() => {
//    cursorRef.current = null;
//    setLinks([]);
//    setHasMore(true);
 
//    getTotalCount();
//    loadLinks(true);
//  }, [props.searchText, props.uid]);

//   /*
//    * Infinite scroll.
//    *
//    * When loaderRef becomes visible,
//    * load the next page.
//    */
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const firstEntry = entries[0];

//         if (firstEntry.isIntersecting && !loading && hasMore) {
//           loadLinks(false);
//         }
//       },
//       {
//         root: null,
//         rootMargin: "200px",
//         threshold: 0,
//       },
//     );

//     const loader = loaderRef.current;

//     if (loader) {
//       observer.observe(loader);
//     }

//     return () => {
//       if (loader) {
//         observer.unobserve(loader);
//       }
//     };
//   }, [loading, hasMore, props.searchText]);

//   return (
//     <div>


//       <div>
//         {/* {links.map((link) => (
//           <div key={link.id}>
//             <h3>{link.description}</h3>

//             <a href={link.url} target="_blank" rel="noopener noreferrer">
//               {link.url}
//             </a>
//           </div>
//         ))} */}



// {links && links.length === 0
//                 ? null
//                 :  
//                   links.map((link, index) => {

//                     if (
//                       rt === "readonly" &&
//                       link.showpublic === 0
//                       //|| link.archive === 1
//                     )
//                       return null; //<div key={link.id + "1"}></div>;
//                     else
//                       return (
//                         <div
//                           id={link.id}
//                           key={link.id}
//                           className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
//                         >
//                           <LinkListItem
//                           scrollContainerRef={props.scrollContainerRef}
//                             link={link}
//                             rt={rt}
//                             key={link.id}
//                             {...link}
//                             //linkStatuses = {props.linkStatuses} //{props.linkStatues && props.linkStatuses[link.id]?props.linkStatuses[link.id].result:null}
//                             //linkStatus={props.linkStatus}
                            
//                             index={index}
//                             signup={props.signup.signup}
//                             idexists={props.idexists}
//                             theSortBy={props.theSortBy}
//                             // videoId={props.videoId}
//                             // playInPlaceVideo={props.playInPlaceVideo}
//                           />
//                         </div>
//                       );
//                   })}



//       </div>

//       {loading && <p>Loading...</p>}

//       {/* {!loading && links.length === 0 && <p>No results found.</p>} */}
//       {!loading && !hasMore && links.length === 0 && (
//   <p>No results found.</p>
// )}

//       <div ref={loaderRef} style={{ height: "20px" }} />

//       {!hasMore && links.length > 0 && <p>No more results.</p>}
//     </div>
//   );
// };


//  const mapStateToProps = (state) => {

//   return {
   
//     signup: state.signup,
   
//   };
// };


// export default connect(mapStateToProps)(InfiniteScrollNewNoteText);

