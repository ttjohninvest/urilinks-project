import React, {useEffect,useState} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";










const LinkDashboardPage = () => {

  // const [scrollPos, setScrollPos] = useState(0);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     window.localStorage.setItem("scrollY",window.scrollY)
  //     setScrollPos(window.scrollY);

  //   }

  //   // Adding scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup function to remove the event listener
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
       event.stopImmediatePropagation();  
      window.localStorage.setItem("scrollY",0)
      // Your function to run before the tab is closed
      console.log('Tab is closing...');
      // Optional: Display a confirmation dialog
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(()=>{

    const sp = parseInt(window.localStorage.getItem("scrollY")) //parseInt(window.localStorage.getItem("scrollPosition"))
    console.log("sp="+sp)
    window.scrollTo(0,sp)
    //

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
