const DISPLAY_THIS_MANY_LINKS = 100;
////
import React, { useState, useRef, useEffect } from "react";
import ReadMore from "./ReadMore";
import LinkList from "./LinkList";
import AddLinkPage2 from "./AddlinkPage2";
import SendEmailPage from "./SendEmailPage";
import ReadMoreSpan from "./ReadMoreSpan";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";

import { DateRangePicker } from "react-dates";
import EmailForm from "./EmailForm";

import database from "../firebase/firebase";
import redarrow from "../assets/images/red-arrow.jpg";
import * as firebase from "firebase";
import StorageSizes from "./StorageSizes";
import myprofile from "../assets/images/myprofile.png";

import {
  setTextFilter,
  sortByDate,
  sortByDescription,
  sortByHashTag,
  setStartDate,
  setEndDate,
  sortByNoteText,
  sortByViews,
  sortByLikes,
  sortByStar,
  sortByFolder,
} from "../actions/filters";

function ExpandableArray(props) {

  

  return (
    <div className="bg-white-1">
      hello in ExpandableArray
    </div>
  );
}

export class LinkListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    let sb = "";
   
    this.state = {
      sortBy: "description",
      items: [],
      calendarFocused: null,
      mappedDataShort: [],
      mappedDataLong: [],
      loading: true,
      height: 0,
      hashtags: [],
      hashtags2: [],
      morehashtags:
        window.localStorage.getItem("morehashtags") === "true" ? true : false,
      newspaper: true,
      
      foldernamesList: [],
      isToggled: false,
      searchTerm: "", //,
    };

    this.setit = this.setit.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch() {
    
    
  }

  handleKeyPress(e) {
   
  }

  

  

  setit = (value, event) => {
    // event.preventDefault();
    // console.log("setIt, 3333333333333333333333333 value=" + value);

    // this.props.sortByDescription();
    // this.props.setTextFilter(value);

    // //window.localStorage.setItem("sortBy", "hashtag");
    // window.localStorage.setItem("sortBy", "description");
    // window.localStorage.setItem("searchLinks3", value);

    // this.props.rerenderit();
  };

  

  render() {
    return (
      <div className="">
        <div>
          {((
            this.props.hashtags 
          
          //&& this.props.hashtags.length > 0
        ) ||
            (this.state.mappedDataLong &&
              this.state.mappedDataLong.length > 1)) && (
            <div>
              <ExpandableArray
                
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  links: state.links,
  hashtags: state.hashtags,
  setit: state.setit,
  settings: state.settings,
  theplan: state.theplan,
  signup: state.signup,
  theplan: state.theplan,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),

  sortByHashTag: () => dispatch(sortByHashTag()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByNoteText: () => dispatch(sortByNoteText()),

  sortByViews: () => dispatch(sortByViews()),
  sortByLikes: () => dispatch(sortByLikes()),
  sortByStar: () => dispatch(sortByStar()),
  sortByFolder: () => dispatch(sortByFolder()),

  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
