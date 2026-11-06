
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const GmailContacts = () => {
  console.log("ENTERED GmailContacts");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getGmailContacts = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setContacts([]);
    setLoaded(false);

    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        throw new Error("Please log in first.");
      }

      // Request permission to read Google contacts.
      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope(
        "https://www.googleapis.com/auth/contacts.readonly"
      );

      provider.setCustomParameters({
        login_hint: user.email
      });

      // Ask the current user for permission.
      const result = await user.reauthenticateWithPopup(
        provider
      );

      // Get Google's access token.
      const token = result.credential.accessToken;

      if (!token) {
        throw new Error("Google access token not available.");
      }

      let allContacts = [];
      let nextPageToken = "";

      // Retrieve all pages of contacts.
      do {
        const params = new URLSearchParams({
          personFields: "names,emailAddresses,phoneNumbers",
          pageSize: "1000"
        });

        if (nextPageToken) {
          params.append("pageToken", nextPageToken);
        }

        const response = await fetch(
          "https://people.googleapis.com/v1/people/me/connections?" +
            params.toString(),
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            (data.error && data.error.message) ||
              "Unable to retrieve contacts."
          );
        }

        if (data.connections) {
          allContacts = allContacts.concat(data.connections);
        }

        nextPageToken = data.nextPageToken || "";

      } while (nextPageToken);

      // Convert Google contacts to a simpler array.
      const formattedContacts = allContacts.map(
        (person, index) => {
          const names = person.names || [];
          const emails = person.emailAddresses || [];
          const phones = person.phoneNumbers || [];

          return {
            id: person.resourceName || String(index),
            name: names.length
              ? names[0].displayName
              : "",
            emails: [
              ...new Set(emails.map(item => item.value))
            ],
            phones: [
              ...new Set(phones.map(item => item.value))
            ]
          };
        }
      );

      // Get the logged-in user's email address.
      const currentUserEmail = (user.email || "")
        .trim()
        .toLowerCase();

      // Remove the logged-in user's email address.
      // Remove contacts with no remaining email addresses.
      const otherContacts = formattedContacts
        .map(contact => ({
          ...contact,
          emails: contact.emails.filter(
            email =>
              email.trim().toLowerCase() !==
              currentUserEmail
          )
        }))
        .filter(contact => contact.emails.length > 0);

      // Sort alphabetically.
      otherContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      // Display only other contacts.
      setContacts(otherContacts);

      setLoaded(true);

      console.log(
        "Gmail contacts excluding current user:",
        otherContacts
      );

    } catch (err) {
      console.error("Gmail contacts error:", err);
      setError(err.message || "Unable to retrieve contacts.");
    } finally {
      setLoading(false);
    }
  };

  

return (
  <div style={{ width: "100%" }}>
    <div className="margin-top-1">
    <button
      className="ib button-2"
      type="button"
      onClick={getGmailContacts}
      disabled={loading}
    >
      {loading
        ? "Loading Contacts..."
        : "Get my gmail contacts"}
    </button>
    </div>

    {error && (
      <p style={{ color: "red" }}>
        {error}
      </p>
    )}

    {loaded && (
      <div
        style={{
          width: "100%",
          minWidth: 0,
          backgroundColor: "white",
          color: "black",
          boxSizing: "border-box",
          padding: "10px",
          border: "1px solid #DB5705"
        }}
      >
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            padding: "5px 10px"
          }}
        >
          <h3 style={{ margin: 0 }}>
            Gmail Contacts ({contacts.length})
          </h3>

          <button
            type="button"
            onClick={() => setLoaded(false)}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
              padding: "5px 12px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            width: "100%",
            height: "200px",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
            border: "1px solid #DB5705",
            backgroundColor: "white",
            color: "black",
            overflowWrap: "anywhere"
          }}
        >
          {contacts.length === 0 && (
            <p>No other contacts found.</p>
          )}

          {contacts.map(contact => (
            <div
              key={contact.id}
              style={{
                borderBottom: "1px solid #DB5705",
                padding: "10px"
              }}
            >
              <div>
                <strong>
                  {contact.name || "No Name"}
                </strong>
              </div>

              {contact.emails.map((email, index) => (
                <div key={index}>
                  Email: {email}
                </div>
              ))}

              {contact.phones.map((phone, index) => (
                <div key={index}>
                  Phone: {phone}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);


};

export default GmailContacts;
