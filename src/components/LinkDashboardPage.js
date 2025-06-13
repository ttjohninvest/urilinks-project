import React, {useEffect, useState, useRef} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";


import LinkListFileDate from "./LinkListFileDate";
import LinkListFiltersFileDate from "./LinkListFiltersFileDate";

const LinkDashboardPage = (props) => {
  //const elementRef = useRef()
  const scrollableDiv = React.useRef();
  const [heightofdiv, setHeightOfDiv] = useState(0)
  const [scrollPos, setScrollPos] =useState(0)
  const [first, setFirst] =useState(true) //true for LinkListFilters
 

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

  // useEffect(()=>{
  //   window.onbeforeunload = null;
  // },[])

 
  const setTheHashTagDivHeight=(h) => 
  {
    setHeightOfDiv(h)
  }

  useEffect(()=>{
    
    const sp = parseInt(window.localStorage.getItem("scrollPosition"))
    console.log("LinkDashboardPage.js, sp="+sp)
    window.scrollTo(0,sp)
    // window.scrollTo(0,sp-heightofdiv)
    
  },[])

 useEffect(() => {
       // Save scroll position before leaving
       window.addEventListener('beforeunload', () => {
         sessionStorage.setItem('scrollPosition', window.scrollY);
          console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
       console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
       console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT window.scrollY="+window.scrollY)
       
       });

       // Restore scroll position on page load
       const savedScrollPosition = parseInt(sessionStorage.getItem('scrollPosition'));
       setScrollPos(savedScrollPosition)
       console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
       console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
       console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT savedScrollPosition="+savedScrollPosition)
       if (savedScrollPosition) {
         window.scrollTo(0, parseInt(savedScrollPosition));
         //sessionStorage.removeItem('scrollPosition');
       }

       return () => {
         window.removeEventListener('beforeunload', () => {
           sessionStorage.setItem('scrollPosition', window.scrollY);
         });
       };
     }, [scrollPos]);

  // useEffect(() => {
  //   const hasRefreshed = sessionStorage.getItem('hasRefreshed');
  //   if (!hasRefreshed) {
  //     sessionStorage.setItem('hasRefreshed', 'true');
  //     window.location.reload();
  //   }
  // }, []);

 

 return (
  
    <div id="very-top-id" className="website-background-color">
     {first?<div>
 <LinkListFilters setTheHashTagDivHeight={setTheHashTagDivHeight} />
      <LinkList />
     </div>
     
:<div>
        <LinkListFiltersFileDate setTheHashTagDivHeight={setTheHashTagDivHeight} />
      <LinkListFileDate /></div>}
    </div>
   
  );
};

export default LinkDashboardPage;

