import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, note, amount, createdAt, faviconURL }) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL="+faviconURL)
  const myRef = useRef(null);

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollY",window.scrollY)
  }

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
          <div className="flexrow2 margin-5"><div><img className="borderradius50 margin-top-1111" width="16" height="16" src={faviconURL} /></div>
            <div className="padding-left-11 padding-bottom-11">
              <a
                ref={myRef}
                className="nounderline text-size-5 text-color-db"
                href={Url}
                target="_self"
                title={Url}
                onClick={storeScrollPosition}
              >
                {description}
              </a>
            </div>
            </div>
          </div>
          <div className="border-orange-">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${id}`}>
                <div>
                  <span  className="padding-right-11 inline-block-margin-left-1 padding-bottom-11" >edit or remove</span>
                </div>
              </Link>
            </h3>
          </div>
        </div>

        <div className="list-item__sub-title- padding-left-1 text-size-2">
          Entered: {moment(createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </div>
      </div>
      <div className="list-item__data-  text-size-1 font-weight-1 card-background-color padding-bottom-2 padding-left-2  text-color-db">{note}</div>
    </div>
  );
};

export default LinkListItem;


