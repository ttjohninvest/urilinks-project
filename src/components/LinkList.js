
import React,{useState,useEffect,useRef} from "react";
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";
////
export const LinkList = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1")
  
  const myRef = useRef()

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollableRef = useRef(null);

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element) return;

    element.scrollTop = scrollPosition;

    const handleScroll = () => {
      
      scrollTop(element.scrollTop)
      setScrollPosition(element.scrollTop);
    };

    element.addEventListener('DOMContentLoaded', handleScroll);

  //   window.addEventListener("DOMContentLoaded", function() {
  //     // do stuff
  // }, false);

    return () => {
      element.removeEventListener('DOMContentLoaded', handleScroll);
    };
  }, [scrollPosition]);

  const handleOptionChange = (event) => {
    console.log("handleOptionChange, event.target.value="+event.target.value)
      setSelectedOption(event.target.value)
    
  };

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
    <div className="content-container website-background-color"
    ref={scrollableRef}
    >
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
        <div className="list-body-2 margin-top-1">
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


