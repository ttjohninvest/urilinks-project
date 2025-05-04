import React, { useEffect } from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {



  useEffect(() => {
  
    const handleScroll = () => {
      const pos=parseInt(localStorage.getItem("scrollPosition"))
      console.log("pos="+pos)
      scrollTop(0, pos)
      
    };

    element.addEventListener('DOMContentLoaded', handleScroll);

 
    return () => {
      element.removeEventListener('DOMContentLoaded', handleScroll);
    };
  }, []);

 
  return (
    <div className="website-background-color">
      <LinksSummary />
      <LinkListFilters />
      <LinkList />
    </div>
  );
};

export default LinkDashboardPage;
