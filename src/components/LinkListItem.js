import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import visited from "../assets/images/visited-1.png";
import {
  startRemoveLink,
  removeLink,
  privateLink,
  startPrivateLink,
  privateLink2,
  startPrivateLink2,
  archiveLink,
  startArchiveLink,
  archiveLink2,
  startArchiveLink2,
  incrementLinkClickCount,
  incrementLinkLikesClickCount,
  decrementLinkLikesClickCount,
  incrementLinkStarClickCount,
  decrementLinkStarClickCount,
} from "../actions/links";

import {
  incrementTotalStarClickCount,
  decrementTotalStarClickCount,
} from "../actions/thetotalstars";


import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import FBShareButton from "./FBShareButton";
//import FBShareButton2 from "./FBShareButton2";
import MessengerButton from "./MessengerButton";
import LinkedInShareButton from "./LinkedInShareButton";
import XShareButton from "./XShareButton";
import MayDoInGoogleDocument from "./MayDoInGoogleDocument";
import MapQuestButton from "./MapQuestButton";
import GoogleMapsButton from "./GoogleMapsButton";
import GoogleEarthButton from "./GoogleEarthButton";
import AlarmClockButton from "./AlarmClockButton";
import CalendarGoogle from "./CalendarGoogle";
//import AddToAny from './AddToAny';

//import XShareButton from "./XShareButton"

// const LinkListItem = ({
//   id,
//   description,
//   Url,
//   note,
//   amount,
//   createdAt,
//   faviconURL,
// }) => {

 

