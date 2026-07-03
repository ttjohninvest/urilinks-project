import React, { useEffect } from "react";
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


    useEffect(()=>{
        console.log("console.log message, Hello, from Simple, theUserId="+theUserId)
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