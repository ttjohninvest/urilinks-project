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

const E = (props) => {
 
  // const [data, setData] = useState([
  //   'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
  //   'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'
  // ]);

  const myRef = useRef(null);

  let j = 0
  const [si1, setSi1] = useState(0)
  const [si2, setSi2] = useState(10)
  const arr2 = props.links2.filter(link => link.showpublic === true)
  console.log("arr2="+JSON.stringify(arr2))

  const [data2, setData2] = useState(arr2) //getfilteredArray(props.links2) //useState(props.links2); //data2 should be initialized to the filtered array
  //console.log("data2="+JSON.stringify(data2))
  const [data, setData] = useState(arr2)

  const [hasMore, setHasMore] = useState(true);

  //  if (data.length <= 10) {
  //       setHasMore(false);
  //     }
  // Function to load more items
  const fetchMoreData = () => {
    // Simulate API delay
    setTimeout(() => {
   

     if (data.length >= data2.length) {
        setHasMore(false);
      } else {
        setSi1(si1+10)
        setSi2(si2+10)
        setData(prev => [...prev, ...data2.splice(si1,si2)]);
      }
      
      // setSi1(si1+10)
      //   setSi2(si2+10)
      //    setData(prev => [...prev, ...data2.splice(si1,si2)]);
     

      // Stop loading more if we have enough items
      // if (data.length >= data2.length) {
      //   setHasMore(false);
      // }
    }, 1000);
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition", window.scrollY);
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here////
  };

  return (
    <div id="scrollableDiv" style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingPage />} //<h4>Loading...</h4>
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
         {/*change data to data3 where data3 is the filtered list */}
         {data.map((link, index) => (
          <div>
    {
    //link.showpublic === 
    true && 
  
  <div>
    <div className="margin-bottom-1">
      <div className="card-background-color">
        <div className="list-item__flex">
          <div className="">
            <div className="flexrow2t border-green-">
             
              <div className={`${!!link.yturl?"":"margin-top-1"}`}>
                <div className="flexcol3">
                  <div className={`flexrow4 border-green-`}>
                    <div className="margin-top-1q">
                        <img
                            className=""
                            width="20"
                            height="20"
                            src={link.faviconURL}
                        />
                    </div>
                    <div>
                      {
                        //isityt(props.Url)
                        !!link.yturl && (
                          //true
                          <a
                            ref={myRef}
                            className="ib nounderline text-size-5 color-purple margin-left-11 margin-top-1"
                            href={link.Url}
                            //target="_self"
                            target="_blank"
                            title={"click to open the webpage: " + link.Url}
                            onClick={storeScrollPosition}
                          >
                            <img
                              className="borderRadius4 rem8- rem45-"
                              
                              src={link.yturl}
                            />
                          </a>
                        )
                      }
                      </div>
                      <div>
                      <a
                        ref={myRef}
                        className={`ib nounderline text-size-5 text-color-db color-purple breakWord margin-left-11 ${!!link.yturl?"":"padding-top-n-hh"}`}
                        href={link.Url}
                        //target="_self"
                        target="_blank"
                        title={"click to open the webpage: " + link.Url}
                        onClick={storeScrollPosition}
                      >
                        Show Page: {decodeURIComponent(link.description)}
                      </a>
                    </div>
                    <div className="margin-bottom-1141">
                      <div className="flexrow4">
                        {props.signup.signup === true ? (
                          <div>
                           {/* <Link
                              className="nounderline text-size-5 inline-block-margin-left-1 pointereventsauto"
                              to={`/edit/${props.id}`}
                            >
                              <span className="padding-right-11 color-white-1 button-2">
                                edit or remove
                              </span>
                            </Link> */}
                          </div>
                        ) : (
                          <div>
                           {/* <Link
                              className="nounderline text-size-5 inline-block-margin-left-1 pointereventsnone"
                              to={`/edit/${props.id}`}
                            >
                              <span className="padding-right-11 color-white-1 button-2">
                                edit or remove
                              </span>
                            </Link> */}
                          </div>
                        )}
                        {props.signup.signup === true ? (
                          <div>
                           {/* <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsauto">
                              <input
                                type="checkbox"
                                id={"delete%" + props.id}
                                name={"delete%" + props.id}
                                value={props.id}
                                onChange={handleCheckboxDelete}
                                title="remove bookmark"
                                className="cb1 cursor-pointer"
                              />
                              <label for={"delete%" + props.id} />
                            </span> */}
                          </div>
                        ) : (
                          <div>
                             {/* <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsnone">
                              <input
                                type="checkbox"
                                id={"delete%" + props.id}
                                name={"delete%" + props.id}
                                value={props.id}
                                onChange={handleCheckboxDelete}
                                title="remove bookmark"
                                className="cb1 cursor-pointer"
                              />
                              <label for={"delete%" + props.id} />
                            </span> */}
                            
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                   {/* <div>
                    <span
                      className="ib margin-left-114"
                      title="click the following link to see an index of clickable urls on the page."
                    >
                      PAGE URLS SOURCE:
                      <br />
                      <span
                        onClick={() => getUrlsList(props.Url, props.id)}
                        className="ib cursor-pointer margin-left-114 color1-  color-purple"
                        title="click to see the clickable page urls from the above page"
                      >
                        Show List: {decodeURIComponent(props.Url)}
                        
                      </span>
                    </span>
                  </div>  */}
                </div>

                <ol id={"uldata" + link.id} start="0"></ol>
              </div>
            </div>
          </div>
          {/* <div className="">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${props.id}`}>
               
                  <span className="padding-right-11 inline-block-margin-left-1 padding-bottom-11 color-white-1 button-2">
                    edit or remove
                  </span>
                  
               
              </Link>
              <span className="padding-right-11 inline-block-margin-left-1 padding-bottom-11 color-purple">
                   <input type="checkbox" id={"delete%"+props.id} name={"delete%"+props.id} value={props.id} onChange={handleCheckboxDelete} title="remove bookmark" className="cb1 cursor-pointer" />
                   <label for={"delete%"+props.id} />
                  </span>
            </h3>
          </div> */}
        </div>

        <div className="italicText list-item__sub-title- padding-left-1 text-size-10 color-purple margin-left-11p">
          Link saved on: {moment(link.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </div>
      </div>
      <div className="text-size-1 font-weight-1 card-background-color padding-bottom-2 padding-left-2  text-color-db text-size-2 margin-left-11p">
        {link.note}
      </div>
      <div className="flexrow2w">
        <FBShareButton url={link.Url} />

        <MessengerButton />
        <LinkedInShareButton url={link.Url} />
        {/* <AddToAny /> */}

        <XShareButton url={link.Url} />
      </div>
    </div>

   
      </div>
    
    }
    </div>
        ))}
        {/* {data.map((item, index) => (
          <div key={index} style={{ padding: '10px', border: '1px solid #eee', margin: '5px 0' }}>
            {JSON.stringify(item)}
          </div>
        ))} */}
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