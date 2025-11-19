import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
//import { useHistory } from 'react-router-dom';
import LoadingPage from 'LoadingPage'


const TeirsPayment3 = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [pti, setPti] = useState(process.env.PTI);
  const [theUserId, setTheUserId] = useState(firebase.auth().currentUser.uid+props.theplan.customerId);
  //const [theUserId, setTheUserId] = useState(firebase.auth().currentUser.uid);
  const [isFree, setIsFree] = useState(false);
  const [isBasic, setIsBasic] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };



 
  useEffect(() => {
    // Check if the navigation action is 'POP'
    if (props.history.action === 'POP') {
      console.log('Navigated using back or forward button');
      // Perform actions based on back/forward navigation
      props.history.push("/")
    }
  }, [props.history.action]); 
   

  useEffect(()=>{
     
    console.log("3 TeirsPayment3, props.theplan.customerId=" + props.theplan.customerId);
    //setTheUserId(firebase.auth().currentUser.uid+props.theplan.customerId)
  },[])

  useEffect(() => {
    console.log("4 theUserId="+theUserId)
    console.log("4 TeirsPayment3, props.theplan.customerId=" + props.theplan.customerId);
    
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
      props.links.length <= 250  ? (
        
        <stripe-pricing-table pricing-table-id="prctbl_1RuMq02fleTjRvBSfO1vqJEU"
        client-reference-id={theUserId}
publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" 
      //&& props.links.length > 250 
      &&
        props.links.length <= 1500 ? (
        

        <stripe-pricing-table pricing-table-id="prctbl_1RuQol2fleTjRvBSMfNwP6ir"
        client-reference-id={theUserId}
publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "standard" 
      //&& props.links.length > 1500 
      &&
        props.links.length <= 2500 ? (
   
<stripe-pricing-table pricing-table-id="prctbl_1RuQqj2fleTjRvBSS5h0OR2W"
client-reference-id={theUserId}
publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO">
</stripe-pricing-table>

      ) : props.theplan.plan.replace(/"/g, "") === "premium" 
      ////&& props.links.length > 2500 
      &&
        props.links.length <= 5000 ? (
        <div> 
<LoadingPage />
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
