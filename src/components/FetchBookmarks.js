import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { history } from "../routers/AppRouter";
import ImportedBookmarks from "./ImportedBookmarks";
import { storage } from "../firebase/firebase";

import {
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
  isOpera,
  isBrave,
} from "react-device-detect";

const FetchBookmarks = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [importingError, setImportingError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [max, setMax] = useState(0);
  const [rl, setRl] = useState(0);
  const [loopmax, setLoopmax] = useState(0);

  const handleNavigation = () => {
    setShowDialog(true);
  };

  const handleConfirmNavigation = () => {
    history.push("/");
    setShowDialog(false);
  };

  const deleteFile = async (fileUrl) => {
    try {
      //const fileRef = ref(storage, fileUrl);
      const fileRef = storage.refFromURL(fileUrl);

      await fileRef.delete();
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  };

  const getHashtag = (str) => {
    //remove whitespace
    //const allSpacesRemoved = str.replaceAll(' ', '')
    let stringWithoutTabs = str.replace(/\t/g, "");
    let notabsorspaces = stringWithoutTabs.replace(/\s/g, "");
    let notabsorspacesordashes = stringWithoutTabs.replace(/\-/g, "");
    //lowercase
    const lc = notabsorspacesordashes.toLowerCase();
    //prepend "#"
    const hashtag = "#" + lc;
    //return the hashtag
    return hashtag;
  };

  const hasControlCharacters = (str) => {
    const regex = /\\c[ABCDEFGHIKLNOPQRSUVWXYZ]/;
    const result = regex.test(str);
    return result;
  };

  useEffect(() => {
    //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
    if (props.url === "") setImportingError(true);
    const text = "Is it ok to upload the bookmarks?";
    if (confirm(text) == true) {
      //gs://see-my-index-project-7.firebasestorage.app/files/bookmarks_6_9_25.html
      //fetch("https://urilinks.com/bookmarks_6_9_25.html") //use the url from FileUpload.js
      //.then(response => response.json())
      //
      const now = new Date();
      console.log("FetchBookmarks, props.url=" + props.url);
      //fetch("https://firebasestorage.googleapis.com/v0/b/see-my-index-project-7.firebasestorage.app/o/files%2Fbookmarks_6_9_25.html?alt=media&token=6fc9650d-d319-43ab-b2ed-529b3bfcec8b")
      fetch(props.url)
        .then((response) => response.text())
        .then((data2) => {
          // console.log("data=")
          // console.log("data="+data)

          //console.log("data="+data)
          setData(data2);
          console.log("data.length=" + data2.length);
          console.log("data.length/1024=" + data2.length / 1024);

          //const text = `<p>Some text</p><br /><a href="https://daily-dev-tips.com/">My website</a><hr /><a href="https://google.com">Another link</a>`;

          let parser = new DOMParser();
          const doc = parser.parseFromString(data2, "text/html");
          //let links = doc.getElementsByTagName("a"); // This returns an HTMLCollection of all <a> tags

          //max size of bookmarks file that can be passed is 100kb
          console.log("data2=" + data2);
          console.log("typeof data2=" + typeof data2);
          let htmlContent = data2;
          //htmlContent = "abc"

          let title = doc.getElementsByTagName("title");

          if (
            title &&
            title.item(0) &&
            title.item(0).innerText === "Bookmarks"
          ) {
            let l = 0;
            let hashtagsArray = [];
            //console.log(data.message.length)
            //console.log(data.message[0].children.length)
            // console.log(data.message[0].children[0].title)
            // console.log(data.message[0].children[1].title)
            // console.log(data.message[1].children[0].title)
            // console.log(data.message[1].children[1].title)

            let r = true;
            let htmllinksarray = [];

            fetch("https://urilinks-project-vercel-api-5.vercel.app", {
              method: "POST",
              headers: {
                "Content-Type": " text/plain; charset=UTF-8",
              },
              body: htmlContent,
            })
              .then((response) => response.json())
              .then((data) => {
                //json
                console.log("Success:", data);
                if (data.error) {
                  console.log(data.error);
                  return;
                }
                //////
                //message.type="folder" process message.children[i] too
                //hashtagsArray[0]=getHashtag(data.message[0].children[0].title="Bookmarks-A") //#bookmarks-a
                //hashtagsArray[1]=getHashtag(data.message[0].children[1].title="Bookmarks-B") //#bookmarks-b
                //hashtagsArray[2]=getHashtag(data.message[1].children[0].title="Bookmarks-C") //#bookmarks-c
                //hashtagsArray[3]=getHashtag(data.message[1].children[1].title="Bookmarks-D") //#bookmarks-d
                //message.type="folder" process message.children[i] too
                // console.log("outside of all the loops");
                //let hashtagv;
                for (let i = 0; data.message && i < data.message.length; i++) {
                  if (i === 0) {
                    const hashtagv1 = getHashtag(data.message[i].title);

                    for (
                      let j = 0;
                      data.message[i].children &&
                      j < data.message[i].children.length;
                      j++
                    ) {
                      if (
                        data.message[i].children[j].type === "bookmark" ||
                        data.message[i].children[j].type === undefined
                      ) {
                        let url = data.message[i].children[j].url; //the url of the page
                        let title = data.message[i].children[j].title; //the link text for the page
                        let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                        let icon = data.message[i].children[j].icon; //the little icon of the page

                        console.log("title=" + title);
                        if (!hasControlCharacters(title) && title.length > 0) {
                          //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                          console.log("pushing unto htmllinksarray");
                          htmllinksarray.push({
                            description: title,
                            Url: url, //, //href,
                            note: hashtagv1,
                            amount: 0,
                            createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                            faviconURL: icon, //"https://google.com/favicon.ico" //icon
                          });
                        }
                      } else {
                        console.log(
                          "data.message[i].children[j].children=" +
                            JSON.stringify(data.message[i].children[j].children)
                        );

                        const hashtagv2 = getHashtag(
                          data.message[i].children[j].title
                        );
                        for (
                          let k = 0;
                          data.message[i].children[j].children &&
                          k < data.message[i].children[j].children.length;
                          k++
                        ) {
                          if (
                            data.message[i].children[j].children[k].type ===
                            "bookmark"
                          ) {
                            let url =
                              data.message[i].children[j].children[k].url; //the url of the page
                            console.log("url=" + url);
                            let title =
                              data.message[i].children[j].children[k].title; //the link text for the page
                            let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                            let icon =
                              data.message[i].children[j].children[k].icon; //the little icon of the page

                            console.log("title=" + title);
                            if (
                              !hasControlCharacters(title) &&
                              title.length > 0
                            ) {
                              //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                              console.log("pushing unto htmllinksarray");
                              htmllinksarray.push({
                                description: title,
                                Url: url, //, //href,
                                note: hashtagv2,
                                amount: 0,
                                createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                faviconURL: icon, //"https://google.com/favicon.ico" //icon
                              });
                            }
                          } else {
                            const hashtagv3 = getHashtag(
                              data.message[i].children[j].children[k].title
                            );
                            console.log("hashtagv3"+hashtagv3)
                            for (
                              let l = 0;
                              data.message[i].children[j].children[k]
                                .children &&
                              l <
                                data.message[i].children[j].children[k].children
                                  .length;
                              l++
                            ) {
                              if (
                                data.message[i].children[j].children[k]
                                  .children[l].type === "bookmark"
                              ) {
                                let url =
                                  data.message[i].children[j].children[k]
                                    .children[l].url; //the url of the page
                                console.log("url=" + url);
                                let title =
                                  data.message[i].children[j].children[k]
                                    .children[l].title; //the link text for the page
                                let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                let icon =
                                  data.message[i].children[j].children[k]
                                    .children[l].icon; //the little icon of the page

                                console.log("title=" + title);
                                if (
                                  !hasControlCharacters(title) &&
                                  title.length > 0
                                ) {
                                  //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                  console.log("pushing unto htmllinksarray");
                                  htmllinksarray.push({
                                    description: title,
                                    Url: url, //, //href,
                                    note: hashtagv3,
                                    amount: 0,
                                    createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                    faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                  });
                                } else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                              } else {
                                //folder
                                const hashtagv4 = getHashtag(
                                  data.message[i].children[j].children[k]
                                    .children[l].title
                                );
                                console.log("hashtagv4="+hashtagv4)
                                for (
                                  let m = 0;
                                  data.message[i].children[j].children[k]
                                    .children[l].children &&
                                  m <
                                    data.message[i].children[j].children[k]
                                      .children[l].children.length;
                                  m++
                                ) {
                                  if (
                                    data.message[i].children[j].children[k]
                                      .children[l].children[m].type ===
                                    "bookmark"
                                  ) {
                                    let url =
                                      data.message[i].children[j].children[k]
                                        .children[l].children[m].url; //the url of the page
                                    console.log("url=" + url);
                                    let title =
                                      data.message[i].children[j].children[k]
                                        .children[l].children[m].title; //the link text for the page
                                    let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                    let icon =
                                      data.message[i].children[j].children[k]
                                        .children[l].children[m].icon; //the little icon of the page

                                    console.log("title=" + title);
                                    if (
                                      !hasControlCharacters(title) &&
                                      title.length > 0
                                    ) {
                                      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                      console.log(
                                        "pushing unto htmllinksarray"
                                      );
                                      htmllinksarray.push({
                                        description: title,
                                        Url: url, //, //href,
                                        note: hashtagv4,
                                        amount: 0,
                                        createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                        faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                      });
                                    }else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                                  } else {
                                    const hashtagv5 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].children[m].title
                                    );
console.log("hashtagv5="+hashtagv5)
                                    for (
                                      let n = 0;
                                      data.message[i].children[j].children[k]
                                        .children[l].children[m].children &&
                                      n <
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children
                                          .length;
                                      n++
                                    ) {
                                      if (
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children[n]
                                          .type === "bookmark"
                                      ) {
                                        let url =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .url; //the url of the page
                                        console.log("url=" + url);
                                        let title =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .title; //the link text for the page
                                        let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                        let icon =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .icon; //the little icon of the page

                                        console.log("title=" + title);
                                        if (
                                          !hasControlCharacters(title) &&
                                          title.length > 0
                                        ) {
                                          //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                          console.log(
                                            "pushing unto htmllinksarray"
                                          );
                                          htmllinksarray.push({
                                            description: title,
                                            Url: url, //, //href,
                                            note: hashtagv5,
                                            amount: 0,
                                            createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                            faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                          });
                                        }else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                                      } else {
                                        const hashtagv6 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .title
                                        );
console.log("hashtagv5="+hashtagv5)
                                        for (
                                          let o = 0;
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .children &&
                                          o <
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children.length;
                                          o++
                                        ) {
                                          if (
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children[o].type ===
                                            "bookmark"
                                          ) {
                                            let url =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].url; //the url of the page
                                            console.log("url=" + url);
                                            let title =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].title; //the link text for the page
                                            let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                            let icon =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].icon; //the little icon of the page

                                            console.log("title=" + title);
                                            if (
                                              !hasControlCharacters(title) &&
                                              title.length > 0
                                            ) {
                                              //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                              console.log(
                                                "pushing unto htmllinksarray"
                                              );
                                              htmllinksarray.push({
                                                description: title,
                                                Url: url, //, //href,
                                                note: hashtagv6,
                                                amount: 0,
                                                createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                              });
                                            }else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                                          } else {
                                            const hashtagv7 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].title
                                            );
console.log("hashtagv7="+hashtagv7)
                                            for (
                                              let p = 0;
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].children &&
                                              p <
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].children.length;
                                              p++
                                            ) {
                                              if (
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].children[p]
                                                  .type === "bookmark"
                                              ) {
                                                let url =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].children[p]
                                                    .url; //the url of the page
                                                console.log("url=" + url);
                                                let title =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].children[p]
                                                    .title; //the link text for the page
                                                let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                                let icon =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].children[p]
                                                    .icon; //the little icon of the page

                                                console.log("title=" + title);
                                                if (
                                                  !hasControlCharacters(
                                                    title
                                                  ) &&
                                                  title.length > 0
                                                ) {
                                                  //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                  console.log(
                                                    "pushing unto htmllinksarray"
                                                  );
                                                  htmllinksarray.push({
                                                    description: title,
                                                    Url: url, //, //href,
                                                    note: hashtagv7,
                                                    amount: 0,
                                                    createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                    faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                  });
                                                }else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                                              } else {
                                                const hashtagv8 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].children[p]
                                                    .title
                                                );
console.log("hashtagv8="+hashtagv8)
                                                for (
                                                  let q = 0;
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].children[p]
                                                    .children &&
                                                  q <
                                                    data.message[i].children[j]
                                                      .children[k].children[l]
                                                      .children[m].children[n]
                                                      .children[o].children[p]
                                                      .children.length;
                                                  q++
                                                ) {
                                                  if (
                                                    data.message[i].children[j]
                                                      .children[k].children[l]
                                                      .children[m].children[n]
                                                      .children[o].children[p]
                                                      .type === "bookmark"
                                                  ) {
                                                    let url =
                                                      data.message[i].children[
                                                        j
                                                      ].children[k].children[l]
                                                        .children[m].children[n]
                                                        .children[o].children[p]
                                                        .children[q].url; //the url of the page
                                                    console.log("url=" + url);
                                                    let title =
                                                      data.message[i].children[
                                                        j
                                                      ].children[k].children[l]
                                                        .children[m].children[n]
                                                        .children[o].children[p]
                                                        .children[q].title; //the link text for the page
                                                    let add_date =
                                                      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                                    let icon =
                                                      data.message[i].children[
                                                        j
                                                      ].children[k].children[l]
                                                        .children[m].children[n]
                                                        .children[o].children[p]
                                                        .children[q].icon; //the little icon of the page

                                                    console.log(
                                                      "title=" + title
                                                    );
                                                    if (
                                                      !hasControlCharacters(
                                                        title
                                                      ) &&
                                                      title.length > 0
                                                    ) {
                                                      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                      console.log(
                                                        "pushing unto htmllinksarray"
                                                      );
                                                      htmllinksarray.push({
                                                        description: title,
                                                        Url: url, //, //href,
                                                        note: hashtagv8,
                                                        amount: 0,
                                                        createdAt:
                                                          now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                        faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                      });
                                                    }else {
                                  console.log("NOT pushing unto htmllinksarray");
                                }
                                                  } else {
                                                    const hashtagv9 = getHashtag(
                                                      data.message[i].children[
                                                        j
                                                      ].children[k].children[l]
                                                        .children[m].children[n]
                                                        .children[o].children[p]
                                                        .children[q].title
                                                    );

for (
let r = 0;
data.message[i].children[
  j
].children[k].children[l]
  .children[m].children[n]
  .children[o].children[p]
  .children[q].children &&
r <
  data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children.length;
r++
) {
if (
  data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].type === "bookmark"
) {
  let url =
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].url; //the url of the page
  console.log(
    "url=" + url
  );
  let title =
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].title; //the link text for the page
  let add_date =
    now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
  let icon =
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].icon; //the little icon of the page

  console.log(
    "title=" + title
  );
  if (
    !hasControlCharacters(
      title
    ) &&
    title.length > 0
  ) {
    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
    console.log(
      "pushing unto htmllinksarray"
    );
    htmllinksarray.push({
      description: title,
      Url: url, //, //href,
      note: hashtagv9,
      amount: 0,
      createdAt:
        now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
      faviconURL: icon, //"https://google.com/favicon.ico" //icon
    });
  }
} else {
  const hashtagv10 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].title
  );

  for (
    let s = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r]
      .children &&
    s <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children.length;
    s++
  ) {
    if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv10,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  } else {
    const hashtagv11 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].title
  );

  for (
    let t = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s]
      .children &&
    t <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s]
        .children.length;
    t++
  ) {
    if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].type ==="bookmark"){
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv11,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else {
 const hashtagv12 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].title
  );

  for (
    let u = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t]
      .children &&
    u <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t]
        .children.length;
    u++
  ) {
    if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].type ==="bookmark"){
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv12,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else {
const hashtagv13 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].title
  );

  for (
    let v = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u]
      .children &&
    v <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u]
        .children.length;
    v++
  ) {
   if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv13,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv14 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].title
  );

  for (
    let w = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v]
      .children &&
    w <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v]
        .children.length;
    w++
  ) {
  if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv14,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv15 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].title
  );

  for (
    let x = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w]
      .children &&
    x <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w]
        .children.length;
    x++
  ) {
  if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].children[
    w
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv15,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv16 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].title
  );

  for (
    let y = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x]
      .children &&
    y <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w].children[x]
        .children.length;
    y++
  ) {
if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].children[
    w
  ].children[
    x
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv16,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv17 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].title
  );

  for (
    let z = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y]
      .children &&
    z <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y]
        .children.length;
    z++
  ) {
if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].children[
    w
  ].children[
    x
  ].children[
    y
  ].type ==="bookmark"){
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv17,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv18 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].title
  );

  for (
    let z1 = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z]
      .children &&
    z1 <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z]
        .children.length;
    z1++
  ) {
if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].children[
    w
  ].children[
    x
  ].children[
    y
  ].children[
    z
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv18,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv19 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].title
  );

  for (
    let z2 = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1]
      .children &&
    z2 <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1]
        .children.length;
    z2++
  ) {
if(data.message[i]
    .children[j].children[
    k
  ].children[l].children[
    m
  ].children[n].children[
    o
  ].children[p].children[
    q
  ].children[
    r
  ].children[
    s
  ].children[
    t
  ].children[
    u
  ].children[
    v
  ].children[
    w
  ].children[
    x
  ].children[
    y
  ].children[
    z
  ].children[
    z1
  ].type ==="bookmark") {
    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv19,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
  }else{
const hashtagv20 = getHashtag(
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].title
  );

  for (
    let z3 = 0;
    data.message[i]
      .children[j]
      .children[k]
      .children[l]
      .children[m]
      .children[n]
      .children[o]
      .children[p]
      .children[q]
      .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2]
      .children &&
    z3 <
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r].children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2]
        .children.length;
    z3++
  ) {

    let url =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].children[z3].url; //the url of the page
    console.log(
      "url=" + url
    );
    let title =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].children[z3]
        .title; //the link text for the page
    let add_date =
      now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
    let icon =
      data.message[i]
        .children[j]
        .children[k]
        .children[l]
        .children[m]
        .children[n]
        .children[o]
        .children[p]
        .children[q]
        .children[r]
        .children[s].children[t].children[u].children[v].children[w].children[x].children[y].children[z].children[z1].children[z2].children[z3].icon; //the little icon of the page

    console.log(
      "title=" + title
    );
    if (
      !hasControlCharacters(
        title
      ) &&
      title.length > 0
    ) {
      //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
      console.log(
        "pushing unto htmllinksarray"
      );
      htmllinksarray.push(
        {
          description:
            title,
          Url: url, //, //href,
          note: hashtagv20,
          amount: 0,
          createdAt:
            now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
          faviconURL:
            icon, //"https://google.com/favicon.ico" //icon
        }
      );
    }
 
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
  }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        } //nested for with k //
                      }
                    }
                  } else {
                    hashtagv = "#otherbookmarks";
                    //////////////////////////////////////////////
                    for (
                      let j = 0;
                      data.message[i].children &&
                      j < data.message[i].children.length;
                      j++
                    ) {
                      console.log("inside loop");

                      //let type=data.message[i].children[j].children[n].type //Bookmark
                      let url = data.message[i].children[j].url; //the url of the page
                      let title = data.message[i].children[j].title; //the link text for the page
                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                      let icon = data.message[i].children[j].icon; //the little icon of the page

                      console.log("title=" + title);
                      if (!hasControlCharacters(title) && title.length > 0) {
                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))
                        console.log("pushing unto htmllinksarray");
                        htmllinksarray.push({
                          description: title,
                          Url: url, //, //href,
                          note: hashtagv,
                          amount: 0,
                          createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                        });
                      }
                    }
                  }
                  console.log("outside loop");

                  console.log("before the end of the outer loop");
                }
                //
                console.log("three loops ended");
                console.log("htmllinksarray=" + JSON.stringify(htmllinksarray));

                let A = props.links;
                let B = htmllinksarray;
                let result = B.filter(
                  (b) => !A.some((a) => a.description === b.description)
                );

                console.log("result.length=" + result.length);
                //let ok = false;
                //500
                let ll = props.links.length;
                let rl = result.length;

                let max = 0;
                let loopmax2 = rl;

                const user = firebase.auth().currentUser;
                if (
                  user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2" ||
                  user.uid === "NyeF3Cz2yvV3gpo2dwNoBSkRI473" ||
                  user.uid === "WJGHkWycjKQxPK83Fi4zqx53bCl1" ||
                  user.uid === "kRXrwGyZoXRPKwmQoKWvG7XDx5b2"
                ) {
                  max = 10000 - (rl + ll);
                  console.log("in if, ll=" + ll);
                  console.log("in if, rl=" + rl);
                  console.log("in if, max=" + max);
                  if (rl > max) {
                    loopmax2 = max;
                  }
                } else {
                  max = 500 - (rl + ll);
                  if (rl > max) {
                    loopmax2 = max;
                  } //otherwise rl is equal to the full length, result.length
                }

                //for (let i = 0; i < result.length; i++) {
                for (let i = 0; i < loopmax2; i++) {
                  //for (let i = 0; i < 1; i++) {

                  r = props.startAddLink({
                    description: result[i].description,
                    Url: result[i].Url, //, //href,
                    note: result[i].note,
                    amount: 0,
                    createdAt: now.getTime(), //result[i].createdAt, //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                    faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
                  });

                  if (r === false) {
                    setImportingError(true);
                    break;
                  }
                }

                if (r === false) {
                  // setErrorDialog(true);
                  console.log("ERROR, VVVVVVVVVVVVV returned false");
                } else {
                  console.log("NO ERROR, VVVVVVVVVVVVV returned true");
                  //props.history.push("/");
                  //window.location.reload()

                  //how many new links were added, because of the maximum of 500 I had to add this
                  setMax(max);
                  setRl(rl); //rl is the length of the full amount to upload
                  setLoopmax(loopmax2); //loopmax2 is the modified length if rl would overflow 500
                  const fileRef = storage.refFromURL(props.url);

                  fileRef.delete();
                }
                //////
                //hashtagsArray[0]=getHashtag(data.message[0].children[0].title="Bookmarks-A") //#bookmarks-a
                //hashtagsArray[1]=getHashtag(data.message[0].children[1].title="Bookmarks-B") //#bookmarks-b
                //hashtagsArray[2]=getHashtag(data.message[1].children[0].title="Bookmarks-C") //#bookmarks-c
                //hashtagsArray[3]=getHashtag(data.message[1].children[1].title="Bookmarks-D") //#bookmarks-d

                // console.log("outside of all the loops");
                // for (let i = 0; data.message && i < data.message.length; i++) {
                //   console.log("outside loop");
                //   for (
                //     let j = 0;
                //     data.message[i].children &&
                //     j < data.message[i].children.length;
                //     j++
                //   ) {
                //     console.log("inside loop");
                //     //hashtagsArray[l]=getHashtag(data.message[i].children[j].title) //#bookmarks-a
                //     let hashtagv = getHashtag(
                //       data.message[i].children[j].title
                //     );
                //     let type = data.message[i].children[j].type;
                //     l = l + 1;
                //     if (type === "folder") {
                //       for (
                //         let n = 0;
                //         data.message[i].children[j].children &&
                //         n < data.message[i].children[j].children.length;
                //         n++
                //       ) {
                //         console.log("inside most loop");
                //         //let type=data.message[i].children[j].children[n].type //Bookmark
                //         let url = data.message[i].children[j].children[n].url; //the url of the page
                //         let title =
                //           data.message[i].children[j].children[n].title; //the link text for the page
                //         let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                //         let icon = data.message[i].children[j].children[n].icon; //the little icon of the page

                //         console.log("title=" + title);
                //         if (!hasControlCharacters(title) && title.length > 0) {
                //           //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))
                //           console.log("pushing unto htmllinksarray");
                //           htmllinksarray.push({
                //             description: title,
                //             Url: url, //, //href,
                //             note: hashtagv,
                //             amount: 0,
                //             createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                //             faviconURL: icon, //"https://google.com/favicon.ico" //icon
                //           });
                //         }
                //       }
                //     } else if (type === "bookmark") {

                //         console.log("inside most loop");
                //         //let type=data.message[i].children[j].children[n].type //Bookmark
                //         let url = data.message[i].children[j].url; //the url of the page
                //         let title =
                //           data.message[i].children[j].title; //the link text for the page
                //         let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                //         let icon = data.message[i].children[j].icon; //the little icon of the page

                //         console.log("title=" + title);
                //         if (!hasControlCharacters(title) && title.length > 0) {
                //           //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))
                //           console.log("pushing unto htmllinksarray");
                //           htmllinksarray.push({
                //             description: title,
                //             Url: url, //, //href,
                //             note: hashtagv,
                //             amount: 0,
                //             createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                //             faviconURL: icon, //"https://google.com/favicon.ico" //icon
                //           });
                //         }

                //     }
                //   }

                //   console.log("before the end of the outer loop");
                // }

                // console.log("three loops ended");
                // console.log("htmllinksarray=" + JSON.stringify(htmllinksarray));

                // let A = props.links;
                // let B = htmllinksarray;
                // let result = B.filter(
                //   (b) => !A.some((a) => a.description === b.description)
                // );

                // console.log("result.length=" + result.length);
                // //let ok = false;
                // //500
                // let ll = props.links.length;
                // let rl = result.length;

                // let max = 0;
                // let loopmax2 = rl;

                // const user = firebase.auth().currentUser;
                // if (
                //   user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2" ||
                //   user.uid === "NyeF3Cz2yvV3gpo2dwNoBSkRI473" ||
                //   user.uid === "WJGHkWycjKQxPK83Fi4zqx53bCl1" ||
                //   user.uid === "kRXrwGyZoXRPKwmQoKWvG7XDx5b2"
                // ) {
                //   max = 10000 - (rl + ll);
                //   console.log("in if, ll=" + ll);
                //   console.log("in if, rl=" + rl);
                //   console.log("in if, max=" + max);
                //   if (rl > max) {
                //     loopmax2 = max;
                //   }
                // } else {
                //   max = 500 - (rl + ll);
                //   if (rl > max) {
                //     loopmax2 = max;
                //   } //otherwise rl is equal to the full length, result.length
                // }

                // //for (let i = 0; i < result.length; i++) {
                // for (let i = 0; i < loopmax2; i++) {
                //   //for (let i = 0; i < 1; i++) {

                //   r = props.startAddLink({
                //     description: result[i].description,
                //     Url: result[i].Url, //, //href,
                //     note: result[i].note,
                //     amount: 0,
                //     createdAt: now.getTime(), //result[i].createdAt, //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                //     faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
                //   });

                //   if (r === false) {
                //     setImportingError(true);
                //     break;
                //   }
                // }

                // if (r === false) {
                //   // setErrorDialog(true);
                //   console.log("ERROR, VVVVVVVVVVVVV returned false");
                // } else {
                //   console.log("NO ERROR, VVVVVVVVVVVVV returned true");
                //   //props.history.push("/");
                //   //window.location.reload()

                //   //how many new links were added, because of the maximum of 500 I had to add this
                //   setMax(max);
                //   setRl(rl); //rl is the length of the full amount to upload
  9              //   setLoopmax(loopmax2); //loopmax2 is the modified length if rl would overflow 500
                //   const fileRef = storage.refFromURL(props.url);

                //   fileRef.delete();
                // }
              })
              .catch((error) => {
                console.log("caught error = " + error);
                if (error === "THE BROWSER IS NOT SUPPORTED") setError3(true);
                else setError2(true);
              });
          } else {
            console.log("NOT A BOOKMARKS FILE");
            deleteFile(props.url);
            throw new Error("NOT A BOOKMARKS FILE");
          }
        });
    } else {
      //handleNavigation()
      history.push("/");
    }
  }, []);

  if (!data) return <div></div>;
  //importingError===true?"Error importing bookmarks":
  return (
    <div>
      {error ? <div>Error: Unable to read from firebase storage</div> : ""}
      {error2 ? (
        <div>
          Error: The file needs to be a bookmarks file with an html extension.
        </div>
      ) : (
        ""
      )}
      {error3 ? <div>Error: The browser is not supported.</div> : ""}
      {importingError === true
        ? "Error importing bookmarks"
        : !error && !error2 && <ImportedBookmarks rl={loopmax} max={rl} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  url: state.url,
  links: state.links,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks)
);
