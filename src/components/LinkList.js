import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { startRemoveLink, removeLink } from "../actions/links";
import { Link } from "react-router-dom";
import numeral from "numeral";

import selectLinksTotal from "../selectors/links-total";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";
import LinksSummary from "./LinksSummary";
import printerImage from "../assets/images/printer_image.png";



////
export const LinkList = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [deleteData, setDeleteData] = useState([]);

  const linkWord = props.linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
    const formattedLinksTotal = numeral(props.linksTotal / 100).format("$0,0.00");

  const myRef = useRef();
 
  const handleOptionChange = (event) => {
    console.log("handleOptionChange, event.target.value=" + event.target.value);
    setSelectedOption(event.target.value);

    if (event.target.value === "option1")
      window.localStorage.setItem("whichOption", "option1");
    else if (event.target.value === "option2")
      window.localStorage.setItem("whichOption", "option2");
    else window.localStorage.setItem("whichOption", "option1");
  };

  //   window.addEventListener("beforeunload",(event)=>{
  //     return null;
  // })
  // and

  useEffect(() => {
    
    window.onbeforeunload = null;
  }, []);

  useEffect(() => {
    const option = window.localStorage.getItem("whichOption");
    if (option) setSelectedOption(option);
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

  const printIt = () => {
    
    
    
    var printContent = document.getElementById("listid").innerHTML;
    var newWin = window.open("", "", "width=1000,height=600");
    
    //newWin.title = "urilinks list of links";
    newWin.document.write("<html><head><title>list-of-links-urilinks.com</title></head><body>");
    newWin.document.write(printContent);
    newWin.document.write("</body></html>");
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  
  };

  return (
    <div className="content-container- website-background-color margin-top-1a-">
      <div id="before-link-summary-id" className="flexrow2b margin-bottom-5a">
       
        {/* <LinksSummary /> */}
         
         {props.signup.signup === true ? <div>
               {/* <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsauto"><span className="ib is-active">{props.linkCount}</span> <span className="ib margin-left-11"> Link(s) Found</span></div> */}
                
                  <Link className="button-2 ib text-size-5 bg-color-1 pointereventsauto" to="/create">
                    Add Link
                  </Link>
                
              </div>:<div>
               {/* <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsnone"><span className="ib is-active">{props.linkCount}</span><span className="ib margin-left-11-"> Link(s) Found</span></div> */}
                
                  <Link className="button-2 ib text-size-5 bg-color-1 pointereventsnone" to="/create">
                    Add Link
                  </Link>
                
              </div>
              }
            
        <div>
          <label className="inline-block__flex">
            <input
              ref={myRef}
              className="the-inline-block zindex2 makehidden"
              type="radio"
              value="option1"
              checked={selectedOption === "option1"}
              onChange={handleOptionChange}
            />
            {/* <div className="the-inline-block- label-text margin-bottom5- underline cursor-pointer color-purple" title="click to see the list of links (titles only)"> */}
              <span className="button-2 ib cursor-pointer" title="links list with details">List Links</span>
            {/* </div> */}
          </label>
        </div>
        <div>
          <label className="inline-block__flex">
            <input
              ref={myRef}
              className="the-inline-block zindex2 makehidden"
              type="radio"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
            />
            {/* <div className="the-inline-block- label-text margin-bottom5- underline cursor-pointer color-purple" title="click to see the list of links (titles only)"> */}
              <span className="button-2 ib cursor-pointer" title="links list with out details">List Links</span>
            {/* </div> */}
          </label>
        </div>

        
      </div>
      
      <div id="link-summary-id" className="margin-left-11 text-size-5 margin-right-1 borderRadius55 pointereventsauto"><span className="ib is-active">{props.linkCount}</span> <span className="ib margin-left-11"> Link(s) Found</span></div>

      {selectedOption === "option1" ? (
        <div className="list-body border-green-">
          {props.rl > 0 && (
            <div
              onClick={printIt}
              className="margin-top-1111b"
              title="You may print this list to the printer."
            >
              <img
                src={printerImage}
                width="32"
                height="32"
                style={{ borderRadius: "50%" }}
              />
            </div>
          )}

          {props.links.length === 0 ? (
            <div className="list-item list-item--message">
              <span>0 links found</span>
            </div>
          ) :  false  ? (
            props.links.slice(0,100).map((link) => {
              return (
                <div>
                  <LinkListItem key={link.id} {...link} />
                </div>
              )
            })
          ):
          (
            props.links.map((link) => {
              return (
                <div>
                  <LinkListItem key={link.id} {...link} />
                </div>
              )
            })
          )
          
          }
        </div>
      ) : (
        <div className="list-body margin-top-11-">
          {props.links2.length > 0 && (
            <div
              onClick={printIt}
              className="margin-top-1111b cursor-pointer"
              title="You may print this list to the printer."
            >
              <img
                src={printerImage}
                width="32"
                height="32"
                style={{ borderRadius: "50%" }}
              />
            </div>
          )}
          <div id="listid">
            {props.links2.length === 0 ? (
              <div className="list-item list-item--message">
                <span>0 links found</span>
              </div>
            ) : false  ? (
              props.links2.splice(0,100).map((link) => {
                return <LinkListItem2 key={link.id} {...link} />;
              })
            ):
            (
              props.links2.map((link) => {
                return <LinkListItem2 key={link.id} {...link} />;
              })
            )
            }
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters);

  return {
    linkCount: visibleLinks.length,
    linksTotal: selectLinksTotal(visibleLinks),
    signup:state.signup,
    links: selectLinks(state.links, state.filters),
    links2: selectLinks(state.links2, state.filters)
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(LinkList);
