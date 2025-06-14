import React, {useState} from "react";
import { Link } from "react-router-dom";
import FileUpload from './FileUpload'

const BookmarksManager = () => {

  const [didUpload, setDidUpload] = useState(false)
 

  const setCheckDidUpload = () => {
   setDidUpload(true)
   if(didUpload===false) {
      console.log("upload did not happen")
     } else {
      console.log("upload did happen")
     }
  }

  return (
    <div>
      <div>
        <div>export bookmarks from the bowser</div>
        <div><FileUpload setCheckDidUpload={setCheckDidUpload}/></div>
        <div>
          <Link className="header__title" to="/fetchbookmarks">
          {didUpload?<span className="ib text-color-black">import bookmarks</span>:''}
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookmarksManager;