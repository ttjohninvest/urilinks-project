import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, note, amount, createdAt }) => (
  <div>
    <div className="list-item__flex__column bg-blue">
      <div className="list-item__flex bg-green">
        <div className="bg-corange">
          <h3 className="list-item__title-">
            <a href={Url} target="_blank" title="Uri Link Text">
              {description}
            </a>
          </h3>
        </div>
        <div>
          <h3 className="list-item__data-">
            <Link className="list-item-" to={`/edit/${id}`}>
              <div>
                <h3 className="list-item__title-">edit or remove</h3>
              </div>
            </Link>
          </h3>
        </div>
      </div>

      <div className="list-item__sub-title-">
        Entered: {moment(createdAt).format("MMMM Do, YYYY")}
      </div>
    </div>
    <h3 className="list-item__data">{note}</h3>
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
