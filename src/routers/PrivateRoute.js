
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Decrypt recipient email
function decrypt(text, key) {
  if (text === null) return null;

  return String.fromCharCode(
    ...text.match(/.{1,2}/g).map(
      (e, i) =>
        parseInt(e, 16) ^
        (key.charCodeAt(i % key.length) % 255)
    )
  );
}

export const PrivateRoute = ({
  signup,
  isAuthenticated,
  auth,
  component: Component,
  stopScrolling2,
  scrollInterval2,
  ...rest
}) => {

  // Track PrivateRoute instance
  const privateRouteInstanceId = React.useRef(
    Math.random().toString(36).substring(2, 8)
  );

  console.log(
    "PrivateRoute INSTANCE =",
    privateRouteInstanceId.current
  );

  React.useEffect(() => {
    console.log(
      "MOUNT PrivateRoute INSTANCE =",
      privateRouteInstanceId.current
    );

    return () => {
      console.log(
        "UNMOUNT PrivateRoute INSTANCE =",
        privateRouteInstanceId.current
      );
    };
  }, []);

  // Read URL parameters
  const params = new URLSearchParams(window.location.search);

  const z10 = params.get("z10");
  const recipientemail = decrypt(z10, "125434");
  const bookmarks = params.get("bookmarks");
  const isReadonly = params.get("x") === "readonly";

  return (
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated || isReadonly) ? (
          <div>
            <Component
              {...props}
              isFormOpen={isAuthenticated && !isReadonly}
              isreadonly={isReadonly}
              bookmarks={bookmarks}
              recipientemail={recipientemail}
              stopScrolling2={stopScrolling2}
              scrollInterval2={scrollInterval2}
            />
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
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps)(PrivateRoute)
);
