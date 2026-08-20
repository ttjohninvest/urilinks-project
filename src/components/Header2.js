import React, { useState, useEffect } from "react";
//import * as firebase from "firebase";
import * as firebase from 'firebase/app';
import 'firebase/auth';        // If using authentication
import 'firebase/firestore';   // If using Firestore
import 'firebase/database';    // If using Realtime Database
import 'firebase/storage';     // If using Storage  
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
//import logo from "../assets/images/logo-l.png";
import logo from "../assets/images/logo-orange-u.png";
import myprofile from "../assets/images/myprofile.png";
//import { getAuth } from "firebase";
import XShareButton from "./XShareButton";
import setHasrefreshed from "../actions/hasrefreshed";
import { startAddPhotourl } from "../actions/photourl";
import { startAddEmail } from "../actions/email";
import { startDeleteAccount } from "../actions/email";
import { setTheplan } from "../actions/theplan";
import HamburgerMenu from "./HamburgerMenu";

// const preStartLogout=()=>{
//   setLinks([])
//   startLogout()
// }

export const Header2 = (props) => {
  const [deleteAccountError, setDeleteAccountError] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [inviewport, setInviewport] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ideas = () => {};

  //   const isInViewport=()=>{//
  //   const rect = document.getElementById("scrolldownid").getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }

  const setPhotoURLdb = (photoURL) => {
    console.log("setPhotoURLdb, Header.js, photoURL=" + photoURL);
    ////put the photoURL in the database
    props.startAddPhotourl({ photourl: photoURL });
    console.log("Header.js, done calling startAddPhotourl");
  };

  const setEmaildb = (email) => {
    console.log("setEmaildb, Header.js, email=" + email);
    ////put the photoURL in the database
    props.startAddEmail({ email: email });
    console.log("Header.js, done calling startAddEmail");
  };

  useEffect(() => {
    console.log(
      "Header.js, useEffect, props.signup.signup=" + props.signup.signup,
    );
    // const user = firebase.auth().currentUser;
    // console.log("Header.js, useEffect, user.uid=" + user.uid);
    // setPhotoURL("");
    //if(props.signup.signup===false) {
    const user = firebase.auth().currentUser;
    if (user !== null && user !== undefined) {
      console.log("Header.js, user=" + JSON.stringify(user));
      console.log("Header, photoURL=" + user.photoURL);
      const purl = user.photoURL;
      setPhotoURL(purl);
      setPhotoURLdb(purl);
      setEmaildb(user.email);
    }

    //window.scrollTo(0,0)
  }, []);

  const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
  };

  const logoutit = () => {
    //sessionStorage.setItem('hasRefreshed', 'false');
    //const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    props.setHasrefreshed({ hasrefreshed: false });
    //props.setTheplan({subscriptionId:"",plan:"free",customerId:""})
    props.startLogout();
  };

  const cancelsubscription = () => {
    //alert("cancelSubscription, plan:"+props.theplan.plan.replace(/"/g, ""))
    try {
      if (
        confirm("Press Cancel to cancel the deletion of your account.") == true
      ) {
        //console.log("plan="+props.theplan.plan.replace(/"/g, ""))
        //if(true) {
        if (
          !!props.theplan.plan &&
          props.theplan.plan.replace(/"/g, "") === "free"
        ) {
          props.startDeleteAccount();
          logoutit();
        } else {
          //alert(props.theplan.customerId+", "+props.theplan.subscriptionId)
          const theemail = {
            email: props.email,
            customerId: props.theplan.customerId,
            subscriptionId: props.theplan.subscriptionId,
          };

          fetch("https://urilinks-project-vercel-stripe-canc.vercel.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(theemail),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:");

              props.startDeleteAccount();
              logoutit();
            })
            .catch((error) => {
              console.log("cancel subscription error=" + error);
            });
        }
      } else {
        alert("Canceled the deletion of the account");
        console.log("Canceled the Deletion of the Account");
      }
    } catch (error) {
      alert("an error occurred: 10002222");
      console.log("an error occurred: 10002222, error=" + error);
    }
    //
  };

  return (
    <div
      //id="top"

      className="App"
    >
      <header>
        <nav>
          <div>
            <div className="logo">
              {/* <Link
                              className="nounderline ib-"
                              to="/dashboard?signup=signup"
                              title="refresh"
                            >
                              <img
                                className="rounded-full-1"
                                src={logo}
                                width="35"
                                height="35"
                                alt="Logo"
                              />
                            </Link> */}

              {/* <span>urilinks</span> */}
              <header class="solid">
                <img
                  className="rounded-full-1"
                  src={logo}
                  width="35"
                  height="35"
                  alt="Logo"
                />
                <h3 className="color-white-1">urilinks</h3>
              </header>
            </div>
          </div>
          <div className="hamburger-icon" onClick={toggleMenu}>
            {/* The icon can be a simple div or a library component */}
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </nav>
        <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      {/* <main>
        <h1>Welcome to the site</h1>
        <p>Click the hamburger icon in the top corner to open the menu.</p>
      </main> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  signup: state.signup,
  email: state.email,
  theplan: state.theplan,
  subscriptionId: state.subscriptionId,
  customerId: state.customerId,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSdispatch then"))
      .catch((error) =>
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSS dispatch, error" + error),
      );
  },
  setLinks: (links) => dispatch(setLinks(links)),
  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
  startAddPhotourl: (photourl) => dispatch(startAddPhotourl(photourl)),
  startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header2);
