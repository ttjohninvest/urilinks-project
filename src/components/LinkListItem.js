import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, note, amount, createdAt }) => {
  const myRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      console.log("Clicked!");
      //if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
      window.localStorage.setItem("scrollPosition", window.scrollY);
    };

    const element = myRef.current;

    if (element) {
      element.addEventListener("click", handleClick);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleClick);
      };
    }
  }, []); // Empty dependency array ensures this runs only on mount and unmount

 

  return (
    <div className="margin-bottom-1 rounded-tl-lg-1- rounded-tr-lg-1-">
      <div className="border-blue- card-background-color">
        <div className="list-item__flex border-green-">
          <div className="border-orange-">
            <h3 className="padding-left-11">
              <a
                ref={myRef}
                className="nounderline text-size-1"
                href={Url}
                target="_self"
                title={Url}
              >
                {description}
              </a>
            </h3>
          </div>
          <div className="border-orange-">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${id}`}>
                <div>
                  <span  className="padding-right-11" >edit or remove</span>
                </div>
              </Link>
            </h3>
          </div>
        </div>

        <div className="list-item__sub-title- padding-left-1 text-size-1">
          Entered: {moment(createdAt).format("MMMM Do, YYYY")}
        </div>
      </div>
      <h3 className="list-item__data  text-size-1 font-weight-1 card-background-color  padding-bottom-2 rounded-bl-lg-1- rounded-br-lg-1-">{note}</h3>
    </div>
  );
};

export default LinkListItem;


