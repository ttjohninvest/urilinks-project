import React, {useState} from "react";
import { Link } from "react-router-dom";
import FileUpload from './FileUpload'

const BookmarksManager = () => {

  const [didUpload, setDidUpload] = useState(false)
 
  const checkDidUpload = () => {
     if(didUpload===false) {
      console.log("upload did not happen")
     } else {
      console.log("upload did happen")
     }
  }

  return (
    <div>
      <ol>
        <li>export bookmarks from the bowser</li>
        <li><FileUpload setDidUpload={setDidUpload}/></li>
        <li>
          <Link className="header__title" onClick={checkDidUpload} to="/fetchbookmarks">
            <span className="ib text-color-black">import bookmarks</span>
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default BookmarksManager;