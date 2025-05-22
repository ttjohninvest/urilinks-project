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
    <div className="page-header">
      <div className="content-container flexrow2">
        {/* <h1 className="page-header__title">
          Viewing <span>{linkCount}</span> {linkWord}
        </h1> */}

        <div className="page-header__title text-size-6">
          {linkCount}
        </div>
        
       
          <Link className="button ib" to="/create">
            Add Uri/Url Link 
          </Link>
        
      </div>
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
