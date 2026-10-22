import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import {
  setHashTags,
  extractHashtags,
  countTimesEachHashTagIsUsed,
} from "../actions/links";

const PAGE_SIZE = 20;

const InfiniteScrollNewHashtags = (props) => {
    console.log("InfiniteScrollNewHashtags COMPONENT RENDERED");

    
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const loaderRef = useRef(null);
  const isMountedRef = useRef(true);

  /*
   * Stores all hashtags found so far.
   */
  const hashtagsRef = useRef([]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const buildHashtagArray = () => {

 console.log("buildHashtagArray CALLED");

  console.log(
    "hashtagsRef.current=",
    JSON.stringify(hashtagsRef.current)
  );



    let hashTagsWithCount =
      countTimesEachHashTagIsUsed(hashtagsRef.current);

    if (!Array.isArray(hashTagsWithCount)) {
      hashTagsWithCount = [];
    }

    /*
     * Sort alphabetically.
     */
    hashTagsWithCount.sort((a, b) => {
      const aDescription =
        a && a.description
          ? a.description.toLowerCase()
          : "";

      const bDescription =
        b && b.description
          ? b.description.toLowerCase()
          : "";

      if (aDescription < bDescription) return -1;
      if (aDescription > bDescription) return 1;

      return 0;
    });

    /*
     * Remove duplicates.
     */
    const seen = {};
    const finalHashtags = [];

    hashTagsWithCount.forEach((hashtag) => {
      if (
        hashtag &&
        hashtag.description !== undefined &&
        hashtag.description !== null
      ) {
        const key =
          hashtag.description.toLowerCase();

        if (!seen[key]) {
          seen[key] = true;
          finalHashtags.push(hashtag);
        }
      }
    });

    console.log(
      "InfiniteScrollNewHashtags finalHashtags=",
      finalHashtags,
    );

    props.setHashTags(finalHashtags);
  };

  const loadHashtags = async (reset = false) => {

 console.log("loadHashtags CALLED");
  console.log("reset=", reset);
  console.log("loading=", loading);
  console.log("hasMore=", hasMore);
  console.log("props.uid=", props.uid);

  if (loading) {
    console.log("RETURNING because loading is true");
    return;
  }

  if (!reset && !hasMore) {
    console.log("RETURNING because hasMore is false");
    return;
  }

  if (!props.uid) {
    console.log("RETURNING because props.uid is missing");
    return;
  }






    if (loading) return;

    if (!reset && !hasMore) return;

    if (!props.uid) return;

    setLoading(true);

    try {
      let query = firebase
        .database()
        .ref(`users/${props.uid}/links`)
        .orderByKey();

      if (reset) {
        cursorRef.current = null;
        hashtagsRef.current = [];
      }

      if (cursorRef.current !== null) {
        query = query
          .startAt(cursorRef.current)
          .limitToFirst(PAGE_SIZE + 1);
      } else {
        query = query.limitToFirst(PAGE_SIZE + 1);
      }

      const snapshot = await query.once("value");

      console.log(
  "Firebase snapshot received, children=",
  snapshot.numChildren()
);

      let pageLinks = [];

      snapshot.forEach((childSnapshot) => {
        pageLinks.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      /*
       * startAt() returns the previous cursor again.
       * Remove it.
       */
      if (
        cursorRef.current !== null &&
        pageLinks.length > 0 &&
        pageLinks[0].id === cursorRef.current
      ) {
        pageLinks.shift();
      }

      const moreAvailable =
        pageLinks.length > PAGE_SIZE;

      if (moreAvailable) {
        pageLinks = pageLinks.slice(0, PAGE_SIZE);
      }

      if (pageLinks.length > 0) {
        cursorRef.current =
          pageLinks[pageLinks.length - 1].id;
      }

      /*
       * Extract hashtags from this page only.
       */
      pageLinks.forEach((link) => {
        const hashtags = extractHashtags(link);

        if (Array.isArray(hashtags)) {
          hashtagsRef.current.push(...hashtags);
        }
      });

      /*
       * Rebuild the complete hashtag array using
       * everything found so far.
       */


console.log(
  "about to call buildHashtagArray"
);


      buildHashtagArray();

      if (isMountedRef.current) {
        setHasMore(moreAvailable);
      }
    } catch (error) {
      console.log(
        "InfiniteScrollNewHashtags error=",
        error,
      );
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  /*
   * First page.
   */
  useEffect(() => {
    hashtagsRef.current = [];
    cursorRef.current = null;

    setHasMore(true);

    loadHashtags(true);
  }, [props.uid]);

  /*
   * Load another page when this element becomes visible.
   */
  useEffect(() => {
    const element = loaderRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading
        ) {
          loadHashtags(false);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  return (
    <div ref={loaderRef}>
      {loading && <div>Loading hashtags...</div>}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setHashTags: (hashtags) =>
    dispatch(setHashTags(hashtags)),
});

export default connect(
  null,
  mapDispatchToProps,
)(InfiniteScrollNewHashtags);