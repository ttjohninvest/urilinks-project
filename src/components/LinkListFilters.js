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
  

  let x = false;
  if (window.localStorage.getItem("hideinformation") === null) {
    window.localStorage.setItem("hideinformation", false);
  } else {
    window.localStorage.setItem("hideinformation", true);
    x = window.localStorage.getItem("hideinformation");
  }
  //
  const [isToggled, setIsToggled] = useState(x);

  const handleChange = () => {
    //let isT = !isToggled
    setIsToggled(!isToggled);

    window.localStorage.setItem("hideinformation", isToggled);
  };

  useEffect(() => {
     const user = firebase.auth().currentUser;
        if (user !== null && user !== undefined) {
          setPhotoURL(user.photoURL);
         
        }
    if (props.signup === true) {
      const user = firebase.auth().currentUser;
      setUid(user.uid);
      setTheuser(user)
    } else {
      setUid("W4XCM1PRqtZeAzCZ0ALlEFrIwaw1");
    }

    const x = window.localStorage.getItem("hideinformation");
    if (x === true) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }

    // const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    // console.log(
    //   "LinkListFilters.js, should be false, hasRefreshed=" + hasRefreshed
    // );
    // if (!hasRefreshed) {
    //   //sessionStorage.setItem('hasRefreshed', 'true');
    //   console.log("LinkListFilters.js, window.location.reload()");
    //   window.location.reload();
    // }
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
function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}


  return (
    <div className="bg-white-1">
      {props.mappedDataShort.length > 0 ? (
        <div className="">
          <div
            className="flexrow2c padding-left-a borderRadius4"
            title={props.signup === true ? 
              "Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag."
              : "Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags to see links that are grouped by this hash tag."}
          >
            <div className="text-size-5 padding-top-11 textCenter">


                {props.signup === true ? (
                <div className="padding-top-1112  textCenter">
                  <img
                    src={photoURL}
                    width="64"
                    height="64"
                    style={{ borderRadius: "50%" }}
                    className="ib- margin-bottom-11-"
                  />
                </div>
              ) : (
                <div className="padding-top-1112  textCenter" title="welcome">
                  {firebase.auth().currentUser !== null &&
                  firebase.auth().currentUser !== undefined ? (
                    <img
                      src={photoURL}
                      width="64"
                      height="64"
                      style={{ borderRadius: "50%" }}
                      className="ib- margin-bottom-11-"
                    />
                  ) : (<div className="textCenter">
                    <img
                      src={myprofile}
                      width="64"
                      height="64"
                      style={{ borderRadius: "50%" }}
                      className="ib- margin-bottom-11-"
                    />
                    </div>
                  )}
                </div>
              )}

              <div className="text-size-1 textCenter"><span className="text-size-9">{!!theuser && theuser.displayName}</span><span className="hide">, {!!theuser && theuser.email}</span></div>
              <div className="text-size-1 textLeft">Welcome {!theuser ? "to this example links page. What makes you smile?":", what makes you smile?"}</div>
              {/* <div className="text-size-1">WELCOME, WHAT MAKES YOU SMILE?</div> */}
 
{/* {isMobile()?"yes":"no"} */}
              {props.signup === false ? (
                <div className="text-size-1 textLeft">
                  <span className="font-weight-bold">
                    You can get your sharable link to share your links page with everybody by logging in, adding links and copy and pasting your link anywhere a link is accepted like youtube comments, instagram profile, facebook.
                  </span>
                </div>
              ) : (
                <div className="text-size-1 textLeft">
                  Thank you. Your sharable link is:
                  <a
                    href="#"
                    ref={textAreaRef}
                    className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                  >
                    https://urilinks.com/dashboard?signup=&id={props.uid}
                  </a>
                  <button
                    className="button-2 ib margin-right-1"
                    onClick={copyToClipboard}
                  >
                    Copy sharable link
                  </button>
                  {copySuccess}
                </div>
              )}

              <div className="text-size-1 textLeft">
                <span className="text-size-9">😃 </span>Your friendly link to links tool
                {isToggled && props.signup === false ? (
                  <span>
                    , click
                    <span>
                      <Link
                        className="cursor-pointer nounderline"
                        to="/signup"
                        title=""
                      >
                       
                        (enter)
                      </Link>
                    </span>
                  </span>
                ) : ""
                
                // (
                //   <button
                //     onClick={handleChange}
                //     className="margin-left-117 ib button-2 ib text-size-5 bg-color-1 borderradius55" //{`toggle-button ${isToggled ? 'on' : 'off'}`}
                //     aria-label="Toggle button"
                //   >
                //     {isToggled ? "hide information" : "show information"}
                //   </button>
                // )
                
                }
                {/* <button
      onClick={handleChange}
      className="margin-left-117 ib button-2 ib text-size-5 bg-color-1 borderradius55" //{`toggle-button ${isToggled ? 'on' : 'off'}`}
      aria-label="Toggle button"
    >
      {isToggled ? 'hide information' : 'show information'}
    </button> */}
                {isToggled && props.signup === false && (
                  <div className="text-size-1 textLeft">
                    To go inside (click enter) for an account, you get an
                    empty page to start adding your favorite links. <br />
                    You may add a note to each of your links.
                    <br />
                  </div>
                )}
                {isToggled && props.signup === true && (
                  <div className="text-size-1 textLeft">
                    You may start adding your favorite links using the Add
                    Link button below or Bookmarks File Uploader above.
                    <br />
                    The hashtags in purple rectangles and the folder names in
                    the dropdown list in the orange rectangle are added in
                    alphabetical order.
                    <br />
                    The hastags are the folder names read from the browser
                    bookmarks file with spaces removed and lowercased. The
                    folder names are copied in the drop down list.
                    <br />
                    You may add a note to each of your links.
                    <br />
                    You may share your links with linkedin, facebook, or
                    twitter/x
                    <br />
                    You may immediately chat about a bookmark with a family or
                    friend using facebook messenger, click the blue circle. You
                    just check if he she is online using fb messenger
                    <br />
                    and if so, send the bookmark and then chat about it
                  </div>
                )}
              </div>
              <br />
              {props.signup === false &&
                props.uid === "W4XCM1PRqtZeAzCZ0ALlEFrIwaw1" && (
                  <div className="textLeft">
                    <iframe
                      width="300"
                      height="200"
                      src="https://www.youtube.com/embed/RA8Lrtei90o?si=GOsCUPsODmw32y6p"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    >
                      
                    </iframe>
                  </div>
                )}
              {isToggled && props.signup === false && (
                <div className="textLeft">Click example hashtag to see links to webpages</div>
              )}

              {isToggled && props.signup === true && (
                <div className="textLeft">Click hashtag to see links to webpages</div>
              )}

              {isToggled && props.signup === false && (
                <div className="textLeft">
                  To see to see links to webpages, check out the search
                  folder name dropdown list
                </div>
              )}

              {isToggled && props.signup === true && (
                <div className="textLeft">
                  Check out the search folder name dropdown list in the orange
                  rectangle for folder names with links to webpages
                </div>
              )}

              {isToggled && props.signup === false && (
                <div className="textLeft">Please give it try to see how it works.</div>
              )}
              {/* {props.signup.signup === false && <div>Check out the search folder name dropdown list for example bookmarks in a folder</div>} */}
              {/* <br />
              I believe that Jesus is the Christ. I believe that Jesus Christ is
              the Son of God.
              <br />
              Please go and sin no more, ok. Happy it. */}
              {/* <br />
              <button
                className="button-m button--link color-black"
                onClick={toggleNewspaper}
              >
                {newspaper ? "show other view" : "show other view"}
              </button> */}
            </div>

            <div className="flexrow2e">
              {isToggled && props.signup === true && (
                <div title="current plan" className="margin-right-1 textLeft">
                  plan: {props.plan.replace(/"/g, "")}
                </div>
              )}

              {isToggled && props.signup === false && <div></div>}
              <div>
                {isToggled && props.signup === true && (
                  <div className="margin-right-1">
                    {props.theplan.plan.replace(/"/g, "") === "free" ? (
                      <span>(It stores upto {StorageSizes.free} links)</span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "basic" ? (
                      <span>(It stores upto {StorageSizes.basic} links)</span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "standard" ? (
                      <span>(It stores upto {StorageSizes.standard} links)</span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "premium" ? (
                      <span>(It stores upto {StorageSizes.premium} links)</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                )}
                {isToggled && props.signup === false && ""}
              </div>
              <div className="margin-left-11">
                <Link className="header__title" to="/teirspayment3">
                  <span
                    className="ib color-black text-size-5 general-font"
                    title="click for plan options"
                  >
                    {isToggled && props.signup === true && props.theplan.plan.replace(/"/g, "") !== "premium" && (
                      <span>(click to change plan)</span>
                    )}

                    {isToggled && props.signup === false && <span></span>}
                   
                  </span>
                </Link>
      
                 {props.signup === true ?<div><span>You have stored {props.links.length} links</span><span> on the {props.theplan.plan.replace(/"/g, "")} plan.</span></div>:
                 <div><span>{props.links.length} links stored</span></div>
                 }
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
            title={props.signup === true ?"Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag.":
"Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags which were entered in the note section to find your links that are grouped by hashtag."
            }
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
      isToggled:false
    }
 

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

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      filenameList: [],
    };
  }

  componentDidMount() {
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
      this.setState({isToggled:!this.state.isToggled})
      console.log("show dd")
    // } else {
    //  //alert("cancel show dd") 
    //  console.log("cancel show dd")
    // }
  };

  render() {
    return (
      <div className="">
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
                theplan={this.props.theplan}
                plan={this.props.theplan.plan}
                newspaper={this.state.newspaper}
                signup={this.props.signup.signup}
                uid={this.props.auth.uid}
                links={this.props.links}
              />
            </div>
          )}
        </div>

        <div
          id="before-before-link-summary-id"
          className="bg-color-2 borderRadius4- flexrow2w padding-top-111 padding-bottom-111"
        >
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

          <div
            className="cursor-pointer"
            onClick={this.scrollUp}
            title="scroll to top"
          >
            (up)
          </div>

          <div className="">
            <select
              className="select"
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
          true && <div className="cursor-pointer">
            <select
              className="select cursor-pointer"
              onChange={this.onFolderChange}
              title="pick a folder name in this list to search for its bookmarks"
            >
              <option key={""} value={""}>
                search folder name
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
          </div>}
          <div className="">
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
