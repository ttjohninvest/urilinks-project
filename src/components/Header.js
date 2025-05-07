import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import logo from "../assets/images/logo9.png"

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
        <div className="header-flex-row"><div className="margin-top-111 margin-right-111"><img className="rounded-full-1" src={logo} width="35" height="35" alt="Logo" /></div><h1> Your Uri/Url Links</h1></div>
        </Link>
        <Link className="header__title" to="/settings">
          {/* <span>Settings</span> */}
        </Link>
        <button className="button button--link" onClick={startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
