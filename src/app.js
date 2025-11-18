import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import setSignup from "./actions/signup";
import configureStore from "./store/configureStore";
import { startSetLinks } from "./actions/links";
import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
import { getTheplan } from "./actions/theplan";

import { login, logout } from "./actions/auth";
import { setSettings } from "./actions/settings";
//import getVisibleLinks from './selectors/links';
import {getCustomerId} from './actions/customerid'
import {getSubscriptionId} from './actions/subscriptionid'
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

// import translate from 'baidu-translate-api'
// //

// translate("让我们来翻译吧!").then(res => {
//     console.log(res.trans_result.dst);
//     // Let's translate it!
// });

//console.log = () => {};

let hasRendered = false;
const renderApp = (store) => {
  console.log("about to render the app");
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter signup={signup} />
      </Provider>,
      document.getElementById("app")
    );
    hasRendered = true;
  }
};

//window.location.search = "?signup=signup"
const params = new URLSearchParams(window.location.search);
const signup = params.get("signup");
const id = params.get("id");
console.log("1 signup=" + signup);
console.log("1 id=" + id);
//console.log("store.getState().signup="+store.getState().signup)

let store = configureStore();
let theStore = store.getState();
//console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
console.log("theStore.theplan.plan=" + theStore.theplan.plan);
store.subscribe(() => {});

//if(signup !== "signup") {

if (signup !== "signup") {
  //D9LSg6elood8Yc5gd5oDMp3JNAQ2
  //store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
  //store.dispatch(login("D9LSg6elood8Yc5gd5oDMp3JNAQ2"));

  console.log("2 signup=" + signup);
  console.log("2 id=" + id);

  if (id !== null) {
    store.dispatch(login(id));
  } else {
    store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
  }

  store
    .dispatch(startSetLinks())
    .then(() => {
      return store
        .dispatch(getTheplan())
        .then(() => {
          //return store.dispatch(getSettings()).then(() => {
          renderApp(store, signup);

          if (history.location.pathname === "/") {
            history.push("/dashboard?signup=signup&x=0");
          } else if (history.location.pathname === "/dashboard?signup=signup") {
            history.push("/dashboard?signup=signup&x=1");
          }
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
  store.dispatch({
    type: "SET_SIGNUP",
    signup: { signup: true },
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("logged in user=" + JSON.stringify(user)); //user.photoURL
      store.dispatch(login(user.uid));
      //these two variables will be initialized into the database when a customer buys a plan
      //and available to Delete Account if they are needed
      //store.dispatch(getCustomerId(user.uid)); //this should initialize the redux variable customerId
      //store.dispatch(getSubscriptionId(user.uid));//this should initialize the redux variable subscriptionId

      store
        .dispatch(startSetLinks())
        .then(() => {
          return store
            .dispatch(getTheplan())
            .then(() => {
              //return store.dispatch(getSettings()).then(() => {
              renderApp(store, signup);
              //history.push("/dashboard");

              // props.history.push("/");
              //   //window.location.reload();
              //   window.location.href="https://urilinks.com?signup=signup"

              if (history.location.pathname === "/") {
                //history.push("/dashboard?signup=signup");
                console.log("first one")
                window.location.href = "https://urilinks.com?signup=signup&x=2";
              } else if (
                history.location.pathname === "/dashboard?signup=signup"
              ) {
                console.log("second one")
                window.location.href = "https://urilinks.com?signup=signup&x=3";

              } else if (history.location.pathname === "/dashboard") {
                // sessionStorage.setItem('hasRefreshed', 'true');
                //if (id!==null) {
                // if(signup==="signup") {
                //   console.log("third one")
                   window.location.href = "https://urilinks.com/o?signup=signup";
                // }

                //window.location.reload();
              }
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
