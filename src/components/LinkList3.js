import React, { useRef } from "react";
import LinkList from "./LinkList"

export const LinkList3 = React.forwardRef((props, ref) => {
    const scrollTimeoutRef = useRef(null);

    // Expose the cancel method to the parent
  React.useImperativeHandle(ref, () => ({
    cancelScroll: () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
        console.log('Scroll timeout cancelled');
      }
    },

    startAutoScroll: () => {
      // Clear any existing timeout before starting a new one
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

       scrollTimeoutRef.current = setTimeout(() => {
        // Perform scroll action here
        console.log('Auto-scroll executed');
      }, 5000); // 5 seconds
    }
  }));

   return (
    <div>
      {/* <button onClick={handleStartScroll}>Start Auto Scroll</button>
      <button onClick={handleCancelScroll}>Cancel Auto Scroll</button> */}
      <LinkList av={props.av} ref={ref} />
     
    </div>
  );

})
