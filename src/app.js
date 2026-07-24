import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import setSignup from "./actions/signup";

//import configureStore from "./store/configureStore";
import store from "./store";
import { startSetLinks, startSetLinksNew, startAddLink } from "./actions/links";
import { startSetLinks2 } from "./actions/links2";
import { startSetPeople } from "./actions/people";
//startSetGoogleUserData
import { startSetGoogleUserData } from "./actions/googleuserdata";

import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
import { getTheplan, getTheplan2 } from "./actions/theplan";

import { login, logout } from "./actions/auth";
import { setSettings } from "./actions/settings";
//import getVisibleLinks from './selectors/links';
import { getCustomerId } from "./actions/customerid";
import { getSubscriptionId } from "./actions/subscriptionid";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

//console.log = () => {};

let hasRendered = false;
const renderApp = (store) => {
  console.log("about to render the app");

  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById("app"),
  );
};

/*

*/

const params = new URLSearchParams(window.location.search);
const signup = params.get("signup");

let id = params.get("id");
console.log("1 signup=" + signup);
console.log("1 id=" + id);

let theStore = store.getState();
//console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
console.log("theStore.theplan.plan=" + theStore.theplan.plan);
store.subscribe(() => {
  console.log("A,theStore=" + JSON.stringify(theStore));
});

if (signup !== "signup") {
  window.localStorage.setItem("notloggedin", "1");

  if (id !== null) {
    store.dispatch(login(id));
  } else {
    id = "RZOEMMu7Nwa5bQ51sf71FfDX3A93";
    store.dispatch(login(id));
    //trying to get auth.uid set for firebase realtime database
    //https://search.brave.com/search?q=signinwithcustomtoken+example&summary=1&conversation=09551df67729851dc86250d9dcba75ea9728
    //let uid = id
    //const customToken = await admin.auth().createCustomToken(uid);
    //const userCredential = await signInWithCustomToken(auth, token);
    //const user = userCredential.user;
    //console.log("Signed in:", user.uid);
  }

  store
    .dispatch(startSetLinks(id))
    .then(() => {
      return store
        .dispatch(getTheplan2(id))
        .then(() => {
          renderApp(store, signup);
        })
        .catch((error) => {
          console.log("theplan, error", error);
        });
    })
    .catch((error) => {
      console.log("error", error);
    });
} else {
  store.dispatch({
    type: "SET_SIGNUP",
    signup: { signup: true },
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("logged in user=" + JSON.stringify(user));

      store.dispatch(login(user.uid));

      window.localStorage.setItem("notloggedin", "0");
      // store.dispatch(startAddLink({ //only do this on the first one
      //     showpublic:false,
      //     longname:"longname",
      //     description : "description",
      //     Url : "url.com",
      //     yturl : "yturl.com",
      //     note : "#first",
      //     foldername : "foldername",
      //     amount : 0,
      //     createdAt : 0,
      //     faviconURL : "",
      //   })).then(()=>{}).catch(()=>{})

      store
        .dispatch(startSetLinksNew(user.uid))
        .then(() => {
          return store
            .dispatch(getTheplan(user.uid))
            .then(() => {
              //return store.dispatch(getSettings()).then(() => {
              renderApp(store, signup);

              // console.log("111 history.location.pathname="+history.location.pathname)
              // if (history.location.pathname === "/") {
              //   //history.push("/dashboard?signup=signup");
              //   console.log("first one");
              //   window.location.href = "https://urilinks.com?signup=signup&x=2";
              // } else if (
              //   history.location.pathname === "/dashboard?signup=signup"
              // ) {
              //   console.log("second one");
              //   window.location.href = "https://urilinks.com?signup=signup&x=3";
              // } else if (history.location.pathname === "/dashboard") {
              //   console.log("third one");
              //   // DON'T DELETE THE FOLLOWING LINE***********************************************
              //   window.location.href = "https://urilinks.com/o?signup=signup"; //this one was needed to have the folder name drop down list TO WORK IN in LinkListFilters.js
              //   // DON'T DELETE THE ABOVE LINE***********************************************
              // }

              //});
            })
            .catch((error) => {
              console.log("theplan, error", error);
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("logout happened");
      store.dispatch(logout());
      renderApp(store, signup);
      //history.push("/dashboard?signup=signup");
      history.push("/");
    }
  });
}

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
