import React, { useEffect, useState, useRef } from "react";
import { v4 } from "uuid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";

import LinkListFilters from "./LinkListFilters";
import DisplayHashtags from "./DisplayHashtags";
import Simple3 from "./Simple3";
import Testit from "./Testit";
import setHasrefreshed from "../actions/hasrefreshed";
import { startLogout } from "../actions/auth";
import ScrollLimit from "./ScrollLimit";
import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";
import TestToast from "./TestToast";

import LinkListFileDate from "./LinkListFileDate";
import LinkListFiltersFileDate from "./LinkListFiltersFileDate";
import { useSelector } from "react-redux";
import ErrorBoundary from "./ErrorBoundry";

const LinkDashboardPage = (props) => {
  console.log(
  "DASHBOARD REDUX UID =",
  props.auth.uid
);

console.log(
  "DASHBOARD FIREBASE UID =",
  firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : "No Firebase user"
);
  console.log("LinkDashboardPage, props.bookmarks=", props.bookmarks);

  const scrollableDiv = React.useRef();

  const [heightofdiv, setHeightOfDiv] = useState(0);

  /*
   * FIX:
   * Get the saved scroll position during the FIRST render.
   *
   * We no longer call setScrollPos() inside useEffect.
   */
  const [scrollPos] = useState(() => {
    const saved = parseInt(sessionStorage.getItem("scrollPosition"));

    if (isNaN(saved)) {
      return 0;
    }

    return saved;
  });

  const [first, setFirst] = useState(true);
  const [theValue, setTheValue] = useState(false);
  const [avalue, setAvalue] = useState(0);
  const [bvalue, setBvalue] = useState(0);
  const [b, bf] = useState(1);
  const [v1, setV1] = useState(false);

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    return regex.test(navigator.userAgent);
  };



const dashboardInstanceId = React.useRef(
  Math.random().toString(36).substring(2, 8)
);

console.log(
  "LinkDashboardPage INSTANCE =",
  dashboardInstanceId.current
);

React.useEffect(() => {
  console.log(
    "MOUNT LinkDashboardPage INSTANCE =",
    dashboardInstanceId.current
  );

  return () => {
    console.log(
      "UNMOUNT LinkDashboardPage INSTANCE =",
      dashboardInstanceId.current
    );
  };
}, []);





  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) return;

      const connectedRef = firebase.database().ref(".info/connected");

      const userOnlineRef = firebase.database().ref(`users/${user.uid}/online`);

      const userOnlineNameRef = firebase
        .database()
        .ref(`users/${user.uid}/onlineName`);

      const handleConnection = (snapshot) => {
        if (snapshot.val() === false) {
          return;
        }

        let onlineName = "Someone";

        if (user.email && typeof user.email === "string") {
          onlineName = user.email.split("@")[0];
        }

        userOnlineNameRef.set(onlineName);

        userOnlineRef
          .onDisconnect()
          .set(false)
          .then(() => {
            userOnlineRef.set(true);
          });
      };

      connectedRef.on("value", handleConnection);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("LINK DASHBOARD EFFECT START");

    console.log(
      "LinkDashboardPage.js, UseEffect, following=" +
        JSON.stringify(props.following),
    );

    const handleScroll = () => {
      window.localStorage.setItem("scrollPosition", window.scrollY);

      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    //window.onbeforeunload = null;
    //props.abc(2)
    //console.log("2, props.abcref="+JSON.stringify(props.abcref))
  }, []);

  const setTheHashTagDivHeight = (h) => {
    setHeightOfDiv(h);
  };

  useEffect(() => {
    const sp = parseInt(window.localStorage.getItem("scrollPosition"));

    console.log("LinkDashboardPage.js, sp=" + sp);

    console.log(
      "LinkDashboardPage, props.settings.photoURL=" + props.settings.photoURL,
    );

    /*
     * Use a named function so it can be
     * removed properly during cleanup.
     */
    const handleBeforeUnload = () => {
      window.localStorage.setItem("sortBy", "description");

      sessionStorage.setItem("scrollPosition", window.scrollY);

      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

      console.log(
        "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT window.scrollY=" + window.scrollY,
      );

      console.log("ABOUT TO setTheValue");

      setTheValue(props.theValue);

      console.log("ABOUT TO setBvalue");

      setBvalue(!bvalue);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    /*
     * scrollPos already contains the saved value
     * on the FIRST render.
     *
     * No setScrollPos() here.
     */
    console.log("saved scrollPos=" + scrollPos);

    if (scrollPos) {
      //window.scrollTo(0, scrollPos);
      //sessionStorage.removeItem("scrollPosition");
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    bf(b);
  }, [b]);

  const av = (c) => {
    console.log("a=(c)=>, LinkDashboardPage.js, c=" + c);

    bf(c);
  };

  const useUnload = (fn) => {
    useEffect(() => {
      const callback = fn;

      window.addEventListener("beforeunload", callback);

      window.addEventListener("unload", callback);

      return () => {
        window.removeEventListener("beforeunload", callback);

        window.removeEventListener("unload", callback);
      };
    }, [fn]);
  };

  useUnload((e) => {
    console.log("Page is unloading");

    window.localStorage.setItem("whichOption", "option1");

    window.localStorage.setItem("searchLinks1", "");

    window.localStorage.setItem("searchLinks2", "");

    window.localStorage.setItem("searchLinks3", "");

    window.localStorage.setItem("searchLinks4", "");
  });

  const rerenderit = () => {
    console.log("LinkListDashboardPage.js, in rerender()");

    console.log("ABOUT TO setV1");

    setV1(!v1);

    if (isMobile() === false) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const { id3 } = props.match.params;

    console.log("LinkDashboardPage, User ID:" + JSON.stringify(props.match));
  }, []);

  return (
    <div 
    key={props.auth.uid}
    >
      <ErrorBoundary>
        <ScrollLimit>
          <div className="flexrowh">
            <div id="very-top-id" className="website-background-color">
              <div className="padding-tb-1">
                <LinkListFilters
                  stopScrolling2={props.stopScrolling2}
                  scrollInterval2={props.scrollInterval2}
                  setTheHashTagDivHeight={setTheHashTagDivHeight}
                  b={b}
                  av={av}
                  rerenderit={rerenderit}
                  bookmarks={props.bookmarks}
                />
              </div>
            </div>
          </div>
        </ScrollLimit>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth:state.auth,
  settings: state.settings,
  hasrefreshed: state.hasrefreshed,
  links: state.links,
  signup: state.signup,
  following: state.following,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("startLogout"))
      .catch((error) => console.log("startLogout, error" + error));
  },

  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LinkDashboardPage),
);
