import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'

const Benefits = () => {
return (<div>
 
  <div className="list-header__flex__center">
    urilinks tool use:<br />
-after you add link/s to your page, a sharable link is provided so that you may share your content with others<br />
-links are not limited to commercial purposes<br />
-search throuh link titles, hashtags or notes<br />
-easy grouping or regrouping of links by hashtag by adding or removing hashtags from the note sections<br />
-hashtags need to be entered in pascal case for example #TheCatIsFriendly.<br /> 
-for readability; they appear in buttons on the displayed in the index matrix;<br />
-the # hash is removed and spaces are added and presented in alphabetical order<br />
-when a button in the index matrix is clicked, results will appear below the matrix<br />
{/* -when saving links in your bookmark file using the browser, the first character<br />
-of each word in the phrase will be capitalized for readability when they appear on the index matrix buttons<br />
-clicking on the upload menu item, starts the process of uploading a browser bookmarks file;<br />
-the link/s in the uploaded bookmark file will appear in the index matrix and in results<br /> */}
-a link may be added one at a time through the "Add Link" button and appear in results<br />
-your google name and profile picture will appear at the top of your page<br />
-plans: [the free plan stores up to {StorageSizes.free} links], [The basic plan stores up to {StorageSizes.basic} links<br />
-for $4.99 per year], [the standard plan stores up to {StorageSizes.standard} links for $9.99 per year],<br />
-[the premium plan stores up to {StorageSizes.premium} links for $14.99 per year]<br />
-a plan may be upgraded at anytime; the new plan supersedes the old plan and the yearly pay cycle<br />
-renews on day of renewal and old plan is canceled<br />
-easy account deletion, no refunds<br />
<br />
-questions or comments, please contact me, John, at john@urilinks.com<br />
</div>
<div></div>
</div>)
};

export default Benefits;
