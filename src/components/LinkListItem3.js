import React,{useEffect} from "react";

const LinkListItem3 = ({id, description, showpublic, Url, note, amount, createdAt, faviconURL }) => {
  const storeScrollPosition = () => {
    // window.localStorage.setItem("scrollY",window.scrollY)
    // window.localStorage.setItem("scrollPosition",window.scrollY)
  }
  
 useEffect(() => {
    console.log("LinkListItem3.js, showpublic="+JSON.stringify(showpublic))
    window.onbeforeunload = null;
  }, []);

  return (
  <div>
  {showpublic === true && <div className="list-item__flex">

    <div className="flexrow2 margin-5- margin-bottom-1 card-background-color padding-left-1111"><div className="card-background-color margin-left-11"><img className="borderradius50 margin-top-1111" width="16" height="16" src={faviconURL} /></div>
    <div className="card-background-color padding-1 margin-bottom-1 borderRadius4">
      <a
        className="nounderline text-size-1 text-color-db- color-purple ib margin-top-11111"
        href={Url}
        //target="_self"
        target="_blank"
        title={Url}
        onClick={storeScrollPosition}
      >
        {description}
      </a>
      
    </div>
  </div>
  </div>}

  </div>
  )
};

export default LinkListItem3;
