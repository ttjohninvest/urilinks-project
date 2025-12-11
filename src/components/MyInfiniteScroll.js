import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";
import LinkListItem4 from "./LinkListItem4"


const E = () => {
  // Define a locally stored array of strings
  const [data, setData] = useState([
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'
  ]);

  // State to track if there are more items to load
  const [hasMore, setHasMore] = useState(true);

  // Function to load more items
  const fetchMoreData = () => {
    // Simulate API delay
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => `Item ${data.length + i + 1}`);
      setData(prev => [...prev, ...newItems]);

      // Stop loading more if we have enough items
      if (data.length >= 25) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div id="scrollableDiv" style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
        {data.map((item, index) => (
          <div key={index} style={{ padding: '10px', border: '1px solid #eee', margin: '5px 0' }}>
            {item}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

//export default E;   

//export default MyInfiniteScroll;   

const mapStateToProps = (state) => {
  const visibleLinks = selectLinks(state.links, state.filters);
  const visibleLinks2 = selectLinks2(state.links2, state.filters);

  return {
    linkCount: visibleLinks.length,
    linkCount2: visibleLinks2.length,
    linksTotal: selectLinksTotal(visibleLinks),
    linksTotal2: selectLinksTotal(visibleLinks2),
    signup:state.signup,
    links: selectLinks(state.links, state.filters),
    links2: selectLinks(state.links2, state.filters),
    
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(E);