import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//import HeaderA from '../components/HeaderA';
import Header from '../components/Header';
import HeaderA from '../components/HeaderA';

export const PrivateRoute = ({
  x,
  signup,
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
          <div>
          { !!x && x===1 ?<HeaderA signup={signup} />:<Header   signup={signup} />}
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
