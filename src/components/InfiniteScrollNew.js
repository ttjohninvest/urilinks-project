import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNew = (props) => {
  console.log("abc InfiniteScrollNew");
  console.log("abc InfiniteScrollNew, props.databasePath="+props.databasePath);
  console.log("abc InfiniteScrollNew, props.uid="+props.uid);

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);

  const linksRef = useRef([]);






  useEffect(() => {
  console.log("LINKS STATE CHANGED =", links.length);
}, [links]);


useEffect(() => {
  console.log("MOUNT InfiniteScrollNew");

  return () => {
    console.log("UNMOUNT InfiniteScrollNew");
  };
}, []);



  const normalizeSearch = (value) => {
    return (value || "").trim().replace(/\s+/g, " ").toLowerCase();
  };



  const linkMatchesSearch = (item, search) => {
    const description = normalizeSearch(item && item.description);

    return description.includes(search);
  };

  const removeDuplicateLinks = (array) => {
    const ids = new Set();

    return array.filter((link) => {
      if (!link || !link.id) {
        return false;
      }

      if (ids.has(link.id)) {
        return false;
      }

      ids.add(link.id);

      return true;
    });
  };

  const getCacheBaseKey = (search) => {
    return [
      "urilinks",
      "description-v2",
      props.uid || "",
      props.databasePath || "",
      props.theSortBy || "",
      search,
      props.descriptionRefresh || 0,
    ].join("|");
  };

  const getPageCacheKey = (search, pageNumber) => {
    return getCacheBaseKey(search) + "|page|" + pageNumber;
  };

  const getCountCacheKey = (search) => {
    return getCacheBaseKey(search) + "|count";
  };

  const loadLinks = async (reset = false) => {
    if (loadingRef.current) {
      return;
    }

    if (!reset && !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const search = normalizeSearch(props.searchText);

      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      const cachedString = window.sessionStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const cachedPage = JSON.parse(cachedString);

          console.log(
            "InfiniteScrollNewDescription: using cached page " + pageNumber,
          );

          cursorRef.current = cachedPage.cursor || null;

          const cachedMatches = Array.isArray(cachedPage.matches)
            ? cachedPage.matches
            : [];

          let updatedLinks;

          if (reset) {
            updatedLinks = removeDuplicateLinks(cachedMatches);
          } else {
            updatedLinks = removeDuplicateLinks([
              ...linksRef.current,
              ...cachedMatches,
            ]);
          }

          linksRef.current = updatedLinks;

           console.log("2 UPDATED LINKS COUNT =", updatedLinks.length);
      console.log("2 UPDATED LINKS =", JSON.stringify(updatedLinks));

          setLinks(updatedLinks);

          console.log("2 SETLINKS CALLED WITH =", updatedLinks.length);

          setHasMore(cachedPage.hasMore);

          pageRef.current = pageNumber + 1;

          return;
        } catch (error) {
          console.log("Description cache read error:", error);

          window.sessionStorage.removeItem(cacheKey);
        }
      }

      console.log(
        "InfiniteScrollNewDescription: getting Firebase page=" + pageNumber,
      );

      let query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("description");

      if (!reset && cursorRef.current) {
        query = query.startAt(cursorRef.current.value, cursorRef.current.key);
      }

      query = query.limitToFirst(
        PAGE_SIZE + (!reset && cursorRef.current ? 2 : 1),
      );

      const snapshot = await query.once("value");
      console.log("INFINITE SCROLL SNAPSHOT EXISTS =", snapshot.exists());
