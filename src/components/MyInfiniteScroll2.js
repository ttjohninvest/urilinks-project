import React, {useState, useEffect, useRef} from 'react';
//import {useDispatch} from 'react-redux'
import * as firebase from "firebase";

import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import selectLinks from "../selectors/links";
import selectLinks2 from "../selectors/links2";
import selectLinksTotal from "../selectors/links-total";
import { startSetLinks3 } from "../actions/links3";
import MyInfiniteScroll3 from './MyInfiniteScroll3';
import printerImage from "../assets/images/printer_image.png";
import { getShowPublic } from './../actions/sp';


const E2 = (props) => {
  //const dispatch = useDispatch() //it is saying the useDispatch is not a function
  // const user= firebase.auth().currentUser
  // console.log("MyInfiniteScroll2, user="+JSON.stringify(user))
  // const [email,setEmail] = useState(!!user===true?user.email:"x@x.com")

  //let user = firebase.auth().currentUser
  //console.log("MyInfiniteScroll2, user="+JSON.stringify(user))
  const [email,setEmail] = useState(
    
    !!firebase.auth().currentUser===true?firebase.auth().currentUser.email:"x@x.com"
  
  )


   // Store the full local data in state
  const [localPeople, setLocalPeople] = useState([]);
  // Store the data to be displayed
  const [people, setPeople] = useState([]);
  // Define the number of items to add per scroll
  const itemsPerPage = 3;
  // Use two indexes: one for tracking the current display index, another for the next batch
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(itemsPerPage)

  const [links3, setLinks3] = useState([])
  const [displayName, setDisplayname] = useState("")
  //setPhotourl
  const [photourl, setPhotourl] = useState("")
 
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

    if (nextIndex >= localPeople.length) {
      return; // No more people to load
    }

    // Splice the next batch of items from the local array
    const newItems = localPeople.slice(currentIndex, nextIndex);
    setPeople(prevPeople => [...prevPeople, ...newItems]);

    // Update the indexes for the next batch
    
      // setCurrentIndex(nextIndex);
      // setNextIndex(nextIndex + itemsPerPage);
      setCurrentIndex(prev => prev + itemsPerPage);
    setNextIndex(prev => prev + itemsPerPage);
    


  //},1000)
  
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition", window.scrollY);
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here////
  };
  
  const YZ = async (event, gud) => {
    console.log("in YZ")
  
    // startSetLinks3(uid)
    // .then((links3) => { //links3 contains all the links for the uid, userId. It is not stored in redux though because I don't have access to dispatch, useDispatch is returning something that is not a function
    //  console.log("YZ, uid="+uid)
    //  console.log("YZ, links3="+JSON.stringify(links3))
    //  //setLinks3(links3)
    //  setLinks3([{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"}])
    //    })
    // .catch((error) => {
    //   console.log("error="+error);
    // })
    const links4 = await startSetLinks3(gud.uid)
    setDisplayname(gud.displayname)
    setPhotourl(gud.photourl)
    const filteredLinks = links4.filter((link) => (link.showpublic === true))
    setLinks3(filteredLinks)
    //setLinks3([{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"},{id:"1"}])
      
}

const printIt = () => {
    
    
    
    var printContent = document.getElementById("listid").innerHTML;
    var newWin = window.open("", "", "width=1000,height=600");
    
    //newWin.title = "urilinks list of links";
    newWin.document.write("<html><head><title>list-of-links-urilinks.com</title></head><body>");
    newWin.document.write(printContent);
    newWin.document.write("</body></html>");
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  
  };

{/* {links3.length > 0 ?<div>{links3.map((link)=>(link.id))}</div> */}
  return (
  
  <div>

{/* <div
                  onClick={printIt}
                  className="margin-top-1111b"
                  title="You may print this list to the printer."
                >
                  <img
                    src={printerImage}
                    width="32"
                    height="32"
                    className="cursor-pointer"
                    style={{ borderRadius: "50%" }}
                  />
                </div> */}

    <div id="listid"></div>
    {links3.length > 0 ?<div>
      
      <MyInfiniteScroll3 links3 = {links3} photourl={photourl} displayName={displayName}/>
      
      </div>
     
    :
    <div>
    
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
        hasMore={nextIndex < localPeople.length}
        loader={<h4>Loading...</h4>} //<h4>Loading...</h4>
        endMessage={<p style={{ textAlign: 'center' }}><b>end of list</b></p>}
        scrollableTarget="scrollableDiv"
      >
         {/*change data to data3 where data3 is the filtered list */}
         {people.map((gud, index) => (
          <div>
    {
    ////link.showpublic === 
    true && 
    !!gud.displayname ===true && 
  
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
                    {props.signup.signup===true ? <div><div className="margin-left-118"><a className="nounderline" href={`https://mail.google.com/mail/?view=cm&from=${email}&to=${gud.email}&su=Hello&body=Hi%20there!`} target="_blank">Send gmail {`FROM: ${email} TO: ${email==="x@x.com"?"x@x.com":gud.email}`}</a></div>
                      <div>
                      {/* {`display links made public ${gud.uid}`} */}
                      {/* <button onClick={(event) => YZ(event, gud)} className="ib button-1 margin-left-118">{`display ${!!gud.displayname?gud.displayname+"'s":""} public links.`}</button>
                      */}
                       <button onClick={(event) => YZ(event, gud)} className="ib button-2 margin-left-118 borderradius55">{`display ${!!gud.displayname?gud.displayname+"'s":""} public links.`}</button>
                      </div>
                      
                    </div>
                    :
                    <div className="margin-left-118"><a className="nounderline" href={`https://mail.google.com/mail/u/0`} target="_blank">Send gmail</a>
                    </div>

                    
                    
                    }
                     
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
    </div>
    
    }

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
    people: state.people,
    links2:state.links3
    
  };
};

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

export default connect(mapStateToProps)(E2);