import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNewDescription = (props) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Keeps track of where the previous Firebase query stopped.
  const cursorRef = useRef(null);

  // Keeps track of which 20-item page we are on.
  const pageRef = useRef(0);

  // Prevents two Firebase loads from starting at the same time.
  const loadingRef = useRef(false);

  // This element will be watched by IntersectionObserver.
  const loaderRef = useRef(null);

  /*
   * Normalize search text.
   *
   * "  Dog   Rescue " becomes:
   * "dog rescue"
   */
  const normalizeSearch = (value) => {
    return (value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  };

  /*
   * Create a unique cache key for this particular search.
   *
   * Including databasePath and uid prevents one user's
   * cached data from being confused with another user's.
   */
  const getCacheBaseKey = (search) => {
    return [
      "urilinks",
      "description",
      props.uid || "",
      props.databasePath || "",
      props.theSortBy || "",
      search,
    ].join("|");
  };

  /*
   * Get the cache key for one 20-record page.
   */
  const getPageCacheKey = (search, pageNumber) => {
    return getCacheBaseKey(search) + "|page|" + pageNumber;
  };

  /*
   * Get the cache key for the total matching count.
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

      /*
       * Page zero is the first page.
       */
      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      /*
       * --------------------------------------------------
       * FIRST CHECK THE BROWSER CACHE
       * --------------------------------------------------
       */

      const cachedString = window.sessionStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const cachedPage = JSON.parse(cachedString);

          console.log(
            "InfiniteScrollNewDescription: using cached page " +
              pageNumber,
          );

          /*
           * Restore the Firebase cursor so the NEXT
           * page can continue from the correct location.
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

          /*
           * Next infinite-scroll request will be
           * for the following page.
           */
          pageRef.current = pageNumber + 1;

          return;
        } catch (error) {
          /*
           * If cached JSON was somehow damaged,
           * remove it and fall through to Firebase.
           */
          console.log("Cache read error:", error);
          window.sessionStorage.removeItem(cacheKey);
        }
      }

      /*
       * --------------------------------------------------
       * NOT IN CACHE — GET PAGE FROM FIREBASE
       * --------------------------------------------------
       */

      console.log(
        "InfiniteScrollNewDescription, getting Firebase page=" +
          pageNumber,
      );

      let query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("description");

      /*
       * If this is another page,
       * begin where the previous page stopped.
       */
      if (!reset && cursorRef.current) {
        query = query.startAt(
          cursorRef.current.value,
          cursorRef.current.key,
        );
      }

      /*
       * Ask Firebase for an extra record so we can
       * determine whether another page exists.
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
       * startAt() includes the cursor record itself.
       * Remove that duplicate.
       */
      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      /*
       * These are the actual 20 Firebase records
       * belonging to this page.
       */
      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      /*
       * Apply your contains search to those 20 records.
       */
      const matches = fetchedPage.filter(
        (item) =>
          item.description &&
          item.description
            .toLowerCase()
            .includes(search),
      );

      /*
       * Save the cursor from the LAST Firebase record,
       * not the last search match.
       */
      if (fetchedPage.length > 0) {
        const lastItem =
          fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.description,
        };
      } else {
        cursorRef.current = null;
      }

      console.log(
        "InfiniteScrollDescription, matches=" +
          JSON.stringify(matches),
      );

      /*
       * --------------------------------------------------
       * STORE THIS PAGE IN SESSION CACHE
       * --------------------------------------------------
       */

      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: moreAvailable,
      };

      window.sessionStorage.setItem(
        cacheKey,
        JSON.stringify(pageToCache),
      );

      /*
       * Display results.
       */
      if (reset) {
        setLinks(matches);
      } else {
        setLinks((previousLinks) => [
          ...previousLinks,
          ...matches,
        ]);
      }

      setHasMore(moreAvailable);

      /*
       * The next call will request the next cache page.
       */
      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase search error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * GET TOTAL SEARCH COUNT
   * --------------------------------------------------
   */

  const getTotalCount = async () => {
    const search = normalizeSearch(props.searchText);

    const countCacheKey = getCountCacheKey(search);

    /*
     * First see whether we already calculated this count.
     */
    const cachedCount =
      window.sessionStorage.getItem(countCacheKey);

    if (cachedCount !== null) {
      console.log(
        "InfiniteScrollNewDescription: using cached count=" +
          cachedCount,
      );

      if (props.onLinksCountChange) {
        props.onLinksCountChange(
          parseInt(cachedCount, 10),
        );
      }

      return;
    }

    /*
     * Count is not cached, so retrieve it from Firebase.
     */
    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      if (
        item.description &&
        item.description
          .toLowerCase()
          .includes(search)
      ) {
        count++;
      }
    });

    /*
     * Cache the count.
     */
    window.sessionStorage.setItem(
      countCacheKey,
      count.toString(),
    );

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }
  };

  /*
   * Run a new search whenever searchText or uid changes.
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
   *
   * When loaderRef becomes visible,
   * load the next page.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          !loadingRef.current &&
          hasMore
        ) {
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

  return (
    <div>
      <div>
        {links && links.length === 0
          ? null
          : links.map((link, index) => {
              if (
                rt === "readonly" &&
                link.showpublic === 0
              ) {
                return null;
              }

              return (
                <div
                  id={link.id}
                  key={link.id}
                  className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                >
                  <LinkListItem
                    scrollContainerRef={
                      props.scrollContainerRef
                    }
                    link={link}
                    rt={rt}
                    {...link}
                    index={index}
                    signup={props.signup.signup}
                    idexists={props.idexists}
                    theSortBy={props.theSortBy}
                  />
                </div>
              );
            })}
      </div>

      {loading && <p>Loading...</p>}

      {!loading &&
        !hasMore &&
        links.length === 0 && (
          <p>No results found.</p>
        )}

      <div
        ref={loaderRef}
        style={{ height: "20px" }}
      />

      {!hasMore && links.length > 0 && (
        <p>No more results.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};

export default connect(mapStateToProps)(
  InfiniteScrollNewDescription,
);

// import React, { useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
// import firebase from "firebase/app";
// import "firebase/database";

// import LinkListItem from "./LinkListItem"

// const PAGE_SIZE = 20;

// const params = new URLSearchParams(window.location.search);
// const rt = params.get("x");

// const InfiniteScrollNewDescription = (props) => {
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
//         .orderByChild("description");
       
     

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
//         (item) => item.description && item.description.toLowerCase().includes(search))
        
        
//         if (fetchedPage.length > 0) {
//         const lastItem = fetchedPage[fetchedPage.length - 1];

//         cursorRef.current = {
//           key: lastItem.id,
//           value: lastItem.description,
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
//     const getTotalCount = async () => {
//     const search = props.searchText.trim().toLowerCase();
  
//     const snapshot = await firebase
//       .database()
//       .ref(props.databasePath)
//       .once("value");
  
//     let count = 0;
  
//     snapshot.forEach((child) => {
//       const item = child.val();
  
//       if (
        
       
//         item.description &&
//         item.description.toLowerCase().includes(search)
//       ) {
//         count++;
//       }
//     });
  
//     if (props.onLinksCountChange) {
//      props.onLinksCountChange(count);
    
//     }
//   };
   
  
//   useEffect(() => {
//     cursorRef.current = null;
//     setLinks([]);
//     setHasMore(true);
  
//     getTotalCount();
//     loadLinks(true);
//   }, [props.searchText, props.uid]);

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


// export default connect(mapStateToProps)(InfiniteScrollNewDescription);

