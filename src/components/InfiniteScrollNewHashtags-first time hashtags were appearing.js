import React, {
  useEffect,
  useRef,
} from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import {
  setHashTags,
} from "../actions/links";


const InfiniteScrollNewHashtags = (
  props,
) => {

  const loadingRef =
    useRef(false);


  /*
   * Recursively collect every string
   * contained anywhere inside an object.
   */
  const getAllStrings = (
    value,
  ) => {

    let strings = [];


    if (
      typeof value === "string"
    ) {

      strings.push(
        value,
      );

      return strings;
    }


    if (
      Array.isArray(
        value,
      )
    ) {

      value.forEach(
        (item) => {

          strings =
            strings.concat(
              getAllStrings(
                item,
              ),
            );

        },
      );


      return strings;
    }


    if (
      value &&
      typeof value === "object"
    ) {

      Object.keys(
        value,
      ).forEach(
        (key) => {

          strings =
            strings.concat(
              getAllStrings(
                value[key],
              ),
            );

        },
      );

    }


    return strings;
  };


  const loadAllHashtags =
    async () => {

      if (
        loadingRef.current
      ) {
        return;
      }


      if (!props.uid) {
        return;
      }


      loadingRef.current =
        true;


      try {

        console.log(
          "Reading ALL links for hashtags",
        );


        const snapshot =
          await firebase
            .database()
            .ref(
              `users/${props.uid}/links`,
            )
            .once(
              "value",
            );


        const hashtagCounts =
          {};


        let linkCount =
          0;

        let linksWithHashtags =
          0;


        snapshot.forEach(
          (childSnapshot) => {

            linkCount += 1;


            const link =
              childSnapshot.val();


            if (!link) {
              return;
            }


            /*
             * Get every string stored anywhere
             * in this link.
             */
            const strings =
              getAllStrings(
                link,
              );


            /*
             * Join them so we can find all
             * hashtags contained in the link.
             */
            const text =
              strings.join(
                " ",
              );


            const foundHashtags =
              text.match(
                /#[A-Za-z0-9_]+/g,
              ) || [];


            /*
             * Count a hashtag only once for
             * this particular link.
             */
            const uniqueHashtags =
              [
                ...new Set(
                  foundHashtags.map(
                    (hashtag) =>
                      hashtag.toLowerCase(),
                  ),
                ),
              ];


            if (
              uniqueHashtags.length >
              0
            ) {

              linksWithHashtags +=
                1;

            }


            uniqueHashtags.forEach(
              (hashtag) => {

                if (
                  hashtagCounts[
                    hashtag
                  ] === undefined
                ) {

                  hashtagCounts[
                    hashtag
                  ] = 1;

                } else {

                  hashtagCounts[
                    hashtag
                  ] += 1;

                }

              },
            );

          },
        );


        const finalHashtags =
          Object.keys(
            hashtagCounts,
          ).map(
            (hashtag) => ({

              description:
                hashtag,

              matchesstring:
                hashtag,

              count:
                hashtagCounts[
                  hashtag
                ],

            }),
          );


        finalHashtags.sort(
          (a, b) =>
            a.description.localeCompare(
              b.description,
              undefined,
              {
                sensitivity:
                  "base",
              },
            ),
        );


        console.log(
          "Total links examined=",
          linkCount,
        );


        console.log(
          "Links containing hashtags=",
          linksWithHashtags,
        );


        console.log(
          "Total unique hashtags=",
          finalHashtags.length,
        );


        console.log(
          "finalHashtags=",
          finalHashtags,
        );


        props.setHashTags(
          finalHashtags,
        );


        if (
          props.onComplete
        ) {

          props.onComplete(
            finalHashtags,
          );

        }

      } catch (error) {

        console.log(
          "loadAllHashtags failed",
          error,
        );

      } finally {

        loadingRef.current =
          false;

      }

    };


  useEffect(() => {

    loadAllHashtags();

  }, [props.uid]);


  return null;
};


const mapDispatchToProps = (
  dispatch,
) => ({

  setHashTags: (
    hashtags,
  ) =>
    dispatch(
      setHashTags(
        hashtags,
      ),
    ),

});


export default connect(
  null,
  mapDispatchToProps,
)(
  InfiniteScrollNewHashtags,
);