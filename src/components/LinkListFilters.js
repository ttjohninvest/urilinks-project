import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import database from "../firebase/firebase";
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
  const [expanded, setExpanded] = useState(props.morehashtags);
  const [uid, setUid] = useState("");
  const [theuser, setTheuser] = useState(firebase.auth().currentUser);
  const [copySuccess, setCopySuccess] = useState("");
  //const [max, setMax] = useState(250);
  const [newspaper, setNewspaper] = useState(props.newspaper);
  const textAreaRef = useRef(null);
  const [photoURL, setPhotoURL] = useState("");
  const [maximum, setMaximum] = useState(0);

  /*
  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");

  let x = false;
  if (window.localStorage.getItem("hideinformation") === null) {
    window.localStorage.setItem("hideinformation", false);
  } else {
    window.localStorage.setItem("hideinformation", true);
    x = window.localStorage.getItem("hideinformation");
  }
  
  const [isToggled, setIsToggled] = useState(x);

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleChange = () => {
    //let isT = !isToggled
    setIsToggled(!isToggled);

    window.localStorage.setItem("hideinformation", isToggled);
  };
*/
  useEffect(() => {
    console.log("1 LinkListFilters.js, props.b="+props.b)
  /*
    if (props.theplan.plan.replace(/"/g, "") === "free") {
      setMaximum(StorageSizes.free);
    } else if (props.theplan.plan.replace(/"/g, "") === "basic") {
      setMaximum(StorageSizes.basic);
    } else if (props.theplan.plan.replace(/"/g, "") === "standard") {
      setMaximum(StorageSizes.standard);
    } else if (props.theplan.plan.replace(/"/g, "") === "premium") {
      setMaximum(StorageSizes.premium);
    }

    const user = firebase.auth().currentUser;
    if (user !== null && user !== undefined) {
      setPhotoURL(user.photoURL);
    }
    if (props.signup === true) {
      const user = firebase.auth().currentUser;
      setUid(user.uid);
      setTheuser(user);
    } else {
      setUid("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1");
    }

    const x = window.localStorage.getItem("hideinformation");
    if (x === true) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
*/
  }, []);

  /*
  const moveIt = () => {
    window.scrollTo(0, props.elementRef.current.offsetHeight);
  };
  //jkjsakldfja;lkfj;aslkdfj;
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

  const copyToClipboard = (e) => {
    //this.textArea.select();
    const text = textAreaRef.current.innerText;
    console.log("Anchor text:", text);
    navigator.clipboard.writeText(text);
    //document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied " + text);
  };
*/
  return (
    <div className="bg-white-1">
      

          <div
            //ref={props.ref}
            className={`paddingparent margin-top-1 background-white-1 borderradius5`}
            title={""}
          >
            {
            //!expanded
             false  ? props.b === 1 && 
              props.mappedDataShort.map((s, index) => {
                  if (index < 50)
                    return (
                      <div
                        key={index}
                        className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                      >
                        <a
                          className="b1x nounderline color-white-1 button-link-4"
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
              : 
              props.b === 1 && 
              props.mappedDataShort.map((s, index) => {
                  //have 3 map calls and display the first column then the second column and then the thrid column
                  return (
                    <div
                      key={index}
                      className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                    >
                      <a
                        className="b1x  nounderline color-white-1 button-link-4"
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
                })
                
                }

           </div>
    </div>
  );
}


/*
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
*/
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
      foldernamesList: [],
      isToggled: false,
    };

    this.setit = this.setit.bind(this);
    console.log("1 LinkListFilters, this.props.b="+this.props.b)
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

  onFolderChange = (e) => {
    console.log("onSortChange2, e.target.value=" + e.target.value);
    //alert( "e.target.value="+e.target.value)
    this.props.setTextFilter(e.target.value);

    if (this.myRef.current) this.myRef.current.focus();
    window.localStorage.setItem("sortBy", "folder");
    //this.props.setTextFilter(e.target.value);
    this.setState({ sortBy: "folder" });

    this.props.sortByFolder();

    /*
      //this.props.setTextFilter("");
      //if (this.myRef.current) this.myRef.current.focus();
      //window.localStorage.setItem("sortBy", "description");
      //this.setState({ sortBy: "description" });
      //this.props.sortByDescription();
    */
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

  // removeDuplicates = (stringArray) => {
  //   const stringifiedArray = stringArray.join(" ");
  //   const lcstring = stringifiedArray.toLowerCase();
  //   const lcStringArray = lcstring.split(" ");
  //   return [...new Set(lcStringArray)];
  // };//

  removeDuplicatesByKey(array, keyFunction) {
    const seen = new Set();
    return array.filter((item) => {
      const key = keyFunction(item);
      const duplicate = seen.has(key);
      seen.add(key);
      return !duplicate;
    });
  }

  // truncate(str, maxLength) {
  //     const ellipsis = '...';
  //     return str.length > maxLength ? str.slice(0, maxLength - ellipsis.length) + ellipsis : str;
  // }

  // Example usage:
  //console.log(truncate("This is a very long string", 15)); // Output: "This is a very ..."

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     filenameList: [],
  //   };
  // }
  //kdjfakfj;d
  componentDidMount() {
    console.log("LinkListFilters, an2="+this.props.an2)
    console.log("LinkListFilters, this.props.b="+this.props.b)
    //props.history.push("/");
    //window.location.reload()
    //this.setState({ foldernamesList: [] });
    //const array1 = ['a','b']
    let tl = [];

    this.props.links.forEach(function (element) {
      if (!!element.foldername === true) {
        let str2 =
          element.foldername.length > 40
            ? element.foldername.slice(0, 40 - 3) + "..."
            : element.foldername;
        tl.push({ label: str2, value: element.foldername });
      }
    });

    tl.sort((a, b) => {
      return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
    });

    let tl2 = this.removeDuplicatesByKey(tl, (item) => item.value);

    this.setState({ foldernamesList: tl2 });
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
    //window.location.reload();
    window.location.href = "https://urilinks.com?signup=signup";
  };

  scrollDown = () => {
    let d = this.getHeight();
    window.scrollTo(0, d);
  };

  handleCheckboxShow = (event) => {
    // let result = confirm("Are you sure you want to set the dropdown list?");
    // if (result) {
    //alert("show dd")
    this.setState({ isToggled: !this.state.isToggled });
    console.log("show dd");
    // } else {
    //  //alert("cancel show dd")
    //  console.log("cancel show dd")
    // }
  };

  isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  render() {
    return (
      <div className="">
        <div>
          <span>this.props.b=</span>{this.props.b}
          {((this.props.hashtags && this.props.hashtags.length > 0) ||
            (this.state.mappedDataLong &&
              this.state.mappedDataLong.length > 1)) && (
            <div>
               <span>this.props.b=</span>{this.props.b}
               <ExpandableArray
                mappedDataShort={this.props.hashtags}
                mappedDataLong={this.state.mappedDataLong}
                maxLength={this.SHORT_HASHTAG_LENGTH}
                ref={this.elementRef}
                morehashtags={this.state.morehashtags}
                setit={this.setit}
                theplan={this.props.theplan}
                plan={this.props.theplan.plan}
                newspaper={this.state.newspaper}
                signup={this.props.signup.signup}
                uid={this.props.auth.uid}
                links={this.props.links}
                b={this.props.b}
              />
              <span>this.props.b=</span>{this.props.b}
            </div>
          )}
          <span>this.props.b=</span>{this.props.b}
        </div>

        <div
          id="before-before-link-summary-id"
          className="bg-color-2 borderRadius4- flexrow2w padding-top-111 padding-bottom-111"
        >
          <span>this.props.b=</span>{this.props.b}
          <div className="">
            <input
              id="termid"
              ref={this.myRef}
              type="text"
              className="text-input outline-none padding-left-11"
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

          {this.isMobile() === false && (
            <div
              className="cursor-pointer  margin-right-1 the-text-color"
              onClick={this.scrollUp}
              title="scroll to top"
            >
              (up)
            </div>
          )}

          <div className="">
            <select
              className="select outline-none"
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
              {/* <option
                value="date"
                title="search through the uri/url link texts with a date range"
              >
                Date
              </option> */}
            </select>
          </div>
          <div>
            {/* <div>
 <span className="">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div> */}
            {/* {this.props.signup.signup === true ?<div>
 <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsauto">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div>:
             <div>
 <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsnone">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div>
             } */}
          </div>
          {
            //this.state.isToggled === true &&
            true && (
              <div className="cursor-pointer">
                <select
                  className="select cursor-pointer"
                  onChange={this.onFolderChange}
                  title="pick a folder name in this list to search for its bookmarks"
                >
                  <option key={""} value={""}>
                    folder name
                  </option>

                  {this.state.foldernamesList.map((option, i) => (
                    <option
                      className="cursor-pointer"
                      key={option.value}
                      value={option.value}
                      title={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          }
          {/* <div className="">
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
          </div> */}
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
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNoteText: () => dispatch(sortByNoteText()),
  sortByFolder: () => dispatch(sortByFolder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
