import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);

const rt = params.get("x");

const InfiniteScrollNewNoteHashtags = (props) => {
  console.log("abc InfiniteScrollNewNoteHashtags");

  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  /*
   * Used specifically for hashtag
   * searches.
   */
  const [noMoreHashtags, setNoMoreHashtags] = useState(false);

  /*
   * Keeps track of where the previous
   * Firebase query stopped.
   */
  const cursorRef = useRef(null);

  /*
   * Keeps track of cached page number.
   */
  const pageRef = useRef(0);

  /*
   * Prevent duplicate loads before
   * React updates loading state.
   */
  const loadingRef = useRef(false);

  /*
   * IntersectionObserver watches this.
   */
  const loaderRef = useRef(null);

  /*
   * Keeps the current complete list
   * available immediately.
   */
  const linksRef = useRef([]);

  /*
   * Normalize search text.
   */
  const normalizeSearch = (value) => {
    return (value || "").trim().replace(/\s+/g, " ").toLowerCase();
  };

  /*
   * Match only hashtags found in the note.
   */
  const linkMatchesSearch = (item, search) => {
    const note = normalizeSearch(item && item.note);
    const hashtag = normalizeSearch(search);

    if (!hashtag || hashtag.charAt(0) !== "#") {
      return false;
    }

    const hashtags = note.match(/#[^\s#]+/g) || [];

    return hashtags.includes(hashtag);
  };

  /*
   * Get the expected number of links
   * for the clicked hashtag.
   */
  const getHashtagExpectedCount = () => {
    if (props.theSortBy !== "hashtag") {
      return 0;
    }

    const currentSearch = normalizeSearch(props.searchText);

    const savedSearch = normalizeSearch(
      window.sessionStorage.getItem("hashtagSearchTerm"),
    );

    if (currentSearch !== savedSearch) {
      return 0;
    }

    const count = parseInt(
      window.sessionStorage.getItem("hashtagExpectedCount"),
      10,
    );

    if (Number.isNaN(count)) {
      return 0;
    }

    return count;
  };

  /*
   * Prevent duplicate links.
   */
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

  /*
   * Check whether all hashtag links
   * have been found.
   */
  const checkHashtagComplete = (foundLinks) => {
    if (props.theSortBy !== "hashtag") {
      return false;
    }

    const expectedCount = getHashtagExpectedCount();

    console.log("Hashtag expected count=", expectedCount);

    console.log("Hashtag links found=", foundLinks.length);

    if (expectedCount > 0 && foundLinks.length >= expectedCount) {
      console.log("All expected hashtag links found");

      setNoMoreHashtags(true);

      setHasMore(false);

      return true;
    }

    return false;
  };

  /*
   * Unique cache key.
   */
  const getCacheBaseKey = (search) => {
    return [
      "urilinks",
      "note-hashtags-v1",
      props.uid || "",
      props.databasePath || "",
      props.theSortBy || "",
      search,
      props.descriptionRefresh || 0,
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
    if (loadingRef.current) {
      return;
    }

    if (!reset && !hasMore) {
      return;
    }

    if (!reset && props.theSortBy === "hashtag" && noMoreHashtags) {
      return;
    }

    loadingRef.current = true;

    setLoading(true);

    try {
      const search = normalizeSearch(props.searchText);

      const pageNumber = reset ? 0 : pageRef.current;

      const cacheKey = getPageCacheKey(search, pageNumber);

      /*
       * CHECK SESSION CACHE FIRST
       */

      const cachedString = window.sessionStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const cachedPage = JSON.parse(cachedString);

          console.log(
            "InfiniteScrollNewNoteHashtags: using cached page " + pageNumber,
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

          setLinks(updatedLinks);

          const hashtagComplete = checkHashtagComplete(updatedLinks);

          if (hashtagComplete === false) {
            setHasMore(cachedPage.hasMore);
          }

          pageRef.current = pageNumber + 1;

          return;
        } catch (error) {
          console.log("Note hashtag cache read error:", error);

          window.sessionStorage.removeItem(cacheKey);
        }
      }

      /*
       * NOT CACHED - GET FROM FIREBASE
       */

      console.log(
        "InfiniteScrollNewNoteHashtags: getting Firebase page=" + pageNumber,
      );

      let query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("note");

      /*
       * Continue from previous cursor.
       */
      if (!reset && cursorRef.current) {
        query = query.startAt(cursorRef.current.value, cursorRef.current.key);
      }

      /*
       * Request extra records.
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
       * startAt includes previous
       * cursor record.
       */
      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      /*
       * Search hashtags in note only.
       */
      const matches = fetchedPage.filter((item) =>
        linkMatchesSearch(item, search),
      );

      /*
       * Save cursor.
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
        "InfiniteScrollNewNoteHashtags, matches=" + JSON.stringify(matches),
      );

      /*
       * SAVE PAGE IN SESSION CACHE
       */

      const pageToCache = {
        matches: matches,
        cursor: cursorRef.current,
        hasMore: moreAvailable,
      };

      window.sessionStorage.setItem(cacheKey, JSON.stringify(pageToCache));

      /*
       * BUILD COMPLETE RESULTS LIST
       */

      let updatedLinks;

      if (reset) {
        updatedLinks = removeDuplicateLinks(matches);
      } else {
        updatedLinks = removeDuplicateLinks([...linksRef.current, ...matches]);
      }

      linksRef.current = updatedLinks;

      setLinks(updatedLinks);

      const hashtagComplete = checkHashtagComplete(updatedLinks);

      if (hashtagComplete === false) {
        setHasMore(moreAvailable);
      }

      pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log("Firebase note hashtag search error:", error);
    } finally {
      loadingRef.current = false;

      setLoading(false);
    }
  }; /*
   * GET TOTAL COUNT
   */
  const getTotalCount = async () => {
    const search = normalizeSearch(props.searchText);

    /*
     * For a hashtag search,
     * SeeHashTagsPage may already
     * know the exact count.
     */
    if (props.theSortBy === "hashtag") {
      const expectedCount = getHashtagExpectedCount();

      if (expectedCount > 0) {
        console.log("Using hashtag item.count=", expectedCount);

        if (props.onLinksCountChange) {
          props.onLinksCountChange(expectedCount);
        }

        return;
      }
    }

    const countCacheKey = getCountCacheKey(search);

    /*
     * Check session cache first.
     */
    const cachedCount = window.sessionStorage.getItem(countCacheKey);

    if (cachedCount !== null) {
      console.log(
        "InfiniteScrollNewNoteHashtags: using cached count=" + cachedCount,
      );

      if (props.onLinksCountChange) {
        props.onLinksCountChange(parseInt(cachedCount, 10));
      }

      return;
    }

    /*
     * Not cached.
     */
    const snapshot = await firebase
      .database()
      .ref(props.databasePath)
      .once("value");

    let count = 0;

    snapshot.forEach((child) => {
      const item = child.val();

      /*
       * Search hashtags
       * in note only.
       */
      if (linkMatchesSearch(item, search)) {
        count++;
      }
    });

    window.sessionStorage.setItem(countCacheKey, count.toString());

    if (props.onLinksCountChange) {
      props.onLinksCountChange(count);
    }
  };

  /*
   * Start a new search.
   */
  useEffect(() => {
    cursorRef.current = null;

    pageRef.current = 0;

    linksRef.current = [];

    setLinks([]);

    setHasMore(true);

    setNoMoreHashtags(false);

    getTotalCount();

    loadLinks(true);
  }, [
    props.searchText,
    props.uid,
    props.theSortBy,
    props.linksRefresh,
    props.descriptionRefresh,
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
          !noMoreHashtags
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
  }, [loading, hasMore, noMoreHashtags, props.searchText]);

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
    console.log("InfiniteScrollNewNoteHashtags, sessionRemoveLink");

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
                    clearVisibilityCache={clearVisibilityCacheOnly}
                    removeLinkFromDisplayedList={removeLinkFromDisplayedList}
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

export default connect(mapStateToProps)(InfiniteScrollNewNoteHashtags);
