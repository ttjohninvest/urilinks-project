import Constants from "./Constants";
import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import BasicIframe from "./BasicIframe";
import CopySalesButton from "./CopySalesButton";
import StorageSizes from "./StorageSizes";
import selectLinks from "../selectors/links";
import { startAddLink2 } from "../actions/links";
import { useDispatch } from "react-redux";

import visited from "../assets/images/visited-1.png";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  TikTokEmbed,
  XEmbed,
  YouTubeEmbed,
  PlaceholderEmbed,
} from "react-social-media-embed";

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
  incrementHandleToggle,
  decrementHandleToggle,
  incrementHandleToggle3,
  decrementHandleToggle3,
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

// const baseUrl =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000"
//     : "https://urilinks.com";

let baseUrl = "";

if (Constants.NODE_DEV === "development") {
  baseUrl = "http://localhost:3000";
} else {
  baseUrl = "https://urilinks.com";
}

const LinkListItem = (props) => {
  console.log("LinkListItem RECEIVED", props.id, "frequency=", props.frequency);
  //  const params = new URLSearchParams(window.location.search);
  if (props.thetotalstars) {
    console.log(
      "props.thetotalstars.totalstars=" + props.thetotalstars.totalstars,
    );
    console.log(
      "typeof props.thetotalstars.totalstars=" +
        typeof props.thetotalstars.totalstars,
    );
  } else console.log("props.thetotalstars.totalstars is undefined");

  // const rt = params.get("x");
  //alert("rt="+rt)

  console.log(
    "render LinkListItem id=" + props.id,
    "showpublic=" + props.showpublic,
  );

  console.log(
    "top of LinkListItem.js, props.link.showpublic = " + props.link.showpublic,
  );
  console.log("top of LinkListItem.js, props.id = " + props.id);
  console.log("top of LinkListItem.js, props.frequency = " + props.frequency);
  console.log(
    "top of LinkListItem.js, props.link.frequency = " + props.link.frequency,
  );
  const nd = new Date();
  console.log("new date and time, hours = " + nd.getHours());
  console.log("new date and time, minutes = " + nd.getMinutes());
  console.log("new date and time, seconds = " + nd.getSeconds());

  console.log(
    "1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL=" + props.faviconURL,
  );
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const divRef = useRef(null);
  const theheightRef = useRef(null);
  const distanceScrolledRef = useRef(null);

  const [s, setS] = useState(1);
  const [s2, setS2] = useState(1);
  const [data, setData] = useState([]);
  const [data2s, setData2s] = useState([]);
  const [sortit1flag, setSortit1flag] = useState([]);
  const [visityt, setVisityt] = useState("");
  const [inplace, setInplace] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [url2, setUrl2] = useState("");
  const [blb, setBlb] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showvideo, setShowvideo] = useState(0);
  const [screenedValue, setScreenedValue] = useState(null);

  const [showStatus, setShowStatus] = useState(false);
  const [linkStatus, setLinkStatus] = useState("");
  const [showLink, setShowLink] = useState(true);
  //const [isprivate, setIsPrivate] = useState(props.showpublic?props.showpublic:0)
  const [isprivate, setIsPrivate] = useState(props.showpublic);
  const [likes, setLikes] = useState(props.likes);
  const [star, setStar] = useState(props.star);
  //const [frequency, setFrequency] = useState(props.frequency)

  //frequency is for the views count
  const [frequency, setFrequency] = useState(
    typeof props.frequency === "number" ? props.frequency : 0,
  );

  useEffect(() => {
    setFrequency(props.frequency);
  }, [props.frequency]);

  const savedScrollYw = useRef(0);
  const savedScrollYiw = useRef(0);
  const savedElementTop = useRef(0);
  const savedTop = useRef(0);

  let linkIdRef = useRef(undefined);

  // const checkLink = async (url) => {
  //   //const checkLink = (url) => {
  //   try {
  //     // const response = await fetch(
  //     //   "https://urilinks-project-vercel-api-5.vercel.app/check-link",
  //     const response = fetch(
  //       "https://urilinks-project-vercel-api-5.vercel.app/check-link",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ url }),
  //       },
  //     );

  //     //const data = await response.json();
  //     const data = response.json();

  //     return data.message;
  //   } catch (error) {
  //     console.log("Error checking link:", error);
  //     return null;
  //   }
  // };

  // const status = await checkLink(props.Url);
  //const status = checkLink(props.Url);

  const params = new URLSearchParams(window.location.search);
  const id2 = params.get("id2");

  const theSortBy =
    props.theSortBy === "adsaplpha" || props.theSortBy === "productsalpha"
      ? 1
      : 0;

  //const [xadmessage, setXadmessage] = useState("Please buy "+props.addescription+" from "+firebase.auth().currentUser.displayName+ "to help this seller make money from commission:")
  const THRESHOLD = 43200000; // ms

  const dispatch = useDispatch();

  console.log("RENDER props.show=", props.show, "props.id=", props.id);

  let xdotcomadmessage = "";
  if (!!firebase.auth().currentUser) {
    xdotcomadmessage =
      "Please buy " +
      props.addescription +
      " from " +
      firebase.auth().currentUser.displayName +
      " to help this seller make money from commission:";
  } else {
    xdotcomadmessage =
      "Please buy " +
      props.addescription +
      " from John " +
      "to help this seller make money from commission:";
  }

  useEffect(() => {
    dispatch({ type: "INCREMENT_UPDATE_LINKS_SHOW", id: props.id });
  }, []);

  //   useEffect(()=>{
  //     //broken link: "http://tyuhn.com/"
  //     const a = async () => {
  //  try {
  //       //const response = await fetch(props.Url, { method: 'HEAD', mode: 'no-cors' });
  //       const response = await fetch("http://tyuhn.com/", { method: 'HEAD', mode: 'no-cors' });

  //       // For same-origin links, response.ok is accurate.
  //       // For cross-origin 'no-cors', response.type is 'opaque' and status is 0,
  //       // so we can't reliably detect 404s without CORS headers enabled on the target.
  //       if (!response.ok || response.type === 'opaque') {
  //         // link.style.border = '2px solid red';
  //         // brokenLinks.push({ url: href, status: response.status });
  //         setBlb(true)
  //       }
  //       else {
  //         setBlb(false)
  //       }
  //     } catch (error) {
  //       // link.style.border = '2px solid red';
  //       // brokenLinks.push({ url: href, error: error.message });
  //     }
  //     }
  //     a()
  //   },[])

  /*
FacebookEmbed,
InstagramEmbed,
LinkedInEmbed,
PinterestEmbed,
TikTokEmbed,
XEmbed,
YouTubeEmbed,
PlaceholderEmbed
  */

  function isFacebookPost(url) {
    //return false
    // Check if string is valid and contains facebook.com
    // if (!url || !url.includes('facebook.com')) {
    //   return false;
    // }
    // return true

    if (url.includes("facebook.com/photo/?fbid=122098550787463882"))
      return true;
    return false;

    //try {
    //   const parsedUrl = new URL(url);
    //   // Check if host is facebook.com or www.facebook.com
    //   if (!['facebook.com', 'www.facebook.com'].includes(parsedUrl.hostname)) {
    //     return false;
    //   }

    //   // Check for common post path patterns
    //   // Matches: /posts/123, /permalink/123, /photo/?fbid=123, /videos/123
    //   const postPathPattern = /(\/posts\/|\/permalink\/|\/photo\?|\/videos\/|\/video\?)/i;
    //   return postPathPattern.test(parsedUrl.pathname);
    // } catch (e) {
    //   return false;
    // }
  }

  const getPostType = (url) => {
    if (isFacebookPost(url) === true) return 0;

    return 8;
  };

  //   let postTypeRef = useRef(null)

  //     if(getPostType(props.Url) === 0) {
  //     postTypeRef = 0
  //     } else if(getPostType(props.Url) === 1) {
  // postTypeRef = 1
  //     } else if(getPostType(props.Url) === 2) {
  // postTypeRef = 2
  //     } else if(getPostType(props.Url) === 3) {
  // postTypeRef = 3
  //     } else if(getPostType(props.Url) === 4) {
  // postTypeRef = 4
  //     } else if(getPostType(props.Url) === 5) {
  // postTypeRef = 5
  //     } else if(getPostType(props.Url) === 6) {
  // postTypeRef = 6
  //     } else if(getPostType(props.Url) === 7) {
  // postTypeRef = 7
  //     } else {
  // postTypeRef = 8
  //     }

  //    useEffect(() => {

  //     if(getPostType(props.Url) === 0) {
  //     setScreenedValue(0);
  //     } else if(getPostType(props.Url) === 1) {
  // setScreenedValue(1);
  //     } else if(getPostType(props.Url) === 2) {
  // setScreenedValue(2);
  //     } else if(getPostType(props.Url) === 3) {
  // setScreenedValue(3);
  //     } else if(getPostType(props.Url) === 4) {
  // setScreenedValue(4);
  //     } else if(getPostType(props.Url) === 5) {
  // setScreenedValue(5);
  //     } else if(getPostType(props.Url) === 6) {
  // setScreenedValue(6);
  //     } else if(getPostType(props.Url) === 7) {
  // setScreenedValue(7);
  //     } else {
  // setScreenedValue(8);
  //     }

  //   },[screenedValue])

  // FacebookEmbed,
  // InstagramEmbed,
  // LinkedInEmbed,
  // PinterestEmbed,
  // TikTokEmbed,
  // XEmbed,
  // YouTubeEmbed,
  // PlaceholderEmbed

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

  /*
 https://www.youtube.com/results?search_query=yakutia+family
 https://www.youtube.com/channel/UCqwGqUtDICaOLKubjpUORRw
https://www.youtube.com/@YouTubeCreators
https://www.youtube.com/c/YouTubeCreators
https://www.youtube.com/user/YouTube
https://www.youtube.com/@YouTubeCreators/videos
https://www.youtube.com/@YouTubeCreators/shorts
https://www.youtube.com/@YouTubeCreators/live
https://www.youtube.com/@YouTubeCreators/playlists
https://www.youtube.com/clip/CLIP_ID
https://www.youtube.com/feed/subscriptions
https://www.youtube.com/feed/history
  */

  // const isityt2 = (url) => {
  //   let isit = false;
  //   if (!!url === true && (url.includes("youtube") || url.includes("youtu.be"))
  //     && url.includes("search_query") !== true
  //     && url.includes("channel") !== true &&
  //     url.includes("@YouTubeCreators") !== true &&
  //     url.includes("c/YouTubeCreators") !== true &&
  //     url.includes("user/YouTube") !== true &&
  //     url.includes("clip") !== true &&
  //     url.includes("feed") !== true &&
  //     url.includes("playlist?list") !== true &&
  //     url.includes("live?v=") !== true
  //   ) {
  //     isit = true;
  //   }
  //   return isit;
  // };

  const isityt2 = (url) => {
    if (!url) return false;

    return (
      url.includes("youtube.com/watch?v=") ||
      url.includes("youtu.be/") ||
      url.includes("youtube.com/shorts/") ||
      url.includes("youtube.com/live/") ||
      url.includes("youtube.com/embed/")
    );
  };

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
    let result = confirm("Are you sure you want to remove the link?");
    if (result) {
      //props.removeLink({ id: event.target.value });
      props.startRemoveLink({ id: event.target.value });
      const thetype = typeof props.sessionRemoveLink;
      console.log("aaa thetype=" + thetype);
      if (thetype === "function") {
        props.sessionRemoveLink(props.id);
      }

      setShowLink(false);
      //alert("Link removed.");
      //  const x = confirm("Do you want to refresh the menu?");
      // if (x === true) {

      //window.location.href = "https://urilinks.com?signup=signup&z=1&z2=2";
      // }
    } else {
      // User clicked Cancel
      document.getElementById("delete%" + event.target.value).checked = false;

      alert("Deletion canceled.");
    }
  };

  const handleCheckboxPrivate = (x, event) => {
    const id = event.target.value;

    console.log("link id=" + id);
    console.log("showpublic=" + x);
    console.log("typeof showpublic=" + typeof x);

    if (x === 0) {
      props.startPrivateLink2({ id: id }).then(() => {
        updateCachedShowPublic(id, x + 1);

        setIsPrivate(1);

        if (props.clearVisibilityCache) {
          props.clearVisibilityCache();
        }
        if (props.removeLinkFromDisplayedList) {
          props.removeLinkFromDisplayedList(id);
        }
      });
    } else {
      props.startPrivateLink({ id: id }).then(() => {
        updateCachedShowPublic(id, x - 1);

        setIsPrivate(0);

        if (props.clearVisibilityCache) {
          props.clearVisibilityCache();
        }

        if (props.removeLinkFromDisplayedList) {
          props.removeLinkFromDisplayedList(id);
        }
      });
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

  //   const updateCachedFrequency = (linkId, newFrequency) => {
  //     console.log("a a linkId="+linkId)
  //     console.log("a a newFrequency="+newFrequency)
  //   Object.keys(sessionStorage).forEach((key) => {
  //     try {
  //       const cachedPage = JSON.parse(sessionStorage.getItem(key));

  //       console.log("key =", key);
  // console.log("cachedPage =", cachedPage);
  // console.log("Array.isArray(cachedPage) =", Array.isArray(cachedPage));
  // console.log("cachedPage.length =", cachedPage.length);

  // console.log(
  //   "RAW CACHE VALUE =",
  //   sessionStorage.getItem(key)
  // );

  // console.log(
  //   "PARSED CACHE VALUE =",
  //   JSON.stringify(cachedPage)
  // );

  //       if (!Array.isArray(cachedPage)) return;

  //       const updatedPage = cachedPage.map((link) => {
  //          console.log("link =", link);
  //   console.log("link.id =", link.id);
  //   console.log("linkId =", linkId);
  //   console.log("typeof link.id =", typeof link.id);
  //   console.log("typeof linkId =", typeof linkId);
  //         if (link.id === linkId) {
  //           console.log("newFrequency="+newFrequency)
  //           return {
  //             ...link,
  //             frequency: newFrequency,
  //           };
  //         }

  //         return link;
  //       });

  //       console.log("JSON.stringify(updatedPage)="+JSON.stringify(updatedPage))
  //       sessionStorage.setItem(
  //         key,
  //         JSON.stringify(updatedPage)
  //       );
  //     } catch (error) {
  //       console.log("updateCachedFrequency error =", error);
  //     }
  //   });
  // };

  // const updateCachedFrequency = (linkId, newFrequency) => {

  // console.log("updateCachedFrequency(), see the following:")
  // Object.keys(sessionStorage).forEach((key) => {
  //   console.log(
  //     key,
  //     "=",
  //     sessionStorage.getItem(key)
  //   );
  // });

  //   Object.keys(sessionStorage).forEach((key) => {

  //     // Only look at cached link pages
  //     if (!key.includes("|page|")) return;

  //     try {
  //       const cachedPage = JSON.parse(
  //         sessionStorage.getItem(key)
  //       );

  //       console.log("key =", key);
  //       console.log("cachedPage =", cachedPage);

  //       if (!Array.isArray(cachedPage)) return;

  //       const updatedPage = cachedPage.map((link) => {
  //         console.log("link.id =", link.id);
  //         console.log("linkId =", linkId);

  //         if (link.id === linkId) {
  //           console.log("FOUND LINK");

  //           return {
  //             ...link,
  //             frequency: newFrequency,
  //           };
  //         }

  //         return link;
  //       });

  //       console.log("SAVING CACHE KEY =", cacheKey);
  // console.log("SAVING PAGE =", pageToCache);

  // window.sessionStorage.setItem(
  //   cacheKey,
  //   JSON.stringify(pageToCache)
  // );

  //       sessionStorage.setItem(
  //         key,
  //         JSON.stringify(updatedPage)
  //       );

  //     } catch (error) {
  //       console.log(
  //         "updateCachedFrequency error =",
  //         error
  //       );
  //     }
  //   });
  // };

  const updateCachedShowPublic = (linkId, showpublic) => {
    const updateValue = (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => updateValue(item));
      }

      if (value && typeof value === "object") {
        const updatedObject = { ...value };

        if (value.id === linkId || value.linkid === linkId) {
          console.log("Updating cached star:", linkId, showpublic);

          updatedObject.showpublic = showpublic;
        }

        Object.keys(updatedObject).forEach((property) => {
          updatedObject[property] = updateValue(updatedObject[property]);
        });

        return updatedObject;
      }

      return value;
    };

    Object.keys(sessionStorage).forEach((key) => {
      const rawValue = sessionStorage.getItem(key);

      if (!rawValue) return;

      try {
        const parsedValue = JSON.parse(rawValue);

        const updatedValue = updateValue(parsedValue);

        sessionStorage.setItem(key, JSON.stringify(updatedValue));
      } catch (error) {
        // Ignore sessionStorage values that are not JSON.
      }
    });
  };

  const updateCachedStar = (linkId, star) => {
    const updateValue = (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => updateValue(item));
      }

      if (value && typeof value === "object") {
        const updatedObject = { ...value };

        if (value.id === linkId || value.linkid === linkId) {
          console.log("Updating cached star:", linkId, star);

          updatedObject.star = star;
        }

        Object.keys(updatedObject).forEach((property) => {
          updatedObject[property] = updateValue(updatedObject[property]);
        });

        return updatedObject;
      }

      return value;
    };

    Object.keys(sessionStorage).forEach((key) => {
      const rawValue = sessionStorage.getItem(key);

      if (!rawValue) return;

      try {
        const parsedValue = JSON.parse(rawValue);

        const updatedValue = updateValue(parsedValue);

        sessionStorage.setItem(key, JSON.stringify(updatedValue));
      } catch (error) {
        // Ignore sessionStorage values that are not JSON.
      }
    });
  };

  const updateCachedLikes = (linkId, likes) => {
    const updateValue = (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => updateValue(item));
      }

      if (value && typeof value === "object") {
        const updatedObject = { ...value };

        if (value.id === linkId || value.linkid === linkId) {
          console.log("Updating cached likes:", linkId, likes);

          updatedObject.likes = likes;
        }

        Object.keys(updatedObject).forEach((property) => {
          updatedObject[property] = updateValue(updatedObject[property]);
        });

        return updatedObject;
      }

      return value;
    };

    Object.keys(sessionStorage).forEach((key) => {
      const rawValue = sessionStorage.getItem(key);

      if (!rawValue) return;

      try {
        const parsedValue = JSON.parse(rawValue);

        const updatedValue = updateValue(parsedValue);

        sessionStorage.setItem(key, JSON.stringify(updatedValue));
      } catch (error) {
        // Ignore sessionStorage values that are not JSON.
      }
    });
  };

  const updateCachedFrequency = (linkId, newFrequency) => {
    const updateValue = (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => updateValue(item));
      }

      if (value && typeof value === "object") {
        const updatedObject = { ...value };

        if (value.id === linkId || value.linkid === linkId) {
          console.log("Updating cached frequency:", linkId, newFrequency);

          updatedObject.frequency = newFrequency;
        }

        Object.keys(updatedObject).forEach((property) => {
          updatedObject[property] = updateValue(updatedObject[property]);
        });

        return updatedObject;
      }

      return value;
    };

    Object.keys(sessionStorage).forEach((key) => {
      const rawValue = sessionStorage.getItem(key);

      if (!rawValue) return;

      try {
        const parsedValue = JSON.parse(rawValue);

        const updatedValue = updateValue(parsedValue);

        sessionStorage.setItem(key, JSON.stringify(updatedValue));
      } catch (error) {
        // Ignore sessionStorage values that are not JSON.
      }
    });
  };

  const storeScrollPosition = (frequency, event) => {
    console.log("storeScrollPosition, frequency=" + frequency);
    //alert("frequency="+frequency)

    const x = event.target.getAttribute("data-value"); //x is link id
    //alert("id="+x+", frequency="+x1)
    //alert("storeScrollPosition, event.target.value="+x)
    console.log("storeScrollPosition, link id=" + x);

    props.incrementLinkClickCount({ id: x, frequency: frequency });
    frequency = frequency + 1;
    updateCachedFrequency(x, frequency);
    setFrequency(frequency);
    window.localStorage.setItem("scrollPosition", window.scrollY);
  };

  const storeScrollPosition0 = (id, frequency) => {
    console.log("storeScrollPosition0, frequency=" + frequency);

    props.incrementLinkClickCount({ id: id, frequency: frequency });
    frequency = frequency + 1;
    updateCachedFrequency(id, frequency);
    setFrequency(frequency);
    window.localStorage.setItem("scrollPosition", window.scrollY);
  };

  const storeScrollPosition2 = (likes, event) => {
    const text = "Please confirm it ok to change your likes selection?";
    if (
      props.filters.sortBy === "likes" &&
      likes === 1 &&
      confirm(text) === false
    ) {
      return;
    } else {
      const x = event.target.getAttribute("data-value"); //x is link id

      if (likes === 0) {
        props.incrementLinkLikesClickCount({ id: x, likes: 0 });

        updateCachedLikes(x, likes + 1);
        setLikes(1);
      } else {
        props.decrementLinkLikesClickCount({ id: x, likes: 1 });

        updateCachedLikes(x, likes - 1);
        setLikes(0);
      }

      window.localStorage.setItem("scrollPosition", window.scrollY);
    }
  };

  const storeScrollPosition3 = (star, event) => {
    const text =
      "Please confirm it ok to remove this link from your top ten list?";
    if (
      props.filters.sortBy === "star" &&
      star === 1 &&
      confirm(text) === false
    ) {
      return;
    } else {
      const x = event.target.getAttribute("data-value"); //x is link id

      if (star === 0) {
        if (props.thetotalstars.totalstars < StorageSizes.starsmaximum) {
          props.incrementLinkStarClickCount({ id: x, star: 0 });
          props.incrementTotalStarClickCount({
            totalstars: props.thetotalstars.totalstars,
          });
          updateCachedStar(x, star + 1);
          setStar(1);
        } else {
          alert(
            "You have " +
              StorageSizes.starsmaximum +
              " selected for your top " +
              StorageSizes.starsmaximum +
              ".",
          );
        }
      } else {
        if (props.thetotalstars.totalstars > 0) {
          props.decrementLinkStarClickCount({ id: x, star: 1 });
          props.decrementTotalStarClickCount({
            totalstars: props.thetotalstars.totalstars,
          });
          updateCachedStar(x, star - 1);
          setStar(0);
        } else {
        } //alert("You have zero of ten stars selected for your top ten.");
      }

      window.localStorage.setItem("scrollPosition", window.scrollY);
    }
  };

  const storeScrollPosition4 = (link, event) => {
    const text = "Please confirm that it's ok to save this link to your list?";
    if (confirm(text) === true) {
      //alert("props.thetotalstars="+JSON.stringify(props.thetotalstars))
      //alert("uid="+id2+", link="+JSON.stringify(link))
      console.log(
        "LinkListItem, storeScrollPosition4, link=" + JSON.stringify(link),
      );
      startAddLink2(id2, link)
        .then((r) => {
          alert(r);
        })
        .catch((e) => {
          alert("something went wrong, e=" + e);
        });
      //const x = event.target.getAttribute("data-value"); //x is link id
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

  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    try {
      const u = new URL(url);

      // https://youtu.be/VIDEO_ID
      if (u.hostname === "youtu.be" || u.hostname === "www.youtu.be") {
        return u.pathname.split("/")[1] || null;
      }

      // https://youtube.com/watch?v=VIDEO_ID
      if (u.pathname === "/watch") {
        return u.searchParams.get("v");
      }

      // https://youtube.com/shorts/VIDEO_ID
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || null;
      }

      // https://youtube.com/live/VIDEO_ID
      if (u.pathname.startsWith("/live/")) {
        return u.pathname.split("/")[2] || null;
      }

      // https://youtube.com/embed/VIDEO_ID
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/")[2] || null;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      let videoId = null;

      // https://youtu.be/VIDEO_ID
      if (parsedUrl.hostname.includes("youtu.be")) {
        videoId = parsedUrl.pathname.split("/")[1];
      }

      // https://www.youtube.com/watch?v=VIDEO_ID
      else if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      }

      // https://www.youtube.com/shorts/VIDEO_ID
      else if (parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/")[2];
      }

      // https://www.youtube.com/live/VIDEO_ID
      else if (parsedUrl.pathname.startsWith("/live/")) {
        videoId = parsedUrl.pathname.split("/")[2];
      }

      // https://www.youtube.com/embed/VIDEO_ID
      else if (parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/")[2];
      }

      if (!videoId) return null;

      // Remove anything unexpected after the ID
      videoId = videoId.split("?")[0].split("&")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      return null;
    }
  };

  const checkYoutubeEmbeddable = async (url) => {
    const videoId = getYouTubeVideoId(url);
    // alert("videoId="+videoId)
    console.log("checkYoutubeEmbeddable, videoId=" + videoId);
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${"AIzaSyAuDdWM36glULoMAj3EY-65xE2nPKb_p-Y"}`,
    );

    const data = await response.json();

    //alert(JSON.stringify(data))
    console.log("Play video in place, data=" + JSON.stringify(data));

    if (!data.items || data.items.length === 0) {
      return {
        found: false,
        embeddable: false,
      };
    }

    return {
      found: true,
      embeddable: data.items[0].status.embeddable,
    };
  };

  /*
data-value={props.id}
            
            onClick={(event) => storeScrollPosition(frequency, event)}
            storeScrollPosition0(id)
  */

  const playInPlaceVideo = (id, Url, frequency, event) => {
    let newStr = Url;

    if (Url.includes("shorts")) {
      newStr = Url.replace("shorts", "embed");
    } else if (Url.includes("watch?v=")) {
      newStr = Url.replace("watch?v=", "embed/");
    }

    const text = event.currentTarget.innerText.trim();

    const videoElement = document.querySelector("#ipvideo" + id);

    if (text === "Play video in place") {
      console.log("Play video in place");
      storeScrollPosition0(id, frequency);
      window.document.getElementById("ipvideo" + id).style.marginTop = "35px";
      // const el = document.getElementById("belowbuttonsid2");

      // console.log(
      //   "before display change to block =",
      //   window.getComputedStyle(el).display,
      // );
      // //window.document.getElementById("belowbuttonsid").style.display = "block";

      // console.log("el =", el);

      // console.log("before display =", window.getComputedStyle(el).display);
      // console.log("before height =", el.getBoundingClientRect().height);
      // console.log("before width =", el.getBoundingClientRect().width);

      // el.style.display = "block";
      // el.style.backgroundColor = "red";
      // el.style.border = "3px solid blue";
      // console.log("after display =", window.getComputedStyle(el).display);
      // console.log("after height =", el.getBoundingClientRect().height);
      // console.log("afterv width =", el.getBoundingClientRect().width);
      // console.log(
      //   "after display change to block=",
      //   window.getComputedStyle(el).display,
      // );
      console.log("Play video in place, display set to block");
      const iframe = document.querySelector("#ipvideo" + id + " iframe");

      if (iframe) {
        iframe.src = newStr;
      }

      savedScrollYw.current = window.scrollY;

      if (props.scrollContainerRef.current) {
        savedScrollYiw.current = props.scrollContainerRef.current.scrollTop;
      }

      console.log("WINDOW =", savedScrollYw.current);
      console.log("INNER =", savedScrollYiw.current);

      videoElement.style.display = "block";

      event.currentTarget.innerText = "Close video";

      videoElement.scrollIntoView({
        behavior: "auto",
      });

      setTimeout(() => {
        const ls2 = document.getElementById("ls2");

        ls2.scrollBy({
          top: -30,
          behavior: "auto",
        });
      }, 500);
    } else {
      // console.log("Play video in place, about to set display to none");
      // window.document.getElementById("belowbuttonsid2").style.display = "none";
      // console.log("Play video in place, display set to none");
      console.log("RESTORED savedScrollYw.current =", savedScrollYw.current);
      console.log("RESTORED savedScrollYiw.current=", savedScrollYiw.current);

      const iframe = document.querySelector("#ipvideo" + id + " iframe");

      // Stops video and audio
      if (iframe) {
        iframe.src = "";
      }

      videoElement.style.display = "none";
      event.currentTarget.innerText = "Play video in place";

      setTimeout(() => {
        props.scrollContainerRef.current.scrollTo({
          top: savedScrollYiw.current,
          behavior: "auto",
        });

        window.scrollTo({
          top: savedScrollYw.current,
          behavior: "auto",
        });
      }, 50);
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

      return data.message.result;
    } catch (error) {
      console.log("Error checking link:", error);
      return null;
    }
  };

  const handleMouseEnter = async (Url) => {
    setShowStatus(true);
    //setLinkStatus("Checking...");

    //const result = await checkLink(props.Url, props.id);
    // const result = await checkLink(Url);
    // console.log("result="+JSON.stringify(result))
    // setLinkStatus(result);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    const result = await checkLink(Url);
    //console.log(result);
    setLinkStatus(result);
  };

  const handleMouseLeave = () => {
    setShowStatus(false);
    setLinkStatus("");
  };

  // const checkLink = async (url, id) => {
  //   console.log("checking:", url);
  //   console.log("link id:", id);

  //   // your fetch call here

  // };

  //console.log("status="+JSON.stringify(status))

  if (!showLink) {
    return null;
  }
  console.log("LinkListItem.js, props.adUrl=" + props.adUrl);
  return (
    <div key={props.index}>
      <div id="divtop" />

      {/* <div>
       
        {props.faviconURL === "https://instagram.com/favicon.ico" ? (
          <img
            className=""
            width="16"
            height="16"
            src="https://www.google.com/s2/favicons?domain=instagram.com"
          />
        ) : (
          <img className="" width="16" height="16" src={props.faviconURL} />
        )}
      </div> */}

      {screenedValue !== null ? (
        <div>
          <FacebookEmbed url={props.Url} width="200" height="200" />
        </div>
      ) : (
        <div>
          <div
            style={{
              // width:"100px",
              // height:"50px",
              // left:"100",
              // top:"100",
              position: "relative",
              display: "inline-block",
            }}
          >
            {!!props.yturl && (
              <div>
                <div>
                  {props.faviconURL === "https://instagram.com/favicon.ico" ? (
                    <img
                      className=""
                      width="16"
                      height="16"
                      src="https://www.google.com/s2/favicons?domain=instagram.com"
                    />
                  ) : (
                    <img
                      className=""
                      width="16"
                      height="16"
                      src={props.faviconURL}
                    />
                  )}
                </div>
                <a
                  ref={myRef4}
                  className="ib"
                  href={props.Url}
                  //href={()=>{getYouTubeEmbedUrl(props.yturl)}}
                  target="_blank"
                  data-value={props.id}
                  //title={"click to open the webpage: " + props.Url}
                  onClick={(event) => storeScrollPosition(frequency, event)}
                >
                  <img
                    ref={divRef}
                    className="borderRadius10"
                    //style={{ width: "325px" }} //thumbnail
                    style={{ width: "275px" }}
                    //style={{ width: "200px" }}

                    //title={props.yturl}
                    src={props.yturl}
                    //src={()=>{getYouTubeEmbedUrl(props.yturl)}}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div id={"ipvideo" + props.id} style={{ display: "none" }}>
        <div>
          <div className="height50x- width100"></div>
          <div className="margin-bottom-1z1">
            <BasicIframe src={url2} />
          </div>
        </div>
      </div>

      {screenedValue === null && (
        <div
          className={`normal-wrap ${!!props.yturl ? "padding-bottom-11-" : ""}`}
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <a
            ref={myRef}
            className={`ib text-size-16 font-weight-900 margin-right-1 textWrap ${isMobile() === true ? "width325" : ""}`}
            href={props.Url}
            target="_blank"
            data-value={props.id}
            //title={"click to open the webpage: " + props.Url}
            onClick={(event) => storeScrollPosition(frequency, event)}
            //onMouseEnter={() => checkLink(props.Url, props.id)}
            onMouseEnter={() => handleMouseEnter(props.Url)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {props.description}
          </a>

          {showStatus && linkStatus && (
            <div
              style={{
                position: "absolute",
                // left: "100%",
                left: "-10px",
                top: "20px",
                marginLeft: "10px",
                padding: "6px 10px",
                backgroundColor: "white",
                border: "1px solid #999",
                borderRadius: "5px",
                whiteSpace: "nowrap",
                zIndex: 1000,
              }}
            >
              {linkStatus}
            </div>
          )}
        </div>
      )}

      <div className="flexrowz">
        {props.signup.signup === true ? (
          <div>
            <Link
              className="ib pointereventsauto margin-top-1zx1"
              to={`/edit/${props.id}`}
            >
              <span className="" style={{ cursor: "pointer" }}>
                Edit link
              </span>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              className="ib pointereventsnone margin-top-1zx1"
              to={`/edit/${props.id}`}
            >
              <span className="">Edit link</span>
            </Link>
          </div>
        )}
        {isityt2(props.Url) && (
          <div>
            <span
              // id="playinplaceid"
              className="ib margin-left-11 margin-top-1zx1"
              style={{ cursor: "pointer" }}
              title={props.Url}
              onClick={(event) =>
                playInPlaceVideo(props.id, props.Url, frequency, event)
              }
            >
              <span id={`playinplaceid-${props.id}`}>Play video in place</span>
            </span>
          </div>
        )}
        {props.signup.signup === true ? (
          <span className="bg-light-orange- height48- height14x flexrowzv2">
            <span className="ib margin-left-11- margin-right-1- height14x- flexrowzv-">
              <input
                type="checkbox"
                id={"delete%" + props.id}
                name={"delete%" + props.id}
                value={props.id}
                onChange={(event) => handleCheckboxDelete(event)}
                title="click to delete the url"
                className="ib margin-top-1x- margin-left-n-14x- margin-top-14x pointereventsauto"
                style={{ visibility: "hidden" }}
              />
              <label
                title="This will remove this link from your list."
                className="ib cursor-pointer margin-bottom-1x-"
                htmlFor={"delete%" + props.id}
              >
                Remove link
              </label>
            </span>

            <span className="ib margin-right-1">
              <input
                style={{ cursor: "pointer", visibility: "hidden" }}
                checked={Number(props.showpublic) === 1 ? "" : "checked"}
                type="checkbox"
                id={"private%" + props.id}
                name={"private%" + props.id}
                value={props.id}
                onChange={(event) =>
                  //handleCheckboxPrivate(props.showpublic, event)
                  handleCheckboxPrivate(isprivate, event)
                }
                title={
                  //Number(props.showpublic)===1
                  isprivate && isprivate === 1
                    ? "click to make url private"
                    : "click to make url public"
                }
                className="ib margin-top-2x- margin-left-n-14x- margin-top-14x pointereventsauto"
              />
              <label
                title="A private link won't show up in your shared page. It will only be visible to you."
                className="ib cursor-pointer margin-bottom-1x-"
                htmlFor={"private%" + props.id}
              >
                {isprivate === 0 ? "Made link private" : "Make link private"}
                {/* {Number(props.showpublic) === 0 ? "Made link private" : "Make link private"} */}
              </label>
            </span>

            <span className="ib flexrowzv- margin-left-11xy- margin-top-2x- margin-right-1 margin-top-1zx">
              <span
                className="ib cursor-default"
                title="The number of users who have viewed the link."
              >
                Views:
              </span>
              <span
                className="ib margin-left-11tx- font-weight-900- cursor-default"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {frequency === undefined ? 0 : frequency}
              </span>
            </span>

            <span className="ib flexrowzv- margin-right-1">
              <span
                ref={myRef2}
                className={`ib font-weight-900- margin-left-11xy1- cursor-pointer margin-top-2x0- margin-top-1zx`}
                //href="#"

                data-value={props.id}
                title={"It shows the number of times likes was clicked."}
                onClick={(event) => storeScrollPosition2(likes, event)}
              >
                Like:
              </span>
              <span
                className="ib margin-left-11tx- font-weight-900- margin-top-2x-"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {/* {likes === undefined ? 0 : likes} */}
                {likes === undefined ? "No" : likes === 0 ? "No" : "Yes"}
              </span>
            </span>
            {props.rt !== "readonly" ? (
              <span className="ib flexrowzv- margin-top-2x-">
                <span
                  ref={myRef3}
                  className={`ib font-weight-900- margin-left-11xy1- cursor-pointer margin-top-1zx`}
                  //href="#"

                  data-value={props.id}
                  title={"click to select to your top ten"}
                  //onClick={() => storeScrollPosition3(props.star, event)}
                  onClick={(event) => storeScrollPosition3(star, event)}
                >
                  Star (My Top Twenty):
                </span>

                <span
                  className="ib margin-left-11tx- font-weight-900- margin-top-1x-"
                  title={"This is a selection to your top ten."}
                >
                  {star === undefined ? "No" : star === 1 ? "Yes" : "No"}
                </span>
              </span>
            ) : null}
          </span>
        ) : (
          <span className="bg-light-orange- height48- height14x flexrowzv2">
            <span className="ib margin-left-11- margin-right-1- height14x- flexrowzv-">
              {/* <span className="ib">
              Remove link:&nbsp;
            </span> */}
              <input
                type="checkbox"
                id={"delete%" + props.id}
                name={"delete%" + props.id}
                value={props.id}
                onChange={handleCheckboxDelete}
                title="click to delete the url"
                className="ib margin-top-1x- margin-left-n-14x- margin-top-14x pointereventsnone"
                style={{ visibility: "hidden" }}
              />
              <label
                className="ib cursor-pointer- pointereventsnone margin-bottom-1x-"
                htmlFor={"delete%" + props.id}
              >
                Remove link
              </label>
            </span>

            <span className="ib margin-right-1">
              <input
                style={{ cursor: "pointer", visibility: "hidden" }}
                checked={!!props.showpublic ? "" : "checked"}
                type="checkbox"
                id={"private%" + props.id}
                name={"private%" + props.id}
                value={props.id}
                onChange={(event) =>
                  handleCheckboxPrivate(props.showpublic, event)
                }
                title={
                  !!props.showpublic
                    ? "click to make url private"
                    : "click to make url public"
                }
                className="ib margin-top-2x- margin-left-n-14x- margin-top-14x pointereventsnone"
              />
              <label
                title="A private link won't show up in your shared page. It will only be visible to you."
                className="ib cursor-pointer- pointereventsnone margin-bottom-1x-"
                htmlFor={"private%" + props.id}
              >
                {isprivate === 0 ? "Made link private" : "Make link private"}
              </label>
            </span>

            <span className="ib flexrowzv- margin-left-11xy- margin-top-2x- margin-right-1 margin-top-1zx">
              <span
                className="ib cursor-default"
                title="The number of users who have viewed the link."
              >
                Views:
              </span>
              <span
                className="ib margin-left-11tx- font-weight-900- pointereventsnone cursor-default"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {frequency === undefined ? 0 : frequency}
              </span>
            </span>

            <span className="ib flexrowzv- margin-right-1">
              <span
                ref={myRef2}
                className={`ib font-weight-900- margin-left-11xy1- cursor-pointer margin-top-2x0 pointereventsnone- margin-top-1zx`}
                //href="#"

                data-value={props.id}
                title={
                  "Click to like if you like it. The number of users who have liked the link."
                }
                onClick={(event) => storeScrollPosition2(likes, event)}
              >
                Like:
              </span>
              <span
                className="ib margin-left-11tx- font-weight-900- margin-top-2x-"
                title={
                  "This is the number of times someone has clicked this link."
                }
              >
                {/* {props.likes === undefined ? 0 : props.likes} */}
                {likes === undefined ? "No" : likes === 0 ? "No" : "Yes"}
              </span>
            </span>

            {props.rt === "readonly" && (
              <span className="ib flexrowzv- margin-right-1">
                <span
                  ref={myRef2}
                  className={`ib font-weight-900- margin-left-11xy1- cursor-pointer margin-top-2x0 pointereventsnone- margin-top-1zx`}
                  //href="#"

                  //data-value={props.id}
                  title={"Click to save this link to your collection."}
                  onClick={() => storeScrollPosition4(props.link, event)} //is passed in
                >
                  I want this link
                </span>
              </span>
            )}

            {props.rt !== "readonly" ? (
              <span className="ib flexrowzv- margin-top-2x-">
                <span
                  ref={myRef3}
                  className={`ib font-weight-900- margin-left-11xy1- cursor-pointer margin-top-1zx`}
                  //href="#"

                  data-value={props.id}
                  title={"click to select to your top ten"}
                  onClick={(event) => storeScrollPosition3(star, event)}
                >
                  Star (My Top Twenty):
                </span>

                <span
                  className="ib margin-left-11tx- font-weight-900- margin-top-1x-"
                  title={"This is a selection to your top ten."}
                >
                  {star === undefined ? "No" : star === 1 ? "Yes" : "No"}
                  {/* {props.star === undefined ? "No" : "Yes"} */}
                </span>
              </span>
            ) : null}
          </span>
        )}
      </div>

      {props.signup.signup === true && (
        <div className="flexrow2w2 border5-">
          <span>
            <span className="ib margin-right-1">Share link on</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${props.Url}`}
              className="ib nounderline- cursor-pointer"
              title="x.com is formerly twiiter.com. Click to share link on x.com."
              target="_blank"
            >
              X
            </a>
            <span className="margin-left-11">or</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${props.Url}`}
              className="ib margin-left-11 nounderline- cursor-pointer"
              title="Click to share link on facebook.com."
              target="_blank"
            >
              Facebook
            </a>
          </span>
          {/* <a href={`https://messenger.com`} className="ib margin-left-11 nounderline cursor-pointer" target="_blank">Messenger</a>
          <a href={`https://gmail.com`} className="ib margin-left-11 nounderline cursor-pointer" target="_blank">Gmail</a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${props.Url}`} className="ib margin-left-11 nounderline cursor-pointer" target="_blank">Linkedin</a> */}
          {/* <XShareButton url={props.Url} className='border5' />
          <FBShareButton url={props.Url} className='border5' />
          <MessengerButton  className='border5' /> */}
        </div>
      )}

      <div className="flexrow2w2 border5-">
        <span>
          {!!props.addescription === true ? (
            <span>
              <span className="ib bg-color-1w borderRadius11- nounderline color-black">
                See what{" "}
                {props.signup.signup === true
                  ? firebase.auth().currentUser.displayName
                  : "John"}{" "}
                has for sale:&nbsp;
              </span>
              <a
                href={
                  !!props.adUrl === true ? props.adUrl : "https://example.com"
                }
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <span
                  className={`ib underline margin-left-11- padding-left-1- padding-right-11- borderRadius11- ${theSortBy === 1 ? "bg-color-1w" : "bg-color-1w"}`}
                  style={{ color: "#0000EE" }}
                >
                  {props.addescription}
                </span>
              </a>

              <span>
                ,
                <span className="ib margin-left-11 margin-right-1">
                  Please forward sales link to
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(xdotcomadmessage)}&url=${props.adUrl}`}
                  className="ib nounderline- cursor-pointer"
                  title="Click to forward link to x.com."
                  target="_blank"
                >
                  X
                </a>
                <span className="margin-left-11">or</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${props.adUrl}`}
                  className="ib margin-left-11 nounderline- cursor-pointer"
                  title="Click to forward link to facebook.com."
                  target="_blank"
                >
                  Facebook
                </a>
              </span>
            </span>
          ) : props.signup.signup === true ? (
            <div>
              <Link
                className="ib padding-left-1- padding-right-11 bg-color-1w pointereventsauto nounderline margin-top-1zx1"
                to={`/edit/${props.id}`}
              >
                <span className="" style={{ cursor: "pointer" }}>
                  <span className="ib bg-color-1w- borderRadius11 nounderline color-black">
                    See what {firebase.auth().currentUser.displayName} has for
                    sale:&nbsp;
                  </span>
                  <span className="underline" style={{ color: "#0000EE" }}>
                    Nothing Yet
                  </span>
                </span>
              </Link>
            </div>
          ) : (
            <div>
              <span className="ib bg-color-1w- borderRadius11- nounderline color-black-">
                See what{" "}
                {!!firebase.auth().currentUser === true
                  ? firebase.auth().currentUser.displayName + " has "
                  : " John has "}
                for sale:&nbsp;
              </span>
              <span className="">Nothing Yet</span>
            </div>
          )}
        </span>
      </div>

      <div className="italicText text-size-10 color-purple margin-top-aa color-black-2">
        <span className="ib padding-left-n-1z-  margin-top-n-15a margin-bottom-abc">
          Link saved on:{" "}
          {/* {moment(props.createdAt).format("MMMM Do, YYYY, h:mm:ss a")}&nbsp;pst */}
          {new Date(props.createdAt).toLocaleDateString() +
            " at " +
            new Date(props.createdAt).toLocaleTimeString() +
            " " +
            new Date(props.createdAt).toLocaleDateString(undefined, {
              weekday: "long",
            })}
        </span>
      </div>

      <div className="normal-wrap">{props.note}</div>
      <div className="normal-wrap margin-top-1">
        {!!props.addescription === true && (
          //props.idexists === 0 &&
          <fieldset className="padding-right-1 margin-right-1">
            <legend>Sharable Url To Make Money</legend>
            <div className="padding-bottom-1">
              <div className="margin-bottom-1 flexrowxz">
                {`${baseUrl}/dashboard?signup=0&x=readonly&id=`}
                {props.auth.uid}&link={encodeURIComponent(props.description)}
                &product={encodeURIComponent(props.addescription)}
                &theSortBy=productsalpha
              </div>

              <CopySalesButton
                textToCopy={`${baseUrl}/dashboard?signup=0&x=readonly&id=${props.auth.uid}&link=${encodeURIComponent(props.description)}&product=${encodeURIComponent(props.addescription)}&theSortBy=productsalpha`}
              />
            </div>
          </fieldset>
        )}
      </div>

      {/* <div id={"ipvideo" + props.id}>
        {videoId === props.id && props.show === 1 && (
          <div>
            <div className="height50 width100"
            //style={{border:'1px solid red'}}
            ></div>
            <div className="margin-bottom-1z1">
              <BasicIframe src={url2} />
            </div>
          </div>
        )}
      </div> */}

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
  filters: state.filters,
  auth: state.auth,
  //links: selectLinks(state.links, state.filters),
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
  incrementHashtagsIsOpenClickCount: (data) =>
    dispatch(incrementHashtagsIsOpenClickCount(data)),
  decrementHashtagsIsOpenClickCount: (data) =>
    dispatch(decrementHashtagsIsOpenClickCount(data)),
  incrementHandleToggle: (data) => dispatch(incrementHandleToggle(data)),
  decrementHandleToggle: (data) => dispatch(decrementHandleToggle(data)),
  incrementHandleToggle3: (data) => dispatch(incrementHandleToggle3(data)),
  decrementHandleToggle3: (data) => dispatch(decrementHandleToggle3(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LinkListItem),
);
