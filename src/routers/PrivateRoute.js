import React, { useRef } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({
  signup,
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const abcref = useRef("abcref");
  const abc = (x) => {
    console.log("PrivateRoute, abc, x=" + x);
  };

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header signup={signup} abc={abc} abcref={abcref} />
            <Component {...props} abc={abc} abcref={abcref} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
