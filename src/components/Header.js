import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";
import logo from "../assets/images/logo9.png"

const preStartLogout=()=>{
  setLinks([])
  startLogout()
}

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
        <div className="header-flex-row"><div className="margin-top-111 margin-right-111">
          <img className="rounded-full-1" src={logo} width="35" height="35" alt="Logo" />
          </div><h1> Your Uri/Url Links</h1></div>
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
        <button className="button button--link ib" onClick={preStartLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {dispatch(startLogout()).then(()=>console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSdispatch then")).catch((error)=>console.log("SSSSSSSSSSSSSSSSSSSSSSSSS dispatch, error"+error))},
  setLinks: (links)=>dispatch(setLinks(links))
});

export default connect(undefined, mapDispatchToProps)(Header);
