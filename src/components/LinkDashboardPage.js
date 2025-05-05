import React, {useEffect} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {
  useEffect(()=>{

    const sp = window.scrollY //parseInt(window.localStorage.getItem("scrollPosition"))
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
