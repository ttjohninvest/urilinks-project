import React from 'react'
//import { history } from "../routers/AppRouter";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ImportedBookmarks = (props) => {

//      const goBack = () => {
//     props.history.goBack(); // Navigates back one step in the history
//   };

   const returnAndRefresh = () => {
     props.history.push("/");
        window.location.reload()
  };

    return (
        <div>
               Successfully imported the bookmarks.
              

  <button className="button-style-1- button" onClick={returnAndRefresh}>
              Return and Refresh
            </button>

        </div>
        
    )
}

//export default ImportedBookmarks;

// const mapStateToProps = (state) => ({
//   url: state.url,
//   links:state.links
// });

export default withRouter(
  connect(undefined, undefined)(ImportedBookmarks)
);