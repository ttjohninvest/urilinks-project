import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { startSetLinks } from "./actions/links";
import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { login, logout } from "./actions/auth";
import { setSettings } from "./actions/settings";
//import getVisibleLinks from './selectors/links';
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";
//


//console.log=()=>{}
const store = configureStore();
store.subscribe(() => {
  console.log('Store state:', store.getState());
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

//the call back function runs on login and logout
firebase.auth().onAuthStateChanged((user) => {
 

  if (user) {
    console.log("logged in user=" + JSON.stringify(user));//user.photoURL
    store.dispatch(login(user.uid));
    // console.log("user.photoURL="+user.photoURL)
    // console.log("calling setSettings to set the user.photoURL into redux")
  

    store
      .dispatch(startSetLinks())
      .then(() => {
        // renderApp(); //displays the array links stored in redux
        //      if (history.location.pathname === "/") {
        //        history.push("/dashboard");
        //     }

        //startSetLinks reads the links from the db and stores them in redux


 



        //return store.dispatch(startSetSettings()).then(() => {
          return store.dispatch(startSetLinksFileDate()).then(() => {
          //startSetSettings reads the links from the db and stores them in redux
 
          renderApp(); //displays the array links stored in redux
          
          if (history.location.pathname === "/") {
            history.push("/dashboard");
          }
        }).catch((error) => {
          console.log("error", error);
        });
      })
      .catch((error) => {
        console.log("error", error);
      })

      // return store.dispatch(startSetLinksFileDate()).then(() => {
      //     //startSetSettings reads the links from the db and stores them in redux

      //     renderApp(); //displays the array links stored in redux
      //     if (history.location.pathname === "/") {
      //       history.push("/dashboard");
      //     }
      //   }).catch((error) => {
      //     console.log("error", error);
      //   });
      // })
      // .catch((error) => {
      //   console.log("error", error);
      // })
      // })
      
  } else {
    console.log("logout happened")
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
