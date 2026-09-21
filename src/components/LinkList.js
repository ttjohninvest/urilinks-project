const LIST_ALL_PUBLIC_LINKS = false; //I commented the code out to fix the space between alignment
const LIST_ALL_PUBLIC_LINKS_PEOPLE = false; //I commented the code out to fix the space between alignment
const DISPLAY_THIS_MANY_LINKS = 400;
import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import StickyFixed from "./StickyFixed";
import MyInfiniteScroll from "./MyInfiniteScroll";
import MyInfiniteScroll2 from "./MyInfiniteScroll2";
import MyInfiniteScroll4 from "./MyInfiniteScroll4";
import { startRemoveLink, removeLink } from "../actions/links";
import { Link } from "react-router-dom";
import numeral from "numeral";
import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";
import selectLinksTotal from "../selectors/links-total";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import LinkListItem3 from "./LinkListItem3";
import LinkListItem4 from "./LinkListItem4";

import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";

import LinksSummary from "./LinksSummary";
import AddLinkPage from "./AddlinkPage";
import printerImage from "../assets/images/printer_image.png";
import { v4 } from "uuid";
import LoadingPage from "./LoadingPage";
import StorageSizes from "./StorageSizes";

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");
const z = params.get("z");
const z2 = params.get("z2");
const linkid = params.get("p");

export const LinkList = (props) => {
  const thelinks = [
    { id: 1, text: "hello 1" },
    { id: 2, text: "hello 2" },
    { id: 3, text: "hello 3" },
  ];
  const [selectedOption, setSelectedOption] = useState("option1");
  const [deleteData, setDeleteData] = useState([]);
  const [first, setFirst] = useState(0);
  const [key, setKey] = useState(v4());
  const [showComponent, setShowComponent] = useState(false);
  const [bgcolor1, setBgcolor1] = useState("#b87333"); //rgba(219, 87, 5, 1)
  const [bgcolor2, setBgcolor2] = useState("#db5705"); //rgba(219, 87, 5, 1)
  const [bgcolor3, setBgcolor3] = useState("#db5705"); //rgba(219, 87, 5, 1)
  const [themax, setThemax] = useState(0);
  const [maximum, setMaximum] = useState(0);

  const linkWord = props.linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(props.linksTotal / 100).format("$0,0.00");
  //  const [loading, setLoading] = useState(true)
  //  const [mappedData, setMappedData] = useState([])

  const myRef = useRef();

  // const scrollupref = useRef();
  // const scrolldownref = useRef();
  // const scrollInterval2 = useRef(null);
  // const buttonRef2 = useRef(null);

  const getPlanMax = () => {
    let max = StorageSizes.free;
    //props.settings.plan
    if(props.auth.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2")
          max = StorageSizes.mine;
        else
    if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "free"
    ) {
      max = StorageSizes.free;
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "basic"
    ) {
      max = StorageSizes.basic;
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "standard"
    ) {
      max = StorageSizes.standard;
    } else if (!!props.theplan.plan === false) {
      max = StorageSizes.free;
    } else {
      //premium
      max = StorageSizes.premium;
    }

    console.log("AddLinkPage.js, bookmarks, max=" + max);
    return max;
  };

  useEffect(() => {
    let x = getPlanMax();
    setThemax(x);
    //window.scrollTo(0,0)
    // !!document.querySelector("#ls2") &&
    //   document.querySelector("#ls2").scrollIntoView({
    //     behavior: "smooth",
    //   });
  }, []);

  useEffect(() => {
    console.log("AB props.links.length=" + props.links.length);
    if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "free"
    ) {
      setMaximum(StorageSizes.free);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "basic"
    ) {
      setMaximum(StorageSizes.basic);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "standard"
    ) {
      setMaximum(StorageSizes.standard);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "premium"
    ) {
      setMaximum(StorageSizes.premium);
    } else if (!!props.theplan.plan === false) {
      setMaximum(StorageSizes.free);
    }
  }, []);

  //   useEffect(() => {
  //      const processedData = props.links.map((item,index) => ({
  //         id:item.id,
  //         link:item.link,
  //         index:index
  //       }));

  //       // Set the processed data and turn off loading
  //       setMappedData(processedData);
  //       setLoading(false);

  //   }, [props.links]); // Empty dependency array ensures this runs once

  // useEffect(() => {
  //   window.onbeforeunload = null;
  // }, [items]);

  //  scrollUp = () => {
  //   !!document.querySelector("#top") &&
  //     document.querySelector("#top").scrollIntoView({
  //       behavior: "smooth",
  //     });
  // };

