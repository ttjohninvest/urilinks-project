import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const BasicPlan = (props) => {
  
 return (
    <div className="body1 flexrow2w">

    <stripe-pricing-table pricing-table-id="prctbl_1RuMq02fleTjRvBSfO1vqJEU"
              client-reference-id={props.theplan.uid+props.theplan.subscriptionId}
              publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO">
            </stripe-pricing-table>
   
</div>
 )

}

const mapStateToProps = (state) => ({
  uid: state.uid,
  theplan: state.theplan
});

//export default Simple;
export default withRouter(connect(mapStateToProps, undefined)(BasicPlan));