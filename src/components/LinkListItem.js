import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, note, amount, createdAt }) => (
  <div className="border-bottom-1">
    <div className="border-blue-">
      <div className="list-item__flex border-green-">
        <div className="border-orange-">
          <h3 className="">
            <a
              className="nounderline text-size-1"
              href={Url}
              target="_self"
              title={Url}
            >
              {description}
            </a>
          </h3>
        </div>
        <div className="border-orange-">
          <h3 className="">
            <Link className="nounderline text-size-2-" to={`/edit/${id}`}>
              <div>
                <h3 className="">edit or remove</h3>
              </div>
            </Link>
          </h3>
        </div>
      </div>

      <div className="list-item__sub-title- padding-left-1 text-size-1">
        Entered: {moment(createdAt).format("MMMM Do, YYYY")}
      </div>
    </div>
    <h3 className="list-item__data  text-size-1 font-weight-1">{note}</h3>
  </div>
);

export default LinkListItem;
