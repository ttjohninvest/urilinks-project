import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import InfiniteScrollFollowers from "./InfiniteScrollFollowers"

const FollowersContainer = (props) => {
  console.log("FollowersContainer.js")
  const [uniqueData3, setUniqueData3] = useState([]);
  const [lengthOf3, setLengthOf3] = useState(0);
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadFollowers = async () => {
      if (!props.follower || props.follower.length === 0) {
        setUniqueData3([]);
        setLengthOf3(0);
        return;
      }

      setLoadingFollowers(true);

      try {
        setLengthOf3(props.follower.length);
        console.log("FollowersContainer.js, props.follower.length="+props.follower.length)
        const promises = props.follower.map(async (follower) => {
          const snapshot = await firebase
            .database()
            .ref(`users/${follower.uid}`)
            .once("value");

          if (!snapshot.exists()) {
            return null;
          }

          const userData = snapshot.val();
          console.log("FollowersContainer.js, userData="+JSON.stringify(userData))
          return {
            gud: {
              ...userData,
              uid: follower.uid,
              email: userData.email || follower.email,
            },

            isMatch: "is following ",
          };
        });

        const results = await Promise.all(promises);
        console.log("FollowersContainer.js,  results="+JSON.stringify(results))

        if (cancelled) return;

        const followerUsers = results.filter(Boolean);
        console.log("FollowersContainer.js, 1 followersUsers="+JSON.stringify(followerUsers))
        followerUsers.sort((a, b) => {
          const valA = (
            a.gud.displayname || ""
          ).toLowerCase();

          const valB = (
            b.gud.displayname || ""
          ).toLowerCase();

          if (valA < valB) return -1;
          if (valA > valB) return 1;

          return 0;
        });

        console.log("FollowersContainer.js, 2 followersUsers="+JSON.stringify(followerUsers))
        setUniqueData3(followerUsers);
      } catch (error) {
        console.log(
          "Error loading followers:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoadingFollowers(false);
        }
      }
    };

    loadFollowers();

    return () => {
      cancelled = true;
    };
  }, [props.follower]);

  return (
    <InfiniteScrollFollowers
      uniqueData3={uniqueData3}
      uid={props.uid}
      theuser={props.theuser}
      handleClick2={props.handleClick2}
      signup={props.signup}
      rt={props.rt}
      lengthOf3={lengthOf3}
      loadingFollowers={loadingFollowers}
    />
  );
};

export default FollowersContainer;