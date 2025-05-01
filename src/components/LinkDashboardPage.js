import React from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => (
  <div>
    <LinkListFilters />
    
    <LinksSummary />
    
    <LinkList displayFormat={1}/>
  </div>
);

export default LinkDashboardPage;
