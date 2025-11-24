import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectLinks from "../selectors/links";
import selectLinksTotal from "../selectors/links-total";

export const LinksSummary = (props) => {
  const linkWord = props.linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(props.linksTotal / 100).format("$0,0.00");

  return (
    <div>
 {props.signup.signup === true ? <div className="flexrow2">
       <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsauto"><span className="ib is-active">{props.linkCount}</span> <span className="ib margin-left-11"> Link(s) Found</span></div>
        
          <Link className="button-2 ib text-size-5 bg-color-1 pointereventsauto" to="/create">
            Add Link
          </Link>
        
      </div>:<div className="flexrow2">
       <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsnone"><span className="ib is-active">{props.linkCount}</span><span className="ib margin-left-11"> Link(s) Found</span></div>
        
          <Link className="button-2 ib text-size-5 bg-color-1 pointereventsnone" to="/create">
            Add Link
          </Link>
        
      </div>
      }
    </div>
     
    
  );
};

const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters);

  return {
    linkCount: visibleLinks.length,
    linksTotal: selectLinksTotal(visibleLinks),
    signup:state.signup
  };
};

// const mapStateToProps = (state) => ({
//    linkCount: visibleLinks.length,
//     linksTotal: selectLinksTotal(visibleLinks),
//   signup: state.signup
// });



export default connect(mapStateToProps,undefined)(LinksSummary);
