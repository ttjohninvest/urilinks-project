import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem"

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNew = (props) => {
  console.log("InfiniteScrollNew 2")
  const [links, setLinks] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
  isMountedRef.current = true;

  return () => {
    isMountedRef.current = false;
  };
}, []);

  // const loadMore = async () => {
  //   if (loading || !hasMore) return;

  //   setLoading(true);

  //   try {
  //     const ref = firebase.database().ref(props.databasePath);

  //     let query;

  //     // First load
  //     if (lastKey === null) {
  //       query = ref.orderByKey().limitToFirst(PAGE_SIZE);
  //     } else {
  //       // Start with the last item from the previous page.
  //       // We request one extra because startAt includes lastKey.
  //       query = ref
  //         .orderByKey()
  //         .startAt(lastKey)
  //         .limitToFirst(PAGE_SIZE + 1);
  //     }

  //     const snapshot = await query.once("value");

  //     const newItems = [];

  //     snapshot.forEach((childSnapshot) => {
  //       newItems.push({
  //         id: childSnapshot.key,
  //         ...childSnapshot.val(),
  //       });
  //     });

  //     // Remove duplicate first item on later pages
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

  //   setLoading(false);
  // };

  const loadMore = async () => {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const ref = firebase.database().ref(props.databasePath);

    let query;

    if (lastKey === null) {
      query = ref.orderByKey().limitToFirst(PAGE_SIZE);
    } else {
      query = ref
        .orderByKey()
        .startAt(lastKey)
        .limitToFirst(PAGE_SIZE + 1);
    }

    const snapshot = await query.once("value");

    // Component may have disappeared while Firebase was loading.
    if (!isMountedRef.current) return;

    const newItems = [];

    snapshot.forEach((childSnapshot) => {
      newItems.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    if (lastKey !== null && newItems.length > 0) {
      if (newItems[0].id === lastKey) {
        newItems.shift();
      }
    }

    if (newItems.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setLinks((oldItems) => [...oldItems, ...newItems]);

    const newLastKey = newItems[newItems.length - 1].id;

    setLastKey(newLastKey);

    if (newItems.length < PAGE_SIZE) {
      setHasMore(false);
    }
  } catch (error) {
    console.log("Infinite scroll error:", error);
  }

  if (isMountedRef.current) {
    setLoading(false);
  }
};

  // Load first page
  useEffect(() => {
    loadMore();
  }, []);





  // Watch the bottom of the list
  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lastKey, loading, hasMore]);



// useEffect(() => {
//   const getTotalCount = async () => {
//     const snapshot = await firebase
//       .database()
//       .ref(props.databasePath)
//       .once("value");

//     const total = snapshot.numChildren();

//     if (props.onLinksCountChange) {
//       props.onLinksCountChange(total);
//     }
//   };

//   getTotalCount();
// }, [props.databasePath]);

// useEffect(() => {
//   let cancelled = false;

//   const getTotalCount = async () => {
//     try {
//       const snapshot = await firebase
//         .database()
//         .ref(props.databasePath)
//         .once("value");

//       // Stop here if the component has unmounted
//       if (cancelled) return;

//       const total = snapshot.numChildren();

//       if (props.onLinksCountChange) {
//         props.onLinksCountChange(total);
//       }
//     } catch (error) {
//       // Don't report an error after the component is gone
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

useEffect(() => {
  let cancelled = false;

  const getTotalCount = async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref(props.databasePath)
        .once("value");

      if (cancelled) return;

      const total = snapshot.numChildren();

      if (props.onLinksCountChange) {
        props.onLinksCountChange(total);
      }
    } catch (error) {
      if (!cancelled) {
        console.log("Error getting total link count:", error);
      }
    }
  };

  getTotalCount();

  return () => {
    cancelled = true;
  };
}, [props.databasePath]);

  return (
    <div>
      {links && links.length === 0
                ? null
                :  
                  links.map((link, index) => {
//                    let linkStatus = "checking";

// if (props.linkStatuses && props.linkStatuses[link.id]) {
//   linkStatus = props.linkStatuses[link.id].result;
// }
                    if (
                      rt === "readonly" &&
                      link.showpublic === 0
                      //|| link.archive === 1
                    )
                      return null; //<div key={link.id + "1"}></div>;
                    else
                      return (
                        <div
                          id={link.id}
                          key={link.id}
                          className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                        >
                          <LinkListItem
                            scrollContainerRef={props.scrollContainerRef}
                            link={link}
                            rt={rt}
                            key={link.id}
                            {...link}
                            //linkStatuses = {props.linkStatuses} //{props.linkStatues && props.linkStatuses[link.id]?props.linkStatuses[link.id].result:null}
                            //linkStatus={props.linkStatus}
                            
                            index={index}
                            signup={props.signup.signup}
                            idexists={props.idexists}
                            theSortBy={props.theSortBy}
                            // videoId={props.videoId}
                            // playInPlaceVideo={props.playInPlaceVideo}
                          />
                        </div>
                      );
                  })}

      {/* When this becomes visible, another page is loaded */}
      <div ref={bottomRef} style={{ height: "20px" }} />

      {loading && <p>Loading...</p>}

      {/* {!hasMore && <p>No more items.</p>} */}
      {!loading && !hasMore && links.length === 0 && (
  <p>No results found.</p>
)}
    </div>
  );

 
};

//export default InfiniteScrollNew;
const mapStateToProps = (state) => {

  return {
   
    signup: state.signup,
   
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(InfiniteScrollNew);