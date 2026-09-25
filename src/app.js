import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import setSignup from "./actions/signup";
/////////////////start
//put these in express server because it needs fs
// const router = require('./routers/AppRouter').default;
// const Sitemap = require('react-router-sitemap').default;
// function generateSitemap() {
//   return (
//     new Sitemap(router)
//       .build('https://urilinks.com')
//       .save('./sitemap.xml')
//   );
// }

// generateSitemap();
////////////end

//import configureStore from "./store/configureStore";
import store from "./store";
import { startSetLinks, startSetLinksNew, startAddLink } from "./actions/links";
import { startSetLinks2 } from "./actions/links2";
import { startSetPeople } from "./actions/people";
import { startLogout } from "./actions/auth";
//startSetGoogleUserData
import { startSetGoogleUserData } from "./actions/googleuserdata";

import { startSetLinksFileDate } from "./actions/linksfiledate";
//import { startSetSettings } from "./actions/settings";
import { getSettings } from "./actions/settings";
import { getTheplan, getTheplan2 } from "./actions/theplan";
import { getThetotalstars, getThetotalstars2 } from "./actions/thetotalstars";
import { startSetUsers } from "./actions/users";
import {
  getThetotalloggedout,
  getThetotalloggedout2,
} from "./actions/thetotalloggedout";
import {
  getThesharablelink,
  getThesharablelink2,
} from "./actions/thesharablelink";
import { getTheuserscount2 } from "./actions/theuserscount";
import {
  getThesignupcount,
  getThesignupcount2,
} from "./actions/thesignupcount";
import {
  getTheuserscounti,
  getTheuserscounti2,
} from "./actions/theuserscounti";

import {
  getThehashtagsisopen,
  getThehashtagsisopen2,
} from "./actions/thehashtagsisopen";

import {
  getTheothersisopen,
  getTheothersisopen2,
} from "./actions/theothersisopen";

import { getTheloggedin, getTheloggedin2 } from "./actions/theloggedin";

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

//const { id3 } = useParams();
let id3 = null

const params = new URLSearchParams(window.location.search);
const signup = params.get("signup");

let id2;
let id = params.get("id");
//if(id3===null)
id2 = id
//else id2 = id3
let z2 = params.get("z2");
console.log("1 z2=" + z2);
console.log("1 signup=" + signup);
console.log("1 id=" + id);

let x10 = params.get("x");

let theStore = store.getState();
//console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
console.log("theStore.theplan.plan=" + theStore.theplan.plan);
store.subscribe(() => {
  console.log("A,theStore=" + JSON.stringify(theStore));
});

store
  .dispatch(getTheuserscount2())
  .then(() => {})
  .catch((error) => {
    console.log("app.js,theuserscount, error", error);
  });

console.log("app.js, 0th one abc")



if (signup !== "signup") {
  console.log("app.js, 1st one abc")
  window.localStorage.setItem("notloggedin", "1");

  if (id2 !== null) {
    console.log("app.js, 2nd one abc")
    store.dispatch(login(id2));
  } else {
    console.log("app.js, 3rd one abc")
    id2 = "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2";
    store.dispatch(login(id2));
  }

  try {
  store
    .dispatch(startSetLinks(id2))
    .then(() => {
      store
        .dispatch(getTheplan2(id2))
        .then(() => {
          store
            .dispatch(getThetotalstars2(id2))
            .then(() => {
              store
                .dispatch(getTheupdatedate2(id2))
                .then(() => {
                  store
                    .dispatch(getThehashtagsisopen2(id2))
                    .then(() => {
                      store
                        .dispatch(getThesharablelink2(id2))
                        .then(() => {
                          store
                            .dispatch(getThesignupcount2())
                            .then(() => {
                              store
                                .dispatch(getThetotalloggedout2())
                                .then(() => {
                                  if (id === null) {
                                    store
                                      .dispatch(getTheuserscounti2(id2))
                                      .then(() => {
                                        store
                                          .dispatch(getTheloggedin2())
                                          .then(() => {
                                             store
                                          .dispatch(startSetUsers())
                                          .then(() => {
                                             return store
                                          .dispatch(getTheothersisopen2(id2))
                                          .then(() => {
                                            renderApp(store, signup);
                                          })
                                          .catch((error) => {
                                            console.log(
                                              "theplan, error",
                                              error,
                                            );
                                          });
                                          })
                                          .catch((error) => {
                                            console.log(
                                              "theplan, error",
                                              error,
                                            );
                                          });
                                          })
                                          .catch((error) => {
                                            console.log(
                                              "theplan, error",
                                              error,
                                            );
                                          });
                                      })
                                      .catch((error) => {
                                        console.log(
                                          "thehashtagsisopen, error",
                                          error,
                                        );
                                      });
                                  } else {
                                    //goes here if shared page was loaded into the browser
                                    renderApp(store, signup);
                                  }
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
  } catch(e) {
    console.log("app.js part 1, error="+e)
  }
} else {
  console.log("app.js, 4th one abc")
  store.dispatch({
    type: "SET_SIGNUP",
    signup: { signup: true },
  });

  try {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("app.js, 5th one abc")
    if (user) {
      console.log("app.js, 6th one abc")
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
                          store
                            .dispatch(getThesharablelink(user.uid))
                            .then(() => {
                              store
                                .dispatch(getTheuserscounti(user.uid))
                                .then(() => {
                                  store
                                    //.dispatch(getThesignupcount(theStore.theloggedin.loggedin))
                                    .dispatch(getThesignupcount(z2))
                                    .then(() => {
                                      store
                                        .dispatch(getThetotalloggedout())
                                        .then(() => {
                                          store
                                            .dispatch(getTheloggedin(user.uid))
                                            .then(() => {
                                              store
                                            .dispatch(startSetUsers(user.uid))
                                            .then(() => {
                                              return store
                                            .dispatch(getTheothersisopen(user.uid))
                                            .then(() => {
                                              renderApp(store, signup);
                                            })
                                            .catch((error) => {
                                              console.log(
                                                "theplan, error",
                                                error,
                                              );
                                            });
                                            })
                                            .catch((error) => {
                                              console.log(
                                                "theplan, error",
                                                error,
                                              );
                                            });
                                            })
                                            .catch((error) => {
                                              console.log(
                                                "theplan, error",
                                                error,
                                              );
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
  } catch(e) {
    console.log("app.js part 2, error="+e)
  }
}



ReactDOM.render(<LoadingPage />, document.getElementById("app"));

