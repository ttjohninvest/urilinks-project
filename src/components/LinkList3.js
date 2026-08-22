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

    startAutoScroll: (v) => {
      // Clear any existing timeout before starting a new one
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

       scrollTimeoutRef.current = setTimeout(() => {
        // Perform scroll action here
        v.click()
        console.log('Auto-scroll executed');
      }, 5000); // 5 seconds
    }
  }));

   return (
    <div>
      
      <LinkList av={props.av} handleStartScroll={props.handleStartScroll} />
     
    </div>
  );

})
