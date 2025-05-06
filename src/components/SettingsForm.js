import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
//import selectLinks from "../selectors/selectSettings";
////
export const SettingsForm = (props) => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const myRef1 = useRef();
  const myRef2 = useRef();

  const handleOptionChange1 = (event) => {
    console.log(
      "handleOptionChange1, event.target.value=" + event.target.value
    );
    if (selectedOption1 === "option1") {
      window.localStorage.setItem("whichOptionS1", "");
      setSelectedOption1("");
    } else {
      window.localStorage.setItem("whichOptionS1", "option1");
      setSelectedOption1(event.target.value);
    }
  };

  const handleOptionChange2 = (event) => {
    console.log(
      "handleOptionChange2, event.target.value=" + event.target.value
    );
    if (selectedOption2 === "option2") {
      window.localStorage.setItem("whichOptionS2", "");
      setSelectedOption2("");
    } else {
      window.localStorage.setItem("whichOptionS2", "option2");
      setSelectedOption2(event.target.value);
    }
  };


  useEffect(() => {
    const element = myRef1.current;

    if (element) {
      element.addEventListener("click", handleOptionChange1);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange1);
      };
    }
  }, []);

  useEffect(() => {
    const element = myRef2.current;

    if (element) {
      element.addEventListener("click", handleOptionChange2);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleOptionChange2);
      };
    }
  }, []);

  const onSubmit = (e) => {
    console.log("onSubmit")
    // console.log("onSubmit");
    // e.preventDefault();

    // if (!this.state.description || !this.state.Url || !this.state.amount) {
    //   this.setState(() => ({
    //     error: "Please provide description and amount.",
    //   }));
    // } else {
    //   this.setState(() => ({ error: "" }));
    //   this.props.onSubmit({
    //     description: this.state.description,
    //     Url: this.state.Url,
    //     amount: parseFloat(this.state.amount, 10) * 100,
    //     createdAt: this.state.createdAt.valueOf(),
    //     note: this.state.note,
    //   });
    // }
  };

  return (
    <div className="content-container website-background-color">
      <div className="list-header list-header__flex- border-green- margin-bottom-1">
        <div className="show-for-desktop">Settings Page</div>
        <form className="form" onSubmit={onSubmit}>
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
              <span className="the-inline-block label-text label-text-right">
                checked means to let the public see your links
              </span>
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
              <span className="the-inline-block label-text">
                checked means to see public links
              </span>
            </label>
          </div>
        </div>
       
        
        <div>
          <button className="button">Save Settings</button>
        </div>
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
     //settings: selectSettings(state.settings),
  };
};

export default connect(mapStateToProps)(SettingsForm);