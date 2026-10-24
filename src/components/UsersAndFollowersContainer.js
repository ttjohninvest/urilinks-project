import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import OnlineStatus2 from "./OnlineStatus2";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";

const PAGE_SIZE = 20;

const UsersAndFollowersContainer = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const scrollRef = useRef(null);

  const lastDisplayNameRef = useRef(null);
  const lastUidRef = useRef(null);

  const getUserDisplayName = (userData) => {
  const gud = userData.gud || {};

  let name =
    gud.displayname ||
    gud.displayName ||
    userData.displayname ||
    userData.displayName ||
    "";

  // Handle a value such as:
  // displayname: { displayname: "John" }
  if (typeof name === "object" && name !== null) {
    name =
      name.displayname ||
      name.displayName ||
      "";
  }

  return name;
};

  const followerUidSet = useMemo(() => {
    return new Set(
      (props.follower || []).map((follower) => {
        return follower.uid;
      })
    );
  }, [props.follower]);

    const followingUidSet = useMemo(() => {
    return new Set(
      (props.following || []).map((following) => {
        return following.uid;
      })
    );
  }, [props.following]);

  const loadUsers = async () => {
    if (loading || !hasMore) {
      return;
    }

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
          .startAt(
            lastDisplayNameRef.current,
            lastUidRef.current
          )
          .limitToFirst(PAGE_SIZE + 1);
      }

      const snapshot = await query.once("value");

      const rawUsers = [];

      snapshot.forEach((childSnapshot) => {
        const uid = childSnapshot.key;
        const userData = childSnapshot.val();

        if (
          lastUidRef.current !== null &&
          uid === lastUidRef.current
        ) {
          return;
        }

        rawUsers.push({
          uid: uid,
          userData: userData,
        });
      });

      const moreAvailable =
        rawUsers.length > PAGE_SIZE;

      const pageRecords =
        rawUsers.slice(0, PAGE_SIZE);

      const pageUsers = [];

      pageRecords.forEach((record) => {
  const uid = record.uid;
  const userData = record.userData || {};
  //const gud = userData.gud || {};
  const gud =
  userData.gud && userData.gud.gud
    ? userData.gud.gud
    : userData.gud || {};

  if (uid === props.uid) {
    return;
  }

  const isFollower =
    followerUidSet.has(uid);

  const isFollowing =
    followingUidSet.has(uid);

const displayName =
  gud.displayname || "";

const photoUrl =
  gud.photourl ||
  "/default-profile.png";

const email =
  gud.email || "";

  console.log(
    "USER:",
    uid,
    "displayName=",
    displayName,
    "gud=",
    gud
  );

  pageUsers.push({
    gud: {
      ...gud,
      uid: uid,
    },

    displayName: displayName,
    photoUrl: photoUrl,
    email: email,

    isFollower: isFollower,
    isFollowing: isFollowing,

    isMatch: isFollower
      ? "is follower"
      : "is not follower",

    isMatch2: isFollowing
      ? "is following"
      : "is not following"
  });
});

 if (pageRecords.length > 0) {
  const lastRecord =
    pageRecords[pageRecords.length - 1];

  const lastUserData =
    lastRecord.userData || {};

  const lastGud =
    lastUserData.gud &&
    lastUserData.gud.gud
      ? lastUserData.gud.gud
      : lastUserData.gud || {};

  lastDisplayNameRef.current =
    lastGud.displayname || "";

  lastUidRef.current =
    lastRecord.uid;
}
      setUsers((previousUsers) => {
        return [
          ...previousUsers,
          ...pageUsers,
        ];
      });

      setHasMore(moreAvailable);
    } catch (error) {
      console.log(
        "Error loading users:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
    Load first page.
  */
  useEffect(() => {
    setUsers([]);

    lastDisplayNameRef.current = null;
    lastUidRef.current = null;

    setHasMore(true);

    loadUsers();
  }, []);

  /*
    Infinite scroll.
  */
  useEffect(() => {
    const loader = loaderRef.current;
    const scrollContainer =
      scrollRef.current;

    if (!loader || !scrollContainer) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !loading &&
            hasMore
          ) {
            loadUsers();
          }
        },
        {
          root: scrollContainer,
          rootMargin: "100px",
          threshold: 0,
        }
      );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);

  return (
    <div>
      {/* <div className="padding-tb">
        Users
      </div> */}

      <div
        ref={scrollRef}
        className="scrollable-div3"
      >
        <div className="liststylenone- cursor-pointer interline padding-top-z6">

          {users.map((item) => {
            if(props.auth.uid !== item.gud.uid) {
            return (
              <div
                key={item.gud.uid}
                onClick={(event) =>
                  props.handleClick3(
                    2,
                    event
                  )
                }
                className={`${
                  item.isFollower
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
                  (props.theuser
                    ? props.theuser.displayName
                    : "name") +
                  ";" +
                  item.displayName +
                  ";" +
                  item.photoUrl +
                  ";" +
                  item.email +
                  ";" +
                  (props.theuser
                    ? props.theuser.email
                    : "ph@ph.com") +
                  ";" +
                  item.isMatch +
                  ";" +
                  //to be able to follow back and unfollow from the 3rd column followers list put replace the following "" with item.isMatch2
                  "" //item.isMatch2
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
                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      "/default-profile.png";
                  }}
                />

                <span className="margin-left-11 ip flexrowtt0-"
                title="Chat with somebody that is following me."
                >
                  {item.displayName}

                  {item.isFollower && (
                    <span>
                    <span className="ip-">
                      {" "} - Follower
                    </span>
                    <span className="ip-">
                       <OnlineStatus2 userId={item.gud.uid} />
                    </span>
                    </span>
                  )}

 {/* props.theuser?<span>props.theuser.displayName</span>:"John"
                 
                 
  {item.isMatch}{" "}
  {item.gud.email},{" "}
  

  <OnlineStatus2 userId={item.gud.uid} /> */}

  {/* {", "}
  {item.gud.theatname} */}


                </span>
              </div>
            );
          } else {
            return null
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

          {loading && (
            <div className="padding-tb">
              Loading...
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

//export default UsersAndFollowersContainer;

const mapStateToProps = (state) => ({
 
  auth: state.auth,
  
});


export default withRouter(
  connect(mapStateToProps, undefined)(UsersAndFollowersContainer),
);
