import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectLinks from "../selectors/links";
import selectLinksTotal from "../selectors/links-total";

export const LinksSummary = ({ linkCount, linksTotal }) => {
  const linkWord = linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(linksTotal / 100).format("$0,0.00");

  return (
    
      <div className="flexrow2">
       <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55"><span className="is-active">{linkCount}</span> Uri/Url Link's Found</div>
        
          <Link className="button-2 ib text-size-5 bg-color-1" to="/create">
            Add Uri/Url Link
          </Link>
        
      </div>
    
  );
};

const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters);

  return {
    linkCount: visibleLinks.length,
    linksTotal: selectLinksTotal(visibleLinks),
  };
};

export default connect(mapStateToProps)(LinksSummary);
