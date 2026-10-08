import React, { useRef, useEffect, useState } from "react";
import LinkList from "./LinkList"
// import { useSelector } from "react-redux";


export const LinkList3 = React.forwardRef((props, ref) => {
    const scrollTimeoutRef = useRef(null);
//     const [linkStatuses, setLinkStatuses] = useState({});


//     const links = useSelector((state) => state.links); 

// console.log("Redux links =", links);
// console.log("Redux links length =", links ? links.length : "undefined");




//      const linksKey = links
//         .map((link) => link.id + ":" + link.Url)
//         .join("|");

// useEffect(() => {

//            // Do nothing until Redux has links
//   if (!links || links.length === 0) {
//     return;
//   }

//   const checkDisplayedLinks = async () => {

//     for (const link of links || []) {
//       const status = await checkLink(link.Url);

//       console.log(
//         "checked:",
//         link.id,
//         link.Url,
//         status
//       );

//       setLinkStatuses((prev) => ({
//         ...prev,
//         [link.id]: status
//       }));
//     }
//   };

//   checkDisplayedLinks();

// }, [linksKey]);
    

    
    
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

       if (props.scrollInterval2.current) return; //stop button not working soln: if the user clicked scrollUp or ScrollDn this will prevent the auto scroll from starting and causing the shuttering because it it already scrolling
       scrollTimeoutRef.current = setTimeout(() => {
        // Perform scroll action here
        if(!!v===true) v.click()
        console.log('Auto-scroll executed');
      }, 8000); // 5 seconds
    }
  }));








//   console.log("LinkList3 linkStatuses =", linkStatuses);
// console.log("LinkList3 status keys =", Object.keys(linkStatuses));
   return (
    <div>
      
      <LinkList 
      //{"status":null,"result":"unknown"}
      //props.linkStatuses[link.id].status
      //linkStatuses={linkStatuses}
      theSortBy = {props.theSortBy}
      videoId={props.videoId}
      url2={props.url2}
      playInPlaceVideo={props.playInPlaceVideo}
      av={props.av} handleStartScroll={props.handleStartScroll} 
        scrollupref={props.scrollupref}
  scrolldownref={props.scrolldownref}
  scrolltotopref={props.scrolltotopref}
  scrolltobottomref={props.scrolltobottomref}
  //scrollInterval2={scrollInterval2}
  buttonRef2={props.buttonRef2}
  startScrollingUp2={props.startScrollingUp2}
  startScrollingDown2={props.startScrollingDown2}
  startScrollToTop2={props.startScrollToTop2}
  startScrollToBottom2={props.startScrollToBottom2}
  stopScrolling2={props.stopScrolling2}
  scrollInterval2={props.scrollInterval2}
 
      />
     
    </div>
  );

})
