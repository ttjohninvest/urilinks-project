import Constants from "./Constants";
import React, { useEffect, useState } from "react";

//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage

import { connect } from "react-redux";
import { startAddTheupdatedate } from "../actions/theupdatedate";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
//import TeirsPayment3 from "./TeirsPayment3";
import Simple from "./Simple";
//import SimpleTest2 from "./SimpleTest2";
import PremiumPlan from "./PremiumPlan";
import StorageSizes from "./StorageSizes";
import { getShowPublic } from "./../actions/sp";

export const AddLinkPage = (props) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [maximumPage, setMaximumPage] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
   const [linkStatuses, setLinkStatuses] = useState({});
  //const history = useHistory();

  //   const baseUrl =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://urilinks.com";

  let baseUrl = "";

  if (Constants.NODE_DEV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://urilinks.com";
  }

  const getPlanMax = () => {
    let max = StorageSizes.free;
    //props.settings.plan
    if (props.auth.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2")
      max = StorageSizes.mine;
    else if (
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
      max = StorageSizes.premium;
    }

    console.log("AddLinkPage.js, bookmarks, max=" + max);
    return max;
  };

  const goBack = () => {
    props.history.goBack(); // Navigates back one step in the history
  };

  useEffect(() => {
    console.log("getPlanMax()=" + getPlanMax());
    const fetchData = async () => {
      try {
        //XLFFo8DQ7LZh8oR8CnvBGInpjsZ2
        if (props.signup.signup === true) {
          const user = firebase.auth().currentUser;
          if (user) {
            const uid = user.uid;
            setUserId(uid);
            console.log("User ID:", uid);
          } else {
            console.log("No user is currently logged in.");
          }
        } else {
          setUserId("XLFFo8DQ7LZh8oR8CnvBGInpjsZ2");
        }

        const db = firebase.database();
        ////try {//XLFFo8DQ7LZh8oR8CnvBGInpjsZ2
        let snapshot;
        if (props.signup.signup === true) {
          const user = firebase.auth().currentUser;
          snapshot = await db.ref(`/users/${user.uid}/links`).once("value");
        } else {
          snapshot = await db
            .ref(`/users/XLFFo8DQ7LZh8oR8CnvBGInpjsZ2/links`)
            .once("value");
        }

        if (snapshot.exists()) {
          const data = snapshot.val();
          const count = Object.keys(data).length;
          console.log("count=" + count);
          setCount(count);
        } else {
          console.log("else part, count=" + 0);
          setCount(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCount(-1); // Indicate an error
      }
    };

    fetchData();
  }, []);

  // const isityt = (url) => {
  //   if (!!url === true && url.includes("youtube")) {
  //     //https://www.youtube.com/watch?v=L9ervwr0qq0&list=RDL9ervwr0qq0&start_radio=1
  //     //   //get the id
  //     let ytid;
  //     if (!!url === true && url.includes("shorts")) {
  //       let a = url.split("/");
  //       let i = a.length - 1;
  //       ytid = a[i];
  //     } else {
  //       if (!!url === true) {
  //         let a = url.split("v=");
  //         if (!!a[1] === true && a[1].includes("&")) {
  //           let b = a[1].split("&");
  //           ytid = b[0];
  //         } else {
  //           ytid = a[1];
  //         }
  //       }
  //     }

  //     console.log("ytid=" + ytid);
  //     return "https://img.youtube.com/vi/" + ytid + "/mqdefault.jpg";
  //     // //setVisityt(ytid)
  //     //return "https://img.youtube.com/vi/K8LLF-46FN8/mqdefault.jpg" //yturl
  //   }

  //   return "";
  // };

  const isYouTubeThumbnailAvailable = async (thumbnailUrl) => {
  if (!thumbnailUrl) return false;

  try {
    const response = await fetch(thumbnailUrl, {
      method: "HEAD"
    });

    return response.ok;

  } catch (error) {
    console.log("Thumbnail check failed:", error);
    return false;
  }
};

  //const getYouTubeThumbnail = (url) => {
  const isityt = (url) => {
  if (!url) //return null; 
  return ""

  try {
    const parsedUrl = new URL(url);

    const hostname = parsedUrl.hostname.replace("www.", "");

    // Confirm it is a YouTube URL
    const isYouTube =
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com" ||
      hostname === "youtu.be";

    if (!isYouTube) //return null;
    return ""

    let videoId = null;

    // https://youtu.be/VIDEO_ID
    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/")[1];
    }

    // https://youtube.com/watch?v=VIDEO_ID
    else if (parsedUrl.pathname === "/watch") {
      videoId = parsedUrl.searchParams.get("v");
    }

    // https://youtube.com/shorts/VIDEO_ID
    else if (parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/")[2];
    }

    // https://youtube.com/live/VIDEO_ID
    else if (parsedUrl.pathname.startsWith("/live/")) {
      videoId = parsedUrl.pathname.split("/")[2];
    }

    // https://youtube.com/embed/VIDEO_ID
    else if (parsedUrl.pathname.startsWith("/embed/")) {
      videoId = parsedUrl.pathname.split("/")[2];
    }

    if (!videoId) //return null;
    return ""

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  } catch (error) {
    //return null;
    return ""
  }
};

const checkLink = async (url) => {
    try {
      const response = await fetch(
        "https://urilinks-project-vercel-api-5.vercel.app/check-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        },
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.log("Error checking link:", error);
      return null;
    }
  };

  const onSubmit = async (link) => {
    console.log("AddlinkPage.js, in onSubmit");
    console.log("AddlinkPage.js, link.addescription = " + link.addescription);
    console.log("AddlinkPage.js, link.adUrl = " + link.adUrl);
    //alert(1)
    const user = firebase.auth().currentUser;
    // if (count < 250 || (count < 10000 && (
    //   user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2"
    //)
    // ) {
    //if (count < getPlanMax() && (count < 5000 )) {
    if (count < getPlanMax()) {
      //if (count < 10) {
      //if (true) {
      link.showpublic = 1;
      link.foldername = link.description;
      
      link.yturl = isityt(link.Url);

        const linkStatus = await checkLink(link.Url);
                              setLinkStatuses((prev) => ({
                                ...prev,
                                [link.Url]: linkStatus,
                              }));

      const v = await isYouTubeThumbnailAvailable(link.yturl) //returns true or false
      if(v===true) {

      } else {
        link.yturl = ""
      }
      console.log("A link.yturl=" + link.yturl);
      let isin = false;
      //don't add the link if the link text is already in the props.links array of jso objects
      props.links.forEach((l) => {
        //alert("l.description="+"'"+l.description+"'"+", link.description="+"'"+link.description+"'")
        let x = !!l.description;
        let x1 = "";
        if (!!x) x1 = l.description.toLowerCase();

        let y = !!link.description;
        let x2 = "";
        if (!!y) x2 = link.description.toLowerCase();

        if (!!x && !!y && x1 === x2) {
          //alert("found a match")
          isin = true;
        }

        //  if(l.description === link.description) {
        //    //alert("found a match,"+l.description+","+link.description)
        //    isin = true
        //     break
        // } else {
        //    //alert("did not find a match,"+l.description+","+link.description)
        //    isin = false
        // }
      });

      // if(inin === false) {
      //    alert("did not find a match")
      // }

      if (isin === false) {
        //alert("isin="+isin)
        //const r = props.startAddLink(props.following,link);
        const r = props.startAddLink(props.follower, link);
        //const r = props.startAddLink(props.newfollowinglinks,link);
        if (r === false) {
          setErrorDialog(true);
          console.log("VVVVVVVVVVVVV returned false");
        } else {
          const now = new Date();
          const datet = Math.trunc(now.getTime());
          props.startAddTheupdatedate({
            updatedate: datet,
          });
          //props.history.push("/");
          //window.location.reload();
          //window.location.href = baseUrl+"?signup=signup&z=1"; //stops the scroll on return when z=1
          window.location.href = baseUrl + "?signup=signup&z=1&z2=2";
        }
      } else {
        //alert("isin="+isin)
        alert(
          "The link was not added because it is already in the list. Change the link text to a unique description.",
        );
      }
    } else {
      console.log("maximum links reached");
      setMaximumPage(true);
    }
  };

  return (
    <div>
      {errorDialog ? (
        <div>
          Notice: firebase realtime database has thrown an exception (memmory
          exceeded)
        </div>
      ) : maximumPage === false ? (
        <div className="position-absolute- z-index99 opaque100">
          <div className="page-header-2">
            <div className="content-container">
              <h2 className="page-header__title">
                <span className="color-purple color-black-2">Add Link</span>
              </h2>
            </div>
          </div>
          <div className="content-container-addlink">
            <LinkForm
              onSubmit={onSubmit}
              handleClose2={props.handleClose2}
              isForm2Open={props.isForm2Open}
              makereadonly={false}
            />
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {/* <PremiumPlan /> */}
          <Simple />
          {/* <TeirsPayment3 /> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  theplan: state.theplan,
  signup: state.signup,
  links: state.links,
  newfollowinglinks: state.newfollowinglinks,
  following: state.following,
  follower: state.follower,
  users: state.users,
  //following: state.following, //following users of props.auth.uid (loggedin user)
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (v, link) => dispatch(startAddLink(v, link)),
  startAddTheupdatedate: (data) => dispatch(startAddTheupdatedate(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddLinkPage),
);
