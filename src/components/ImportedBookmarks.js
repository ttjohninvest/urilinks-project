import React from "react";
//import { history } from "../routers/AppRouter";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ImportedBookmarks = (props) => {
  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };

  const returnAndRefresh = () => {
    props.history.push("/");
    window.location.reload();
  };

  return (
    <div className="container2">
      <div className="flexcol">

        
{props.max===props.hl?<div>Successfully imported all of the bookmarks. {`${props.max} of ${props.hl}`}</div>
: <div>Imported {`${props.max} of ${props.hl}`} bookmarks. The limit is 500 bookmarks</div>
}
        <div className="margin-top-2">
          <button className="button-style-1- button" onClick={returnAndRefresh}>
            Return and Refresh
          </button>
        </div>

        <div className="margin-top-2">
          <button className="button-style-1- button" onClick={goToHomePage}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(undefined, undefined)(ImportedBookmarks));
