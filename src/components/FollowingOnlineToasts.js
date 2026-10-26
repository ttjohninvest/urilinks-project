import React, { useEffect, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import { toast } from "react-toastify";

const FollowingOnlineToasts = (props) => {
  const previousStatusRef = useRef({});
  const listenersRef = useRef([]);

  useEffect(() => {
    if (!props.uid) return;

    const followingRef = firebase
      .database()
      .ref(`users/${props.uid}/following`);

    const loadFollowing = async () => {
      const snapshot = await followingRef.once("value");

      if (!snapshot.exists()) {
        return;
      }

      snapshot.forEach((childSnapshot) => {
        const followedUid = childSnapshot.key;

        /*
         * Watch this person's
         * online true/false value.
         */
        const onlineRef = firebase
          .database()
          .ref(`users/${followedUid}/online`);

        /*
         * This contains the name
         * written by that person's
         * browser.
         */
        const onlineNameRef = firebase
          .database()
          .ref(`users/${followedUid}/onlineName`);

        const handleOnlineChange = async (onlineSnapshot) => {
          const isOnline = onlineSnapshot.val() === true;

          /*
           * First reading establishes
           * current status.
           *
           * Do not show a toast just
           * because this component loaded.
           */
          if (previousStatusRef.current[followedUid] === undefined) {
            previousStatusRef.current[followedUid] = isOnline;

            return;
          }

          /*
           * User changed from
           * offline to online.
           */
          if (
            previousStatusRef.current[followedUid] === false &&
            isOnline === true
          ) {
            let displayName = "Someone you follow";

            try {
              const nameSnapshot = await onlineNameRef.once("value");

              const savedName = nameSnapshot.val();

              if (typeof savedName === "string" && savedName.trim() !== "") {
                displayName = savedName.trim();
              }
            } catch (error) {
              console.log("Could not get online name:", error);
            }

            toast(`${displayName} is online`, {
              style: {
                color: "#111",
                fontWeight: "500",
              },
            });
          }

          previousStatusRef.current[followedUid] = isOnline;
        };

        onlineRef.on("value", handleOnlineChange);

        listenersRef.current.push({
          ref: onlineRef,
          callback: handleOnlineChange,
        });
      });
    };

    loadFollowing();

    return () => {
      listenersRef.current.forEach((listener) => {
        listener.ref.off("value", listener.callback);
      });

      listenersRef.current = [];
    };
  }, [props.uid]);

  return null;
};

export default FollowingOnlineToasts;
