import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'

const Benefits = () => {
return (<div>
  <div className="list-header__flex__center">
    urilinks tool use:<br />
-for instagram profile or other, a copy and paste-able link provided to your research links page<br />
-links are added one at a time or through the bookmarks uploader<br />
-links are not limited to commercial purposes<br />
-up to {StorageSizes.premium} links storage capacity on research links page<br />
-search throuh link titles, hashtags or notes<br />
-easy grouping or regrouping of links by hashtag by adding or removing hashtags from the note sections<br />
-hashtags need to be entered in pascal case for example #TheCatIsFriendly.<br /> 
-for readability, in the displayed index matrix the # hash is removed and spaces<br /> 
-are added and presented as the text of buttons in in alphabetical order<br />
-the upload menu items is uploading a browser bookmarks file<br />
-the link/s in uploaded bookmark file are displayed in results<br />
-your google name and profile picture will appear on your page<br />
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
