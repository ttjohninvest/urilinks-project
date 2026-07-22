import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StorageSizes from "./StorageSizes";

const SimpleTest2 = (props) => {
  
 return (
    <div className="body1 flexrow2w">

      <stripe-pricing-table pricing-table-id="prctbl_1RuQqj2fleTjRvBSS5h0OR2W"
                    client-reference-id={props.theplan.uid+props.theplan.subscriptionId}
                    publishable-key="pk_test_51Rme3v2fleTjRvBSOV8WwAXKcCWeL69RaHntXDSL0l4ahUHmaNuVxDadMl5IO7nnESvU7MVmJHkAIBUHeAv00Jlh00b9oiWIaO">
                    </stripe-pricing-table>
   
</div>
 )

}

const mapStateToProps = (state) => ({
  uid: state.uid,
  theplan: state.theplan,
  links: state.links,
});

//export default Simple;
export default withRouter(connect(mapStateToProps, undefined)(SimpleTest2));