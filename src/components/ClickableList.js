import React, { useState } from 'react';
import { connect } from "react-redux";

function ClickableList(props) {
  // Step 1: Define state and data
  const [selectedItem, setSelectedItem] = useState(null);
  //const items = ['Apple', 'Banana', 'Cherry'];
  const items = props.newfollowinglinks;

  // Step 2: Define the click handler
  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log(`Clicked: ${item.uid} ${item.newlinks}`);
  };

  // Step 3 & 4: Render and attach onClick
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li 
            key={item.uid} 
            onClick={() => handleItemClick(item)}
            //style={{ cursor: 'pointer', color: selectedItem === item ? 'blue' : 'black' }}
          >
            {item}
          </li>
        ))}
      </ul>
      {selectedItem && <p>You selected: {selectedItem}</p>}
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