//   const startScrollingUp2 = () => {
//      try {
//     if(!!buttonRef2===true)
//     buttonRef2.current.click();
//    } catch(error) {
//     console.log("error="+error)
//   }
//     // Prevent multiple intervals
//     if (scrollInterval2.current) return;

//     scrollInterval2.current = setInterval(() => {

//       try {
//         if(!!document.getElementById("ls2")===true)
//  document.getElementById("ls2").scrollBy({
//         top: 1, // Scroll 1 pixel each time
//         left: 0,
//         behavior: "auto",
//       });
//       } catch(error) {
//         console.log("error="+error)
//       }
     

//       //console.log(document.getElementById("ls2").scrollTop +
//       //    document.getElementById("ls2").clientHeight)
//       //console.log(document.getElementById("ls2").scrollHeight)
//       if(!!document.getElementById("ls2")===true)
//       if (
//         document.getElementById("ls2").scrollTop +
//           document.getElementById("ls2").clientHeight >=
//         (document.getElementById("ls2").scrollHeight-2 ||  document.getElementById("ls2").scrollHeight+2)
//       ) {
        
//         try {
//     if(!!buttonRef2===true)
//     buttonRef2.current.click();
//    } catch(error) {
//     console.log("error="+error)
//   }
//        try {
//        if(!!scrolldownref===true) //auto scroll in the other direction
//         scrolldownref.current.click()
//        } catch(error) {
//         console.log("error="+error)
//        }
        
        
//       }
//     }, 20); // Every 20 milliseconds
 
//   };

//   const stopScrolling2 = () => {
//     clearInterval(scrollInterval2.current);
//     scrollInterval2.current = null;
//   };

//   const startScrollingDown2 = () => {
//     try {
//     if(!!buttonRef2===true)
//     buttonRef2.current.click();
//    } catch(error) {
//     console.log("error="+error)
//   }
//     // Prevent multiple intervals
//     if (scrollInterval2.current) return;

//     scrollInterval2.current = setInterval(() => {
//         try {
//        if(!!document.getElementById("ls2")===true) //auto scroll in the other direction
//          document.getElementById("ls2").scrollBy({
//         top: -1, // Scroll 1 pixel each time
//         left: 0,
//         behavior: "auto",
//       });
//        } catch(error) {
//         console.log("error="+error)
//        }
     

//       // Stop automatically when reaching the top
//       if(!!document.getElementById("ls2")===true)
//       if (document.getElementById("ls2").scrollTop === 0 || document.getElementById("ls2").scrollTop <= 2) {
//         try {
//     if(!!buttonRef2===true)
//     buttonRef2.current.click();
//    } catch(error) {
//     console.log("error="+error)
//   }

//    try {
//        if(!!scrollupref===true) //auto scroll in the other direction
//           if(!!scrollupref===true) //auto scroll in the other direction
//         scrollupref.current.click()
//        } catch(error) {
//         console.log("error="+error)
//        }
       
       
//         //stopScrolling();
//       }
//     }, 20); // Every 20 milliseconds
   
