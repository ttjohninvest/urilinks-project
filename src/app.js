import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { startSetLinks } from "./actions/links";
import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
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

//console.log=()=>{} //
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
          //console.log("before, getSettings") 
          //getSettings()
          //console.log("after, getSettings")
return store.dispatch(getSettings()).then((r) => {
  //console.log("getSettings, settings="+JSON.stringify(r))
  //create stripe customer here, begin https://search.brave.com/search?q=using+react+how+do+i+create+a+stripe+customer+during+registration&summary=1&conversation=4cf05c04b8982177ac075c
          
  //this function puts the user id as metadata into stripe
  const createCustomer = async () => {
  //const response = await fetch('/create-customer', {

  const response = await fetch('https://urilinks-project-create-customer-ap.vercel.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email:user.email, uid:user.uid }),
  });
  const data = await response.json();
  //data.customer.id
  console.log("data.customer.id="+data.customer.id)

   console.log(data);
  //store.dispatch(setCustomerId(data.customer.id))
  const settings = useSelector(state => state.settings);
   console.log(settings)
 
  //data.customer.metadata.uid
  
};

createCustomer()  
//store.dispatch(setCustomerId(a))

  renderApp(); //displays the array links stored in redux
          
          if (history.location.pathname === "/") {
            history.push("/dashboard");
          }
  //create stripe customer here, end
        })


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
