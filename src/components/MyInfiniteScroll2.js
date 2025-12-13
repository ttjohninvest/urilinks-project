import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";

const E2 = (props) => {

   // Store the full local data in state
  const [localPeople, setLocalPeople] = useState([]);
  // Store the data to be displayed
  const [people, setPeople] = useState([]);
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
const fetchPeople = async () => {
      
      //setLocalPeople(props.people.filter(person => person.showpublic === true));
      setLocalPeople(props.people);
      console.log("MyInfiniteScroll 2, props.people.length="+props.people.length)
      
      setPeople(props.people.slice(0, itemsPerPage));

      setCurrentIndex(nextIndex);

      setNextIndex(nextIndex + itemsPerPage);
    };
    fetchPeople();
  },[])

 
  const fetchMorePeople = () => {
    // // Simulate API delay
    //setTimeout(() => {

    if (nextIndex > (localPeople.length)) {
      return; // No more people to load
    }

    // Splice the next batch of items from the local array
    const newItems = localPeople.slice(currentIndex, nextIndex);
    setPeople(prevPeople => [...prevPeople, ...newItems]);

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
    <div id="scrollableDiv" style={{ 
      //height: `${people.length===1?"100px":people.length===2?"200px":people.length===3?"300px":people.length>3&&"500px"}`,
      height: "300px",
      overflow: 'auto', border: '1px solid #ccc' }}>
      <InfiniteScroll
        dataLength={people.length}
        next={fetchMorePeople}
        height={
          //`${people.length===1?100:people.length===2?200:people.length===3?300:people.length>3?500:500}`
          300
        }
        hasMore={nextIndex < (localPeople.length+itemsPerPage)}
        loader={<h4>Loading...</h4>} //<h4>Loading...</h4>
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
         {/*change data to data3 where data3 is the filtered list */}
         {people.map((gud, index) => (
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
                    
                    <div><img src={gud.photourl} className="borderradius50"/></div>
                    <div className="margin-left-11"><span>{gud.displayname}</span></div>
                    <div className="margin-left-11"><span>{gud.email}</span></div>
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
    links: selectLinks(state.links, state.filters),
    links2: selectLinks(state.links2, state.filters),
    people: state.people
    
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(E2);