import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectLinksFileDate from "../selectors/linksfiledate";
import selectLinksTotalFileDate from "../selectors/links-totalfiledate";

export const LinksSummaryFileDate = ({ linkCount, linksTotal }) => {
  const linkWord = linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(linksTotal / 100).format("$0,0.00");

  return (
    
      <div className="flexrow2">
       <div id="link-summary-id" className="text-size-5 margin-right-1"><span className="is-active">{linkCount}</span> Uri/Url Link's Found</div>
        
          <Link className="button-2 ib text-size-5" to="/createfiledate">
            Add bookmark FileDate 
          </Link>
        
      </div>
    
  );
};

const mapStateToProps = (state) => {
  const visibleLinks = selectLinksFileDate(state.linksfiledate, state.filtersfiledate);

  return {
    linkCount: visibleLinks.length,
    linksTotal: selectLinksTotalFileDate(visibleLinks),
  };
};

export default connect(mapStateToProps)(LinksSummaryFileDate);
