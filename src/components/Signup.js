// import React, { useState, useEffect, useRef } from "react";
// import database from "../firebase/firebase";


import React, {useEffect} from "react";
//import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { firebase } from "../firebase/firebase";
//import configureStore from "../store/configureStore";
//import { startSetLinks } from "../actions/links";
//import { getTheplan } from "../actions/theplan";
//import { login, logout } from "../actions/auth";
//import AppRouter, { history } from "../routers/AppRouter";
import  setSignup  from "../actions/signup";
//import LoadingPage from "./LoadingPage";


export const Signup = (props) => {
useEffect(()=>{
  console.log("in Signup")
  props.setSignup({signup:true})
  window.location.href="https://urilinks.com?signup=signup"
  
},[])

  return (
    <div>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSignup: (v) => dispatch(setSignup(v)),
});

//export default connect(mapStateToProps)(Signup);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
//export default connect(undefined, mapDispatchToProps)(Signup);