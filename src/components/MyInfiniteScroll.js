import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";
import LinkListItem4 from "./LinkListItem4"


const E = (props) => {
 
  // const [data, setData] = useState([
  //   'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
  //   'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'
  // ]);

  const [si1, setSi1] = useState(0)
  const [si2, setSi2] = useState(5)
  const [data, setData] = useState([...props.links2.splice(si1,si2)]);

  const [hasMore, setHasMore] = useState(true);

  // Function to load more items
  const fetchMoreData = () => {
    // Simulate API delay
    setTimeout(() => {
    //  const newItems = Array.from({ length: 5 }, (_, i) => `Item ${data.length + i + 1}`);
    //   setData(prev => [...prev, ...newItems]);
      
  
      setData(prev => [...prev, ...props.links2.splice(si1+5,si2+5)]);
      setSi1(si1+5)
      setSi2(si2+5)
     

      // Stop loading more if we have enough items
      if (data.length >= 100) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div id="scrollableDiv" style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
        {data.map((item, index) => (
          <div key={index} style={{ padding: '10px', border: '1px solid #eee', margin: '5px 0' }}>
            {item.Url}
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