import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import StorageSizes from "./StorageSizes";

const Simple=(props)=>{
  const [clientSecret, setClientSecret] = useState("");
  const [pti, setPti] = useState(process.env.PTI);
  const [theUserId, setTheUserId] = useState(
    firebase.auth().currentUser.uid + props.theplan.customerId
  );
   const [isFree, setIsFree] = useState(false);
    const [isBasic, setIsBasic] = useState(false);
    const [isStandard, setIsStandard] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
  
    const goToHomePage = () => {
      props.history.push("/"); // Navigates back one step in the history
    };


    useEffect(()=>{
        console.log("console.log message, Hello, from Simple, theUserId="+theUserId)
    },[])

    useEffect(() => {
        console.log("TeirsPayment3.js, theUserId="+theUserId)
         //console.log("in TeirsPayment3, firebase.auth().currentUser.uid="+firebase.auth().currentUser.uid)
         console.log("props.uid="+props.uid)
        // Check if the navigation action is 'POP'
        if (props.history.action === "POP") {
          console.log("Navigated using back or forward button");
          // Perform actions based on back/forward navigation
          props.history.push("/");
        }
      }, [props.history.action]);


  return (
  <div>
  <h1>Hello, from Simple</h1>
</div>
)
}

const mapStateToProps = (state) => ({
  customerId: state.customerId,
  uid: state.uid,
  theplan: state.theplan,
  links: state.links,
});

//export default Simple;
export default withRouter(connect(mapStateToProps, undefined)(Simple));