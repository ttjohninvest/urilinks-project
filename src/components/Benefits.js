import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'

const Benefits = () => {
return (<div>
 
  <div className="list-header__flex__center">
Medical Referral Links Management System Usage:<br />
-This tool is to help people manage their internet links. They can add, search, share them with others, delete<br />
  and view them by clicking on them. You may upload a bookmark file that is under 100kb. You may add them one by one.<br />
-a sharable link is provided so that you may share your content with others<br />
-what saving bookmarks to chrome browser bookmarks, you will need to enter a file name so when they are imported<br />
  you will so your folder name as a menu item<br />
-the menu items are in ascii alphabetical order, numbers and symbols appear before letters<br />
-if you want a menu item to appear before another menu item, preceed the hashtag name with 1 or more zeros<br />
  two zeros will sort before one zero<br />
-links are not limited to commercial purposes<br />
-search through link titles, hashtags or notes<br />
-easy grouping or regrouping of links by hashtag by adding or removing hashtags from the note sections<br />
-hashtags need to be entered in pascal case for example #TheCatIsFriendly so they will have spaces between words in the left menu pane.<br /> 
-the # hash is removed and spaces are added and presented in alphabetical order<br />
-when a link in the left sidebar is clicked, clickable link results will appear to the adjacent content area.<br />
-a link may be added one at a time through the "Add Link" button and appear in the left side menu pane<br />
-your google name and profile picture will appear at the top of your page<br />
-plans: [the free plan stores up to {StorageSizes.free} links], [The basic plan stores up to {StorageSizes.basic} links<br />
-for $4.99 per year], [the standard plan stores up to {StorageSizes.standard} links for $9.99 per year],<br />
-[the premium plan stores up to {StorageSizes.premium} links for $14.99 per year]<br />
-a plan may be upgraded at anytime; the new plan supersedes the old plan and the yearly pay cycle<br />
-renews on day of plan selection and yearly renewal and old plan is canceled<br />
-easy account deletion, no refunds<br />
<br />
-If you have any questions, comments or concerns, please contact me, John, at john@urilinks.com or johmcg64@gmail.com<br />
-my phone number is 775 559 5740. I am happy to help you.
</div>
<div></div>
</div>)
};

export default Benefits;
