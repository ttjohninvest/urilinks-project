import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import logo from "../assets/images/logo9.png";
//import { getAuth } from "firebase";

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
    const user = firebase.auth().currentUser;
    console.log("Header, photoURL=" + user.photoURL);
    setPhotoURL(user.photoURL);
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
          <div className="content-container">
            <div className="header__content flexrow2w">
              <div>
                <Link className="header__title" to="/dashboard">
                  <div className="header-flex-row">
                    <div className="margin-top-111 margin-right-111">
                      <img
                        className="rounded-full-1"
                        src={logo}
                        width="35"
                        height="35"
                        alt="Logo"
                      />
                    </div>
                    <h1 title="Please use it for good. Bookmarks for internet pages, urls/links">
                      urilinks (bookmarking)
                    </h1>
                  </div>
                </Link>
              </div>
              <div>
                <img
                  src={photoURL}
                  width="32"
                  height="32"
                  style={{ borderRadius: "50%" }}
                  className=""
                />
              </div>
              <div>
                <Link className="header__title" to="/benefits">
                  <span
                    className="margin-right-1-ib"
                    title="How to use this website"
                  >
                    (Benefits)
                  </span>
                </Link>
              </div>

              <div>
                <Link className="header__title" to="/termsandprivacy">
                  <span
                    className="ib"
                    title="terms, conditions and privacy policy"
                  >
                    (legal)
                  </span>
                </Link>
              </div>
              {/* <div>
                <Link className="header__title" to="/teirspayment3">
                  <span className="ib" title="payment tier policy">
                    (p)
                  </span>
                </Link>
              </div>  */}
              {!inviewport && (
                <div
                  id="scrolldownid"
                  className="header__title padding-top-11 cursor-pointer"
                  onClick={scrolldown}
                  title="if the search and results section is not in view, click this to scroll search and results section into view."
                >
                  (search section)
                </div>
              )}
              <div>
                <Link className="header__title" to="/settings">
                  {/* <span>Settings</span> */}
                </Link>
              </div>

              {/* <div className="color-white-1" onClick={deleteAccount}>
            delete account
          </div> */}
              <div>
                <Link className="header__title" to="/ideas">
                  <span className="ib" title="some ideas for hash tags">
                    (Bookmark Ideas)
                  </span>
                </Link>
              </div>

               <div>
                <a className="header__title" href="https://urilinks-project-urls-to-tabs-html.vercel.app">
                  <span className="ib" title="some ideas for hash tags">
                    (urls to bm file)
                  </span>
                </a>
              </div>

              <div>
                <Link className="header__title" to="/bookmarksmanager">
                  <span
                    className="ib"
                    title="tool to upload bookmarks from chrome, opera, firefox, or brave browser"
                  >
                    (Bookmarks Uploader)
                  </span>
                </Link>
              </div>

              <div className="margin-top-1111a">
                <button
                  className="button button--link ib text-size-3"
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
