import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);

const rt = params.get("x");

const InfiniteScrollNewLinksShowPublicOrPrivate = (props) => {
  console.log("abc InfiniteScrollNewLinksShowPublicOrPrivate");

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);

  /*
   * Number of links we expect to find.
   */
  const expectedCountRef = useRef(null);

  /*
   * Number of matching links loaded so far.
   */
  const loadedCountRef = useRef(0);

  const lastLinksRefreshRef = useRef(props.linksRefresh);

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
      props.descriptionRefresh || 0,
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
        const count = parseInt(cachedCount, 10);

        expectedCountRef.current = count;

        if (props.onLinksCountChange) {
          props.onLinksCountChange(count);
        }

        return count;
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

    expectedCountRef.current = count;

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }

    return count;
  };

  const loadLinks = async (reset = false, ignoreCache = false) => {
    if (loadingRef.current) {
      return;
    }

    /*
     * If the count is zero,
     * there is nothing to load.
     */
    if (expectedCountRef.current === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    /*
     * Stop if all expected links
     * have already been found.
     */
    if (
      expectedCountRef.current !== null &&
      loadedCountRef.current >= expectedCountRef.current
    ) {
      setHasMore(false);
      setLoading(false);
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

            const cachedMatches = cachedPage.matches || [];

            cursorRef.current = cachedPage.cursor || null;

            let newLoadedCount;

            if (reset) {
              setLinks(cachedMatches);

              newLoadedCount = cachedMatches.length;
            } else {
              setLinks((previousLinks) => [...previousLinks, ...cachedMatches]);

              newLoadedCount = loadedCountRef.current + cachedMatches.length;
            }

            loadedCountRef.current = newLoadedCount;

            /*
             * Stop as soon as all expected
             * matching links have been found.
             */
            if (
              expectedCountRef.current !== null &&
              newLoadedCount >= expectedCountRef.current
            ) {
              setHasMore(false);
            } else {
              setHasMore(cachedPage.hasMore);
            }

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

      let newLoadedCount;

      if (reset) {
        newLoadedCount = matches.length;
      } else {
        newLoadedCount = loadedCountRef.current + matches.length;
      }

      loadedCountRef.current = newLoadedCount;

      /*
       * Stop when all matching links
       * have been found.
       */
      let shouldContinue = moreAvailable;

      if (
        expectedCountRef.current !== null &&
        newLoadedCount >= expectedCountRef.current
      ) {
        shouldContinue = false;
      }

      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: shouldContinue,
      };

      window.sessionStorage.setItem(cacheKey, JSON.stringify(pageToCache));

      if (reset) {
        setLinks(matches);
      } else {
        setLinks((previousLinks) => [...previousLinks, ...matches]);
      }

      setHasMore(shouldContinue);

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
    loadedCountRef.current = 0;
    expectedCountRef.current = null;

    setLinks([]);
    setHasMore(true);

    const count = await getTotalCount(true);

    /*
     * Nothing matches this view.
     */
    if (count === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    await loadLinks(true, true);
  };

  const removeLinkFromDisplayedList = (id) => {
    setLinks((previousLinks) => previousLinks.filter((link) => link.id !== id));

    if (loadedCountRef.current > 0) {
      loadedCountRef.current = loadedCountRef.current - 1;
    }

    if (props.setLinksCount) {
      props.setLinksCount(props.linksCount - 1);
    }
  };

  /*
   * Start over when the selected
   * public/private view changes.
   */
  useEffect(() => {
    const forceRefresh = lastLinksRefreshRef.current !== props.linksRefresh;

    lastLinksRefreshRef.current = props.linksRefresh;

    console.log(
      "REFRESH EFFECT FIRED, props.linksRefresh=",
      props.linksRefresh,
      "forceRefresh=",
      forceRefresh,
    );

    cursorRef.current = null;
    pageRef.current = 0;
    loadedCountRef.current = 0;
    expectedCountRef.current = null;

    setLinks([]);
    setHasMore(true);

    if (forceRefresh) {
      clearVisibilityCacheOnly();
    }

    const refreshLinks = async () => {
      const count = await getTotalCount(forceRefresh);

      /*
       * For example:
       *
       * All links are public and the user
       * selects Show Private Links.
       *
       * Count = 0, so stop here.
       */
      if (count === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      await loadLinks(true, forceRefresh);
    };

    refreshLinks();
  }, [
    props.searchText,
    props.uid,
    props.visibility,
    props.databasePath,
    props.linksRefresh,
  ]);

  /*
   * Infinite scroll.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          !loadingRef.current &&
          hasMore &&
          expectedCountRef.current !== 0 &&
          loadedCountRef.current < expectedCountRef.current
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

    if (loadedCountRef.current > 0) {
      loadedCountRef.current = loadedCountRef.current - 1;
    }

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

export default connect(mapStateToProps)(
  InfiniteScrollNewLinksShowPublicOrPrivate,
);
