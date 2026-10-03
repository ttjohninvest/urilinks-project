import Constants from "./Constants"
import React, { useState, createRef } from "react";

import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import {
  setTextFilterFileDate,
  sortByDateFileDate,
  sortByDescriptionFileDate,
  sortByHashTagFileDate,
  setStartDateFileDate,
  setEndDateFileDate,
  sortByNoteTextFileDate,
} from "../actions/filtersfiledate";

  // const baseUrl =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://urilinks.com";

  let baseUrl = ""
  
  if(Constants.NODE_DEV === "development") {
    baseUrl = "http://localhost:3000"
  } else {
    baseUrl = "https://urilinks.com"
  }



function ExpandableArray(props) {
  const [expanded, setExpanded] = useState(props.morehashtags);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    console.log("morehashtags");
    window.localStorage.setItem("morehashtagsfiledate", !expanded);
  };

  console.log("ExpandableArray, expanded=" + expanded);
  //console.log("ExpandableArray, mappedDataLong.length="+props.mappedDataLong.length)
  console.log("props.mappedDataShort=" + props.mappedDataShort);
  console.log(
    "EEEEEEEEEEEEEEEEEEEE, ExpandableArray, mappedDataShort.length=" +
      props.mappedDataShort.length,
  );
  let displayedArray;
  if (expanded === true) displayedArray = props.mappedDataLong;
  else displayedArray = props.mappedDataShort;

  return (
    <div>
      {props.mappedDataShort.length > 0 ? (
        <div>
          <div
            className="flexrow2c padding-around"
            title="You may click on any of these hash tags that have been entered in the note section of your link earlier to find your links that are grouped by hash tag."
          >
            <span className="is-active ib right-margin-1 margin-right-1">
              {}
            </span>
            (welcome) clickable hash tags in alphabetical order
          </div>
          <div
            ref={props.ref}
            className="flexandwrap margin-top-1 background-white-1 borderradius5"
            title="You may click on any of these hash tags that have been entered in the note section of your link earlier to find your links that are grouped by hash tag."
          >
            {!expanded
              ? props.mappedDataShort.map((s, index) => {
                  if (index < 50)
                    return (
                      <div key={index} className="padding-all text-size-5">
                        <a
                          className="nounderline color-black"
                          href="#"
                          onClick={() => props.setit(s.hashtag, event)}
                          title="click to activate the search with this hashtag."
                        >
                          {s.hashtag}
                        </a>
                      </div>
                    );
                  else return false;
                })
              : props.mappedDataShort.map((s, index) => {
                  return (
                    <div key={index} className="padding-all text-size-5">
                      <a
                        className="nounderline color-black"
                        href="#"
                        onClick={() => props.setit(s.hashtag, event)}
                        title="click to activate the search with this hashtag."
                      >
                        {s.hashtag}
                      </a>
                    </div>
                  );
                })}

            {!expanded && <span className="text-size-5">...</span>}
          </div>
          <button className="button-m button--link" onClick={toggleExpanded}>
            {expanded ? "Show Less Hashtags" : "Show More Hashtags"}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class LinkListFiltersFileDate extends React.Component {
  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    let morehashtags = window.localStorage.getItem("morehashtagsfiledate");
    console.log("constructor, LinkListFilter, morehashtags=" + morehashtags);
    this.state = {
      sortBy: "hashtag",
      items: [],
      calendarFocused: null,
      mappedDataShort: [],
      mappedDataLong: [],
      loading: true,
      height: 0,
      hashtags: [],
      hashtags2: [],
      morehashtags: morehashtags === "true" ? true : false,
    };

    this.setit = this.setit.bind(this);
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDateFileDate(startDate);
    this.props.setEndDateFileDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    console.log("e.target.value=" + e.target.value);

    if (this.props.filtersfiledate.sortBy === "date") {
      window.localStorage.setItem("searchLinks1FileDate", e.target.value);
      window.localStorage.setItem("searchLinks2FileDate", "");
      window.localStorage.setItem("searchLinks3FileDate", "");
      window.localStorage.setItem("searchLinks4FileDate", "");
    } else if (this.props.filtersfiledate.sortBy === "description") {
      window.localStorage.setItem("searchLinks1FileDate", "");
      window.localStorage.setItem("searchLinks2FileDate", e.target.value);
      window.localStorage.setItem("searchLinks3FileDate", "");
      window.localStorage.setItem("searchLinks4FileDate", "");
    } else if (this.props.filtersfiledate.sortBy === "hashtag") {
      window.localStorage.setItem("searchLinks1FileDate", "");
      window.localStorage.setItem("searchLinks2FileDate", "");
      window.localStorage.setItem("searchLinks3FileDate", e.target.value);
      window.localStorage.setItem("searchLinks4FileDate", "");
    } else if (this.props.filtersfiledate.sortBy === "notetext") {
      window.localStorage.setItem("searchLinks1FileDate", "");
      window.localStorage.setItem("searchLinks2FileDate", "");
      window.localStorage.setItem("searchLinks3FileDate", "");
      window.localStorage.setItem("searchLinks4FileDate", e.target.value);
    } else {
    }

    if (this.props.filtersfiledate.sortBy === "hashtag") {
      if (
        e.target.value.trim().length === 1 &&
        e.target.value.trim().match(/^[ -~]$/) &&
        e.target.value.trim() === "#"
      ) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        this.props.setTextFilterFileDate(v);
      } else if (e.target.value.trim().length > 1) {
        let v = "";
        if (!!e.target.value === false) v = "";
        else v = e.target.value.trim();
        this.props.setTextFilterFileDate(v);
      }
    } else {
      let v = "";
      if (!!e.target.value === false) v = "";
      else v = e.target.value;
      this.props.setTextFilterFileDate(v);
    }

    // window.localStorage.setItem("searchLinks", e.target.value);
    // this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    console.log("onSortChange=(), e.target.value=" + e.target.value);
    if (e.target.value === "date") {
      this.props.setTextFilterFileDate("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortByFileDate", "date");
      this.setState({ sortBy: "date" });
      this.props.sortByDateFileDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilterFileDate("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortByFileDate", "description");
      this.setState({ sortBy: "description" });
      this.props.sortByDescriptionFileDate();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilterFileDate("#");
      window.localStorage.setItem("sortByFileDate", "hashtag");
      this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTagFileDate();
    } else if (e.target.value === "notetext") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilterFileDate("");
      window.localStorage.setItem("sortByFileDate", "notetext");
      this.setState({ sortBy: "notetext" });
      this.props.sortByNoteTextFileDate();
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

  removeDuplicates = (stringArray) => {
    const stringifiedArray = stringArray.join(" ");
    const lcstring = stringifiedArray.toLowerCase();
    const lcStringArray = lcstring.split(" ");
    return [...new Set(lcStringArray)];
  };

  componentDidMount() {
    this.props.setTheHashTagDivHeight(this.state.height);
    const morehashtags = window.localStorage.getItem("morehashtags");

    const searchLinks1FileDate = window.localStorage.getItem(
      "searchLinks1FileDate",
    );
    const searchLinks2FileDate = window.localStorage.getItem(
      "searchLinks2FileDate",
    );
    const searchLinks3FileDate = window.localStorage.getItem(
      "searchLinks3FileDate",
    );
    const searchLinks4FileDate = window.localStorage.getItem(
      "searchLinks4FileDate",
    );

    console.log(
      "componentDidMount, searchLinks1FileDate=" + searchLinks1FileDate,
    );
    console.log(
      "componentDidMount, searchLinks2FileDate=" + searchLinks2FileDate,
    );
    console.log(
      "componentDidMount, searchLinks3FileDate=" + searchLinks3FileDate,
    );
    console.log(
      "componentDidMount, searchLinks4FileDate=" + searchLinks4FileDate,
    );

    const sortBy = window.localStorage.getItem("sortByFileDate");
    console.log("componentDidMount, sortBy=" + sortBy);

    if (this.props.filtersfiledate.sortBy === "date" || sortBy === "date") {
      this.props.setTextFilterFileDate(searchLinks1FileDate);

      this.props.sortByDateFileDate();
      this.setState({ sortBy: "date" });
    } else if (
      this.props.filtersfiledate.sortBy === "description" ||
      sortBy === "description"
    ) {
      this.props.setTextFilterFileDate(searchLinks2FileDate);

      this.props.sortByDescriptionFileDate();
      this.setState({ sortBy: "description" });
    } else if (
      this.props.filtersfiledate.sortBy === "notetext" ||
      sortBy === "notetext"
    ) {
      this.props.setTextFilterFileDate(searchLinks4);
      this.props.sortByNoteTextFileDate();
      this.setState({ sortBy: "notetext" });
    } else if (
      this.props.filtersfiledate.sortBy === "hashtag" ||
      sortBy === "hashtag"
    ) {
      //this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTagFileDate();
      if (
        this.props.filtersfiledate.text === "" ||
        searchLinks3FileDate === "" ||
        searchLinks3FileDate === undefined ||
        searchLinks3FileDate === null
      ) {
        if (
          searchLinks3FileDate === "" ||
          searchLinks3FileDate === undefined ||
          searchLinks3FileDate === null
        ) {
          this.props.setTextFilterFileDate("#");
        } else {
          this.props.setTextFilterFileDate(searchLinks3FileDate);
        }
      } else {
        this.props.setTextFilterFileDate(searchLinks3FileDate);
      }
      this.setState({ sortBy: "hashtag" });
    }

    if (this.myRef.current) this.myRef.current.focus();

    console.log(
      "VVVVVVVVVVVVVVVVVVVV, this.props.hashtagsfiledate=" +
        this.props.hashtagsfiledate,
    );

    this.setState({
      morehashtags: morehashtags === "true" ? true : false,
    });
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {}

  updateHeight = () => {
    const height = this.elementRef.current.offsetHeight;
    console.log("2 OOOOOOOOOOOOOOOOOOOOO height=" + height);
    this.setState({ height });
  };

  getHeight = () => {
    const height = this.elementRef.current.offsetHeight;
    return height;
  };

  setit = (value, event) => {
    event.preventDefault();
    console.log("setIt, 3333333333333333333333333 value=" + value);

    this.props.sortByHashTagFileDate();
    this.props.setTextFilterFileDate(value);

    window.localStorage.setItem("sortByFileDate", "hashtag");
    window.localStorage.setItem("searchLinks3FileDate", value);

    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
  };

  refreshIt = () => {
    //window.location.reload();
    window.location.href = baseUrl + "?signup=signup";
  };

  render() {
    return (
      <div className="content-container border-green-">
        <div>
          {((this.props.hashtagsfiledate &&
            this.props.hashtagsfiledate.length > 0) ||
            (this.state.mappedDataLong &&
              this.state.mappedDataLong.length > 1)) && (
            <ExpandableArray
              mappedDataShort={this.props.hashtagsfiledate}
              mappedDataLong={this.state.mappedDataLong}
              maxLength={this.SHORT_HASHTAG_LENGTH}
              ref={this.elementRef}
              morehashtags={this.state.morehashtags}
              setit={this.setit}
              getHeight={this.getHeight}
            />
          )}
        </div>

        <div
          id="before-before-link-summary-id"
          className="input-group some-component"
        >
          <div className="input-group__item">
            <input
              ref={this.myRef}
              type="text"
              className="text-input text-input-filters"
              placeholder={
                this.props.filtersfiledate.sortBy === "date"
                  ? "Search for Link(s)"
                  : "Search for Link(s)"
              }
              value={this.props.filtersfiledate.text}
              onChange={this.onTextChange}
              title={
                this.props.filtersfiledate.sortBy === "date"
                  ? ""
                  : this.props.filtersfiledate.sortBy === "description"
                    ? "Search for Link(s) (Please enter link description to find)"
                    : "Search for Link(s) (Please enter Hash Tag to find)"
              }
            />
          </div>
          <div className="input-group__item">
            <select
              className="select select-filters"
              value={this.state.sortBy}
              //value={this.props.filters.sortBy}

              onChange={this.onSortChange}
              title="Date: Sorts into descending order (latest entered first), Link Text: Search By Uri/Url Link Text, or Hash Tag: Search By Hash Tag"
            >
              <option value="hashtag" title="search by hash tag">
                Hash Tag
              </option>

              <option
                value="description"
                title="search through the uri/url link texts"
              >
                Link Text
              </option>

              <option value="notetext" title="search through the notes">
                Note Text
              </option>
              <option
                value="date"
                title="search through the uri/url link texts with a date range"
              >
                Date
              </option>
            </select>
          </div>
          <div className="input-group__item- select-filters border-green-">
            <DateRangePicker
              startDate={this.props.filtersfiledate.startDate}
              endDate={this.props.filtersfiledate.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filtersfiledate: state.filtersfiledate,
  linksfiledate: state.linksfiledate,
  hashtagsfiledate: state.hashtagsfiledate,
  setitfiledate: state.setitfiledate,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilterFileDate: (text) => dispatch(setTextFilterFileDate(text)),
  sortByDateFileDate: () => dispatch(sortByDateFileDate()),
  sortByDescriptionFileDate: () => dispatch(sortByDescriptionFileDate()),
  sortByHashTagFileDate: () => dispatch(sortByHashTagFileDate()),
  setStartDateFileDate: (startDate) =>
    dispatch(setStartDateFileDate(startDate)),
  setEndDateFileDate: (endDate) => dispatch(setEndDateFileDate(endDate)),
  sortByNoteTextFileDate: () => dispatch(sortByNoteTextFileDate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkListFiltersFileDate);
