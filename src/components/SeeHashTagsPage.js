import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export const SeeHashTagsPage = (props) => {
  //const [count, setCount] = useState(0);
  const [uniqueData, setUniqueData] = useState([]);

  useEffect(() => {
    console.log(
      "SeeHashTagsPage.js, hashtags=" + JSON.stringify(props.hashtags),
    );
  });

  useEffect(() => {
    const uniqueData2 = props.hashtags.filter((value, index, array) => {
      // Returns the first index where the name matches
      const firstIndex = array.findIndex(
        (item) => item.matchesstring === value.matchesstring,
      );
      // Keep the item only if it is the first occurrence
      return firstIndex === index;
    });

    uniqueData2.sort((a, b) => {
      const valA = a.matchesstring.toLowerCase();
      const valB = b.matchesstring.toLowerCase();
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    uniqueData2.forEach((e) => {
      console.log("DisplayHashtags.js, hashtag=" + e.matchesstring);
    });

    setUniqueData(uniqueData2);
    //console.log("DisplayHashtags.js, uniqueData="+JSON.stringify(uniqueData))
  }, []);

  return (
    <div>
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              <span className="color-purple color-black-2">Hashtags</span>
              <button
                className="ib margin-left-11 button-2 text-size-1"
                onClick={() => props.handleClose3()}
              >
                Close
              </button>
            </h1>
          </div>
        </div>
        {uniqueData.length} results
        <div className="content-containerht widthx1 heightx1 overflowyauto borderLightOrange">
          <ul className="liststylenone">
            {uniqueData.map((e, index) => (
              !!e.matchesstring && <li key={index}>{e.matchesstring}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hashtags: state.hashtags,
});

export default withRouter(connect(mapStateToProps, undefined)(SeeHashTagsPage));
