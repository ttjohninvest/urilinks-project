import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import logo from "../assets/images/logo9.png";
import myprofile from "../assets/images/myprofile.png";
//import { getAuth } from "firebase";
import XShareButton from "./XShareButton"


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

  useEffect(() => {
    
    console.log("props.signup.signup="+props.signup.signup)
    if(props.signup.signup===true) {
   const user = firebase.auth().currentUser;
    console.log("Header, photoURL=" + user.photoURL);
    setPhotoURL(user.photoURL);
    }
    else {
      setPhotoURL("");
    }
  
    //setInviewport(isInViewport())
  }, []);

  const deleteAccount = () => {
    let text;
    if (confirm("Please press a button.") == true) {
      console.log("Delete Account");

      const user = firebase.auth().currentUser;
      if (user) {
        //const uid = user.uid;

        user
          .delete()
          .then(() => {
            console.log("User account deleted");
          })
          .catch((error) => {
            setDeleteAccountError(true);
            console.log(
              "Timeout error: To delete your accout, you will need to logout, relogin and then immediately delete the account, error=" +
                error
            );
          });
      }
    } else {
      console.log("Canceled the Deletion of the Account");
    }
  };

  const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id="top">
      {!deleteAccountError ? (
        <header className="header">
          <div className="">
            <div className="flexrow2w">
               <div className="padding-leftright padding-top-11124">
                <Link className="nounderline ib" to="/dashboard" title="refresh">  
                
                      <img
                        className="rounded-full-1"
                        src={logo}
                        width="35"
                        height="35"
                        alt="Logo"
                      />
                      
                </Link>
              </div>
             { props.signup.signup === false && <div className="color-white-1" title="Please use it for good. Bookmarks for internet pages, urls/links">
                  <Link className="nounderline color-white-1 cursor-pointer" to="/signup"  title="refresh">
                    SIGNUP
                  </Link>
              </div>}
              <div className="color-white-1" title="Please use it for good. Bookmarks for internet pages, urls/links">
                  <Link className="nounderline color-white-1 cursor-pointer" to="/dashboard"  title="refresh">
                     urilinks (bookmarking)
                  </Link>
              </div>
              {props.signup.signup===true ? <div className="padding-top-1112">
                
                <img
                  src={photoURL}
                  width="32"
                  height="32"
                  style={{ borderRadius: "50%" }}
                  className="ib- margin-bottom-11-"
                />
              </div>:
              <div className="padding-top-1112" title="welcome">
                
                <img
                  
                  src={myprofile}
                  width="32"
                  height="32"
                  style={{ borderRadius: "50%" }}
                  className="ib- margin-bottom-11-"
                />
              </div>}
              <div>
                <Link className="header__title- nounderline" to="/benefits">
                  <span
                    className="margin-right-1-ib- color-white-1 cursor-pointer"
                    title="How to use this website"
                  >
                    (Benefits)
                  </span>
                </Link>
              </div>

              <div>
                <Link className="header__title- nounderline" to="/termsandprivacy">
                  <span
                    className="ib- color-white-1 cursor-pointer"
                    title="terms, conditions and privacy policy"
                  >
                    (legal)
                  </span>
                </Link>
              </div>
              {/* <div>
                <Link className="header__title" to="/teirspayment3">
                  <span className="ib" title="please select a plan, basic ($4.99/year), standard ($9.99/year) or premium ($14.99/year)">
                    (plans ($))
                  </span>
                </Link>
              </div>  */}
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
                  <span className="ib- color-white-1 cursor-pointer" title="some ideas for hash tags">
                    (Bookmark Ideas)
                  </span>
                </Link>
              </div>

               {props.signup.signup=== true ?<div>
                <a className="header__title- nounderline pointereventsauto" href="https://urilinks-project-urls-to-tabs-html.vercel.app" target="_blank">
                  <span className="ib- color-white-1 cursor-pointer" title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader.">
                    (get page urls for bookmarks file)
                  </span>
                </a>
              </div>:
              <div>
                <a className="header__title- nounderline pointereventsnone" href="https://urilinks-project-urls-to-tabs-html.vercel.app" target="_blank">
                  <span className="ib- color-white-1 cursor-pointer" title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader.">
                    (get page urls for bookmarks file)
                  </span>
                </a>
              </div>
              }

              {props.signup.signup=== true ?<div>
                <Link className="header__title- nounderline pointereventsauto" to="/bookmarksmanager">
                  <span
                    className="ib- color-white-1 cursor-pointer"
                    title="tool to upload bookmarks.html from chrome, opera, firefox, or brave browser or the boomarks.html file generated through the use of the link get page urls for bookmarks file."
                  >
                    (Bookmarks Uploader)
                  </span>
                </Link>
              </div>:
              <div>
                <Link className="header__title- nounderline pointereventsnone" to="/bookmarksmanager">
                  <span
                    className="ib- color-white-1 cursor-pointer"
                    title="tool to upload bookmarks.html from chrome, opera, firefox, or brave browser or the boomarks.html file generated through the use of the link get page urls for bookmarks file."
                  >
                    (Bookmarks Uploader)
                  </span>
                </Link>
              </div>
              }

              <div className="margin-top-1111a-">
                <button
                  className="button button--link ib text-size-3- color-white-1 cursor-pointer"
                  onClick={props.startLogout}
                >
                  (Logout)
                </button>
              </div>
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
  signup:state.signup
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
