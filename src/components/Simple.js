import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage
import StorageSizes from "./StorageSizes";

const Simple = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [pti, setPti] = useState(process.env.PTI);
  //   const [theUserId, setTheUserId] = useState(
  //     firebase.auth().currentUser.uid + props.theplan.customerId,
  //   );
  // const [theUserId, setTheUserId] = useState(
  //     firebase.auth().currentUser.uid + props.theplan.subscriptionId!==undefined &&
  //     props.theplan.subscriptionId!==null?props.theplan.subscriptionId:""
  //   );
  const [theUserId, setTheUserId] = useState("");
  const [theEmail, setTheEmail] = useState(firebase.auth().currentUser.email);
  const [isFree, setIsFree] = useState(false);
  const [isBasic, setIsBasic] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };

  useEffect(() => {
    //console.log("props.theplan.plan=" + props.theplan.plan);
    console.log("22 props.theplan=" + JSON.stringify(props.theplan));
    console.log("22, props.theplan.customerId=" + props.theplan.customerId);
    console.log("22, props.theplan.plan=" + props.theplan.plan);
    console.log(
      "22, props.theplan.subscriptionId=" + props.theplan.subscriptionId,
    );
    console.log("22, props.theplan.uid=" + props.theplan.uid);
    //setTheUserId(props.theplan.uid+props.theplan.subscriptionId)
    // console.log("33, userId="+props.theplan.uid
    // + props.theplan.subscriptionId!==undefined &&
    // props.theplan.subscriptionId!==null?props.theplan.subscriptionId:"")
    // setTheUserId(props.theplan.uid
    // + props.theplan.subscriptionId!==undefined &&
    // props.theplan.subscriptionId!==null?props.theplan.subscriptionId:"")
  }, []);

  useEffect(() => {
    console.log("TeirsPayment3.js, theUserId=" + theUserId);
    //console.log("in TeirsPayment3, firebase.auth().currentUser.uid="+firebase.auth().currentUser.uid)

    // Check if the navigation action is 'POP'
    if (props.history.action === "POP") {
      console.log("Navigated using back or forward button");
      // Perform actions based on back/forward navigation
      props.history.push("/");
    }
  }, [props.history.action]);

  //the following part upto return
  useEffect(() => {
    console.log("4 theUserId=" + theUserId);
    console.log(
      "4 TeirsPayment3, props.theplan.customerId=" + props.theplan.customerId,
    );

    // fetch("https://urilinks-project-client-secret-api.vercel.app", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ customerId: props.customerId.customerId }), //JSON.stringify({ customerId: props.customerId.customerId }),
    // })
    //   .then((res) => {
    //     return res.json();
    //     // //console.log("data.clientSecret="+JSON.stringify(data)) //.clientSecret)
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setClientSecret(data.clientSecret);
    //   })
    //   .catch((error) =>
    //     console.error("There was a problem with the fetch operation:", error),
    //   );
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
    <div className="body1 flexrow2w">
      {!!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "free" &&
      props.links.length <= StorageSizes.free ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZObK6yDYe5WAxMmd2DrLm"
          client-reference-id={props.theplan.uid + props.theplan.subscriptionId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" &&
        props.links.length <= StorageSizes.basic ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZQOK6yDYe5WAxcLSWEECi"
          client-reference-id={props.theplan.uid + props.theplan.subscriptionId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "standard" &&
        props.links.length <= StorageSizes.standard ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
          client-reference-id={props.theplan.uid + props.theplan.subscriptionId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "premium" &&
        props.links.length <= StorageSizes.premium ? (
        <div>
          Thank you. You are on the premium plan which is the highest plan.
        </div>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "free" ? (
        <div>
          <div className="margin-left-11">
            You are on the free plan. You may store up to {StorageSizes.free}{" "}
            links, <span>You have stored {props.links.length} links.</span>
          </div>
          <div>
            <button
              className="button-2w ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
        </div>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "basic" ? (
        <div>
          <div className="margin-left-11">
            You are on the basic plan. You may store up to {StorageSizes.basic}{" "}
            links, <span>You have stored {props.links.length} links.</span>
          </div>
          <div>
            <button
              className="button-2w ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
        </div>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "standard" ? (
        <div>
          <div className="margin-left-11">
            You are on the standard plan. You may store up to{" "}
            {StorageSizes.standard} links,{" "}
            <span>You have stored {props.links.length} links.</span>
          </div>
          <div>
            <button
              className="button-2w ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
        </div>
      ) : !!props.theplan.plan &&
        props.theplan.plan.replace(/"/g, "") === "premium" ? (
        <div>
          <div className="margin-left-11">
            You are on the premium plan. You may store up to{" "}
            {StorageSizes.premium} links,{" "}
            <span>You have stored {props.links.length} links.</span>
          </div>
          <div>
            <button
              className="button-2w ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="button-2w ib margin-left-11 cursor-pointer"
            onClick={goToHomePage}
          >
            goto the home page
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerId: state.customerId,
  uid: state.uid,
  theplan: state.theplan,
  links: state.links,
  email: state.email,
});

//export default Simple;
export default withRouter(connect(mapStateToProps, undefined)(Simple));
