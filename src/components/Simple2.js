import React, { useState, useRef, useEffect } from "react";
import ReadMore from "./ReadMore";
import LinkList from "./LinkList";
import AddLinkPage2 from "./AddlinkPage2";
import ReadMoreSpan from "./ReadMoreSpan";
import AddLinkPage from "./AddlinkPage";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";

import { DateRangePicker } from "react-dates";

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
  sortByFolder,
} from "../actions/filters";

function ExpandableArray(props) {
  return <div>ExpandableArray called</div>;
}

export class Simple2 extends React.Component {
  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    let sb = "";

    this.state = {};

    this.setit = this.setit.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch() {
    var select = document.getElementById("mode");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("handleSearch search, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value;
    let str = term.trim();
    term = str;
    if (selectedValue === "hashtag") {
      const words = term.split(/\s+/); // Split by one or more whitespace characters

      // if (term.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }
      // if (words.length !== 1) {
      //   alert("The search term needs to be one word.");
      //   return;
      // }
    }
    //alert (term)
    this.props.setTextFilter(term);
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  }

  scrollUp = () => {
    !!document.querySelector("#top") &&
      document.querySelector("#top").scrollIntoView({
        behavior: "smooth",
      });
  };

  deleteHashtagLinks = () => {
    console.log("hashtag is " + this.props.filters.text);
    const hashtag = this.props.filters.text;
    if (this.props.filters.sortBy === "hashtag") {
    }
    console.log("deletes all of the hashtag links");
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = (e) => {
    console.log("e.target.value=" + e.target.value);

    if (this.props.filters.sortBy === "date") {
      window.localStorage.setItem("searchLinks1", e.target.value);
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", "");
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "description") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", e.target.value);
      window.localStorage.setItem("searchLinks3", "");
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "hashtag") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", e.target.value);
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "notetext") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", "");
      window.localStorage.setItem("searchLinks4", e.target.value);
    } else {
    }

