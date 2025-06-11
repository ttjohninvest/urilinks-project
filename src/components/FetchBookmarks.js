import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { history } from "../routers/AppRouter";


const FetchBookmarks = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [importingError, setImportingError] = useState(false);

  useEffect(() => {
    //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
     const text="Is it ok to upload the bookmarks?"
     if (confirm(text) == true) {
     fetch("https://urilinks.com/bookmarks_6_9_25.html")
      //.then(response => response.json())
      .then((response) => response.text())
      .then((data) => {
        const now = new Date();
        //console.log("data="+data)
        setData(data);

        //const text = `<p>Some text</p><br /><a href="https://daily-dev-tips.com/">My website</a><hr /><a href="https://google.com">Another link</a>`;

        let parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        let links = doc.getElementsByTagName("a"); // This returns an HTMLCollection of all <a> tags
        // setData(links)

        //write to firebase the following links
        let r=false
        for (let i = 0; i < links.length; i++) {
        //for (let i = 0; i < 1; i++) {
          console.log("links[" + i + "].innerText=" + links[i].innerText);
          console.log("links[" + i + "].href" + links[i].href);
          console.log("calling startAddLink");


          r = props.startAddLink({
            description: links[i].innerText,
            Url: links[i].href,
            note: "#loving",
            amount: 0,
            createdAt: now.getTime(),
            faviconURL: "https://youtube.com/favicon.ico"
          });
          
          if(r===false) {
            setImportingError(true)
             break
          } 
            
           
        }
       if (r === false) {
        // setErrorDialog(true);
        console.log("ERROR, VVVVVVVVVVVVV returned false");
      } else {
        console.log("NO ERROR, VVVVVVVVVVVVV returned true");
        props.history.push("/");
        window.location.reload()
      }

      }).catch((error) => setError(error));
  } else {
    history.push("/");
  }
   
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {importingError===true?"Error importing bookmarks":"Bookmarks have been imported"}
      {/* {JSON.stringify(data)} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(undefined, mapDispatchToProps)(FetchBookmarks)
);
