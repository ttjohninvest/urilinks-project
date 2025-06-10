import React from "react";
import { Link } from "react-router-dom";


const BookmarksManager = () => {
 

  return (
    <div>
      <ol>
        <li>export bookmarks</li>
        <li>upload bookmarks</li>
        <li><Link className="header__title" to="/fetchbookmarks">
            <span className="ib">import bookmarks</span>
          </Link></li>
      </ol>
    </div>
  );
};

export default BookmarksManager;