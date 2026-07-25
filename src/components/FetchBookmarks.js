//you have to remove the hyphens from the link text
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { history } from "../routers/AppRouter";
import ImportedBookmarks from "./ImportedBookmarks";
import ImportedBookmarks2 from "./ImportedBookmarks2";
import { storage } from "../firebase/firebase";
import LoadingPage from "./LoadingPage";
//import TeirsPayment3 from "./TeirsPayment3";
import Simple from "./Simple";
//import SimpleTest2 from "./SimpleTest2";
//import PremiumPlan from "./PremiumPlan"
import StorageSizes from "./StorageSizes";

const FetchBookmarks = (props) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [importingError, setImportingError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [max, setMax] = useState(0);
  const [rl, setRl] = useState(0);
  const [loopmax, setLoopmax] = useState(0);
  const [max2, setMax2] = useState(0);
  const [rl2, setRl2] = useState(0);
  const [loopmax2, setLoopmax2] = useState(0);
  const [done, setDone] = useState(false);
  const [morePage, setMorePage] = useState(false);
  const [payPage, setPayPage] = useState(false);
  const [oo, setOo] = useState(props.match.params.option);

  //   function getYouTubeVideoID(url) {
  //     const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  //     const match = url.match(regex);
  //     return match ? match : null;
  // }

  const closeThisPage = () => {
    setMorePage(false);
    setPayPage(false);
  };

  const setThePayPage = () => {
    setMorePage(false);
    setPayPage(true);
  };

  const isityt = (url) => {
    if (!!url === true && url.includes("youtube")) {
      //https://www.youtube.com/watch?v=L9ervwr0qq0&list=RDL9ervwr0qq0&start_radio=1
      //   //get the id
      let ytid;
      if (!!url === true && url.includes("shorts")) {
        let a = url.split("/");
        let i = a.length - 1;
        ytid = a[i];
      } else {
        if (!!url === true) {
          let a = url.split("v=");
          if (!!a[1] === true && a[1].includes("&")) {
            let b = a[1].split("&");
            ytid = b[0];
          } else {
            ytid = a[1];
          }
        }
      }

      console.log("ytid=" + ytid);
      return "https://img.youtube.com/vi/" + ytid + "/mqdefault.jpg";
      // //setVisityt(ytid)
      //return "https://img.youtube.com/vi/K8LLF-46FN8/mqdefault.jpg" //yturl
    }

    return "";
  };

  const getPlanMax = () => {
    let max = StorageSizes.free;
    //props.settings.plan
    if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "free"
    ) {
      max = StorageSizes.free;
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "basic"
    ) {
      max = StorageSizes.basic;
    } else if (
      !!props.theplan.plan &&
      props.theplan.plan.replace(/"/g, "") === "standard"
    ) {
      max = StorageSizes.standard;
    } else if (!!props.theplan.plan === false) {
      max = StorageSizes.free;
    } else {
      //premium
      max = StorageSizes.premium;
    }
    return max;
  };

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

  function getHashNameUsingDomainName(url) {
    const urlObj = new URL(url);
    const dn = urlObj.origin.replace(/^.*\/\//, "");
    const d = dn.split("."); //2,3,4,5
    const dlen = d.length;
    //2-2, 3-2,4-2
    //a.b.domain.com
    if (dlen >= 2) {
      const d2 = d[dlen - 2].replace(/-/g, "");
      return "#" + d2;
    }
    return "#";
  }

  const getTheHashtag = (url, kht) => {
    const hashtag = getHashNameUsingDomainName(url);
    if (hashtag !== kht) {
      return hashtag + " " + kht;
    }
    return hashtag;
  };

  const getHashtag = (str) => {
    console.log("getHashtag");

    const cleanedString = str.replace(/[^a-zA-Z0-9]/g, '')
    const cleanedString2 = cleanedString.replace(/[^\&]/g, 'And')
    const cleanedString3 = cleanedString2.replace(/\_/g, "");

    const str2 = cleanedString3
      .trim()
      .replace(
        /(^|[^a-zA-Z0-9])([a-zA-Z])/g,
        (match, p1, p2) => p1 + p2.toUpperCase(),
      );

    const lc = str2;
    //prepend "#"
    const hashtag = "#" + lc;
    //return the hashtag
    console.log("TTTTTTTTTTTTTTTTTTTTTTT, str=" + str);
    console.log("TTTTTTTTTTTTTTTTTTTTTTT, hashtag=" + hashtag);
    return hashtag;
  };

  // const getHashtag = (str) => {
  //   console.log("getHashtag");
  //   //const cleaned = str.replace(/[^a-zA-Z0-9/s]/g, '')
  //   const cleaned = str.replace(/[^a-zA-Z0-9]/g, "");
  //   // let stringWithoutTabs = str.replace(/\t/g, "");
  //   // let notabsorspaces = stringWithoutTabs.replace(/\s/g, "");
  //   // let notabsorspacesordashes = notabsorspaces.replace(/\-/g, "");
  //   // let noperiodseither = notabsorspacesordashes.replace(/\./g, "");
  //   // //lowercase
  //   const lc = cleaned.toLowerCase();
  //   //prepend "#"
  //   const hashtag = "#" + lc;
  //   //return the hashtag
  //   console.log("TTTTTTTTTTTTTTTTTTTTTTT, str=" + str);
  //   console.log("TTTTTTTTTTTTTTTTTTTTTTT, hashtag=" + hashtag);
  //   return hashtag;
  // };

  const getHashtag2 = (url) => {
    return getHashNameUsingDomainName(url);
  };

  const hasControlCharacters = (str) => {
    // const regex = /\\c[ABCDEFGHIKLNOPQRSUVWXYZ]/;
    // const result = regex.test(str);
    // return result;
    return false;
  };

  useEffect(() => {
    //const { option } = useParams()
    //props.match.params.option can be either usefoldernames or
    //usedomainnames
    //console.log("FetchBookmarks.js, props.match.params.option="+props.match.params.option)
    console.log("FetchBookmarks.js, props.match.params.option, oo=" + oo);
    //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
    console.log("FetchBookmarks.js, props.theplan.plan=" + props.theplan.plan);
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

            let r = true;
            let r2 = true;
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
                console.log("Success:");
                console.log(data);
                //return;
                console.log(JSON.stringify(data, null, 4));
                if (data.error) {
                  console.log(data.error);
                  alert(
                    "An error occurred when loading the bookmarks file. Please make sure their are bookmarks.",
                  );
                  return;
                }

                //////
                //different cases
                //bookmark
                //or
                //bookmark with folder // if they all has one bookmark and one folder it works
                //folder
                let foldername;
                let kht;
                let kht2;
                let kht3;
                console.log("oo=" + oo);
                console.log("before for");
                for (let i = 0; data.message && i < data.message.length; i++) {
                  console.log("in for");

                  if (data.message.length === 3) {
                    //3 is firefox
                    if (i === 0) {
                      let hashtagv1;
                      if (oo === "usefoldernames") {
                        console.log("usefoldernames");

                        hashtagv1 = getHashtag(data.message[i].title);
                        foldername = data.message[i].title;
                      }

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
                          let yturl = isityt(url);
                          let title = data.message[i].children[j].title; //the link text for the page
                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                          let icon = data.message[i].children[j].icon; //the little icon of the page

                          console.log("oo=" + oo);
                          if (oo === "usedomainnames") {
                            if (i === 0 && kht2 === undefined) {
                              kht2 = getHashtag2(url);
                              hashtagv1 = kht2;
                            } else {
                              hashtagv1 = getTheHashtag(url, kht2);
                            }
                            foldername = "";
                          }

                          if (
                            !hasControlCharacters(title) &&
                            title.length > 0
                          ) {
                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                            console.log("pushing into htmllinksarray");
                            console.log(1);
                            console.log("15 foldername:=" + foldername);
                            htmllinksarray.push({
                              description: title,
                              Url: url, //, //href,
                              yturl: yturl,
                              note: hashtagv1,
                              foldername: foldername,
                              amount: 0,
                              createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                            });
                          }
                        } else {
                          console.log(
                            "data.message[i].children[j].children=" +
                              JSON.stringify(
                                data.message[i].children[j].children,
                              ),
                          );

                          let hashtagv2;

                          if (oo === "usefoldernames") {
                            hashtagv2 = getHashtag(
                              data.message[i].children[j].title,
                            );
                            foldername = data.message[i].children[j].title;
                          }

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
                              let yturl = isityt(url);
                              console.log("url=" + url);
                              let title =
                                data.message[i].children[j].children[k].title; //the link text for the page
                              let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                              let icon =
                                data.message[i].children[j].children[k].icon; //the little icon of the page

                              console.log("title=" + title);

                              if (oo === "usedomainnames") {
                                hashtagv2 = getHashtag2(url);
                                foldername = "";
                              }

                              if (
                                !hasControlCharacters(title) &&
                                title.length > 0
                              ) {
                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                console.log("pushing into htmllinksarray");
                                console.log(2);
                                console.log("16 foldername:=" + foldername);
                                htmllinksarray.push({
                                  description: title,
                                  Url: url, //, //href,
                                  yturl: yturl,
                                  note: hashtagv2,
                                  foldername: foldername,
                                  amount: 0,
                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                });
                              }
                            } else {
                              let hashtagv3;
                              if (oo === "usefoldernames") {
                                hashtagv3 = getHashtag(
                                  data.message[i].children[j].children[k].title,
                                );
                                foldername =
                                  data.message[i].children[j].children[k].title;
                              }

                              //console.log("hashtagv3" + hashtagv3);
                              for (
                                let l = 0;
                                data.message[i].children[j].children[k]
                                  .children &&
                                l <
                                  data.message[i].children[j].children[k]
                                    .children.length;
                                l++
                              ) {
                                if (
                                  data.message[i].children[j].children[k]
                                    .children[l].type === "bookmark"
                                ) {
                                  let url =
                                    data.message[i].children[j].children[k]
                                      .children[l].url; //the url of the page
                                  let yturl = isityt(url);
                                  console.log("url=" + url);
                                  let title =
                                    data.message[i].children[j].children[k]
                                      .children[l].title; //the link text for the page
                                  let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                  let icon =
                                    data.message[i].children[j].children[k]
                                      .children[l].icon; //the little icon of the page

                                  console.log("title=" + title);
                                  if (oo === "usedomainnames") {
                                    hashtagv3 = getHashtag2(url);
                                    foldername = "";
                                  }

                                  if (
                                    !hasControlCharacters(title) &&
                                    title.length > 0
                                  ) {
                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                    console.log("pushing into htmllinksarray");
                                    console.log(3);
                                    console.log("17 foldername:=" + foldername);
                                    htmllinksarray.push({
                                      description: title,
                                      Url: url, //, //href,
                                      yturl: yturl,
                                      note: hashtagv3,
                                      foldername: foldername,
                                      amount: 0,
                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                    });
                                  } else {
                                    console.log(
                                      "NOT pushing into htmllinksarray",
                                    );
                                  }
                                } else {
                                  //folder
                                  let hashtagv4;
                                  if (oo === "usefoldernames") {
                                    hashtagv4 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].title,
                                    );
                                    foldername =
                                      data.message[i].children[j].children[k]
                                        .children[l].title;
                                  }

                                  //console.log("hashtagv4=" + hashtagv4);
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
                                      let yturl = isityt(url);
                                      console.log("url=" + url);
                                      let title =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].title; //the link text for the page
                                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                      let icon =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].icon; //the little icon of the page

                                      console.log("title=" + title);

                                      if (oo === "usedomainnames") {
                                        hashtagv4 = getHashtag2(url);
                                        foldername = "";
                                      }

                                      if (
                                        !hasControlCharacters(title) &&
                                        title.length > 0
                                      ) {
                                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                        console.log(
                                          "pushing into htmllinksarray",
                                        );
                                        console.log(4);
                                        console.log(
                                          "18 foldername:=" + foldername,
                                        );
                                        htmllinksarray.push({
                                          description: title,
                                          Url: url, //, //href,
                                          yturl: yturl,
                                          note: hashtagv4,
                                          foldername: foldername,
                                          amount: 0,
                                          createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                        });
                                      } else {
                                        console.log(
                                          "NOT pushing into htmllinksarray",
                                        );
                                      }
                                    } else {
                                      let hashtagv5;
                                      if (oo === "usefoldernames") {
                                        hashtagv5 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title,
                                        );
                                        foldername =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title;
                                      }

                                      //console.log("hashtagv5=" + hashtagv5);
                                      for (
                                        let n = 0;
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children &&
                                        n <
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children
                                            .length;
                                        n++
                                      ) {
                                        if (
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .type === "bookmark"
                                        ) {
                                          let url =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].url; //the url of the page
                                          let yturl = isityt(url);
                                          console.log("url=" + url);
                                          let title =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].title; //the link text for the page
                                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                          let icon =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].icon; //the little icon of the page

                                          console.log("title=" + title);

                                          if (oo === "usedomainnames") {
                                            hashtagv5 = getHashtag2(url);
                                            foldername = "";
                                          }

                                          if (
                                            !hasControlCharacters(title) &&
                                            title.length > 0
                                          ) {
                                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                            console.log(
                                              "pushing into htmllinksarray",
                                            );
                                            console.log(5);
                                            console.log(
                                              "19 foldername:=" + foldername,
                                            );
                                            htmllinksarray.push({
                                              description: title,
                                              Url: url, //, //href,
                                              yturl: yturl,
                                              note: hashtagv5,
                                              foldername: foldername,
                                              amount: 0,
                                              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                            });
                                          } else {
                                            console.log(
                                              "NOT pushing into htmllinksarray",
                                            );
                                          }
                                        } else {
                                          let hashtagv6;
                                          if (oo === "usefoldernames") {
                                            hashtagv6 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title,
                                            );
                                            foldername =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title;
                                          }

                                          //console.log("hashtagv6=" + hashtagv6);
                                          for (
                                            let o = 0;
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children &&
                                            o <
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children.length;
                                            o++
                                          ) {
                                            if (
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].type === "bookmark"
                                            ) {
                                              let url =
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].url; //the url of the page
                                              let yturl = isityt(url);
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

                                              if (oo === "usedomainnames") {
                                                hashtagv6 = getHashtag2(url);
                                                foldername = "";
                                              }

                                              if (
                                                !hasControlCharacters(title) &&
                                                title.length > 0
                                              ) {
                                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                console.log(
                                                  "pushing into htmllinksarray",
                                                );
                                                console.log(6);
                                                console.log(
                                                  "20 foldername:=" +
                                                    foldername,
                                                );
                                                htmllinksarray.push({
                                                  description: title,
                                                  Url: url, //, //href,
                                                  yturl: yturl,
                                                  note: hashtagv6,
                                                  foldername: foldername,
                                                  amount: 0,
                                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                });
                                              } else {
                                                console.log(
                                                  "NOT pushing into htmllinksarray",
                                                );
                                              }
                                            } else {
                                              let hashtagv7;
                                              if (oo === "usefoldernames") {
                                                hashtagv7 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title,
                                                );
                                                foldername =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title;
                                              }

                                              // console.log(
                                              //   "hashtagv7=" + hashtagv7
                                              // );
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
                                                    .children[o].children
                                                    .length;
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
                                                  let yturl = isityt(url);
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

                                                  if (oo === "usedomainnames") {
                                                    hashtagv7 =
                                                      getHashtag2(url);
                                                    foldername = "";
                                                  }

                                                  if (
                                                    !hasControlCharacters(
                                                      title,
                                                    ) &&
                                                    title.length > 0
                                                  ) {
                                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                    console.log(
                                                      "pushing into htmllinksarray",
                                                    );
                                                    console.log(7);
                                                    console.log(
                                                      "21 foldername:=" +
                                                        foldername,
                                                    );
                                                    htmllinksarray.push({
                                                      description: title,
                                                      Url: url, //, //href,
                                                      yturl: yturl,
                                                      note: hashtagv7,
                                                      foldername: foldername,
                                                      amount: 0,
                                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                    });
                                                  } else {
                                                    console.log(
                                                      "NOT pushing into htmllinksarray",
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
                          } //nested for with k //
                        }
                      }
                    } else if (i === 1) {
                      //another folder,
                      let hashtagv1;
                      if (oo === "usefoldernames") {
                        hashtagv1 = getHashtag(data.message[i].title);
                        foldername = data.message[i].title;
                      }

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
                          let yturl = isityt(url);
                          let title = data.message[i].children[j].title; //the link text for the page
                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                          let icon = data.message[i].children[j].icon; //the little icon of the page

                          console.log("title=" + title);

                          if (oo === "usedomainnames") {
                            hashtagv1 = getHashtag2(url);
                            foldername = "";
                          }

                          if (
                            !hasControlCharacters(title) &&
                            title.length > 0
                          ) {
                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                            console.log("pushing into htmllinksarray");
                            console.log(8);
                            console.log("22 foldername:=" + foldername);
                            htmllinksarray.push({
                              description: title,
                              Url: url, //, //href,
                              yturl: yturl,
                              note: hashtagv1,
                              foldername: foldername,
                              amount: 0,
                              createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                            });
                          }
                        } else {
                          console.log(
                            "data.message[i].children[j].children=" +
                              JSON.stringify(
                                data.message[i].children[j].children,
                              ),
                          );

                          let hashtagv2;
                          if (oo === "usefoldernames") {
                            hashtagv2 = getHashtag(
                              data.message[i].children[j].title,
                            );
                            foldername = data.message[i].children[j].title;
                          }

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
                              let yturl = isityt(url);
                              console.log("url=" + url);
                              let title =
                                data.message[i].children[j].children[k].title; //the link text for the page
                              let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                              let icon =
                                data.message[i].children[j].children[k].icon; //the little icon of the page

                              console.log("title=" + title);

                              if (oo === "usedomainnames") {
                                hashtagv2 = getHashtag2(url);
                                foldername = "";
                              }

                              if (
                                !hasControlCharacters(title) &&
                                title.length > 0
                              ) {
                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                console.log("pushing into htmllinksarray");
                                console.log(9);
                                console.log("23 foldername:=" + foldername);
                                htmllinksarray.push({
                                  description: title,
                                  Url: url, //, //href,
                                  yturl: yturl,
                                  note: hashtagv2,
                                  foldername: foldername,
                                  amount: 0,
                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                });
                              }
                            } else {
                              let hashtagv3;
                              if (oo === "usefoldernames") {
                                hashtagv3 = getHashtag(
                                  data.message[i].children[j].children[k].title,
                                );
                                foldername =
                                  data.message[i].children[j].children[k].title;
                              }

                              //console.log("hashtagv3" + hashtagv3);
                              for (
                                let l = 0;
                                data.message[i].children[j].children[k]
                                  .children &&
                                l <
                                  data.message[i].children[j].children[k]
                                    .children.length;
                                l++
                              ) {
                                if (
                                  data.message[i].children[j].children[k]
                                    .children[l].type === "bookmark"
                                ) {
                                  let url =
                                    data.message[i].children[j].children[k]
                                      .children[l].url; //the url of the page
                                  let yturl = isityt(url);
                                  console.log("url=" + url);
                                  let title =
                                    data.message[i].children[j].children[k]
                                      .children[l].title; //the link text for the page
                                  let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                  let icon =
                                    data.message[i].children[j].children[k]
                                      .children[l].icon; //the little icon of the page

                                  console.log("title=" + title);

                                  if (oo === "usedomainnames") {
                                    hashtagv3 = getHashtag2(url);
                                    foldername = "";
                                  }

                                  if (
                                    !hasControlCharacters(title) &&
                                    title.length > 0
                                  ) {
                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                    console.log("pushing into htmllinksarray");
                                    console.log(10);
                                    console.log("24 foldername:=" + foldername);
                                    htmllinksarray.push({
                                      description: title,
                                      Url: url, //, //href,
                                      yturl: yturl,
                                      note: hashtagv3,
                                      foldername: foldername,
                                      amount: 0,
                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                    });
                                  } else {
                                    console.log(
                                      "NOT pushing into htmllinksarray",
                                    );
                                  }
                                } else {
                                  //folder
                                  let hashtagv4;
                                  if (oo === "usefoldernames") {
                                    hashtagv4 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].title,
                                    );
                                    foldername =
                                      data.message[i].children[j].children[k]
                                        .children[l].title;
                                  }

                                  //console.log("hashtagv4=" + hashtagv4);
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
                                      let yturl = isityt(url);
                                      console.log("url=" + url);
                                      let title =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].title; //the link text for the page
                                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                      let icon =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].icon; //the little icon of the page

                                      console.log("title=" + title);

                                      if (oo === "usedomainnames") {
                                        hashtagv4 = getHashtag2(url);
                                        foldername = "";
                                      }

                                      if (
                                        !hasControlCharacters(title) &&
                                        title.length > 0
                                      ) {
                                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                        console.log(
                                          "pushing into htmllinksarray",
                                        );
                                        console.log(11);
                                        console.log(
                                          "25 foldername:=" + foldername,
                                        );
                                        htmllinksarray.push({
                                          description: title,
                                          Url: url, //, //href,
                                          yturl: yturl,
                                          note: hashtagv4,
                                          foldername: foldername,
                                          amount: 0,
                                          createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                        });
                                      } else {
                                        console.log(
                                          "NOT pushing into htmllinksarray",
                                        );
                                      }
                                    } else {
                                      let hashtagv5;
                                      if (oo === "usefoldernames") {
                                        hashtagv5 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title,
                                        );
                                        foldername =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title;
                                      }

                                      // console.log("hashtagv5=" + hashtagv5);
                                      for (
                                        let n = 0;
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children &&
                                        n <
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children
                                            .length;
                                        n++
                                      ) {
                                        if (
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .type === "bookmark"
                                        ) {
                                          let url =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].url; //the url of the page
                                          let yturl = isityt(url);
                                          console.log("url=" + url);
                                          let title =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].title; //the link text for the page
                                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                          let icon =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].icon; //the little icon of the page

                                          console.log("title=" + title);

                                          if (oo === "usedomainnames") {
                                            hashtagv5 = getHashtag2(url);
                                            foldername = "";
                                          }

                                          if (
                                            !hasControlCharacters(title) &&
                                            title.length > 0
                                          ) {
                                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                            console.log(
                                              "pushing into htmllinksarray",
                                            );
                                            console.log(12);
                                            console.log(
                                              "26 foldername:=" + foldername,
                                            );
                                            htmllinksarray.push({
                                              description: title,
                                              Url: url, //, //href,
                                              yturl: yturl,
                                              note: hashtagv5,
                                              foldername: foldername,
                                              amount: 0,
                                              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                            });
                                          } else {
                                            console.log(
                                              "NOT pushing into htmllinksarray",
                                            );
                                          }
                                        } else {
                                          let hashtagv6;
                                          if (oo === "usefoldernames") {
                                            hashtagv6 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title,
                                            );
                                            foldername =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title;
                                          }

                                          // console.log("hashtagv6=" + hashtagv6);
                                          for (
                                            let o = 0;
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children &&
                                            o <
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children.length;
                                            o++
                                          ) {
                                            if (
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].type === "bookmark"
                                            ) {
                                              let url =
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].url; //the url of the page
                                              let yturl = isityt(url);
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

                                              if (oo === "usedomainnames") {
                                                hashtagv6 = getHashtag2(url);
                                                foldername = "";
                                              }

                                              if (
                                                !hasControlCharacters(title) &&
                                                title.length > 0
                                              ) {
                                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                console.log(
                                                  "pushing into htmllinksarray",
                                                );
                                                console.log(13);
                                                console.log(
                                                  "27 foldername:=" +
                                                    foldername,
                                                );
                                                htmllinksarray.push({
                                                  description: title,
                                                  Url: url, //, //href,
                                                  yturl: yturl,
                                                  note: hashtagv6,
                                                  foldername: foldername,
                                                  amount: 0,
                                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                });
                                              } else {
                                                console.log(
                                                  "NOT pushing into htmllinksarray",
                                                );
                                              }
                                            } else {
                                              let hashtagv7;
                                              if (oo === "usefoldernames") {
                                                hashtagv7 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title,
                                                );
                                                foldername =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title;
                                              }

                                              // console.log(
                                              //   "hashtagv7=" + hashtagv7
                                              // );
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
                                                    .children[o].children
                                                    .length;
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
                                                  let yturl = isityt(url);
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

                                                  if (oo === "usedomainnames") {
                                                    hashtagv7 =
                                                      getHashtag2(url);
                                                    foldername = "";
                                                  }

                                                  if (
                                                    !hasControlCharacters(
                                                      title,
                                                    ) &&
                                                    title.length > 0
                                                  ) {
                                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                    console.log(
                                                      "pushing into htmllinksarray",
                                                    );
                                                    console.log(14);
                                                    console.log(
                                                      "28 foldername:=" +
                                                        foldername,
                                                    );
                                                    htmllinksarray.push({
                                                      description: title,
                                                      Url: url, //, //href,
                                                      yturl: yturl,
                                                      note: hashtagv7,
                                                      foldername: foldername,
                                                      amount: 0,
                                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                    });
                                                  } else {
                                                    console.log(
                                                      "NOT pushing into htmllinksarray",
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
                          } //nested for with k //
                        }
                      }
                    } else {
                      //This one is menu, for Other Bookmarks
                      //i==2
                      //hashtagv = "#otherbookmarks";
                      let hashtagv1;
                      if (oo === "usefoldernames") {
                        hashtagv1 = getHashtag(data.message[i].title);
                        foldername = data.message[i].title;
                      }

                      //////////////////////////////////////////////
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
                          let yturl = isityt(url);
                          let title = data.message[i].children[j].title; //the link text for the page
                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                          let icon = data.message[i].children[j].icon; //the little icon of the page

                          console.log("title=" + title);

                          if (oo === "usedomainnames") {
                            hashtagv1 = getHashtag2(url);
                            foldername = "";
                          }

                          if (
                            !hasControlCharacters(title) &&
                            title.length > 0
                          ) {
                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                            console.log("pushing into htmllinksarray");
                            console.log(15);
                            console.log("29 foldername:=" + foldername);
                            htmllinksarray.push({
                              description: title,
                              Url: url, //, //href,
                              yturl: yturl,
                              note: hashtagv1,
                              foldername: foldername,
                              amount: 0,
                              createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                            });
                          }
                        } else {
                          //or folder
                          console.log(
                            "data.message[i].children[j].children=" +
                              JSON.stringify(
                                data.message[i].children[j].children,
                              ),
                          );

                          let hashtagv2;
                          if (oo === "usefoldernames") {
                            hashtagv2 = getHashtag(
                              data.message[i].children[j].title,
                            );
                            foldername = data.message[i].children[j].title;
                          }

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
                              let yturl = isityt(url);
                              console.log("url=" + url);
                              let title =
                                data.message[i].children[j].children[k].title; //the link text for the page
                              let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                              let icon =
                                data.message[i].children[j].children[k].icon; //the little icon of the page

                              console.log("title=" + title);

                              if (oo === "usedomainnames") {
                                hashtagv2 = getHashtag2(url);
                                foldername = "";
                              }

                              if (
                                !hasControlCharacters(title) &&
                                title.length > 0
                              ) {
                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                console.log("pushing into htmllinksarray");
                                console.log(16);
                                console.log("30 foldername:=" + foldername);
                                htmllinksarray.push({
                                  description: title,
                                  Url: url, //, //href,
                                  yturl: yturl,
                                  note: hashtagv2,
                                  foldername: foldername,
                                  amount: 0,
                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                });
                              }
                            } else {
                              let hashtagv3;
                              if (oo === "usefoldernames") {
                                hashtagv3 = getHashtag(
                                  data.message[i].children[j].children[k].title,
                                );
                                foldername =
                                  data.message[i].children[j].children[k].title;
                              }

                              // console.log("hashtagv3" + hashtagv3);
                              for (
                                let l = 0;
                                data.message[i].children[j].children[k]
                                  .children &&
                                l <
                                  data.message[i].children[j].children[k]
                                    .children.length;
                                l++
                              ) {
                                if (
                                  data.message[i].children[j].children[k]
                                    .children[l].type === "bookmark"
                                ) {
                                  let url =
                                    data.message[i].children[j].children[k]
                                      .children[l].url; //the url of the page
                                  let yturl = isityt(url);
                                  console.log("url=" + url);
                                  let title =
                                    data.message[i].children[j].children[k]
                                      .children[l].title; //the link text for the page
                                  let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                  let icon =
                                    data.message[i].children[j].children[k]
                                      .children[l].icon; //the little icon of the page

                                  console.log("title=" + title);

                                  if (oo === "usedomainnames") {
                                    hashtagv3 = getHashtag2(url);
                                    foldername = "";
                                  }

                                  if (
                                    !hasControlCharacters(title) &&
                                    title.length > 0
                                  ) {
                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                    console.log("pushing into htmllinksarray");
                                    console.log(17);
                                    console.log("31 foldername:=" + foldername);
                                    htmllinksarray.push({
                                      description: title,
                                      Url: url, //, //href,
                                      yturl: yturl,
                                      note: hashtagv3,
                                      foldername: foldername,
                                      amount: 0,
                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                    });
                                  } else {
                                    console.log(
                                      "NOT pushing into htmllinksarray",
                                    );
                                  }
                                } else {
                                  //folder
                                  let hashtagv4;
                                  if (oo === "usefoldernames") {
                                    hashtagv4 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].title,
                                    );
                                    foldername =
                                      data.message[i].children[j].children[k]
                                        .children[l].title;
                                  }

                                  // console.log("hashtagv4=" + hashtagv4);
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
                                      let yturl = isityt(url);
                                      console.log("url=" + url);
                                      let title =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].title; //the link text for the page
                                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                      let icon =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].icon; //the little icon of the page

                                      console.log("title=" + title);

                                      if (oo === "usedomainnames") {
                                        hashtagv4 = getHashtag2(url);
                                        foldername = "";
                                      }

                                      if (
                                        !hasControlCharacters(title) &&
                                        title.length > 0
                                      ) {
                                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                        console.log(
                                          "pushing into htmllinksarray",
                                        );
                                        console.log(18);
                                        console.log(
                                          "32 foldername:=" + foldername,
                                        );
                                        htmllinksarray.push({
                                          description: title,
                                          Url: url, //, //href,
                                          yturl: yturl,
                                          note: hashtagv4,
                                          foldername: foldername,
                                          amount: 0,
                                          createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                        });
                                      } else {
                                        console.log(
                                          "NOT pushing into htmllinksarray",
                                        );
                                      }
                                    } else {
                                      let hashtagv5;
                                      if (oo === "usefoldernames") {
                                        hashtagv5 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title,
                                        );
                                        foldername =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title;
                                      }

                                      // console.log("hashtagv5=" + hashtagv5);
                                      for (
                                        let n = 0;
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children &&
                                        n <
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children
                                            .length;
                                        n++
                                      ) {
                                        if (
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .type === "bookmark"
                                        ) {
                                          let url =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].url; //the url of the page
                                          let yturl = isityt(url);
                                          console.log("url=" + url);
                                          let title =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].title; //the link text for the page
                                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                          let icon =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].icon; //the little icon of the page

                                          console.log("title=" + title);

                                          if (oo === "usedomainnames") {
                                            hashtagv5 = getHashtag2(url);
                                            foldername = "";
                                          }

                                          if (
                                            !hasControlCharacters(title) &&
                                            title.length > 0
                                          ) {
                                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                            console.log(
                                              "pushing into htmllinksarray",
                                            );
                                            console.log(19);
                                            console.log(
                                              "33 foldername:=" + foldername,
                                            );
                                            htmllinksarray.push({
                                              description: title,
                                              Url: url, //, //href,
                                              yturl: yturl,
                                              note: hashtagv5,
                                              foldername: foldername,
                                              amount: 0,
                                              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                            });
                                          } else {
                                            console.log(
                                              "NOT pushing into htmllinksarray",
                                            );
                                          }
                                        } else {
                                          let hashtagv6;
                                          if (oo === "usefoldernames") {
                                            hashtagv6 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title,
                                            );
                                            foldername =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title;
                                          }

                                          // console.log("hashtagv6=" + hashtagv6);
                                          for (
                                            let o = 0;
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children &&
                                            o <
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children.length;
                                            o++
                                          ) {
                                            if (
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].type === "bookmark"
                                            ) {
                                              let url =
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].url; //the url of the page
                                              let yturl = isityt(url);
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

                                              if (oo === "usedomainnames") {
                                                hashtagv6 = getHashtag2(url);
                                                foldername = "";
                                              }

                                              if (
                                                !hasControlCharacters(title) &&
                                                title.length > 0
                                              ) {
                                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                console.log(
                                                  "pushing into htmllinksarray",
                                                );
                                                console.log(20);
                                                console.log(
                                                  "34 foldername:=" +
                                                    foldername,
                                                );
                                                htmllinksarray.push({
                                                  description: title,
                                                  Url: url, //, //href,
                                                  yturl: yturl,
                                                  note: hashtagv6,
                                                  foldername: foldername,
                                                  amount: 0,
                                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                });
                                              } else {
                                                console.log(
                                                  "NOT pushing into htmllinksarray",
                                                );
                                              }
                                            } else {
                                              let hashtagv7;
                                              if (oo === "usefoldernames") {
                                                hashtagv7 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title,
                                                );
                                                foldername =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title;
                                              }

                                              // console.log(
                                              //   "hashtagv7=" + hashtagv7
                                              // );
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
                                                    .children[o].children
                                                    .length;
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
                                                  let yturl = isityt(url);
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

                                                  if (oo === "usedomainnames") {
                                                    hashtagv7 =
                                                      getHashtag2(url);
                                                    foldername = "";
                                                  }

                                                  if (
                                                    !hasControlCharacters(
                                                      title,
                                                    ) &&
                                                    title.length > 0
                                                  ) {
                                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                    console.log(
                                                      "pushing into htmllinksarray",
                                                    );
                                                    console.log(21);
                                                    console.log(
                                                      "35 foldername:=" +
                                                        foldername,
                                                    );
                                                    htmllinksarray.push({
                                                      description: title,
                                                      Url: url, //, //href,
                                                      yturl: yturl,
                                                      note: hashtagv7,
                                                      foldername: foldername,
                                                      amount: 0,
                                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                    });
                                                  } else {
                                                    console.log(
                                                      "NOT pushing into htmllinksarray",
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
                          } //nested for with k //
                        }
                      }
                    }
                  } else if (
                    data.message.length === 2 ||
                    data.message.length === 1
                  ) {
                    //for the other browsers
                    if (i === 0) {
                      let hashtagv1;
                      if (oo === "usefoldernames") {
                        hashtagv1 = getHashtag(data.message[i].title);
                        foldername = data.message[i].title;
                      }

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
                          let yturl = isityt(url);
                          let title = data.message[i].children[j].title; //the link text for the page
                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                          let icon = data.message[i].children[j].icon; //the little icon of the page

                          console.log("title=" + title);

                          //if(oo==="usedomainnames")
                          //hashtagv1 = getHashtag2(url)
                          if (oo === "usedomainnames") {
                            if (i === 0 && kht === undefined) {
                              kht = getHashtag2(url);
                              hashtagv1 = kht;
                            } else {
                              hashtagv1 = getTheHashtag(url, kht);
                            }
                            foldername = "";
                          }
                          if (
                            !hasControlCharacters(title) &&
                            title.length > 0
                          ) {
                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                            console.log("pushing unto htmllinksarray");
                            console.log("1 foldername:=" + foldername);

                            htmllinksarray.push({
                              description: title,
                              Url: url, //, //href,
                              yturl: yturl,
                              note: hashtagv1,
                              foldername: foldername,
                              amount: 0,
                              createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                            });
                          }
                        } else {
                          console.log(
                            "data.message[i].children[j].children=" +
                              JSON.stringify(
                                data.message[i].children[j].children,
                              ),
                          );

                          let hashtagv2;
                          if (oo === "usefoldernames") {
                            hashtagv2 = getHashtag(
                              data.message[i].children[j].title,
                            );
                            foldername = data.message[i].children[j].title;
                          }

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
                              let yturl = isityt(url);
                              console.log("url=" + url);
                              let title =
                                data.message[i].children[j].children[k].title; //the link text for the page
                              let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                              let icon =
                                data.message[i].children[j].children[k].icon; //the little icon of the page

                              console.log("title=" + title);

                              if (oo === "usedomainnames") {
                                hashtagv2 = getHashtag2(url);
                                foldername = "";
                              }

                              if (
                                !hasControlCharacters(title) &&
                                title.length > 0
                              ) {
                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                console.log("pushing unto htmllinksarray");
                                console.log("2 foldername:=" + foldername);

                                htmllinksarray.push({
                                  foldername: foldername,
                                  description: title,
                                  Url: url, //, //href,
                                  yturl: yturl,
                                  note: hashtagv2,

                                  amount: 0,
                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                });
                              }
                            } else {
                              let hashtagv3;
                              if (oo === "usefoldernames") {
                                hashtagv3 = getHashtag(
                                  data.message[i].children[j].children[k].title,
                                );
                                foldername =
                                  data.message[i].children[j].children[k].title;
                              }

                              // console.log("hashtagv3" + hashtagv3);
                              for (
                                let l = 0;
                                data.message[i].children[j].children[k]
                                  .children &&
                                l <
                                  data.message[i].children[j].children[k]
                                    .children.length;
                                l++
                              ) {
                                if (
                                  data.message[i].children[j].children[k]
                                    .children[l].type === "bookmark"
                                ) {
                                  let url =
                                    data.message[i].children[j].children[k]
                                      .children[l].url; //the url of the page
                                  let yturl = isityt(url);
                                  console.log("url=" + url);
                                  let title =
                                    data.message[i].children[j].children[k]
                                      .children[l].title; //the link text for the page
                                  let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                  let icon =
                                    data.message[i].children[j].children[k]
                                      .children[l].icon; //the little icon of the page

                                  console.log("title=" + title);

                                  if (oo === "usedomainnames") {
                                    hashtagv3 = getHashtag2(url);
                                    foldername = "";
                                  }

                                  if (
                                    !hasControlCharacters(title) &&
                                    title.length > 0
                                  ) {
                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                    console.log("pushing unto htmllinksarray");
                                    console.log("3 foldername:=" + foldername);

                                    htmllinksarray.push({
                                      description: title,
                                      Url: url, //, //href,
                                      yturl: yturl,
                                      note: hashtagv3,
                                      foldername: foldername,
                                      amount: 0,
                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                    });
                                  } else {
                                    console.log(
                                      "NOT pushing unto htmllinksarray",
                                    );
                                  }
                                } else {
                                  //folder
                                  let hashtagv4;
                                  if (oo === "usefoldernames") {
                                    hashtagv4 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].title,
                                    );
                                    foldername =
                                      data.message[i].children[j].children[k]
                                        .children[l].title;
                                  }

                                  // console.log("hashtagv4=" + hashtagv4);
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
                                      let yturl = isityt(url);
                                      console.log("url=" + url);
                                      let title =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].title; //the link text for the page
                                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                      let icon =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].icon; //the little icon of the page

                                      console.log("title=" + title);

                                      if (oo === "usedomainnames") {
                                        hashtagv4 = getHashtag2(url);
                                        foldername = "";
                                      }

                                      if (
                                        !hasControlCharacters(title) &&
                                        title.length > 0
                                      ) {
                                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                        console.log(
                                          "pushing unto htmllinksarray",
                                        );
                                        console.log(
                                          "4 foldername:=" + foldername,
                                        );
                                        htmllinksarray.push({
                                          description: title,
                                          Url: url, //, //href,
                                          yturl: yturl,
                                          note: hashtagv4,
                                          foldername: foldername,
                                          amount: 0,
                                          createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                        });
                                      } else {
                                        console.log(
                                          "NOT pushing unto htmllinksarray",
                                        );
                                      }
                                    } else {
                                      let hashtagv5;
                                      if (oo === "usefoldernames") {
                                        hashtagv5 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title,
                                        );
                                        foldername =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title;
                                      }

                                      // console.log("hashtagv5=" + hashtagv5);
                                      for (
                                        let n = 0;
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children &&
                                        n <
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children
                                            .length;
                                        n++
                                      ) {
                                        if (
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .type === "bookmark"
                                        ) {
                                          let url =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].url; //the url of the page
                                          let yturl = isityt(url);
                                          console.log("url=" + url);
                                          let title =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].title; //the link text for the page
                                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                          let icon =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].icon; //the little icon of the page

                                          console.log("title=" + title);

                                          if (oo === "usedomainnames") {
                                            hashtagv5 = getHashtag2(url);
                                            foldername = "";
                                          }

                                          if (
                                            !hasControlCharacters(title) &&
                                            title.length > 0
                                          ) {
                                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                            console.log(
                                              "pushing unto htmllinksarray",
                                            );
                                            console.log(
                                              "5 foldername:=" + foldername,
                                            );
                                            htmllinksarray.push({
                                              description: title,
                                              Url: url, //, //href,
                                              yturl: yturl,
                                              note: hashtagv5,
                                              foldername: foldername,
                                              amount: 0,
                                              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                            });
                                          } else {
                                            console.log(
                                              "NOT pushing unto htmllinksarray",
                                            );
                                          }
                                        } else {
                                          let hashtagv6;
                                          if (oo === "usefoldernames") {
                                            hashtagv6 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title,
                                            );
                                            foldername =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title;
                                          }

                                          // console.log("hashtagv6=" + hashtagv6);
                                          for (
                                            let o = 0;
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children &&
                                            o <
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children.length;
                                            o++
                                          ) {
                                            if (
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].type === "bookmark"
                                            ) {
                                              let url =
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].url; //the url of the page
                                              let yturl = isityt(url);
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

                                              if (oo === "usedomainnames") {
                                                hashtagv6 = getHashtag2(url);
                                                foldername = "";
                                              }

                                              if (
                                                !hasControlCharacters(title) &&
                                                title.length > 0
                                              ) {
                                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                console.log(
                                                  "pushing unto htmllinksarray",
                                                );
                                                console.log(
                                                  "6 foldername:=" + foldername,
                                                );
                                                htmllinksarray.push({
                                                  description: title,
                                                  Url: url, //, //href,
                                                  yturl: yturl,
                                                  note: hashtagv6,
                                                  foldername: foldername,
                                                  amount: 0,
                                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                });
                                              } else {
                                                console.log(
                                                  "NOT pushing unto htmllinksarray",
                                                );
                                              }
                                            } else {
                                              let hashtagv7;
                                              if (oo === "usefoldernames") {
                                                hashtagv7 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title,
                                                );
                                                foldername =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title;
                                              }

                                              // console.log(
                                              //   "hashtagv7=" + hashtagv7
                                              // );
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
                                                    .children[o].children
                                                    .length;
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
                                                  let yturl = isityt(url);
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

                                                  if (oo === "usedomainnames") {
                                                    hashtagv7 =
                                                      getHashtag2(url);
                                                    foldername = "";
                                                  }

                                                  if (
                                                    !hasControlCharacters(
                                                      title,
                                                    ) &&
                                                    title.length > 0
                                                  ) {
                                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                    console.log(
                                                      "pushing unto htmllinksarray",
                                                    );
                                                    console.log(
                                                      "7 foldername:=" +
                                                        foldername,
                                                    );
                                                    htmllinksarray.push({
                                                      description: title,
                                                      Url: url, //, //href,
                                                      yturl: yturl,
                                                      note: hashtagv7,
                                                      foldername: foldername,
                                                      amount: 0,
                                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                    });
                                                  } else {
                                                    console.log(
                                                      "NOT pushing unto htmllinksarray",
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
                          } //nested for with k //
                        }
                      }
                    } //i==2
                    else {
                      //i==1
                      //hashtagv = "#otherbookmarks";
                      let hashtagv1;
                      if (oo === "usefoldernames") {
                        hashtagv1 = getHashtag(data.message[i].title);
                        foldername = data.message[i].title;
                      }

                      //////////////////////////////////////////////
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
                          let yturl = isityt(url);
                          let title = data.message[i].children[j].title; //the link text for the page
                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                          let icon = data.message[i].children[j].icon; //the little icon of the page

                          console.log("title=" + title);

                          if (oo === "usedomainnames") {
                            hashtagv1 = getHashtag2(url);
                            foldername = "";
                          }

                          if (
                            !hasControlCharacters(title) &&
                            title.length > 0
                          ) {
                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                            console.log("pushing unto htmllinksarray");
                            console.log("8 foldername:=" + foldername);
                            htmllinksarray.push({
                              description: title,
                              Url: url, //, //href,
                              yturl: yturl,
                              note: hashtagv1,
                              foldername: foldername,
                              amount: 0,
                              createdAt: add_date, //ts,//now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                            });
                          }
                        } else {
                          //or folder
                          console.log(
                            "data.message[i].children[j].children=" +
                              JSON.stringify(
                                data.message[i].children[j].children,
                              ),
                          );

                          let hashtagv2;
                          if (oo === "usefoldernames") {
                            hashtagv2 = getHashtag(
                              data.message[i].children[j].title,
                            );
                            foldername = data.message[i].children[j].title;
                          }

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
                              let yturl = isityt(url);
                              console.log("url=" + url);
                              let title =
                                data.message[i].children[j].children[k].title; //the link text for the page
                              let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                              let icon =
                                data.message[i].children[j].children[k].icon; //the little icon of the page

                              console.log("title=" + title);

                              if (oo === "usedomainnames") {
                                hashtagv2 = getHashtag2(url);
                                foldername = "";
                              }

                              if (
                                !hasControlCharacters(title) &&
                                title.length > 0
                              ) {
                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                console.log("pushing unto htmllinksarray");
                                console.log("9 foldername:=" + foldername);
                                htmllinksarray.push({
                                  description: title,
                                  Url: url, //, //href,
                                  yturl: yturl,
                                  note: hashtagv2,
                                  foldername: foldername,
                                  amount: 0,
                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                });
                              }
                            } else {
                              let hashtagv3;
                              if (oo === "usefoldernames") {
                                hashtagv3 = getHashtag(
                                  data.message[i].children[j].children[k].title,
                                );
                                foldername =
                                  data.message[i].children[j].children[k].title;
                              }

                              // console.log("hashtagv3" + hashtagv3);
                              for (
                                let l = 0;
                                data.message[i].children[j].children[k]
                                  .children &&
                                l <
                                  data.message[i].children[j].children[k]
                                    .children.length;
                                l++
                              ) {
                                if (
                                  data.message[i].children[j].children[k]
                                    .children[l].type === "bookmark"
                                ) {
                                  let url =
                                    data.message[i].children[j].children[k]
                                      .children[l].url; //the url of the page
                                  let yturl = isityt(url);
                                  console.log("url=" + url);
                                  let title =
                                    data.message[i].children[j].children[k]
                                      .children[l].title; //the link text for the page
                                  let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                  let icon =
                                    data.message[i].children[j].children[k]
                                      .children[l].icon; //the little icon of the page

                                  console.log("title=" + title);

                                  if (oo === "usedomainnames") {
                                    hashtagv3 = getHashtag2(url);
                                    foldername = "";
                                  }

                                  if (
                                    !hasControlCharacters(title) &&
                                    title.length > 0
                                  ) {
                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                    console.log("pushing unto htmllinksarray");
                                    console.log("10 foldername:=" + foldername);
                                    htmllinksarray.push({
                                      description: title,
                                      Url: url, //, //href,
                                      yturl: yturl,
                                      note: hashtagv3,
                                      foldername: foldername,
                                      amount: 0,
                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                    });
                                  } else {
                                    console.log(
                                      "NOT pushing unto htmllinksarray",
                                    );
                                  }
                                } else {
                                  //folder
                                  let hashtagv4;
                                  if (oo === "usefoldernames") {
                                    hashtagv4 = getHashtag(
                                      data.message[i].children[j].children[k]
                                        .children[l].title,
                                    );
                                    foldername =
                                      data.message[i].children[j].children[k]
                                        .children[l].title;
                                  }

                                  // console.log("hashtagv4=" + hashtagv4);
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
                                      let yturl = isityt(url);
                                      console.log("url=" + url);
                                      let title =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].title; //the link text for the page
                                      let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                      let icon =
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].icon; //the little icon of the page

                                      console.log("title=" + title);

                                      if (oo === "usedomainnames") {
                                        hashtagv4 = getHashtag2(url);
                                        foldername = "";
                                      }

                                      if (
                                        !hasControlCharacters(title) &&
                                        title.length > 0
                                      ) {
                                        //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                        console.log(
                                          "pushing unto htmllinksarray",
                                        );
                                        console.log(
                                          "11 foldername:=" + foldername,
                                        );
                                        htmllinksarray.push({
                                          description: title,
                                          Url: url, //, //href,
                                          yturl: yturl,
                                          note: hashtagv4,
                                          foldername: foldername,
                                          amount: 0,
                                          createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                          faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                        });
                                      } else {
                                        console.log(
                                          "NOT pushing unto htmllinksarray",
                                        );
                                      }
                                    } else {
                                      let hashtagv5;
                                      if (oo === "usefoldernames") {
                                        hashtagv5 = getHashtag(
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title,
                                        );
                                        foldername =
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].title;
                                      }

                                      // console.log("hashtagv5=" + hashtagv5);
                                      for (
                                        let n = 0;
                                        data.message[i].children[j].children[k]
                                          .children[l].children[m].children &&
                                        n <
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children
                                            .length;
                                        n++
                                      ) {
                                        if (
                                          data.message[i].children[j].children[
                                            k
                                          ].children[l].children[m].children[n]
                                            .type === "bookmark"
                                        ) {
                                          let url =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].url; //the url of the page
                                          let yturl = isityt(url);
                                          console.log("url=" + url);
                                          let title =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].title; //the link text for the page
                                          let add_date = now.getTime(); //data.message[0].children[0].children[0].add_date="9787657654"
                                          let icon =
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].icon; //the little icon of the page

                                          console.log("title=" + title);

                                          if (oo === "usedomainnames") {
                                            hashtagv5 = getHashtag2(url);
                                            foldername = "";
                                          }

                                          if (
                                            !hasControlCharacters(title) &&
                                            title.length > 0
                                          ) {
                                            //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                            console.log(
                                              "pushing unto htmllinksarray",
                                            );
                                            console.log(
                                              "12 foldername:=" + foldername,
                                            );
                                            htmllinksarray.push({
                                              description: title,
                                              Url: url, //, //href,
                                              yturl: yturl,
                                              note: hashtagv5,
                                              foldername: foldername,
                                              amount: 0,
                                              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                              faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                            });
                                          } else {
                                            console.log(
                                              "NOT pushing unto htmllinksarray",
                                            );
                                          }
                                        } else {
                                          let hashtagv6;
                                          if (oo === "usefoldernames") {
                                            hashtagv6 = getHashtag(
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title,
                                            );
                                            foldername =
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n].title;
                                          }

                                          // console.log("hashtagv6=" + hashtagv6);
                                          for (
                                            let o = 0;
                                            data.message[i].children[j]
                                              .children[k].children[l].children[
                                              m
                                            ].children[n].children &&
                                            o <
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children.length;
                                            o++
                                          ) {
                                            if (
                                              data.message[i].children[j]
                                                .children[k].children[l]
                                                .children[m].children[n]
                                                .children[o].type === "bookmark"
                                            ) {
                                              let url =
                                                data.message[i].children[j]
                                                  .children[k].children[l]
                                                  .children[m].children[n]
                                                  .children[o].url; //the url of the page
                                              let yturl = isityt(url);
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

                                              if (oo === "usedomainnames") {
                                                hashtagv6 = getHashtag2(url);
                                                foldername = "";
                                              }

                                              if (
                                                !hasControlCharacters(title) &&
                                                title.length > 0
                                              ) {
                                                //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                console.log(
                                                  "pushing unto htmllinksarray",
                                                );
                                                console.log(
                                                  "13 foldername:=" +
                                                    foldername,
                                                );
                                                htmllinksarray.push({
                                                  description: title,
                                                  Url: url, //, //href,
                                                  yturl: yturl,
                                                  note: hashtagv6,
                                                  foldername: foldername,
                                                  amount: 0,
                                                  createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                  faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                });
                                              } else {
                                                console.log(
                                                  "NOT pushing unto htmllinksarray",
                                                );
                                              }
                                            } else {
                                              let hashtagv7;
                                              if (oo === "usefoldernames") {
                                                hashtagv7 = getHashtag(
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title,
                                                );
                                                foldername =
                                                  data.message[i].children[j]
                                                    .children[k].children[l]
                                                    .children[m].children[n]
                                                    .children[o].title;
                                              }

                                              // console.log(
                                              //   "hashtagv7=" + hashtagv7
                                              // );
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
                                                    .children[o].children
                                                    .length;
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
                                                  let yturl = isityt(url);
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

                                                  if (oo === "usedomainnames") {
                                                    hashtagv7 =
                                                      getHashtag2(url);
                                                    foldername = "";
                                                  }

                                                  if (
                                                    !hasControlCharacters(
                                                      title,
                                                    ) &&
                                                    title.length > 0
                                                  ) {
                                                    //let ts = parseInt(links.item(i).getAttribute("ADD_DATE"))//
                                                    console.log(
                                                      "pushing unto htmllinksarray",
                                                    );
                                                    console.log(
                                                      "14 foldername:=" +
                                                        foldername,
                                                    );
                                                    htmllinksarray.push({
                                                      description: title,
                                                      Url: url, //, //href,
                                                      yturl: yturl,
                                                      note: hashtagv7,
                                                      foldername: foldername,
                                                      amount: 0,
                                                      createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                                                      faviconURL: icon, //"https://google.com/favicon.ico" //icon
                                                    });
                                                  } else {
                                                    console.log(
                                                      "NOT pushing unto htmllinksarray",
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
                          } //nested for with k //
                        }
                      }
                    }
                  } else {
                    throw new Error("THIS BOOKMARRKS FILE IS NOT SUPPORTED");
                  }

                  console.log("outside loop");

                  console.log("before the end of the outer loop");
                }
                kht = undefined;
                kht2 = undefined;
                kht3 = undefined;

                setDone(true);

                console.log("three loops ended");
                console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ");
                console.log(
                  "JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ, htmllinksarray=" +
                    JSON.stringify(htmllinksarray),
                );
                console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ");

                //throw new Error("ERROR ERROR ERROR")
                // let result = B.filter(
                //   (b) => !A.some((a) => a.description.replace(/-/g, ' ') === b.description.replace(/-/g, ' '))
                // ); //I am having a problem with the hyphen

                let A = props.links;
                let B = htmllinksarray;
                let result = B.filter(
                  (b) => !A.some((a) => a.description === b.description),
                );

                console.log("result.length=" + result.length);
                //let ok = false;
                //500
                let ll = props.links.length;
                let rl = result.length;

                let max = 0;
                let loopmax2 = rl;
                //RZOEMMu7Nwa5bQ51sf71FfDX3A93
                if (props.signup.signup === true) {
                  const user = firebase.auth().currentUser;
                  let skip = 0;
                  max = getPlanMax() - (rl + ll);
                  console.log("in if, ll=" + ll);
                  console.log("in if, rl=" + rl);
                  console.log("in if, max=" + max);
                  if (max < 0) {
                    loopmax2 = rl - -1 * max;
                    skip = rl - loopmax2;
                  } else {
                    loopmax2 = rl;
                    skip = 0;
                  }

                  for (let i = 0; i < loopmax2; i++) {
                    //for (let i = 0; i < 1; i++) {
                    console.log(
                      "1 result[" + i + "].foldername=" + result[i].foldername,
                    );
                    r = props.startAddLink({
                      description: result[i].description,
                      Url: result[i].Url, //, //href,
                      yturl: result[i].yturl,
                      note: result[i].note,
                      foldername: result[i].foldername,
                      amount: 0,
                      createdAt: now.getTime(), //result[i].createdAt, //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                      faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
                    });

                    if (r === false) {
                      setImportingError(true);
                      break;
                    }
                  }
                  //throw new Error("ERROR ERROR ERROR")
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
                    // const fileRef = storage.refFromURL(props.url);

                    // fileRef.delete();
                    if (max < 0) {
                      //setResult2(result.slice(0,-(rl - skip)));
                      setResult2(result);
                      setResult(result.slice(rl - skip));
                      setMorePage(true);
                    } else {
                      setResult(result);
                    }
                  }
                } else {
                  //not logged in page, first example page

                  max = StorageSizes.premium - (rl + ll);
                  console.log("in if, ll=" + ll);
                  console.log("in if, rl=" + rl);
                  console.log("in if, max=" + max);
                  if (rl > max) {
                    loopmax2 = max;
                  }

                  for (let i = 0; i < loopmax2; i++) {
                    //for (let i = 0; i < 1; i++) {
                    console.log(
                      "1 result[" + i + "].foldername=" + result[i].foldername,
                    );
                    r = props.startAddLink({
                      description: result[i].description,
                      Url: result[i].Url, //, //href,
                      yturl: result[i].yturl,
                      note: result[i].note,
                      foldername: result[i].foldername,
                      amount: 0,
                      createdAt: now.getTime(), //result[i].createdAt, //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
                      faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
                    });

                    if (r === false) {
                      setImportingError(true);
                      break;
                    }
                  }
                  //throw new Error("ERROR ERROR ERROR")
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
                    // const fileRef = storage.refFromURL(props.url);

                    // fileRef.delete();
                    setResult(result);
                  }
                }
              })
              .catch((error) => {
                console.log("caught error = " + error);
                if (error === "THIS BOOKMARRKS FILE IS NOT SUPPORTED")
                  setError4(true);
                else if (error === "THE BROWSER IS NOT SUPPORTED")
                  setError3(true);
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
      {morePage === true ? (
        <div className="flexcol3">
          {/* {max < 0 && <div><ImportedBookmarks2 result={result2}  setThePayPage={setThePayPage}
            closeThisPage={closeThisPage} /></div>} */}

          <div>
            <ImportedBookmarks2
              result2={result2}
              result={result}
              setThePayPage={setThePayPage}
              closeThisPage={closeThisPage}
            />
          </div>
        </div>
      ) : payPage === true ? (
        <div>
          {/* <PremiumPlan /> */}
          <Simple />
          {/* <TeirsPayment3 /> */}
        </div>
      ) : (
        <div>
          {error ? <div>Error: Unable to read from firebase storage</div> : ""}
          {error2 ? (
            <div>
              Error: An exception error was thrown. Please try rewritting the
              bookmarks.html file or make it smaller.
            </div>
          ) : (
            ""
          )}
          {error3 ? <div>Error: The browser is not supported.</div> : ""}
          {error4 ? (
            <div>Error: This bookmarks file is not supported.</div>
          ) : (
            ""
          )}
          {importingError === true ? (
            "Error importing bookmarks"
          ) : !error && !error2 && done ? (
            <ImportedBookmarks result={result} rl={loopmax} max={rl} />
          ) : (
            <LoadingPage />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  url: state.url,
  links: state.links,
  theplan: state.theplan,
  signup: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks),
);
