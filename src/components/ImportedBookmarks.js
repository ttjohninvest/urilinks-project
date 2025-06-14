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
    <div>
      <div>Successfully imported the bookmarks.</div>

      <div>
        <button className="button-style-1- button" onClick={returnAndRefresh}>
          Return and Refresh
        </button>
      </div>

      <div>
        <button className="button-style-1- button" onClick={goToHomePage}>
          Return
        </button>
      </div>
    </div>
  );
};

export default withRouter(connect(undefined, undefined)(ImportedBookmarks));
