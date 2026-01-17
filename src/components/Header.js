import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import redarrow from "../assets/images/red-arrow.jpg";

//import logo from "../assets/images/logo-l.png";
//import logo from "../assets/images/logo-orange-urilinks.png";
import logo from "../assets/images/logo-orange-u.png";
import logo2 from "../assets/images/logo-urilinks.png";
import myprofile from "../assets/images/myprofile.png";
import signature from "../assets/images/signature.png";
//import { getAuth } from "firebase";
import XShareButton from "./XShareButton";
import setHasrefreshed from "../actions/hasrefreshed";
import { startAddPhotourl } from "../actions/photourl";
import { startAddBmok } from "../actions/bmok";
import { startAddDisplayname } from "../actions/displayname";
import { startAddGoogleUserData } from "../actions/googleuserdata";
import { startAddEmail } from "../actions/email";
import { startDeleteAccount } from "../actions/email";
import { setTheplan } from "../actions/theplan";
import Header2 from "./Header2";

export const Header = (props) => {
  const [deleteAccountError, setDeleteAccountError] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [inviewport, setInviewport] = useState(false);
  const [toggledUse, setToggledUse] = useState(false);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("")
  const [bmok, setBmok] = useState(false);
  const ideas = () => {};

  const isInMeArray = (uid) => {
    //these email address are allowed to upload bookmark files
    const mearray = [
      "zIK65gVpE9RPpHFZprjblMGJ2KB3",
      "D9LSg6elood8Yc5gd5oDMp3JNAQ2",
      "WJGHkWycjKQxPK83Fi4zqx53bCl1",
      "W4XCM1PRqtZeAzCZ0ALlEFrIwaw1",
      "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2",
      "RZOEMMu7Nwa5bQ51sf71FfDX3A93",
      "Gj6I5M7qf8ODZCsFqC3zAuFTXgx2", //,
      //"7CzFYQjw2aUhHgCYjS2eDODrfVE2" //jmjohnmcgovern707@gmail.com
    ];
    let val = false;
    mearray.forEach((id) => {
      if (uid === id) val = true;
    });

    return val;
  };

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");

  const setPhotoURLdb = (photoURL) => {
    console.log("setPhotoURLdb, Header.js, photoURL=" + photoURL);
    ////put the photoURL in the database
    props.startAddPhotourl({ photourl: photoURL });
    console.log("Header.js, done calling startAddPhotourl");
  };

  const setBmokdb = (bmok) => {
    console.log("setBmokdb, Header.js, bmok=" + bmok);
    ////put the photoURL in the database
    props.startAddBmok({ bmok: bmok });
    console.log("Header.js, done calling startAddBmok");
  };

  const setDisplayNamedb = (displayName) => {
    console.log("setDisplayNamedb, Header.js, displayName=" + displayName);
    ////put the photoURL in the database
    props.startAddDisplayname({ displayname: displayName });
    console.log("Header.js, done calling startAddDisplayname");
  };

  const setGoogleUserDatadb = (gud) => {
    console.log("setGoogleUserDatadb, Header.js, gud=" + gud);
    ////put the photoURL in the database
    props.startAddGoogleUserData({ gud: gud });
    console.log("Header.js, done calling startGoogleUserData");
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
      const bmok = user.bmok;
      const dn = user.displayName;
      const gud = {
        photourl: purl,
        displayname: dn,
        email: user.email,
        uid: user.uid,
      };
      setPhotoURL(purl);
      setPhotoURLdb(purl);

      const ttbmok = true;
      if (bmok === undefined) setBmok(ttbmok);
      else setBmok(bmok);
      if (bmok === undefined) setBmokdb(ttbmok);
      else setBmokdb(bmok);

      setDisplayNamedb(dn);
      setGoogleUserDatadb(gud);
      setEmaildb(user.email);
      setUid(gud.uid);
      setName(gud.displayname)
    }

    // }
    // else {
    //   setPhotoURL("");
    // }
  }, []);

  const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
    window.document.getElementById("termid").focus();
  };

  const scrolldown2 = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
    window.document.getElementById("addlinkid").focus();
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
        if (props.theplan.plan.replace(/"/g, "") === "free") {
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

  // if (isMobile()) {
  //   console.log("Mobile device detected");
  // } else {
  //   console.log("Desktop device detected");
  // }//

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  // function isMobile() {
  //     const minWidth = 768; // Minimum width for desktop devices
  //     return window.innerWidth < minWidth;
  // }

  const setToggledUsea = () => {
    setToggledUse(!toggleUse);
  };

  return (
    <div>
      {isMobile() === false ? (
        <div id="top">
          {!deleteAccountError ? (
            <header className="header relief-">
              <div className="">
                <div className="flexrow2w">
                  <div className="flexrowzl1">
                    <Link
                      className="nounderline color-white-1 cursor-pointer"
                      to="/dashboard"
                      title=""
                    >
                      <header className="margin-left-11 solid">
                        <img
                          className="rounded-full-1 thumbnail-"
                          src={logo}
                          width="35"
                          height="35"
                          alt="Logo"
                        />

                        <h3 className="color-white-1">urilinks</h3>
                        {/* <img
                      className=""
                      src={logo2}
                      width="60"
                      height="35"
                      alt="urilinks logo"
                    /> */}
                      </header>
                    </Link>

                    <div className="margin-left-118 margin-top-1">
                      <img src={signature} className="minwidth" />
                    </div>
                  </div>

                  {/* {props.signup.signup === false && (
                    <div
                      className="color-white-1"
                      title="Please use it for good. Bookmarks for internet pages, urls/links"
                    >
                      <Link
                        className="nounderline color-white-1 cursor-pointer"
                        to="/signup"
                        title=""
                      >
                        login/enter
                      </Link>
                    </div>
                  )} */}

                  {/* <div
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
                  </div> */}

                  {props.signup.signup === true || signup === "0" ? (
                    <div className="padding-top-1112 margin-left-118">
                      <img
                        src={photoURL}
                        width="32"
                        height="32"
                        style={{ borderRadius: "50%" }}
                        className="ib- margin-bottom-11-"
                        title={name}
                      />
                    </div>
                  ) : (
                    <div
                      className="padding-top-1112 margin-left-118-"
                      title="welcome"
                    >
                      {
                        //firebase.auth().currentUser !== null &&
                        //firebase.auth().currentUser !== undefined
                        //photourl==="" ||
                        false ? ( // uid !== null
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
                            title={name}
                          />
                        )
                      }
                    </div>
                  )}

                  {/* <div>
                  <a href="https://colleges-index-2.netlify.app/" className="header__title- nounderline color-white-1 cursor-pointer" target="_blank" title="Click to see a  list of colleges and universities">colleges</a>
                  </div> */}

                  <div>
                    <Link
                      className="header__title- nounderline"
                      to="/use"
                      target="_blank"
                    >
                      <span
                        className="margin-right-1-ib- color-white-1- color-black-2 cursor-pointer"
                        title="Click to see how to use this website."
                      >
                        usage
                      </span>
                    </Link>
                  </div>

                  <div>
                    <Link
                      className="header__title- nounderline"
                      to="/termsandprivacy"
                      target="_blank"
                    >
                      <span
                        className="ib- color-white-1- color-black-2 cursor-pointer"
                        title="Click to see terms ane privacy"
                      >
                        legal
                      </span>
                    </Link>
                  </div>
                  {props.theplan.plan.replace(/"/g, "") !== "premium" &&
                    props.signup.signup === true && (
                      <div>
                        <Link className="header__title-" to="/teirspayment3">
                          <span
                            className="ib text-size-1 color-white-1- color-black-2 color-blue-1-"
                            title="Click to see plans, basic ($4.99/year stores up to 1,250 links), standard ($9.99/year stores up to 2,500 links) or premium ($14.99/year stores up to 5,000 links)"
                          >
                            plans
                          </span>
                        </Link>
                      </div>
                    )}
                  {!inviewport && (
                    <div
                      id="scrolldownid"
                      className="header__title- padding-top-11- cursor-pointer color-white-1- color-black-2 cursor-pointer nounderline"
                      onClick={scrolldown}
                      title="Click to scroll down to the search section"
                    >
                      search
                    </div>
                  )}

                  {!inviewport && (
                    <div
                      id="scrolldownid2"
                      className="header__title- padding-top-11- cursor-pointer color-white-1- color-black-2 cursor-pointer nounderline"
                      onClick={scrolldown2}
                      title="Click to scroll down to the Add Link button"
                    >
                      add link
                    </div>
                  )}

                  <div>
                    <Link
                      className="header__title- nounderline"
                      to="/ideas"
                      target="_blank"
                    >
                      <span
                        className="ib- color-white-1- color-black-2 cursor-pointer"
                        title="Click to see a list of educational ideas."
                      >
                        ideas
                      </span>
                    </Link>
                  </div>

                  {/* {props.signup.signup === true ? (
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
                  )} */}

                  {props.signup.signup === true &&
                  //&& isInMeArray(uid)===true
                  bmok === true ? (
                    //|| bmok === undefined//if bmok is true the menu item upload will be active and able to upload bookmarks files

                    <div className="pointereventsauto hide-">
                      <Link
                        className="header__title- nounderline pointereventsauto"
                        to="/bookmarksmanager"
                      >
                        <span
                          className="ib- color-white-1- color-black-2 cursor-pointer pointereventsauto"
                          ////className={`ib- color-white-1 cursor-pointer ${isInMeArray(uid)===true?"pointereventsauto":"pointereventsnone"}`}
                          title="uploads bookmarks using downloaded browser bookmarks file"
                        >
                          upload
                        </span>
                      </Link>
                    </div>
                  ) : (
                    // <div></div>
                    <div className="pointereventsnone margin-right-1 hide-">
                      <Link
                        className="header__title- nounderline pointereventsnone"
                        to="/bookmarksmanager"
                      >
                        <span
                          className="ib- color-white-1- color-black-2 cursor-pointer pointereventsnone"
                          //className={`ib- color-white-1 cursor-pointer ${isInMeArray(uid)===true?"pointereventsauto":"pointereventsnone"}`}
                          //title="uploads bookmarks using downloaded browser bookmarks file"
                          title="currently unavailable, please use Add Link."
                        >
                          upload
                        </span>
                      </Link>
                    </div>
                  )}

                  {props.signup.signup === false && (
                    //       <div className="flexrowz">
                    //      <div>
                    //    <img
                    //      className="ib minWidth"
                    //      src={redarrow}
                    //      width="100"
                    //     height="50"
                    //      alt="Logo"
                    //    />
                    //  </div>
                    <div
                      className="color-white-1- color-black-2 margin-right-1"
                      title="Please use it for good. Bookmarks for internet pages, urls/links"
                    >
                      <Link
                        className="nounderline color-white-1- color-black-2 cursor-pointer"
                        to="/signup"
                        title="The first 250 saved links are free. plan $4.99 stores up to 1500; plan $9.99 stores up to 2500;plan $14.99 stores up to 5000"
                      >
                        signup/login
                      </Link>
                    </div>
                    //  </div>
                  )}

                  {props.signup.signup === true ? (
                    <div className="margin-top-1111a-">
                      <button
                        className="button button--link ib text-size-3- color-white-1- color-black-2 cursor-pointer"
                        onClick={logoutit}
                      >
                        logout
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {props.signup.signup === true ? (
                    <div className="margin-top-1111a-">
                      <button
                        title="delete account"
                        className="button button--link ib text-size-3- color-white-1- color-black-2 cursor-pointer"
                        onClick={cancelsubscription}
                      >
                        delete
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
      ) : (
        <div>
          <Header2 />
        </div>
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
  customerId: state.customerId,
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
  startAddBmok: (bmok) => dispatch(startAddBmok(bmok)),
  startAddDisplayname: (displayname) =>
    dispatch(startAddDisplayname(displayname)),
  startAddGoogleUserData: (gud) => dispatch(startAddGoogleUserData(gud)),
  startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
