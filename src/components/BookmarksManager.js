import React, {useState} from "react";



import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import FileUpload from './FileUpload'

import {setSettings} from "../actions/settings";


class BookmarksManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     didUpload:false,
     hashtag:"#"
    }
  }

  onHashtagChange = (e) => {
    const hashtag = e.target.value;



if (
        e.target.value.trim().length === 1 &&
        e.target.value.trim().match(/^[ -~]$/) &&
        e.target.value.trim() === "#"
      ) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        //this.props.setTextFilter(v);
        this.setState({hashtag:v}) 
         this.props.setSettings({ settingsOption1:"",
  settingsOption2:"",
  group:v})       
      } else if (e.target.value.trim().length > 1) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        //this.props.setTextFilter(v);
        this.setState({hashtag:v}) 
         this.props.setSettings({ settingsOption1:"",
  settingsOption2:"",
  group:v})
      }


    
   
    //this.setState({hashtag})
  //   this.props.setSettings({ settingsOption1:"",
  // settingsOption2:"",
  // group:hashtag})
    //console.log("this.props.settings.group="+this.props.settings.group)
    //
  };

   setCheckDidUpload = () => {
  
   this.setState({didUpload:true})
   if(this.state.didUpload===false) {
      //console.log("upload did not happen")
     } else {
      //console.log("upload did happen")
     }
  }
 
render() {
 return (
    <div>
      <ol>
        <li>From the browser, export (download) your bookmarks file and then choose and upload your bookmarks file in step 2.</li>
        <li><FileUpload setCheckDidUpload={this.setCheckDidUpload}/></li>
        {this.state.didUpload?<li><input
          type="text"
          placeholder="hashtag to group these bookmarks under"
          autoFocus
          className="text-input"
          value={this.state.hashtag}
          onChange={this.onHashtagChange}
          title="Please enter the hashtag to group these bookmarks under."
          maxlength="2048"
        /></li>:''}
          <Link className="header__title" to="/fetchbookmarks">
          {this.state.didUpload?<li> <span className="ib text-color-black text-size-8">import bookmarks</span></li>:''}
            
          </Link>
      
      </ol>
    </div>
  );
}
}

//export default BookmarksManager;
const mapStateToProps = (state) => ({
  settings:state.settings
});

const mapDispatchToProps = (dispatch) => ({
  setSettings: (settings) => dispatch(setSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksManager);


