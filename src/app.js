import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import  setSignup  from "./actions/signup";
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
console.log = () => {};

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
const signup = params.get('signup');
const id = params.get('id');
console.log("signup="+signup)
//console.log("store.getState().signup="+store.getState().signup)

let store = configureStore();
let theStore = store.getState();
//console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
console.log("theStore.theplan.plan=" + theStore.theplan.plan);
store.subscribe(() => {});

//if(signup !== "signup") {

if(signup !== "signup") {



    //D9LSg6elood8Yc5gd5oDMp3JNAQ2
    //store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
    //store.dispatch(login("D9LSg6elood8Yc5gd5oDMp3JNAQ2"));
    
    if(id!=="")
    {
store.dispatch(login(id));
    } else {
      store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));
    }
    

    store.dispatch(startSetLinks())
      .then(() => {
        return store
          .dispatch(getTheplan())
          .then(() => {
            //return store.dispatch(getSettings()).then(() => {
            renderApp(store);

            if (history.location.pathname === "/") {
              history.push("/dashboard?signup=signup");
            } else if (history.location.pathname === "/dashboard?signup=signup") {
              history.push("/dashboard?signup=signup");
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
 

}  else {
  
    store.dispatch({
  type: "SET_SIGNUP",
  signup:{signup:true}
})
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in user=" + JSON.stringify(user)); //user.photoURL
        store.dispatch(login(user.uid));
  
        store.dispatch(startSetLinks())
          .then(() => {
            return store
              .dispatch(getTheplan())
              .then(() => {
                //return store.dispatch(getSettings()).then(() => {
                renderApp(store);
              //history.push("/dashboard");
                if (history.location.pathname === "/") {
                  history.push("/dashboard?signup=signup");
                } else if (history.location.pathname === "/dashboard?signup=signup") {
                  history.push("/dashboard?signup=signup");
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
        renderApp(store);
        history.push("/");
      }
    });

}




ReactDOM.render(<LoadingPage />, document.getElementById("app"));

//if (true) { //firsttime
//   if (signup !== "signup") {

//     store.dispatch(login("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1"));

//     store.dispatch(startSetLinks())
//       .then(() => {
//         return store
//           .dispatch(getTheplan())
//           .then(() => {
//             //return store.dispatch(getSettings()).then(() => {
//             renderApp();

//             if (history.location.pathname === "/") {
//               history.push("/dashboard");
//             } else if (history.location.pathname === "/dashboard") {
//               history.push("/dashboard");
//             }
//             //});
//           })
//           .catch((error) => {
//             console.log("theplan, error", error);
//           });
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
 
// } else {
  
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log("logged in user=" + JSON.stringify(user)); //user.photoURL
//         store.dispatch(login(user.uid));
  
//         store.dispatch(startSetLinks())
//           .then(() => {
//             return store
//               .dispatch(getTheplan())
//               .then(() => {
//                 //return store.dispatch(getSettings()).then(() => {
//                 renderApp();
//               //history.push("/dashboard");
//                 if (history.location.pathname === "/") {
//                   history.push("/dashboard");
//                 } else if (history.location.pathname === "/dashboard") {
//                   history.push("/dashboard");
//                 }
//                 //});
//               })
//               .catch((error) => {
//                 console.log("theplan, error", error);
//               });
//           })
//           .catch((error) => {
//             console.log("error", error);
//           });
//       } else {
//         console.log("logout happened");
//         store.dispatch(logout());
//         renderApp();
//         history.push("/");
//       }
//     });
// }
