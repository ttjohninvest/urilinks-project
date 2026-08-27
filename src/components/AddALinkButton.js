import React, { useState } from "react";
import AddLinkPage from "./AddlinkPage";

const AddALinkButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  //const textToCopy = "text being copied to the clipboard";

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleClose = () => {
    setIsDisplayed(false);
     !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
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
        className={`${!!props.x===true && props.x === false?'pointereventsnone':''} margin-left-11 height48 button-2w ib ${isMobile() === false ? "" : "width295 margin-top-1"} button-2 bg-shade-1`}
        onClick={handleDisplay}
      >
        {isDisplayed ? "Displayed!" : "Add A Link"}
      </button>
      {isDisplayed === true && (
        <div>
          <AddLinkPage x={props.x} handleClose2={handleClose} />
        </div>
      )}
    </div>
  );
};

export default AddALinkButton;
