import Constants from "./Constants";
import ConstantsLanguage from "./ConstantsLanguage";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import database from "../firebase/firebase";
import ClickableList from "./ClickableList";
import OthersButton from "./OthersButton";
import ChatNotifications from "./ChatNotifications";
//import { useSelector } from "react-redux";
import { startAddIsonline } from "./../actions/isonline";
import moment from "moment";
//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage
//import Emoji from "./Emoji"
//import Emoji2 from "./Emoji2"
//
import { Link } from "react-router-dom";
//import { useSearchParams } from "react-router-dom";

import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { setLinks } from "../actions/links";

import redarrow from "../assets/images/red-arrow.jpg";
import cathedral from "../assets/images/cathedral-mehmet-turgut-kirkgoz-1.png";

//import logo from "../assets/images/logo-l.png";
//import logo from "../assets/images/logo-orange-urilinks.png";
import logo from "../assets/images/logo-orange-u.png";
import logo2 from "../assets/images/logo-urilinks.png";
import myprofile from "../assets/images/myprofile.png";
import signature from "../assets/images/signature.png";

//import { getAuth } from "firebase";
import XShareButton from "./XShareButton";
//import Dropdown from "./Dropdown";
import setHasrefreshed from "../actions/hasrefreshed";
import { startAddPhotourl } from "../actions/photourl";
import { startAddBmok } from "../actions/bmok";
//import { startAddDisplayname } from "../actions/displayname";
import { startAddGoogleUserData } from "../actions/googleuserdata";
//import { startAddEmail } from "../actions/email";
import { startDeleteAccount } from "../actions/email";
import { setTheplan2 } from "../actions/theplan";
import { setBmok2 } from "../actions/bmok";
import { setGoogleUserData } from "../actions/googleuserdata";
import { setPhotourl } from "../actions/photourl";
import setSignup from "../actions/signup";
import Header2 from "./Header2";
import HeaderAccountMenu from "./HeaderAccountMenu";
//import ReactSpeechKit from "ReactSpeechKit"
import {
  incrementTotalLoggedOutClickCount,
  incrementTotalLoggedOutClickCount2,
} from "../actions/thetotalloggedout";

import { setTextFilter, sortByDescription } from "../actions/filters";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

//import { useClickOutside } from './useClickOutside';
import { setNewFollowingLinks } from "./../actions/following";

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Close when clicking outside
  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Element */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-10 min-w-max">
          {children}
        </div>
      )}
    </div>
  );
};

export const Header = (props) => {
  console.log("HEADER SIGNUP AFTER RELOAD =", props.signup);
console.log("HEADER AUTH UID AFTER RELOAD =", props.auth.uid);
  const [deleteAccountError, setDeleteAccountError] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [inviewport, setInviewport] = useState(false);
  const [toggledUse, setToggledUse] = useState(false);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [theplan, setTheplan] = useState("");
  const [bmok, setBmok] = useState(false);
  const [updateLoggedOut, setUpdateLoggedOut] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/images/default-profile.png",
  );
  const [language, setLanguage] = useState(ConstantsLanguage.en);

  //  const [searchParams, setSearchParams] = useSearchParams({

  // });
  const [linksUpdateDateTime, setLinksUpdateDateTime] = useState(
    new Date(props.theupdatedate.updatedate).toLocaleDateString() +
      " at " +
      new Date(props.theupdatedate.updatedate).toLocaleTimeString() +
      " " +
      new Date(props.theupdatedate.updatedate).toLocaleDateString(undefined, {
        weekday: "long",
      }),
  );

  const [lengthOf2, setLengthOf2] = useState(0);
  const [resultArray2, setResultArray2] = useState([]);

  const ideas = () => {};

  const params = new URLSearchParams(window.location.search);

  const signup = params.get("signup");
  const x = params.get("x");
  const x1 = params.get("x1");
  const dn = params.get("dn");
  const purl2 = params.get("purl");
  const z10 = params.get("z10");
  const ni = params.get("ni");


  //   const baseUrl =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://urilinks.com";

  // alert(process.env.NODE_ENV)

  let baseUrl = "";

  const dispatch = useDispatch()

  if (Constants.NODE_DEV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://urilinks.com";
  }

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user && user.photoURL) {
  //       setProfileImage(user.photoURL);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  function decrypt(text, key) {
    if (text === null) return null;
    return String.fromCharCode(
      ...text
        .match(/.{1,2}/g)
        .map(
          (e, i) => parseInt(e, 16) ^ (key.charCodeAt(i % key.length) % 255),
        ),
    );
  }

  //   const downloadLinksHTML = () => {
  //     console.log("downloadLinksHTML")
  //   //const user = firebase.auth().currentUser;

  //   if (!props.auth.user) {
  //     return;
  //   }

  //   console.log("2 downloadLinksHTML")

  //   firebase
  //     .database()
  //     .ref("users/" + props.auth.uid + "/links")
  //     .once("value")
  //     .then((snapshot) => {
  //       const linksObject = snapshot.val();

  //       if (!linksObject) {
  //         return;
  //       }

  //       let html = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //   <meta charset="UTF-8">
  //   <title>urilinks Links</title>
  // </head>
  // <body>

  // <h1>urilinks Links</h1>
  // `;

  //       Object.keys(linksObject).forEach((id) => {
  //         const link = linksObject[id];

  //         const description = link.description || "";
  //         const url = link.Url || "";
  //         const note = link.note || "";

  //         html += `
  // <div>
  //   <p>
  //     <a href="${url}" target="_blank">
  //       ${description}
  //     </a>
  //   </p>

  //   <p>${note}</p>
  // </div>

  // <hr>
  // `;
  //       });

  //       html += `
  // </body>
  // </html>
  // `;

  //       const blob = new Blob([html], {
  //         type: "text/html;charset=utf-8;"
  //       });

  //       const url = URL.createObjectURL(blob);

  //       const a = document.createElement("a");

  //       a.href = url;
  //       a.download = "urilinks-links.html";

  //       document.body.appendChild(a);

  //       a.click();

  //       document.body.removeChild(a);

  //       URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.log(
  //         "Error downloading links:",
  //         error
  //       );
  //     });
  // };

