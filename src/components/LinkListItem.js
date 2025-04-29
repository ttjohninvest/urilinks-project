import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, amount, createdAt }) => (
  <div>
    <div>
      <h3 className="list-item__title"><a href={Url} target="_blank">{description}</a></h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format("MMMM Do, YYYY")}
      </span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format("$0,0.00")}
    </h3>
  </div>
);

// const LinkListItem = ({ id, description, amount, createdAt }) => (
//   <Link className="list-item" to={`/edit/${id}`}>
//     <div>
//       <h3 className="list-item__title">{description}</h3>
//       <span className="list-item__sub-title">
//         {moment(createdAt).format("MMMM Do, YYYY")}
//       </span>
//     </div>
//     <h3 className="list-item__data">
//       {numeral(amount / 100).format("$0,0.00")}
//     </h3>
//   </Link>
// );

export default LinkListItem;
