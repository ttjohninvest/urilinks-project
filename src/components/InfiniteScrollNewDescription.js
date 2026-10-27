import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNewDescription = (props) => {
  console.log("abc InfiniteScrollNewDescription")
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
            "infiniteScrollNewDescription.js",
  "CACHED MATCHES frequencies=",
  (cachedPage.matches || []).map((link) => ({
    id: link.id,
    frequency: link.frequency,
    likes: link.likes
  }))
);

console.log(
  "InfiniteScrollNewDescription: using cached page " +
    pageNumber,
);

          // console.log(
          //   "InfiniteScrollNewDescription: using cached page " +
          //     pageNumber,
          // );

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
         console.log(
          "InfiniteScrollNewDescription.js",
    "FIREBASE RAW",
    child.key,
    "frequency=",
    child.val().frequency,
    "likes=",
    child.val().likes,
    "child.val()=",
    JSON.stringify(child.val())
  );

        allFetched.push({
          id: child.key,
          ...child.val(),
        });
      });

      console.log("AFTER FOREACH");
console.log("allFetched length =", allFetched.length);

      const testLink = allFetched.find(
  (item) => item.id === "-P3KU1SrtMy2HAnMqBlF"
);

console.log(
  "TEST LINK frequency=",
  testLink && testLink.frequency
);

console.log(
  "TEST LINK likes=",
  testLink && testLink.likes
);

//      console.log(
//   "ALLFETCHED frequencies=",
//   JSON.stringify(
//     allFetched.map((item) => ({
//       id: item.id,
//       frequency: item.frequency,
//     }))
//   )
// );

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

     const matchTest = matches.find(
  (item) => item.id === "-P3KU1SrtMy2HAnMqBlF"
);

console.log(
  "MATCHES TEST frequency=",
  matchTest ? matchTest.frequency : "not found"
);

console.log(
  "MATCHES TEST likes=",
  matchTest ? matchTest.likes : "not found"
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




const beforeSetLinks = matches.find(
  (item) => item.id === "-P3KU1SrtMy2HAnMqBlF"
);

console.log(
  "BEFORE setLinks frequency=",
  beforeSetLinks ? beforeSetLinks.frequency : "not found"
);

console.log(
  "BEFORE setLinks likes=",
  beforeSetLinks ? beforeSetLinks.likes : "not found"
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
      console.log("InfiniteScrollNewDescription.js, item="+JSON.stringify(item))

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

  useEffect(() => {
  const stateTest = links.find(
    (item) => item.id === "-P3KU1SrtMy2HAnMqBlF"
  );

  console.log(
    "STATE UPDATED frequency=",
    stateTest ? stateTest.frequency : "not found"
  );
}, [links]);

const removeDeletedLinkFromSessionStorage = (search, id) => {
  const baseKey = getCacheBaseKey(search);

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);

    if (
      key &&
      key.startsWith(baseKey + "|page|")
    ) {
      const cachedString =
        sessionStorage.getItem(key);

      if (!cachedString) continue;

      try {
        const cachedPage =
          JSON.parse(cachedString);

        if (Array.isArray(cachedPage.matches)) {
          cachedPage.matches =
            cachedPage.matches.filter(
              (link) => link.id !== id
            );

          sessionStorage.setItem(
            key,
            JSON.stringify(cachedPage)
          );
        }
      } catch (error) {
        console.log(
          "Error updating sessionStorage:",
          error
        );
      }
    }
  }

  // Remove the cached count because it is now outdated.
  const countKey = getCountCacheKey(search);

  sessionStorage.removeItem(countKey);
};

const sessionRemoveLink=(id) => {
  console.log("inifinteScrollNewDescription.js, sessionRemoveLink, about to call sessionStorage.clear()")
  //normalizeSearch(props.searchText)
  //sessionStorage.clear()
   const search =
      normalizeSearch(props.searchText);

    removeDeletedLinkFromSessionStorage(
      search,
      id
    );

    props.setLinksCount(props.linksCount-1)
}


const stateTest = links.find(
  (item) => item.id === "-P3KU1SrtMy2HAnMqBlF"
);

console.log(
  "STATE links frequency=",
  stateTest ? stateTest.frequency : "not found"
);




  return (
    <div>
      <div>
        {links && links.length === 0
          ? null
          : links.map((link, index) => {
            console.log(
  "RENDERING LINK",
  link.id,
  "frequency=",
  link.frequency
);
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
                    sessionRemoveLink={sessionRemoveLink}
                    scrollContainerRef={
                      props.scrollContainerRef
                    }
                    //frequency={link.frequency}
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

