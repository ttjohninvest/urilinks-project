import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import logo from "../assets/images/logo9.png";
import myprofile from "../assets/images/myprofile.png";
//import { getAuth } from "firebase";
import XShareButton from "./XShareButton";
import setHasrefreshed from "../actions/hasrefreshed";
import { startAddPhotourl } from "../actions/photourl";
import { startAddEmail } from "../actions/email";
import { startDeleteAccount } from "../actions/email";
import { setTheplan } from "../actions/theplan";

// const preStartLogout=()=>{
//   setLinks([])
//   startLogout()
// }

export const Header = (props) => {
  const [deleteAccountError, setDeleteAccountError] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [inviewport, setInviewport] = useState(false);
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
      "Header.js, useEffect, props.signup.signup=" + props.signup.signup
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

    // }
    // else {
    //   setPhotoURL("");
    // }
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
alert("cancelSubscription, plan:"+props.theplan.plan.replace(/"/g, ""))
    try {
if (confirm("Please press a button.") == true) {
    console.log("plan="+props.theplan.plan.replace(/"/g, ""))
    //if(true) {
    if(props.theplan.plan.replace(/"/g, "")==="free") {
        props.startDeleteAccount()
                logoutit()

        
    } else {
      alert(props.theplan.customerId+", "+props.theplan.subscriptionId)
    const theemail = { "email": props.email, customerId:props.theplan.customerId, subscriptionId:props.theplan.subscriptionId };
   
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
        
        props.startDeleteAccount()
                logoutit()

        
      })
      .catch((error) => {
        console.log("cancel subscription error=" + error);
      });
    }
    } else {
      alert("Canceled the deletion of the account")
      console.log("Canceled the Deletion of the Account");
    }
    } catch(error) {
       alert("an error occurred: 10002222")
       console.log("an error occurred: 10002222, error="+error)
    }
    //
  
  };

  return (
    <div id="top">
      {!deleteAccountError ? (
        <header className="header">
          <div className="">
            <div className="flexrow2w">
              <div className="padding-leftright padding-top-11124">
                <Link
                  className="nounderline ib"
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
                </Link>
              </div>
              {props.signup.signup === false && (
                <div
                  className="color-white-1"
                  title="Please use it for good. Bookmarks for internet pages, urls/links"
                >
                  <Link
                    className="nounderline color-white-1 cursor-pointer"
                    to="/signup"
                    title=""
                  >
                    login
                  </Link>
                </div>
              )}
              {/* <div className="color-white-1">p:{props.theplan.plan}</div>
              <div className="color-white-1">c_Id:{props.theplan.customerId}</div>
              <div className="color-white-1">s_Id:{props.theplan.subscriptionId}</div> */}
              <div
                className="color-white-1"
                title="Please use it for good. Bookmarks for internet pages, urls/links"
              >
                <Link
                  className="nounderline color-white-1 cursor-pointer"
                  to="/dashboard"
                  title="refresh"
                >
                  urilinks (link to links tool)
                </Link>
              </div>
              {props.signup.signup === true ? (
                <div className="padding-top-1112">
                  <img
                    src={photoURL}
                    width="32"
                    height="32"
                    style={{ borderRadius: "50%" }}
                    className="ib- margin-bottom-11-"
                  />
                </div>
              ) : (
                <div className="padding-top-1112" title="welcome">
                  {firebase.auth().currentUser !== null &&
                  firebase.auth().currentUser !== undefined ? (
                    <img
                      src={photoURL}
                      width="32"
                      height="32"
                      style={{ borderRadius: "50%" }}
                      className="ib- margin-bottom-11-"
                    />
                  ) : (
                    <img
                      src={myprofile}
                      width="32"
                      height="32"
                      style={{ borderRadius: "50%" }}
                      className="ib- margin-bottom-11-"
                    />
                  )}
                </div>
              )}
              <div>
                <Link className="header__title- nounderline" to="/benefits">
                  <span
                    className="margin-right-1-ib- color-white-1 cursor-pointer"
                    title="How to use this website"
                  >
                    (How to use)
                  </span>
                </Link>
              </div>

              <div>
                <Link
                  className="header__title- nounderline"
                  to="/termsandprivacy"
                >
                  <span
                    className="ib- color-white-1 cursor-pointer"
                    title="terms, conditions and privacy policy"
                  >
                    (legal)
                  </span>
                </Link>
              </div>
              {props.theplan.plan.replace(/"/g, "")!=="premium" && props.signup.signup === true && (
                <div>
                  <Link className="header__title" to="/teirspayment3">
                    <span
                      className="ib"
                      title="please select a plan, basic ($4.99/year), standard ($9.99/year) or premium ($14.99/year)"
                    >
                      (plans ($))
                    </span>
                  </Link>
                </div>
              )}
              {!inviewport && (
                <div
                  id="scrolldownid"
                  className="header__title- padding-top-11- cursor-pointer color-white-1 cursor-pointer nounderline"
                  onClick={scrolldown}
                  title="if the search and results section is not in view, click this to scroll search and results section into view."
                >
                  (search section)
                </div>
              )}

              <div>
                <Link className="header__title- nounderline" to="/ideas">
                  <span
                    className="ib- color-white-1 cursor-pointer"
                    title="some ideas for hash tags"
                  >
                    (Bookmark Ideas)
                  </span>
                </Link>
              </div>

              {props.signup.signup === true ? (
                <div className="hide-">
                  <a
                    className="header__title- nounderline pointereventsauto"
                    href="https://urilinks-project-urls-to-tabs-html.vercel.app"
                    target="_blank"
                  >
                    <span
                      className="ib- color-white-1 cursor-pointer"
                      title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader."
                    >
                      (get page urls for bookmarks file)
                    </span>
                  </a>
                </div>
              ) : (
                <div className="hide-">
                  <a
                    className="header__title- nounderline pointereventsnone"
                    href="https://urilinks-project-urls-to-tabs-html.vercel.app"
                    target="_blank"
                  >
                    <span
                      className="ib- color-white-1 cursor-pointer"
                      title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader."
                    >
                      (get page urls for bookmarks file)
                    </span>
                  </a>
                </div>
              )}

              {props.signup.signup === true ? (
                <div className="pointereventsauto hide-">
                  <Link
                    className="header__title- nounderline pointereventsauto"
                    to="/bookmarksmanager"
                  >
                    <span
                      className="ib- color-white-1 cursor-pointer pointereventsauto"
                      title="tool to upload bookmarks.html from chrome, opera, firefox, or brave browser or the boomarks.html file generated through the use of the link get page urls for bookmarks file."
                    >
                      (Bookmarks File Uploader)
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="pointereventsnone margin-right-1 hide-">
                  <Link
                    className="header__title- nounderline pointereventsnone"
                    to="/bookmarksmanager"
                  >
                    <span
                      className="ib- color-white-1 cursor-pointer pointereventsnone"
                      title="tool to upload bookmarks.html from chrome, opera, firefox, or brave browser or the boomarks.html file generated through the use of the link get page urls for bookmarks file."
                    >
                      (Bookmarks File Uploader)
                    </span>
                  </Link>
                </div>
              )}

              {props.signup.signup === true ? (
                <div className="margin-top-1111a-">
                  <button
                    className="button button--link ib text-size-3- color-white-1 cursor-pointer"
                    onClick={logoutit}
                  >
                    (Logout)
                  </button>
                </div>
              ) : (
                ""
              )}

              {props.signup.signup === true ? (
                <div className="margin-top-1111a-">
                  <button
                    className="button button--link ib text-size-3- color-white-1 cursor-pointer"
                    onClick={cancelsubscription}
                  >
                    (Delete Account)
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </header>
      ) : (
        "Timeout error: To delete your accout, you will need to logout, relogin and then emmediately delete the account."
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  signup: state.signup,
  email: state.email,
  theplan: state.theplan,
  subscriptionId: state.subscriptionId,
  customerId: state.customerId
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSdispatch then"))
      .catch((error) =>
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSS dispatch, error" + error)
      );
  },
  setLinks: (links) => dispatch(setLinks(links)),
  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
  startAddPhotourl: (photourl) => dispatch(startAddPhotourl(photourl)),
  startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
