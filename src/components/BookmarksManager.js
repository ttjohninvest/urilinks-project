import React, { useState } from "react";
//import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { withRouter, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";

import { setSettings } from "../actions/settings";

class BookmarksManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didUpload: false,
      hashtag: "#",
    };
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
      this.setState({ hashtag: v });
      this.props.setSettings({
        settingsOption1: "",
        settingsOption2: "",
        group: v,
      });
    } else if (e.target.value.trim().length > 1) {
      let v = "";
      if (!!e.target.value === false) v = "";
      else v = e.target.value.trim();
      //this.props.setTextFilter(v);
      this.setState({ hashtag: v });
      this.props.setSettings({
        settingsOption1: "",
        settingsOption2: "",
        group: v,
      });
    }
  };

  setCheckDidUpload = () => {
    this.setState({ didUpload: true });
    // return <Navigate to="/fetchbookmarks" />;
    //useNavigate("/fetchbookmarks")
    if (this.state.didUpload === false) {
      //console.log("upload did not happen")
    } else {
      //console.log("upload did happen")
    }
  };
//this.state.didUpload===false
  render() {
    return (
      <div>
         {true?<ol>
         <li>
            From the browser, export (download) your bookmarks file and then
            choose and upload your bookmarks file in step 2.
          </li>
          <li>
            <FileUpload setCheckDidUpload={this.setCheckDidUpload} />
          </li>
          {/* {this.state.didUpload?<li><input
          title=" The defaults hash tags are #chromebookmarks, #firefoxbookmarks,#safaribookmarks,#edgebookmarks,#operabookmarks, #bravebookmarks depending on the browser that you are using"
          type="text"
          placeholder="hashtag to group these bookmarks under"
          autoFocus
          className="text-input"
          value={this.state.hashtag}
          onChange={this.onHashtagChange}
          maxlength="2048"
          /></li>:''} */}
<li>
<input type="radio" id="option1" name="group1" value="option1" />
<label for="option1">convert folder names to hashtags</label>
</li>

<li>
  <input type="radio" id="option2" name="group1" value="option2" />
<label for="option2">convert domain names to hashtags</label>
</li>
          

 
                


          <Link className="header__title" to="/fetchbookmarks">
            {this.state.didUpload ? (
              <div>

                <li>
                <span className="ib text-color-black text-size-8">
                  import bookmarks
                </span>

              </li>
              </div>
            
            ) : (
              ""
            )}
          </Link>
        </ol>:<Navigate to="/fetchbookmarks" />}
      </div>
    );
  }
}

//export default BookmarksManager;
const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setSettings: (settings) => dispatch(setSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksManager);
