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
         
        // Check if the navigation action is 'POP'
        if (props.history.action === "POP") {
          console.log("Navigated using back or forward button");
          // Perform actions based on back/forward navigation
          props.history.push("/");
        }
      }, [props.history.action]);

      useEffect(() => {
          console.log("4 theUserId=" + theUserId);
          console.log(
            "4 TeirsPayment3, props.theplan.customerId=" + props.theplan.customerId
          );
      
          fetch("https://urilinks-project-client-secret-api.vercel.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId: props.customerId.customerId }), //JSON.stringify({ customerId: props.customerId.customerId }),
          })
            .then((res) => {
              return res.json();
              // //console.log("data.clientSecret="+JSON.stringify(data)) //.clientSecret)
            })
            .then((data) => {
              console.log(data);
              setClientSecret(data.clientSecret);
            })
            .catch((error) =>
              console.error("There was a problem with the fetch operation:", error)
            );
        }, []);

        const initializedRef = useRef(false);
          if (!initializedRef.current) {
            // This code runs only once, before the first render
            // Perform checks or setup here
        
            initializedRef.current = true;
            if (props.history.action === "POP") {
              console.log("Navigated using back or forward button");
              // Perform actions based on back/forward navigation
        
              props.history.push("/");
            }
          }

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