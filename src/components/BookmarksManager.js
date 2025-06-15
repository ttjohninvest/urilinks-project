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
      <ol>
        <li>From the browser, export (download) your bookmarks file and then upload your bookmarks file in step 2.</li>
        <li><FileUpload setCheckDidUpload={setCheckDidUpload}/></li>
       
          <Link className="header__title" to="/fetchbookmarks">
          {didUpload?<li><span className="ib text-color-black text-size-8">import bookmarks</span></li>:''}
            
          </Link>
      
      </ol>
    </div>
  );


};



export default BookmarksManager;