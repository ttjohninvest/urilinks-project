import React, { useRef, useEffect, useState } from "react";
import LinkList from "./LinkList";
import ErrorBoundary from "./ErrorBoundry";
// import { useSelector } from "react-redux";

export const LinkList3 = React.forwardRef((props, ref) => {
  const scrollTimeoutRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    cancelScroll: () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
        console.log("Scroll timeout cancelled");
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
        if (!!v === true) v.click();
        console.log("Auto-scroll executed");
      }, 8000); // 5 seconds
    },
  }));

  //   console.log("LinkList3 linkStatuses =", linkStatuses);
  // console.log("LinkList3 status keys =", Object.keys(linkStatuses));
  //console.log("LinkList3, props.theSortBy="+props.theSortBy)

  return (
    <div>
      <ErrorBoundary>
        <LinkList
          dosearch={props.dosearch}
          searchText={props.searchText}
          theSortBy={props.theSortBy}
          idexists={props.idexists}
          videoId={props.videoId}
          url2={props.url2}
          playInPlaceVideo={props.playInPlaceVideo}
          av={props.av}
          handleStartScroll={props.handleStartScroll}
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
          stopScrolling3={props.stopScrolling3}
          scrollInterval2={props.scrollInterval2}
          onSortChange={props.onSortChange}
          allLinksVisibility={props.allLinksVisibility}
          descriptionRefresh={props.descriptionRefresh}
        />
      </ErrorBoundary>
    </div>
  );
});
