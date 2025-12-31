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
      <div className="box-layout topbottom0 positionit2">
        <div className="flexrowz">
          <div
            title="Thank you. Welcome. This internet tool helps to organize your bookmarks in a friendly user interface. To see the introduction, click on youtube."
            className="box-layout__box"
          >
            

             {/* <h3 className="margin-left-11 box-layout__title">
              HOLY LOVING GOD'S SALVATION INVITATION
            </h3>

            <p className="margin-left-11">
              <a classname="blueText" href="https://www.blueletterbible.org/kjv/rom/10/13/s_1056013" target="_blank">Please, may I invite you to call upon the name of Jesus Christ to be saved? Please say "I call upon the name of Jesus Christ to be saved." Also, you may click to see the holy bible reference at Romans 10:13 or </a><a classname="blueText" href="https://www.blueletterbible.org/kjv/act/2/21/s_1020021" target="_blank">acts 2:21</a>
            </p> */}

            <h3 className="margin-left-11 box-layout__title">
              urilinks.com
            </h3>
             
            {/* <p className="margin-left-11">
               Welcome. Worry about forgetting is diminished by using this. It works like a physical file organizer. It organizes internet bookmarks through a web interface using alphabetically arranged clickable hashtags or folder names. It is more satisfying and easy than chrome browser bookmarks.</p> */}
            <p className="margin-left-11">Welcome</p>
            {/* {innerWidth<=1000 && <div className="margin-left-118 margin-bottom-18">
              <a
                href="https://youtu.be/SFkvTgFhBVs"
                className="text-size-8- coolShadow- "
                target="_blank"
                title="Please click to see the 1 minute 44 seconds tutorial on youtube to help you get started."
              >
                Please click to see the tutorial on youtube.com.
              </a>
            </div>} */}

            <button
              className="button"
              onClick={startLogin}
            >
              enter button
            </button>
            {/* <p className="margin-left-11">Contact Information: Mr. McGovern at 775 507 0098 or email ttjohninvest@gmail.com</p> */}
           <p className="margin-left-11">urilinks.com</p>
           
          </div>
          {/* {innerWidth > 1000 && (
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
          )} */}
        </div>
      </div>
    );
  else return <div>too many</div>;
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