//   const downloadLinksHTML = () => {
//     firebase.auth().onAuthStateChanged(async (user) => {
//       console.log("1. downloadLinksHTML started");

//       if (!user) {
//         console.log("STOPPED: no Firebase user");
//         return;
//       }

//       console.log("user.email =", user.email);

//       const emailName = user && user.email ? user.email.split("@")[0] : "user";

//       console.log("emailName =", emailName);

//       firebase
//         .database()
//         .ref("users/" + user.uid + "/links")
//         .once("value")
//         .then((snapshot) => {
//           console.log("3. Firebase read completed");

//           const linksObject = snapshot.val();

//           console.log("4. linksObject =", linksObject);

//           if (!linksObject) {
//             console.log("STOPPED: no links found");
//             return;
//           }

//           let html = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>urilinks Links</title>
// </head>
// <body>

// <h1>urilinks Links</h1>
// `;

//           // Sort links alphabetically by description
//           const sortedLinks = Object.keys(linksObject)
//             .map((id) => linksObject[id])
//             .sort((a, b) => {
//               const aDescription = (a.description || "").toLowerCase();

//               const bDescription = (b.description || "").toLowerCase();

//               return aDescription.localeCompare(bDescription);
//             });

//           sortedLinks.forEach((link) => {
//             const description = link.description || "";

//             const linkUrl = link.Url || "";

//             const note = link.note || "";

//             html += `
// <div>
//   <p>
//     <a href="${linkUrl}" target="_blank">
//       ${description}
//     </a>
//   </p>

//   <p>${note}</p>
// </div>

// <hr>
// `;
//           });

//           html += `
// </body>
// </html>
// `;

//           console.log("5. HTML created");

//           const blob = new Blob([html], {
//             type: "text/html;charset=utf-8;",
//           });

//           const downloadUrl = URL.createObjectURL(blob);

//           console.log("6. Blob URL created =", downloadUrl);

//           const a = document.createElement("a");

//           a.href = downloadUrl;

//           a.download = emailName + "-urilinks-links.html";

//           document.body.appendChild(a);

//           console.log("7. About to click download link");

//           a.click();

//           console.log("8. Download link clicked");

//           setTimeout(() => {
//             document.body.removeChild(a);

//             URL.revokeObjectURL(downloadUrl);

//             console.log("9. Download cleanup completed");
//           }, 2000);
//         })
//         .catch((error) => {
//           console.log("DOWNLOAD ERROR:", error);
//         });
//     });
//   };

const downloadLinksHTML = () => {
  if (!props.auth) {
    return;
  }

  firebase
    .database()
    .ref("users/" + props.auth.uid + "/links")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();

      if (!data) {
        alert("There are no links to download.");
        return;
      }

      const escapeHTML = (text) => {
        if (text === undefined || text === null) {
          return "";
        }

        return String(text)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };

      const links = Object.keys(data).map((id) => {
        return {
          id: id,
          ...data[id],
        };
      });

      let html = "";

      html += "<!DOCTYPE NETSCAPE-Bookmark-file-1>\n";
      html += "<!-- This is an automatically generated file.\n";
      html += "     It will be read and overwritten.\n";
      html += "     DO NOT EDIT! -->\n";
      html +=
        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n';
      html += "<TITLE>Bookmarks</TITLE>\n";
      html += "<H1>Bookmarks</H1>\n";
      html += "<DL><p>\n";

      links.forEach((link) => {
        const url = link.Url || link.url || "";
        const description = link.description || url || "Bookmark";
        const note = link.note || "";

        if (!url) {
          return;
        }

        let addDate = Math.floor(Date.now() / 1000);

        if (link.createdAt) {
          addDate = Math.floor(Number(link.createdAt) / 1000);
        }

        html +=
          '    <DT><A HREF="' +
          escapeHTML(url) +
          '" ADD_DATE="' +
          addDate +
          '" URILINKS_NOTE="' +
          escapeHTML(note) +
          '">' +
          escapeHTML(description) +
          "</A>\n";
      });

      html += "</DL><p>\n";

      const blob = new Blob([html], {
        type: "text/html;charset=utf-8",
      });

      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "urilinks-bookmarks.html";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(downloadUrl);
    })
    .catch((error) => {
      console.log("Error downloading links:", error);
      alert("There was an error downloading the bookmarks.");
    });
};



