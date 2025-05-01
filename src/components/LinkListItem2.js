import React from "react";

const LinkListItem2 = ({ id, description, Url, note, amount, createdAt }) => (
  <div className="border-bottom-1">
    <div className="bg-blue-">
      <div className="list-item__flex bg-green-">
        <div className="bg-orange-">
          <h3 className="">
            <a className="nounderline text-size-1" href={Url} target="_blank" title={Url}>
              {description}
            </a>
          </h3>
        </div>
      </div>
    </div>
  </div>
);



export default LinkListItem2;
