import React from "react";

const LinkListItem2 = ({ id, description, Url, note, amount, createdAt }) => (
  <div className="list-item__flex">
    <div className="card-background-color margin-bottom-1- rounded-lg-1- padding-1">
      <a
        className="nounderline text-size-1"
        href={Url}
        target="_self"
        title={Url}
      >
        {description}
      </a>
    </div>
  </div>
);

export default LinkListItem2;
