import React, { useRef } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import Header from "../components/Header";

const params = new URLSearchParams(window.location.search);
const z10 = params.get("z10"); //recipent email
// //let z12 = params.get("z12"); //sender email

 function decrypt(text, key) {
    if(text === null) return null
    return String.fromCharCode(...text.match(/.{1,2}/g)
        .map((e, i) => 
            parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    );
}

const recipientemail = decrypt(z10, "125434") 
//const recipientemail = "johmcg64@gmail.com"

export const PrivateRoute = ({
  signup,
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  //const abcref = useRef("abcref");
  // const abc = (x) => {
  //   console.log("PrivateRoute, abc, x=" + x);
  // };

  const scrollInterval2 = useRef(null);
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
            <Header signup={signup} 
            //abc={abc} 
            // abcref={abcref} 
            stopScrolling2={stopScrolling2} scrollInterval2={scrollInterval2} />
            <Component {...props} isFormOpen={true} isreadonly={false} recipientemail={recipientemail}
            //abc={abc} 
            //abcref={abcref}  
            stopScrolling2={stopScrolling2} scrollInterval2={scrollInterval2} />
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

export default withRouter(connect(mapStateToProps)(PrivateRoute));
