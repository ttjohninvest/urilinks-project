import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from 'Storagesizes'

const Benefits = () => {
return (<div>
  <div className="list-header__flex__center">
    urilinks tool use:<br />
-for instagram profile or other, a copy and paste-able link provided to your links bio page<br />
-links are added one at a time or through the bookmarks uploader<br />
-links are not limited to commercial purposes<br />
-up to {StorageSizes.premium} links storage capacity on links bio page<br />
-search by link title, hashtag, notes or date range<br />
-easy grouping or regrouping of links by hashtag<br />
-clickable hashtags to see grouped links are in in alphabetical order<br />
-clickable titles to see grouped links are present in dropdown list in alphabetical order<br />
-upload bookmarks tool provided<br />
-bookmarks are automatically converted to bio links<br />
-satisfying<br />
-plans: 0 to {StorageSizes.free} bio links free, 251 to {StorageSizes.basic} bio links $4.99 per year, 501 to {StorageSizes.standard} bio links $9.99 per year, 751 to {StorageSizes.premium} bio links $14.99 per year<br />
-plan may be upgraded at anytime, new plan supersedes old plan and pay cycle renews on day of renewal and old plan is canceled<br />
-easy account deletion, no refunds<br />
<br />
-questions or comments, please contact John at johmcg64@gmail.com<br />
  </div>
  <div></div>
  </div>)
};

export default Benefits;
