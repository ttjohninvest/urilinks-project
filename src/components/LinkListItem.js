import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { startRemoveLink, removeLink } from "../actions/links";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import FBShareButton from "./FBShareButton";
//import FBShareButton2 from "./FBShareButton2";
import MessengerButton from "./MessengerButton";
import LinkedInShareButton from "./LinkedInShareButton";
import XShareButton from "./XShareButton";
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
  console.log(
    "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL=" + props.faviconURL
  );
  const myRef = useRef(null);

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
      //alert("Item deleted.");
    } else {
      // User clicked Cancel
      document.getElementById("delete%" + event.target.value).checked = false;
      alert("Deletion canceled.");
    }
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition", window.scrollY);
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here////
  };

  const sortit2 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length
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

    console.log(
      "data1 sorted by two fields name and pathname=" +
        JSON.stringify(data1s, null, 4)
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    ul.innerHTML = "";
    if (data1s.length === 0) {
      let li = document.createElement("li");
      li.className = "lsn corangered";
      li.innerHTML = `Results: 0`;

      ul.appendChild(li);
    } else {
      let li0 = document.createElement("li");
      li0.className = "lsn corangered";
      li0.innerHTML = `Results: ${data1s.length} url(s)`;

      ul.appendChild(li0);

      data1s.map((d) => {
        let li = document.createElement("li");

        let a = document.createElement("a");
        a.title = "click to open the page";
        a.className = "nounderline color-purple";
        a.href = d.url;
        a.target = "_blank";
        a.innerHTML = `${decodeURIComponent(d.url)}`;

        // li.appendChild(a);

        // ul.appendChild(li);

        let a2 = document.createElement("a");
        a2.title = `click to open page,${d.hostname}`;
        a2.className = "nounderline color-black";
        a2.href = "https://" + d.hostname;
        a2.target = "_blank";
        a2.innerHTML = `${d.hostname}`;

        let span2 = document.createElement("span");
        let br2 = document.createElement("br");

        span2.appendChild(a);
        span2.appendChild(br2);
        span2.appendChild(a2);
        //https://www.google.com/search?q=arthritis

        let pathnamearray = d.pathname.split("/");

        for (let i = 0; i < pathnamearray.length; i++) {
          if (pathnamearray[i + 1] !== undefined) {
            let a3 = document.createElement("a");
            a3.title = `click to google search for ${pathnamearray[i + 1]}`;
            a3.className = "nounderline color-black";
            a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
            a3.target = "_blank";
            a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
            span2.appendChild(a3);
          }
        }

        li.appendChild(span2);
        ul.appendChild(li);
      });
    }
  };

  const sortit1 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length
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
        JSON.stringify(data1s, null, 4)
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    ul.innerHTML = "";
    if (data1s.length === 0) {
      let li = document.createElement("li");
      li.className = "lsn corangered";
      li.innerHTML = `Results: 0`;

      ul.appendChild(li);
    } else {
      let li0 = document.createElement("li");
      li0.className = "lsn corangered";
      li0.innerHTML = `Results: ${data1s.length} url(s)`;

      ul.appendChild(li0);

      data1s.map((d) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.title = "click to open the page";
        a.className = "nounderline color-purple";
        a.href = d.url;
        //a.target = "_blank";
        a.innerHTML = `${decodeURIComponent(d.url)}`;

        let a2 = document.createElement("a");
        a2.title = `click to open page,${d.hostname}`;
        a2.className = "nounderline color-black";
        a2.href = "https://" + d.hostname;
        a2.target = "_blank";
        a2.innerHTML = `${d.hostname}`;

        let span2 = document.createElement("span");
        let br2 = document.createElement("br");

        span2.appendChild(a);
        span2.appendChild(br2);
        span2.appendChild(a2);
        //https://www.google.com/search?q=arthritis

        let pathnamearray = d.pathname.split("/");

        for (let i = 0; i < pathnamearray.length; i++) {
          if (pathnamearray[i + 1] !== undefined) {
            let a3 = document.createElement("a");
            a3.title = `click to google search for ${pathnamearray[i + 1]}`;
            a3.className = "nounderline color-black";
            a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
            a3.target = "_blank";
            a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
            span2.appendChild(a3);
          }
        }

        li.appendChild(span2);
        ul.appendChild(li);
      });
    }
  };

  const sortit3 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length
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
        JSON.stringify(data1s, null, 4)
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    ul.innerHTML = "";
    if (data1s.length === 0) {
      let li = document.createElement("li");
      li.className = "lsn corangered";
      li.innerHTML = `Results: 0`;

      ul.appendChild(li);
    } else {
      let li0 = document.createElement("li");
      li0.className = "lsn corangered";
      li0.innerHTML = `Results: ${data1s.length} url(s)`;

      ul.appendChild(li0);

      data1s.map((d) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.title = "click to open the page";
        a.className = "nounderline color1- color-purple";
        a.href = d.url;
        a.target = "_blank";
        a.innerHTML = `${decodeURIComponent(d.url)}`;

        let a2 = document.createElement("a");
        a2.title = `click to open page,${d.hostname}`;
        a2.className = "nounderline color-black";
        a2.href = "https://" + d.hostname;
        a2.target = "_blank";
        a2.innerHTML = `${d.hostname}`;

        let span2 = document.createElement("span");
        let br2 = document.createElement("br");

        span2.appendChild(a);
        span2.appendChild(br2);
        span2.appendChild(a2);
        //https://www.google.com/search?q=arthritis

        let pathnamearray = d.pathname.split("/");

        for (let i = 0; i < pathnamearray.length; i++) {
          if (pathnamearray[i + 1] !== undefined) {
            let a3 = document.createElement("a");
            a3.title = `click to google search for ${pathnamearray[i + 1]}`;
            a3.className = "nounderline color-black";
            a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
            a3.target = "_blank";
            a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
            span2.appendChild(a3);
          }
        }

        li.appendChild(span2);
        ul.appendChild(li);
      });
    }
  };

  const sortit4 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.obj.data.length=" +
        event.currentTarget.obj.data.length
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

    console.log(
      "data1 sorted by name and extension in hostname=" +
        JSON.stringify(data1s, null, 4)
    );
    //setData2s(data1s)
    //setSortit1flag(true) //sortit1flag
    //setS(1) //makes the other list ready to be displayed
    const ul = document.getElementById("uldata" + event.currentTarget.obj.id);
    ul.innerHTML = "";
    if (data1s.length === 0) {
      let li = document.createElement("li");
      li.className = "lsn corangered";
      li.innerHTML = `Results: 0`;

      ul.appendChild(li);
    } else {
      let li0 = document.createElement("li");
      li0.className = "lsn corangered";
      li0.innerHTML = `Results: ${data1s.length} url(s)`;

      ul.appendChild(li0);

      data1s.map((d) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.title = "click to open the page";
        a.className = "nounderline color-purple";
        a.href = d.url;
        a.target = "_blank";
        a.innerHTML = `${decodeURIComponent(d.url)}`;

        let a2 = document.createElement("a");
        a2.title = `click to open page,${d.hostname}`;
        a2.className = "nounderline color-black";
        a2.href = "https://" + d.hostname;
        a2.target = "_blank";
        a2.innerHTML = `${d.hostname}`;

        let span2 = document.createElement("span");
        let br2 = document.createElement("br");

        span2.appendChild(a);
        span2.appendChild(br2);
        span2.appendChild(a2);
        //https://www.google.com/search?q=arthritis

        let pathnamearray = d.pathname.split("/");

        for (let i = 0; i < pathnamearray.length; i++) {
          if (pathnamearray[i + 1] !== undefined) {
            let a3 = document.createElement("a");
            a3.title = `click to google search for ${pathnamearray[i + 1]}`;
            a3.className = "nounderline color-black";
            a3.href = "https://www.google.com/search?q=" + pathnamearray[i + 1];
            a3.target = "_blank";
            a3.innerHTML = `,  ${decodeURIComponent(pathnamearray[i + 1])}`;
            span2.appendChild(a3);
          }
        }

        li.appendChild(span2);
        ul.appendChild(li);
      });
    }
  };

  const getUrlsList = (url2, id) => {
    if (s === 1) {
      setS(0);
      const ul = document.getElementById("uldata" + id);
      ul.innerHTML = "";
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
            let li = document.createElement("li");
            li.className = "lsn corangered";
            li.innerHTML = `Results: 0`;

            ul.appendChild(li);

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
            ul.appendChild(span);

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
            ul.appendChild(span2);

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
            ul.appendChild(span4);

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
            ul.appendChild(span3);

            let li0 = document.createElement("li");
            li0.className = "lsn corangered";
            li0.innerHTML = `Results: ${data.length} url(s)`;

            ul.appendChild(li0);

            //here
            data.map((url, index) => {
              //let urlstruct = new URL(url);
              // console.log("urlstruct.protocol="+urlstruct.protocol); // "https:"
              // console.log("urlstruct.hostname="+urlstruct.hostname); // "www.example.com"
              // console.log("urlstruct.port="+urlstruct.port); // "8080"
              // console.log("urlstruct.pathname="+urlstruct.pathname); // "/path/to/page"
              // console.log("urlstruct.search="+urlstruct.search); // "?query=string"
              // console.log("urlstruct.hash="+urlstruct.hash); // "#fragment"
              let li = document.createElement("li");
              li.id = index; //index has to be unique
              li.title = "click to go to page";
              let a = document.createElement("a");
              a.title = "click to open the page";
              a.className = "nounderline color1- color-purple";
              a.href = url; //use a.href='#' for drilldown version
              a.target = "_blank"; //remove the target attribute for drilldown version
              //a.onClick = {()=>drilldown(url,index)}
              a.innerHTML = `${decodeURIComponent(url)}`; //data.title+", "+`${url}`;

              li.appendChild(a);

              ul.appendChild(li);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setS(1);
      const ul = document.getElementById("uldata" + id);
      ul.innerHTML = "";
    }
  };
  //
  return (
    <div>
    {
    //link.showpublic === 
    true && 
  
  <div 
  key={props.index}
  >
    <div className="margin-bottom-1">
      <div className="card-background-color">
        <div className="list-item__flex">
          <div className="">
            <div className="flexrow2t border-green-">
             
              <div className={`${!!props.link.yturl?"":"margin-top-1"}`}>
                <div className="flexcol3">
                  <div className={`flexrow4 border-green-`}>
                    <div className="margin-top-1q">
                        <img
                            className=""
                            width="20"
                            height="20"
                            src={props.link.faviconURL}
                        />
                    </div>
                    <div>
                      {
                        //isityt(props.Url)
                        !!props.link.yturl && (
                          //true
                          <a
                            ref={myRef}
                            className="ib nounderline text-size-5 color-purple margin-left-11 margin-top-1"
                            href={props.link.Url}
                            //target="_self"
                            target="_blank"
                            title={"click to open the webpage: " + props.link.Url}
                            onClick={storeScrollPosition}
                          >
                            <img
                              className="borderRadius4 rem8- rem45-"
                              
                              src={props.link.yturl}
                            />
                          </a>
                        )
                      }
                      </div>
                      <div>
                      <a
                        ref={myRef}
                        className={`ib nounderline text-size-5 text-color-db color-purple breakWord margin-left-11 ${!!link.yturl?"":"padding-top-n-hh"}`}
                        href={props.link.Url}
                        //target="_self"
                        target="_blank"
                        title={"click to open the webpage: " + props.link.Url}
                        onClick={storeScrollPosition}
                      >
                        Show Page: {decodeURIComponent(props.link.description)}
                      </a>
                    </div>
                    <div className="margin-bottom-1141">
                      <div className="flexrow4">
                        {props.signup.signup === true ? (
                          <div>
                           <Link
                              className="nounderline text-size-5 inline-block-margin-left-1 pointereventsauto"
                              to={`/edit/${props.link.id}`}
                            >
                              <span className="padding-right-11 color-white-1 button-2">
                                edit or remove
                              </span>
                            </Link>
                          </div>
                        ) : (
                          <div>
                           <Link
                              className="nounderline text-size-5 inline-block-margin-left-1 pointereventsnone"
                              to={`/edit/${props.link.id}`}
                            >
                              <span className="padding-right-11 color-white-1 button-2">
                                edit or remove
                              </span>
                            </Link>
                          </div>
                        )}
                        {props.signup.signup === true ? (
                          <div>
                           <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsauto">
                              <input
                                type="checkbox"
                                id={"delete%" + props.link.id}
                                name={"delete%" + props.link.id}
                                value={props.link.id}
                                onChange={handleCheckboxDelete}
                                title="remove bookmark"
                                className="cb1 cursor-pointer"
                              />
                              <label for={"delete%" + props.link.id} />
                            </span>
                          </div>
                        ) : (
                          <div>
                             <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsnone">
                              <input
                                type="checkbox"
                                id={"delete%" + props.link.id}
                                name={"delete%" + props.link.id}
                                value={props.link.id}
                                onChange={handleCheckboxDelete}
                                title="remove bookmark"
                                className="cb1 cursor-pointer"
                              />
                              <label for={"delete%" + props.link.id} />
                            </span>
                            
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                   {/* <div>
                    <span
                      className="ib margin-left-114"
                      title="click the following link to see an index of clickable urls on the page."
                    >
                      PAGE URLS SOURCE:
                      <br />
                      <span
                        onClick={() => getUrlsList(props.Url, props.id)}
                        className="ib cursor-pointer margin-left-114 color1-  color-purple"
                        title="click to see the clickable page urls from the above page"
                      >
                        Show List: {decodeURIComponent(props.Url)}
                        
                      </span>
                    </span>
                  </div>  */}
                </div>

                <ol id={"uldata" + props.link.id} start="0"></ol>
              </div>
            </div>
          </div>
          {/* <div className="">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${props.id}`}>
               
                  <span className="padding-right-11 inline-block-margin-left-1 padding-bottom-11 color-white-1 button-2">
                    edit or remove
                  </span>
                  
               
              </Link>
              <span className="padding-right-11 inline-block-margin-left-1 padding-bottom-11 color-purple">
                   <input type="checkbox" id={"delete%"+props.id} name={"delete%"+props.id} value={props.id} onChange={handleCheckboxDelete} title="remove bookmark" className="cb1 cursor-pointer" />
                   <label for={"delete%"+props.id} />
                  </span>
            </h3>
          </div> */}
        </div>

        <div className="italicText list-item__sub-title- padding-left-1 text-size-10 color-purple margin-left-11p">
          Link saved on: {moment(props.link.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </div>
      </div>
      <div className="text-size-1 font-weight-1 card-background-color padding-bottom-2 padding-left-2  text-color-db text-size-2 margin-left-11p-">
        {props.link.note}
      </div>
      <div className="flexrow2w">
        <FBShareButton url={props.link.Url} />

        <MessengerButton />
        <LinkedInShareButton url={props.link.Url} />
        {/* <AddToAny /> */}

        <XShareButton url={props.link.Url} />
      </div>
    </div>

   
      </div>
    
    }


    </div>
  );
};

//export default LinkListItem;

const mapStateToProps = (state) => ({
  signup: state.signup,
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveLink: (data) => dispatch(startRemoveLink(data)),
  removeLink: (data) => dispatch(removeLink(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListItem);
