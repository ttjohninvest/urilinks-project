// import React, { useState, useEffect, useRef } from "react";
// import database from "../firebase/firebase";


import React, {useEffect} from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import configureStore from "../store/configureStore";
import { startSetLinks } from "../actions/links";
import { getTheplan } from "../actions/theplan";
import { login, logout } from "../actions/auth";
import AppRouter, { history } from "../routers/AppRouter";
import  setSignup  from "../actions/signup";
import LoadingPage from "./LoadingPage";


export const Signup = (props) => {

    const store = configureStore();
    //let theStore = store.getState();
    //console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
    //console.log("theStore.theplan.plan=" + theStore.theplan.plan);
    store.subscribe(() => {
        console.log("in signup.js, store.state = "+store.getState())
    });

    let hasRendered = false;
const renderApp = () => {
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
  
    useEffect(()=>{






firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("2 logged in user=" + JSON.stringify(user)); //user.photoURL
      store.dispatch(login(user.uid));


      

      store.dispatch(startSetLinks())
        .then(() => {
          return store
            .dispatch(getTheplan())
            .then(() => {
                props.setSignup({signup:true});
              //return store.dispatch(getSettings()).then(() => {
              renderApp();
            //history.push("/dashboard");
             
             history.push("/dashboard");
            //   if (history.location.pathname === "/") {
            //     history.push("/dashboard");
            //   } else if (history.location.pathname === "/dashboard") {
            //     history.push("/dashboard");
            //   }
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

    },[])

  return (
    <div>
Signup
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     settings: state.settings,
//   };
// };

const mapDispatchToProps = (dispatch) => ({
  setSignup: (v) => dispatch(setSignup(v)),
});

//export default connect(mapStateToProps)(Signup);
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
export default connect(undefined, mapDispatchToProps)(Signup);