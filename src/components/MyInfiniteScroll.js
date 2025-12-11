import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

const MyInfiniteScroll = ({links}) => {

  const data = links
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const itemsPerPage = 10;

  // Initialize the first batch of items
  React.useEffect(() => {
    const initialItems = data.slice(0, itemsPerPage);
    setItems(initialItems);
    if (data.length <= itemsPerPage) {
      setHasMore(false);
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
      height={600}
      style={{ overflow: 'hidden' }}
    >
      {items.map((item, index) => (
        <div>a</div>
        // <div key={index} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
        //   {item} {/* Replace with actual item rendering */}
        // </div>
      ))}
    </InfiniteScroll>
  );
};

export default MyInfiniteScroll;   