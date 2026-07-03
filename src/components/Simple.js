import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Simple=(props)=>{
    useEffect(()=>{
        console.log("Hello, from Simple")
    },[])
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