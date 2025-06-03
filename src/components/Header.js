import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import logo from "../assets/images/logo9.png";
//import { getAuth } from "firebase";
import * as firebase from "firebase";

// const preStartLogout=()=>{
//   setLinks([])
//   startLogout()
// }

export const Header = ({ startLogout }) => {
  const deleteAccount = () => {
    console.log("Delete Account");
   
    const user = firebase.auth().currentUser;
            if (user) {
              //const uid = user.uid;
          
    user.delete().then(() => {
        console.log("User account deleted")
      })
      .catch((error) => {
        console.log("delete account error, An error occurred, error"+error)
      });
    }
  };

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
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
                {/* </div><h1> Your Uri/Url Links </h1></div> */}
              </div>
              <h1 title="Please use it for good. Bookmarks for internet pages, urls/links">
                urilinks (bookmarking)
              </h1>
            </div>
          </Link>

          <Link className="header__title" to="/benefits">
            <span className="margin-right-1-ib">Benefits</span>
          </Link>
          <Link className="header__title" to="/termsandprivacy">
            <span className="ib">User Info</span>
          </Link>
          <Link className="header__title" to="/settings">
            {/* <span>Settings</span> */}
          </Link>
          <div className="color-white-1" onClick={deleteAccount}>
            delete account
          </div>
          <button className="button button--link ib" onClick={startLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

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

export default connect(undefined, mapDispatchToProps)(Header);
