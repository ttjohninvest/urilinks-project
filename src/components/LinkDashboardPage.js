import React, {useEffect,useState} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";










const LinkDashboardPage = () => {

  const [scrollPos, setScrollPos] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      window.localStorage.setItem("scrollY",window.scrollY)
      setScrollPos(window.scrollY);

    }

    // Adding scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
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
