import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import setHasrefreshed from "../actions/hasrefreshed";

import LinkListFileDate from "./LinkListFileDate";
import LinkListFiltersFileDate from "./LinkListFiltersFileDate";
import { useSelector } from 'react-redux';

const LinkDashboardPage = (props) => {
  //const elementRef = useRef()
  const scrollableDiv = React.useRef();
  const [heightofdiv, setHeightOfDiv] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [first, setFirst] = useState(true); //true for LinkListFilters
  const [theValue, setTheValue] = useState(false)
  const [avalue, setAvalue] = useState(0)
   

  useEffect(() => {
    const handleScroll = () => {
      window.localStorage.setItem("scrollPosition", window.scrollY);
      //window.localStorage.setItem("scrollY",window.scrollY)
      console.log(window.scrollY);
    };

    // Adding scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(()=>{
  //   window.onbeforeunload = null;
  // },[])

  const setTheHashTagDivHeight = (h) => {
    setHeightOfDiv(h);
  };

  useEffect(() => {
    const sp = parseInt(window.localStorage.getItem("scrollPosition"));
    console.log("LinkDashboardPage.js, sp=" + sp);
    window.scrollTo(0, sp);
    // window.scrollTo(0,sp-heightofdiv)
    console.log(
      "LinkDashboardPage, props.settings.photoURL=" + props.settings.photoURL
    );
    // Save scroll position before leaving
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
      console.log(
        "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT window.scrollY=" + window.scrollY
      );
      setTheValue(props.theValue)
      
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "LinkDashboardPage, props.settings.photoURL=" + props.settings.photoURL
  //   );
  //   // Save scroll position before leaving
  //   window.addEventListener("beforeunload", () => {
  //     sessionStorage.setItem("scrollPosition", window.scrollY);
  //     console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  //     console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  //     console.log(
  //       "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT window.scrollY=" + window.scrollY
  //     );
  //   },[]);

    // Restore scroll position on page load
    const savedScrollPosition = parseInt(
      sessionStorage.getItem("scrollPosition")
    );
    setScrollPos(savedScrollPosition);
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
    console.log(
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT savedScrollPosition=" +
        savedScrollPosition
    );
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      //sessionStorage.removeItem('scrollPosition');
    }

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.setItem("scrollPosition", window.scrollY);
      });
    };
  }, [scrollPos]);

  useEffect(() => {
    // const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    // console.log("LinkListFilters.js, should be false, hasRefreshed="+hasRefreshed)
    // if (!hasRefreshed) {
    //   sessionStorage.setItem('hasRefreshed', 'true');
    //   console.log("LinkListFilters.js, window.location.reload()")
    //   window.location.reload();
    // }
    //window.location.reload();
    //const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    //console.log("1 LinkDashboardPage.js, should be false, props.hasrefreshed.hasrefreshed="+props.hasrefreshed.hasrefreshed)
    const x = useSelector(state => state.hasrefreshed);
    if (!x) {
      // sessionStorage.setItem('hasRefreshed', 'true');
      props.setHasrefreshed({hasrefreshed:true})

      console.log("2 LinkDashboardPage.js, should be true, props.hasrefreshed.hasrefreshed="+props.hasrefreshed.hasrefreshed)
      window.location.reload();
    }
    
    
  }, []);

  useEffect(()=>{
    //window.location.reload();
  },[])

  return (
    <div>
      <div id="very-top-id" className="website-background-color">
          {/* <div className="border2black">
left column
        </div> */}
        <div className="padding-tb-1">
          <LinkListFilters setTheHashTagDivHeight={setTheHashTagDivHeight} />
          <LinkList />
        </div>
        
        {/* <div className="border2black">
right column
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  hasrefreshed: state.hasrefreshed
});

const mapDispatchToProps = (dispatch) => ({
  setHasrefreshed: (hasrefreshed)=>dispatch(setHasrefreshed(hasrefreshed))
});


export default connect(mapStateToProps, mapDispatchToProps)(LinkDashboardPage);
//export default LinkDashboardPage;
