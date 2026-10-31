import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem";

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNewDescription = (props) => {
  console.log("abc InfiniteScrollNewDescription");

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);

  const linksRef = useRef([]);

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

          setLinks(updatedLinks);

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

      setLinks(updatedLinks);

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
  };

  useEffect(() => {
    cursorRef.current = null;
    pageRef.current = 0;
    linksRef.current = [];

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

export default connect(mapStateToProps)(InfiniteScrollNewDescription);
