import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';


export const PrivateRoute = ({
  
  signup,
  isAuthenticated,
  component: Component,
  ...rest
}) => { 
  
  const abc = () =>{
    console.log("PrivateRoute, abc")
  }

  return (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header signup={signup} abc={abc} />
          <Component {...props}  />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  )}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
