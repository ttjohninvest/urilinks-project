import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";

const Benefits = () => (
  <div className="list-header__flex__center">
    urilinks tool benefits:<br />
-for instagram profile or other, a copy and paste-able link provided to your links bio page<br />
-links are not limited to commercial purposes<br />
-up to 5000 links storage capacity on links bio page<br />
-search by link title, hashtag, notes or date range<br />
-easy grouping or regrouping of links by hashtag<br />
-clickable hashtags to see grouped links are in in alphabetical order<br />
-clickable titles to see grouped links are present in dropdown list in alphabetical order<br />
-upload bookmarks tool provided<br />
-bookmarks are automatically converted to bio links<br />
-satisfying<br />
-plans: 0 to 250 bio links free, 251 to 1500 bio links $4.99 per year, 1501 to 2500 bio links $9.99 per year, 2501 to 5000 bio links $14.99 per year<br />
-plan may be upgraded at anytime, new plan supersedes old plan and pay cycle renews on day of renewal and old plan is canceled<br />
-easy account deletion, no refunds<br />
  </div>
  <div>questions or comments, please contact John at johmcg64@gmail.com</div>
);

export default Benefits;