console.log("INFINITE SCROLL RECORD COUNT =", snapshot.numChildren());
      if (!snapshot.exists()) {
  setLinks([]);
  setHasMore(false);
  setLoading(false);
  props.onLinksCountChange2(0)
  return;
}

      let allFetched = [];

      snapshot.forEach((child) => {
        allFetched.push({
          id: child.key,
          ...child.val(),
        });
      });

      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      const matches = fetchedPage.filter((item) =>
        linkMatchesSearch(item, search),
      );

      if (fetchedPage.length > 0) {
        const lastItem = fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.description || "",
        };
      } else {
        cursorRef.current = null;
      }

      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: moreAvailable,
      };

      window.sessionStorage.setItem(cacheKey, JSON.stringify(pageToCache));

      let updatedLinks;

      if (reset) {
        updatedLinks = removeDuplicateLinks(matches);
      } else {
        updatedLinks = removeDuplicateLinks([...linksRef.current, ...matches]);
      }

      linksRef.current = updatedLinks;

      console.log("1 UPDATED LINKS COUNT =", updatedLinks.length);
      console.log("1 UPDATED LINKS =", JSON.stringify(updatedLinks));

      setLinks(updatedLinks);

      console.log("1 SETLINKS CALLED WITH =", updatedLinks.length);

      setHasMore(moreAvailable);

      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase description search error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };


  const getTotalCount = async () => {
    const search = normalizeSearch(props.searchText);

    const countCacheKey = getCountCacheKey(search);

    
    const cachedCount = window.sessionStorage.getItem(countCacheKey);
    console.log("CACHED COUNT =", cachedCount);

    if (cachedCount !== null) {
      console.log(
        "InfiniteScrollNewDescription: using cached count=" + cachedCount,
      );

      if (props.onLinksCountChange) {
        props.onLinksCountChange(parseInt(cachedCount, 10));
      }

      return;
    }

    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      if (linkMatchesSearch(item, search)) {
        count++;
      }
    });

    window.sessionStorage.setItem(countCacheKey, count.toString());

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }

      if (count === 0) {
        console.log("CLEARING LINKS FROM getTotalCount");
    setLinks([]);
    setHasMore(false);
    setLoading(false);
    props.onLinksCountChange2(0)
  } else props.onLinksCountChange2(count)
   
  };

//   const getTotalCount = async () => {
//   const search = normalizeSearch(props.searchText);

//   const countCacheKey = getCountCacheKey(search);

//   const cachedCount = window.sessionStorage.getItem(countCacheKey);

//   if (cachedCount !== null) {
//     console.log(
//       "InfiniteScrollNewDescription: using cached count=" + cachedCount
//     );

//     let count = parseInt(cachedCount, 10);

//     if (props.onLinksCountChange) {
//       props.onLinksCountChange(count);
//     }

//   //   if (count === 0) {
//   //     setLinks([]);
//   //     setHasMore(false);
//   //     setLoading(false);
//   //     props.onLinksCountChange2(0)
//   //   } else
    
//   //   props.onLinksCountChange2(count)
//   //   return count;
//   // }

//   const snapshot = await firebase
//     .database()
//     .ref(props.databasePath)
//     .once("value");

//   count = 0;

//   snapshot.forEach((child) => {
//     const item = child.val();

//     if (linkMatchesSearch(item, search)) {
//       count++;
//     }
//   });

//   window.sessionStorage.setItem(countCacheKey, count.toString());

//   if (props.onLinksCountChange) {
//     props.onLinksCountChange(count);
//   }

//   if (count === 0) {
//     setLinks([]);
//     setHasMore(false);
//     setLoading(false);
//     props.onLinksCountChange2(0)
//   } else props.onLinksCountChange2(count)

