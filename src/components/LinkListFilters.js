import React, { useState, useRef, useEffect } from "react";
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

  const params = new URLSearchParams(window.location.search);
  const signup = params.get("signup");

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

  return (
    <div className="bg-white-1">

    </div>
  );
}

/*
constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearch() {
    // Perform the search action here
    console.log('Searching for:', this.state.searchTerm);
    // Example: this.props.onSearch(this.state.searchTerm);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }
*/

export class LinkListFilters extends React.Component {
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
      searchTerm: "", //,
      //dv:window.localStorage.getItem("notloggedin")==="1"?"":window.localStorage.getItem("termid")
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
    if (e.target.value === "none") return;

    console.log("onSortChange=(), sortBy=, e.target.value=" + e.target.value);
    // if (e.target.value === "date") {
    //   this.props.setTextFilter("");
    //   if (this.myRef.current) this.myRef.current.focus();
    //   window.localStorage.setItem("sortBy", "date");
    //   this.setState({ sortBy: "date" });
    //   this.props.sortByDate();
    // } else
    const val = window.document.getElementById("termid").value.trim();
    window.localStorage.setItem("termid", val);
    console.log("onSortChange=(), search term=, val=" + val);
    if (e.target.value === "description") {
      //this.props.setTextFilter("");
      //window.localStorage.setItem("termid", val);
      this.props.setTextFilter(val);
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortBy", "description");
      this.setState({ sortBy: "description" });
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (val.trim() !== "" && val.trim().charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

      if (val.trim() === "") {
        //window.document.getElementById("termid").value = "#"
        this.props.setTextFilter("#");
        //window.localStorage.setItem("termid", "#");
      } else {
        //window.localStorage.setItem("termid", val);
        this.props.setTextFilter(val);
      }
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("#");

      window.localStorage.setItem("sortBy", "hashtag");
      this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTag();
    } else if (e.target.value === "notetext") {
      if (this.myRef.current) this.myRef.current.focus();
      //this.props.setTextFilter("");
      this.props.setTextFilter(val);
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
  //   return null
  //   // return {
  //   //   filenameList: [],
  //   // };
  // }

  componentDidMount() {
    // const notloggedin = window.localStorage.getItem("notloggedin");
    // if(notloggedin==="1") { //1 means true
    //   window.document.getElementById("termid").value=""
    //   this.setState({ dv: "" })
    // }
    //props.history.push("/");
    //window.location.reload()
    //this.setState({ foldernamesList: [] });
    //const array1 = ['a','b']
    // let tl = [];

    // this.props.links.forEach(function (element) {
    //   if (!!element.foldername === true) {
    //     let str2 =
    //       element.foldername.length > 40
    //         ? element.foldername.slice(0, 40 - 3) + "..."
    //         : element.foldername;
    //     tl.push({ label: str2, value: element.foldername });
    //   }
    // });

    // tl.sort((a, b) => {
    //   return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
    // });

    // let tl2 = this.removeDuplicatesByKey(tl, (item) => item.value);

    // this.setState({ foldernamesList: tl2 });
    // //get the plan from settings so I know how many links a person can have
    // console.log(
    //   "In LinkListFilters.js, this.props.settings=" +
    //     JSON.stringify(this.props.settings)
    // );

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

    console.log(
      "AAAA window.localStorage.getItem('sortBy')=" +
        window.localStorage.getItem("sortBy")
    );
    //console.log("BBBB this.props.filters.sortBy="+this.props.filters.sortBy)
    //console.log("CCCC this.state.sortBy="+this.state.sortBy)
    const term = window.localStorage.getItem("termid");
    if (term !== "") {
      window.document.getElementById("termid").value = term;
      const sortBy2 = window.localStorage.getItem("sortBy");
      if (
        (this.props.filters.sortBy === "hashtag" ||
          this.state.sortBy === "hashtag") &&
        term !== "" &&
        term.charAt(0) === "#"
      ) {
        window.document.getElementById("buttonid").click();
      }
      // else if (((this.props.filters.sortBy === "description"
      //   || this.state.sortBy === "description")
      //   || (this.props.filters.sortBy === "notetext"
      //   || this.state.sortBy === "notetext") )
      //   || (term === "" || term.charAt(0) !== '#')) {
      //     window.document.getElementById("buttonid").click()
      // }
      else if (
        sortBy === "description" ||
        sortBy === "notetext" ||
        term === "" ||
        term.charAt(0) !== "#"
      ) {
        window.document.getElementById("buttonid").click();
      }
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
    !!document.querySelector("#before-before-link-summary-id") &&
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

  // clear () {

  //   if(this.props.filters.sortBy==="hashtag") {
  //     window.document.getElementById("termid").value="#"
  //   } else {
  //     window.document.getElementById.value=""
  //   }

  // }

  search = () => {
    console.log("search");
    const sortBy = window.localStorage.getItem("sortBy");
    var select = document.getElementById("mode");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("search = () => {, selectedValue=" + selectedValue);
    let term = window.document.getElementById("termid").value;
    let str = term.trim();

    term = str;
    if (selectedValue === "hashtag" && sortBy === "hashtag") {
      if (term !== "" && term.charAt(0) !== "#") {
        alert("The search term needs to be a hashtag.");
        return;
      }

      if (term === "") {
        window.document.getElementById("termid").value = "#";
        this.props.setTextFilter("#");
        window.localStorage.setItem("termid", "#");
      } else {
        window.localStorage.setItem("termid", term);
        this.props.setTextFilter(term);
      }
    } else {
      window.localStorage.setItem("termid", term);
      console.log("else search = () => {, selectedValue=" + selectedValue);
      this.props.setTextFilter(term);
    }
    //alert (term)
    //this.props.setTextFilter(term);
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
                b={this.props.b}
              />
            </div>
          )}
        </div>

        <div
          id="before-before-link-summary-id"
          className="bg-color-2 borderRadius4- flexrow2w flexrowzv padding-top-111 padding-bottom-111"
        >
          <div className="flexrowzv">
            <div className="margin-left-11">
              <input
                title="Please type or paste in what you want to find. You may enter it full or partially like this Elep for Elephant and it will find everything that starts with Elep."
                placeholder="type/paste what to find?"
                autofocus
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