//   };

  const handleClick = (event) => {
    event.preventDefault();
    //adlinkid
    //document.getElementById('adlinkid').classList.add('pointereventsnone');
    setShowComponent(true);
  };

  useEffect(() => {
    const option = window.localStorage.getItem("whichOption");
    if (option) {
      if (option === "option1" || option === "option2") setFirst(0);
      else if (option === "option3") setFirst(1);
      else if (option === "option4") setFirst(2);
      else setFirst(0);
      setSelectedOption(option);
    }
  }, []);

  useEffect(() => {
    // console.log("A,props.links="+props.links.count)
    // console.log("A,props.links2="+props.links2.count)
    const element = myRef.current;

    if (element) {
      element.addEventListener("click", handleOptionChange);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange);
      };
    }
  }, []);

  const handleOptionChange = (event) => {
    console.log("handleOptionChange, event.target.value=" + event.target.value);
    setSelectedOption(event.target.value);

    if (event.target.value === "option1") {
      window.localStorage.setItem("whichOption", "option1");
      setFirst(0);
      setBgcolor1("#b87333");
      setBgcolor2("#db5705");
      setBgcolor3("#db5705");

      props.av(1);
    } else if (event.target.value === "option2") {
      window.localStorage.setItem("whichOption", "option2");
      setFirst(0);
    } else if (event.target.value === "option3") {
      window.localStorage.setItem("whichOption", "option3");
      setFirst(1);
      console.log("1 LinkList, option3");
      console.log("an1=" + props.an1);
      console.log("props.b=" + props.b);
      setBgcolor1("#db5705");
      setBgcolor2("#b87333");
      setBgcolor3("#db5705");
      props.av(0);
    } else if (event.target.value === "option4") {
      window.localStorage.setItem("whichOption", "option4");
      setFirst(2);
      setBgcolor1("#db5705");
      setBgcolor2("#db5705");
      setBgcolor3("#b87333");
      setKey(v4()); //this causes a refresh if the People button is pressed again
      props.av(0);
    } else window.localStorage.setItem("whichOption", "option1");
  };

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  // if(selectedOption === "option1" && loading===true) {
  //   return <LoadingPage />
  // }
  //

  const goTolinkid = () => {
    props.stopScrolling2()
    window.scrollTo(0,0)
     document
          .querySelector("#"+linkid)
          .scrollIntoView({
            behavior: "smooth",
          });
     window.scrollTo(0,window.scrollY) //without this statement, it will put the link near the top with the scroll control buttons
  }

  useEffect(() => {
     console.log("AAAAA,z="+z);
      console.log("AAAAA,z2="+z2);
      console.log("AAAAA,linkid="+linkid);
   

  //   if (z2 === "1") {
      
  //    console.log("in z2===2, linkid="+linkid)
  // if(!!document.querySelector("#"+linkid)) {
  //      console.log("!!document.querySelector('#'+linkid) was TRUE")
  //      goTolinkid()
  //       } else {
  //         console.log("!!document.querySelector('#'+linkid) was FALSE")
  //       }
  //     } else {
         if(z !== "1") {
       //starts automatic scrolling or auto scroll
       //props.stopScrolling2() //just in case someone clicked the scrollUp button before the 8second delay was up
       //check here to see if scroll has started because the user clicked the scollup or scrolldn button
       props.handleStartScroll(props.scrollupref.current)
    }
     // }
   
    
  }, []);

 

  

  return (
    <div>
     

      {isMobile() === false && (
        <div className="ib margin-left-11 margin-bottom-1">
          {/* {props.links.length===1?"1 link is displayed.":`${props.links.length} links are displayed.`} */}
          {props.links.length===0?props.links.length+' links found.':props.links.length===1?'1 link found.':props.links.length+' links found.'}
        </div>
      )}
      {props.links.length > 1 && 
      <StickyFixed>
      <div className="margin-left-11 margin-top-n-1u"
      style={{zIndex:99}}
      >
         <button
          id="linkid"
          //ref={props.scrollupref}
          title="Return to link."
          onClick={goTolinkid}
          className="ib button-2 widthxpx1"
          style={{zIndex:99}}
        >
          <span>Return</span>
        </button>
        <button
          id="scrollup1"
          ref={props.scrollupref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollingUp2}
          className="ib button-2 widthxpx1 margin-left-11"
          style={{zIndex:99}}
        >
          <span>ScrollUp</span>
        </button>

        <button
          ref={props.buttonRef2}
          title="Click the button to stop auto scroll."
          onClick={props.stopScrolling2}
          className="button-2 ib margin-left-11"
          style={{zIndex:99}}
        >
          <span>Stop</span>
        </button>

        <button
          ref={props.scrolldownref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollingDown2}
          className="button-2 ib margin-left-11 widthxpx1"
          style={{zIndex:99}}
        >
          <span>ScrollDn</span>
        </button>
        {isMobile() === true ?<span className="displaynone margin-top-1 margin-left-n-1 margin-bottom-1">
        <button
          ref={props.scrolltotopref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollToTop2}
          className="button-2 ib margin-left-11 widthxpx1"
          style={{zIndex:99}}
        >
          <span>ScrollToTop</span>
        </button>
         <button
          ref={props.scrolltobottomref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollToBottom2}
          className="button-2 ib margin-left-11 widthxpx1"
          style={{zIndex:99}}
        >
        <span>ScrollToEnd</span>
        </button></span>:<span>
          <button
          ref={props.scrolltotopref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollToTop2}
          className="button-2 ib margin-left-11 widthxpx1"
          style={{zIndex:99}}
        >
          <span>ScrollToTop</span>
        </button>
         <button
          ref={props.scrolltobottomref}
          title="Click the button to begin auto scroll."
          onClick={props.startScrollToBottom2}
          className="button-2 ib margin-left-11 widthxpx1"
          style={{zIndex:99}}
        >
          <span>ScrollToEnd</span>
        </button>
        </span>
        }
      </div>
      </StickyFixed>
      }
      <div id="forvideo"></div>
      <div className="border-left-5">
        <div id="before-link-summary-id" className="margin-bottom-5a"></div>

        <div>
          {selectedOption === "option1" && (
            <div
              id="ls2"
              className={`${isMobile() === true ? "scrollable-div2content" : "scrollable-div1c"}`}
              //onClick={()=>stopScrolling2()}
            >
              {props.links.length === 0 ? (null
                // <div className="list-item- list-item--message-"></div>
              ) : (
                //readonly means another user is seeing the page
                //private urls don't have to be hid from owner of page
                props.links.splice(0, themax).map((link, index) => {
                  //if(rt === "readonly" && link.showpublic === 0 || (link.showpublic === 1 && link.archive===1)) return (<div></div>)
                  if (
                    rt === "readonly" &&
                    link.showpublic === 0
                    //|| link.archive === 1
                  )
                    return null //<div key={link.id + "1"}></div>;
                  else
                    return (
                      <div
                        id={link.id}
                        key={link.id}
                        className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                      >
                        <LinkListItem
                          rt={rt}
                          key={link.id}
                          {...link}
                          index={index}
                          signup={props.signup.signup}
                          idexists={props.idexists}
                        />
                      </div>
                    );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//
const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters); //selectLinks calls getFilteredLinksArray in actions/links.js
  //const visibleLinks2 = selectLinks2(state.links2, state.filters);

  return {
    auth:state.auth,
    theplan: state.theplan,
    linkCount: visibleLinks.length,
    //linkCount2: visibleLinks2.length,
    linksTotal: selectLinksTotal(visibleLinks),
    //linksTotal2: selectLinksTotal(visibleLinks2),
    signup: state.signup,
    links: selectLinks(state.links, state.filters),
    links2: selectLinks(state.links2, state.filters),
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };


  
export default connect(mapStateToProps)(LinkList);
