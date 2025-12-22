import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import setSignup from "./actions/signup";
//import configureStore from "./store/configureStore";
import store from './store'
import { startSetLinks } from "./actions/links";
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


// import translate from 'baidu-translate-api'
// // //

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
        <AppRouter />
      </Provider>,
      document.getElementById("app")
    );
    hasRendered = true;
  }
};

//window.location.search = "?signup=signup"
const params = new URLSearchParams(window.location.search);
const signup = params.get("signup");

let id = params.get("id");
console.log("1 signup=" + signup);
console.log("1 id=" + id);
//console.log("store.getState().signup="+store.getState().signup)

//let store = configureStore();
let theStore = store.getState();
//console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
console.log("theStore.theplan.plan=" + theStore.theplan.plan);
store.subscribe(() => {
  console.log("A,theStore="+JSON.stringify(theStore))
});

//if(signup !== "signup") {

if (signup !== "signup") {
  //D9LSg6elood8Yc5gd5oDMp3JNAQ2
  //store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
  //store.dispatch(login("D9LSg6elood8Yc5gd5oDMp3JNAQ2"));

  console.log("2 signup !== 'signup' signup=" + signup);
  console.log("2 signup !== 'signup' id=" + id);

  if (id !== null) {
    store.dispatch(login(id));
  } else {
    id = "W4XCM1PRqtZeAzCZ0ALlEFrIwaw1";
    store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
  }

// store //for People menu item
//     .dispatch(startSetPeople())
//     .then(() => {
// store //for list all public links menu item
//     .dispatch(startSetLinks2())
//     .then(() => {
store
    .dispatch(startSetLinks(id))
    .then(() => {
        return store
        .dispatch(getTheplan2())
        .then(() => {
          //return store.dispatch(getSettings()).then(() => {
          renderApp(store, signup);

          if (history.location.pathname === "/") {
            history.push("/dashboard?signup=signup&x=0");
          } else if (history.location.pathname === "/dashboard?signup=signup") {
            history.push("/dashboard?signup=signup&x=1");
          }
          
        })
        .catch((error) => {
          console.log("theplan, error", error);
        })
      })
    .catch((error) => {
      console.log("error", error);
    })

  //})
    //   .catch((error) => {
    //   console.log("error", error);
    // });

    //  })
    //   .catch((error) => {
    //   console.log("error", error);
    // });


 
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

// store //for People menu item
//     .dispatch(startSetPeople())
//     .then(() => {
// store //for list all public links menu item
//         .dispatch(startSetLinks2())
//         .then(() => {
store
        .dispatch(startSetLinks(user.uid))
        .then(() => {
        return store
            .dispatch(getTheplan())
            .then(() => {
              //return store.dispatch(getSettings()).then(() => {
              renderApp(store, signup);
              

              if (history.location.pathname === "/") {
                //history.push("/dashboard?signup=signup");
                console.log("first one");
                window.location.href = "https://urilinks.com?signup=signup&x=2";
              } else if (
                history.location.pathname === "/dashboard?signup=signup"
              ) {
                console.log("second one");
                window.location.href = "https://urilinks.com?signup=signup&x=3";
              } else if (history.location.pathname === "/dashboard") {
                // DON'T DELETE THE FOLLOWING LINE*********************************************** 
                window.location.href = "https://urilinks.com/o?signup=signup"; //this one was needed to have the folder name drop down list TO WORK IN in LinkListFilters.js
                // DON'T DELETE THE ABOVE LINE*********************************************** 
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

        // })
        // .catch((error) => {
        //   console.log("error", error);
        // });

        //  })
        // .catch((error) => {
        //   console.log("error", error);
        // });

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
