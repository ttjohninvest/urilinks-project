
import React,{useState,useEffect,useRef} from "react";
import { connect } from "react-redux";
import LinkListItemFileDate from "./LinkListItemFileDate";
import LinkListItem2FileDate from "./LinkListItem2FileDate";
import selectLinksFileDate from "../selectors/linksfiledate";
import LinksSummaryFileDate from "./LinksSummaryFileDate";

////
export const LinkListFileDate = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1")
  
  const myRef = useRef()

  const handleOptionChange = (event) => {
    console.log("handleOptionChange, event.target.value="+event.target.value)
      setSelectedOption(event.target.value)

      if(event.target.value==="option1")
       window.localStorage.setItem("whichOptionFileDate","option1")
      else if(event.target.value==="option2")
       window.localStorage.setItem("whichOptionFileDate","option2")
      else window.localStorage.setItem("whichOptionFileDate","option1")
    
  };

//   window.addEventListener("beforeunload",(event)=>{
//     return null;
// })
// and

 
 useEffect(()=>{
    window.onbeforeunload=null;
  },[])
  

  useEffect(()=>{
    const option = window.localStorage.getItem("whichOptionFileDate")
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
    <div className="content-container website-background-color margin-top-1a">
      
      <div id="before-link-summary-id" className="flexrow2b margin-bottom-5a">
        {/* <div className="show-for-desktop margin-left-11111"></div> */}
        {/* <div className="list-header__flex"> */}
          <LinksSummary />
              <div className="margin-bottom5-">
                <label className="inline-block__flex">
                  <input
                    ref={myRef}
                    className="the-inline-block"
                    type="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                  />
                  <div className="the-inline-block- label-text label-text-right">links list with details filedate</div>
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
                  <div className="the-inline-block- label-text margin-bottom5-">links list with out details filedate</div>
                </label>
              </div>
            
              
            {/* </div> */}
      </div>
     
     
      {selectedOption === "option1" ? (
        <div className="list-body border-green-">
          {props.linksfiledate.length === 0 ? (
            <div className="list-item list-item--message">
              <span>0 links found</span>
            </div>
          ) : (
            props.linksfiledate.map((linkfiledate) => {
              return <LinkListItemFileDate key={linkfiledate.id} {...linkfiledate} />;
            })
          )}
        </div>
      ) : (
        <div className="list-body margin-top-11-">
          {props.linksfiledate.length === 0 ? (
            <div className="list-item list-item--message">
              <span>0 links found filedate</span>
            </div>
          ) : (
            props.linksfiledate.map((linkfiledate) => {
              return <LinkListItem2FileDate key={linkfiledate.id} {...linkfiledate} />;
            })
          )}
        </div>
      )}
    </div>
  );

  
};

const mapStateToProps = (state) => {
  return {
    linksfiledate: selectLinks(state.linksfiledate, state.filtersfiledate),
  };
};


export default connect(mapStateToProps)(LinkListFileDate);