    if (this.props.filters.sortBy === "hashtag") {
      if (
        e.target.value.trim().length === 1 &&
        e.target.value.trim().match(/^[ -~]$/) &&
        e.target.value.trim() === "#"
      ) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        this.props.setTextFilter(v);
      } else if (e.target.value.trim().length > 1) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        this.props.setTextFilter(v);
      }
    } else {
      let v = "";
      if (!!e.target.value === false) v = "";
      else v = e.target.value;
      this.props.setTextFilter(v);
    }
  };

  onFolderChange = (e) => {
    console.log("onFolderChange, e.target.value=" + e.target.value);
    //alert( "e.target.value="+e.target.value)
    this.props.setTextFilter(e.target.value);

    if (this.myRef.current) this.myRef.current.focus();
    window.localStorage.setItem("sortBy", "folder");
    //this.props.setTextFilter(e.target.value);
    this.setState({ sortBy: "folder" });

    this.props.sortByFolder();
  };

  onSortChange = (e) => {
    if (e.target.value === "none") return;

    const val = window.document.getElementById("termid").value.trim();
    //window.localStorage.setItem("termid", val);
    console.log("onSortChange=(), search term=, val=" + val);
    if (e.target.value === "description") {
      window.localStorage.setItem("sortBy", "description");
      this.props.setTextFilter(val);
      if (this.myRef.current) this.myRef.current.focus();
      this.setState({ sortBy: "description" });
      this.props.sortByDescription();
      //this.setState({ sortBy: "description" });
    } else if (e.target.value === "hashtag") {
      window.localStorage.setItem("sortBy", "hashtag");
      // if (val !== "" && val.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }

      if (val === "") {
        //window.document.getElementById("termid").value = "#"
        this.props.setTextFilter("#");
        //window.localStorage.setItem("termid", "#");
      } else {
        //window.localStorage.setItem("termid", val);
        this.props.setTextFilter(val);
      }
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("#");

      //window.localStorage.setItem("sortBy", "hashtag");
      this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTag();
      //this.setState({ sortBy: "hashtag" });
    } else if (e.target.value === "notetext") {
      window.localStorage.setItem("sortBy", "notetext");
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("");
      this.props.setTextFilter(val);
      //window.localStorage.setItem("sortBy", "notetext");
      this.setState({ sortBy: "notetext" });
      this.props.sortByNoteText();
      //this.setState({ sortBy: "notetext" });
    }
  };
  //
  extractHashtags = (text) => {
    console.log("extractHashTags, text=" + text);
    const regex = /#([a-zA-Z0-9_]+)/g;
    const hashtags = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      hashtags.push(match[0]);
    }
    console.log("hashtags=" + JSON.stringify(hashtags));
    return hashtags;
  };

  removeDuplicatesByKey(array, keyFunction) {
    const seen = new Set();
    return array.filter((item) => {
      const key = keyFunction(item);
      const duplicate = seen.has(key);
      seen.add(key);
      return !duplicate;
    });
  }

  isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  componentDidMount() {
    //this.props.setTheHashTagDivHeight(this.state.height);
    const morehashtags = window.localStorage.getItem("morehashtags");

    try {
      const term = window.document.getElementById("termid").value.trim();
      //const term = window.localStorage.getItem("termid");
      if (term !== "" && term.charAt(0) === "#") {
        this.setState({ sortBy: "hashtag" });
        window.document.querySelector("#buttonid").click();
      } else if (term === "" || term.charAt(0) !== "#") {
        this.setState({ sortBy: "description" });
        window.document.querySelector("#buttonid").click();
      }
    } catch (e) {
      //alert("componentDidMount,e="+e)
    }
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {}

  updateHeight = () => {
    const height = this.elementRef.current.offsetHeight;
    console.log("2 OOOOOOOOOOOOOOOOOOOOO height=" + height);
    this.setState({ height });
  };

  setit = (value, event) => {
    event.preventDefault();
    console.log("setIt, 3333333333333333333333333 value=" + value);

    this.props.sortByHashTag();
    this.props.setTextFilter(value);

    window.localStorage.setItem("sortBy", "hashtag");
    window.localStorage.setItem("searchLinks3", value);

    this.props.rerenderit();
  };

  refreshIt = () => {
    //window.location.reload();
    window.location.href = "https://urilinks.com?signup=signup";
  };

  scrollDown = () => {
    let d = this.getHeight();
    //window.scrollTo(0, d);
  };

  handleCheckboxShow = (event) => {
    this.setState({ isToggled: !this.state.isToggled });
    console.log("show dd");
  };

  search = () => {
    console.log("search");
    //const sortBy = window.localStorage.getItem("sortBy");
    var select = document.getElementById("mode");

    //var selectedValue = select.options[select.selectedIndex].value;
    var selectedValue;
    if (window.localStorage.getItem("sortBy") !== "")
      selectedValue = window.localStorage.getItem("sortBy");
    else selectedValue = select.options[select.selectedIndex].value;
    console.log("search = () => {, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value.trim();
    window.localStorage.setItem("termid", term);
    this.props.setTextFilter(term);

    if (
      selectedValue === "hashtag" &&
      // && sortBy === "hashtag"
      this.props.filters.sortBy === "hashtag"
    ) {
      // if (term !== "" && term.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }

      if (term === "") {
        window.document.getElementById("termid").value = "#";
        window.localStorage.setItem("termid", "#");
        this.props.setTextFilter("#");
      } else {
        window.localStorage.setItem("termid", term);
        this.props.setTextFilter(term);
      }
    }
  };

  render() {
    return (
      <div className="minWidth- bg-color-4">
        {/* <Link
                    id="adlinkid"
                    className="aw minWidth- alignCenter button-2hw- b1xw1 button-link-4 ib text-size-5 bg-color-1- bg-color-1w bg-color-1w pointereventsauto width100  color-black-2 border5-"
                    to="/create"
                  >
                    Add Link
                  </Link> */}

        <a
          id="adlinkid"
          href="#"
          className="cursor-pointer aw minWidth- alignCenter button-2hw- b1xw1 button-link-4 ib text-size-5 bg-color-1- bg-color-1w bg-color-1w pointereventsauto width100  color-black-2 border5-"
          onClick={handleClick}
        >
          Add New Link
        </a>

        {showComponent && <AddLinkPage />}
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
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNoteText: () => dispatch(sortByNoteText()),
  sortByFolder: () => dispatch(sortByFolder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Simple2);
