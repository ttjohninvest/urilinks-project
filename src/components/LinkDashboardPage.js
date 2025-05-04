import React,{useEffect} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {
  useEffect(() => {
    const handleDOMContentLoaded = () => {
      // Your code to run after DOMContentLoaded
      console.log('DOM fully loaded and parsed');
      // Example: Accessing an element
      const pos = parseInt(window.localStorage.getItem('scrollPosition'))
      window.scrollTop(0,pos)
     
    };

    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render
  return (
    <div className="website-background-color">
      <LinksSummary />
      <LinkListFilters />
      <LinkList />
    </div>
  );
};

export default LinkDashboardPage;
