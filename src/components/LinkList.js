import React from "react";
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import selectLinks from "../selectors/links";
////
export const LinkList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Links</div>
      <div className="show-for-desktop">Link</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.links.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No links</span>
        </div>
      ) : (
        props.links.map((link) => {
          return <LinkListItem key={link.id} {...link} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    links: selectLinks(state.links, state.filters),
  };
};

export default connect(mapStateToProps)(LinkList);