const LinkListItem = (props) => {

  //  const params = new URLSearchParams(window.location.search);
  
  // const rt = params.get("x");
  //alert("rt="+rt)

  console.log(
    "1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL=" + props.faviconURL,
  );
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);

  const [s, setS] = useState(1);
  const [s2, setS2] = useState(1);
  const [data, setData] = useState([]);
  const [data2s, setData2s] = useState([]);
  const [sortit1flag, setSortit1flag] = useState([]);
  const [visityt, setVisityt] = useState("");

  const isityt = (url) => {
    if (url.includes("youtube")) {
      //get the id
      let a = url.split("v=");
      let b = a[1].split("&");
      let ytid = b[0];
      setVisityt(ytid);
      return;
    }

    setVisityt("");
  };

  // function Book(BookTitle, BookAuthor, BookPages){
  //   this.title = BookTitle,
  //   this.author = BookAuthor,
  //   this.pages = BookPages
  // }
  // This function triggers when a button is clicked
  //function addNewBook(id){
  const addIdToDelete = (id) => {
    console.log("LinkListItem, id=" + id);
    //let book = new Book(title.value, author.value, pages.value);
    //let bookStringified = JSON.stringify(book);

    //bookData.push(bookStringified);
    setDeleteData2(id);
  };

  const handleCheckboxDelete = (event) => {
    console.log("bookmark id=" + event.target.value);
    //addIdToDelete(event.target.value)
    //console.log("bookmark ids="+localStorage.getItem('deleteData'))
    let result = confirm("Are you sure you want to delete?");
    if (result) {
      // User clicked OK, perform the deletion
      props.removeLink({ id: event.target.value });
      props.startRemoveLink({ id: event.target.value });
      alert("Item deleted.");
      props.history.push("/");
      window.location.href = "https://urilinks.com?signup=signup";
    } else {
      // User clicked Cancel
      document.getElementById("delete%" + event.target.value).checked = false;
      alert("Deletion canceled.");
    }
  };

  const handleCheckboxPrivate = (x, event) => {
    //alert(event.target.value)
    console.log("bookmark id=" + event.target.value);
    //addIdToDelete(event.target.value)
    //console.log("bookmark ids="+localStorage.getItem('deleteData'))
    let result;
    if (x === false) {
      //result = confirm("Are you sure you want to make it public?");
      if (true) {
        // User clicked OK, perform the deletion
        props.privateLink2({ id: event.target.value });
        props.startPrivateLink2({ id: event.target.value });
        //alert("Item deleted.");
      } else {
        // User clicked Cancel
        // document.getElementById("private%" + event.target.value).checked =
        //   "";
        // alert("Setting it to private is canceled.");
      }
    } else {
      //result = confirm("Are you sure you want to make it private?");
      if (true) {
        // User clicked OK, perform the deletion
        props.privateLink({ id: event.target.value });
        props.startPrivateLink({ id: event.target.value });
        //alert("Item deleted.");
      } else {
        // User clicked Cancel
        // document.getElementById("private%" + event.target.value).checked =
        //   "";
        // alert("Setting it to private is canceled.");
      }
    }
  };

  const handleCheckboxArchive = (x, event) => {
    //alert(event.target.value)
    console.log("bookmark id=" + event.target.value);
    //addIdToDelete(event.target.value)
    //console.log("bookmark ids="+localStorage.getItem('deleteData'))
    let result;
    if (x === false) {
      //result = confirm("Are you sure you want to unarchive it?");
      if (true) {
        // User clicked OK, perform the deletion
        props.archiveLink2({ id: event.target.value });
        props.startArchiveLink2({ id: event.target.value });
        //alert("Item deleted.");
      } else {
        // User clicked Cancel
        // document.getElementById("private%" + event.target.value).checked =
        //   "";
        // alert("Setting it to private is canceled.");
      }
    } else {
      //result = confirm("Are you sure you want to archive it?");
      if (true) {
        // User clicked OK, perform the deletion
        props.archiveLink({ id: event.target.value });
        props.startArchiveLink({ id: event.target.value });
        //alert("Item deleted.");
      } else {
        // User clicked Cancel
        // document.getElementById("private%" + event.target.value).checked =
        //   "";
        // alert("Setting it to private is canceled.");
      }
    }
  };

  const storeScrollPosition = (frequency, event) => {
    //alert("frequency="+frequency)
    let x1 = 0;
    if (frequency === undefined || frequency === null || frequency === "NaN")
      x1 = 0;
    else x1 = frequency;
    const x = event.target.getAttribute("data-value"); //x is link id
    //alert("id="+x+", frequency="+x1)
    //alert("storeScrollPosition, event.target.value="+x)
    props.incrementLinkClickCount({ id: x, frequency: x1 });
    window.localStorage.setItem("scrollPosition", window.scrollY);
  };

  const storeScrollPosition2 = (likes, event) => {
    // let x1 = 0;
    // if (likes === undefined || likes === null || likes === "NaN") x1 = 0;
    // else x1 = likes;
    // const x = event.target.getAttribute("data-value"); //x is link id

    // props.incrementLinkLikesClickCount({ id: x, likes: x1 });
    // window.localStorage.setItem("scrollPosition", window.scrollY);

      let x1 = 0;
    if (likes === undefined || likes === null || likes === "NaN") x1 = 0;
    else x1 = likes;
    const x = event.target.getAttribute("data-value"); //x is link id
    
    if(x1===0) {
      //alert("going to increment")
      props.incrementLinkLikesClickCount({ id: x, likes: 0 });
     
      
    }
    else {
      //alert("going to decrement")
      props.decrementLinkLikesClickCount({ id: x, likes: 1 });
    }

    window.localStorage.setItem("scrollPosition", window.scrollY);


  };

  const storeScrollPosition3 = (star, event) => {

    const text = "Please confirm it ok to remove this link from your top ten list?";
    if (props.filters.sortBy!=="star" || confirm(text) === true) {
    //alert("props.thetotalstars="+JSON.stringify(props.thetotalstars))
    let x1 = 0;
    if (star === undefined || star === null || star === "NaN") x1 = 0;
    else x1 = star;
    const x = event.target.getAttribute("data-value"); //x is link id
    //alert("storeScrollPosition3, x1="+x1)
    if(x1===0) {
      //alert("going to increment,id="+x)
      //alert("going to increment,id="+x+", props.star="+props.star)
      props.incrementLinkStarClickCount({ id: x, star: 0 });
      if(props.thetotalstars.totalstars < 10)
      props.incrementTotalStarClickCount({totalstars: props.thetotalstars.totalstars });
      else alert("You have ten of ten stars selected for your top ten.")
    }
    else {
      //alert("going to increment,id="+x)
      //alert("going to increment,id="+x+", props.star="+props.star)
      props.decrementLinkStarClickCount({ id: x, star: 1 });
      if(props.thetotalstars.totalstars > 0)
      props.decrementTotalStarClickCount({totalstars: props.thetotalstars.totalstars });
      else alert("You have zero of ten stars selected for your top ten.")
    }

    window.localStorage.setItem("scrollPosition", window.scrollY);
  } else {
    alert("deletion canceled")
  }
  };

  const sortit2 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length,
    );
    let url;
    let data1 = [];
    let ndata = [];
    for (let i = 0; i < event.currentTarget.obj.data.length; i++) {
      url = new URL(event.currentTarget.obj.data[i]);
      let name = new URL(event.currentTarget.obj.data[i]).hostname
        .split(".")
        .slice(-2)
        .join(".");
      // console.log("url.protocol="+url.protocol); // "https:"
      // console.log("url.hostname="+url.hostname); // "www.example.com"
      // console.log("url.port="+url.port); // "8080"
      // console.log("url.pathname="+url.pathname); // "/path/to/page"
      // console.log("url.search="+url.search); // "?query=string"
      // console.log("url.hash="+url.hash); // "#fragment"
      // console.log("-----------------------------------------------------------------------------");
      ndata = {
        hostname: url.hostname,
        name: name,
        pathname: url.pathname,
        url: url,
      };
      data1.push(ndata);
    }
    //data1 is ready here
    //     array.sort((a, b) => a.name.localeCompare(b.name));

    // For descending order, reverse the arguments:

    // array.sort((a, b) => b.name.localeCompare(a.name));
    // console.log("data1="+JSON.stringify(data1))
    // console.log()

    //let data1s = data1.sort((a, b) => a.name.localeCompare(b.name));
    let data1s = data1.sort((a, b) => {
      // Compare by name first
      if (a.name !== b.name) {
        return a.name.localeCompare(b.name);
      }
      // If names are equal, compare by department
      return a.pathname.localeCompare(b.pathname);
    });

    // console.log(
    //   "data1 sorted by two fields name and pathname=" +
    //     JSON.stringify(data1s, null, 4),
    // );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    // const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    // ul.innerHTML = "";
    //if (data1s.length === 0) {
    // let li = document.createElement("li");
    // li.className = "lsn corangered";
    // li.innerHTML = `Results: 0`;

    // ul.appendChild(li);
    //} else {
    // let li0 = document.createElement("li");
    // li0.className = "lsn corangered";
    // li0.innerHTML = `Results: ${data1s.length} url(s)`;

    // ul.appendChild(li0);

    // data1s.map((d) => {
    //   let li = document.createElement("li");

    //   let a = document.createElement("a");
    //   a.title = "click to open the page";
    //   a.className = "nounderline color-purple";
    //   a.href = d.url;
    //   a.target = "_blank";
    //   a.innerHTML = `${decodeURIComponent(d.url)}`;

    //   // li.appendChild(a);

    //   // ul.appendChild(li);

    //   let a2 = document.createElement("a");
    //   a2.title = `click to open page,${d.hostname}`;
    //   a2.className = "nounderline color-black";
    //   a2.href = "https://" + d.hostname;
    //   a2.target = "_blank";
    //   a2.innerHTML = `${d.hostname}`;

    //   let span2 = document.createElement("span");
    //   let br2 = document.createElement("br");

    //   span2.appendChild(a);
    //   span2.appendChild(br2);
    //   span2.appendChild(a2);
    //   //https://www.google.com/search?q=arthritis

    //   let pathnamearray = d.pathname.split("/");

    //   for (let i = 0; i < pathnamearray.length; i++) {
    //     if (pathnamearray[i + 1] !== undefined) {
    //       let a3 = document.createElement("a");
    //       a3.title = `click to google search for ${pathnamearray[i + 1]}`;
    //       a3.className = "nounderline color-black";
    //       a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
    //       a3.target = "_blank";
    //       a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
    //       span2.appendChild(a3);
    //     }
    //   }

    //   li.appendChild(span2);
    //   ul.appendChild(li);
    // });
    //}
  };

  const sortit1 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length,
    );
    let url;
    let data1 = [];
    let ndata = [];
    for (let i = 0; i < event.currentTarget.obj.data.length; i++) {
      url = new URL(event.currentTarget.obj.data[i]);
      let name = new URL(event.currentTarget.obj.data[i]).hostname
        .split(".")
        .slice(-2)
        .join(".");
      // console.log("url.protocol="+url.protocol); // "https:"
      // console.log("url.hostname="+url.hostname); // "www.example.com"
      // console.log("url.port="+url.port); // "8080"
      // console.log("url.pathname="+url.pathname); // "/path/to/page"
      // console.log("url.search="+url.search); // "?query=string"
      // console.log("url.hash="+url.hash); // "#fragment"
      // console.log("-----------------------------------------------------------------------------");
      ndata = {
        hostname: url.hostname,
        name: name,
        pathname: url.pathname,
        url: url,
      };
      data1.push(ndata);
    }
    //data1 is ready here
    //     array.sort((a, b) => a.name.localeCompare(b.name));

    // For descending order, reverse the arguments:

    // array.sort((a, b) => b.name.localeCompare(a.name));
    // console.log("data1="+JSON.stringify(data1))
    // console.log()

    let data1s = data1.sort((a, b) => a.name.localeCompare(b.name));

    console.log(
      "data1 sorted by name and extension in hostname=" +
        JSON.stringify(data1s, null, 4),
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    // const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    // ul.innerHTML = "";
    // if (data1s.length === 0) {
    //   let li = document.createElement("li");
    //   li.className = "lsn corangered";
    //   li.innerHTML = `Results: 0`;

    //   ul.appendChild(li);
    // } else {
    //   let li0 = document.createElement("li");
    //   li0.className = "lsn corangered";
    //   li0.innerHTML = `Results: ${data1s.length} url(s)`;

    //   ul.appendChild(li0);

    //   data1s.map((d) => {
    //     let li = document.createElement("li");
    //     let a = document.createElement("a");
    //     a.title = "click to open the page";
    //     a.className = "nounderline color-purple";
    //     a.href = d.url;
    //     //a.target = "_blank";
    //     a.innerHTML = `${decodeURIComponent(d.url)}`;

    //     let a2 = document.createElement("a");
    //     a2.title = `click to open page,${d.hostname}`;
    //     a2.className = "nounderline color-black";
    //     a2.href = "https://" + d.hostname;
    //     a2.target = "_blank";
    //     a2.innerHTML = `${d.hostname}`;

    //     let span2 = document.createElement("span");
    //     let br2 = document.createElement("br");

    //     span2.appendChild(a);
    //     span2.appendChild(br2);
    //     span2.appendChild(a2);
    //     //https://www.google.com/search?q=arthritis

    //     let pathnamearray = d.pathname.split("/");

    //     for (let i = 0; i < pathnamearray.length; i++) {
    //       if (pathnamearray[i + 1] !== undefined) {
    //         let a3 = document.createElement("a");
    //         a3.title = `click to google search for ${pathnamearray[i + 1]}`;
    //         a3.className = "nounderline color-black";
    //         a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
    //         a3.target = "_blank";
    //         a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
    //         span2.appendChild(a3);
    //       }
    //     }

    //     li.appendChild(span2);
    //     ul.appendChild(li);
    //   });
    // }
  };

  const sortit3 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length,
    );
    let url;
    let data1 = [];
    let ndata = [];
    for (let i = 0; i < event.currentTarget.obj.data.length; i++) {
      url = new URL(event.currentTarget.obj.data[i]);
      let name = new URL(event.currentTarget.obj.data[i]).hostname
        .split(".")
        .slice(-2)
        .join(".");
      // console.log("url.protocol="+url.protocol); // "https:"
      // console.log("url.hostname="+url.hostname); // "www.example.com"
      // console.log("url.port="+url.port); // "8080"
      // console.log("url.pathname="+url.pathname); // "/path/to/page"
      // console.log("url.search="+url.search); // "?query=string"
      // console.log("url.hash="+url.hash); // "#fragment"
      // console.log("-----------------------------------------------------------------------------");
      ndata = {
        hostname: url.hostname,
        name: name,
        pathname: url.pathname,
        url: url,
      };
      data1.push(ndata);
    }
    //data1 is ready here
    //     array.sort((a, b) => a.name.localeCompare(b.name));

    // For descending order, reverse the arguments:

    // array.sort((a, b) => b.name.localeCompare(a.name));
    // console.log("data1="+JSON.stringify(data1))
    // console.log()

    //let data1s = data1.sort((a, b) => a.name.localeCompare(b.name));
    let data1s = data1.sort((a, b) => {
      // Compare by name first
      if (a.name !== b.name) {
        return b.name.localeCompare(a.name);
      }
      // If names are equal, compare by department
      return b.pathname.localeCompare(a.pathname);
    });

    console.log(
      "data1 sorted by two fields name and pathname=" +
        JSON.stringify(data1s, null, 4),
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    // const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    // ul.innerHTML = "";
    // if (data1s.length === 0) {
    //   let li = document.createElement("li");
    //   li.className = "lsn corangered";
    //   li.innerHTML = `Results: 0`;

    //   ul.appendChild(li);
    // } else {
    //   let li0 = document.createElement("li");
    //   li0.className = "lsn corangered";
    //   li0.innerHTML = `Results: ${data1s.length} url(s)`;

    //   ul.appendChild(li0);

    //   data1s.map((d) => {
    //     let li = document.createElement("li");
    //     let a = document.createElement("a");
    //     a.title = "click to open the page";
    //     a.className = "nounderline color1- color-purple";
    //     a.href = d.url;
    //     a.target = "_blank";
    //     a.innerHTML = `${decodeURIComponent(d.url)}`;

    //     let a2 = document.createElement("a");
    //     a2.title = `click to open page,${d.hostname}`;
    //     a2.className = "nounderline color-black";
    //     a2.href = "https://" + d.hostname;
    //     a2.target = "_blank";
    //     a2.innerHTML = `${d.hostname}`;

    //     let span2 = document.createElement("span");
    //     let br2 = document.createElement("br");

    //     span2.appendChild(a);
    //     span2.appendChild(br2);
    //     span2.appendChild(a2);
    //     //https://www.google.com/search?q=arthritis

    //     let pathnamearray = d.pathname.split("/");

    //     for (let i = 0; i < pathnamearray.length; i++) {
    //       if (pathnamearray[i + 1] !== undefined) {
    //         let a3 = document.createElement("a");
    //         a3.title = `click to google search for ${pathnamearray[i + 1]}`;
    //         a3.className = "nounderline color-black";
    //         a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
    //         a3.target = "_blank";
    //         a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
    //         span2.appendChild(a3);
    //       }
    //     }

    //     li.appendChild(span2);
    //     ul.appendChild(li);
    //   });
    // }
  };

  const sortit4 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length,
    );
    let url;
    let data1 = [];
    let ndata = [];
    for (let i = 0; i < event.currentTarget.obj.data.length; i++) {
      url = new URL(event.currentTarget.obj.data[i]);
      let name = new URL(event.currentTarget.obj.data[i]).hostname
        .split(".")
        .slice(-2)
        .join(".");
      // console.log("url.protocol="+url.protocol); // "https:"
      // console.log("url.hostname="+url.hostname); // "www.example.com"
      // console.log("url.port="+url.port); // "8080"
      // console.log("url.pathname="+url.pathname); // "/path/to/page"
      // console.log("url.search="+url.search); // "?query=string"
      // console.log("url.hash="+url.hash); // "#fragment"
      // console.log("-----------------------------------------------------------------------------");
      ndata = {
        hostname: url.hostname,
        name: name,
        pathname: url.pathname,
        url: url,
      };
      data1.push(ndata);
    }

    let data1s = data1.sort((a, b) => b.name.localeCompare(a.name));

    // console.log(
    //   "data1 sorted by name and extension in hostname=" +
    //     JSON.stringify(data1s, null, 4),
    // );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    // const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    // ul.innerHTML = "";
    // if (data1s.length === 0) {
    //   let li = document.createElement("li");
    //   li.className = "lsn corangered";
    //   li.innerHTML = `Results: 0`;

    //   ul.appendChild(li);
    // } else {
    //   let li0 = document.createElement("li");
    //   li0.className = "lsn corangered";
    //   li0.innerHTML = `Results: ${data1s.length} url(s)`;

    //   ul.appendChild(li0);

    //   data1s.map((d) => {
    //     let li = document.createElement("li");
    //     let a = document.createElement("a");
    //     a.title = "click to open the page";
    //     a.className = "nounderline color-purple";
    //     a.href = d.url;
    //     a.target = "_blank";
    //     a.innerHTML = `${decodeURIComponent(d.url)}`;

    //     let a2 = document.createElement("a");
    //     a2.title = `click to open page,${d.hostname}`;
    //     a2.className = "nounderline color-black";
    //     a2.href = "https://" + d.hostname;
    //     a2.target = "_blank";
    //     a2.innerHTML = `${d.hostname}`;

    //     let span2 = document.createElement("span");
    //     let br2 = document.createElement("br");

    //     span2.appendChild(a);
    //     span2.appendChild(br2);
    //     span2.appendChild(a2);
    //     //https://www.google.com/search?q=arthritis

    //     let pathnamearray = d.pathname.split("/");

    //     for (let i = 0; i < pathnamearray.length; i++) {
    //       if (pathnamearray[i + 1] !== undefined) {
    //         let a3 = document.createElement("a");
    //         a3.title = `click to google search for ${pathnamearray[i + 1]}`;
    //         a3.className = "nounderline color-black";
    //         a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
    //         a3.target = "_blank";
    //         a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
    //         span2.appendChild(a3);
    //       }
    //     }

    //     li.appendChild(span2);
    //     ul.appendChild(li);
    //   });
    // }
  };

  const getUrlsList = (url2, id) => {
    if (s === 1) {
      setS(0);
      // const ul = document.getElementById("uldata" + id);
      // ul.innerHTML = "";
      fetch("https://urilinks-project-links-to-tabs-expr.vercel.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url2 }),
      })
        .then((response) => {
          //console.log("response")
          return response.json();
        })
        .then((data) => {
          setData(data);
          if (data.length === 0) {
            // let li = document.createElement("li");
            // li.className = "lsn corangered";
            // li.innerHTML = `Results: 0`;
            // ul.appendChild(li);
            //  let r = document.getElementById("resultsId")
            // r.innerHTML = `Results: ${data.length} url(s)`;
          } else {
            let span = document.createElement("span");
            span.innerHTML = "sort1a";
            span.className = "ib cursor-pointer corange";
            span.title =
              "click to sort the results in ascending order on the name and extension in the domain name";
            let obj = {
              data: data,
              id: id,
            };
            //span.data = data;
            span.obj = obj;

            span.addEventListener("click", sortit1);
            //ul.appendChild(span);

            let span2 = document.createElement("span");
            span2.innerHTML = "sort2a";
            span2.className = "ib margin-left-11 cursor-pointer corange";
            span2.title =
              "click to sort the results in ascending order on the name, extension and the pathname in the full url";
            let obj2 = {
              data: data,
              id: id,
            };
            //span.data = data;
            span2.obj = obj2;

            span2.addEventListener("click", sortit2);
            //ul.appendChild(span2);

            let span4 = document.createElement("span");
            span4.innerHTML = "sort3d";
            span4.className = "ib margin-left-11 cursor-pointer corange";
            span4.title =
              "click to sort the results in descending order on the name and extension in the domain name";
            let obj4 = {
              data: data,
              id: id,
            };
            //span.data = data;
            span4.obj = obj4;

            span4.addEventListener("click", sortit4);
            //ul.appendChild(span4);

            let span3 = document.createElement("span");
            span3.innerHTML = "sort4d";
            span3.className = "ib margin-left-11 cursor-pointer corange";
            span3.title =
              "click to sort the results in descending order on the name, extension and the pathname in the full url";
            let obj3 = {
              data: data,
              id: id,
            };
            //span.data = data;
            span3.obj = obj3;

            span3.addEventListener("click", sortit3);
            //ul.appendChild(span3);

            let li0 = document.createElement("li");
            li0.className = "lsn corangered";
            li0.innerHTML = `Results: ${data.length} url(s)`;

            //ul.appendChild(li0);

            //here
            data.map((url, index) => {
              //let urlstruct = new URL(url);
              // console.log("urlstruct.protocol="+urlstruct.protocol); // "https:"
              // console.log("urlstruct.hostname="+urlstruct.hostname); // "www.example.com"
              // console.log("urlstruct.port="+urlstruct.port); // "8080"
              // console.log("urlstruct.pathname="+urlstruct.pathname); // "/path/to/page"
              // console.log("urlstruct.search="+urlstruct.search); // "?query=string"
              // console.log("urlstruct.hash="+urlstruct.hash); // "#fragment"
              // let li = document.createElement("li");
              // li.id = index; //index has to be unique
              // li.title = "click to go to page";
              let a = document.createElement("a");
              a.title = "click to open the page";
              a.className = "nounderline color1- color-purple";
              a.href = url; //use a.href='#' for drilldown version
              a.target = "_blank"; //remove the target attribute for drilldown version
              //a.onClick = {()=>drilldown(url,index)}
              a.innerHTML = `${decodeURIComponent(url)}`; //data.title+", "+`${url}`;

              // li.appendChild(a);

              // ul.appendChild(li);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setS(1);
      // const ul = document.getElementById("uldata" + id);
      // ul.innerHTML = "";
    }
  };
  //

  const truncateString = (str, length) => {
    let str1 = !!str ? str : "";
    return str1.length > length ? str1.slice(0, length) + "..." : str1;
  };

  const putinnewlines = (str) => {
    let str1 = !!str ? str : "";

    const hashtags = str1.match(/#\w+/g) || [];
    // Result: ["#world", "#javascript", "#coding"]
    const regex = /#([a-zA-Z0-9_]+)/g;

    let match;
    let matchesstring = "";
    let i = 0;

    while ((match = regex.exec(hashtags[i])) !== null) {
      if (i === 0) matchesstring += "\n" + match[0];
      else {
        matchesstring += " " + match[0];
      }
      i = i + 1;
    }

    return matchesstring;
  };

  const breakEvery50Chars = (text) => {
    if (!text) return "";
    // Matches exactly 50 characters and replaces with the match + newline
    return text.replace(/(.{50})/g, "$1\n");
  };

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  return (
    <div key={props.index}>
      <div>
      <img className="" width="20" height="20" src={props.faviconURL} />
      </div>
      <div>
      {!!props.yturl && (
        <a
          ref={myRef}
          className=""
          href={props.Url}
          //target="_self"
          target="_blank"
          data-value={props.id}
          title={"click to open the webpage: " + props.Url}
          onClick={() => storeScrollPosition(props.frequency, event)}
        >
          <img
            className="borderRadius10"
            style={{ width: "325px" }}
            src={props.yturl}
          />
        </a>
      )}
</div>
      {/* <ol id={"uldata" + props.id} start="0"></ol> */}

      <div className="normal-wrap">
        <a
          ref={myRef}
          className={`ib text-size-16 font-weight-900 margin-right-1 textWrap ${isMobile() === true ? "width325" : ""}`}
          href={props.Url}
          target="_blank"
          data-value={props.id}
          title={"click to open the webpage: " + props.Url}
          onClick={() => storeScrollPosition(props.frequency, event)}
        >
          {props.description}
          {/* {truncateString(props.description, 80)} */}
          {/* {breakEvery50Chars(props.description)} */}
        </a>
      </div>

      <div className="flexrowz">
        {props.signup.signup === true ? (
          <div>
            <Link className="pointereventsauto" to={`/edit/${props.id}`}>
              <span className="" style={{ cursor: "pointer" }}>
                Edit link
              </span>
            </Link>
          </div>
        ) : (
          <div>
            <Link className="pointereventsnone" to={`/edit/${props.id}`}>
              <span className="">Edit link</span>
            </Link>
          </div>
        )}
        {props.signup.signup === true ? (
          <div>
            <span className="">
              <span className="pointereventsauto">
                <span className="margin-left-11">Remove link:&nbsp;</span>
                <input
                  type="checkbox"
                  id={"delete%" + props.id}
                  name={"delete%" + props.id}
                  value={props.id}
                  onChange={handleCheckboxDelete}
                  title="click to delete the url"
                  className=""
                  style={{ cursor: "pointer" }}
                />
                <label htmlFor={"delete%" + props.id} />
              </span>
              <span className="pointereventsauto">
                <span className="margin-left-11 color-black ">
                  {!!props.showpublic
                    ? "make link private"
                    : "made link private"}
                  :&nbsp;
                </span>
                <input
                  style={{ cursor: "pointer" }}
                  checked={!!props.showpublic ? "" : "checked"}
                  type="checkbox"
                  id={"private%" + props.id}
                  name={"private%" + props.id}
                  value={props.id}
                  onChange={() =>
                    handleCheckboxPrivate(!!props.showpublic, event)
                  }
                  title={
                    !!props.showpublic
                      ? "click to make url private"
                      : "click to make url public"
                  }
                  className=""
                />
                <label htmlFor={"private%" + props.id} />
              </span>
              {/* <span className="ib padding-right-11 inline-block-margin-left-1 color-purple pointereventsauto">
                                      <span className="color-black">
                                        {!!props.archive
                                          ? "unarchive it" //+props.r
                                          : "archive it" //+props.r
                                          }
                                        :&nbsp;
                                      </span>
                                      <input
                                      style={{cursor:'pointer'}}
                                        checked={
                                          !!props.archive ? "checked" : ""
                                        }
                                        type="checkbox"
                                        id={"archive%" + props.id}
                                        name={"archive%" + props.id}
                                        value={props.id}
                                        onChange={() =>
                                          handleCheckboxArchive(
                                            !!props.archive,
                                            event,
                                          )
                                        }
                                        title={!!props.archive ?"click to archive it":"click to unarchive it"}
                                        className=""
                                      />
                                      <label htmlFor={"archive%" + props.id} />
                                    </span> */}

                                    <span className="margin-left-11xy">
                Views:
                <span
                  className="ib margin-left-11tx font-weight-900-"
                  title={
                    "This is the number of times someone has clicked this link."
                  }
                >
                  {props.frequency === undefined ? 0 : props.frequency}
                </span>
              </span>
             {/* <span
                ref={myRef}
                className={`font-weight-900- margin-left-11xy1 cursor-pointer`}
                //href="#"

                data-value={props.id}
                title={"click to see"}
                onClick={() => storeScrollPosition(props.frequency, event)}
              >
                views:
              </span>

              <span
                className="margin-bottom-xy ib margin-left-11tx font-weight-900-"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {props.frequency === undefined ? 0 : props.frequency}
              </span> */}




              <span
                ref={myRef2}
                className={`font-weight-900- margin-left-11xy1 cursor-pointer`}
                //href="#"

                data-value={props.id}
                title={"click to like"}
                onClick={() => storeScrollPosition2(props.likes, event)}
              >
                Likes:
              </span>
              <span
                className="margin-bottom-xy ib margin-left-11tx font-weight-900-"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {props.likes === undefined ? 0 : props.likes}
              </span>





              {props.rt !== "readonly"  ? (
                <span>
                  <span
                    ref={myRef3}
                    className={`font-weight-900- margin-left-11xy1 cursor-pointer`}
                    //href="#"

                    data-value={props.id}
                    title={"click to select to the top ten"}
                    onClick={() => storeScrollPosition3(props.star, event)}
                  >
                     {/* <span>🧸put in top ten:</span> */}
                     Star:
                  </span>

                  <span
                    className="margin-bottom-xy ib margin-left-11tx font-weight-900-"
                    title={"This is a selection to the top ten."}
                  >
                    {props.star === undefined ? "No" : props.star===1?"Yes":"No"}
                    {/* {props.star === undefined ? "No" : "Yes"} */}
                  </span>
                </span>
              ) : (<span></span>
                // <span>
                //   <span
                //     ref={myRef3}
                //     className={`font-weight-900- margin-left-11xy1 cursor-pointer pointereventsnone`}
                //     //href="#"

                //     data-value={props.id}
                //     title={"click to select to the top ten"}
                //     onClick={() => storeScrollPosition3(props.star, event)}
                //   >
                //     star:
                //   </span>

                //   <span
                //     className="margin-bottom-xy ib margin-left-11tx font-weight-900-"
                //     title={"This is a selection to the top ten."}
                //   >
                //     {props.star === undefined ? 0 : props.star}
                //   </span>
                // </span>
              )}
            </span>
          </div>
        ) : (
          <div>
            <span className="">
              <span className="pointereventsnone">
                <span className="margin-left-11">Remove link:&nbsp;</span>
                <input
                  type="checkbox"
                  id={"delete%" + props.id}
                  name={"delete%" + props.id}
                  value={props.id}
                  //onChange={handleCheckboxDelete}
                  title="click to remove url"
                  className="pointereventsnone"
                />
                <label htmlFor={"delete%" + props.id} />
              </span>
              <span className="pointereventsnone">
                <span className="color-black margin-left-11">
                  Make link private:&nbsp;
                </span>
                <input
                  type="checkbox"
                  id={"private%" + props.id}
                  name={"private%" + props.id}
                  value={props.id}
                  //onChange={handleCheckboxPrivate}
                  title="click to make url private"
                  className="pointereventsnone"
                />
                <label htmlFor={"private%" + props.id} />
              </span>

              {/* <span className="ib padding-right-11 inline-block-margin-left-1 color-purple pointereventsnone">
                                      <span className="color-black">
                                        {!!props.archive
                                          ? "unarchive it"
                                          : "archive it"}
                                        :&nbsp;
                                      </span>
                                      <input
                                       
                                        type="checkbox"
                                        id={"archive%" + props.id}
                                        name={"archive%" + props.id}
                                        value={props.id}
                                        // onChange={() =>
                                        //   handleCheckboxArchive(
                                        //     !!props.archive,
                                        //     event,
                                        //   )
                                        // }
                                        title={!!props.archive ?"click to archive it":"click to unarchive it"}
                                        className="cb1 cursor-pointer pointereventsnone"
                                      />
                                      <label htmlFor={"archive%" + props.id} />
                                    </span>  */}
             
<span className="margin-left-11xy">
                {" "}
                Views:
                <span
                  className="ib margin-left-11tx font-weight-900-"
                  title={
                    "This is the number of times someone has clicked this link."
                  }
                >
                  {props.frequency === undefined ? 0 : props.frequency}
                </span>
              </span>


<span className="margin-left-11xy">
                {" "}
                Likes:
                <span
                  className="ib margin-left-11tx font-weight-900-"
                  title={
                    "This is the number of times someone has clicked this link."
                  }
                >
                  {props.likes === undefined ? 0 : props.likes}
                </span>
              </span>

            {props.rt !== "readonly" && <span className="margin-left-11xy">
                
                {/* 🧸put in top ten: */}
                Star:
                <span
                  className="ib margin-left-11tx font-weight-900-"
                  title={
                    "This is the number of times someone has clicked this link."
                  }
                >
                  {props.star === undefined ? "No" : props.star===1?"Yes":"No"}
                  {/* {props.star === undefined ? "No" : "Yes"} */}
                </span>
              </span>}


           
            </span>
          </div>
        )}
      </div>

      <div className="italicText text-size-10 color-purple margin-left-11p1 color-black-2">
        <span className="ib- padding-left-1122 margin-top-n-15a margin-bottom-abc">
          Link saved on:{" "}
          {moment(props.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </span>
      </div>

      <div className="normal-wrap">
        {/* {putinnewlines(props.note)} */}
        {props.note}
      </div>
      {/* {props.signup.signup === true && (
        <div className="flexrow2w">
          <MayDoInGoogleDocument />
          <CalendarGoogle />
          <FBShareButton url={props.Url} />

          <MessengerButton />
          <LinkedInShareButton url={props.Url} />

          <XShareButton url={props.Url} />
          <MapQuestButton />
          <AlarmClockButton />
          <GoogleMapsButton />
          <GoogleEarthButton />
        </div>
      )} */}
    </div>
  );
};

//export default LinkListItem;
//
const mapStateToProps = (state) => ({
  thetotalstars: state.thetotalstars,
  signup: state.signup,
  sortBy: state.sortBy,
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveLink: (data) => dispatch(startRemoveLink(data)),
  removeLink: (data) => dispatch(removeLink(data)),
  startPrivateLink: (data) => dispatch(startPrivateLink(data)),
  privateLink: (data) => dispatch(privateLink(data)),
  startPrivateLink2: (data) => dispatch(startPrivateLink2(data)),
  privateLink2: (data) => dispatch(privateLink2(data)),
  startArchiveLink: (data) => dispatch(startArchiveLink(data)),
  archiveLink: (data) => dispatch(archiveLink(data)),
  startArchiveLink2: (data) => dispatch(startArchiveLink2(data)),
  archiveLink2: (data) => dispatch(archiveLink2(data)),
  incrementLinkClickCount: (data) => dispatch(incrementLinkClickCount(data)),
  incrementLinkLikesClickCount: (data) =>
    dispatch(incrementLinkLikesClickCount(data)),
  decrementLinkLikesClickCount: (data) =>
    dispatch(decrementLinkLikesClickCount(data)),
  incrementLinkStarClickCount: (data) =>
    dispatch(incrementLinkStarClickCount(data)),
  decrementLinkStarClickCount: (data) =>
    dispatch(decrementLinkStarClickCount(data)),
  incrementTotalStarClickCount: (data) =>
    dispatch(incrementTotalStarClickCount(data)),
  decrementTotalStarClickCount: (data) =>
    dispatch(decrementTotalStarClickCount(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LinkListItem),
);
