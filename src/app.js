import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { startSetLinks } from "./actions/links";
import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
import { getTheplan } from "./actions/theplan";
import { setCustomerId } from "./actions/setcustomerid";
import { login, logout } from "./actions/auth";
import { setSettings } from "./actions/settings";
//import getVisibleLinks from './selectors/links';
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
let firsttime=false
//console.log = () => {};
const store = configureStore();
console.log("store.theplan="+store.theplan)
store.subscribe(() => {
  console.log("Store state:", store.getState());
});
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  console.log("about to render the app");
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

if(firsttime===true) {
if ("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"==="W4XCM1PRqtZeAzCZ0ALlEFrIwaw1") {
    //console.log("logged in user=" + JSON.stringify(user)); //user.photoURL
    //store.dispatch(login(user.uid));
    //store.dispatch(login("D9LSg6elood8Yc5gd5oDMp3JNAQ2"));
    store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));

    store
      .dispatch(startSetLinks())
      .then(() => {
        return store
          .dispatch(getTheplan())
          .then(() => {
            //return store.dispatch(getSettings()).then(() => {
              renderApp();

              if (history.location.pathname === "/") {
                history.push("/dashboard");
              } else if (history.location.pathname === "/dashboard") { 
                history.push("/dashboard")
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
    renderApp();
    history.push("/");
  }

 } else {
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("logged in user=" + JSON.stringify(user)); //user.photoURL
    store.dispatch(login(user.uid));

    store
      .dispatch(startSetLinks())
      .then(() => {
        return store
          .dispatch(getTheplan())
          .then(() => {
            //return store.dispatch(getSettings()).then(() => {
              renderApp();

              if (history.location.pathname === "/") {
                history.push("/dashboard");
              } else if (history.location.pathname === "/dashboard") { 
                history.push("/dashboard")
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
    renderApp();
    history.push("/");
  }
});
 }
