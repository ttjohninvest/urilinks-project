import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";
import LinkListItem4 from "./LinkListItem4"
import { startRemoveLink, removeLink } from "../actions/links";
import { Link } from "react-router-dom";
import moment from "moment";
import FBShareButton from "./FBShareButton";
//import FBShareButton2 from "./FBShareButton2";
import MessengerButton from "./MessengerButton";
import LinkedInShareButton from "./LinkedInShareButton";
import XShareButton from "./XShareButton";
import LoadingPage from "./LoadingPage"


// const getfilteredArray = (arr) => {
// const arr2 = arr.filter(link => link.showpublic === true)
// console.log("arr2="+JSON.stringify(arr2))
// return arr2
// }

const E2 = (props) => {

   // Store the full local data in state
  const [localData, setLocalData] = useState([]);
  // Store the data to be displayed
  const [data, setData] = useState([]);
  // Define the number of items to add per scroll
  const itemsPerPage = 3;
  // Use two indexes: one for tracking the current display index, another for the next batch
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(itemsPerPage)
 
  // const [data, setData] = useState([
  //   'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
  //   'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'
  // ]);

  const myRef = useRef(null);

  useEffect(()=>{
const fetchData = async () => {
      
      setLocalData(props.links2.filter(link => link.showpublic === true));
      // Initialize display data with the first batch
      setData(props.links2.slice(0, itemsPerPage));
    };
    fetchData();
  },[])

 
  const fetchMoreData = () => {
    // // Simulate API delay
    //setTimeout(() => {

    if (nextIndex >= localData.length) {
      return; // No more data to load
    }

    // Splice the next batch of items from the local array
    const newItems = localData.slice(currentIndex, nextIndex);
    setData(prevData => [...prevData, ...newItems]);

    // Update the indexes for the next batch
    setCurrentIndex(nextIndex);
    setNextIndex(nextIndex + itemsPerPage);

  //},1000)
  
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition", window.scrollY);
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here////
  };

  return (
    <div id="scrollableDiv" style={{ height: '500px', overflow: 'auto', border: '1px solid #ccc' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        height={500}
        hasMore={nextIndex < localData.length}
        loader={<h4>Loading...</h4>} //<h4>Loading...</h4>
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
         {/*change data to data3 where data3 is the filtered list */}
         {data.map((link, index) => (
          <div>
    {
    //link.showpublic === 
    true && 
  
  <div key={index}>
    <div className="margin-bottom-1">
      <div className="card-background-color">
        <div className="list-item__flex">
          <div className="">
            <div className="flexrow2t border-green-">
             
              <div className={`${false?"":"margin-top-1"}`}>
                <div className="flexcol3">
                  <div className={`flexrow4 border-green-`}>
                    d
                    {/* <img src={props.photourl.photourl} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    }
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
    photourl:state.photourl,
    links: selectLinks(state.links, state.filters),
    links2: selectLinks(state.links2, state.filters),
    
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(E2);