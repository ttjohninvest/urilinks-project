import React, { useState } from 'react';
import { connect } from "react-redux";

function ClickableList(props) {
  // Step 1: Define state and data
  const [selectedItem, setSelectedItem] = useState(null);
  const [newfollowinglinks, setNewfollowinglinks] = useState( props.newfollowinglinks)
  //const items = ['Apple', 'Banana', 'Cherry'];


  // Step 2: Define the click handler
  const handleItemClick = (newfollowinglinks) => {
    //setSelectedItem(newfollowinglinks);
    console.log(`Clicked: ${newfollowinglinks.uid}, ${newfollowinglinks.newlinks}`);
    alert(`Clicked: ${newfollowinglinks.uid}, ${newfollowinglinks.newlinks}`)
    /*
window.open(
      "https://urilinks.com/dashboard?signup=0&x=readonly&id2=" +
        props.auth.uid +
        "&id=" +
        newfollowinglinks.uid +
        "&dn=" +
        dn +
        "&purl=" +
        purl +
        "&z10=" +
        email +
        "&z12=" +
        z12 +
        "&isFollowing=" +
        isMatch,
      "_blank",
    );
    */
  };

  // Step 3 & 4: Render and attach onClick
  return (
    <div>
      <ul>
        {newfollowinglinks.map((nl) => (
          <li 
            key={nl.uid} 
            onClick={() => handleItemClick(nl)}
            //style={{ cursor: 'pointer', color: selectedItem === item ? 'blue' : 'black' }}
          >
            {nl.uid+", "+nl.newlinks}
          </li>
        ))}
      </ul>
      {/* {selectedItem && <p>You selected: {selectedItem}</p>} */}
    </div>
  );
}

//export default ClickableList; 

const mapStateToProps = (state) => ({
  links: state.links,
  auth:state.auth,
  theupdatedate: state.theupdatedate,
  settings: state.settings,
  signup: state.signup,
  email: state.email,
  theplan: state.theplan,
  subscriptionId: state.subscriptionId,
  customerId: state.customerId,
  thesignupcount: state.thesignupcount,
  thetotalloggedout: state.thetotalloggedout,
  theloggedin:state.theloggedin,
  following:state.following,
  follower:state.follower,
  newfollowinglinks:state.newfollowinglinks,
});

// const mapDispatchToProps = (dispatch) => ({
  
// });

export default connect(mapStateToProps, undefined)(ClickableList);