import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
//import TeirsPayment3 from "./TeirsPayment3";
import Simple from "./Simple";
//import SimpleTest2 from "./SimpleTest2";
import PremiumPlan from "./PremiumPlan";
import StorageSizes from "./StorageSizes";

export const AddLinkPage = (props) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [maximumPage, setMaximumPage] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  //const history = useHistory();

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

  const onSubmit = (link) => {
    console.log("in onSubmit");
    //if(props.signup.signup === true) {
    const user = firebase.auth().currentUser;
    // if (count < 250 || (count < 10000 && (
    //   user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2"
    //)
    // ) {
    //if (count < getPlanMax() && (count < 5000 )) {
    if (count < getPlanMax()) {
      //if (count < 10) {
      //if (true) {
      link.foldername = link.description;
      link.yturl = isityt(link.Url);
      console.log("A link.yturl=" + link.yturl);
      const r = props.startAddLink(link);
      if (r === false) {
        setErrorDialog(true);
        console.log("VVVVVVVVVVVVV returned false");
      } else {
        
        props.history.push("/");
        //window.location.reload();
        window.location.href = "https://urilinks.com?signup=signup";
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
        <div>
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">
                <span className="color-purple color-black-2">Add Link</span>
              </h1>
            </div>
          </div>
          <div className="content-container">
            <LinkForm onSubmit={onSubmit} closeLink={props.closeLink} makereadonly={false} />
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
  theplan: state.theplan,
  signup: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddLinkPage),
);
