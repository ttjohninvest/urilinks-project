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
import EmailForm from "./EmailForm"

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
  const [expanded, setExpanded] = useState(props.morehashtags);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [emailForm, showEmailForm] = useState(false)
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
  const [showComponent, setShowComponent] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");
  const r = params.get("x");
  const id = params.get("id");
  const myRef = useRef(null);
  const scrollInterval = useRef(null);

  const useButtons = false; //use buttons in display of categories

  const buttonRef = useRef(null);

  let x = false;
  if (window.localStorage.getItem("hideinformation") === null) {
    window.localStorage.setItem("hideinformation", false);
  } else {
    window.localStorage.setItem("hideinformation", true);
    x = window.localStorage.getItem("hideinformation");
  }
  //
  const [isToggled, setIsToggled] = useState(x);

  const startScrollingDown = () => {
    // Prevent multiple intervals
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      document.getElementById("ls").scrollBy({
        top: -1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      // Stop automatically when reaching the top
      if (document.getElementById("ls").scrollTop === 0) {
        buttonRef.current.click();

        //stopScrolling();
      }
    }, 20); // Every 20 milliseconds
  };

  const startScrollingUp = () => {
    // Prevent multiple intervals
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      document.getElementById("ls").scrollBy({
        top: 1, // Scroll 1 pixel each time
        left: 0,
        behavior: "auto",
      });

      if (
        document.getElementById("ls").scrollTop +
          document.getElementById("ls").clientHeight >=
        document.getElementById("ls").scrollHeight
      ) {
        buttonRef.current.click();
      }
    }, 20); // Every 20 milliseconds
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = null;
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
        console.log("returned from writing the file with writeFile, https://urilinks-project-writefile.vercel");
        //setClientSecret(data.clientSecret);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
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
    //window.scrollTo(0, 0);
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
    setCopySuccess("Copied "); // + text);
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
      // if (val !== "" && val.charAt(0) !== "#") {
      //   alert("The search term needs to be a hashtag.");
      //   return;
      // }

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
    //let x = !isFormOpen
    //alert("isFormOpen="+x)
    setIsFormOpen(false);
    window.scrollTo(0,0)
  };

  

  

  const handleClick = (event) => {
   event.preventDefault();
   setIsFormOpen(true);

//     // document.getElementById("adlinkid").classList.add("pointereventsnone");
//     // setShowComponent(true);

//      const email = "johmcg64@gmail.com";
//   const subject = "Subject Line";
//   const body = "body of email";

//   //const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// const uri = encodeURIComponent(`https://urilinks.com/dashboard?signup=0&id=${uid}`)
//   const mailtoUrl = `https://mail.google.com/mail/u/0/?fs=1&su=Somebody+Sent+Me+A+gmail+From+urilinks.com&to=johmcg64@gmail.com&body=${uri}&tf=cm`

    
//     // Open the mail client
//     window.location.href = mailtoUrl //mailtoLink;
//alert("before call to showEmailForm(true), emailForm="+emailForm+",isFormOpen="+isFormOpen)
//alert("before call to showEmailForm, isFormOpen="+isFormOpen)
showEmailForm(isFormOpen)



  };

//   const email = "johmcg64@gmail.com";
//   const subject = "Subject Line";
//   const body = "body of email";

//   //const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// const uri = encodeURIComponent(`https://urilinks.com/dashboard?signup=0&id=${uid}`)
//   const mailtoUrl = `https://mail.google.com/mail/u/0/?fs=1&su=Somebody+Sent+Me+A+gmail+From+urilinks.com&to=johmcg64@gmail.com&body=${uri}&tf=cm` 


