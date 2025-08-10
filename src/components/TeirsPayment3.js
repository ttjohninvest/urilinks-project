import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";

const TeirsPayment3 = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [pk_live, setPklive] = useState(process.env.PK_LIVE);
  const [pti, setPti] = useState(process.env.PTI);
  const [theUserId, setTheUserId] = useState("");

  useEffect(() => {
    console.log("props.customerId.customerId=" + props.customerId.customerId);
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

    //setClientSecret(data.clientSecret);
    // };
    // fetchData();
    //     function handleClickT1(event) {

    //     console.log('handleClickT1');
    //     const session = await stripe.checkout.sessions.create({
    //   line_items: [
    //     {
    //       price: 'price_1234567890',
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   metadata: {
    //     userId: 123,
    //   },
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/cancel',
    // });

    // }

    // function handleClickT2(event) {

    //     console.log('handleClickT2');

    // }

    // function handleClickT3(event) {

    //     console.log('handleClickT3');

    // }

    // window.document.getElementById("t1").addEventListener('click', handleClickT1);
    // window.document.getElementById("t2").addEventListener('click', handleClickT2);
    // window.document.getElementById("t3").addEventListener('click', handleClickT3);

    // return () => {
    //   window.removeEventListener('click', handleClickT1);
    //   window.removeEventListener('click', handleClickT2);
    //   window.removeEventListener('click', handleClickT2);
    // };
  }, []);

  return (
    <div className="body1 flexrow2w">
      {/*
      Pass the Session Secret to the Pricing Table: The session secret needs to be passed to the pricing table. 
      In React, you can use the useEffect hook to fetch the session secret 
      from the backend and assign it to the customer-session-client-secret attribute.
      */}

      {/*
      import * as React from 'react';

function PricingPage() {
  return (
    <stripe-pricing-table 
      pricing-table-id="prctbl_1Yournvid97goeshhereO" 
      publishable-key="pk_test_51PQwgyG8ornv55ThisP5L7wyDIsY0DoYM66FakedVgqpKeyw6LinYcVm0DMJu4rwGCA7mym9EYBHBULpK2owTpwLRD00XbTgIs06" 
      customer-session-client-secret="{{CLIENT_SECRET}}"
    >
    </stripe-pricing-table>
  );
}

export default PricingPage;
      */}

      {/*
      The customer-session-client-secret attribute is used in Stripe's prebuilt pricing table to associate 
      the pricing table with an existing customer session. This attribute allows the pricing table to be used 
      with an existing customer, ensuring that the customer's details are correctly linked during the payment 
      process.

      To implement this, you need to create a customer session using stripe.customerSessions.create() and obtain the 
      client_secret from the customer session. Then, you add the customer-session-client-secret attribute to the 
      stripe-pricing-table and set the client_secret to it.

      This approach ensures that the pricing table is linked to the specific customer session, providing a seamless 
      experience for the user.
      */}
      {/* <div className="flexcol"> */}
      {/* <div className="alignCenter margin-bottom-1">Three plans offered: <span>basic</span>, <span>standard</span>, <span>premium</span>:</div> */}

      {/* I need to make two more tables, a standard and premium table and a preumim table*/}
      {/* if the user has stored 2501 boomarks, it can not choose the basic, or standard plans */}
      {/* <= 250 show basic, standard and premium table */}
      {/* >= 251 show standard and premium table */}
      {/* >= 1501 show premium table */}
      {/* >= 2501 don't show the pricing table */}

{/*
 {props.theplan.plan.replace(/"/g, "") === "free" &&
      props.links.length <= 250 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuMq02fleTjRvBSfO1vqJEU"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" &&
        props.links.length >= 251 ? (
        
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuQol2fleTjRvBSMfNwP6ir"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "standard" &&
        props.links.length >= 1501 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuQqj2fleTjRvBSS5h0OR2W"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "premium" &&
        props.links.length >= 2501 ? (
        <div>Hi, you will need to remove some bookmarks to choose a cheaper plan</div>
      ) : (
        <div></div>
      )}

*/}
     

  {/* I need to make two more tables, a standard and premium table and a preumim table*/}
      {/* if the user has stored 2501 boomarks, it can not choose the basic, or standard plans */}
      {/* <= 250 show basic, standard and premium table */}
      {/* >= 251 show standard and premium table */}
      {/* >= 1501 show premium table */}
      {/* >= 2501 don't show the pricing table */}

{/*
 {props.theplan.plan.replace(/"/g, "") === "free" &&
      props.links.length <= 250 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuMq02fleTjRvBSfO1vqJEU"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" &&
        props.links.length >= 251 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuQol2fleTjRvBSMfNwP6ir"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "standard" &&
        props.links.length >= 1501 ? (
        <stripe-pricing-table
          pricing-table-id="prctbl_1RuQqj2fleTjRvBSS5h0OR2W"
          client-reference-id={theUserId}
          publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO"
        ></stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "premium" &&
        props.links.length >= 2501 ? (
        <div>Hi, you will need to remove some bookmarks to choose a cheaper plan</div>
      ) : (
        <div></div>
      )}
*/}

<stripe-pricing-table 
     pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
     client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>

{/*
{props.theplan.plan.replace(/"/g, "") === "free" &&
      props.links.length <= 250 ? (
     <stripe-pricing-table 
     pricing-table-id="prctbl_1RuZObK6yDYe5WAxMmd2DrLm"
     client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") === "basic" &&
        props.links.length >= 251 ? (
       <stripe-pricing-table 
       pricing-table-id="prctbl_1RuZQOK6yDYe5WAxcLSWEECi"
       client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "standard" &&
        props.links.length >= 1501 ? (
     <stripe-pricing-table 
     pricing-table-id="prctbl_1RuZROK6yDYe5WAxUamTm64X"
     client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table>
      ) : props.theplan.plan.replace(/"/g, "") !== "premium" &&
        props.links.length >= 2501 ? (
        <div>Hi, you will need to remove some bookmarks to choose a cheaper plan</div>
      ) : (
        <div></div>
      )}
*/}








      {/* <stripe-pricing-table pricing-table-id="prctbl_1RqkCGK6yDYe5WAxGg18nnjJ"
      customer-session-client-secret={clientSecret}
      client-reference-id={theUserId}
publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR">
</stripe-pricing-table> */}

      {/* <div className="pricing-table">
  
    <div id="t1" className="pricing-card">
      <h3>Basic</h3>
      <p className="price" style={{color:'#13253b'}}>$10/month</p>
      <ul>
        <li>10GB Storage</li>
        
      </ul>
      <button style={{backgroundColor:'#13253b'}}>Choose Basic</button>
    </div>

    

   
    <div id="t2" className="pricing-card">
      <h3>Standard</h3>
      <p className="price" style={{color:'#13253b'}}>$20/month</p>
      <ul>
        <li>50GB Storage</li>
        
      </ul>
      <button style={{backgroundColor:'#13253b'}}>Choose Standard</button>
    </div>

   
    <div  id="t3" className="pricing-card">
      <h3>Premium</h3>
      <p className="price"  style={{color:'#13253b'}}>$50/month</p>
      <ul>
        <li>200GB Storage</li>
        
      </ul>
      <button style={{backgroundColor:'#13253b'}}>Choose Premium</button>
    </div>
  </div> */}
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
