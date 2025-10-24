// import React, { useState, useEffect, useRef } from "react";
// import database from "../firebase/firebase";


import React, {useEffect} from "react";
import { connect } from "react-redux";
import { firebase } from "../firebase/firebase";
import configureStore from "../store/configureStore";
import { startSetLinks } from "../actions/links";
import { getTheplan } from "../actions/theplan";
import { login, logout } from "../actions/auth";


export const Signup = (props) => {

    const store = configureStore();
    //let theStore = store.getState();
    //console.log("theStore.theplan="+JSON.stringify(theStore.theplan))
    //console.log("theStore.theplan.plan=" + theStore.theplan.plan);
    store.subscribe(() => {});
  
    useEffect(()=>{
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
              //renderApp();

              if (history.location.pathname === "/") {
                history.push("/dashboard");
              } else if (history.location.pathname === "/dashboard") {
                history.push("/dashboard");
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
      //renderApp();
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

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(mapStateToProps)(Signup);