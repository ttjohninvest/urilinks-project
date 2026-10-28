import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);

const rt = params.get("x");

const LinksShowPublicOrPrivate = (props) => {
  console.log("abc LinksShowPublicOrPrivate")
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);

  const normalizeSearch = (value) => {
    return (value || "").trim().replace(/\s+/g, " ").toLowerCase();
  };

  const getVisibility = () => {
    return Number(props.visibility);
  };

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

  const getPageCacheKey = (search, pageNumber) => {
    return getCacheBaseKey(search) + "|page|" + pageNumber;
  };

  const getCountCacheKey = (search) => {
    return getCacheBaseKey(search) + "|count";
  };

  /*
   * Remove all cached public/private
   * results for this user and path.
   */

// const clearVisibilityCacheOnly = () => {
//   const prefix =
//     "urilinks|visibility|" +
//     (props.uid || "") +
//     "|" +
//     (props.databasePath || "") +
//     "|";

//   const keysToRemove = [];

//   for (let i = 0; i < sessionStorage.length; i++) {
//     const key = sessionStorage.key(i);

//     if (key && key.startsWith(prefix)) {
//       keysToRemove.push(key);
//     }
//   }

//   keysToRemove.forEach((key) => {
//     sessionStorage.removeItem(key);
//   });
// };

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

  const getTotalCount = async (ignoreCache = false) => {
    const search = normalizeSearch(props.searchText);

    const visibility = getVisibility();

    const countCacheKey = getCountCacheKey(search);

    if (!ignoreCache) {
      const cachedCount = window.sessionStorage.getItem(countCacheKey);

      if (cachedCount !== null) {
        if (props.onLinksCountChange) {
          props.onLinksCountChange(parseInt(cachedCount, 10));
        }

        return;
      }
    }

    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      const description = (item.description || "").toLowerCase();

      if (
        Number(item.showpublic) === visibility &&
        description.includes(search)
      ) {
        count++;
      }
    });

    window.sessionStorage.setItem(countCacheKey, count.toString());

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }
  };

  const loadLinks = async (reset = false, ignoreCache = false) => {
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

      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      /*
       * Use cache during normal loading.
       *
       * When showpublic changes,
       * ignoreCache will be true.
       */
      if (!ignoreCache) {
        const cachedString = window.sessionStorage.getItem(cacheKey);

        if (cachedString) {
          try {
            const cachedPage = JSON.parse(cachedString);

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
      }

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

      /*
       * Public  = 1
       * Private = 0
       */
      const matches = fetchedPage.filter((item) => {
        const description = (item.description || "").toLowerCase();

        return (
          Number(item.showpublic) === visibility && description.includes(search)
        );
      });

      if (fetchedPage.length > 0) {
        const lastItem = fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.description,
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

      if (reset) {
        setLinks(matches);
      } else {
        setLinks((previousLinks) => [...previousLinks, ...matches]);
      }

      setHasMore(moreAvailable);

      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase visibility search error:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };


  /*
   * Called after showpublic
   * is changed in Firebase.
   */


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
  setLinks((previousLinks) =>
    previousLinks.filter((link) => link.id !== id)
  );

    if (props.setLinksCount) {
    props.setLinksCount(props.linksCount - 1);
  }
};
  
  
  
  /*
   * Start over when the selected
   * public/private view changes.
   */
  useEffect(() => {
     console.log(
    "REFRESH EFFECT FIRED, props.linksRefresh=",
    props.linksRefresh
  );
    cursorRef.current = null;
    pageRef.current = 0;

    setLinks([]);
    setHasMore(true);

    getTotalCount();
    loadLinks(true);
  }, [props.searchText, props.uid, props.visibility, props.databasePath, props.linksRefresh]);

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
  }, [loading, hasMore, props.searchText, props.visibility]);

  /*
   * Remove deleted links
   * from sessionStorage.
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

    const countKey = getCountCacheKey(search);

    sessionStorage.removeItem(countKey);
  };

  const sessionRemoveLink = (id) => {
    const search = normalizeSearch(props.searchText);

    removeDeletedLinkFromSessionStorage(search, id);

    if (props.setLinksCount) {
      props.setLinksCount(props.linksCount - 1);
    }

    setLinks((previousLinks) => previousLinks.filter((link) => link.id !== id));
  };

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
                    clearVisibilityCache={clearVisibilityCacheOnly}
                    removeLinkFromDisplayedList={removeLinkFromDisplayedList}
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
