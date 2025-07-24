import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const TeirsPayment3 = (props) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    console.log("props.customerId.customerId=" + props.customerId.customerId);

    const fetchData = async () => {
      const response = fetch("urilinks-project-client-secret-api.vercel.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId: props.customerId.customerId }),
      });
      const data = await response.json();
      console.log("data.clientSecret="+data.clientSecret)
      //setClientSecret(data.clientSecret);
    };
    fetchData();
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

      {/* <stripe-pricing-table
        pricing-table-id="prctbl_1Rmi60K6yDYe5WAxC2Rj4wdw"
        customer-session-client-secret="cuss_secret_SjhledL0bjNxwRS2AxUG4DjYYsQpDy1KBDfhXZgxQEzm9qs"
        publishable-key="pk_live_51Rme3iK6yDYe5WAxsw3uoH0G3h8C5AbUXynAMdLB8O3XxVOZiL4CRKUahRL7eXotjyX67shBaBRLFeETO6Bo3Ier00LRPKKOaR"
      ></stripe-pricing-table> */}

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
});

// const mapDispatchToProps = (dispatch) => ({
//   startAddLink: (link) => dispatch(startAddLink(link)),
// });

export default withRouter(connect(mapStateToProps, undefined)(TeirsPayment3));

//export default TeirsPayment3;
