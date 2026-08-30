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
import {startLogout} from "./actions/auth"
//startSetGoogleUserData
import { startSetGoogleUserData } from "./actions/googleuserdata";

import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
import { getTheplan, getTheplan2 } from "./actions/theplan";
import { getThetotalstars, getThetotalstars2 } from "./actions/thetotalstars";
import { //getTheuserscount, 
  getTheuserscount2
  //,incrementUsersClickCount 
} from "./actions/theuserscount";
 
import { getThehashtagsisopen, getThehashtagsisopen2 } from "./actions/thehashtagsisopen";
import { getTheupdatedate, getTheupdatedate2 } from "./actions/theupdatedate";
import { login, logout } from "./actions/auth";
import { setSettings } from "./actions/settings";
//import getVisibleLinks from './selectors/links';
import { getCustomerId } from "./actions/customerid";
import { getSubscriptionId } from "./actions/subscriptionid";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
//
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";
//
console.log = () => {};

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
    //startLogout()
    store.dispatch(login(id));
  } else {
    //startLogout()
    id = "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2";
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
      store
        .dispatch(getTheplan2(id))
        .then(() => {
          store
            .dispatch(getThetotalstars2(id))
            .then(() => {
              store
            .dispatch(getTheupdatedate2(id))
            .then(() => {
               store
            .dispatch(getThehashtagsisopen2(id))
            .then(() => {
              return store
            .dispatch(getTheuserscount2(id))
            .then(() => {
              // const x = {
              //   userscount:theStore.theuserscount.userscount
              // }
              // incrementUsersClickCount(x)
              renderApp(store, signup);
            })
            .catch((error) => {
              console.log("thehashtagsisopen, error", error);
            });
            })
            .catch((error) => {
              console.log("thehashtagsisopen, error", error);
            });
            })
            .catch((error) => {
              console.log("thetotalstars, error", error);
            });
            })
            .catch((error) => {
              console.log("thetotalstars, error", error);
            });
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

  //startLogout()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("logged in user=" + JSON.stringify(user));

      store.dispatch(login(user.uid));

      window.localStorage.setItem("notloggedin", "0");

      store
        .dispatch(startSetLinksNew(user.uid))
        .then(() => {
          store
            .dispatch(getTheplan(user.uid))
            .then(() => {
              store
            .dispatch(getThetotalstars(user.uid))
            .then(() => {
              store
            .dispatch(getTheupdatedate(user.uid))
            .then(() => {
               store
            .dispatch(getThehashtagsisopen(user.uid))
            .then(() => {
               return store
            .dispatch(getTheuserscount(user.uid))
            .then(() => {
              // const x = {
              //   userscount:theStore.theuserscount.userscount
              // }
              // incrementUsersClickCount(x)
              renderApp(store, signup);
            })
            .catch((error) => {
              console.log("thehashtagsisopen, error", error);
            });
            })
            .catch((error) => {
              console.log("theplan, error", error);
            });
            })
            .catch((error) => {
              console.log("theplan, error", error);
            });
            })
            .catch((error) => {
              console.log("theplan, error", error);
            });
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
      history.push("/");
    }
  });
}

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
