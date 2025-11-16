import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";

const TeirsPayment3 = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [pk_live, setPklive] = useState(process.env.PK_LIVE);
  const [pti, setPti] = useState(process.env.PTI);
  const [theUserId, setTheUserId] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isBasic, setIsBasic] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };

  useEffect(() => {
    console.log("4 TeirsPayment3, props.links.length=" + props.links.length);
    console.log(
      "TeirsPayment4, props.theplan.plan.replace(/''/g, '')=" +
        props.theplan.plan.replace(/"/g, "")
    );

    // if (props.theplan.plan.replace(/"/g, "") === "free") {
    //   console.log("calling setIsFree");
    //   setIsFree(true);
    // } else if (props.theplan.plan.replace(/"/g, "") === "basic") {
    //   console.log("calling setIsBasic");
    //   setIsBasic(true);
    // } else if (props.theplan.plan.replace(/"/g, "") === "standard") {
    //   setIsStandard(true);
    // } else if (props.theplan.plan.replace(/"/g, "") === "premium") {
    //   setIsPremium(true);
    // }

    //console.log("props.customerId.customerId=" + props.customerId.customerId);
    setTheUserId(firebase.auth().currentUser.uid);
    // const fetchData = async () => {
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

  return (
    <div className="body1 flexrow2w">
      {props.theplan.plan.replace(/"/g, "") === "free" &&
      props.links.length <= 400  ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZObK6yDYe5WAxMmd2DrLm"
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" 
      //&& props.links.length > 250 
      &&
        props.links.length <= 1500 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZQOK6yDYe5WAxcLSWEECi"
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" 
      //&& props.links.length > 1500 
      &&
        props.links.length <= 2500 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" 
      //&& props.links.length > 2500 
      &&
        props.links.length <= 5000 ? (
        <div>Thank you. You are on the premium plan which is the highest plan.  

        </div>
      ) : props.theplan.plan.replace(/"/g, "") === "free" ? (<div>
        <div className="margin-left-11">You are on the free plan. You may store up to 250 links, <span>You have stored {props.links.length} links.</span></div>
         <div>
            <button
              className="button-2 ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
          </div>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" ? (<div>
        <div className="margin-left-11">You are on the basic plan. You may store up to 1500 links, <span>You have stored {props.links.length} links.</span></div>
         <div>
            <button
              className="button-2 ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
          </div>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" ? (<div>
        <div className="margin-left-11">You are on the standard plan. You may store up to 2500 links, <span>You have stored {props.links.length} links.</span></div>
         <div>
            <button
              className="button-2 ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
          </div>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" ? (
        <div>
          <div className="margin-left-11">
            You are on the premium plan. You may store up to 5000 links, <span>You have stored {props.links.length} links.</span>
          </div>
          <div>
            <button
              className="button-2 ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
          </div>
        </div>
      ) : <div>
        <button
              className="button-2 ib margin-left-11 cursor-pointer"
              onClick={goToHomePage}
            >
              goto the home page
            </button>
        </div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerId: state.customerId,
  uid: state.uid,
  theplan: state.theplan,
  links: state.links,
});

// const mapDispatchToProps = (dispatch) => ({
//   startAddLink: (link) => dispatch(startAddLink(link)),
// });

export default withRouter(connect(mapStateToProps, undefined)(TeirsPayment3));

//export default TeirsPayment3;
//props.plan.replace(/"/g, "") !== "premium" ?
