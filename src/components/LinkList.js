const LIST_ALL_PUBLIC_LINKS = false; //I commented the code out to fix the space between alignment
const LIST_ALL_PUBLIC_LINKS_PEOPLE = false; //I commented the code out to fix the space between alignment
const DISPLAY_THIS_MANY_LINKS = 400;
import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
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
const r = params.get("x");

export const LinkList = (props) => {
  const thelinks = [{id:1,text:"hello 1"},{id:2,text:"hello 2"},{id:3,text:"hello 3"}]
  const [selectedOption, setSelectedOption] = useState("option1");
  const [deleteData, setDeleteData] = useState([]);
  const [first, setFirst] = useState(0);
  const [key, setKey] = useState(v4());
  const [showComponent, setShowComponent] = useState(false);
  const [bgcolor1, setBgcolor1] = useState("#b87333"); //rgba(219, 87, 5, 1)
  const [bgcolor2, setBgcolor2] = useState("#db5705"); //rgba(219, 87, 5, 1)
  const [bgcolor3, setBgcolor3] = useState("#db5705"); //rgba(219, 87, 5, 1)
  const [themax, setThemax] = useState(0)

  const linkWord = props.linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(props.linksTotal / 100).format("$0,0.00");
  //  const [loading, setLoading] = useState(true)
  //  const [mappedData, setMappedData] = useState([])

  const myRef = useRef();
  const scrollInterval2 = useRef(null);
  const buttonRef2 = useRef(null);

  const getPlanMax = () => {
    let max = StorageSizes.free;
    //props.settings.plan
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

  useEffect(()=>{
let x = getPlanMax()
setThemax(x)
  },[])

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

  const startScrollingDown2 = () => {
    // Prevent multiple intervals
    if (scrollInterval2.current) return;

    scrollInterval2.current = setInterval(() => {
      document.getElementById("ls2").scrollBy({
        top: -1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      // Stop automatically when reaching the top
      if (document.getElementById("ls2").scrollTop === 0) {
        buttonRef2.current.click();

        //stopScrolling();
      }
    }, 20); // Every 20 milliseconds
  };

  const startScrollingUp2 = () => {
    // Prevent multiple intervals
    if (scrollInterval2.current) return;

    scrollInterval2.current = setInterval(() => {
      document.getElementById("ls2").scrollBy({
        top: 1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      if (
        document.getElementById("ls2").scrollTop +
          document.getElementById("ls2").clientHeight >=
        document.getElementById("ls2").scrollHeight
      ) {
        buttonRef2.current.click();
      }
    }, 20); // Every 20 milliseconds
  };

  const stopScrolling2 = () => {
    clearInterval(scrollInterval2.current);
    scrollInterval2.current = null;
  };

  const handleClick = (event) => {
    event.preventDefault()
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

  return (
    <div>
 <button 
 title="Click the button to begin auto scroll."
 onClick={startScrollingUp2} className="button-2">
            ScrollUp
          </button>

          <button
          ref={buttonRef2}
          title="Click the button to stop auto scroll."
            onClick={stopScrolling2}
            className="button-2 ib margin-left-11"
          >
            Stop
          </button>

          <button
          title="Click the button to begin auto scroll."
            onClick={startScrollingDown2}
            className="button-2 ib margin-left-11"
          >
            ScrollDn
          </button>
    
    <div className="border-left-5">





      <div id="before-link-summary-id" className="margin-bottom-5a">
        {/* <LinksSummary /> */}

      

      
      </div>

     
<div
  
>
      {selectedOption === "option1" && (
        <div 
        id="ls2"
        className="list-body- scrollable-div2content-">
          {props.links.length === 0 ? (
            <div className="list-item- list-item--message-">
              
            </div>
          ) : (
            //readonly means another user is seeing the page
            //private urls don't have to be hid from owner of page
            props.links.splice(0, themax).map((link, index) => {
              //if(r === "readonly" && link.showpublic === 0 || (link.showpublic === 1 && link.archive===1)) return (<div></div>)
              if(r === "readonly" && (link.showpublic === 0
                 //|| link.archive === 1
                )) return (<div></div>)
              else return (
                <div key={link.id+"1"}>
                  
                  <LinkListItem
                    r={r}
                    key={link.id}
                    //key={index}
                    {...link}
                    index={index}
                    signup={props.signup.signup}
                  />
                </div>
                
              )
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
  const visibleLinks = selectLinks(state.links, state.filters);
  const visibleLinks2 = selectLinks2(state.links2, state.filters);

  return {
    theplan:state.theplan,
    linkCount: visibleLinks.length,
    linkCount2: visibleLinks2.length,
    linksTotal: selectLinksTotal(visibleLinks),
    linksTotal2: selectLinksTotal(visibleLinks2),
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
