const DISPLAY_THIS_MANY_LINKS = 100;
////
import React, { useState, useRef, useEffect } from "react";
import ReadMore from "./ReadMore";
import LinkList from "./LinkList";
import { LinkList3 } from "./LinkList3.js";
import honoring from "../assets/honoring/Frank-Caprio.png";
import CopyButton from "./CopyButton";
import HashTagsButton from "./HashTagsButton";
//import AddLinkPage from "./AddlinkPage";
import AddALinkButton from "./AddALinkButton";
import SeeHashTagsPage from "./SeeHashTagsPage.js";
import SendEmailPage from "./SendEmailPage";
import ReadMoreSpan from "./ReadMoreSpan";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";

import { DateRangePicker } from "react-dates";
import EmailForm from "./EmailForm";

import database from "../firebase/firebase";
import redarrow from "../assets/images/red-arrow.jpg";
//import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage
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
  sortByDateText,
  sortByViews,
  sortByLikes,
  sortByStar,
  sortByFolder,
} from "../actions/filters";

function ExpandableArray(props) {
  const [expanded, setExpanded] = useState(props.morehashtags);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [emailForm, showEmailForm] = useState(false);
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
  const [isForm2Open, setIsForm2Open] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isForm3Open, setIsForm3Open] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [aValue, setAValue] = useState(0);

  const myRef = useRef(null);
  const scrollInterval = useRef(null);

  const useButtons = false; //use buttons in display of categories

  const buttonRef = useRef(null);
  const scrolldownref7 = useRef(null);

  let x = false;
  if (window.localStorage.getItem("hideinformation") === null) {
    window.localStorage.setItem("hideinformation", false);
  } else {
    window.localStorage.setItem("hideinformation", true);
    x = window.localStorage.getItem("hideinformation");
  }
  //
  const [isToggled, setIsToggled] = useState(x);

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");
  const rt = params.get("x");
  const id = params.get("id");
  const z = params.get("z");

  const childRef = useRef(null);

  const handleStartScroll = (v) => {
    if (childRef.current) {
      childRef.current.startAutoScroll(v);
    }
  };

  const handleCancelScroll = () => {
    if (childRef.current) {
      childRef.current.cancelScroll();
    }
  };

  useEffect(() => {
    console.log(
      "ZZZZZ, props.mappedDataShort[0]=" +
        JSON.stringify(props.mappedDataShort[0]),
    );
    //before-before-link-summary-id
    if (z === 1)
      // !!document.querySelector("#results1") &&
      //   document.querySelector("#results1").scrollIntoView({
      //     behavior: "smooth",
      //   });
      !!document.querySelector("#before-before-link-summary-id") &&
        document
          .querySelector("#before-before-link-summary-id")
          .scrollIntoView({
            behavior: "smooth",
          });
  }, []);

  const startScrollingUp = () => {
    buttonRef.current.click();
    // Prevent multiple intervals
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      document.getElementById("ls").scrollBy({
        top: 1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      if (!!document.getElementById("ls") === true)
        if (
          document.getElementById("ls").scrollTop +
            document.getElementById("ls").clientHeight >=
          (document.getElementById("ls").scrollHeight - 2 ||
            document.getElementById("ls").scrollHeight + 2)
        ) {
          buttonRef.current.click();
          if (!!scrolldownref7 === true) scrolldownref7.current.click();
        }
    }, 20); // Every 20 milliseconds
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = null;
  };

  const startScrollingDown = () => {
    buttonRef.current.click();
    // Prevent multiple intervals
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      document.getElementById("ls").scrollBy({
        top: -1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      // Stop automatically when reaching the top
      if (!!document.getElementById("ls") === true)
        if (
          document.getElementById("ls").scrollTop === 0 ||
          document.getElementById("ls").scrollTop <= 2
        ) {
          buttonRef.current.click();

          //stopScrolling();
        }
    }, 20); // Every 20 milliseconds
  };

  const startWrite = () => {
    let content = "";
    for (let link of props.links) {
      content +=
        link.foldername + ", " + link.description + ", " + link.Url + "\n";
    }

    //write to express server that writes the text file
    fetch("https://urilinks-writefile-2.vercel.app", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      body: content,
    })
      .then((res) => {
        //alert("returned from writing the file")
        return res.json();
        // //console.log("data.clientSecret="+JSON.stringify(data)) //.clientSecret)
      })
      .then((data) => {
        console.log(
          "returned from writing the file with writeFile, https://urilinks-project-writefile.vercel",
        );
        //setClientSecret(data.clientSecret);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error),
      );
  };

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
    if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "free"
    ) {
      setMaximum(StorageSizes.free);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "basic"
    ) {
      setMaximum(StorageSizes.basic);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "standard"
    ) {
      setMaximum(StorageSizes.standard);
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "premium"
    ) {
      setMaximum(StorageSizes.premium);
    } else if (!!props.theplan.plan === false) {
      setMaximum(StorageSizes.free);
    }

    const user = firebase.auth().currentUser;
    if (user !== null && user !== undefined) {
      setPhotoURL(user.photoURL);
    }
    if (props.signup === true) {
      const user = firebase.auth().currentUser;
      setUid(user.uid);
      setEmail(user.email);
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

    //if(props.signup.signup===true) setShowComponent(true)
  }, []);

  const moveIt = () => {
    //window.scrollTo(0, props.elementRef.current.offsetHeight);
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
    //alert(1)
    //this.textArea.select();
    const text = textAreaRef.current.innerText;
    console.log("Anchor text:", text);
    navigator.clipboard.writeText(text);
    //document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    //e.target.focus();
    setCopySuccess("Copied "); // + text);
    //alert(6)
    setAValue(1);
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

  const rz = (s) => {
    s = s.replace(/0/g, "");
    return s;
  };

  const sep = (hashtag) => {
    //const hashtag = "#john";

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

  const isCorrectAccount = () => {
    if (uid === "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2") return true;
    return false;
  };

  //fggdd
  const vsep = (hashtag) => {
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
      const sentence2 = sentence.substring(14);
      console.log(sentence2);
      return sentence2;
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
    //alert("selectedValue=" + selectedValue);
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
    props.setTextFilter(term);
  };

  const handleKeyPress = (event) => {
    //alert("handleSearch1")
    if (event.key === "Enter") {
      //alert("handleSearch2")
      handleSearch();
    }
  };

  const search2 = (z) => {
    console.log("search");
    //const sortBy = window.localStorage.getItem("sortBy");
    var select = document.getElementById("mode");

    //var selectedValue = select.options[select.selectedIndex].value;
    var selectedValue;
    if (window.localStorage.getItem("sortBy") !== "")
      selectedValue = window.localStorage.getItem("sortBy");
    else selectedValue = select.options[select.selectedIndex].value;
    //console.log("search = () => {, selectedValue=" + selectedValue)
    console.log("1 selectedValue=" + selectedValue + ", term=" + term);
    let term = window.document.getElementById("termid").value.trim();
    //alert("1 selectedValue="+selectedValue+", term="+term)
    window.localStorage.setItem("termid", term);
    props.setTextFilter(term);

    if (
      selectedValue === "hashtag" &&
      // && sortBy === "hashtag"
      props.filters.sortBy === "hashtag"
    ) {
      // if (term !== "" && term.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }

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

  const search = (z) => {
    handleCancelScroll();
    console.log("search");
    //const sortBy = window.localStorage.getItem("sortBy");
    var select = document.getElementById("mode");

    //var selectedValue = select.options[select.selectedIndex].value;
    var selectedValue;
    if (window.localStorage.getItem("sortBy") !== "")
      selectedValue = window.localStorage.getItem("sortBy");
    else selectedValue = select.options[select.selectedIndex].value;
    //console.log("search = () => {, selectedValue=" + selectedValue)
    console.log("1 selectedValue=" + selectedValue + ", term=" + term);
    let term = window.document.getElementById("termid").value.trim();
    //alert("1 selectedValue="+selectedValue+", term="+term)
    window.localStorage.setItem("termid", term);
    props.setTextFilter(term);

    if (
      selectedValue === "hashtag" &&
      // && sortBy === "hashtag"
      props.filters.sortBy === "hashtag"
    ) {
      // if (term !== "" && term.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }

      if (term === "") {
        window.document.getElementById("termid").value = "#";
        window.localStorage.setItem("termid", "#");
        props.setTextFilter("#");
      } else {
        window.localStorage.setItem("termid", term);
        props.setTextFilter(term);
      }
    }

    //buttonRef.current.click();
    handleClose3();
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
  };

  const changeSortBy = (sv) => {
    //alert("sv="+"hashtag")
    //alert("sv="+sv)
    setSortBy(sv);
    //setSortBy("hashtag")
    //handleClose3();
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
  };

  const onSortChange = (e) => {
    handleCancelScroll();
    if (
      e.target.value === "none" ||
      e.target.value === undefined ||
      e.target.value === null
    )
      return;
    console.log("onSortChange, e.target.value=" + e.target.value);
    const val = window.document.getElementById("termid").value.trim();
    console.log("onSortChange, term=" + val);

    if (e.target.value === "description") {
      window.localStorage.setItem("sortBy", "description");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      setSortBy("description");
      props.sortByDescription();
    } else if (e.target.value === "notetext") {
      window.localStorage.setItem("sortBy", "notetext");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      setSortBy("notetext");
      props.sortByNoteText();
    } else if (e.target.value === "date") {
      window.localStorage.setItem("sortBy", "date");
      props.setTextFilter("");
      if (myRef.current) myRef.current.focus();
      setSortBy("date");
      props.sortByDateText();
    } else if (e.target.value === "hashtag") {
      window.localStorage.setItem("sortBy", "hashtag");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      setSortBy("hashtag");
      props.sortByHashTag();
    } else if (e.target.value === "hashtag") {
      window.localStorage.setItem("sortBy", "star");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      setSortBy("star");
      props.sortByStar();
    } else if (e.target.value === "views") {
      //alert("views")
      window.localStorage.setItem("sortBy", "views");
      if (myRef.current) myRef.current.focus();
      //this.props.setTextFilter("");
      props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      //this.setState({ sortBy: "notetext" });
      setSortBy("views");
      props.sortByViews();
      //alert("after call to props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    } else if (e.target.value === "likes") {
      window.localStorage.setItem("sortBy", "likes");
      if (myRef.current) myRef.current.focus();
      //this.props.setTextFilter("");
      props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      //this.setState({ sortBy: "notetext" });
      setSortBy("likes");
      props.sortByLikes();
      //alert("after call to props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    } else if (e.target.value === "star") {
      window.localStorage.setItem("sortBy", "star");
      if (myRef.current) myRef.current.focus();
      //this.props.setTextFilter("");
      props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      //this.setState({ sortBy: "notetext" });
      setSortBy("star");
      props.sortByStar();
      //alert("after call to props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    }
    //buttonRef.current.click();
    handleClose3();
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
  };

  //  const isMobile=()=>{
  //   const regex =
  //     /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  //   return regex.test(navigator.userAgent);
  // }

  const genVacation = (place) => {
    //const vacationdays = window.document.getElementById("vacationdays").value
    //alert("genVacation,vacationdays="+vacationdays+", place="+place)
    //window.open('https://www.rutugo.com/', '_blank');
    // https://travel-planner-main-2-481e769d0baf.herokuapp.com/
    window.open(
      "https://travel-planner-main-2-481e769d0baf.herokuapp.com",
      "_blank",
    );
  };

  const handleClose = (x) => {
    setIsFormOpen(false);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsFormOpen(true);

    showEmailForm(isFormOpen);
  };

  const setItNow = (index, ht, e) => {
    setActiveItem(index);
    props.setit(ht, e);

    handleClose3();
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
  };

  const seeHashTags = () => {
    setIsForm3Open(true);
  };

  const addALink = () => {
    setIsForm2Open(true);
  };

  const handleClose2 = () => {
    //alert("closeLink")
    setIsForm2Open(false);
  };

  const handleClose3 = () => {
    //alert("closeLink")
    setIsForm3Open(false);
  };

  return (
    <div className="bg-white-1">
      <div className="">
        <div
          className={`website-background-color width30pt
          } theHeight flexrowzc2 flexcol3 border-b-5font-roboto text-size-16 font-weight-500`}
          title="You are welcome to use this Internet Links Organizer Dashboard to add, view, delete and share your links with others." //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
          <div className="flexcol3">
            <div
              className={`ib- padding-left-n-x ${isMobile() === true ? "fleur-de-leah-regular2" : "fleur-de-leah-regular"}`}
              title="Internet Links Organizer Dashboard's Home Page"
            >
              Internet Links Organizer Dashboard's Home Page
            </div>
            {props.signup === false && (
              
              <div
 
                className={`ib- padding-left-n-x margin-top-1 margin-bottom-1 margin-left-n-7x`}
                title=""
              >
                To make money, you can add a text link ad with each link you
                have. Please try a user account today. Thank you so much.
                
              </div>
 
            )}
          </div>
        </div>
        <div className="width30menupanep">
          <button
            title="Click the button to begin auto scroll."
            onClick={startScrollingUp}
            className="button-2 widthxpx2"
          >
            ScrollUp
          </button>

          <button
            ref={buttonRef}
            id="stopscroll"
            title="Click the button to stop auto scroll."
            onClick={stopScrolling}
            className="button-2 ib margin-left-11"
          >
            Stop
          </button>

          <button
            ref={scrolldownref7}
            title="Click the button to begin auto scroll."
            onClick={startScrollingDown}
            className="ib button-2 margin-left-11"
          >
            ScrollDn
          </button>
        </div>
      </div>

      <div className="flexrowztt">
        {/* <div> */}
        <div>
          {/* left column scrollable-div1m for mobile*/}
          <div
            id="ls"
            className={`${isMobile() === true ? "width30menupane" : "width30menupane2"} scrollable-div1`}
            //onClick={()=>stopScrolling()}
          >
            <div className={`border-right-5`}>
              <div
                ref={props.ref1}
                className={`${""} background-white-1 borderradius5`}
                title={
                  props.signup === true
                    ? "The buttons are disabled because the List All Public Links button is activated. These hastag buttons only work with your list of links"
                    : "The buttons are disabled because the List All Public Links button is activated or the People button is activated."
                }
              >
                <div>
                  {props.mappedDataShort.map((s, index) => {
                    //have 3 map calls and display the first column then the second column and then the thrid column
                    //if (rt === "readonly" && s.showpublic === 0) return (<div></div>)
                    if (
                      //(rt === "readonly")  &&
                      s.showpublic === 0
                      //|| s.archive === 1
                    )
                      return null;
                    else
                      return (
                        <div key={index} className={``}>
                          {!!s.description2 === false ? null : (
                            <div className="text-size-5 border-bottom-5z border-left-5 padding-bottom-5z">
                              <a
                                className={`${activeItem === index ? "the-menu-item active" : "the-menu-item"} 
                                ib margin-top-1 ${
                                  props.b == 1
                                    ? "pointereventsauto underline"
                                    : "pointereventsnone"
                                }`}
                                style={{ whiteSpace: "pre-wrap" }}
                                href="#"
                                onClick={() =>
                                  setItNow(index, s.description, event)
                                }
                                title={`click to see results`}
                              >
                                <span>{s.description2}</span>
                              </a>
                              <br />

                              <span
                                className="ib margin-left-11z"
                                style={{
                                  color: "black",
                                  fontSize: ".9rem",
                                  textDecoration: "none",
                                  fontWeight: "normal",
                                  pointerEvents: "none",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {s.matchesstring}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*right column code here*/}
        <div className="margin-top-n-x">
          <div>
            <div>
              {/* {isMobile() === true && <span className="ib margin-left-11">
                  {props.links.length} of {maximum} links is stored on the{" "}
                  {!!props.theplan.plan && props.theplan.plan.replace(/"/g, "")}
                  {" plan."} 
                </span>}*/}
              {isMobile() === true && (
                <div className="ib margin-left-11 margin-bottom-1">
                  {props.links.length === 1
                    ? "1 link is displayed."
                    : `${props.links.length} links are displayed.`}
                </div>
              )}
              {isMobile() === true ? (
                <div className="margin-left-11 margin-bottom-1 flexcol3">
                  {props.signup === true && (
                    <span>
                      <div className="">
                        <div className="flexcol3">
                          <fieldset className="flexcol3 width325 padding-bottom-11 margin-bottom-1-">
                            <legend>Your Link:</legend>
                            <div className="text-size-1">
                              <a
                                href="#"
                                ref={textAreaRef}
                                className={`ib nounderline pointereventsnone borderLightOrange- padding-all2 borderradius55 ${isMobile() === false ? "" : "width295"}`}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                https://urilinks.com/dashboard?signup=0&x=readonly&id=
                                {props.uid}
                              </a>
                            </div>
                            <div className="margin-bottom-1">
                              {/* <button
                                className={`margin-left-11- height48 button-2w ib ${isMobile() === false ? "" : "width295 margin-top-1"}`}
                                onClick={()=>copyToClipboard()}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                              >
                                <span className="ib height48">
                                  Copy
                                  
                                </span>
                              </button> */}
                              <CopyButton
                                textToCopy={`https://urilinks.com/dashboard?signup=0&x=readonly&id=${props.uid}`}
                              />
                              {copySuccess}
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </span>
                  )}
                  {props.signup === false && (
                    <span>
                      <div className="">
                        <div className="flexcol3">
                          <fieldset className="flexcol3 width325 padding-bottom-11 margin-bottom-1-">
                            <legend>Your Link:</legend>
                            <div className="text-size-1">
                              <a
                                href="#"
                                ref={textAreaRef}
                                className={`ib nounderline pointereventsnone border5- borderLightOrange padding-all2 borderradius55 ${isMobile() === false ? "" : "width295"}`}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                https://urilinks.com/dashboard?signup=0&x=readonly&id=
                                {props.uid}
                              </a>
                            </div>
                            <div className="margin-bottom-1">
                              {/* <button
                                className={`height48 button-2w ib border5- ${isMobile() === false ? "" : "width295 margin-top-1"}`}
                                onClick={()=>copyToClipboard()}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                              >
                                <span className="ib height48">
                                  Copy
                                  
                                </span>
                              </button> */}
                              <CopyButton
                                textToCopy={`https://urilinks.com/dashboard?signup=0&x=readonly&id=${props.uid}`}
                              />
                              {/* {copySuccess} */}
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </span>
                  )}

                  {props.signup === true && rt !== "readonly" ? (
                    <div className="">
                      {/*end email is not working in mobile phone*/}
                      {/* <a
                        target="_blank"
                        id="adlinkid"
                        href="#"
                        title="Email your sharable link to share with others."
                        className={`cursor-pointer width325 button-2 color-white-1 borderRadius55 ${rt === "readonly" ? "pointereventsnone" : ""} `}
                        onClick={handleClick}
                      >
                        <span className="ib color-white-1">
                          Email your link
                        </span>
                      </a>
                      <button
                        className={`ib ${isMobile()===false?'margin-left-11':'margin-top-1'} button-2 bg-shade-1`}
                        onClick={addALink}
                        title="Add a link to your page."
                      >
                        Add A link
                      </button> */}
                      {/* <AddALinkButton /> */}
                      {/* {isForm2Open && (
                        <AddLinkPage
                          isForm2Open={isForm2Open}
                          closeLink={handleClose2}
                        />
                      )} */}

                      {/* <button
                        className={`ib button-2 margin-left-11 ${isMobile() === false ? "" : "margin-top-1"}`}
                        onClick={seeHashTags}
                        title="See hashtags"
                      >
                        See Hashtags
                      </button> */}
                      <HashTagsButton
                        changeSortBy={changeSortBy}
                        //setSortBy={setSortBy}
                      />

                      {
                        //emailForm &&
                        isFormOpen && (
                          <SendEmailPage
                            sharablelink={`Please click on: https://urilinks.com/dashboard?signup=0&x=readonly&id=${uid}`}
                            uid={uid}
                            isFormOpen={isFormOpen}
                            handleClose={handleClose}
                          />
                        )
                      }
                    </div>
                  ) : (
                    <div className="minWidth- bg-color-4"></div>
                  )}
                </div>
              ) : (
                <div className="margin-left-11 flexcol3">
                  {props.signup === true && (
                    <span>
                      <div className="margin-bottom-123">
                        <div className="flexrow2cv2">
                          <div className="flexcol3 text-size-1 textLeft- margin-top-1- margin-bottom-1">
                            <div>
                              <a
                                href="#"
                                ref={textAreaRef}
                                className={`ib borderWidth2 nounderline pointereventsnone border5- borderLightOrange padding-all2 borderradius55 ${isMobile() === false ? "" : "width325"}`}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                https://urilinks.com/dashboard?signup=0&x=readonly&id=
                                {props.uid}
                              </a>
                            </div>
                            <div>
                              {/* <button
                                className={` height48 button-2w ib margin-right-1 border5- ${isMobile() === false ? "" : "margin-top-1"}`}
                                onClick={()=>copyToClipboard()}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                              >
                                <span className="">
                                  Copy
                                  
                                </span>
                              </button> */}
                              <CopyButton
                                textToCopy={`https://urilinks.com/dashboard?signup=0&x=readonly&id=${props.uid}`}
                              />
                              {copySuccess}
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  )}
                  {props.signup === false && (
                    <span>
                      <div className="margin-bottom-123">
                        <div className="flexrow2cv2">
                          <div className="flexcol3 text-size-1 textLeft- margin-top-1- margin-bottom-1">
                            <div>
                              <a
                                href="#"
                                ref={textAreaRef}
                                className="ib borderWidth2 nounderline pointereventsnone border5- borderLightOrange padding-all2 borderradius55"
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                https://urilinks.com/dashboard?signup=0&x=readonly&id=
                                {props.uid}
                              </a>
                            </div>
                            <div>
                              {/* <button
                                className="button-2w height48 ib margin-right-1 border5- pointereventsnone"
                                onClick={()=>copyToClipboard()}
                                title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                              >
                                Copy
                                
                              </button> */}
                              <CopyButton
                                textToCopy={`https://urilinks.com/dashboard?signup=0&x=readonly&id=${props.uid}`}
                              />
                              {copySuccess}
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  )}

                  {props.signup === true && rt !== "readonly" ? (
                    <div
                      id="before-before-link-summary-id"
                      className="margin-bottom-1"
                    >
                      <a
                        target="_blank"
                        id="adlinkid"
                        href="#"
                        title="Email your sharable link to share with others. Email recipient sees readonly page"
                        className={`ib flexrowzc2 cursor-pointer width400 button-2 borderRadius55 ${rt === "readonly" ? "pointereventsnone" : ""} `}
                        onClick={handleClick}
                      >
                        <span className="ib color-white-1">
                          Email your link
                        </span>
                      </a>
                      {/* <button
                        className={`ib ${isMobile() === false ? "margin-left-11" : "margin-top-1"} button-2 bg-shade-1`}
                        onClick={addALink}
                        title="Add a link to your page."
                      >
                        Add A link
                      </button> */}
                      <AddALinkButton />
                      {/* {isForm2Open && (
                        <AddLinkPage
                          isForm2Open={isForm2Open}
                          handleClose2={handleClose2}
                        />
                      )} */}

                      {/* <button
                        className={`ib button-2 margin-left-11 ${isMobile() === false ? "" : "margin-top-1"}`}
                        onClick={seeHashTags}
                        title="See hashtags"
                      >
                        See Hashtags
                      </button> */}

                      <HashTagsButton
                        changeSortBy={changeSortBy}
                        //setSortBy={setSortBy}
                      />

                      {
                        //emailForm &&
                        isFormOpen && (
                          <SendEmailPage
                            sharablelink={`Please click on: https://urilinks.com/dashboard?signup=0&x=readonly&id=${uid}`}
                            uid={uid}
                            isFormOpen={isFormOpen}
                            handleClose={handleClose}
                          />
                        )
                      }
                    </div>
                  ) : (
                    <div className="bg-color-4"></div>
                  )}
                </div>
              )}

              <div
                //id="before-before-link-summary-id"
                className=""
              >
                {isMobile() === true ? (
                  <div className="flexcol3a border5-">
                    <div className="border5-">
                      <input
                        title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                        placeholder="search field"
                        autoFocus
                        id="termid"
                        className={`margin-left-11 width325 searchinput`}
                        //className={`width325 searchinput`}
                        type="text"
                        //value={this.state.dv}
                        //onChange={(e) => this.setState({ searchTerm: e.target.value })}
                        //onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>

                    <div
                      className={`margin-right-1 margin-left-11 margin-top-1 border5-`}
                    >
                      <button
                        id="buttonid"
                        className={`ib ${isMobile() === true ? "width325" : ""} button-2 color-white-1 cursor-pointer font-weight-bold borderRadius55`}
                        //className="b1x1 nounderline color-white-1 button-link-4 outline-none"

                        //onClick={this.search}
                        onClick={() => search()}
                        ////title="Searches to find entered term through the previously selected list which will appear in copper color."
                        title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
                      >
                        Search
                      </button>
                    </div>

                    <div
                      className={`margin-right-1 margin-left-11 margin-top-1 border5-`}
                    >
                      <button
                        id="buttonid2"
                        className={`${isMobile() === true ? "width325" : ""} button-2 color-white-1 cursor-pointer font-weight-bold borderRadius55`}
                        style={{ visibility: "hidden" }}
                        //className="b1x1 nounderline color-white-1 button-link-4 outline-none"

                        //onClick={this.search}
                        onClick={() => search2()}
                        ////title="Searches to find entered term through the previously selected list which will appear in copper color."
                        title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
                      >
                        Search
                      </button>
                    </div>

                    <div className={`margin-top-n-1z margin-left-11 border5- margin-top-1`}>
                      <select
                        id="mode"
                        className="select outline-none borderRadius55"
                        //value={this.state.sortBy}
                        value={sortBy}
                        //value={this.props.filters.sortBy}
                        //value={window.localStorage.getItem("sortBy")}

                        onChange={onSortChange}
                        title="Select one of these before pressing the search button. Hash Tag is the mode for searching through all of the hashtags, Link Text is the mode for searching through all of the link texts, Note Text is the mode for searching through all of the note texts"
                      >
                        <optgroup label="Find:">
                          <option value="hashtag" title="search by hash tag">
                            Hash Tag Search
                          </option>

                          <option
                            //selected
                            value="description"
                            title="search through the uri/url link texts"
                          >
                            Link Text Search
                          </option>

                          <option
                            value="notetext"
                            title="search through the notes"
                          >
                            Note Text Search
                          </option>
                        </optgroup>
                        <optgroup label="Link Updates:">
                          <option
                            value="date"
                            title="Results appear in date and time descending order"
                          >
                            Date And Time Sort (Descending Order)
                          </option>
                        </optgroup>
                        <optgroup label="Popularity:">
                          {/* <option className="ib"
                            style={{
                              borderBottom: "1px solid #dee2e6",
                              margin: "0.5rem 0",
                            }}
                          ></option> */}
                          <option
                            value="views"
                            title="sort views into descending order"
                          >
                            Views Sort (Descending Order)
                          </option>
                          <option
                            value="likes"
                            title="sort likes into descending order"
                          >
                            Likes Sort (Descending Order)
                          </option>
                          <option value="star" title="show your top ten">
                            My Top Ten
                          </option>
                        </optgroup>
                      </select>
                    </div>
                    {/* <button className="ib margin-left-11 button-2" onClick={seeHashTags} title="See hashtags">See Hashtags</button> */}
                    {/* {isForm3Open && (
                      <div></div>
                      // <SeeHashTagsPage
                      //   changeSortBy={changeSortBy}
                      //   isForm3Open={isForm3Open}
                      //   handleClose3={handleClose3}
                      // />
                    )} */}
                  </div>
                ) : (
                  <div className="flexrowzv margin-top-1t1 margin-bottom-1">
                    <div className="">
                      <input
                        title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                        placeholder="search field"
                        autoFocus
                        id="termid"
                        className={`margin-left-11 width400 searchinput`}
                        //className={`width325 searchinput`}
                        type="text"
                        //value={this.state.dv}
                        //onChange={(e) => this.setState({ searchTerm: e.target.value })}

                        //onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>

                    <div
                      //className=`margin-left-11 ${this.isMobile()?"margin-right-1"`
                      className={`margin-left-11`}
                    >
                      <button
                        id="buttonid"
                        //className="button-3- button-2 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
                        className={`ib ${isMobile() === true ? "width325" : ""} button-2 color-white-1 cursor-pointer font-weight-bold borderRadius55`}
                        //onClick={this.search}
                        onClick={() => search()}
                        //title="Searches to find entered term through the previously selected list which will appear in copper color."
                        title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
                      >
                        Search
                      </button>
                    </div>

                    <div className={`margin-left-11 margin-top-1`}>
                      <select
                        id="mode"
                        className="select outline-none borderRadius55"
                        //value={this.state.sortBy}
                        value={sortBy}
                        //value={this.props.filters.sortBy}
                        //value={window.localStorage.getItem("sortBy")}

                        onChange={onSortChange}
                        title="Select one of these before pressing the search button. Hash Tag is the mode for searching through all of the hashtags, Link Text is the mode for searching through all of the link texts, Note Text is the mode for searching through all of the note texts"
                      >
                        <optgroup label="Find:">
                          <option value="hashtag" title="search by hash tag">
                            Hash Tag Search
                          </option>

                          <option
                            //selected
                            value="description"
                            title="search through the uri/url link texts"
                          >
                            Link Text Search
                          </option>

                          <option
                            value="notetext"
                            title="search through the notes"
                          >
                            Note Text Search
                          </option>
                        </optgroup>
                        <optgroup label="Link Updates:">
                          <option
                            value="date"
                            title="Results appear in date and time descending order"
                          >
                            Date And Time Sort (Descending Order)
                          </option>
                        </optgroup>
                        <optgroup label="Popularity:">
                          <option
                            value="views"
                            title="sort views into descending order"
                          >
                            Views Sort (Descending Order)
                          </option>
                          <option
                            value="likes"
                            title="sort likes into descending order"
                          >
                            Likes Sort (Descending Order)
                          </option>
                          <option value="star" title="show your top ten">
                            My Top Ten
                          </option>
                        </optgroup>
                      </select>
                    </div>

                    {/* {isForm3Open && (
                      <SeeHashTagsPage
                        changeSortBy={changeSortBy}
                        isForm3Open={isForm3Open}
                        handleClose3={handleClose3}
                      />
                    )} */}
                  </div>
                )}
              </div>
            </div>
            {/* column 2 is the following div */}
            <div id="results1" className={`margin-top-18`}>
              {/* <button onClick={handleStartScroll}>Start Auto Scroll</button>
              <button onClick={handleCancelScroll}>Cancel Auto Scroll</button> */}
              <LinkList3
                av={props.av}
                ref={childRef}
                handleStartScroll={handleStartScroll}
              />
            </div>
          </div>
        </div>
        {/*begins third column*/}

        {isMobile() === false && (
          <div
            style={{ borderRadius: "5px" }}
            className="flexcol3 borderLightOrange widthxy- width100 margin-left-11 margin-right-1 margin-top-n-x2 padding1"
          >
            {props.signup === false && (
              <div>
                <div className="margin-bottom-1">Honoring This Week:</div>
                <div className="flexrowzc2">
                  <img src={honoring} width="150" height="200" className="ib" />
                  <div className="margin-bottom-1">
                    Frank Caprio, Compassionate Judge
                  </div>
                </div>
              </div>
            )}

            <div className="margin-bottom-1">❤️ Benefits for you and me:It is made with love and care. It works. You can make money with text ads. It has search and sort. It is user friendy. You can share your links with one url. You can see end points of links that you have saved. You can help charities that I give to like church and mercyships.org. My phone number is 775 559 5740, John, Mr McGovern. Please try a user account today. Thank you so much.</div>

            <div>
              {/* ❤️ Hi, I appreciate that you are here. Please say 'I call upon the name of Jesus Christ to save me.' This wonderful invitation is in Romans 10:13 which says that for whosoever shall call upon the name of Jesus Christ shall be saved." */}
              🙂 URILINKS INSTRUCTIONS TO ORGANIZE, SAVE, FIND, LOOK AT LINK END-POINTS AND SHARE PAGE OF LINK(S) WITH URL:
              <br />
              <br />
              ✮ Use Bookmarks upload to upload a bookmarks.html file that is
              less than 100k.
              <br />
              <br />
              ✮ Use Add A Link to add 1 link.
              <br />
              <br />
              ✮ To make money, use the Edit Link link to add a text ad for each
              link you have to earn commission like from clickbank.com. For as
              many links that you have, you can ad a text ad for each one. All
              of the commission that clickbank has for you will go to you. You
              will find the Edit Link link with each displayed link.
              <br />
              <br />
              ✮ It has autoscroll.
              <br />
              <br />
              ✮ I you add new links to your page, everybody that has your shared page sees your new links.
              <br />
              <br />
              ✮ Use the search field to add word(s) to search for.
              <br />
              <br />
              ✮ Use the drop down list to the right of the search button to
              select the type of search to find or sort by popularity (hashtag,
              link text, note text or Date Time (Latest First), Views, Likes, My
              Top Ten). if word(s) are entered in the search field, the search
              will activate. A selection for popularity, the sort will activate.
              <br />
              <br />
              ✮ If you want a link to be findable under two different hashtags,
              add the hashtag to the note section. The system will not store
              duplicate link titles.
              <br />
              <br />
              ✮ Use the search button to activate the search.
              <br />
              <br />
              ✮ Use the left pane menu to select a link.
              <br />
              <br />
              ✮ Use the content section to the right of the left pane menu to
              see left pane menu selections and search results.
              <br />
              <br />
              ✮ In the content section you can click on any of the links and the
              website will open in a new tab for viewing.
              <br />
              <br />
              ✮ Click copy to copy your sharable link. Paste it were you want.
              <br />
              <br />
              ✮ Click email your link to open up a form to to enter recipient's
              email address and subject line.
              <br />
              <br />
              ✮ Click the ScrollUp button to start automatic scrolling up.
              <br />
              <br />
              ✮ Click the Stop button to stop automatic scrolling.
              <br />
              <br />
              ✮ Click the ScrollDn button to start automatic scrolling down.
              <br />
              <br />
            </div>
          </div>
        )}
        {/*ends third column*/}
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

  scrollDown = () => {
    let d = this.getHeight();
    //window.scrollTo(0, d);
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
    } else if (e.target.value === "date") {
      window.localStorage.setItem("sortBy", "date");
      if (this.myRef.current) this.myRef.current.focus();

      this.props.setDateFilter("");

      this.setState({ sortBy: "date" });
      this.props.sortByDateText();
    } else if (e.target.value === "views") {
      window.localStorage.setItem("sortBy", "views");
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("");
      this.props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      this.setState({ sortBy: "views" });
      this.props.sortByViews();
      //alert("after call to this.props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    } else if (e.target.value === "likes") {
      window.localStorage.setItem("sortBy", "likes");
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("");
      this.props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      this.setState({ sortBy: "likes" });
      this.props.sortByLikes();
      //alert("after call to this.props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    } else if (e.target.value === "star") {
      window.localStorage.setItem("sortBy", "star");
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("");
      this.props.setTextFilter("");
      //window.localStorage.setItem("sortBy", "notetext");
      this.setState({ sortBy: "star" });
      this.props.sortByStar();
      //alert("after call to this.props.sortByViews()")
      //this.setState({ sortBy: "notetext" });
    }
  };

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
        window.document.querySelector("#buttonid2").click();
        //handleStartScroll()
      } else if (term === "" || term.charAt(0) !== "#") {
        this.setState({ sortBy: "description" });
        //handleStartScroll()
        window.document.querySelector("#buttonid2").click();
      }
      //window.scrollTo(0,0)
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

  // setit = (value, event) => {
  //   event.preventDefault();
  //   console.log("setIt, 3333333333333333333333333 value=" + value);

  //   this.props.sortByHashTag();
  //   this.props.setTextFilter(value);

  //   window.localStorage.setItem("sortBy", "hashtag");
  //   window.localStorage.setItem("searchLinks3", value);

  //   this.props.rerenderit();
  // };

  setit = (value, event) => {
    event.preventDefault();
    console.log("setIt, 3333333333333333333333333 value=" + value);

    this.props.sortByDescription();
    this.props.setTextFilter(value);

    //window.localStorage.setItem("sortBy", "hashtag");
    window.localStorage.setItem("sortBy", "description");
    window.localStorage.setItem("searchLinks3", value);

    this.props.rerenderit();
  };

  refreshIt = () => {
    //window.location.reload();
    window.location.href = "https://urilinks.com?signup=signup";
  };

  handleCheckboxShow = (event) => {
    this.setState({ isToggled: !this.state.isToggled });
    console.log("show dd");
  };

  search = () => {
    console.log("search");
    //const sortBy = window.localStorage.getItem("sortBy");
    var select = document.getElementById("mode");
    // alert("select="+select)
    //var selectedValue = select.options[select.selectedIndex].value;
    var selectedValue;
    if (window.localStorage.getItem("sortBy") !== "")
      selectedValue = window.localStorage.getItem("sortBy");
    else selectedValue = select.options[select.selectedIndex].value;
    //alert("2 selectedValue="+selectedValue+", term="+term)
    console.log("search = () => {, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value.trim();
    //alert("selectedValue="+selectedValue+", term="+term)
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
    //else if (
    //   selectedValue === "views" &&
    //   // && sortBy === "hashtag"
    //   this.props.filters.sortBy === "views"
    // ) {
    //   window.localStorage.setItem("termid", "");
    //     this.props.setTextFilter("");
    // }
  };

  render() {
    return (
      <div>
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
          sortByDateText={this.props.sortByDateText}
          sortByViews={this.props.sortByViews}
          sortByLikes={this.props.sortByLikes}
          sortByStar={this.props.sortByStar}
          filters={this.props.filters}
        />
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
  sortByDateText: () => dispatch(sortByDateText()),
  sortByViews: () => dispatch(sortByViews()),
  sortByLikes: () => dispatch(sortByLikes()),
  sortByStar: () => dispatch(sortByStar()),
  sortByFolder: () => dispatch(sortByFolder()),

  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
