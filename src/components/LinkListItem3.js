import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { getShowPublic2 } from "../actions/sp";

//const LinkListItem3 = ({id, description, Url, note, amount, createdAt, faviconURL }) => {
    const LinkListItem3 = (props) => {
        const [data, setData] = useState(null);
        const storeScrollPosition = () => {
        // window.localStorage.setItem("scrollY",window.scrollY)
        // window.localStorage.setItem("scrollPosition",window.scrollY)
  }

  useEffect(() => {
  fetch('https://urilinks-project-read-showpublic.vercel.app', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ userId: props.uid }),
  })
    .then(response => response.json())
    .then(data => {

        console.log("LinkListItem3, fetch data="+JSON.stringify(data))
        setData(data)
    
    })
    .catch(error => console.error('Error fetching data, error=', error));
}, []);
  
 useEffect(() => {
    // console.log("LinkListItem3.js, props.uid="+JSON.stringify(props.uid))
    // console.log("LinkListItem3.js, props="+JSON.stringify(props))
    //getShowPublic2(props.uid)
    //console.log("LinkListItem3.js, props.sp="+JSON.stringify(props.sp))
    window.onbeforeunload = null;
  }, []);

  return (
  <div>
  {true && <div className="list-item__flex">

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

