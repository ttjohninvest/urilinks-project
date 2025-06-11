import React from "react";
import { Link } from "react-router-dom";
import FileUpload from './FileUpload'

const BookmarksManager = () => {
 

  return (
    <div>
      <ol>
        <li>export bookmarks from the bowser</li>
        <li><FileUpload /></li>
        <li>
          <Link className="header__title" to="/fetchbookmarks">
            <span className="ib text-color-black">import bookmarks</span>
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default BookmarksManager;