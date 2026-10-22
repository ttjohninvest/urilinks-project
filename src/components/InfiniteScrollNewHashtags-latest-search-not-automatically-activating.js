import React, {
  useEffect,
  useState,
} from "react";

import { connect } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";

import {
  setHashTags,
} from "../actions/links";


const InfiniteScrollNewHashtags = (
  props
) => {

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    let mounted = true;


    /*
     * Recursively collect every string
     * contained anywhere in an object.
     */
    const getAllStrings = (
      value,
      strings
    ) => {

      if (
        typeof value ===
        "string"
      ) {

        strings.push(value);

        return;

      }


      if (
        value !== null &&
        typeof value ===
          "object"
      ) {

        Object.keys(
          value
        ).forEach(
          (key) => {

            getAllStrings(
              value[key],
              strings
            );

          }
        );

      }

    };


    const loadHashtags =
      async () => {

        if (!props.uid) {
          return;
        }


        setLoading(true);


        try {

          const snapshot =
            await firebase
              .database()
              .ref(
                `users/${props.uid}/links`
              )
              .once("value");


          if (!mounted) {
            return;
          }


          /*
           * hashtagCounts will look like:
           *
           * {
           *   "#animals": 3,
           *   "#travel": 5,
           *   "#music": 2
           * }
           */
          const hashtagCounts = {};


          snapshot.forEach(
            (
              childSnapshot
            ) => {

              const link =
                childSnapshot.val();


              /*
               * Gather every string
               * from this link.
               */
              const strings = [];


              getAllStrings(
                link,
                strings
              );


              /*
               * Collect hashtags found
               * in this particular link.
               *
               * Set prevents the same
               * hashtag from being counted
               * more than once in one link.
               */
              const hashtagsForThisLink =
                new Set();


              strings.forEach(
                (str) => {

                  const matches =
                    str.match(
                      /#\w+/g
                    ) || [];


                  matches.forEach(
                    (hashtag) => {

                      hashtagsForThisLink.add(
                        hashtag.toLowerCase()
                      );

                    }
                  );

                }
              );


              /*
               * Add this link's hashtags
               * to the totals.
               */
              hashtagsForThisLink.forEach(
                (hashtag) => {

                  if (
                    hashtagCounts[
                      hashtag
                    ] === undefined
                  ) {

                    hashtagCounts[
                      hashtag
                    ] = 0;

                  }


                  hashtagCounts[
                    hashtag
                  ] += 1;

                }
              );

            }
          );


          /*
           * Convert the object into the
           * array SeeHashTagsPage uses.
           */
          const finalHashtags =
            Object.keys(
              hashtagCounts
            ).map(
              (hashtag) => ({

                matchesstring:
                  hashtag,

                count:
                  hashtagCounts[
                    hashtag
                  ],

              })
            );


          /*
           * Alphabetical order.
           */
          finalHashtags.sort(
            (a, b) => {

              const valA =
                a.matchesstring
                  .toLowerCase();

              const valB =
                b.matchesstring
                  .toLowerCase();


              if (valA < valB) {
                return -1;
              }


              if (valA > valB) {
                return 1;
              }


              return 0;

            }
          );


          if (!mounted) {
            return;
          }


          console.log(
            "InfiniteScrollNewHashtags finalHashtags=",
            JSON.stringify(
              finalHashtags
            )
          );


          /*
           * Put all hashtags and their
           * counts into Redux.
           */
          props.setHashTags(
            finalHashtags
          );


        } catch (error) {

          console.log(
            "InfiniteScrollNewHashtags error=",
            error
          );

        } finally {

          if (mounted) {
            setLoading(false);
          }

        }

      };


    loadHashtags();


    return () => {

      mounted = false;

    };

  }, [props.uid]);


  return (

    <div>

      {loading === true && (
        <div>
          Loading...
        </div>
      )}

    </div>

  );

};


const mapDispatchToProps = (
  dispatch
) => ({

  setHashTags: (
    hashtags
  ) =>
    dispatch(
      setHashTags(
        hashtags
      )
    ),

});


export default connect(
  null,
  mapDispatchToProps
)(
  InfiniteScrollNewHashtags
);