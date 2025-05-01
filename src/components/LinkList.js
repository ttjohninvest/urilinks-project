import React, { useState } from 'react';
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";

// export const LinkList = (props) => {

//   const [displayFormat, setDisplayFormat] = useState(1);
//   setDisplayFormat(1)
  
//   return (<div className="content-container">
//     <div className="list-header">
//       <div className="show-for-desktop">Link(s)</div>
//     </div>
//     {displayFormat===1?<div className="list-body">
//       {props.links.length === 0 ? (
//         <div className="list-item list-item--message">
//           <span>No links</span>
//         </div>
//       ) : (
//         props.links.map((link) => {
//           return <LinkListItem key={link.id} {...link} />;
//         })
//       )}
//     </div>
//     :<div className="list-body-2">
//       {props.links.length === 0 ? (
//         <div className="list-item list-item--message">
//           <span>No links</span>
//         </div>
//       ) : (
//         props.links.map((link) => {
//           return <LinkListItem2 key={link.id} {...link} />;
//         })
//       )}
//     </div>}
//   </div>)
// };

export const LinkList = (props) => {

  const [displayFormat, setDisplayFormat] = useState(1);
  setDisplayFormat(1)
  
  return (<div>
   
  </div>)
};

const mapStateToProps = (state) => {
  return {
    links: selectLinks(state.links, state.filters),
  };
};

export default connect(mapStateToProps)(LinkList);