//   return count;
// };

  useEffect(() => {
    cursorRef.current = null;
    pageRef.current = 0;
    linksRef.current = [];
    console.log("CLEARING LINKS FROM useEffect");
    setLinks([]);
    setHasMore(true);

    getTotalCount();
    loadLinks(true);
  }, [
    props.searchText,
    props.uid,
    props.theSortBy,
    props.linksRefresh,
    props.descriptionRefresh,
  ]);

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

        if (!cachedString) {
          continue;
        }

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

    const countKey = getCountCacheKey(search);

    sessionStorage.removeItem(countKey);
  };

  const sessionRemoveLink = (id) => {
    console.log("InfiniteScrollNewDescription, sessionRemoveLink");

    const search = normalizeSearch(props.searchText);

    removeDeletedLinkFromSessionStorage(search, id);

    props.setLinksCount(props.linksCount - 1);
  };

  console.log("RENDER UPDATED LINKS COUNT =", links.length);

  return (
    <div>
      <div>
        {links && links.length === 0
          ? null
          : links.map((link, index) => {
              if (rt === "readonly" && link.showpublic === 0) {
                return null;
              }

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
                    stopScrolling3={props.stopScrolling3}
                    selectedLinkIds={props.selectedLinkIds}
                    handleSelectLink={props.handleSelectLink}
                  />
                </div>
              );
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

export default connect(mapStateToProps)(InfiniteScrollNew);


// import React, { useEffect, useRef, useState } from "react";
// import { connect } from "react-redux";
// import firebase from "firebase/app";
// import "firebase/database";

// import LinkListItem from "./LinkListItem"

// const PAGE_SIZE = 20;

// const params = new URLSearchParams(window.location.search);
// const rt = params.get("x");

// const InfiniteScrollNew = (props) => {
//   console.log("abc InfiniteScrollNew")
//   const [links, setLinks] = useState([]);
//   const [lastKey, setLastKey] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef(null);
//   const isMountedRef = useRef(true);

//   useEffect(() => {
//   isMountedRef.current = true;

//   return () => {
//     isMountedRef.current = false;
//   };
// }, []);

//   // const loadMore = async () => {
//   //   if (loading || !hasMore) return;

//   //   setLoading(true);

//   //   try {
//   //     const ref = firebase.database().ref(props.databasePath);

//   //     let query;

//   //     // First load
//   //     if (lastKey === null) {
//   //       query = ref.orderByKey().limitToFirst(PAGE_SIZE);
//   //     } else {
//   //       // Start with the last item from the previous page.
//   //       // We request one extra because startAt includes lastKey.
//   //       query = ref
//   //         .orderByKey()
//   //         .startAt(lastKey)
//   //         .limitToFirst(PAGE_SIZE + 1);
//   //     }

//   //     const snapshot = await query.once("value");

//   //     const newItems = [];

//   //     snapshot.forEach((childSnapshot) => {
//   //       newItems.push({
//   //         id: childSnapshot.key,
//   //         ...childSnapshot.val(),
//   //       });
//   //     });

//   //     // Remove duplicate first item on later pages
//   //     if (lastKey !== null && newItems.length > 0) {
//   //       if (newItems[0].id === lastKey) {
//   //         newItems.shift();
//   //       }
//   //     }

//   //     if (newItems.length === 0) {
//   //       setHasMore(false);
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     setLinks((oldItems) => [...oldItems, ...newItems]);

//   //     const newLastKey = newItems[newItems.length - 1].id;

//   //     setLastKey(newLastKey);

//   //     if (newItems.length < PAGE_SIZE) {
//   //       setHasMore(false);
//   //     }
//   //   } catch (error) {
//   //     console.log("Infinite scroll error:", error);
//   //   }

//   //   setLoading(false);
//   // };

//   const loadMore = async () => {
//   if (loading || !hasMore) return;

//   setLoading(true);

//   try {
//     const ref = firebase.database().ref(props.databasePath);

//     let query;

//     if (lastKey === null) {
//       query = ref.orderByKey().limitToFirst(PAGE_SIZE);
//     } else {
//       query = ref
//         .orderByKey()
//         .startAt(lastKey)
//         .limitToFirst(PAGE_SIZE + 1);
//     }

//     const snapshot = await query.once("value");

//     // Component may have disappeared while Firebase was loading.
//     if (!isMountedRef.current) return;

//     const newItems = [];

//     snapshot.forEach((childSnapshot) => {
//     console.log("KEY =", childSnapshot.key);
//     console.log("FREQUENCY =", childSnapshot.val().frequency);

//      console.log("InfiniteScrollNew.js, childSnapshot="+JSON.stringify(childSnapshot.val()))
//       newItems.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });

//     if (lastKey !== null && newItems.length > 0) {
//       if (newItems[0].id === lastKey) {
//         newItems.shift();
//       }
//     }

//     if (newItems.length === 0) {
//       setHasMore(false);
//       setLoading(false);
//       return;
//     }

//     setLinks((oldItems) => [...oldItems, ...newItems]);

//     const newLastKey = newItems[newItems.length - 1].id;

//     setLastKey(newLastKey);

//     if (newItems.length < PAGE_SIZE) {
//       setHasMore(false);
//     }
//   } catch (error) {
//     console.log("Infinite scroll error:", error);
//   }

//   if (isMountedRef.current) {
//     setLoading(false);
//   }
// };

//   // Load first page
//   useEffect(() => {
//     loadMore();
//   }, [props.linksRefresh]);





//   // Watch the bottom of the list
//   useEffect(() => {
//     if (!bottomRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];

//         if (entry.isIntersecting) {
//           loadMore();
//         }
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     observer.observe(bottomRef.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, [lastKey, loading, hasMore]);



// // useEffect(() => {
// //   const getTotalCount = async () => {
// //     const snapshot = await firebase
// //       .database()
// //       .ref(props.databasePath)
// //       .once("value");

// //     const total = snapshot.numChildren();

// //     if (props.onLinksCountChange) {
// //       props.onLinksCountChange(total);
// //     }
// //   };

// //   getTotalCount();
// // }, [props.databasePath]);

// // useEffect(() => {
// //   let cancelled = false;

// //   const getTotalCount = async () => {
// //     try {
// //       const snapshot = await firebase
// //         .database()
// //         .ref(props.databasePath)
// //         .once("value");

// //       // Stop here if the component has unmounted
// //       if (cancelled) return;

// //       const total = snapshot.numChildren();

// //       if (props.onLinksCountChange) {
// //         props.onLinksCountChange(total);
// //       }
// //     } catch (error) {
// //       // Don't report an error after the component is gone
// //       if (!cancelled) {
// //         console.log("Error getting total link count:", error);
// //       }
// //     }
// //   };

// //   getTotalCount();

// //   return () => {
// //     cancelled = true;
// //   };
// // }, [props.databasePath]);

// useEffect(() => {
//   let cancelled = false;

//   const getTotalCount = async () => {
//     try {
//       const snapshot = await firebase
//         .database()
//         .ref(props.databasePath)
//         .once("value");

//       if (cancelled) return;

//       const total = snapshot.numChildren();

//       if (props.onLinksCountChange) {
//         props.onLinksCountChange(total);
//       }
//     } catch (error) {
//       if (!cancelled) {
//         console.log("Error getting total link count:", error);
//       }
//     }
//   };

//   getTotalCount();

//   return () => {
//     cancelled = true;
//   };
// }, [props.databasePath]);

// const clearVisibilityCacheOnly = () => {
//     const prefix =
//       "urilinks|visibility|" +
//       (props.uid || "") +
//       "|" +
//       (props.databasePath || "") +
//       "|";

//     const keysToRemove = [];

//     for (let i = 0; i < sessionStorage.length; i++) {
//       const key = sessionStorage.key(i);

//       if (key && key.startsWith(prefix)) {
//         keysToRemove.push(key);
//       }
//     }

//     keysToRemove.forEach((key) => {
//       sessionStorage.removeItem(key);
//     });
//   };


//   const clearVisibilityCache = async () => {
//     clearVisibilityCacheOnly();

//     cursorRef.current = null;
//     pageRef.current = 0;

//     setLinks([]);
//     setHasMore(true);

//     await getTotalCount(true);

//     await loadLinks(true, true);
//   }; 

//    const removeLinkFromDisplayedList = (id) => {
//   setLinks((previousLinks) =>
//     previousLinks.filter((link) => link.id !== id)
//   );

//     if (props.setLinksCount) {
//     props.setLinksCount(props.linksCount - 1);
//   }
// };

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
//       {links && links.length === 0
//                 ? null
//                 :  
//                   links.map((link, index) => {
//                     console.log(
//   "InfiniteScrollNew.js",
//   "parent link id=",
//   link.id,
//   "frequency=",
//   link.frequency,
//   "whole link=",
//   link
// );
// //                    let linkStatus = "checking";

// // if (props.linkStatuses && props.linkStatuses[link.id]) {
// //   linkStatus = props.linkStatuses[link.id].result;
// // }
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
//                             sessionRemoveLink={sessionRemoveLink}
//                             scrollContainerRef={props.scrollContainerRef}
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
//                             clearVisibilityCache={clearVisibilityCacheOnly}
//                             removeLinkFromDisplayedList={removeLinkFromDisplayedList}
//                              stopScrolling3={props.stopScrolling3}
//                              selectedLinkIds={props.selectedLinkIds}
//                              handleSelectLink={props.handleSelectLink}
//                           />
//                         </div>
//                       );
//                   })}

//       {/* When this becomes visible, another page is loaded */}
//       <div ref={bottomRef} style={{ height: "20px" }} />

//       {loading && <p>Loading...</p>}

//       {/* {!hasMore && <p>No more items.</p>} */}
//       {!loading && !hasMore && links.length === 0 && (
//   <p>No results found.</p>
// )}
//     </div>
//   );

 
// };

// //export default InfiniteScrollNew;
// const mapStateToProps = (state) => {

//   return {
   
//     signup: state.signup,
   
//   };
// };

// // const mapStateToProps = (state) => {
// //   return {
// //     links: selectLinks(state.links, state.filters),
// //   };
// // };

// export default connect(mapStateToProps)(InfiniteScrollNew);