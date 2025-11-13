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
    console.log("TeirsPayment3, props.links.length=" + props.links.length);
    console.log(
      "TeirsPayment3, props.theplan.plan.replace(/''/g, '')=" +
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
 
      {props.theplan.plan.replace(/"/g, "") === "free" && props.links.length <= 250 || props.links.length > 250 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZObK6yDYe5WAxMmd2DrLm"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : isBasic && props.links.length <= 250  || props.links.length > 250 ? (
        //show the almost free, standard and premium table
       <stripe-pricing-table pricing-table-id="prctbl_1RugCoK6yDYe5WAx5x4SZEPL"
       client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
    ): props.theplan.plan.replace(/"/g, "") === "basic" &&
        (props.links.length >= 251 && props.links.length) <= 1500 ? (
        //show standard and premium table
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZQOK6yDYe5WAxcLSWEECi"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" &&
        props.links.length >= 1501 &&
        props.links.length <= 2500 ? (
        //show the premium table
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" && props.links.length <= 250  || props.links.length > 250 ? (
        //show almost free, basic and standard table
        <stripe-pricing-table pricing-table-id="prctbl_1RugHTK6yDYe5WAxm2AZhNUT"
        client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" &&
        props.links.length >= 251 &&
        props.links.length <= 1500 ? (
        //show basic, standard table
        <stripe-pricing-table
          pricing-table-id="prctbl_1Ruc13K6yDYe5WAxkJhgM4JU"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" &&
        props.links.length >= 1501 &&
        props.links.length <= 2500 ? (
        //show the standard table
        <stripe-pricing-table
          pricing-table-id="prctbl_1RubxvK6yDYe5WAxS10OaKC3"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "premium" &&
        props.links.length >= 2501 &&
        props.links.length <= 5000 ? (
          <div>
 <div>
          Hi, you will need to remove some bookmarks to choose a cheaper plan
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
       
      ) : isStandard && props.links.length <= 250 ? (
        //show almost free basic and premium
        <stripe-pricing-table pricing-table-id="prctbl_1RugLIK6yDYe5WAxJ3KDXCV9"
        client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" &&
        props.links.length >= 251 &&
        props.links.length <= 1500 ? (
        //show the basic and premium table
        <stripe-pricing-table
          pricing-table-id="prctbl_1RucNzK6yDYe5WAxYCLQ9TsU"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" &&
        props.links.length >= 1501 &&
        props.links.length <= 2500 ? (
        //show the premium table
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
          client-reference-id={theUserId}
          publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
        ></stripe-pricing-table>
      )  : (
        <div></div>
      )}

    
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
