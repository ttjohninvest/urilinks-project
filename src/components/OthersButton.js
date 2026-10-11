import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SeeFollowingPage from "./SeeFollowingPage";

import {
  incrementOthersIsOpenClickCount,
  decrementOthersIsOpenClickCount,
} from "../actions/theothersisopen";

//props.users, props.following
const annotatearray = (array1, array2) => {
    console.log("SeeFollowingPage.js, annotatearray(), array1="+JSON.stringify(array1)) //props.users [{gud:{}}]
    console.log("SeeFollowingPage.js, annotatearray(), array2="+JSON.stringify(array2)) //props.following [{uid:}]
    const resultArray = array1.map((item) => ({
      ...item,
      isMatch:
        array2.some((item2) => item2.uid === item.gud.uid) === true
          ? "is following "
          : "is not following ",
      gotopageid:
        array2.some((item2) => item2.uid === item.gud.uid) === true
          ? item.gud.uid
          : "this should be the goto page user id",
      
    }));
     console.log("SeeFollowingPage.js, annotatearray(), resultArray="+JSON.stringify(resultArray))
    return resultArray;
  };


  const getIsMatchNumber = (ra) => {
    let i = 0
     ra.forEach((e)=>{
       if(e.isMatch==="is following ")
        i++
     })
     console.log("getIsMatchNumber, isMatch, i="+i)
     return i
  }

  //users, following, newfollowinglinks with newlinks:yes or newlinks:no
  const annotatearray2 = (array1, array2, array3) => {
    console.log("SeeFollowingPage.js, annotatearray2(), array1="+JSON.stringify(array1)) //props.users [{gud:{}}]
    console.log("SeeFollowingPage.js, annotatearray2(), array2="+JSON.stringify(array2)) //props.following [{uid:}]
    console.log("SeeFollowingPage.js, annotatearray2(), array3="+JSON.stringify(array3)) //props.newfollowingusers [{uid:, newlinks:"yes"}] 
    const resultArray = array1.map((item) => ({
      ...item,
      isMatch:
        array2.some((item2) => item2.uid === item.gud.uid) === true
          ? "is following "
          : "is not following ",
      newlinks:
        array3.some(
          (item3) =>
            item3.uid === item.gud.uid &&
            !!item3.newlinks === true &&
            item3.newlinks === "yes",
        ) === true
          ? "yes"
          : "no",
    }));

    console.log("SeeFollowingPage.js, annotatearray2(), resultArray="+JSON.stringify(resultArray))
    return resultArray;
  };

   const getNewLinksNumber = (ra) => {
    let i = 0
     ra.forEach((e)=>{
       if(e.newLinks==="yes")
        i++
     })
     console.log("getNewLinksNumber, newLinks, i="+i)
     return i
  }




const OthersButton = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [lengthOf, setLengthOf] = useState(0)
  const [resultArray, setResultArray] = useState([])
   const [lengthOf2, setLengthOf2] = useState(0)
  const [resultArray2, setResultArray2] = useState([])
  //const textToCopy = "text being copied to the clipboard";

  //alert(props.name2)
  //console.log("OthersButton, props.name2="+props.name2)

  useEffect(()=>{
    if(props.whichone === 2) {
      console.log("OthersButton, for Following, props.whichone="+props.whichone)
      const ra = annotatearray(props.users,props.following)
      console.log("OthersButton, annotatearray, ra, resultArray="+JSON.stringify(ra))
      setResultArray(ra)
      //setLengthOf(ra.length-1) //1 substracts the loggedin user from the total
      setLengthOf(getIsMatchNumber(ra))
    } else {
      // console.log("OthersButton, for Following, props.whichone="+props.whichone)
      // setResultArray([])
      // setLengthOf(0)
        console.log("OthersButton, for Following, props.whichone="+props.whichone)
      const ra = annotatearray2(props.users,props.following,props.newfollowinglinks)
      console.log("OthersButton, annotatearray, ra, resultArray="+JSON.stringify(ra))
      setResultArray2(ra)
      //setLengthOf(ra.length-1) //1 substracts the loggedin user from the total
      setLengthOf2(getNewLinksNumber(ra))
    }
   
  
},[])

const makeannotatearray = () => {
  
}


  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const storeScrollPosition4 = (othersisopen, event) => {
      
  
      let x1 = 0;
      if (othersisopen === undefined || othersisopen === null || othersisopen === "NaN") x1 = 0;
      else x1 = othersisopen;
      //const x = event.target.getAttribute("data-value"); //x is link id
  
      if (x1 === 0) {
        //alert("going to increment")
        //props.incrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 0 });
        props.incrementOthersIsOpenClickCount({ othersisopen: 0 });
      } else {
        //alert("going to decrement")
        //props.decrementHashtagsIsOpenClickCount({ id: x, hashtagsisopen: 1 });
        props.decrementOthersIsOpenClickCount({ othersisopen: 1 });
      }
  
      window.localStorage.setItem("scrollPosition", window.scrollY);
    };

  const handleClose = () => {
    storeScrollPosition4(props.theothersisopen.othersisopen)
    setIsDisplayed(false);
  };

  const lengthof=(v)=>{
    setLengthOf(v)

  }

  const handleDisplay = () => {
    try {
      storeScrollPosition4(props.theothersisopen.othersisopen, event)
      setIsDisplayed(true);
    } catch (err) {
      console.error("Failed to display:", err);
    }
  };

  

  return (
    <div style={{ display: "inline" }}>
      <button
        title={`${props.buttonText==="New Links Ready"?"("+lengthOf2+") These are ones that you are following that have new links ready for you to see.":"See the ones you are following. You are following "+lengthOf+" people."}`}
        className={`ib margin-left-11 height48 button-2w- button-2 ${isMobile() === false ? "" : "width295 margin-top-1"}`}
        onClick={handleDisplay}
      >
        {/* <span className="ib"><span id="numberofnotificationsready" className="ib margin-left-11-">{props.buttonText==="New Links Ready"?<span>({lengthOf2})&nbsp;New Links Ready</span>:""}</span>{isDisplayed ? "Displayed" :<span><span>({lengthOf})&nbsp;</span><span>{props.buttonText}</span></span> }</span> */}
     <span className="ib">
 <span id="numberofnotificationsready" className="ib margin-left-11-">
     {props.buttonText==="New Links Ready"?<span>({lengthOf2})&nbsp;New Links Ready</span>:
     <span>
       <span>({lengthOf})&nbsp;</span>
     <span>
     {props.buttonText}
     </span>
     </span>}
</span>
</span>
      </button>
      {isDisplayed === true && (
        <div>
          <SeeFollowingPage
            lengthOf = {lengthOf}
            resultArray = {resultArray}
            lengthOf2 = {lengthOf2}
            resultArray2 = {resultArray2}
            whichone = {props.whichone}
            email={props.email}
            uid={props.uid}
            name2={props.name2}
            elementRef2 = {props.elementRef2}
            changeSortBy={()=>props.changeSortBy("others",1)}
            handleClose3={() => handleClose()}
          />
        </div>
      )}
    </div>
  );
};

//export default HashTagsButton;

const mapStateToProps = (state) => ({
  theothersisopen: state.theothersisopen,
  signup: state.signup,
  users: state.users,
  following: state.following,
  newfollowinglinks: state.newfollowinglinks,
  
});

const mapDispatchToProps = (dispatch, props) => ({
  incrementOthersIsOpenClickCount: (data) =>
    dispatch(incrementOthersIsOpenClickCount(data)),
  decrementOthersIsOpenClickCount: (data) =>
    dispatch(decrementOthersIsOpenClickCount(data)),
  
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OthersButton),
);
