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
  const scrollInterval2 = useRef(null);
  const abc = (x) => {
    console.log("PrivateRoute, abc, x=" + x);
  };
   const stopScrolling2 = () => {
    //scrollupref.current = null
    clearInterval(scrollInterval2.current);
    scrollInterval2.current = null;
  };

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header signup={signup} abc={abc} abcref={abcref} stopScrolling2={stopScrolling2} scrollInterval2 = {scrollInterval2} />
            <Component {...props} abc={abc} abcref={abcref}  stopScrolling2={stopScrolling2} scrollInterval2 = {scrollInterval2} />
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
