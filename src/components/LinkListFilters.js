const DISPLAY_THIS_MANY_LINKS = 100;

const useButtons = false; //use buttons in display

import React, { useState, useRef, useEffect } from "react";
import ReadMore from "./ReadMore";
import LinkList from "./LinkList";
import ReadMoreSpan from "./ReadMoreSpan";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import database from "../firebase/firebase";
import redarrow from "../assets/images/red-arrow.jpg";
import * as firebase from "firebase";
import StorageSizes from "./StorageSizes";
import myprofile from "../assets/images/myprofile.png";
import signature from "../assets/images/sig-3.png";

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
  const [gmail, setGmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description");

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");
  const id = params.get("id");
  const myRef = useRef(null);

  let x = false;
  if (window.localStorage.getItem("hideinformation") === null) {
    window.localStorage.setItem("hideinformation", false);
  } else {
    window.localStorage.setItem("hideinformation", true);
    x = window.localStorage.getItem("hideinformation");
  }
  //
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

  useEffect(() => {
    console.log("AB props.links.length=" + props.links.length);
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
      setUid("XLFFo8DQ7LZh8oR8CnvBGInpjsZ2");
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
  //jkjsakldfja;lkfj;aslkdfj;jslkjfkdf;ja
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

  useEffect(() => {
    if (gmail !== "") window.document.getElementById("sendgmailid").click();
  }, [gmail]);

  const getGmail = () => {
    //console.log("getGmail")
    //const ugmail = window.document.getElementById('gmailid').value
    //console.log("ugmail="+ugmail)
    //setGmail(ugmail)
    setGmail("jmjohnmcgovern707@gmail.com");
  };

  const sep = (hashtag) => {
    //const hashtag = "#IReallyLoveGSAP";
    //const hashtag = "#IReallyLoveGsap";

    let words;
    if (!!hashtag === true) {
      words = hashtag
        .replace(/#/, "") // Remove the leading '#'
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before uppercase letters following lowercase
        .split(" "); // Split into an array of words

      console.log(words); // Output: ['I', 'Really', 'Love', 'GSAP']

      const sentence = words.join(" ");
      console.log(sentence);
      return sentence;
    }
    return "";
  };

  const handleSearch = () => {
    // Perform the search action here
    //console.log('Searching for:', this.state.searchTerm);
    // Example: this.props.onSearch(this.state.searchTerm);

    var select = document.getElementById("mode");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("handleSearch search, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value;
    let str = term.trim();
    term = str;
    if (selectedValue === "hashtag") {
      const words = term.split(/\s+/); // Split by one or more whitespace characters

      if (term.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }
      if (words.length !== 1) {
        alert("The search term needs to be one word.");
        return;
      }
    }
    //alert (term)
    props.setTextFilter(term);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const search = () => {
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
    props.setTextFilter(term);

    if (
      selectedValue === "hashtag" &&
      // && sortBy === "hashtag"
      props.filters.sortBy === "hashtag"
    ) {
      if (term !== "" && term.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

      if (term === "") {
        window.document.getElementById("termid").value = "#";
        window.localStorage.setItem("termid", "#");
        props.setTextFilter("#");
      } else {
        window.localStorage.setItem("termid", term);
        props.setTextFilter(term);
      }
    }
  };

  const onSortChange = (e) => {
    if (e.target.value === "none") return;

    const val = window.document.getElementById("termid").value.trim();
    //window.localStorage.setItem("termid", val);
    console.log("onSortChange=(), search term=, val=" + val);
    if (e.target.value === "description") {
      window.localStorage.setItem("sortBy", "description");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      //this.setState({ sortBy: "description" });
      setSortBy("description");
      props.sortByDescription();
      //this.setState({ sortBy: "description" });
    } else if (e.target.value === "hashtag") {
      window.localStorage.setItem("sortBy", "hashtag");
      if (val !== "" && val.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

      if (val === "") {
        //window.document.getElementById("termid").value = "#"
        props.setTextFilter("#");
        //window.localStorage.setItem("termid", "#");
      } else {
        //window.localStorage.setItem("termid", val);
        props.setTextFilter(val);
      }
      if (myRef.current) myRef.current.focus();
      //this.props.setTextFilter("#");

      //window.localStorage.setItem("sortBy", "hashtag");
      //this.setState({ sortBy: "hashtag" });
      setSortBy("hashtag");

      props.sortByHashTag();
      //this.setState({ sortBy: "hashtag" });
    } else if (e.target.value === "notetext") {
      window.localStorage.setItem("sortBy", "notetext");
      if (myRef.current) myRef.current.focus();
      //this.props.setTextFilter("");
      props.setTextFilter(val);
      //window.localStorage.setItem("sortBy", "notetext");
      //this.setState({ sortBy: "notetext" });
      setSortBy("notetext");
      props.sortByNoteText();
      //this.setState({ sortBy: "notetext" });
    }
  };

  //  const isMobile=()=>{
  //   const regex =
  //     /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  //   return regex.test(navigator.userAgent);
  // }

  return (
    <div className="bg-white-1">
      <div className="flexrowztt containerui-">
        {
          //props.signup === false &&

          <div className={`${useButtons===true?'width30p':'width30pt'}  scrollable-div`}>
            {/* <div className="flexrowzc2 text-size-1  font-weigth-bold padding-all text-center uppercase border5green">
           
                </div> */}

            <div className="border-right-5">
              <div
                className={`website-background-color ${
                  //useButtons===true
                  false?'width30p':'width30pt'} theHeight flexrowzc2 border-b-5 margin-left-n-19`}
                title="click a button"
              >
                categories
              </div>

              <div className={`${useButtons===true?' width30p':' width30pt'} width1001- border-right-5`}>
                {props.b === 1 && (
                  <button
                    className="button-mq button-2- button--link color-black margin-left-n-1"
                    onClick={toggleExpanded}
                  >
                    {expanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>

            <div className={`${useButtons===true?'width30p':'width30pt'} border2black- border-right-5 sticky-div-`}>
              <div className="containerhs-">
                <div
                  ref={props.ref1}
                  className={`${
                    newspaper === false
                      ? "grid-container5-"
                      : "grid-container5-newspaper-"
                  } background-white-1 borderradius5`}
                  title={
                    props.signup === true
                      ? "The buttons are disabled because the List All Public Links button is activated. These hastag buttons only work with your list of links"
                      : "The buttons are disabled because the List All Public Links button is activated or the People button is activated."
                  }
                >
                  {!expanded
                    ? //props.b === 1 &&
                      props.mappedDataShort.map((s, index) => {
                        if (index < 50)
                          return (
                            <div
                              key={index}
                              className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                            >
                              <a
                                className={`${
                                  //useButtons===true
                                  false?'b1xw':'ib width30pt flexrowzc22'} ${
                                    //useButtons===true
                                    false?'b1xw':''} nounderline ${
                                      //useButtons===true
                                      false?'color-white-1':''} ${
                                        //useButtons===true
                                        false?'button-link-4':''} ${
                                  props.b == 1
                                    ? "pointereventsauto"
                                    : "pointereventsnone"
                                }`}
                                href="#"
                                onClick={() => props.setit(s.hashtag, event)}
                                title={`${sep(s.hashtag)}, hashtag: ${
                                  !!s.hashtag && s.hashtag
                                }, click to scroll to results`}
                                //title={props.signup === true?${s.hashtag}, click to scroll to results:
                              >
                                {sep(s.hashtag)}
                              </a>
                            </div>
                          );
                        else return false;
                      })
                    : //props.b === 1 &&
                      props.mappedDataShort.map((s, index) => {
                        //have 3 map calls and display the first column then the second column and then the thrid column
                        return (
                          <div
                            key={index}
                            className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                          >
                            <a
                              className={`${
                                //useButtons===true
                                false?'b1xw':'ib width30pt flexrowzc22'} ${
                                  //useButtons===true
                                  false?'b1xw':''} nounderline ${
                                    //useButtons===true
                                    false?'color-white-1':''} ${
                                      //useButtons===true
                                      false?'button-link-4':''} ${
                                false && "border6"
                              } ${
                                props.b == 1
                                  ? "pointereventsauto"
                                  : "pointereventsnone"
                              }`}
                              href="#"
                              onClick={() => props.setit(s.hashtag, event)}
                              title={`${sep(s.hashtag)}, hashtag: ${
                                !!s.hashtag && s.hashtag
                              }, click to scroll to results`}
                            >
                              {sep(s.hashtag)}
                            </a>
                          </div>
                        );
                      })}

                  {props.mappedDataShort.length > 50 && !expanded && (
                    <span className="text-size-5">...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
        {/* {props.signup === true && (
        <div className="width30p-">
          <div className="flexrowzc2 text-size-1  font-weigth-bold padding-all text-center uppercase border5green">
           
          </div>
       
          
           <div className="border2black sticky-div-">
       <div className="containerhs-">
            <div
              ref={props.ref1}
              className={`${
                newspaper === false
                  ? "grid-container5-"
                  : "grid-container5-newspaper-"
              } paddingparent margin-top-1 background-white-1 borderradius5`}
              title={
                props.signup === true
                  ? "The buttons are disabled because the List All Public Links button is activated. These hastag buttons only work with your list of links"
                  : "The buttons are disabled because the List All Public Links button is activated or the People button is activated."
              }
            >
              {!expanded
                ? //props.b === 1 &&
                  props.mappedDataShort.map((s, index) => {
                    if (index < 50)
                      return (
                        <div
                          key={index}
                          className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                        >
                          <a
                            className={`b1x- b1xw nounderline color-white-1 button-link-4 ${
                              props.b == 1
                                ? "pointereventsauto"
                                : "pointereventsnone"
                            }`}
                            href="#"
                            onClick={() => props.setit(s.hashtag, event)}
                            title={`${sep(s.hashtag)}, hashtag: ${
                              !!s.hashtag && s.hashtag
                            }, click to scroll to results`}
                            //title={props.signup === true?${s.hashtag}, click to scroll to results:
                          >
                            {sep(s.hashtag)}
                          
                          </a>
                        </div>
                      );
                    else return false;
                  })
                : //props.b === 1 &&
                  props.mappedDataShort.map((s, index) => {
                    //have 3 map calls and display the first column then the second column and then the thrid column
                    return (
                      <div
                        key={index}
                        className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                      >
                        <a
                          className={`b1x- b1xw nounderline color-white-1 button-link-4 ${
                            false && "border6"
                          } ${
                            props.b == 1
                              ? "pointereventsauto"
                              : "pointereventsnone"
                          }`}
                          href="#"
                          onClick={() => props.setit(s.hashtag, event)}
                          title={`${sep(s.hashtag)}, hashtag: ${
                            !!s.hashtag && s.hashtag
                          }, click to scroll to results`}
                        >
                          {sep(s.hashtag)}
                          
                        </a>
                      </div>
                    );
                  })}

              

              {props.mappedDataShort.length > 50 && !expanded && (
                <span className="text-size-5">...</span>
              )}
            </div>
          </div>
          </div>


        </div>
      )} */}
        {/*this part was causing the gap in the middle*/}
        {/* {props.signup === true && (
        <div>
          <div className="flexrowzc2 text-size-1  font-weight-bold padding-all text-center uppercase">
            Welcome to Saint John's urilinks.com to help people, for church, 
            homeless, state, economic, entertainment links and their storage and retrieval
          </div>
        </div>
      )} */}
        {/* {props.signup === true && (
        <div className="flexrowzc2 text-size-1 textLeft margin-top-1">
          <span className="hide">Thank you. Your sharable link is:</span>
          <a
            href="#"
            ref={textAreaRef}
            className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
          >
            https://urilinks.com/dashboard?signup=0&id={props.uid}
          </a>
          <button
            className="button-2w ib margin-right-1 margin-left-11 border5"
            onClick={copyToClipboard}
            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
          >
            Copy sharable link
          </button>
          {copySuccess}
        </div>
      )} */}

        {/* {props.signup === false && (
        <div className="flexrowzc2 text-size-1 textLeft margin-top-1">
          <span className="hide">Thank you. Your sharable link is:</span>
          <a
            
            href="#"
            ref={textAreaRef}
            className="ib nounderline border5 padding-all2 borderradius55"
            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
          >
            https://urilinks.com/dashboard?signup=0&id={props.uid}
          </a>
          <button
            className="button-2w ib margin-right-1 margin-left-11 border5 pointereventsnone"
            onClick={copyToClipboard}
            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
          >
            Copy sharable link
          </button>
          {copySuccess}
        </div>
      )} */}

        {/* {props.signup === false && (
        <div></div>
      
      )} */}

        {props.mappedDataShort.length > 0 ? (
          <div className="width70p-">
            <div
              className="flexrow2c padding-left-a borderRadius4"
              title={props.signup === true ? "" : ""}
            >
              <div className="text-size-5 padding-top-11">
                {isMobile() === false ? (
                  <div className="flexrow2j margin-left-minus-3">
                    {props.signup === true || signup === "0" ? (
                      <div className="padding-top-1112  textCenter- hide">
                        <img
                          src={photoURL}
                          width="64"
                          height="64"
                          style={{ borderRadius: "50%" }}
                          className="ib- margin-bottom-11-"
                        />
                      </div>
                    ) : (
                      <div
                        className="padding-top-1112  textCenter-"
                        title="welcome"
                      >
                        {false ? (
                          <img
                            src={photoURL}
                            width="64"
                            height="64"
                            style={{ borderRadius: "50%" }}
                            className="ib- margin-bottom-11-"
                          />
                        ) : (
                          <div className="textCenter- hide">
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
                  </div>
                ) : (
                  <div className="flexrow2j margin-left-minus-2">
                    {props.signup === true || signup === "0" ? (
                      <div className="padding-top-1112  textCenter- hide">
                        <img
                          src={photoURL}
                          width="64"
                          height="64"
                          style={{ borderRadius: "50%" }}
                          className="ib- margin-bottom-11-"
                        />
                      </div>
                    ) : (
                      <div
                        className="padding-top-1112 textCenter-"
                        title="welcome"
                      >
                        {false ? (
                          <img
                            src={photoURL}
                            width="64"
                            height="64"
                            style={{ borderRadius: "50%" }}
                            className="ib- margin-bottom-11-"
                          />
                        ) : (
                          <div className="textCenter- hide">
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
                  </div>
                )}

                {isMobile() === true && (<div></div>
                  // <div className="flexrow2j margin-left-minus-2 margin-bottom-1">
                  //   <div className="text-size-1">
                  //     <div
                  //       className="ib text-size-1"
                  //       title="location for your gmail name"
                  //     >
                  //       {(!!theuser && props.signup === true) || signup === "0"
                  //         ? !!theuser.displayName === true
                  //           ? theuser.displayName
                  //           : "error getting display name"
                  //         : !!theuser === true
                  //           ? theuser.displayName
                  //           : "(gmail name)"}
                  //     </div>
                  //   </div>
                  // </div>
                )}

                {
                  //props.signup === false
                  true ? (
                    <div className="text-size-1 flexrowzc">
                      {isMobile() === true ? (
                        <div className="padding-right-11 padding-bottom-118 lowercase">
                          {props.signup === false && (
                            //props.signup !== 0
                            //signup !== 0
                            <span
                              // dangerouslySetInnerHTML={{
                              //   __html: `Mission: To kindly invite you to this friendly user interface to alphabetically save your links for revisitation and to provide one link for sharing your links with others on different websites like email of your choice, promoting worry free, and organized internet use.<br/><br/>`,
                              // }}
                            ></span>
                          )}

                          {/* <ReadMore
                            text={`Clear values: Each link you save has note space for data entry; link notes, link texts and hastags are all searchable; a sharable link for pasting to instagram profile or other platorm for others is provided; also, each link is sharable to facebook.com, linkedin.com and x.com; facebook.com messenger is available for communication; each link in the results is clickable for direct access to web page. Freely login.`}
                            maxChars={64}
                          /> */}
                        </div>
                      ) : (
                        <div>
                          {props.signup === false && (
                            //props.signup !== 0
                            //signup !== 0  &&
                            <span
                            //dangerouslySetInnerHTML={{ __html: `Mission: To kindly invite you to this friendly user interface to alphabetically save<br /> your links for revisitation and to provide one link for sharing your links<br /> with others on different websites like email of your choice.<br/><br/>`}}
                            ></span>
                          )}
                        </div>
                      )}

                      {props.signup === false && <div></div>}
                    </div>
                  ) : (
                    <div>
                      <div className="flexrow2c">
                        <div className="text-size-1 textLeft margin-top-1">
                          <a
                            href="#"
                            ref={textAreaRef}
                            className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                          >
                            https://urilinks.com/dashboard?signup=0&id=
                            {props.uid}
                          </a>
                          <button
                            className="button-2w ib margin-right-1 margin-left-11 border5"
                            onClick={copyToClipboard}
                            title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                          >
                            copy sharable link
                          </button>
                          {copySuccess}
                        </div>
                      </div>
                    </div>
                  )
                }

                <br />
              </div>

              <div className="flexrow2e">
                {
                  //isToggled &&

                  props.signup === true && (
                    <div
                      title="current plan"
                      className="margin-right-1 textLeft hide"
                    >
                      plan: {props.plan.replace(/"/g, "")}
                    </div>
                  )
                }

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
                        <span>
                          (It stores upto {StorageSizes.standard} links)
                        </span>
                      ) : (
                        <span></span>
                      )}
                      {props.theplan.plan.replace(/"/g, "") === "premium" ? (
                        <span>
                          (It stores upto {StorageSizes.premium} links)
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <div>
            <div className="margin-left-minus-1">
              <span>
                {props.links.length} of {maximum} links is stored on the{" "}
                {props.theplan.plan.replace(/"/g, "")}{" "}
                {`plan. ${
                  props.links.length > 100 ? 100 : props.links.length
                } are displayed.`}
              </span>
            </div>

            {/* <div className="margin-left-minus-1 margin-top-1 margin-left-11111- margin-bottom--n-11111">
              <span className="font-weight-bold uppercase-">
                ALPHABETICAL INDEX (click a button and see results)
              </span>
            </div> */}

            {/* <div
          id="before-before-link-summary-id"
          className="bg-color-2- bg-color2w borderRadius4- flexrow2w flexrowzv padding-top-111 padding-bottom-111"
        >
          <div className="flexrowzv">
            <div className="margin-left-11">
              <input
                title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                placeholder="type/paste what to find?"
                autoFocus
                id="termid"
                className="text-input responsive-input outline-none padding-left-11 borderRadius55"
                type="text"
                //value={this.state.dv}
                //onChange={(e) => this.setState({ searchTerm: e.target.value })}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div
              //className=`margin-left-11 ${this.isMobile()?"margin-right-1"`
              className={`${
                isMobile() ? "margin-right-1" : "margin-left-11"
              }`}
            >
              <button
                id="buttonid"
                className="button-3 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
                //className="b1x1 nounderline color-white-1 button-link-4 outline-none"

                //onClick={this.search}
                onClick={search}
                //title="Searches to find entered term through the previously selected list which will appear in copper color."
                title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
              >
                search
              </button>
            </div>

            <div
              className={`${
                isMobile()
                  ? "margin-top-11z1 margin-left-11"
                  : "margin-left-11"
              }`}
            >
              <select
                id="mode"
                className="select outline-none"
                //value={this.state.sortBy}
                value={sortBy}
                //value={this.props.filters.sortBy}
                //value={window.localStorage.getItem("sortBy")}

                onChange={onSortChange}
                title="Select one of these before pressing the search button. Hash Tag is the mode for searching through all of the hashtags, Link Text is the mode for searching through all of the link texts, Note Text is the mode for searching through all of the note texts"
              >
                <option value="hashtag" title="search by hash tag">
                  Hash Tag
                </option>

                <option
                  //selected
                  value="description"
                  title="search through the uri/url link texts"
                >
                  Link Text
                </option>

                <option value="notetext" title="search through the notes">
                  Note Text
                </option>
              </select>
            </div>
          </div>
        </div> */}

            {/* <div>
              {props.b === 1 && (
                <button
                  className="button-mq button-2- button--link color-black margin-left-n-1"
                  onClick={toggleExpanded}
                >
                  {expanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div> */}

            <div
              id="before-before-link-summary-id"
              className="padding-top-20 bg-color-2- bg-color2w borderRadius4- flexrow2w flexrowzv padding-top-111- padding-bottom-111- margin-bottom5"
            >
              <div className="flexrowzv">
                <div className="margin-left-11-">
                  <input
                    title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                    placeholder="type/paste what to find?"
                    autoFocus
                    id="termid"
                    className="text-input responsive-input outline-none padding-left-11 borderRadius55"
                    type="text"
                    //value={this.state.dv}
                    //onChange={(e) => this.setState({ searchTerm: e.target.value })}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>

                <div
                  //className=`margin-left-11 ${this.isMobile()?"margin-right-1"`
                  className={`${
                    isMobile() ? "margin-right-1" : "margin-left-11"
                  }`}
                >
                  <button
                    id="buttonid"
                    className="button-3 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
                    //className="b1x1 nounderline color-white-1 button-link-4 outline-none"

                    //onClick={this.search}
                    onClick={search}
                    //title="Searches to find entered term through the previously selected list which will appear in copper color."
                    title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
                  >
                    search
                  </button>
                </div>

                <div
                  className={`${
                    isMobile()
                      ? "margin-top-11z1 margin-left-11"
                      : "margin-left-11"
                  }`}
                >
                  <select
                    id="mode"
                    className="select outline-none"
                    //value={this.state.sortBy}
                    value={sortBy}
                    //value={this.props.filters.sortBy}
                    //value={window.localStorage.getItem("sortBy")}

                    onChange={onSortChange}
                    title="Select one of these before pressing the search button. Hash Tag is the mode for searching through all of the hashtags, Link Text is the mode for searching through all of the link texts, Note Text is the mode for searching through all of the note texts"
                  >
                    <option value="hashtag" title="search by hash tag">
                      Hash Tag
                    </option>

                    <option
                      //selected
                      value="description"
                      title="search through the uri/url link texts"
                    >
                      Link Text
                    </option>

                    <option value="notetext" title="search through the notes">
                      Note Text
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="margin-top-18 width800">
            <LinkList av={props.av} />
          </div>
        </div>
      </div>
    </div>
  );
}

export class LinkListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    // let morehashtags = window.localStorage.getItem("morehashtags");
    // let np = window.localStorage.getItem("newspaper");
    //console.log("constructor, LinkListFilter, morehashtags=" + morehashtags);
    let sb = "";
    //  if(window.localStorage.getItem("sortBy")===undefined)
    //   sb="description"
    // else sb = window.localStorage.getItem("sortBy")
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
      // newspaper:
      //   !!window.localStorage.getItem("newspaper") === "true" ? true : false,
      foldernamesList: [],
      isToggled: false,
      searchTerm: "", //,
    };

    this.setit = this.setit.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch() {
    // Perform the search action here
    //console.log('Searching for:', this.state.searchTerm);
    // Example: this.props.onSearch(this.state.searchTerm);

    var select = document.getElementById("mode");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("handleSearch search, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value;
    let str = term.trim();
    term = str;
    if (selectedValue === "hashtag") {
      const words = term.split(/\s+/); // Split by one or more whitespace characters

      if (term.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }
      if (words.length !== 1) {
        alert("The search term needs to be one word.");
        return;
      }
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
    //window.scrollTo(0, 0);
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

    // window.localStorage.setItem("searchLinks", e.target.value);
    // this.props.setTextFilter(e.target.value);
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

    /*
      //this.props.setTextFilter("");
      //if (this.myRef.current) this.myRef.current.focus();
      //window.localStorage.setItem("sortBy", "description");
      //this.setState({ sortBy: "description" });
      //this.props.sortByDescription();
    */
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
      if (val !== "" && val.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

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

  // componentDidMount() {
  //   this.props.setTheHashTagDivHeight(this.state.height);
  //   const morehashtags = window.localStorage.getItem("morehashtags");

  //   const searchLinks1 = window.localStorage.getItem("searchLinks1");
  //   const searchLinks2 = window.localStorage.getItem("searchLinks2");
  //   const searchLinks3 = window.localStorage.getItem("searchLinks3");
  //   const searchLinks4 = window.localStorage.getItem("searchLinks4");

  //   console.log("componentDidMount, searchLinks1=" + searchLinks1);
  //   console.log("componentDidMount, searchLinks2=" + searchLinks2);
  //   console.log("componentDidMount, searchLinks3=" + searchLinks3);
  //   console.log("componentDidMount, searchLinks4=" + searchLinks4);

  //   const sortBy = window.localStorage.getItem("sortBy");

  //   console.log("componentDidMount, sortBy=" + sortBy);

  //   // if (this.props.filters.sortBy === "date" || sortBy === "date") {
  //   //   this.props.setTextFilter(searchLinks1);

  //   //   this.props.sortByDate();
  //   //   this.setState({ sortBy: "date" });
  //   // } else

  //   if (sortBy === "description") {
  //     this.props.setTextFilter(searchLinks2);

  //     this.props.sortByDescription();
  //     this.setState({ sortBy: "description" });
  //   } else if (sortBy === "notetext") {
  //     this.props.setTextFilter(searchLinks4);
  //     this.props.sortByNoteText();
  //     this.setState({ sortBy: "notetext" });
  //   } else if (
  //     // this.props.filters.sortBy === "hashtag"
  //     //||
  //     sortBy === "hashtag"
  //   ) {
  //     if (
  //       //this.props.filters.text === "" ||
  //       searchLinks3 === "" ||
  //       searchLinks3 === undefined ||
  //       searchLinks3 === null
  //     ) {
  //       if (
  //         searchLinks3 === "" ||
  //         searchLinks3 === undefined ||
  //         searchLinks3 === null
  //       ) {
  //         this.props.setTextFilter("#");
  //       } else {
  //         this.props.setTextFilter(searchLinks3);
  //       }
  //     } else {
  //       this.props.setTextFilter(searchLinks3);
  //     }
  //     this.props.sortByHashTag();
  //     this.setState({ sortBy: "hashtag" });
  //   }

  //   if (this.myRef.current) this.myRef.current.focus();

  //   console.log(
  //     "VVVVVVVVVVVVVVVVVVVV, this.props.hashtags=" + this.props.hashtags
  //   );

  //   this.setState({
  //     morehashtags: morehashtags === "true" ? true : false,
  //   });

  //   console.log(
  //     "AAAA window.localStorage.getItem('sortBy')=" +
  //       window.localStorage.getItem("sortBy")
  //   );

  //   try {
  //     const term = window.localStorage.getItem("termid");

  //     window.document.getElementById("termid").value = term;

  //     if (sortBy === "hashtag" && term !== "" && term.charAt(0) === "#") {
  //       //window.document.getElementById("buttonid").click();
  //       window.document.querySelector("#buttonid").click();
  //     } else if (
  //       sortBy === "description" ||
  //       sortBy === "notetext" ||
  //       term === "" ||
  //       term.charAt(0) !== "#"
  //     ) {
  //       window.document.querySelector("#buttonid").click();
  //     }
  //   } catch (e) {
  //     //alert("componentDidMount,e="+e)
  //   }
  // }

  componentDidMount() {
    this.props.setTheHashTagDivHeight(this.state.height);
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

    //this scrolls the results into view, the first and subsequent result is shown
    // !!document.querySelector("#before-before-link-summary-id") &&
    //   document.querySelector("#before-before-link-summary-id").scrollIntoView({
    //     behavior: "smooth",
    //   });

    this.props.rerenderit();
    //window.scrollTo(0,0)
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
      if (term !== "" && term.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

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
                ref1={this.elementRef}
                morehashtags={this.state.morehashtags}
                setit={this.setit}
                theplan={this.props.theplan}
                plan={this.props.theplan.plan}
                newspaper={this.state.newspaper}
                signup={this.props.signup.signup}
                uid={this.props.auth.uid}
                links={this.props.links}
                b={this.props.b}
                setTextFilter={this.props.setTextFilter}
                sortByDescription={this.props.sortByDescription}
                sortByHashTag={this.props.sortByHashTag}
                sortByNoteText={this.props.sortByNoteText}
                filters={this.props.filters}
              />
            </div>
          )}
        </div>

        {/* <div
          id="before-before-link-summary-id"
          className="bg-color-2- bg-color2w borderRadius4- flexrow2w flexrowzv padding-top-111 padding-bottom-111"
        >
          <div className="flexrowzv">
            <div className="margin-left-11">
              <input
                title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                placeholder="type/paste what to find?"
                autoFocus
                id="termid"
                className="text-input responsive-input outline-none padding-left-11 borderRadius55"
                type="text"
                //value={this.state.dv}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                onKeyDown={this.handleKeyPress}
              />
            </div>

            <div
              //className=`margin-left-11 ${this.isMobile()?"margin-right-1"`
              className={`${
                this.isMobile() ? "margin-right-1" : "margin-left-11"
              }`}
            >
              <button
                id="buttonid"
                className="button-3 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
                //className="b1x1 nounderline color-white-1 button-link-4 outline-none"

                onClick={this.search}
                //title="Searches to find entered term through the previously selected list which will appear in copper color."
                title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
              >
                search
              </button>
            </div>

            <div
              className={`${
                this.isMobile()
                  ? "margin-top-11z1 margin-left-11"
                  : "margin-left-11"
              }`}
            >
              <select
                id="mode"
                className="select outline-none"
                value={this.state.sortBy}
                //value={this.props.filters.sortBy}
                //value={window.localStorage.getItem("sortBy")}

                onChange={this.onSortChange}
                title="Select one of these before pressing the search button. Hash Tag is the mode for searching through all of the hashtags, Link Text is the mode for searching through all of the link texts, Note Text is the mode for searching through all of the note texts"
              >
                <option value="hashtag" title="search by hash tag">
                  Hash Tag
                </option>

                <option
                  //selected
                  value="description"
                  title="search through the uri/url link texts"
                >
                  Link Text
                </option>

                <option value="notetext" title="search through the notes">
                  Note Text
                </option>
              </select>
            </div>
          </div>
        </div> */}
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

/* 1
<div>
  <div>
 <span className="">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div> 
             {this.props.signup.signup === true ?<div>
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
             }
             </div> 
*/

/* 2
 {
            //this.state.isToggled === true &&
            true && (
               
              <div className={`cursor-pointer ${this.isMobile()?"margin-top-11z1" :""}`}>
             
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
*/

/* 3
 {this.isMobile() === false && (
            <div
              className="cursor-pointer  margin-right-1 the-text-color"
              onClick={this.scrollUp}
              title="scroll to top"
            >
              (up)
            </div>
          )}
*/

/* 4
<option
                value="date"
                title="search through the uri/url link texts with a date range"
              >
                Date
              </option>
*/
