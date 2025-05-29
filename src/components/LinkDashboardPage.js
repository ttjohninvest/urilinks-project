import React, {useEffect, useState, useRef} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
//import LinksSummary from "./LinksSummary";

const LinkDashboardPage = (props) => {
  //const elementRef = useRef()
  const scrollableDiv = React.useRef();
  const [heightofdiv, setHeightOfDiv] = useState(0)
 

  useEffect(() => {
    const handleScroll = () => {
      window.localStorage.setItem("scrollPosition",window.scrollY)
      //window.localStorage.setItem("scrollY",window.scrollY)
      console.log(window.scrollY)
     

    }

    // Adding scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(()=>{
    window.onbeforeunload = null;
  },[])

 
  const setTheHashTagDivHeight=(h) => 
  {
    setHeightOfDiv(h)
  }

  useEffect(()=>{
    
    const sp = parseInt(window.localStorage.getItem("scrollPosition"))
    console.log("LinkDashboardPage.js, sp="+sp)
    window.scrollTo(0,sp)
    // window.scrollTo(0,sp-heightofdiv)
    
    //window.scrollTo(0,0)
//    document.querySelector('#very-top-id').scrollIntoView({
//     behavior: 'instant',
// })
  },[])

  // useEffect(() => {
  //   const hasRefreshed = sessionStorage.getItem('hasRefreshed');
  //   if (!hasRefreshed) {
  //     sessionStorage.setItem('hasRefreshed', 'true');
  //     window.location.reload();
  //   }
  // }, []);

 

 return (
  
    <div id="very-top-id" className="website-background-color">
      
      <LinkListFilters setTheHashTagDivHeight={setTheHashTagDivHeight} />
      <LinkList />
    </div>
   
  );
};

export default LinkDashboardPage;

