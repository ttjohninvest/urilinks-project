import React, { useEffect, useState } from "react";
//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage
import { connect } from "react-redux";
import EmailSharableLinkForm from "./EmailSharableLinkForm";
import EmailForm from "./EmailForm";
import { startAddLink, emailSharableLink } from "../actions/links";
import { withRouter } from "react-router-dom";
import TeirsPayment3 from "./TeirsPayment3";
import StorageSizes from "./StorageSizes";
//uiuhff
export const SendEmailPage = (props) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [maximumPage, setMaximumPage] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  //const history = useHistory();

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
      //premium
      max = StorageSizes.premium;
    }

    console.log("AddLinkPage.js, bookmarks, max=" + max);
    return max;
  };

  const goBack = () => {
    props.history.goBack(); // Navigates back one step in the history
  };

  useEffect(() => {
    console.log("SendEmailPage, isFormOpen=" + props.isFormOpen);
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

  const onSubmit = (emaildata) => {
    console.log("in onSubmit");
    //if(props.signup.signup === true) {
    const user = firebase.auth().currentUser;
    const uid = emaildata.uid;
    const toemail = emaildata.email;
    const subject = emaildata.subject;
    const body = emaildata.description;
    //alert(body)
    //const uri = encodeURIComponent(`https://urilinks.com/dashboard?signup=0&x=readonly&id=${uid}`)
    const uri = encodeURIComponent(body);
    //const mailtoUrl = `https://mail.google.com/mail/u/0/?fs=1&su=${subject}&to=${toemail}&body=${body}${uri}&tf=cm`
    const mailtoUrl = `https://mail.google.com/mail/u/0/?fs=1&su=${subject}&to=${toemail}&body=${uri}&tf=cm`;

    //mail.google.com/mail/u/0/?fs=1&tf=cm&su=Your+Subject&to=recipient@example.com&body=Your+Message
    // Open the mail client
    //window.location.href = mailtoUrl //mailtoLink;
    https: window.open(mailtoUrl, "_blank");
  };

  return (
    <div>
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              <span className="color-purple color-black-2">Email Data</span>
            </h1>
          </div>
        </div>
        <div className="content-container-9x">
          <EmailForm
            isreadonly={props.isreadonly}
            onSubmit={onSubmit}
            makereadonly={false}
            isFormOpen={props.isFormOpen}
            handleClose={props.handleClose}
            sharablelink={props.sharablelink}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theplan: state.theplan,
  signup: state.signup,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (v, link) => dispatch(startAddLink(v, link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SendEmailPage),
);
