import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";
import SeeFollowerPage from "./SeeFollowerPage";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNewHashTag = (props) => {
  console.log("abc InfiniteScrollNewHashTag");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Keeps track of where the previous Firebase query stopped.
  const cursorRef = useRef(null);

  // Keeps track of which cached page we are on.
  const pageRef = useRef(0);

  // Helps prevent duplicate page loads.
  const loadingRef = useRef(false);

  // This element will be watched by IntersectionObserver.
  const loaderRef = useRef(null);

  /*
   * Normalize the search text.
   *
   * "  Dog   Rescue  "
   * becomes:
   * "dog rescue"
   */
  const normalizeSearch = (value) => {
    return (value || "").trim().replace(/\s+/g, " ").toLowerCase();
  };

  /*
   * Base cache key for this particular search.
   */
  const getCacheBaseKey = (search) => {
    return [
      "urilinks",
      "hashtag",
      props.uid || "",
      props.databasePath || "",
      props.theSortBy || "",
      search,
    ].join("|");
  };

  /*
   * Cache key for one page.
   */
  const getPageCacheKey = (search, pageNumber) => {
    return getCacheBaseKey(search) + "|page|" + pageNumber;
  };

  /*
   * Cache key for total count.
   */
  const getCountCacheKey = (search) => {
    return getCacheBaseKey(search) + "|count";
  };

  const loadLinks = async (reset = false) => {
    if (loadingRef.current) return;

    if (!reset && !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const search = normalizeSearch(props.searchText);

      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      /*
       * -----------------------------------------
       * CHECK SESSION CACHE FIRST
       * -----------------------------------------
       */

      const cachedString = window.sessionStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const cachedPage = JSON.parse(cachedString);

          console.log(
            "InfiniteScrollNewHashTag: using cached page " + pageNumber,
          );

          /*
           * Restore cursor so the next Firebase page
           * starts in the correct place.
           */
          cursorRef.current = cachedPage.cursor || null;

          if (reset) {
            setLinks(cachedPage.matches || []);
          } else {
            setLinks((previousLinks) => [
              ...previousLinks,
              ...(cachedPage.matches || []),
            ]);
          }

          setHasMore(cachedPage.hasMore);

          pageRef.current = pageNumber + 1;

          return;
        } catch (error) {
          console.log("Hashtag cache read error:", error);

          window.sessionStorage.removeItem(cacheKey);
        }
      }

      /*
       * -----------------------------------------
       * NOT CACHED - READ FROM FIREBASE
       * -----------------------------------------
       */

      console.log(
        "InfiniteScrollNewHashTag: getting Firebase page=" + pageNumber,
      );

      let query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("note");

      /*
       * Continue from previous Firebase cursor.
       */
      if (!reset && cursorRef.current) {
        query = query.startAt(cursorRef.current.value, cursorRef.current.key);
      }

      /*
       * Request an extra record so we can determine
       * whether another page exists.
       */
      query = query.limitToFirst(
        PAGE_SIZE + (!reset && cursorRef.current ? 2 : 1),
      );

      const snapshot = await query.once("value");

      let allFetched = [];

      snapshot.forEach((child) => {
        allFetched.push({
          id: child.key,
          ...child.val(),
        });
      });

      /*
       * startAt includes the previous cursor record,
       * so remove that duplicate.
       */
      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      /*
       * These are the actual 20 Firebase records
       * for this page.
       */
      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      /*
       * Apply the hashtag/note search.
       */
      const matches = fetchedPage.filter(
        (item) => item.note && item.note.toLowerCase().includes(search),
      );

      /*
       * Save the Firebase cursor from the final
       * fetched record, not from the final match.
       */
      if (fetchedPage.length > 0) {
        const lastItem = fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.note,
        };
      } else {
        cursorRef.current = null;
      }

      console.log(
        "InfiniteScrollNewHashTag, matches=" + JSON.stringify(matches),
      );

      /*
       * -----------------------------------------
       * SAVE PAGE TO SESSION CACHE
       * -----------------------------------------
       */

      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: moreAvailable,
      };

      window.sessionStorage.setItem(cacheKey, JSON.stringify(pageToCache));

      /*
       * Display the page.
       */
      if (reset) {
        setLinks(matches);
      } else {
        setLinks((previousLinks) => [...previousLinks, ...matches]);
      }

      setHasMore(moreAvailable);

      /*
       * Next load will request the next page.
       */
      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase hashtag search error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  /*
   * -----------------------------------------
   * GET TOTAL COUNT
   * -----------------------------------------
   */

  const getTotalCount = async () => {
    const search = normalizeSearch(props.searchText);

    const countCacheKey = getCountCacheKey(search);

    /*
     * Check cached count first.
     */
    const cachedCount = window.sessionStorage.getItem(countCacheKey);

    if (cachedCount !== null) {
      console.log(
        "InfiniteScrollNewHashTag: using cached count=" + cachedCount,
      );

      if (props.onLinksCountChange) {
        props.onLinksCountChange(parseInt(cachedCount, 10));
      }

      return;
    }

    /*
     * Not cached, so count from Firebase.
     */
    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      if (item.note && item.note.toLowerCase().includes(search)) {
        count++;
      }
    });

    /*
     * Save count in cache.
     */
    window.sessionStorage.setItem(countCacheKey, count.toString());

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }
  };

  /*
   * Start a new search whenever
   * searchText or uid changes.
   */
  useEffect(() => {
    cursorRef.current = null;
    pageRef.current = 0;

    setLinks([]);
    setHasMore(true);

    getTotalCount();
    loadLinks(true);
  }, [props.searchText, props.uid]);

  /*
   * Infinite scroll.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !loadingRef.current && hasMore) {
          loadLinks(false);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loading, hasMore, props.searchText]);
  const removeDeletedLinkFromSessionStorage = (search, id) => {
    const baseKey = getCacheBaseKey(search);

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);

      if (key && key.startsWith(baseKey + "|page|")) {
        const cachedString = sessionStorage.getItem(key);

        if (!cachedString) continue;

        try {
          const cachedPage = JSON.parse(cachedString);

          if (Array.isArray(cachedPage.matches)) {
            cachedPage.matches = cachedPage.matches.filter(
              (link) => link.id !== id,
            );

            sessionStorage.setItem(key, JSON.stringify(cachedPage));
          }
        } catch (error) {
          console.log("Error updating sessionStorage:", error);
        }
      }
    }

    // Remove the cached count because it is now outdated.
    const countKey = getCountCacheKey(search);

    sessionStorage.removeItem(countKey);
  };

  const sessionRemoveLink = (id) => {
    console.log(
      "inifinteScrollNewDescription.js, sessionRemoveLink, about to call sessionStorage.clear()",
    );
    //normalizeSearch(props.searchText)
    //sessionStorage.clear()
    const search = normalizeSearch(props.searchText);

    removeDeletedLinkFromSessionStorage(search, id);

    props.setLinksCount(props.linksCount - 1);
  };

  const clearVisibilityCacheOnly = () => {
    const prefix =
      "urilinks|visibility|" +
      (props.uid || "") +
      "|" +
      (props.databasePath || "") +
      "|";

    const keysToRemove = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);

      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      sessionStorage.removeItem(key);
    });
  };

  const clearVisibilityCache = async () => {
    clearVisibilityCacheOnly();

    cursorRef.current = null;
    pageRef.current = 0;

    setLinks([]);
    setHasMore(true);

    await getTotalCount(true);

    await loadLinks(true, true);
  };

  const removeLinkFromDisplayedList = (id) => {
    setLinks((previousLinks) => previousLinks.filter((link) => link.id !== id));

    if (props.setLinksCount) {
      props.setLinksCount(props.linksCount - 1);
    }
  };

  return (
    <div>
      <div>
        {links && links.length === 0
          ? null
          : links.map((link, index) => {
              if (rt === "readonly" && link.showpublic === 0) {
                return null;
              } else {
                return (
                  <div
                    id={link.id}
                    key={link.id}
                    className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                  >
                    <LinkListItem
                      sessionRemoveLink={sessionRemoveLink}
                      scrollContainerRef={props.scrollContainerRef}
                      link={link}
                      rt={rt}
                      {...link}
                      index={index}
                      signup={props.signup.signup}
                      idexists={props.idexists}
                      theSortBy={props.theSortBy}
                      clearVisibilityCache={clearVisibilityCacheOnly}
                            removeLinkFromDisplayedList={removeLinkFromDisplayedList}
                    />
                  </div>
                );
              }
            })}
      </div>

      {loading && <p>Loading...</p>}

      {!loading && !hasMore && links.length === 0 && <p>No results found.</p>}

      <div
        ref={loaderRef}
        style={{
          height: "20px",
        }}
      />

      {!hasMore && links.length > 0 && <p>No more results.</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};

export default connect(mapStateToProps)(InfiniteScrollNewHashTag);

// import React, { useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
// import firebase from "firebase/app";
// import "firebase/database";

// import LinkListItem from "./LinkListItem"

// const PAGE_SIZE = 20;

// const params = new URLSearchParams(window.location.search);
// const rt = params.get("x");

// const InfiniteScrollNewHashTag = (props) => {
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
//       }

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
//   const getTotalCount = async () => {
//   const search = props.searchText.trim().toLowerCase();

//   const snapshot = await firebase
//     .database()
//     .ref(props.databasePath)
//     .once("value");

//   let count = 0;

//   snapshot.forEach((child) => {
//     const item = child.val();

//     if (

//       item.note &&
//       item.note.toLowerCase().includes(search)
//     ) {
//       count++;
//     }
//   });

//   if (props.onLinksCountChange) {
//    props.onLinksCountChange(count);

//   }
// };

// useEffect(() => {
//   cursorRef.current = null;
//   setLinks([]);
//   setHasMore(true);

//   getTotalCount();
//   loadLinks(true);
// }, [props.searchText, props.uid]);

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

// export default connect(mapStateToProps)(InfiniteScrollNewHashTag);
// //}
