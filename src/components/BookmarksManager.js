import React, {useState} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import FileUpload from './FileUpload'
import setHashTag from "../actions/hashtag";

const BookmarksManager = (props) => {

  const [didUpload, setDidUpload] = useState(false)
  //const [hashtag, setHashtag] = useState("")

  const onHashtagChange = (e) => {
    const hashtag = e.target.value;
setHashTag(hashtag)
//setHashtag(hashtag)
  };
 

  const setCheckDidUpload = () => {
   setDidUpload(true)
   if(didUpload===false) {
      //console.log("upload did not happen")
     } else {
      //console.log("upload did happen")
     }
  }

  return (
    <div>
      <ol>
        <li>From the browser, export (download) your bookmarks file and then choose and upload your bookmarks file in step 2.</li>
        <li><FileUpload setCheckDidUpload={setCheckDidUpload}/></li>
        {didUpload?<li><input
          type="text"
          placeholder="hashtag to group these bookmarks under"
          autoFocus
          className="text-input"
          value={props.hashtag}
          onChange={onHashtagChange}
          title="Please enter the hashtag to group these bookmarks under."
          maxlength="2048"
        /></li>:''}
          <Link className="header__title" to="/fetchbookmarks">
          {didUpload?<li> <span className="ib text-color-black text-size-8">import bookmarks</span></li>:''}
            
          </Link>
      
      </ol>
    </div>
  );


};



//export default BookmarksManager;
const mapStateToProps = (state) => ({
  hashtag:state.hashtag
});

export default withRouter(
  connect(mapStateToProps, undefined)(BookmarksManager)
);