const setItNow=(index, ht,e)=>{
  setActiveItem(index)
  props.setit(ht, e)
}
 
  return (
    <div className="bg-white-1">
      <div className="sticky-div-">
        {/* <div
          className={`website-background-color ${
            useButtons === true ? "width30p" : "width30pt"
          } theHeight flexrowzc2 border-b-5 margin-left-n-19 font-roboto text-size-16 font-weight-500`}
          title="For Medical staff patient providers' are welcome to use this Medical Referral Links Management System to add, view, delete and share your links with a patient or other providers." //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
          {
            uid === "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2" //use RZ...
              ? "Medical Staff Referral Links Management System (Example Page For Staff User Id: "+props.theplan.uid+")" //"Internet Links Management Tool"
              : uid === "7CzFYQjw2aUhHgCYjS2eDODrfVE2"
                ? "City Walks"
                : "Medical Staff Referral Links Management System"+" For Staff User Id: "+props.theplan.uid //"Internet Links Management Tool"
          }
        </div> */}
          <div
          className={`website-background-color ${
            useButtons === true ? "width30p" : "width30pt"
          } theHeight flexrowzc2 border-b-5 margin-left-n-19 font-roboto text-size-16 font-weight-500`}
          title="You are welcome to use this Links Management Dashboard to add, view, delete and share your links with others." //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
          {
            uid === "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2"
              ? <span>My Internet Links Organizer Dashboard</span>
                // <span className="margin-left-11"></span><a href="https://accuradio.com" className="text-size-17" style={{ 'margin-right': '1rem'}} target="_blank">play radio</a>❤</span> //"Internet Links Management Tool"
              : uid === "7CzFYQjw2aUhHgCYjS2eDODrfVE2"
                ? "City Walks"
                : <span>My Internet Links Organizer Dashboard</span>
                  //  <span className="margin-left-11"></span><a href="https://accuradio.com" className="text-size-17" style={{ 'margin-right': '1rem'}} target="_blank">play radio</a>❤</span> //"Internet Links Management Tool"
          }
        </div>
        <div>
          <button
            title="Click the button to begin auto scroll."
            onClick={startScrollingUp}
            className="button-2"
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
            title="Click the button to begin auto scroll."
            onClick={startScrollingDown}
            className="button-2 ib margin-left-11"
          >
            ScrollDn
          </button>
          {/* <button
            title="Click the button to begin auto scroll."
            onClick={startWrite}
            className="button-2 ib margin-left-11"
          >
            Write
          </button> */}
        </div>
      </div>

      <div className="flexrowztt">
        {
          <div
            id="ls"
            className={`${useButtons === true ? "width30p" : "width30pt"}  scrollable-div1`}
          >
            <div className="border-right-5"></div>

            <div
              className={`${useButtons === true ? "width30p" : "width30pt"} border2black- border-right-5 sticky-div-`}
            >
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
                  {!expanded && false ? (
                    //props.b === 1 &&
                    props.mappedDataShort.map((s, index) => {
                      if (index < 50)
                        return (
                          <div
                            key={index}
                            className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                          >
                            <a
                              className={`${activeItem === index ? 'the-menu-item active' : 'the-menu-item'} ${
                                useButtons === true
                                  ? "b1xw"
                                  : "ib width30pt- flexrowzc22 margin-left-11 margin-top-1"
                              } ${
                                useButtons === true ? "b1xw" : ""
                              } nounderline- ${
                                useButtons === true ? "color-white-1" : ""
                              } ${useButtons === true ? "button-link-4" : ""} ${
                                props.b == 1
                                  ? "pointereventsauto underline"
                                  : "pointereventsnone"
                              }`}
                              href="#"
                              //onClick={() => props.setit(s.hashtag, event)}
                              // props.setit(s.hashtag, event) style={style} onClick={() => setIsActive(!isActive)}
                              //style={style}
                              onClick = {()=>setItNow(index, s.hashtag, event)}
                              title={`${sep(s.hashtag)}, hashtag: ${
                                !!s.hashtag && s.hashtag
                              }, click to see results`}
                              
                            >
                              {sep(s.hashtag)}
                            </a>
                          </div>
                        );
                      else return false;
                    })
                  ) : (
                    <div>
                      {props.mappedDataShort.map((s, index) => {
                        //have 3 map calls and display the first column then the second column and then the thrid column
                        return (
                          <div
                            key={index}
                            className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                          >
                            <a
                              className={` color-green ${
                                useButtons === true
                                  ? "b1xw"
                                  : "ib width30pt- flexrowzc22 margin-left-11 margin-top-1"
                              } ${
                                useButtons === true ? "b1xw" : ""
                              } nounderline- ${
                                useButtons === true ? "color-white-1" : ""
                              } ${useButtons === true ? "button-link-4" : ""} ${
                                false && "border6"
                              } ${
                                props.b == 1
                                  ? "pointereventsauto underline"
                                  : "pointereventsnone"
                              } ${false?"color-green":""}`}
                              href="#"
                              onClick={() => props.setit(s.hashtag, event)}
                              title={`${sep(s.hashtag)}, hashtag: ${
                                !!s.hashtag && s.hashtag
                              }, click to see results`}
                              //style={{ color: 'red' }}
                            >
                              1{sep(s.hashtag)}
                            </a>
                            {!!s.hashtag && isCorrectAccount() === true && (
                              <span>
                                {uid === "7CzFYQjw2aUhHgCYjS2eDODrfVE2" && (
                                  <a
                                    href="#"
                                    onClick={() => genVacation(vsep(s.hashtag))}
                                  >
                                    <br />
                                    <span className="ib margin-left-11"></span>
                                    Take Vacation to {vsep(s.hashtag)}
                                  </a>
                                )}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        }

        {props.mappedDataShort.length >= 0 ? (
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

                {isMobile() === true && (
                  <div></div>
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
                    <div></div>
                    // <div>
                    //   <div className="flexrow2c">
                    //     <div className="text-size-1 textLeft margin-top-1">
                    //       <a
                    //         href="#"
                    //         ref={textAreaRef}
                    //         className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                    //         title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                    //       >
                    //         https://urilinks.com/dashboard?signup=0&id=
                    //         {props.uid}
                    //       </a>
                    //       <button
                    //         className="button-2w ib margin-right-1 margin-left-11 border5"
                    //         onClick={copyToClipboard}
                    //         title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                    //       >
                    //         copy sharable link
                    //       </button>
                    //       {copySuccess}
                    //     </div>
                    //   </div>
                    // </div>
                  )
                }

                <br />
              </div>

              <div className="flexrow2e">
                {props.signup === true && (
                  <div
                    title="current plan"
                    className="margin-right-1 textLeft hide"
                  >
                    plan:{" "}
                    {!!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "")}
                  </div>
                )}

                {isToggled && props.signup === false && <div></div>}
                <div>
                  {isToggled && props.signup === true && (
                    <div className="margin-right-1">
                      {!!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "free" ? (
                        <span>(It stores upto {StorageSizes.free} links)</span>
                      ) : (
                        <span></span>
                      )}
                      {!!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "basic" ? (
                        <span>(It stores upto {StorageSizes.basic} links)</span>
                      ) : (
                        <span></span>
                      )}
                      {!!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "standard" ? (
                        <span>
                          (It stores upto {StorageSizes.standard} links)
                        </span>
                      ) : (
                        <span></span>
                      )}
                      {!!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "premium" ? (
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
              {props.signup && (
                <span>
                  <div className="margin-bottom-123">
                    <div className="flexrow2cv2">
                      <div className="text-size-1 textLeft- margin-top-1- margin-bottom-19">
                        <a
                          href="#"
                          ref={textAreaRef}
                          className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                          title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          https://urilinks.com/dashboard?signup=0&x=readonly&id=
                          {props.uid}
                        </a>
                        <button
                          className="button-2w ib margin-right-1 margin-left-11 border5"
                          onClick={copyToClipboard}
                          title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                        >
                          <span className="text-size-14-">
                            click to copy your link to share your links
                          </span>
                        </button>
                        {copySuccess}
                      </div>
                    </div>
                  </div>
                </span>
              )}
              {props.signup === false && (
                <span>
                  <div className="margin-bottom-123">
                    <div className="flexrow2cv2">
                      <div className="text-size-1 textLeft- margin-top-1-">
                        <a
                          href="#"
                          ref={textAreaRef}
                          className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                          title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          https://urilinks.com/dashboard?signup=0&x=readonly&id=
                          {props.uid}
                        </a>
                        <button
                          className="button-2w ib margin-right-1 margin-left-11 border5 pointereventsnone"
                          onClick={copyToClipboard}
                          title="For another person to see your content, share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                        >
                          click to copy your link to share your links
                        </button>
                        {copySuccess}
                      </div>
                    </div>
                  </div>
                </span>
              )}

              {/* {props.signup === true ? 
               
               (
                <div className="">
                <a href={mailtoUrl} target="_blank">Send gmail</a>
                </div>
              ) : (
                <div className=""></div>
              ) 
              
              }


              {props.signup === false ? 
              
              (
                <div className="">
                <a href={mailtoUrl} target="_blank">Send gmail</a>
                </div>
              ) : (
                <div className="minWidth- bg-color-4"></div>
              )
              
              }   */}




                 {props.signup === true && r !== "readonly" ? 
               
               (
                <div className="minWidth- bg-color-4">
                  <a
                    target="_blank"
                    id="adlinkid"
                    href="#"
                    title="Email your sharable link to share with others."
                    className={`cursor-pointer aw minWidth- alignCenter button-2w- b1xw1 button-link-4 ib text-size-5 bg-color-1- bg-color-1w bg-color-1w ${r==="readonly"?'pointereventsnone':""} width100  color-black-2 border5-`}
                    onClick={handleClick}
                  >
                    Click to open up form to email to your recipient your sharable link to your readonly dashboard page
                  </a> 

                  {showComponent && <AddLinkPage2 />}
                  {//emailForm &&
                   isFormOpen && <SendEmailPage uid={uid} isFormOpen={isFormOpen} handleClose={handleClose} />}
                </div>
              ) : (
                <div className="minWidth- bg-color-4"></div>
              ) 
              
              }


              {props.signup === false  && r !== "readonly" ? 
              
              (
                <div className="minWidth- bg-color-4">
                  <a

                    target="_blank"
                    id="adlinkid"
                    href="#"
                    title="This will work on your official page."
                    className="aw minWidth- alignCenter button-2w- b1xw1 button-link-4 ib text-size-5 bg-color-1- bg-color-1w bg-color-1w pointereventsnone- width100  color-black-2 border5-"
                    onClick={handleClick}
                  >
                    Click to open up form to email to your recipient your sharable link to your readonly dashboard page {r!=="readonly"?"(example page)":""}
                  </a> 

                  {showComponent && <AddLinkPage2 />}
                </div>
              ) : (
                <div className="minWidth- bg-color-4"></div>
              )
              
              } 




              <span>
                {props.links.length} of {maximum} links is stored on the{" "}
                {!!props.theplan.plan && props.theplan.plan.replace(/"/g, "")}
                {" plan."}
              </span>
            </div>

            <div
              id="before-before-link-summary-id"
              className="padding-top-20 bg-color-2- bg-color2w borderRadius4- flexrow2w flexrowzv padding-top-111- padding-bottom-111- margin-bottom5"
            >
              <div className="flexrowzv">
                <div className="margin-left-11-">
                  <input
                    title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                    placeholder="enter what to find"
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
                    className="button-3- button-2 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
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
      <div className="">
        <div>
          {((this.props.hashtags && this.props.hashtags.length > 0) ||
            (this.state.mappedDataLong &&
              this.state.mappedDataLong.length > 1)) && (
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
                filters={this.props.filters}
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
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNoteText: () => dispatch(sortByNoteText()),
  sortByFolder: () => dispatch(sortByFolder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
