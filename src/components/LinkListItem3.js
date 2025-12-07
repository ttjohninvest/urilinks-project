import React,{useEffect} from "react";
import { connect } from "react-redux";
import { getShowPublic2 } from "../actions/sp";

//const LinkListItem3 = ({id, description, Url, note, amount, createdAt, faviconURL }) => {
    const LinkListItem3 = (props) => {
  const storeScrollPosition = () => {
    // window.localStorage.setItem("scrollY",window.scrollY)
    // window.localStorage.setItem("scrollPosition",window.scrollY)
  }
  
 useEffect(() => {
    //getShowPublic2(props.uid)
    console.log("LinkListItem3.js, props.sp="+JSON.stringify(props.sp))
    window.onbeforeunload = null;
  }, []);

  return (
  <div>
  {props.sp.showpublic === true && <div className="list-item__flex">

    <div className="flexrow2 margin-5- margin-bottom-1 card-background-color padding-left-1111"><div className="card-background-color margin-left-11"><img className="borderradius50 margin-top-1111" width="16" height="16" src={props.faviconURL} /></div>
    <div className="card-background-color padding-1 margin-bottom-1 borderRadius4">
      <a
        className="nounderline text-size-1 text-color-db- color-purple ib margin-top-11111"
        href={props.Url}
        //target="_self"
        target="_blank"
        title={props.Url}
        onClick={storeScrollPosition}
      >
        {props.description}
      </a>
      
    </div>
  </div>
  </div>}

  </div>
  )
};
const mapStateToProps = (state) => {
  
  return {
   
    sp: state.sp
  };
};


export default connect(mapStateToProps)(LinkListItem3);

