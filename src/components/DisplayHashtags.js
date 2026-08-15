const DISPLAY_THIS_MANY_LINKS = 100;
////
import React, { useState, useRef, useEffect } from "react";
import ReadMore from "./ReadMore";
import LinkList from "./LinkList";

import AddLinkPage from "./AddlinkPage";
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
  const [activeItem, setActiveItem] = useState(0);

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

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");
  const rt = params.get("x");
  const id = params.get("id");

  useEffect(() => {
    console.log(
      "ZZZZZ, props.mappedDataShort[0]=" +
        JSON.stringify(props.mappedDataShort[0]),
    );
  }, []);

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
    alert("selectedValue=" + selectedValue);
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

  const onSortChange = (e) => {
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
    } else if (e.target.value === "hashtag") {
      window.localStorage.setItem("sortBy", "hashtag");
      props.setTextFilter(val);
      if (myRef.current) myRef.current.focus();
      setSortBy("hashtag");
      props.sortByHashTag();
      // if (val === "") {
      //   //window.document.getElementById("termid").value = "#"
      //   props.setTextFilter("#");

      // } else {

      //   props.setTextFilter(val);
      // }
      // if (myRef.current) myRef.current.focus();

      // setSortBy("hashtag");

      // props.sortByHashTag();
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
    //window.scrollTo(0, 0);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsFormOpen(true);

    showEmailForm(isFormOpen);
  };

  const setItNow = (index, ht, e) => {
    setActiveItem(index);
    props.setit(ht, e);
    document.getElementById("very-top-id").scrollBy({
      top: 0,
      left: 360,
      behavior: "smooth",
    });

    // document.getElementById("very-top-id").scrollBy({
    //   top: 500,
    //   left: 360,
    //   behavior: "smooth",
    // });
  };

  const addALink = () => {
    setIsForm2Open(true)
  }

  const handleClose2 = () => {
    //alert("closeLink")
    setIsForm2Open(false)
  }

  return (
    <div className="bg-white-1">
      <div className="sticky-div-">
        <div
          className={`website-background-color width30pt
          } theHeight flexrowzc2 border-b-5font-roboto text-size-16 font-weight-500`}
          title="You are welcome to use this Internet Links Organizer Dashboard to add, view, delete and share your links with others." //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
          <span className="padding-left-n-x">
            Internet Links Organizer Dashboard's Home Page
          </span>
        </div>
        <div className="margin-left-11-">
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
            className="button-2 ib margin-left-11 widthxpx2"
          >
            Stop
          </button>

          <button
            title="Click the button to begin auto scroll."
            onClick={startScrollingDown}
            className="button-2 ib margin-left-11 widthxpx2"
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
                      return <div key={index}></div>;
                    else
                      return (
                        <div
                          key={index}
                          className="text-size-5 border-bottom-5z border-left-5 padding-bottom-5z"
                        >
                          {/* <a
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
                          <br /> */}
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
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*right column code here*/}
       
        {/* right column code here */}
      </div>
    </div>
  );
}

export class DisplayHashtags extends React.Component {
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

  sortByViews: () => dispatch(sortByViews()),
  sortByLikes: () => dispatch(sortByLikes()),
  sortByStar: () => dispatch(sortByStar()),
  sortByFolder: () => dispatch(sortByFolder()),

  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayHashtags);
