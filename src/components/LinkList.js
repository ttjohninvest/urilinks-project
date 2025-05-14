
import React,{useState,useEffect,useRef} from "react";
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";
import { hashtags2 } from "../actions/links";
////
export const LinkList = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1")
  
  const myRef = useRef()

  const handleOptionChange = (event) => {
    console.log("handleOptionChange, event.target.value="+event.target.value)
      setSelectedOption(event.target.value)

      if(event.target.value==="option1")
       window.localStorage.setItem("whichOption","option1")
      else if(event.target.value==="option2")
       window.localStorage.setItem("whichOption","option2")
      else window.localStorage.setItem("whichOption","option1")
    
  };

  

  useEffect(()=>{
    const option = window.localStorage.getItem("whichOption")
    if(option) setSelectedOption(option)
  },[])

  useEffect(()=>{
  
    const element = myRef.current;

    if (element) {
      element.addEventListener("click", handleOptionChange);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange);
      };
    }
  },[])


  return (
    <div className="content-container website-background-color">
      <div className="list-header list-header__flex- border-green- margin-bottom-1">
        <div className="show-for-desktop">Uri/Url Link(s)</div>
        <div className="list-header__flex">
              <div>
                <label className="inline-block__flex">
                  <input
                    ref={myRef}
                    className="the-inline-block"
                    type="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                  />
                  <span className="the-inline-block label-text label-text-right">links list with details</span>
                </label>
              </div>
              <div className="margin-left-1">
                <label className="inline-block__flex">
                  <input
                    ref={myRef}
                    className="the-inline-block"
                    type="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleOptionChange}
                  />
                  <span className="the-inline-block label-text">links list with out details</span>
                </label>
              </div>
            
              
            </div>
      </div>
      <div>{hashtags2.length}</div>
      <ul>
      {hashtags2.forEach((hashtag)=>{
        return <li>{hashtag}</li>
      })}
      </ul>
      {selectedOption === "option1" ? (
        <div className="list-body border-green-">
          {props.links.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No links</span>
            </div>
          ) : (
            props.links.map((link) => {
              return <LinkListItem key={link.id} {...link} />;
            })
          )}
        </div>
      ) : (
        <div className="list-body-2 margin-top-11">
          {props.links.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No links</span>
            </div>
          ) : (
            props.links.map((link) => {
              return <LinkListItem2 key={link.id} {...link} />;
            })
          )}
        </div>
      )}
    </div>
  );

  
};

const mapStateToProps = (state) => {
  return {
    links: selectLinks(state.links, state.filters),
  };
};


export default connect(mapStateToProps)(LinkList);


