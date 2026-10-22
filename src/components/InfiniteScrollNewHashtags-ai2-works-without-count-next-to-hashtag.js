import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import firebase from "firebase/app";
import "firebase/database";

import { connect } from "react-redux";

import {
  setHashTags,
  extractHashtags,
  countTimesEachHashTagIsUsed,
} from "../actions/links";


const PAGE_SIZE = 10;


const InfiniteScrollNewHashtags = (props) => {
  console.log(
    "InfiniteScrollNewHashtags COMPONENT RENDERED",
  );

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /*
   * Firebase paging cursor.
   */
  const cursorRef = useRef(null);

  /*
   * All hashtags found from all pages loaded so far.
   */
  const hashtagsRef = useRef([]);

  /*
   * Refs are used in addition to state so that a scroll
   * event cannot accidentally start two Firebase requests.
   */
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const isMountedRef = useRef(true);


  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);


  /*
   * Builds the same Redux hashtag array that your old
   * startSetLinks function built.
   */
  const buildHashtagArray = () => {
    console.log("buildHashtagArray CALLED");

    console.log(
      "hashtagsRef.current=",
      JSON.stringify(hashtagsRef.current),
    );


    let hashTagsWithCount =
      countTimesEachHashTagIsUsed(
        hashtagsRef.current,
      );


    if (!Array.isArray(hashTagsWithCount)) {
      hashTagsWithCount = [];
    }


    /*
     * Sort alphabetically by description.
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

      if (aDescription < bDescription) {
        return -1;
      }

      if (aDescription > bDescription) {
        return 1;
      }

      return 0;
    });


    /*
     * Remove duplicate entries.
     */
    const seen = {};
    const finalHashtags = [];

    hashTagsWithCount.forEach((hashtag) => {
      if (!hashtag) {
        return;
      }

      /*
       * Your existing hashtag objects use matchesstring.
       * description is retained as a fallback.
       */
      const value =
        hashtag.matchesstring ||
        hashtag.description ||
        "";

      if (!value) {
        return;
      }

      const key = value.toLowerCase();

      if (!seen[key]) {
        seen[key] = true;

        finalHashtags.push(hashtag);
      }
    });


    console.log(
      "InfiniteScrollNewHashtags finalHashtags=",
      finalHashtags,
    );


    /*
     * Update Redux.
     */
    props.setHashTags(finalHashtags);
  };


  const loadHashtags = async (
    reset = false,
  ) => {
    console.log("loadHashtags CALLED");
    console.log("reset=", reset);
    console.log(
      "loadingRef.current=",
      loadingRef.current,
    );
    console.log(
      "hasMoreRef.current=",
      hasMoreRef.current,
    );
    console.log("props.uid=", props.uid);


    /*
     * Do not start another Firebase request while one
     * is already running.
     */
    if (loadingRef.current) {
      console.log(
        "RETURNING because loading is true",
      );

      return;
    }


    /*
     * We reached the end of Firebase.
     */
    if (
      !reset &&
      !hasMoreRef.current
    ) {
      console.log(
        "RETURNING because hasMore is false",
      );

      return;
    }


    if (!props.uid) {
      console.log(
        "RETURNING because uid is missing",
      );

      return;
    }


    loadingRef.current = true;

    if (isMountedRef.current) {
      setLoading(true);
    }


    try {
      if (reset) {
        cursorRef.current = null;
        hashtagsRef.current = [];

        hasMoreRef.current = true;

        if (isMountedRef.current) {
          setHasMore(true);
        }
      }


      let query = firebase
        .database()
        .ref(
          `users/${props.uid}/links`,
        )
        .orderByKey();


      /*
       * On later pages Firebase startAt() includes the
       * previous cursor item again.
       *
       * Therefore later pages request PAGE_SIZE + 2:
       *
       * 1 repeated cursor
       * 10 new records
       * 1 extra record used to determine hasMore
       */
      if (cursorRef.current !== null) {
        query = query
          .startAt(cursorRef.current)
          .limitToFirst(PAGE_SIZE + 2);
      } else {
        /*
         * First page has no repeated cursor.
         *
         * 10 records + 1 extra.
         */
        query =
          query.limitToFirst(
            PAGE_SIZE + 1,
          );
      }


      const snapshot =
        await query.once("value");


      console.log(
        "Firebase snapshot received, children=",
        snapshot.numChildren(),
      );


      let pageLinks = [];


      snapshot.forEach(
        (childSnapshot) => {
          pageLinks.push({
            id: childSnapshot.key,

            ...childSnapshot.val(),
          });
        },
      );


      /*
       * startAt(cursor) includes the previous cursor
       * record. Remove it.
       */
      if (
        cursorRef.current !== null &&
        pageLinks.length > 0 &&
        pageLinks[0].id ===
          cursorRef.current
      ) {
        pageLinks.shift();
      }


      /*
       * If more than PAGE_SIZE records remain,
       * Firebase has another page.
       */
      const moreAvailable =
        pageLinks.length > PAGE_SIZE;


      /*
       * Keep only the actual page.
       * The extra record was only used to tell us
       * another page exists.
       */
      if (
        pageLinks.length > PAGE_SIZE
      ) {
        pageLinks =
          pageLinks.slice(
            0,
            PAGE_SIZE,
          );
      }


      /*
       * Remember the last link from this page.
       */
      if (pageLinks.length > 0) {
        cursorRef.current =
          pageLinks[
            pageLinks.length - 1
          ].id;
      }


      console.log(
        "pageLinks.length=",
        pageLinks.length,
      );

      console.log(
        "moreAvailable=",
        moreAvailable,
      );

      console.log(
        "new cursor=",
        cursorRef.current,
      );


      /*
       * Extract hashtags from every link on this page.
       */
      pageLinks.forEach((link) => {
        const hashtags =
          extractHashtags(link);


        console.log(
          "link=",
          link.id,
          "hashtags=",
          hashtags,
        );


        if (Array.isArray(hashtags)) {
          hashtagsRef.current.push(
            ...hashtags,
          );
        }
      });


      console.log(
        "about to call buildHashtagArray",
      );


      /*
       * Build the complete hashtag array from every
       * page loaded so far.
       */
      buildHashtagArray();


      hasMoreRef.current =
        moreAvailable;


      if (isMountedRef.current) {
        setHasMore(
          moreAvailable,
        );
      }

    } catch (error) {
      console.error(
        "InfiniteScrollNewHashtags error=",
        error,
      );

    } finally {
      loadingRef.current = false;

      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };


  /*
   * Load the first Firebase page when the component
   * opens.
   */
  useEffect(() => {
    cursorRef.current = null;
    hashtagsRef.current = [];

    hasMoreRef.current = true;
    loadingRef.current = false;

    loadHashtags(true);

  }, [props.uid]);


  /*
   * Give SeeHashTagsPage access to our load-more
   * function.
   *
   * SeeHashTagsPage owns the actual scrollable DIV,
   * so it knows when the user has reached the bottom.
   */
  useEffect(() => {
    if (props.loadMoreRef) {
      props.loadMoreRef.current =
        () => {
          loadHashtags(false);
        };
    }

    return () => {
      if (props.loadMoreRef) {
        props.loadMoreRef.current =
          null;
      }
    };
  });


  /*
   * This component does not need its own scroll area.
   * SeeHashTagsPage displays the hashtags.
   */
  return (
    <div
      style={{
        display: "none",
      }}
    >
      {loading
        ? "Loading hashtags..."
        : ""}

      {hasMore
        ? "More hashtags available"
        : ""}
    </div>
  );
};


const mapDispatchToProps = (
  dispatch,
) => ({
  setHashTags: (hashtags) =>
    dispatch(
      setHashTags(hashtags),
    ),
});


export default connect(
  null,
  mapDispatchToProps,
)(
  InfiniteScrollNewHashtags,
);