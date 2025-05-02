import React from "react";

const LinkListItem2 = ({ id, description, Url, note, amount, createdAt }) => (
  <div className="list-item__flex">
    <div className="">
      <a
        className="nounderline text-size-1"
        href={Url}
        target="_blank"
        title={Url}
      >
        {description}
      </a>
    </div>
  </div>
);

export default LinkListItem2;
