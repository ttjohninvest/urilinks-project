import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
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
      <div className="box-layout topbottom0">
        <div className="flexrowz">
          <div
            title="Thank you. Welcome. This internet tool helps to organize your bookmarks in a friendly user interface. To see the introduction, click on youtube."
            className="box-layout__box"
          >
            <h1 className="box-layout__title text-size-8- coolShadow- ">
              urilinks.com
            </h1>
            {/* <img src={penguinSayingHello} width="100" height="100" /> */}
            <p className="text-size-8- coolShadow- ">
              Women and mens internet page bookmarker, free plan. It has three other inexpensive plans I think you may enjoy as well.
              {/* Welcome to an easier way to do internet bookmarks with hash tags,
              free tool */}
            </p>
            <p>Please contact Mr. McGovern at 775 507 0098 or email ttjohninvest@gmail.com</p>
            {/* <p className="text-size-8 coolShadow ">
            I am trying to help my son. Please give it a try.
          </p> */}
            {innerWidth<=1000 && <div className="margin-bottom-18">
              <a
                href="https://youtu.be/SFkvTgFhBVs"
                className="text-size-8- coolShadow- "
                target="_blank"
                title="Please click to see the 1 minute 44 seconds tutorial on youtube to help you get started."
              >
                Please click to see the tutorial on youtube.com.
              </a>
            </div>}

            <button
              className="button text-size-8- coolShadow-"
              onClick={startLogin}
            >
              Please login with google
            </button>
          </div>
          {innerWidth > 1000 && (
            <div className="margin-left-11 borderRadius4">
              <iframe
                width="1000"
                height="580"
                //className="wh"
                src="https://www.youtube.com/embed/SFkvTgFhBVs?si=lrq-1ZawZD7l4kes?autoplay=1"
                title="Youtube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    );
  else return <div>too many</div>;
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

