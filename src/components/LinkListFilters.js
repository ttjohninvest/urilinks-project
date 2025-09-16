import React, { useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import database from "../firebase/firebase";
import * as firebase from "firebase";

import {
  setTextFilter,
  sortByDate,
  sortByDescription,
  sortByHashTag,
  setStartDate,
  setEndDate,
  sortByNoteText,
} from "../actions/filters";

function ExpandableArray(props) {
  const [expanded, setExpanded] = useState(props.morehashtags);
  const [uid, setUid] = useState("");
  const [newspaper, setNewspaper] = useState(props.newspaper);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUid(user.uid);
  }, []);

  const moveIt = () => {
    window.scrollTo(0, props.elementRef.current.offsetHeight);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    console.log("morehashtags");
    window.localStorage.setItem("morehashtags", !expanded);
  };

  const toggleNewspaper = () => {
    setNewspaper(!newspaper);
    console.log("newspaper");
    window.localStorage.setItem("newspaper", !newspaper);
  };

  console.log("ExpandableArray, expanded=" + expanded);
  //console.log("ExpandableArray, mappedDataLong.length="+props.mappedDataLong.length)
  console.log("props.mappedDataShort=" + props.mappedDataShort);
  console.log(
    "EEEEEEEEEEEEEEEEEEEE, ExpandableArray, mappedDataShort.length=" +
      props.mappedDataShort.length
  );
  let displayedArray;
  if (expanded === true) displayedArray = props.mappedDataLong;
  else displayedArray = props.mappedDataShort;

  //purpose: highlight the first letter of a hashtag to make it easier to see the alphabetical order
  const highlight = (v) => {
    return "color-white-1";

    //v is the first letter after #
    let cn = "";
    // v='a'

    if (v === "a") cn = "colorfora";
    else if (v === "b") cn = "colorforv";
    else if (v === "c") cn = "colorforc";
    else if (v === "d") cn = "colorford";
    else if (v === "e") cn = "colorfore";
    else if (v === "f") cn = "colorforf";
    else if (v === "g") cn = "colorforg";
    else if (v === "h") cn = "colorforh";
    else if (v === "i") cn = "colorfori";
    else if (v === "j") cn = "colorforj";
    else if (v === "k") cn = "colorfork";
    else if (v === "l") cn = "colorforl";
    else if (v === "m") cn = "colorform";
    else if (v === "n") cn = "colorforn";
    else if (v === "o") cn = "colorforo";
    else if (v === "p") cn = "colorforp";
    else if (v === "q") cn = "colorforq";
    else if (v === "r") cn = "colorforr";
    else if (v === "s") cn = "colorfors";
    else if (v === "t") cn = "colorfort";
    else if (v === "u") cn = "colorforu";
    else if (v === "v") cn = "colorforv";
    else if (v === "w") cn = "colorforw";
    else if (v === "x") cn = "colorforx";
    else if (v === "y") cn = "colorfory";
    else if (v === "z") cn = "colorforz";
    else cn = "color-white-1";

    return cn;
  };

  return (
    <div className="bg-white-1">
      {props.mappedDataShort.length > 0 ? (
        <div className="">
          <div
            className="flexrow2c padding-around padding-left-a borderRadius4"
            title="Alphabetical order, top to bottom, you may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag."
          >
            <div className="text-size-5">
              (welcome) clickable hash tags in alphabetical order
              <br />
              I believe that Jesus is the Christ. I believe that Jesus Christ is
              the Son of God.
              <br />
              Please go and sin no more, ok. Happy it.
              {/* <br />
              <button
                className="button-m button--link color-black"
                onClick={toggleNewspaper}
              >
                {newspaper ? "show other view" : "show other view"}
              </button> */}
            </div>

            <div className="flexrow2e">
              <div title="current plan">
                plan: {props.plan.replace(/"/g, "")}
              </div>
              <div className="margin-left-11">
                <Link className="header__title" to="/teirspayment3">
                  <span
                    className="ib color-black text-size-5 general-font"
                    title="click for plan options"
                  >
                    {uid !== "D9LSg6elood8Yc5gd5oDMp3JNAQ2" ||
                    uid === "RZOEMMu7Nwa5bQ51sf71FfDX3A93"
                      ? "(click to change plan)"
                      : ""}
                    {/* {props.plan.replace(/"/g, "") !== "premium" ? '(click to change plan)':""} */}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div
            ref={props.ref}
            className={`${
              newspaper === false
                ? "grid-container5"
                : "grid-container5-newspaper"
            } paddingparent margin-top-1 background-white-1 borderradius5`}
            title="Alphabetical order, top to bottom, you may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag."
          >
            {!expanded
              ? props.mappedDataShort.map((s, index) => {
                  if (index < 50)
                    return (
                      <div
                        key={index}
                        className="item-newspaper padding-all text-size-5 element5"
                      >
                        <a
                          className="nounderline color-white-1"
                          href="#"
                          onClick={() => props.setit(s.hashtag, event)}
                          title={`${s.hashtag}, click to scroll to results`}
                        >
                          {s.hashtag}
                          {/* {"#"}
                          <span className={`{${highlight(s.hashtag[1])}}`}>
                            {s.hashtag[1]}
                          </span>
                          {s.hashtag.substring(2)} */}
                        </a>
                      </div>
                    );
                  else return false;
                })
              : props.mappedDataShort.map((s, index) => {
                  //have 3 map calls and display the first column then the second column and then the thrid column
                  return (
                    <div
                      key={index}
                      className="item-newspaper padding-all text-size-5 element5"
                    >
                      <a
                        className="nounderline color-white-1 "
                        href="#"
                        onClick={() => props.setit(s.hashtag, event)}
                        title={`${s.hashtag}, click to scroll to results`}
                      >
                        {s.hashtag}
                        {/* {"#"}
                        <span className={highlight(s.hashtag[1])}>
                          {s.hashtag[1]}
                        </span>
                        {s.hashtag.substring(2)} */}
                      </a>
                    </div>
                  );
                })}

            {!expanded && <span className="text-size-5">...</span>}
          </div>
          <button
            className="button-m button--link color-black"
            onClick={toggleExpanded}
          >
            {expanded ? "Show Less Hashtags" : "Show More Hashtags"}
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {/* <div className="border2black">
       column b
        </div> */}
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class LinkListFilters extends React.Component {
  // morehashtags = window.localStorage.getItem("morehashtags");
  // np = window.localStorage.getItem("newspaper");

  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    // let morehashtags = window.localStorage.getItem("morehashtags");
    // let np = window.localStorage.getItem("newspaper");
    //console.log("constructor, LinkListFilter, morehashtags=" + morehashtags);
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
      morehashtags:
        window.localStorage.getItem("morehashtags") === "true" ? true : false,
      newspaper: true,
      // newspaper:
      //   !!window.localStorage.getItem("newspaper") === "true" ? true : false,
      technologyList:[],
    };

    this.setit = this.setit.bind(this);
  }

  scrollUp = () => {
    //window.scrollTo(0, 0);
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

    // window.localStorage.setItem("searchLinks", e.target.value);
    // this.props.setTextFilter(e.target.value);
  };

  onSortChange2 = (e) => {
    console.log("onSortChange2");

    //e.target.value //constains the folder name

    //this.props.sortByNoteText();
  };

  onSortChange = (e) => {
    console.log("onSortChange=(), e.target.value=" + e.target.value);
    if (e.target.value === "date") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortBy", "date");
      this.setState({ sortBy: "date" });
      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortBy", "description");
      this.setState({ sortBy: "description" });
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("#");
      window.localStorage.setItem("sortBy", "hashtag");
      this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTag();
    } else if (e.target.value === "notetext") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("");
      window.localStorage.setItem("sortBy", "notetext");
      this.setState({ sortBy: "notetext" });
      this.props.sortByNoteText();
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

    //const array1 = ['a','b']
  const tl = [];

  // Use forEach to populate the array of objects
  this.props.links.forEach(function(element) {
    tl.push({ label: element.foldername, value: element.foldername });
  });

 this.setState({ technologyList: tl });
    //get the plan from settings so I know how many links a person can have
    console.log(
      "In LinkListFilters.js, this.props.settings=" +
        JSON.stringify(this.props.settings)
    );
    //if(this.props.settings.plan===undefined)
    // const user = firebase.auth().currentUser;
    // database
    //   .ref(`users/${user.uid}/settings`)
    //   .once("value")
    //   .then((snapshot) => {

    //     console.log("componentDidMount, ...snapshot")
    //     console.log("componentDidMount, ...snapshot="+JSON.stringify(snapshot.val()))
    //     //console.log("componentDidMount, snapshot.selectedOption1="+snapshot.selectedOption1)

    //    //dispatch(setSettings({...snapshot}));

    //   })

    this.props.setTheHashTagDivHeight(this.state.height);
    const morehashtags = window.localStorage.getItem("morehashtags");

    const searchLinks1 = window.localStorage.getItem("searchLinks1");
    const searchLinks2 = window.localStorage.getItem("searchLinks2");
    const searchLinks3 = window.localStorage.getItem("searchLinks3");
    const searchLinks4 = window.localStorage.getItem("searchLinks4");

    console.log("componentDidMount, searchLinks1=" + searchLinks1);
    console.log("componentDidMount, searchLinks2=" + searchLinks2);
    console.log("componentDidMount, searchLinks3=" + searchLinks3);
    console.log("componentDidMount, searchLinks4=" + searchLinks4);

    const sortBy = window.localStorage.getItem("sortBy");
    console.log("componentDidMount, sortBy=" + sortBy);

    if (this.props.filters.sortBy === "date" || sortBy === "date") {
      this.props.setTextFilter(searchLinks1);

      this.props.sortByDate();
      this.setState({ sortBy: "date" });
    } else if (
      this.props.filters.sortBy === "description" ||
      sortBy === "description"
    ) {
      this.props.setTextFilter(searchLinks2);

      this.props.sortByDescription();
      this.setState({ sortBy: "description" });
    } else if (
      this.props.filters.sortBy === "notetext" ||
      sortBy === "notetext"
    ) {
      this.props.setTextFilter(searchLinks4);
      this.props.sortByNoteText();
      this.setState({ sortBy: "notetext" });
    } else if (
      this.props.filters.sortBy === "hashtag" ||
      sortBy === "hashtag"
    ) {
      //this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTag();
      if (
        this.props.filters.text === "" ||
        searchLinks3 === "" ||
        searchLinks3 === undefined ||
        searchLinks3 === null
      ) {
        if (
          searchLinks3 === "" ||
          searchLinks3 === undefined ||
          searchLinks3 === null
        ) {
          this.props.setTextFilter("#");
        } else {
          this.props.setTextFilter(searchLinks3);
        }
      } else {
        this.props.setTextFilter(searchLinks3);
      }
      this.setState({ sortBy: "hashtag" });
    }

    if (this.myRef.current) this.myRef.current.focus();

    console.log(
      "VVVVVVVVVVVVVVVVVVVV, this.props.hashtags=" + this.props.hashtags
    );

    this.setState({
      morehashtags: morehashtags === "true" ? true : false,
    });

    // this.setState({
    //   newspaper: !!this.state.newspaper === "true" ? true : false,
    // });
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

    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
  };

  refreshIt = () => {
    window.location.reload();
  };

  scrollDown = () => {
    let d = this.getHeight();
    window.scrollTo(0, d);
  };

  render() {
    return (
      <div className="content-container- border-green-">
        <div>
          {((this.props.hashtags && this.props.hashtags.length > 0) ||
            (this.state.mappedDataLong &&
              this.state.mappedDataLong.length > 1)) && (
            <div>
              {/* <div className="cursor-pointer" onClick={this.scrollDown}>scroll down past the hashtags</div> */}
              <ExpandableArray
                mappedDataShort={this.props.hashtags}
                mappedDataLong={this.state.mappedDataLong}
                maxLength={this.SHORT_HASHTAG_LENGTH}
                ref={this.elementRef}
                morehashtags={this.state.morehashtags}
                setit={this.setit}
                plan={this.props.theplan.plan}
                newspaper={this.state.newspaper}
              />
            </div>
          )}
        </div>

        <div
          id="before-before-link-summary-id"
          className="input-group some-component borderRadius4"
        >
          <div className="input-group__item">
            <input
              ref={this.myRef}
              type="text"
              className="text-input text-input-filters"
              placeholder={
                this.props.filters.sortBy === "date"
                  ? "Search for Link(s)"
                  : "Search for Link(s)"
              }
              value={this.props.filters.text}
              onChange={this.onTextChange}
              title={
                this.props.filters.sortBy === "date"
                  ? ""
                  : this.props.filters.sortBy === "description"
                  ? "Search for Link(s) (Please enter link description to find)"
                  : "Search for Link(s) (Please enter Hash Tag to find)"
              }
            />
          </div>

          <div
            className="header__title padding-top-11 cursor-pointer"
            onClick={this.scrollUp}
            title="scroll to top"
          >
            (up)
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
          <div className="input-group__item">
         
              <select>
        {this.state.technologyList.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
            
          </div>
          <div className="select-filters">
            <DateRangePicker
              className="zindex"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
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
  filters: state.filters,
  links: state.links,
  hashtags: state.hashtags,
  setit: state.setit,
  settings: state.settings,
  theplan: state.theplan,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNoteText: () => dispatch(sortByNoteText()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
