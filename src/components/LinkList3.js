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

       if (props.scrollInterval2.current) return; //if the user clicked scrollUp or ScrollDn thei will pevent the auto scroll from starting because it it already scrolling
       scrollTimeoutRef.current = setTimeout(() => {
        // Perform scroll action here
        if(!!v===true) v.click()
        console.log('Auto-scroll executed');
      }, 8000); // 5 seconds
    }
  }));

   return (
    <div>
      
      <LinkList av={props.av} handleStartScroll={props.handleStartScroll} 
        scrollupref={props.scrollupref}
  scrolldownref={props.scrolldownref}
  //scrollInterval2={scrollInterval2}
  buttonRef2={props.buttonRef2}
  startScrollingUp2={props.startScrollingUp2}
  startScrollingDown2={props.startScrollingDown2}
  stopScrolling2={props.stopScrolling2}
      />
     
    </div>
  );

})
