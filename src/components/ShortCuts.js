import React,{useEffect} from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'

const useButtons = false; 

const ShortCuts = () => {
  useEffect(()=>{
    document.title="urilinks (short cuts)"
  },[])
return (<div>
  <div
          className={`website-background-color ${
            useButtons === true ? "width30p" : "width30pt"
          } theHeight flexrowzc2 border-b-5 margin-left-n-19 font-roboto text-size-16 font-weight-500`}
          title="You are welcome to use this Internet Links Organizer Dashboard (Usage Page)" //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
         
            
              <span>Internet Links Organizer Dashboard's  Short Cuts Page</span>
            
            
        </div>
 
  <div className="list-header__flex__center">
Internet Links Organizer Dashboard's Short Cuts Page:<br />
Ctrl-Shift-d: pressing these three keys at the same time will put all open tabs into one bookmarks folder<br />
<br />
-If you have any questions, comments or concerns, please contact me, John, at john@urilinks.com or johmcg64@gmail.com<br />
-my phone number is 775 559 5740. I am happy to help you.
</div>
</div>)
};

export default ShortCuts;
