import React from "react";

const LinkListItem2 = ({ id, description, Url, note, amount, createdAt, faviconURL }) => {
  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollY",window.scrollY)
  }
  /*
<div className="flexrow2 margin-5"><div><img className="borderradius50 margin-top-1111" width="16" height="16" src={faviconURL} /></div>
            <div className="padding-left-11 padding-bottom-11">
  */
  return (<div className="list-item__flex">
    <div className="flexrow2 margin-5- card-background-color padding-left-1111"><div className="card-background-color"><img className="borderradius50 margin-top-1111" width="16" height="16" src={faviconURL} /></div>
    <div className="card-background-color rounded-lg-1- padding-1 margin-bottom-1 padding-bottom-11">
      <a
        className="nounderline text-size-1 text-color-db"
        href={Url}
        target="_self"
        title={Url}
        onClick={storeScrollPosition}
      >
        {description}
      </a>
    </div>
  </div>
  </div>
  )
};

export default LinkListItem2;
