import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import MyInfiniteScroll from "./MyInfiniteScroll";
import MyInfiniteScroll2 from "./MyInfiniteScroll2";
import MyInfiniteScroll4 from "./MyInfiniteScroll4";
import { startRemoveLink, removeLink } from "../actions/links";
import { Link } from "react-router-dom";
import numeral from "numeral";

import selectLinksTotal from "../selectors/links-total";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import LinkListItem3 from "./LinkListItem3";
import LinkListItem4 from "./LinkListItem4";
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import LinksSummary from "./LinksSummary";
import printerImage from "../assets/images/printer_image.png";
import { v4 } from "uuid";

export const LinkList = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [deleteData, setDeleteData] = useState([]);
  const [first, setFirst] = useState(0);
  const [key, setKey] = useState(v4());

  const linkWord = props.linkCount === 1 ? "Uri/Url Link" : "Uri/Url Links";
  const formattedLinksTotal = numeral(props.linksTotal / 100).format("$0,0.00");

  const myRef = useRef();

  useEffect(() => {
    window.onbeforeunload = null;
  }, []);

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

      props.av(0);
      
    } else if (event.target.value === "option4") {
      window.localStorage.setItem("whichOption", "option4");
      setFirst(2);
      setKey(v4());
    } else window.localStorage.setItem("whichOption", "option1");
  };

  return (
    <div className="content-container- website-background-color margin-top-1a-">
      <div id="before-link-summary-id" className="flexrow2b margin-bottom-5a">
        {/* <LinksSummary /> */}

        {props.signup.signup === true ? (
          <div>
            {/* <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsauto"><span className="ib is-active">{props.linkCount}</span> <span className="ib margin-left-11"> Link(s) Found</span></div> */}

            <Link
              className="button-2 ib text-size-5 bg-color-1 pointereventsauto"
              to="/create"
            >
              Add Link
            </Link>
          </div>
        ) : (
          <div>
            {/* <div id="link-summary-id" className="text-size-5 margin-right-1 borderRadius55 pointereventsnone"><span className="ib is-active">{props.linkCount}</span><span className="ib margin-left-11-"> Link(s) Found</span></div> */}

            <Link
              className="button-2 ib text-size-5 bg-color-1 pointereventsnone"
              to="/create"
            >
              Add Link
            </Link>
          </div>
        )}

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
            <span
              className="button-2 ib cursor-pointer"
              title="links list with details"
            >
              List Links
            </span>
          </label>
        </div>
        {/*do not delete the following commented out code, List Links*/}
        {/* <div>
          <label className="inline-block__flex">
            <input
              ref={myRef}
              className="the-inline-block zindex2 makehidden"
              type="radio"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
            />
              <span className="button-2 ib cursor-pointer" title="links list with out details">List Links</span>
            
          </label>
        </div> */}

        <div>
          <label className="inline-block__flex">
            <input
              ref={myRef}
              className="the-inline-block zindex2 makehidden"
              type="radio"
              value="option3"
              checked={selectedOption === "option3"}
              onChange={handleOptionChange}
            />
            <span
              className="button-2 ib cursor-pointer"
              title="This will show all the links the public has shared."
            >
              List All Links
            </span>
          </label>
        </div>

        <div>
          <label className="inline-block__flex">
            <input
              ref={myRef}
              className="the-inline-block zindex2 makehidden"
              type="radio"
              value="option4"
              checked={selectedOption === "option4"}
              onChange={handleOptionChange}
            />
            <span
              className="button-2 ib cursor-pointer"
              title="This will show all the links the public has shared."
            >
              People
            </span>
          </label>
        </div>
      </div>

      <div
        id="link-summary-id"
        className="margin-left-11 text-size-5 margin-right-1 borderRadius55 pointereventsauto"
      >
        <span id="linkcount2id" className="ib is-active">
          {first === 0 ? props.linkCount : first === 1 ? props.linkCount2 : ""}
        </span>
        <span className="ib margin-left-11">
          {first === 0 || first === 1
            ? " Link(s) Found"
            : first === 2
            ? " Results"
            : ""}
        </span>
      </div>

      {selectedOption === "option3" ? (
        <div title="The user has given permission to show these links to the public.">
          Filtered by permission
        </div>
      ) : (
        <div></div>
      )}
      {/* {selectedOption === "option4"?<div>People</div>:<div></div>} */}

      {selectedOption === "option4" ? (
        <MyInfiniteScroll2 firstone={true} key={key} />
      ) : selectedOption === "option1" ? (
        <div className="list-body border-green-">
          {props.links.length === 0 ? (
            <div className="list-item list-item--message">
              <span>0 links found</span>
            </div>
          ) : false ? (
            props.links.slice(0, 100).map((link) => {
              return (
                <div>
                  <LinkListItem key={link.id} {...link} />
                </div>
              );
            })
          ) : (
            // <MyInfiniteScroll4 />
            props.links.map((link) => {
              return (
                <div>
                  <LinkListItem key={link.id} {...link} />
                </div>
              );
            })
          )}
        </div>
      ) : selectedOption === "option2" ? (
        <div className="list-body margin-top-11-">
          {/* {props.links.length > 0 && (
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
          )} */}

          {props.links.length === 0 ? (
            <div className="list-item list-item--message">
              <span>0 links found</span>
            </div>
          ) : false ? (
            props.links.splice(0, 100).map((link) => {
              return <LinkListItem2 lcf={lcf} key={link.id} {...link} />;
            })
          ) : (
            props.links.map((link) => {
              return <LinkListItem2 key={link.id} {...link} />;
            })
          )}
        </div>
      ) : selectedOption === "option3" ? (
        <div className="list-body margin-top-11-">
          <div id="listid">
            {props.links2.length === 0 ? (
              <div className="list-item list-item--message">
                <span>0 links found</span>
              </div>
            ) : false ? (
              props.links2.splice(0, 100).map((link) => {
                return <LinkListItem4 key={link.id} {...link} />;
              })
            ) : (
              // <MyInfiniteScroll />

              props.links2.map((link) => {
                return <LinkListItem4 key={link.id} {...link} />;
              })
            )}
          </div>
        </div>
      ) : (
        <div>
          <MyInfiniteScroll2 />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters);
  const visibleLinks2 = selectLinks2(state.links2, state.filters);

  return {
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
