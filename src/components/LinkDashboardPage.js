import React, { useEffect } from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {

  useEffect(() => {
    const handlePopstate = (event) => {
      console.log("popstate")
      let scrollPosition = window.localStorage.getItem("scrollPosition");
      if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
 
  return (
    <div>
      <LinksSummary />
      <LinkListFilters />
      <LinkList />
    </div>
  );
};

export default LinkDashboardPage;
