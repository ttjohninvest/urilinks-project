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
        {props.rl === 0 ? (
          <div className="margin-top-1111b">
            Bookmarks were not uploaded because they may have been already
            uploaded,the bookmarks file was empty or the bookmarks file being
            uploaded overflowed the maximum number of 250 bookmarks.
          </div>
        ) : props.max === props.rl ? (
          <div className="margin-top-1111b font-weight-bold">
            Successfully imported all the unique bookmarks.{" "}
            {`${props.rl} of ${props.max}`}
          </div>
        ) : (
          <div>
            Imported {`${props.rl} of ${props.max}`}` bookmarks. The limit is
            500 bookmarks
          </div>
        )}

        {/* {props.max===props.rl?<div>Successfully imported all of the bookmarks. {`${props.rl} of ${props.max}`}</div>
: <div>Imported {`${props.rl} of ${props.max}`}` bookmarks. The limit is 500 bookmarks</div>} */}
        <div className="flexrowtfw">
         

          <div className="rectangle-1">
            <div className="margin-top-2">
              <button
                className="button-style-1- button"
                onClick={returnAndRefresh}
              >
                Return and Refresh
              </button>
            </div>

            <div className="margin-top-2">
              <button className="button-style-1- button" onClick={goToHomePage}>
                Return
              </button>
            </div>
          </div>
           <div className="rectangle-2 margin-top-1111b">
            {(props.rl>0) &&<div className="margin-top-1111b">These are the bookmarks that were added:</div>}
            
              {props.result.map((r, i) => (
                <li>{r.description}</li>
              ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(undefined, undefined)(ImportedBookmarks));
