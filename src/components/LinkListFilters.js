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
    
    console.log("AB props.links.length="+props.links.length)
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

  useEffect(()=>{
   if(gmail !== "")
    window.document.getElementById('sendgmailid').click()
  },[gmail])

  const getGmail = () => {
  //console.log("getGmail")
  //const ugmail = window.document.getElementById('gmailid').value
  //console.log("ugmail="+ugmail)
  //setGmail(ugmail)
  setGmail("jmjohnmcgovern707@gmail.com")
  }

const sep=(hashtag)=> {
 
//const hashtag = "#IReallyLoveGSAP";
//const hashtag = "#IReallyLoveGsap";

let words
if(!!hashtag===true) {
words = hashtag
  .replace(/#/, '') // Remove the leading '#'
  .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters following lowercase
  .split(' '); // Split into an array of words

console.log(words); // Output: ['I', 'Really', 'Love', 'GSAP']

const sentence = words.join(' ');
console.log(sentence);
return sentence
}
return ""
}

  return (
    <div className="bg-white-1">
    
                        {/* <img src={signature} /> */}
      {props.signup === false && <div className="flexrowzc2 text-size-1 font-weigth-bold padding-all text-center">Welcome to Example Page</div>}               
      {props.signup === false && (
                                  <div
                                    className="flexrowzc2 text-size-1 font-weigth-bold padding-all text-center"
                                    title="Please use it for good. Bookmarks for internet pages, urls/links"
                                  >
                                    <Link
                                      className="nounderline cursor-pointer"
                                      to="/signup"
                                      title=""
                                    >
                                      <span className="ib flexrowz">
                                        <img
                                                            className="ib"
                                                            src={redarrow}
                                                            width="100"
                                                            height="50"
                                                            alt="Logo"
                                                          /> <span className="margin-top-n-z4- ib">login/enter</span>
                                                          </span>
                                    </Link>
                                  </div>
                                )}
      
      <div className="flexrowzc2 text-size-11 text-color-green font-weigth-bold padding-all text-center">Happy New Year</div>
      {props.mappedDataShort.length > 0 ? (
        <div className="">
          <div
            className="flexrow2c padding-left-a borderRadius4"
            // title={
            //   props.signup === true
            //     ? "Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags that have been entered in the note section of your link earlier to find your links that are grouped by hash tag."
            //     : "Hastags are in alphabetical order, top to bottom, you may click on any of these hash tags to see links that are grouped by this hash tag."
            // }
             title={
              props.signup === true
                ? ""
                : ""
            }
          >
            <div className="text-size-5 padding-top-11">
              {isMobile() === false ? (
                <div className="flexrow2j margin-left-minus-3">
                  {props.signup === true || signup === "0" ? (
                    <div className="padding-top-1112  textCenter-">
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
                        <div className="textCenter-">
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
                    <div className="padding-top-1112  textCenter-">
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
                        <div className="textCenter-">
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

               

              <div className="flexrow2j margin-left-minus-2 margin-bottom-1">
                {/* <div>a</div> */}
                <div className="text-size-1">
                  <div className="ib text-size-9" title="location for your gmail name">
                    {(!!theuser && props.signup === true) || signup === "0"
                      ? theuser.displayName?theuser.displayName:"error getting display name"
                      : "(gmail name)"}
                  </div>
                  {/* <div className="ib hide">, {!!theuser && theuser.email}</div> */}
                </div>
              </div>
              <div className="text-size-1 textLeft hide">
                Welcome
                {!theuser
                  ? "to this example links page. What makes you smile?"
                  : ", what makes you smile?"}
              </div>
              {/* <div className="text-size-1">WELCOME, WHAT MAKES YOU SMILE?</div> */}

              {/* {isMobile()?"yes":"no"} */}
              {/* {props.signup === false && true && (
                <div className="margin-bottom-1 text-size-1 flexrowz3 flexWrap">
                  <span
                    className=""
                    title="Please ignore this if you know already. Your bio page is the links page that this platform allows you to create through the add link button or bookmarks file uploader menu item in the header. I provide you a link you can share on your instagram profile"
                  >
                    <span className="text-size-9 font-weight-bold">T</span>he
                    link in bio page for{" "}
                    {(!!theuser && props.signup === true) || signup === "0"
                      ? theuser.displayName
                      : "John Example"}
                    , click a hashtag or folder name to see the bio links in
                    that category.
                  </span>
                </div>
              )} */}
              {/* {props.signup === false && true && (
                <div className="margin-bottom-1 text-size-1 flexrowz3 flexWrap">
                  <span className="" title="better">
                    <span className="text-size-9 font-weight-bold">L</span>
                    inktree's link in bio tool is good but mine is better because mine is is easier and faster to use than linktree's and I offer a feature that allows for the importing of bookmarks that get automatically converted into bio links. Much agape gape Love John ❤️
                  </span>
                </div>
              )} */}
              {props.signup === false && true ? (
                <div className="text-size-1 flexrowzc">
                  {/* <div>
                    An alternative to linktree. This is a link-in-bio tool for platforms that accepts a bio link like instagram to get you more engagement. 
                  </div>
                  <div>
                    You may add one link at a time to your bio page or you may upload browser bookmarks that get converted 
                  </div>
                  <div>
                    to bio links for you. Any user that clicks on your shared link will see the changes.
                  </div>
                  <div>
                    To see bio links, click on a hash tag button below or use the menu bar below the hash tags 
                  </div>
                   <div>
                    buttons and click on a folder name in the drop down list or use the search feature.
                  </div>
                  <div>
                    You may find it easy to use. if you are satisfied with how it works for you, can you login?
                  </div>
                    */}

                  {/* <div>
                    I am marketing this site as a study tool for students and professors of colleges and universities.
                    </div>

                    <div>
                    I am marketing this to wise/wiser people. The following needs to be said: You may use it
                    </div>
                    <div>
                     for good or bad but I suggest you use it for good so you can have better results in life. 
                     </div>
                     <div>
                      This site is similar to linktree; however, it is dedicated to serving students and professors
                       
                      </div>
                      <div>
                       This is similar to link-in-bio tool but I call it link-in-research tool with the goal of giving
                        
                       
                        
                       </div>
                       <div>
                         you more user engagement to your consolidated content table, research links, when a user clicks on it. 
                        
                          
                         </div>
                         
                       <div>
                         It simply gives you a place to store from 1 to 1000 links (Free plan: 1-250 free, 
                         
                         
                        
                         
                        </div>
                       <div>
                        Basic plan: store up to 500 links at $4.99/year, Standard plan store up to 750 links at
                          
                        
                         
                         
                        </div>
                        
                    <div>
                     $9.99/year, Premium plan: store up to 1000 links at $14.99/year, all plans 
                     
                     
               
                     
                    </div>
                 <div>
                         automatically billed yearly, delete account at anytime and your subscription is

                    </div>
                    <div>
                    automatically cancelled, as is, no refunds) and I give you a link that you can copy and paste that shares 
                    </div>
                     
                     <div>
                        your content. The display looks pretty good. You may like to use it. I cannot promise that
                          
                        
                        
                  
                    </div>
                    <div>
                        people will use your content though. Can you freely login? Please contact me, John, with 
                         
                       
                        
                    </div>
                    <div>
                        
                        any questions, comments or concerns at john@urilinks.com, 775 507 0098.
                        
                    </div> */}

                  {/* (Free plan: 1-250 free, Basic plan: store up to 500 links at $4.99/year, Standard plan store up to 750 links at $9.99/year, Premium plan: store up to 1000 links at $14.99/year, all plans automatically billed yearly, delete account at anytime and your subscription is automatically cancelled, as is, no refunds) and I give you a link that you can copy and paste that shares your content. */}
{/* gsdg */}

  {isMobile() === true ?<div className="padding-right-11 padding-bottom-118">
                    You must be 13 years old or older to use this site (click legal menu item). 
                    Parental permission is not reqired if you are 18 years of age or older.
                    
                    This website may contribute to making your use of the internet more organized,
                   
                    interesting, professional, enteraining, fun and collaborative. It can store up to 5,000
                    links alphabetically.
                    
                    It gives you a sharable link to your links list of internet urls. You may
                    
                    try your first 250 links for free or choose one of three
                    paid plans: for $4.99/year it stores up to 1,250 links,
                    
                    for $9.99/year it stores up to 2,500 links or
                    for $14.99/year it stores up to 5,000 links.
                    
                    If you can't afford to pay and you need more storage space, please
                    let me know and I will give it to you for free.
                    I am a college graduate from UNR. Please contact me, John,
                    with any blessings, questions, 
                    comments or concerns at john@urilinks.com, 775 507 0098. I invite
                    you to freely login/enter?
                    
                  </div>
                :
                <div>
                    You must be 13 years old or older to use this site (click legal menu item). <br />
                    Parental permission is not reqired if you are 18 years of age or older.<br />

                     This website may contribute to making your use of the internet more organized,
                    <br />
                    interesting, professional, enteraining, fun and collaborative. It can store and organize up to 5,000
                    links alphabetically.
                    <br />
                    It gives you a sharable link to your links list of internet urls. You may
                    <br />
                    try your first 250 links for free or choose one of three
                    paid plans: for $4.99/year it stores up to 1,250 links,
                    <br />
                    for $9.99/year it stores up to 2,500 links or
                    for $14.99/year it stores up to 5,000 links.
                    <br />
                    If you can't afford to pay and you need more storage space, please
                    let me know and I will give it to you for free.<br />
                    I am a college graduate from UNR. Please contact me, John,
                    with any blessings, questions, <br />
                    comments or concerns at john@urilinks.com, 775 507 0098. I invite
                    you to freely login/enter?
                    <br />
                    <br />
                  </div>  
                }


                  {/* <div>
                    This site is for students of colleges and universities. It
                    is the original link-in-research tool
                    <br />
                    similar to link-in-bio tool like linktree; however, it is 
                    structured for learning
                    <br />
                    and research (It can constribute to making your use of the 
                    internet more organized,
                    <br />
                    interesting, professional and fun). It can store and organize 1-5000
                    links alphabetically.
                    <br />
                    It gives you a sharable link to your consolidated internet
                    research content. You may
                    <br />
                    try your first 250 links for free or choose one of three
                    yearly paid plans at $4.99,
                    <br />
                    (stores up to 1,250 links) $9.99 (stores up to 2,500 links) or
                    $14.99 (stores up to 5000 links).
                    <br />
                   
                    If you can't afford to pay and you need more storage space, please
                    let me know and I will give it to you for free.<br />
                    I am a college graduate from UNR. Please contact me, John,
                    with any blessings, questions, <br />
                    comments or concerns at john@urilinks.com, 775 507 0098. Can
                    you freely login/enter?
                    <br />
                    <br />
                  </div> */}

                  {/* <span>What do you want to achieve with this website?</span> */}
                  <span> I hope the website is helpful to you. May you please give me your feedback regarding this website? </span>
                  {/* <input id="gmailid" placeholder="Put your gmail here." type="text" /> */}
                  {isMobile() === true ?<button type="button" className="button-2 margin-right-114" title="Your answser will be sent to me by gmail.com. Thank you in advance." onClick={getGmail}>Please click to send me your answer.</button>
                  : <button type="button" className="button-2" title="Your answser will be sent to me by gmail.com. Thank you in advance." onClick={getGmail}>Please click to send me your answer.</button>}

                  {props.signup === false && (
                                  <div
                                    className="flexrowzc2 text-size-1 font-weigth-bold padding-all text-center"
                                    title="Please use it for good. Bookmarks for internet pages, urls/links"
                                  >
                                    <Link
                                      className="nounderline cursor-pointer"
                                      to="/signup"
                                      title=""
                                    >
                                      <div className="flexrowz">
                                        <div>
 <img
                                                            className="ib"
                                                            src={redarrow}
                                                            width="100"
                                                            height="50"
                                                            alt="Logo"
                                                          />
                                        </div>
                                        
                                                          <div className="margin-top-n-z4- ib">login/enter</div>
                                                          </div>
                                    </Link>
                                  </div>
                                )}

                   <div className="padding-bottom-116">
                   <div className="margin-left-118">
                                                <a
                                                  id="sendgmailid"
                                                  className="nounderline hide"
                                                  href={`https://mail.google.com/mail/?view=cm&from=${gmail}&to=${"johmcg64@gmail.com"}&su=urilinks user sent me an answer.&body=Hi%20there!`}
                                                  target="_blank"
                                                >
                                                  Send gmail{" "}
                                                  {`FROM: ${gmail} TO: ${"john@urilinks.com"}.`}
                                                </a>
                                              </div>
                                             
                                              </div>
                </div>
              ) : (
                // <div className="text-size-1 flexrowzc">
                //   <div>
                //     <span className="text-size-9- font-weight-bold-">T</span>his is a link in bio tool for platforms that accept links like instagram to get more engagement.
                //   </div>
                //   <div>
                //     <span className="text-size-9- font-weight-bold-">Y</span>ou may add one link at a time to your bio page or you may upload browser bookmarks that get converted
                //   </div>
                //   <div>
                //     <span className="text-size-9- font-weight-bold-">T</span>o bio links for you. you may find it easy to use. if you are satisfied with how it works for you,
                //   </div>
                //    <div>
                //     <span className="text-size-9- font-weight-bold-">C</span>an you login?
                //   </div>
                // </div>
                <div className="text-size-1 textLeft margin-top-1">
                  <span className="hide">
                    Thank you. Your sharable link is:
                  </span>
                  <a
                    href="#"
                    ref={textAreaRef}
                    className="ib nounderline pointereventsnone border5 padding-all2 borderradius55"
                    title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                  >
                    https://urilinks.com/dashboard?signup=0&id={props.uid}
                  </a>
                  <button
                    className="button-2 ib margin-right-1 margin-left-11"
                    onClick={copyToClipboard}
                    title="Share anywhere a sharable link is accepted like instagram profile, youtube comment, facebook or email"
                  >
                    Copy sharable link
                  </button>
                  {copySuccess}
                </div>
              )}
              
              {props.signup === true && <div className="margin-top-118">
                <div className="flexrowsb margin-right-1 ib">
                  <span> I hope the website is helpful to you. May you please give me your feedback regarding this website? </span>
                  {/* <span className="ib">What do you want to achieve with this website?</span> */}
                  {/* <input id="gmailid" placeholder="Put your gmail here." type="text" /> */}
                  <button type="button" className="button-2 ib margin-left-11" title="Your answser will be sent to me by gmail.com. Thank you in advance." onClick={getGmail}>Please click to send me your answer.</button>

                </div>
                 
                   <div className="padding-bottom-116-">
                   <div className="margin-left-118">
                                                <a
                                                  id="sendgmailid"
                                                  className="nounderline hide"
                                                  href={`https://mail.google.com/mail/?view=cm&from=${gmail}&to=${"johmcg64@gmail.com"}&su=urilinks user sent me an answer.&body=Hi%20there!`}
                                                  target="_blank"
                                                >
                                                  Send gmail{" "}
                                                  {`FROM: ${gmail} TO: ${"john@urilinks.com"}.`}
                                                </a>
                                              </div>
                                             
                                              </div>
              </div>}
                

              <div className="text-size-1 textLeft hide">
                <span className="text-size-9">😃 </span>Your friendly link to
                links tool
                {isToggled && props.signup === false ? (
                  <span>
                    , click
                    <span>
                      <Link
                        className="cursor-pointer nounderline"
                        to="/signup"
                        title=""
                      >
                        (login/enter)
                      </Link>
                    </span>
                  </span>
                ) : (
                  ""
                )}
                {/* <button
      onClick={handleChange}
      className="margin-left-117 ib button-2 ib text-size-5 bg-color-1 borderradius55" //{`toggle-button ${isToggled ? 'on' : 'off'}`}
      aria-label="Toggle button"
    >
      {isToggled ? 'hide information' : 'show information'}
    </button> */}
                {isToggled && props.signup === false && (
                  <div className="text-size-1 textLeft hide">
                    To go inside (click enter) for an account, you get an empty
                    page to start adding your favorite links. <br />
                    You may add a note to each of your links.
                    <br />
                  </div>
                )}
                {isToggled && props.signup === true && (
                  <div className="text-size-1 textLeft hide">
                    You may start adding your favorite links using the Add Link
                    button below or Bookmarks File Uploader above.
                    <br />
                    The hashtags in purple rectangles and the folder names in
                    the dropdown list in the orange rectangle are added in
                    alphabetical order.
                    <br />
                    The hastags are the folder names read from the browser
                    bookmarks file with spaces removed and lowercased. The
                    folder names are copied in the drop down list.
                    <br />
                    You may add a note to each of your links.
                    <br />
                    You may share your links with linkedin, facebook, or
                    twitter/x
                    <br />
                    You may immediately chat about a bookmark with a family or
                    friend using facebook messenger, click the blue circle. You
                    just check if he she is online using fb messenger
                    <br />
                    and if so, send the bookmark and then chat about it
                  </div>
                )}
              </div>
              <br />
              {props.signup === false &&
                props.uid === "W4XCM1PRqtZeAzCZ0ALlEFrIwaw1" && (
                  <div className="textLeft hide">
                    <iframe
                      width="300"
                      height="200"
                      src="https://www.youtube.com/embed/RA8Lrtei90o?si=GOsCUPsODmw32y6p"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                )}
              {isToggled && props.signup === false && (
                <div className="textLeft hide">
                  Click example hashtag to see links to webpages
                </div>
              )}

              {isToggled && props.signup === true && (
                <div className="textLeft hide">
                  Click hashtag to see links to webpages
                </div>
              )}

              {isToggled && props.signup === false && (
                <div className="textLeft hide">
                  To see to see links to webpages, check out the search folder
                  name dropdown list
                </div>
              )}

              {isToggled && props.signup === true && (
                <div className="textLeft hide">
                  Check out the search folder name dropdown list in the orange
                  rectangle for folder names with links to webpages
                </div>
              )}

              {isToggled && props.signup === false && (
                <div className="textLeft hide">
                  Please give it try to see how it works.
                </div>
              )}
              {/* {props.signup.signup === false && <div>Check out the search folder name dropdown list for example bookmarks in a folder</div>} */}
              {/* <br />
              I believe that Jesus is the Christ. I believe that Jesus Christ is
              the Son of God.
              <br />
              Please go and sin no more, ok. Happy it. */}
              {/* <br />
              <button
                className="button-m button--link color-black"
                onClick={toggleNewspaper}
              >
                {newspaper ? "show other view" : "show other view"}
              </button> */}
            </div>

            <div className="flexrow2e">
              {
                //isToggled &&

                props.signup === true && (
                  <div
                    title="current plan"
                    className="margin-right-1 textLeft hide"
                  >
                    plan: {props.plan.replace(/"/g, "")}
                  </div>
                )
              }

              {isToggled && props.signup === false && <div></div>}
              <div>
                {isToggled && props.signup === true && (
                  <div className="margin-right-1">
                    {props.theplan.plan.replace(/"/g, "") === "free" ? (
                      <span>(It stores upto {StorageSizes.free} links)</span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "basic" ? (
                      <span>(It stores upto {StorageSizes.basic} links)</span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "standard" ? (
                      <span>
                        (It stores upto {StorageSizes.standard} links)
                      </span>
                    ) : (
                      <span></span>
                    )}
                    {props.theplan.plan.replace(/"/g, "") === "premium" ? (
                      <span>(It stores upto {StorageSizes.premium} links)</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                )}

                {
                  //isToggled &&
                  props.signup === false && ""
                }
              </div>
              <div className="margin-left-11-">
                <div className="margin-left-minus-1">
                  <span>
                    {props.links.length} links of {maximum} links is stored on the{" "}
                    {props.theplan.plan.replace(/"/g, "")} plan.
                  </span>
                </div>
                <div className="flexrow3c">
                  <Link className="header__title" to="/teirspayment3">
                    <span
                      className="ib  flexrow3c- color-black text-size-5 general-font margin-left-minus-1"
                      title="click for plan options"
                    >
                      {
                        //isToggled &&

                        props.signup === true &&
                          props.theplan.plan.replace(/"/g, "") !==
                            "premium" && <span>(click to change plan)</span>
                      }

                      {isToggled && props.signup === false && <span></span>}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={props.ref}
            className={`${
              newspaper === false
                ? "grid-container5"
                : "grid-container5-newspaper"
            } paddingparent margin-top-1 background-white-1 borderradius5`}
            title={
              props.signup === true
                ? "The buttons are disabled because the List All Public Links button is activated. These hastag buttons only work with your list of links"
                : "The buttons are disabled because the List All Public Links button is activated or the People button is activated."
            }
          >
            {!expanded
              ? 
              
              //props.b === 1 && 
              props.mappedDataShort.map((s, index) => {
                  if (index < 50)
                    return (
                      <div
                        key={index}
                        className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                      >
                        <a
                          className={`b1x nounderline color-white-1 button-link-4 ${props.b==1 ?"pointereventsauto":"pointereventsnone"}`}
                          href="#"
                          onClick={() => props.setit(s.hashtag, event)}
                          title={`${sep(s.hashtag)}, hashtag: ${!!s.hashtag && s.hashtag}, click to scroll to results`}
                          //title={props.signup === true?${s.hashtag}, click to scroll to results: 
                        >
                          {sep(s.hashtag)}
                          {/* {"#"}
                          <span className={`{${highlight(s.hashtag[1])}}`}>
                            {s.hashtag[1]}
                          </span>
                          {s.hashtag.substring(2)} */}
                        </a>
                      </div>
                    );
                  else return false;
                })
              : 
              //props.b === 1 && 
              props.mappedDataShort.map((s, index) => {
                  //have 3 map calls and display the first column then the second column and then the thrid column
                  return (
                    <div
                      key={index}
                      className="b1x- item-newspaper- padding-all- text-size-5 element5-"
                    >
                      <a
                        className={`b1x nounderline color-white-1 button-link-4 ${props.b==1 ?"pointereventsauto":"pointereventsnone"}`}
                        href="#"
                        onClick={() => props.setit(s.hashtag, event)}
                        title={`${sep(s.hashtag)}, hashtag: ${!!s.hashtag && s.hashtag}, click to scroll to results`}
                      >
                        {sep(s.hashtag)}
                        {/* {"#"}
                        <span className={highlight(s.hashtag[1])}>
                          {s.hashtag[1]}
                        </span>
                        {s.hashtag.substring(2)} */}
                      </a>
                    </div>
                  );
                })}

            {!expanded && <span className="text-size-5">...</span>}
          </div>
          {props.b === 1 && <button
            className="button-m button--link color-black"
            onClick={toggleExpanded}
          >
            {expanded ? "Show Less Hashtags" : "Show More Hashtags"}
          </button>}
        </div>
      ) : (
        <div></div>
      )}
      {/* <div className="border2black">
       column b
        </div> */}
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
      searchTerm: ''
    };

    this.setit = this.setit.bind(this);
     
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

   handleSearch() {
    // Perform the search action here
    //console.log('Searching for:', this.state.searchTerm);
    // Example: this.props.onSearch(this.state.searchTerm);

    var select = document.getElementById('mode');
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("handleSearch search, selectedValue="+selectedValue)
    let term = window.document.getElementById("termid").value
    let str = term.trim()
    term = str
    if (selectedValue === "hashtag") {

    const words = term.split(/\s+/); // Split by one or more whitespace characters
    
      if (term.charAt(0) !== '#') {

        alert("The search term needs to be a hashtag.")
        return
      }
      if (words.length !== 1) {

        alert("The search term needs to be one word.")
        return
      }

    }
    //alert (term)
    this.props.setTextFilter(term);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  scrollUp = () => {
    //window.scrollTo(0, 0);
        !!document.querySelector("#top") && document.querySelector("#top").scrollIntoView({
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
    console.log("onSortChange=(), e.target.value=" + e.target.value);
    if (e.target.value === "date") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortBy", "date");
      this.setState({ sortBy: "date" });
      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sortBy", "description");
      this.setState({ sortBy: "description" });
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("#");
      window.localStorage.setItem("sortBy", "hashtag");
      this.setState({ sortBy: "hashtag" });
      this.props.sortByHashTag();
    } else if (e.target.value === "notetext") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("");
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
    !!document.querySelector("#before-before-link-summary-id") && document.querySelector("#before-before-link-summary-id").scrollIntoView({
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
    console.log("search")
     var select = document.getElementById('mode');
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("search = () => {, selectedValue="+selectedValue)
    let term = window.document.getElementById("termid").value
    let str = term.trim()
    term = str
    if (selectedValue === "hashtag") {
      console.log("then search = () => {, selectedValue="+selectedValue)
    const words = term.split(/\s+/); // Split by one or more whitespace characters
     console.log("then search = () => {, words.length="+words.length)
     console.log("then search = () => {, term.charAt(0) !== '#'="+term.charAt(0) !== '#')
      if (term.charAt(0) !== '#') {

        alert("The search term needs to be a hashtag.")
        return
      }
      if (words.length !== 1) {

        alert("The search term needs to be one word.")
        return
      }

    } else {
      console.log("else search = () => {, selectedValue="+selectedValue)
    }
    //alert (term)
    this.props.setTextFilter(term);
   
  }

 

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
          className="bg-color-2 borderRadius4- flexrow2w padding-top-111 padding-bottom-111"
        >
          <div className="flexrowz">
            
            
            
            <div className="margin-left-11">
<input 
          id="termid" 
          className="text-input outline-none padding-left-11 borderRadius55" 
          type="text" 
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
          onKeyDown={this.handleKeyPress}
          />
            </div>
          
         
           <div className="margin-left-11">
            <button 
            className="button-3 button--link- ib- text-size-3- color-white-1 cursor-pointer font-weight-bold borderRadius55"
            //className="b1x1 nounderline color-white-1 button-link-4 outline-none"
            
            onClick={this.search} 
            //title="Searches to find entered term through the previously selected list which will appear in copper color." 
            title="Searches to find entered term. A partial search term is ok. For example if you are searching for elephant, you may enter elep as the term and it will find elephant or elephants"
            >search</button>
          </div>
          </div>

          {/* {this.isMobile() === false && (
            <div
              className="cursor-pointer  margin-right-1 the-text-color"
              onClick={this.scrollUp}
              title="scroll to top"
            >
              (up)
            </div>
          )} */}

          <div className={`${this.isMobile()?"margin-top-11z1" :""}`}>
             <span className="color-white-1 margin-right-1 ib" title="pick an entry from the following drop down list to search through">Search through:</span>
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
                selected
                value="description"
                title="search through the uri/url link texts"
              >
                Link Text
              </option>

              <option value="notetext" title="search through the notes">
                Note Text
              </option>
              {/* <option
                value="date"
                title="search through the uri/url link texts with a date range"
              >
                Date
              </option> */}
            </select>
          </div>
          
          <div>
            {/* <div>
 <span className="">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div> */}
            {/* {this.props.signup.signup === true ?<div>
 <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsauto">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div>:
             <div>
 <span className="padding-right-11 inline-block-margin-left-1 color-purple pointereventsnone">
                   <input type="checkbox" id="dbdropdownid" name="cbdropdownid" value="" onChange={this.handleCheckboxShow} title="show dropdown list" className="cb1 cursor-pointer" />
                   <label for="dbdropdownid" />
                  </span>
             </div>
             } */}
          </div>
          {/* {
            //this.state.isToggled === true &&
            true && (
               
              <div className={`cursor-pointer ${this.isMobile()?"margin-top-11z1" :""}`}>
             
                <select
                  className="select cursor-pointer"
                  onChange={this.onFolderChange}
                  title="pick a folder name in this list to search for its bookmarks"
                >
                  <option key={""} value={""}>
                    folder name
                  </option>

                  {this.state.foldernamesList.map((option, i) => (
                    <option
                      className="cursor-pointer"
                      key={option.value}
                      value={option.value}
                      title={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          } */}
          {/* <div className="">
            <DateRangePicker
              className="zindex"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div> */}
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
