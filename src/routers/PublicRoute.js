
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// const params = new URLSearchParams(window.location.search);
// const linkid = params.get("p");
// const bookmarks = params.get("bookmarks");

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const params = new URLSearchParams(window.location.search);
  const linkid = params.get("p");
  const bookmarks = params.get("bookmarks");

  console.log("PublicRoute, bookmarks=", bookmarks);

  return (
    <Route
      {...rest}
      render={(props) => {
        const routeParams = new URLSearchParams(props.location.search);
        const showLoginPage = routeParams.has("signup");

        return isAuthenticated && !showLoginPage ? (
          <Redirect
            to={
              `/dashboard?signup=signup` +
              (bookmarks !== null ? "&bookmarks=" + bookmarks : "") +
              "&z2=1" +
              (linkid !== null ? "&p=" + linkid : "")
            }
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PublicRoute);
