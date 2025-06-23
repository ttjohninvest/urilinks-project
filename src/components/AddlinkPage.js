import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";

export const AddLinkPage = (props) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [maximumPage, setMaximumPage] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  //const history = useHistory();

  const goBack = () => {
    props.history.goBack(); // Navigates back one step in the history
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const uid = user.uid;
          setUserId(uid);
          console.log("User ID:", uid);
        } else {
          console.log("No user is currently logged in.");
        }
        const db = firebase.database();
        const snapshot = await db.ref(`/users/${user.uid}/links`).once("value");
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

  const onSubmit = (link) => {
    console.log("in onSubmit");
    const user = firebase.auth().currentUser;
    if (count < 10000 || count < 500 || user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2" || user.uid === "NyeF3Cz2yvV3gpo2dwNoBSkRI473"
      || user.uid === "WJGHkWycjKQxPK83Fi4zqx53bCl1" || user.uid === "kRXrwGyZoXRPKwmQoKWvG7XDx5b2"
    ) {
      const r = props.startAddLink(link);
      if (r === false) {
        setErrorDialog(true);
        console.log("VVVVVVVVVVVVV returned false");
      } else {
        
        props.history.push("/");
        window.location.reload()
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
      ) : !maximumPage ? (
        <div>
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Add Uri/Url Link</h1>
            </div>
          </div>
          <div className="content-container">
            <LinkForm onSubmit={onSubmit} />
          </div>
        </div>
      ) : (
        <div className="content-container- centerit">
          <div>The maximum number of links that can be added is 500</div>
          <div>
            <button className="button-style-1- button" onClick={goBack}>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(AddLinkPage));
