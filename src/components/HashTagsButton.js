import React, { useState } from "react";
import SeeHashTagsPage from "./SeeHashTagsPage";

const HashTagsButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleClose = () => {
    setIsDisplayed(false);
  };

  const handleDisplay = () => {
    try {
      setIsDisplayed(true);
    } catch (err) {
      console.error("Failed to display:", err);
    }
  };



  return (
    <div style={{ display: "inline" }}>
      <button
        className={`margin-left-11 height48 button-2w ib ${isMobile() === false ? "" : "width295 margin-top-1"}`}
        onClick={handleDisplay}
      >
        {isDisplayed ? "Displayed!" : "See HashTags"}
      </button>
      {isDisplayed === true && (
        <div>
          <SeeHashTagsPage
            changeSortBy={()=>props.changeSortBy("hashtag")}
            handleClose3={() => handleClose()}
          />
        </div>
      )}
    </div>
  );
};

export default HashTagsButton;
