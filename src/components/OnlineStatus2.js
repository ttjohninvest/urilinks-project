import React, { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const OnlineStatus2 = ({ userId, displayName }) => {

  const [isOnline, setIsOnline] = useState(false);


  useEffect(() => {

    if (!userId) return;


    const userStatusRef = firebase
      .database()
      .ref(`users/${userId}/online`);


    const handleValue = (snapshot) => {

      setIsOnline(snapshot.val() === true);

    };


    userStatusRef.on("value", handleValue);


    return () => {

      userStatusRef.off("value", handleValue);

    };

  }, [userId]);


  return (
    <div className="online-status">
      {isOnline ? "Online" : "Offline"}
         

    </div>
  );

};


export default OnlineStatus2