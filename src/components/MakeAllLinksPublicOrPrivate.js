import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const MakeAllLinksPublicPrivate = () => {
  const [allPublic, setAllPublic] = useState(false);
  const [changing, setChanging] = useState(false);

  const handleChange = async (e) => {
    const checked = e.target.checked;

    const user = firebase.auth().currentUser;

    if (!user) {
      alert("You must be signed in.");
      return;
    }

    const message = checked
      ? "Make ALL of your links public?"
      : "Make ALL of your links private?";

    if (!window.confirm(message)) {
      return;
    }

    setChanging(true);

    try {
      const linksRef = firebase
        .database()
        .ref(`users/${user.uid}/links`);

      const snapshot = await linksRef.once("value");

      const updates = {};

      snapshot.forEach((childSnapshot) => {
        updates[
          `users/${user.uid}/links/${childSnapshot.key}/showpublic`
        ] = checked ? 1 : 0;
      });

      if (Object.keys(updates).length > 0) {
        await firebase
          .database()
          .ref()
          .update(updates);
      }

      setAllPublic(checked);

      if (checked) {
        alert("All links have been made public.");
      } else {
        alert("All links have been made private.");
      }

    } catch (error) {
      console.error(
        "Error changing public/private links:",
        error
      );

      alert(
        "The links could not be changed."
      );
    }

    setChanging(false);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={allPublic}
          onChange={handleChange}
          disabled={changing}
        />

        {changing
          ? " Changing links..."
          : allPublic
          ? " All links are public"
          : " Make all links public"}
      </label>
    </div>
  );
};

export default MakeAllLinksPublicPrivate;