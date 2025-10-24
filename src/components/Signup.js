// import React, { useState, useEffect, useRef } from "react";
// import database from "../firebase/firebase";


import React from "react";
import { connect } from "react-redux";


export const Signup = (props) => {
  

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