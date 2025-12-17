import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import setHasrefreshed from "../actions/hasrefreshed";
import { startLogout } from "../actions/auth";

import LinkListFileDate from "./LinkListFileDate";
import LinkListFiltersFileDate from "./LinkListFiltersFileDate";
import { useSelector } from 'react-redux';

//  const logoutit = () => {
//       //sessionStorage.setItem('hasRefreshed', 'false');
//       //const hasRefreshed = sessionStorage.getItem('hasRefreshed');
//       //props.setHasrefreshed({ hasrefreshed: false });
//       //props.setTheplan({subscriptionId:"",plan:"free",customerId:""})
//       props.startLogout();
//     };

const LinkDashboardPage = (props) => {
  //const elementRef = useRef()
  const scrollableDiv = React.useRef();
  const [heightofdiv, setHeightOfDiv] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [first, setFirst] = useState(true); //true for LinkListFilters
  const [theValue, setTheValue] = useState(false)
  const [avalue, setAvalue] = useState(0)
  const [bvalue, setBvalue] = useState(0)
   const [b, bf] = useState(1)

  useEffect(() => {

     
    // const handleTabClose = (event) => {
    //   //event.preventDefault();
    //   // Optional: Set a custom message (though modern browsers may ignore it)
    //   //logoutit()
    //   //props.startLogout();
    //   //return (event.returnValue = 'Are you sure you want to leave?');
    // };

    // window.addEventListener('beforeunload', handleTabClose);

    // return () => {
    //   window.removeEventListener('beforeunload', handleTabClose);
    // };

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
      setBvalue(!bvalue)
  }, []);

 
//useEffect(()=>{


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

  
const a = (c) => {
  bf(c)
}
 

  return (
    <div>
      <div id="very-top-id" className="website-background-color">
          {/* <div className="border2black">
left column
        </div> */}
        <div className="padding-tb-1">
          <LinkListFilters setTheHashTagDivHeight={setTheHashTagDivHeight} b={b}/>
          <LinkList 
          //a={a}
          />
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

// const mapDispatchToProps = (dispatch) => ({
//   setHasrefreshed: (hasrefreshed)=>dispatch(setHasrefreshed(hasrefreshed))
// });


// export default connect(mapStateToProps, mapDispatchToProps)(LinkDashboardPage);
//export default LinkDashboardPage;

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("startLogout"))
      .catch((error) =>
        console.log("startLogout, error" + error)
      );
  },
 setHasrefreshed: (hasrefreshed)=>dispatch(setHasrefreshed(hasrefreshed))
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkDashboardPage);
