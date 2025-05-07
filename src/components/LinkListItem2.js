import React from "react";

const LinkListItem2 = ({ id, description, Url, note, amount, createdAt }) => {
  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollY",window.scrollY)
  }
  return (<div className="list-item__flex">
    <div className="card-background-color margin-bottom-1- rounded-lg-1- padding-1 margin-bottom-1 triagnle-right">
      <a
        className="nounderline text-size-1"
        href={Url}
        target="_self"
        title={Url}
        onClick={storeScrollPosition}
      >
        {description}
      </a>
    </div>
  </div>)
};

export default LinkListItem2;
