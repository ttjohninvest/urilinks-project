import React, { useEffect, useState, useRef } from "react";
import {v4} from "uuid"
import { connect } from "react-redux";
//import LinkList from "./LinkList";
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
      window.localStorage.setItem("sortBy","description")
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

  useEffect(()=>{
    bf(b)
  },[b])
  
const av = (c) => {
  console.log("a=(c)=>, LinkDashboardPage.js, c="+c)
  bf(c)
}

const useUnload = (fn) => {
  useEffect(() => {
    const callback = fn;
    window.addEventListener('beforeunload', callback);
    window.addEventListener('unload', callback);
    return () => {
      window.removeEventListener('beforeunload', callback);
      window.removeEventListener('unload', callback);
    };
  }, [fn]);
};

useUnload((e) => {
    // Perform cleanup or send data before the page unloads
    console.log('Page is unloading');
    //window.localStorage.setItem("sortBy", "description");
    window.localStorage.setItem("whichOption", "option1"); //option1 (your links button), option3 (all public links button), option4 (people)
    window.localStorage.setItem("searchLinks1", "");
    window.localStorage.setItem("searchLinks2", "");
    window.localStorage.setItem("searchLinks3", "");
    window.localStorage.setItem("searchLinks4", "");
    // Example: Use navigator.sendBeacon to send data asynchronously
    //navigator.sendBeacon('/api/log', JSON.stringify({ action: 'page-unload' }));
  });

    //this.setit = this.setit.bind(this);
    const setit = (value, event) => {
      event.preventDefault();
      value="Animals"
      console.log("setIt, 3333333333333333333333333 value=" + value);
  
      this.props.sortByHashTag();
      this.props.setTextFilter(value);
  
      window.localStorage.setItem("sortBy", "hashtag");
      window.localStorage.setItem("searchLinks3", value);
  
      //this scrolls the results into view, the first and subsequent result is shown
      !!document.querySelector("#before-before-link-summary-id") &&
        document.querySelector("#before-before-link-summary-id").scrollIntoView({
          behavior: "smooth",
        });
    };

  
 

  return (
    <div>
      <div id="very-top-id" className="website-background-color">
          {/* <div className="border2black">
left column
        </div> */}
        <div className="padding-tb-1">
          <LinkListFilters setTheHashTagDivHeight={setTheHashTagDivHeight}  b={b} av={av} setit={setit}/>
          {/* <LinkList av={av}  /> */}
         
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

/*
import React, { useState, useEffect } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Hide splash screen after 3 seconds
  }, []);

  return (
    <div>
      {isLoading ? (
        // Splash screen content
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f0f0f0',
        }}>
          <h1>Loading...</h1>
          <div style={{ marginTop: '20px' }}>
            
            <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
          </div>
        </div>
      ) : (
        // Main app content
        <div>
          <h1>Welcome to My React App</h1>
          <p>This is the main content after splash screen.</p>
        </div>
      )}
    </div>
  );
};

export default App;
*/