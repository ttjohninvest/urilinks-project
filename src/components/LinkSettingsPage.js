
import React,{useState,useEffect,useRef} from "react";
import { connect } from "react-redux";

////
export const LinkSettingsPage = (props) => {
  const [selectedOption1, setSelectedOption1] = useState("option1")
  const [selectedOption2, setSelectedOption2] = useState("option2")
  
  const myRef1 = useRef()
  const myRef2 = useRef()

  const handleOptionChange1 = (event) => {
    console.log("handleOptionChange, event.target.value="+event.target.value)
      setSelectedOption1(event.target.value)

      
       window.localStorage.setItem("whichOptionS1","option1")
      
    
  };

  const handleOptionChange2 = (event) => {
    console.log("handleOptionChange, event.target.value="+event.target.value)
      setSelectedOption2(event.target.value)
      
      window.localStorage.setItem("whichOptionS2","option2")
    
    
  };

  useEffect(()=>{
    // const option = window.localStorage.getItem("whichOptionS1")
    // if(option) setSelectedOption(option)
  },[])

  useEffect(()=>{
  
    const element = myRef1.current;

    if (element) {
      element.addEventListener("click", handleOptionChange1);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange1);
      };
    }
  },[])

  useEffect(()=>{
  
    const element = myRef2.current;

    if (element) {
      element.addEventListener("click", handleOptionChange2);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange2);
      };
    }
  },[])


  return (
    <div className="content-container website-background-color"
    
    >
      <div className="list-header list-header__flex- border-green- margin-bottom-1">
        <div className="show-for-desktop">Uri/Url Link(s)</div>
        <div className="list-header__flex">
              <div>
                <label className="inline-block__flex">
                  <input
                    ref={myRef1}
                    className="the-inline-block"
                    type="checkbox"
                    value="option1"
                    checked={selectedOption1 === "option1"}
                    onChange={handleOptionChange1}
                  />
                  <span className="the-inline-block label-text label-text-right">links list with details</span>
                </label>
              </div>
              <div className="margin-left-1">
                <label className="inline-block__flex">
                  <input
                    ref={myRef2}
                    className="the-inline-block"
                    type="checkbox"
                    value="option2"
                    checked={selectedOption2 === "option2"}
                    onChange={handleOptionChange2}
                  />
                  <span className="the-inline-block label-text">links list with out details</span>
                </label>
              </div>
            Settings
              
            </div>
      </div>
      
      
      
    </div>
  );

  
};

const mapStateToProps = (state) => {
    return {
      
    };
  };


export default connect(mapStateToProps)(LinkSettingsPage);



