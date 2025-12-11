import React from 'react';
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";
import LinkListItem4 from "./LinkListItem4"


const MyInfiniteScroll = (props) => {

  //const data = props.links2
  const data = [
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a',
    'a'
  ]
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const itemsPerPage = 10;

  // Initialize the first batch of items
  React.useEffect(() => {
    const initialItems = data.slice(0, itemsPerPage);
    setItems(initialItems);
    if (data.length <= itemsPerPage) {
      //setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    const startIndex = items.length;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex >= data.length) {
      setHasMore(false);
      return;
    }

    const newItems = data.slice(startIndex, endIndex);
    setItems(prevItems => [...prevItems, ...newItems]);

    if (endIndex >= data.length) {
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>No more items to load.</b></p>}
      // You can customize the scrollable area by setting height and style
      height={1200}
      //style={{ overflow: 'hidden' }}
    >
      {items.map((link, index) => (
        <div>{link}</div>
        // <LinkListItem4 key={link.id} {...link} />
        // <div key={index} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
        //   {item} {/* Replace with actual item rendering */}
        // </div>
      ))}
    </InfiniteScroll>
  );
};

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

export default connect(mapStateToProps)(MyInfiniteScroll);