const downloadLinksCSV = () => {
  const user = firebase.auth().currentUser;

  if (!user) {
    return;
  }

  firebase
    .database()
    .ref("users/" + user.uid + "/links")
    .once("value")
    .then((snapshot) => {
      const linksObject = snapshot.val();

      if (!linksObject) {
        return;
      }

      const rows = [];

      // CSV header
      rows.push([
        "description",
        "Url",
        "note",
        "foldername",
        "addescription",
        "adUrl",
        "showpublic",
        "frequency",
        "createdAt"
      ]);

      Object.keys(linksObject).forEach((id) => {
        const link = linksObject[id];

        rows.push([
          link.description || "",
          link.Url || "",
          link.note || "",
          link.foldername || "",
          link.addescription || "",
          link.adUrl || "",
          link.showpublic || 0,
          link.frequency || 0,
          link.createdAt || ""
        ]);
      });

      const escapeCSV = (value) => {
        const text = String(value);

        return '"' + text.replace(/"/g, '""') + '"';
      };

      const csv = rows
        .map((row) =>
          row.map((value) => escapeCSV(value)).join(",")
        )
        .join("\r\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "urilinks-links.csv";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.log(
        "Error downloading links:",
        error
      );
    });
};



  const z11 = decrypt(z10, "125434"); //process.env.REACT_APP_EKEY)
  //const follower = useSelector(state => state.follower);

  useEffect(() => {
    //props.abc(1);
    //console.log("1, props.abcref=" + JSON.stringify(props.abcref));

    //console.log("following from useSelector:", follower);
    console.log("Header.js, props.gud=" + JSON.stringify(props.gud));
    console.log("Header.js, props.auth=" + JSON.stringify(props.auth));
    console.log("Header.js, props.ischat=" + JSON.stringify(props.ischat));
    console.log("Header.js, isonline ids=" + JSON.stringify(props.isonline));
    console.log("Header.js, follower ids=" + JSON.stringify(props.follower));
    console.log("Header.js, following ids=" + JSON.stringify(props.following));
    console.log(
      "Header.js, newfollowinglinks ids=" +
        JSON.stringify(props.newfollowinglinks),
    );
    console.log("Header.js, props.users=" + JSON.stringify(props.users));

    const handleWindowClose = (event) => {
      // Use sendBeacon for reliable background data transmission
      // navigator.sendBeacon('/api/log-close', JSON.stringify({ reason: 'close' }));

      // Alternatively, for simple synchronous calls (less reliable):
      // fetch('/api/log-close', { method: 'POST', body: ... });

      // Prevent default to trigger browser confirmation dialog (optional)

      //  if (event.currentTarget.performance.navigation.type === 1) {
      //   return; // It's a reload, do nothing
      // }

      sessionStorage.setItem("isClosing", "true");

      //event.preventDefault();
      //event.returnValue = '';
    };

    const handleUnload = () => {
      if (sessionStorage.getItem("isClosing") === "true") {
        // Perform cleanup or API call (e.g., logout)
        // Use navigator.sendBeacon for reliable data transmission
        console.log("Tab closed");
        alert("props.theloggedin.loggedin=" + props.theloggedin.loggedin);
        if (props.theloggedin.loggedin === 1) {
          logoutit();
        }
      }
      sessionStorage.removeItem("isClosing");
    };

    //window.onbeforeunload = null;
    window.addEventListener("beforeunload", handleWindowClose);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  function slowScrollDown(distance, duration) {
    const startingY = window.pageYOffset;
    const targetY = startingY + distance;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out) for smoother deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);

      //window.scrollTo(0, startingY + (targetY - startingY) * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  const isInMeArray = () => {
    //these email address are allowed to upload bookmark files
    const mearray = [
      "gRbBUvzvvpUG1Bk7q9ZoJETLWKa2",
      "m8f0YMF5bucp9uhblPZhM8CTjq12",
      "zIK65gVpE9RPpHFZprjblMGJ2KB3",
      "D9LSg6elood8Yc5gd5oDMp3JNAQ2",
      "WJGHkWycjKQxPK83Fi4zqx53bCl1",
      "W4XCM1PRqtZeAzCZ0ALlEFrIwaw1",
      "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2",
      "Gj6I5M7qf8ODZCsFqC3zAuFTXgx2", //,
      //"XLFFo8DQ7LZh8oR8CnvBGInpjsZ2" //jmjohnmcgovern707@gmail.com
    ];
    let val = false;
    mearray.forEach((id) => {
      if (uid === id) val = true;
    });

    return val;
  };

  console.log("Header.js, signup=" + signup);
  console.log("Header.js, x=" + x);

  const setPhotoURLdb = (photoURL) => {
    console.log("setPhotoURLdb, Header.js, photoURL=" + photoURL);
    ////put the photoURL in the database
    props.startAddPhotourl({ photourl: photoURL });
    console.log("Header.js, done calling startAddPhotourl");
  };

  const setBmokdb = (bmok) => {
    console.log("setBmokdb, Header.js, bmok=" + bmok);
    ////put the photoURL in the database
    props.startAddBmok({ bmok: bmok });
    console.log("Header.js, done calling startAddBmok");
  };

  // const setDisplayNamedb = (displayName) => {
  //   console.log("setDisplayNamedb, Header.js, displayName=" + displayName);

  //   //props.startAddDisplayname({ displayname: displayName });
  //   console.log("Header.js, done calling startAddDisplayname");
  // };

  const setGoogleUserDatadb = (gud) => {
    //console.log("setGoogleUserDatadb, Header.js, gud=" + gud);
    ////put the photoURL in the database
    console.log(
      "before calling props.startAddGoogleUserData, gud=" + JSON.stringify(gud),
    );
    props.startAddGoogleUserData({ gud: gud });
    //props.startAddGoogleUserData(gud);
    console.log("Header.js, done calling startGoogleUserData");
  };

  // const setEmaildb = (email) => {
  //   console.log("setEmaildb, Header.js, email=" + email);
  //   ////put the photoURL in the database
  //   props.startAddEmail({ email: email });
  //   console.log("Header.js, done calling startAddEmail");
  // };

  const getNewLinksNumber = (ra) => {
    let i = 0;
    ra.forEach((e) => {
      if (e.isMatch === "is following " && e.newlinks === "yes") i++;
    });
    console.log("getNewLinksNumber, newLinks, i=" + i);
    return i;
  };

  const annotatearray2 = (array1, array2, array3) => {
    console.log(
      "SeeFollowingPage.js, annotatearray2(), array1=" + JSON.stringify(array1),
    ); //props.users [{gud:{}}]
    console.log(
      "SeeFollowingPage.js, annotatearray2(), array2=" + JSON.stringify(array2),
    ); //props.following [{uid:}]
    console.log(
      "SeeFollowingPage.js, annotatearray2(), array3=" + JSON.stringify(array3),
    ); //props.newfollowingusers [{uid:, newlinks:"yes"}]
    const resultArray = array1.map((item) => ({
      ...item,
      isMatch:
        array2.some((item2) => item2.uid === item.gud.uid) === true
          ? "is following "
          : "is not following ",
      newlinks:
        array3.some(
          (item3) =>
            item3.uid === item.gud.uid &&
            !!item3.newlinks === true &&
            item3.newlinks === "yes",
        ) === true
          ? "yes"
          : "no",
    }));

    console.log(
      "SeeFollowingPage.js, annotatearray2(), resultArray=" +
        JSON.stringify(resultArray),
    );
    return resultArray;
  };

  useEffect(() => {
    //whichone === 1
    const ra2 = annotatearray2(
      props.users,
      props.following,
      props.newfollowinglinks,
    );

    let array1 = ra2; //annotatearray(props.users, props.following); //has is following information and newlinks:yes information

    let array3 = [];
    if (array1.length > 1) {
      array3 = array1.sort((a, b) => {
        const valA = a.gud.displayname.toLowerCase();
        const valB = b.gud.displayname.toLowerCase();
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    } else {
      array3 = array1;
    }

    setResultArray2(array3);

    setLengthOf2(getNewLinksNumber(ra2));

    //whichone === 1
  }, []);

  useEffect(() => {
    //alert("process.env.NODE_ENV="+process.env.NODE_ENV)
    console.log(
      "Header.js, useEffect, props.signup.signup=" + props.signup.signup,
    );

    // const user = firebase.auth().currentUser;
    // console.log("Header.js, useEffect, user.uid=" + user.uid);
    // setPhotoURL("");
    //if(props.signup.signup===false) {

    //if(props.signup.signup===true)

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //alert(JSON.stringify(user))
        //const user = firebase.auth().currentUser

        startAddIsonline(user.uid); //the user is logged in

        console.log("Header.js, user=" + JSON.stringify(user));
        console.log("Header, photoURL=" + user.photoURL);
        const purl = user.photoURL;
        const bmok = user.bmok;
        const dn = user.displayName;

        const gud = {
          photourl: purl,
          displayname: dn,
          theatname: "@" + dn.replace(/\s+/g, ""),
          email: user.email,
          uid: user.uid,
        };
        //alert("gud="+JSON.stringify(gud))
        console.log("Header.js, useEffect, gud=" + JSON.stringify(gud));
        setPhotoURL(purl);
        setPhotoURLdb(purl);

        const ttbmok = true;
        if (bmok === undefined) setBmok(ttbmok);
        else setBmok(bmok);
        if (bmok === undefined) setBmokdb(ttbmok);
        else setBmokdb(bmok);

        //setDisplayNamedb(dn);
        setGoogleUserDatadb(gud);
        //setEmaildb(user.email);
        setUid(gud.uid);
        setName(gud.displayname);
        // setName(
        //   user.uid === "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2"
        //     ? gud.displayname+" 1, XLFFo8DQ7LZh8oR8CnvBGInpjsZ2"
        //     : gud.displayname+" 2, "
        // );
        setEmail(user.email);
        if (props.theplan.plan === "basic") setTheplan("on basic plan");
        else if (props.theplan.plan === "standard")
          setTheplan("on standard plan");
        else if (props.theplan.plan === "premium")
          setTheplan("on premium plan");
        else setTheplan("free");
      }
    });

    return () => unsubscribe();
  }, []);

  const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
    window.document.getElementById("termid").focus();
  };

  const scrolldown2 = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    !!document.querySelector("#before-before-link-summary-id") &&
      document.querySelector("#before-before-link-summary-id").scrollIntoView({
        behavior: "smooth",
      });
    window.document.getElementById("addlinkid").focus();
  };

  /*
 await database
      .ref(`users/thetotalloggedout`)
      .update({totalloggedout:parseInt(x.totalloggedout)+1}) //{showpublic:0}
      .then(() => {

      })
  */

  /*
const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
    // Example: Accessing a database reference
    if (dbRef) dbRef.increment();
  }, [dbRef]);
      */

  // const handleUpdate = useCallback(() => {
  //   // setCount(prev => prev + 1);
  //   // // Example: Accessing a database reference
  //   // if (dbRef) dbRef.increment();

  //    try {
  //   let x = {
  //     totalloggedout: props.thetotalloggedout.totalloggedout
  //   }
  //   const userRef = ref(database, 'users/thetotalloggedout');

  //   update(userRef, {
  //     totalloggedout:parseInt(x.totalloggedout)+1
  //   });
  //   console.log('Data updated successfully');
  // } catch (error) {
  //   console.error('Update failed:', error);
  // }

  // }, []);

  //return (dispatch, getState) => {

  //}

  // export const loadUser = () => {
  //     return (dispatch, getState) => {
  //         // dispatch and getState are now available here
  //         dispatch({ type: 'USER_LOADED', payload: res.data });
  //     }
  // }

  // const updateItems =  () => {

  //   let x = {
  //       totalloggedout: props.thetotalloggedout.totalloggedout
  //     }

  //     database
  //       .ref(`users/thetotalloggedout`)
  //       .update({totalloggedout:parseInt(x.totalloggedout)+1}) //{showpublic:0}
  //       .then(() => {
  //         console.log("incrementTotalLoggedOutClickCount success 3")
  //         //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
  //         //dispatch(incrementTotalLoggedOutClickCount2({totalloggedout:parseInt(x.totalloggedout)+1}));
  //       })
  //       .catch((error) => {
  //         console.log("error incrementTotalLoggedOutClickCount, error=" + error);
  //       });

  // }

  // const handleUpdate = useCallback(() => {

  //      updateItems()

  //   }, []);

  //works:
  const handleUpdate = useCallback(() => {
    // setCount(prev => prev + 1);
    // // Example: Accessing a database reference
    // if (dbRef) dbRef.increment();

    try {
      //return async (dispatch, getState) => {
      console.log("incrementTotalLoggedOutClickCount success 2");
      //const uid = getState().auth.uid;
      // alert("incrementClickCount, uid="+uid)
      //update(dbRef, { value: increment(1) });
      //return
      let x = {
        totalloggedout: props.thetotalloggedout.totalloggedout,
      };

      database
        .ref(`users/thetotalloggedout`)
        .update({ totalloggedout: parseInt(x.totalloggedout) + 1 }) //{showpublic:0}
        .then(() => {
          console.log("incrementTotalLoggedOutClickCount success 3");
          //alert("{frequency:frequency+1}"+JSON.stringify({frequency:frequency+1}))
          //dispatch(incrementTotalLoggedOutClickCount2({totalloggedout:parseInt(x.totalloggedout)+1}));
        })
        .catch((error) => {
          console.log(
            "error incrementTotalLoggedOutClickCount, error=" + error,
          );
        });
      //};//
    } catch (error) {
      console.error("Update failed:", error);
    }
  }, []);

  const handleUpdate2 = useCallback(() => {
  try {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.log("handleUpdate2: No user logged in");
      return;
    }

    database
      .ref(`users/${user.uid}/theloggedin`)
      .update({ loggedin: 0 })
      .then(() => {
        console.log("handleUpdate2 success");
      })
      .catch((error) => {
        console.error("handleUpdate2 error:", error);
      });

  } catch (error) {
    console.error("Update failed:", error);
  }
}, []);

  //   const handleUpdate = async () => {
  //   try {
  //     let x = {
  //       totalloggedout: props.thetotalloggedout.totalloggedout
  //     }
  //     const userRef = ref(database, 'users/thetotalloggedout');

  //     await update(userRef, {
  //       totalloggedout:parseInt(x.totalloggedout)+1
  //     });
  //     console.log('Data updated successfully');
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   }
  // };

  //   const handleUpdate = async () => {
  //   try {
  //     let x = {
  //       totalloggedout: props.thetotalloggedout.totalloggedout
  //     }
  //     const userRef = ref(database, 'users/thetotalloggedout');

  //     await update(userRef, {
  //       totalloggedout:parseInt(x.totalloggedout)+1
  //     });
  //     console.log('Data updated successfully');
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   }
  // };

  //const logoutit = async () => {
  const logoutit = async () => {
    try {
      handleUpdate();

      handleUpdate2();

      props.setHasrefreshed({ hasrefreshed: false });

      setTheplan2({
        customerId: "",
        plan: "free",
        subscriptionId: "",
        uid: "",
      });
      props.setTextFilter("");
      props.sortByDescription();
      setPhotourl("");
      setGoogleUserData({});
      setBmok2(true);

      setSignup(false);

      setLinks([]);
      dispatch({ type: "CLEAR_USERS" });
      dispatch({ type: "CLEAR_FOLLOWING" });
      dispatch({ type: "CLEAR_FOLLOWER" });

      //props.stopScrolling2();
      if (typeof props.stopScrolling2 === "function") {
  props.stopScrolling2();
}

      const user = firebase.auth().currentUser;

      if (user) {
        const userStatusRef = firebase
          .database()
          .ref(`users/${user.uid}/online`);

        console.log("SETTING OFFLINE BEFORE LOGOUT");

        await userStatusRef.set(false);

        console.log("OFFLINE WRITE FINISHED");
      }

      props.startLogout();
    } catch (e) {
      console.log("logoutit failed, e=" + e);
    }
  };

  const dlogoutit = () => {
    props.setHasrefreshed({ hasrefreshed: false });

    setTheplan2({
      customerId: "",
      plan: "free",
      subscriptionId: "",
      uid: "",
    });
    props.setTextFilter("");
    props.sortByDescription();
    setPhotourl("");
    setGoogleUserData({});
    setBmok2(true);

    setSignup(false);

    setLinks([]);

    //props.stopScrolling2();
if (typeof props.stopScrolling2 === "function") {
  props.stopScrolling2();
}


    props.startLogout();
  };

  const cancelsubscription = () => {
    //alert("cancelSubscription, plan:"+props.theplan.plan.replace(/"/g, ""))
    try {
      if (
        confirm(
          "***WARNING*** PLEASE READ!! Press Cancel to abort the deletion of your account.",
        ) == true
      ) {
        //console.log("plan="+props.theplan.plan.replace(/"/g, ""))
        //if(true) {
        if (
          confirm(
            "***WARNING*** PLEASE READ!! Press Cancel to abort the deletion of your account.",
          ) == true
        ) {
          if (
            confirm(
              "***WARNING*** PLEASE READ!! Press Cancel to abort the deletion of your account.",
            ) == true
          ) {
            if (
              !!props.theplan.plan &&
              props.theplan.plan.replace(/"/g, "") === "free"
            ) {
              console.log("cancelsubscription, free plan part");
              props.startDeleteAccount();
              dlogoutit();
            } else {
              console.log("cancelsubscription, free plan part");
              //alert(props.theplan.customerId+", "+props.theplan.subscriptionId)
              const theemail = {
                email: props.email,
                customerId: props.theplan.customerId,
                subscriptionId: props.theplan.subscriptionId,
              };

              fetch("https://urilinks-project-vercel-stripe-canc.vercel.app", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(theemail),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Success:");

                  props.startDeleteAccount();
                  logoutit();
                })
                .catch((error) => {
                  console.log("cancel subscription error=" + error);
                });
            }
          }
        }
      } else {
        alert("Canceled the deletion of the account");
        console.log("Canceled the Deletion of the Account");
      }
    } catch (error) {
      alert("an error occurred: 10002222");
      console.log("an error occurred: 10002222, error=" + error);
    }
    //
  };

  // if (isMobile()) {
  //   console.log("Mobile device detected");
  // } else {
  //   console.log("Desktop device detected");
  // }//

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  // function isMobile() {
  //     const minWidth = 768; // Minimum width for desktop devices
  //     return window.innerWidth < minWidth;
  // }

  const setToggledUsea = () => {
    setToggledUse(!toggleUse);
  };

  const okToShow = () => {};

  const hashtagsPage = (event) => {
    event.preventDefault();
    // if(uid==="XLFFo8DQ7LZh8oR8CnvBGInpjsZ2")
    //   window.open("https://urilinks.com/displayhashtags", "_blank");   //window.location.href = "https://urilinks.com/displayhashtags"
    // else window.open("https://urilinks.com/displayhashtags?signup=signup", "_blank"); //window.location.href = "https://urilinks.com/displayhashtags?signup=signup";
    //window.location.href = "https://urilinks.com/displayhashtags?signup=signup";
    window.open(baseUrl + "/displayhashtags?signup=signup", "_blank");
  };

  const otherPage = (id, event) => {
    //event.preventDefault();
    console.log("otherPage, id=" + id);
    // if(uid==="XLFFo8DQ7LZh8oR8CnvBGInpjsZ2")
    //   window.open(baseUrl+"/displayhashtags", "_blank");   //window.location.href = baseUrl+"/displayhashtags"
    // else window.open(baseUrl+"/displayhashtags?signup=signup", "_blank"); //window.location.href = "https://urilinks.com/displayhashtags?signup=signup";
    //window.location.href = "https://urilinks.com/displayhashtags?signup=signup";
    window.open(baseUrl + "/dashboard?signup=0&x=readonly&id=" + id, "_blank");
  };

  const goToPage = (newfollowinglinks) => {};

  return (
    <div className="">
      {isMobile() === false ? (
        <div id="top">
          {!deleteAccountError ? (
            <header
              className="header bg-color-1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                color: "white",
                padding: "8px 14px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.16)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minWidth: "220px",
                  }}
                >
                  <img
                    className="rounded-full-1 cursor-default"
                    src={logo}
                    width="36"
                    height="36"
                    alt="Logo"
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      className="color-white-1 cursor-default"
                      style={{ fontWeight: "700", fontSize: "16px", lineHeight: "18px" }}
                    >
                      🌺 urilinks
                    </span>

                    {ni !== "1" && ni !== "2" && ni !== "3" && (
                      <span
                        id="linksupdate"
                        className="color-white-1"
                        style={{ fontSize: "11px", opacity: "0.92", marginTop: "2px" }}
                        title="To see what links were added, select Date (Latest First) from the drop down menu to see the update(s). They will appear first."
                      >
                        {!!props.theupdatedate.updatedate === true
                          ? "Link(s) updated " + linksUpdateDateTime
                          : ""}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    flex: "1 1 420px",
                    flexWrap: "wrap",
                  }}
                >
                  {props.signup.signup === true &&
                    x !== "readonly" &&
                    ni !== "1" &&
                    ni !== "2" && (
                      <OthersButton
                        whichone={1}
                        buttonText={"New Links Ready"}
                        lengthOf2={lengthOf2}
                        resultArray2={resultArray2}
                        email={
                          !!firebase.auth().currentUser === true
                            ? firebase.auth().currentUser.email
                            : ""
                        }
                        uid={props.auth.uid}
                      />
                    )}

                  {ni === "3" ? (
                    <div></div>
                  ) : props.signup.signup === true ? (
                    <div>
                      <ChatNotifications chatsetting={1} />
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {dn !== null && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "3px 8px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.12)",
                      }}
                    >
                      <span className="color-white-1" style={{ fontSize: "12px" }}>
                        {dn + "'s links page"}
                      </span>
                      <img
                        src={purl2}
                        width="30"
                        height="30"
                        style={{ borderRadius: "50%" }}
                        className="profile-picture-ring"
                        title={z10 !== null ? z11 : ""}
                        alt="picture"
                      />
                    </div>
                  )}
                </div>

                {props.signup.signup === true || signup === "0" ? (
                  <img
                    src={photoURL}
                    width="34"
                    height="34"
                    style={{ borderRadius: "50%", flex: "0 0 auto" }}
                    className="profile-picture-ring"
                    title={name + ", " + email + ", " + theplan}
                    alt="Profile"
                  />
                ) : (
                  <img
                    src={myprofile}
                    width="34"
                    height="34"
                    style={{ borderRadius: "50%", flex: "0 0 auto" }}
                    title={name}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = "/images/default-profile.png";
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "7px",
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    flexWrap: "wrap",
                  }}
                >
                  {props.signup.signup === true && bmok === true ? (
                    <Link
                      id="uploadbookmarksfile"
                      className="header__title- nounderline pointereventsauto button-2h bg-shade-1 padding-left-4x padding-right-4x"
                      to="/bookmarksmanager"
                    >
                      <span
                        className="color-white-1 cursor-pointer pointereventsauto text-size-11"
                        title="uploads bookmarks file that was previously exported from the browser. It must be less the 100kb in size."
                      >
                        🎺 upload bookmarks
                      </span>
                    </Link>
                  ) : ni === "1" || ni === "2" || ni === "3" ? (
                    <div></div>
                  ) : (
                    <Link
                      id="uploadbookmarksfile"
                      className="header__title- nounderline pointereventsnone button-2h bg-shade-1 padding-left-4x padding-right-4x"
                      to="/bookmarksmanager"
                    >
                      <span
                        className="color-white-1 pointereventsnone text-size-11"
                        title="currently unavailable, please use Add Link."
                      >
                        🎺 upload bookmarks
                      </span>
                    </Link>
                  )}

                  {ni !== "1" && ni !== "2" && ni !== "3" && (
                    <Link
                      id="manual"
                      className="header__title- nounderline button-2h padding-left-4x padding-right-4x"
                      to="/manual"
                      target="_blank"
                    >
                      <span
                        className="color-white-1 cursor-pointer text-size-11"
                        title="Click to see the urilinks manual"
                      >
                        Manual
                      </span>
                    </Link>
                  )}

                  {ni !== "1" && ni !== "2" && ni !== "3" && (
                    <HeaderAccountMenu
                      signup = {props.signup.signup}
                      onDeleteAccount={cancelsubscription}
                      downloadLinksCSV={downloadLinksCSV}
                      downloadLinksHTML={downloadLinksHTML}
                    />
                  )}

                  {ni !== "1" && ni !== "2" && ni !== "3" && (
                    <Link
                      id="termsandprivacy"
                      className="header__title- nounderline button-2h padding-left-4x padding-right-4x"
                      to="/termsandprivacy"
                      target="_blank"
                    >
                      <span
                        className="color-white-1 cursor-pointer text-size-11"
                        title="Click to see terms and privacy"
                      >
                        ❒ kind terms
                      </span>
                    </Link>
                  )}

                  {!!props.theplan.plan &&
                    props.theplan.plan.replace(/"/g, "") !== "premium" &&
                    props.signup.signup === true && (
                      <Link
                        id="subscribe"
                        className="header__title- button-2h padding-left-4x padding-right-4x"
                        to="/teirspayment3"
                      >
                        <span
                          className="text-size-11 color-white-1"
                          title="Thank you. All credit card processing is handled through stripe.com and they comply with PCI DSS. Please click to see plans."
                        >
                          😎 plans (stripe.com)
                        </span>
                      </Link>
                    )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    flexWrap: "wrap",
                  }}
                >
                  {console.log("HEADER AUTH UID =", props.auth.uid)}
                  {console.log("HEADER SIGNUP =", props.signup.signup)}
                  {console.log("HEADER URL =", window.location.href)}
                  {!props.auth.uid && 
                    
                    ni !== "1" &&
                    ni !== "2" &&
                    ni !== "3" && (
                      <Link
                        id="friendlylogin"
                        className="nounderline color-white-1 cursor-pointer text-size-11 button-2h padding-left-4x padding-right-4x"
                        to="/login"
                        title="The first 25 links are free. plan $4.99 stores up to 100; plan $9.99 stores up to 200; plan $14.99 stores up to 400"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        🐋 friendly login
                      </Link>
                    )}

                  {console.log("HEADER SIGNUP =", props.signup.signup)}
                  {console.log("HEADER SIGNUP OBJECT =", JSON.stringify(props.signup))}
                  {!!props.auth.uid && (
                    <button
                      id="friendlylogout"
                      className="button button--link- button-2h padding-left-4x padding-right-4x ib text-size-11 color-white-1 cursor-pointer"
                      onClick={logoutit}
                    >
                      ◧ friendly logout
                    </button>
                  )}

                  {/* {props.signup.signup === true && (
                    <button
                      id="deleteaccount"
                      title="delete account"
                      className="button button--link- button-2h ib text-size-11 color-white-1 cursor-pointer padding-left-4x padding-right-4x"
                      onClick={cancelsubscription}
                    >
                      ◢◤ delete acct
                    </button>
                  )} */}
                </div>
              </div>
            </header>
          ) : (
            "Timeout error: To delete your accout, you will need to logout, relogin and then immediately delete the account."
          )}
        </div>
      ) : (
        <div>
          <Header2 />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  links: state.links,
  auth: state.auth,
  theupdatedate: state.theupdatedate,
  settings: state.settings,
  signup: state.signup,
  email: state.email,
  theplan: state.theplan,
  subscriptionId: state.subscriptionId,
  customerId: state.customerId,
  thesignupcount: state.thesignupcount,
  thetotalloggedout: state.thetotalloggedout,
  theloggedin: state.theloggedin,
  following: state.following,
  follower: state.follower,
  newfollowinglinks: state.newfollowinglinks,
  users: state.users,
  isonline: state.isonline,
  gud: state.gud,
  ischat: state.ischat,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDescription: (text) => dispatch(sortByDescription(text)),
  startLogout: (data) => dispatch(startLogout(data)),
  setLinks: (links) => dispatch(setLinks(links)),
  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
  startAddPhotourl: (photourl) => dispatch(startAddPhotourl(photourl)),
  startAddBmok: (bmok) => dispatch(startAddBmok(bmok)),
  // startAddDisplayname: (displayname) =>
  //   dispatch(startAddDisplayname(displayname)),
  startAddGoogleUserData: (gud) => dispatch(startAddGoogleUserData(gud)),
  //startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
  startAddTheupdatedate: (data) => dispatch(startAddTheupdatedate(data)),
  incrementTotalLoggedOutClickCount: (data) =>
    dispatch(incrementTotalLoggedOutClickCount(data)),
  incrementTotalLoggedOutClickCount2: (data) =>
    dispatch(incrementTotalLoggedOutClickCount2(data)),
  removeAllData: (data) => dispatch(removeAllData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
