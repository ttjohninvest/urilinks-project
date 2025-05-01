import React from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => (
  <div>
    <LinksSummary />
    <LinkListFilters />

    <LinkList />
  </div>
);

export default LinkDashboardPage;
