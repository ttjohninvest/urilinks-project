import React, { useEffect, useState } from "react";
//import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth"; // If using authentication
//import 'firebase/firestore';   // If using Firestore
import "firebase/database"; // If using Realtime Database
import "firebase/storage"; // If using Storage
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
//import penguinSayingHello from "../assets/gifs/penguin-saying-hello.gif";

const LoginPage = ({ startLogin }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  //const [count, setCount] = useState(0);
  // const [userId, setUserId] = useState('');
  // const [maximumPage, setMaximumPage] = useState(false);

  //     useEffect(() => {

  //        const fetchData = async () => {
  //           try {
  //             const user = firebase.auth().currentUser;
  //             if (user) {
  //               const uid = user.uid;
  //               setUserId(uid)
  //               console.log("User ID:", uid);
  //             } else {
  //                console.log("No user is currently logged in.");
  //             }
  //             const db = firebase.database();
  //             const snapshot = await db.ref(`/users`).once('value');
  //             if (snapshot.exists()) {
  //               const data = snapshot.val();
  //               console.log("registered user data="+data)
  //               const count = data.length
  //               console.log("registered user count="+count)
  //               setCount(count);
  //             } else {
  //               console.log("else part, count="+0)
  //               setCount(0)
  //             }
  //           } catch (error) {
  //             console.error("Error fetching data:", error);
  //             setCount(-1); // Indicate an error
  //           }
  //         };

  //         fetchData();
  // }, []);

  useEffect(() => {
    //setInnerWidth(window.innerWidth);
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (true)
    //count < 20 )
    return (
      <div className="box-layout">
        <div className="flexrowzc2 borderRadius5">
          <div
            title="Thank you. Welcome. This internet tool helps to organize your bookmarks in a friendly user interface."
            className="box-layout__box"
          >
            <h3 className="margin-left-11- box-layout__title">urilinks.com</h3>

            <p className="margin-left-11">Welcome, click the Enter button</p>

            <button className="ib button margin-left-11-" onClick={startLogin}>
              enter button
            </button>
          </div>
        </div>
      </div>
    );
  else return <div>too many</div>;
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
