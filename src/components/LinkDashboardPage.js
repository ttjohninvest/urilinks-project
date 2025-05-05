import React, {useEffect} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {
  useEffect(()=>{

    const sp = parseInt(window.localStorage("scrollPosition"))
    console.log("sp="+sp)
    window.scrollTo(0,sp)

  },[])
 return (
    <div className="website-background-color">
      <LinksSummary />
      <LinkListFilters />
      <LinkList />
    </div>
  );
};

export default LinkDashboardPage;
