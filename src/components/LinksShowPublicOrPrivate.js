import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const LinksShowPublicOrPrivate = (props) => {
  console.log("in LinksShowPublicOrPrivate")
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
   */
  const normalizeSearch = (value) => {
    return (value || "").trim().replace(/\s+/g, " ").toLowerCase();
  };

  /*
   * Convert visibility to a number.
   *
   * visibility={1} -> public
   * visibility={0} -> private
   */
  const getVisibility = () => {
    return Number(props.visibility);
  };

  /*
   * Create a unique cache key.
   *
   * visibility is included so the public
   * and private caches stay separate.
   */
  const getCacheBaseKey = (search) => {
    return [
      "urilinks",
      "visibility",
      props.uid || "",
      props.databasePath || "",
      props.theSortBy || "",
      getVisibility(),
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
   * Cache key for the total count.
   */
  const getCountCacheKey = (search) => {
    return getCacheBaseKey(search) + "|count";
  };

  /*
   * --------------------------------------------------
   * LOAD LINKS
   * --------------------------------------------------
   */
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

      const visibility = getVisibility();

      /*
       * Page zero is the first page.
       */
      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      /*
       * --------------------------------------------------
       * FIRST CHECK SESSION STORAGE
       * --------------------------------------------------
       */
      const cachedString = window.sessionStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const cachedPage = JSON.parse(cachedString);

          /*
           * Restore cursor.
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
          console.log("Cache read error:", error);

          window.sessionStorage.removeItem(cacheKey);
        }
      }

      /*
       * --------------------------------------------------
       * GET PAGE FROM FIREBASE
       * --------------------------------------------------
       */
      let query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("description");

      /*
       * Continue where previous page stopped.
       */
      if (!reset && cursorRef.current) {
        query = query.startAt(cursorRef.current.value, cursorRef.current.key);
      }

      /*
       * Ask Firebase for one extra record.
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
       * startAt includes the cursor record.
       * Remove the duplicate.
       */
      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      /*
       * Actual 20 Firebase records
       * belonging to this page.
       */
      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      /*
       * --------------------------------------------------
       * FILTER BY VISIBILITY
       * --------------------------------------------------
       *
       * visibility = 1
       * show only showpublic === 1
       *
       * visibility = 0
       * show only showpublic === 0
       *
       * It also keeps your description search.
       */

       console.log(
  "props.visibility=",
  props.visibility,
  "type=",
  typeof props.visibility
);


      // const matches = fetchedPage.filter(
      //   (item) =>
      //     Number(item.showpublic) === visibility &&
      //     item.description &&
      //     item.description.toLowerCase().includes(search),
      // );

      const matches = fetchedPage.filter((item) => {
  const sameVisibility =
    item.showpublic === props.visibility;

  console.log(
    "description=",
    item.description,
    "showpublic=",
    item.showpublic,
    "visibility=",
    props.visibility,
    "sameVisibility=",
    sameVisibility
  );

  return sameVisibility;
});

      /*
       * Save cursor from LAST Firebase record,
       * not last matching record.
       */
      if (fetchedPage.length > 0) {
        const lastItem = fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.description,
        };
      } else {
        cursorRef.current = null;
      }

      /*
       * --------------------------------------------------
       * STORE PAGE IN SESSION CACHE
       * --------------------------------------------------
       */
      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: moreAvailable,
      };

      window.sessionStorage.setItem(cacheKey, JSON.stringify(pageToCache));

      /*
       * Display results.
       */
      if (reset) {
        setLinks(matches);
      } else {
        setLinks((previousLinks) => [...previousLinks, ...matches]);
      }

      setHasMore(moreAvailable);

      /*
       * Next page number.
       */
      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase visibility search error:", error);
    } finally {
      loadingRef.current = false;

      setLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * GET TOTAL COUNT
   * --------------------------------------------------
   */
  const getTotalCount = async () => {
    const search = normalizeSearch(props.searchText);

    const visibility = getVisibility();

    const countCacheKey = getCountCacheKey(search);

    /*
     * Check cached count first.
     */
    const cachedCount = window.sessionStorage.getItem(countCacheKey);

    if (cachedCount !== null) {
      if (props.onLinksCountChange) {
        props.onLinksCountChange(parseInt(cachedCount, 10));
      }

      return;
    }

    /*
     * Count matching Firebase records.
     */
    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      if (
        Number(item.showpublic) === visibility &&
        item.description &&
        item.description.toLowerCase().includes(search)
      ) {
        count++;
      }
    });

    /*
     * Cache count.
     */
    window.sessionStorage.setItem(countCacheKey, count.toString());

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }
  };

  /*
   * --------------------------------------------------
   * START NEW SEARCH
   * --------------------------------------------------
   *
   * Notice that visibility is included here.
   *
   * If visibility changes from 1 to 0,
   * the list starts over automatically.
   */
  useEffect(() => {
    cursorRef.current = null;
    pageRef.current = 0;

    setLinks([]);
    setHasMore(true);

    getTotalCount();
    loadLinks(true);
  }, [props.searchText, props.uid, props.visibility]);

  /*
   * --------------------------------------------------
   * INFINITE SCROLL
   * --------------------------------------------------
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
  }, [loading, hasMore, props.searchText, props.visibility]);

  /*
   * --------------------------------------------------
   * REMOVE DELETED LINK FROM CACHE
   * --------------------------------------------------
   */
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

    /*
     * Count is outdated after deletion.
     */
    const countKey = getCountCacheKey(search);

    sessionStorage.removeItem(countKey);
  };

  const sessionRemoveLink = (id) => {
    const search = normalizeSearch(props.searchText);

    removeDeletedLinkFromSessionStorage(search, id);

    if (props.setLinksCount) {
      props.setLinksCount(props.linksCount - 1);
    }

    /*
     * Also remove it immediately
     * from the displayed list.
     */
    setLinks((previousLinks) => previousLinks.filter((link) => link.id !== id));
  };

  /*
   * --------------------------------------------------
   * JSX
   * --------------------------------------------------
   */
  return (
    <div>
      <div>
        {links && links.length === 0
          ? null
          : links.map((link, index) => {
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

export default connect(mapStateToProps)(LinksShowPublicOrPrivate);
