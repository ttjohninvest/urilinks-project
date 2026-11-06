import React, { useEffect, useMemo, useRef, useState } from "react";
import OnlineStatus2 from "./OnlineStatus2";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";

const PAGE_SIZE = 20;

const UsersAndFollowingContainer = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const loaderRef = useRef(null);
  const scrollRef = useRef(null);
  const mountedRef = useRef(false);

  const lastDisplayNameRef = useRef(null);
  const lastUidRef = useRef(null);

  const previousValues = React.useRef({});
  const renderCount = React.useRef(0);

  const instanceId = React.useRef(Math.random().toString(36).substring(2, 8));

  console.log("UsersAndFollowingContainer INSTANCE =", instanceId.current);

  renderCount.current += 1;

  console.log(
    "UsersAndFollowingContainer followingRenderCount=",
    renderCount.current,
  );

  const currentValues = {
    users: props.users,
    following: props.following,
    auth: props.auth,
    uid: props.uid,
    theuser: props.theuser,
  };

  Object.keys(currentValues).forEach((key) => {
    if (previousValues.current[key] !== currentValues[key]) {
      console.log("CHANGED:", key, "render=", renderCount.current);
    }
  });

  previousValues.current = currentValues;

  /*
    props.following example:

    [
      {
        uid: "D9LSg6elood8Yc5gd5oDMp3JNAQ2",
        email: "johmcg64@gmail.com"
      }
    ]
  */

  React.useEffect(() => {
    mountedRef.current = true;
    console.log(
      "MOUNT UsersAndFollowingContainer INSTANCE =",
      instanceId.current,
    );

    return () => {
      mountedRef.current = false;
      console.log(
        "UNMOUNT UsersAndFollowingContainer INSTANCE =",
        instanceId.current,
      );
    };
  }, []);

  const followingUidSet = useMemo(() => {
    return new Set(
      (props.following || []).map((following) => {
        return following.uid;
      }),
    );
  }, [props.following]);

  const loadUsers = async () => {
    if (!mountedRef.current || loading || !hasMore) {
      return;
    }

    console.log("loadUsers INSTANCE =", instanceId.current);

    console.log("CALLING setLoading");
    setLoading(true);

    try {
      let query = firebase
        .database()
        .ref("users")
        .orderByChild("gud/gud/displayname");

      if (lastDisplayNameRef.current === null) {
        query = query.limitToFirst(PAGE_SIZE + 1);
      } else {
        query = query
          .startAt(lastDisplayNameRef.current, lastUidRef.current)
          .limitToFirst(PAGE_SIZE + 1);
      }

      const snapshot = await query.once("value");

      // Do not update state if this component was removed while Firebase loaded.
      if (!mountedRef.current) return;

      const rawUsers = [];

      snapshot.forEach((childSnapshot) => {
        const uid = childSnapshot.key;
        const userData = childSnapshot.val();

        /*
          startAt() includes the previous
          last record again.
        */
        if (lastUidRef.current !== null && uid === lastUidRef.current) {
          return;
        }

        rawUsers.push({
          uid: uid,
          userData: userData,
        });
      });

      const moreAvailable = rawUsers.length > PAGE_SIZE;

      const pageRecords = rawUsers.slice(0, PAGE_SIZE);

      const pageUsers = [];

      pageRecords.forEach((record) => {
        const uid = record.uid;
        const userData = record.userData || {};

        /*
          Your Redux/Firebase structure can contain:

          userData.gud.gud

          or:

          userData.gud
        */
        const gud =
          userData.gud && userData.gud.gud
            ? userData.gud.gud
            : userData.gud || {};

        /*
          Do not display logged-in user.
        */
        if (uid === props.uid) {
          return;
        }

        const isFollowing = followingUidSet.has(uid);

        const displayName = gud.displayname || "";

        const photoUrl = gud.photourl || "/default-profile.png";

        const email = gud.email || "";

        pageUsers.push({
          gud: {
            ...gud,
            uid: uid,
          },

          displayName: displayName,
          photoUrl: photoUrl,
          email: email,

          isFollowing: isFollowing,

          isMatch: isFollowing ? "is following " : "is not following",
        });
      });

      /*
        Save cursor for next Firebase page.
      */
      if (pageRecords.length > 0) {
        const lastRecord = pageRecords[pageRecords.length - 1];

        const lastUserData = lastRecord.userData || {};

        const lastGud =
          lastUserData.gud && lastUserData.gud.gud
            ? lastUserData.gud.gud
            : lastUserData.gud || {};

        lastDisplayNameRef.current = lastGud.displayname || "";

        lastUidRef.current = lastRecord.uid;
      }

      console.log("CALLING setUsers, pageUsers =", JSON.stringify(pageUsers));
      console.log("CALLING setUsers");
      // setUsers((previousUsers) => {
      //   return [...previousUsers, ...pageUsers];
      // });

      setUsers((previousUsers) => {
        console.log("setUsers previous length =", previousUsers.length);
        console.log("setUsers pageUsers length =", pageUsers.length);

        if (pageUsers.length === 0) {
          console.log("setUsers NOT changing users");
          return previousUsers;
        }

        const newUsers = [...previousUsers, ...pageUsers];

        console.log("setUsers NEW length =", newUsers.length);

        return newUsers;
      });

      console.log("CALLING setHasMore");

      //setHasMore(moreAvailable);
      setHasMore((oldValue) => {
        console.log("setHasMore OLD =", oldValue);
        console.log("setHasMoreNEW =", moreAvailable);

        return moreAvailable;
      });
    } catch (error) {
      console.log("Error loading users:", error);
    } finally {
      console.log("CALLING setLoading");

      //setLoading(false);
      if (mountedRef.current) {
        setLoading((oldValue) => {
          console.log("setLoading OLD =", oldValue);
          console.log("setLoading NEW =", false);

          return false;
        });
      }

      // if (users.length > 1) {
      //     //array3 = users.sort((a, b) => {
      //       setUsers(users.sort((a, b) => {
      //         const valA = a.displayName.toLowerCase();
      //     const valB = b.displayName.toLowerCase();
      //     if (valA < valB) return -1;
      //     if (valA > valB) return 1;
      //     return 0;
      //       }))

      // } else {
      //   //array3=[]
      // }
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (mountedRef.current) {
        console.log("CALLING setCurrentUser");
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /*
    Load first page.
  */
  useEffect(() => {
    console.log("CALLING setUsers");
    setUsers([]);

    lastDisplayNameRef.current = null;
    lastUidRef.current = null;
    console.log("CALLING setHasMore");
    setHasMore(true);
    console.log("CALLING loadUsers");
    loadUsers();
  }, []);

  /*
    Infinite scroll.
  */
  useEffect(() => {
    const loader = loaderRef.current;
    const scrollContainer = scrollRef.current;

    if (!loader || !scrollContainer) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadUsers();
        }
      },
      {
        root: scrollContainer,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);

  console.log("<UsersAndFollowingContainer is about to render");
  console.log("COLUMN 1 users=", JSON.stringify(users));
  console.log("COLUMN 1 following=", JSON.stringify(props.following));

  return (
    <div>
      {/* <div className="padding-tb">
        Users
      </div> */}

      <div ref={scrollRef} className="scrollable-div3">
        <div className="liststylenone- cursor-pointer interline padding-top-z6">
          {users.map((item) => {
            if (props.auth.uid !== item.gud.uid) {
              return (
                <div
                  key={item.gud.uid}
                  onClick={(event) => props.handleClick2(2, event)}
                  className={`${
                    item.isFollowing
                      ? "bg-color-1 color-white-1"
                      : "bg-color-1w color-black-3"
                  }
                flexrowzv
                padding-left-11
                margin-bottom-1vv
                padding-tb`}
                  data-item-id={
                    props.uid +
                    ";" +
                    item.gud.uid +
                    ";" +
                    //firebase.auth().currentUser.email.split("@")[0] +
                    // (props.theuser
                    //   ? props.theuser.displayName
                    //   : "name") +
                    (currentUser && currentUser.email
                      ? currentUser.email.split("@")[0]
                      : "ttjohninvest4") +
                    ";" +
                    //item.displayName +
                    item.email.split("@")[0] +
                    ";" +
                    item.photoUrl +
                    ";" +
                    item.email +
                    ";" +
                    // (props.theuser ? props.theuser.email : "ph@ph.com") +
                    // ";" +
                    (currentUser && currentUser.email
                      ? currentUser.email
                      : "ttjohninvest4@gmail.com") +
                    ";" +
                    item.isMatch +
                    ";" +
                    (currentUser ? "no" : "yes")
                  }
                >
                  <img
                    src={item.photoUrl}
                    width="42"
                    height="42"
                    className="borderRadius50- circular-img-"
                    style={{
                      borderRadius: "50%",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;

                      e.currentTarget.src = "/default-profile.png";
                    }}
                  />

                  <span
                    className="margin-left-11 ip- flexrowtt0-"
                    title="Open his or her page and see links or request chat with the person that I am following."
                  >
                    {/* {item.displayName} */}
                    {item.email.split("@")[0]}

                    {item.isFollowing && (
                      <span>
                        <br />
                        <span className="ib-"> - Following</span>
                        <span className="ib- ">
                          <OnlineStatus2 userId={item.gud.uid} />
                        </span>
                      </span>
                    )}

                    {/* props.theuser?<span>props.theuser.displayName</span>:"John"
                 
                 
  {item.isMatch}{" "}
  {item.gud.email},{" "}
  

  <OnlineStatus userId={item.gud.uid} displaName={item.gud.displayname} /> */}

                    {/* {", "}
  {item.gud.theatname} */}
                  </span>
                </div>
              );
            } else {
              return null;
            }
          })}

          {hasMore && (
            <div
              ref={loaderRef}
              style={{
                height: "30px",
              }}
            />
          )}

          {loading && <div className="padding-tb">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

//export default UsersAndFollowingContainer;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, undefined)(UsersAndFollowingContainer),
);
