import React,{useEffect} from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'



const Benefits = () => {
  useEffect(()=>{
  },[])
return (<div>
 
  <div className="list-header__flex__center">
Medical Referral Links Management System Usage and Federal Referral Law Warnings<br />
-This tool is to help people manage their internet links. They can add, search, share them with others, delete<br />
  and view them by clicking on them. You may upload a bookmark file that is under 100kb. You may add them one by one.<br />
-a sharable link is provided so that you may share your content with others<br />
-what saving bookmarks to chrome browser bookmarks, you will need to enter a file name so when they are imported<br />
  you will so your folder name as a menu item<br />import { sortByFolder } from './../actions/filters';
import { startRemoveBmok } from './../actions/bmok';
import BookmarksManager from './BookmarksManager';

-the menu items are in ascii alphabetical order, numbers appear before letters<br />
-if you want a menu item to appear before another menu item, preceed the hashtag name with 1 or more zeros<br />
  two zeros will sort before one zero<br />
-links are not limited to commercial purposes<br />
-search through link titles, hashtags or notes<br />
-easy grouping or regrouping of links by hashtag by adding or removing hashtags from the note sections<br />
-you can search through hashtags with the hash or without the hash<br />
-hashtags need to be entered in pascal case for example #TheCatIsFriendly so they will have spaces between words in the left menu pane.<br /> 
-the # hash is removed and spaces are added and presented in alphabetical order<br />
-put one or more zeros after the # to sort it to the top of the menu list in the left menu panel<br />
-also, you can enter another hashtag in the notes like this #abc #00000abc and the website is<br />
 accessible through menu items 00000abc or abc, if 00000abc is sorted in the first position, it will be at the top of the list<br />
-the more zeros added after the # will causes it to sort higher in the menu list in the left menu panel and menu item<br />
 serves as a reminder because it always appears on the top of the menu list<br />
-if you do a hashtag search with this, #0, as the search term, the menu items at the top of the menu list will appear in the results<br />
-when a link in the left sidebar is clicked, clickable link results will appear to the adjacent content area.<br />
-a link may be added one at a time through the "Add Link" button and appear in the left side menu pane<br />
-your google name and profile picture will appear at the top of your page<br />
-if you accidentally loose your data, please contact me and give me your userid at johmcg64@gmail.com or 775 559 5740<br />
 and I will restore your data from back up. You can obtain your user id from the user id in the title on your urilinks home page.
 It is the alpha numberic string that appears after the id=. Thank you.
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

recipes:
steps to save all tabs to bookmarks sortByFolder
1 press ctrl-shift-d keys together
2 it will open up a dialog
3 click save
4 click bookmarks manager 
5 change the folder name 

</div>)
};

export default Benefits;
