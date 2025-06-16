import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { startAddLink } from "../actions/links";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { history } from "../routers/AppRouter";
import ImportedBookmarks from "./ImportedBookmarks";

const FetchBookmarks = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [importingError, setImportingError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [max, setMax] = useState(0);
  const [rl, setRl] = useState(0);
  const [loopmax, setLoopmax] = useState(0);

  const handleNavigation = () => {
    setShowDialog(true);
  };

  const handleConfirmNavigation = () => {
    history.push("/");
    setShowDialog(false);
  };

  
  useEffect(() => {
    
    //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
    if (props.url === "") setImportingError(true);
    const text = "Is it ok to upload the bookmarks?";
    if (confirm(text) == true) {
      //gs://see-my-index-project-7.firebasestorage.app/files/bookmarks_6_9_25.html
      //fetch("https://urilinks.com/bookmarks_6_9_25.html") //use the url from FileUpload.js
      //.then(response => response.json())
      //
      console.log("FetchBookmarks, props.url=" + props.url);
      //fetch("https://firebasestorage.googleapis.com/v0/b/see-my-index-project-7.firebasestorage.app/o/files%2Fbookmarks_6_9_25.html?alt=media&token=6fc9650d-d319-43ab-b2ed-529b3bfcec8b")
      fetch(props.url)
        .then((response) => response.text())
        .then((data) => {
          const now = new Date();
          //console.log("data="+data)
          setData(data);

          //const text = `<p>Some text</p><br /><a href="https://daily-dev-tips.com/">My website</a><hr /><a href="https://google.com">Another link</a>`;

          let parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          let links = doc.getElementsByTagName("a"); // This returns an HTMLCollection of all <a> tags
          
          // let doctype = doc.getElementsByTagName("doctype");
          // const doesit = doctype.item(0).getAttribute("NETSCAPE-Bookmark-file-1")
          // console.log("NETSCAPE-Bookmark-file-1, doesit="+doesit)
         
          let title = doc.getElementsByTagName("title")
          if(title.item(0).innerText==="Bookmarks") {
            
           

          let r = true;
          let htmllinksarray = [];

          const hasControlCharacters=(str)=>{
            const regex = /\\c[ABCDEFGHIKLNOPQRSUVWXYZ]/;
            const result = regex.test(str);
            return result
          }

          for (let i = 0; i < links.length; i++) {
          
            if(!hasControlCharacters(links.item(i).innerText)) {
              htmllinksarray.push({
              description: links.item(i).innerText,
              Url: links.item(i).getAttribute("href"), //, //href,
              note: "#bravebookmarks",
              amount: 0,
              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
              faviconURL: links.item(i).getAttribute("ICON"), //"https://google.com/favicon.ico" //icon
            });
            } 
           
          }

          let A = props.links;
          let B = htmllinksarray;
          let result = B.filter(
            (b) => !A.some((a) => a.description === b.description)
          );

          console.log("result.length=" + result.length);
          //let ok = false;
          //500
          let ll = props.links.length;
          let rl = result.length;

          let max=0;
          let loopmax2=rl;

          const user = firebase.auth().currentUser;
          if (
            user.uid === "D9LSg6elood8Yc5gd5oDMp3JNAQ2" ||
            user.uid === "NyeF3Cz2yvV3gpo2dwNoBSkRI473" ||
            user.uid === "WJGHkWycjKQxPK83Fi4zqx53bCl1" ||
            user.uid === "kRXrwGyZoXRPKwmQoKWvG7XDx5b2"
          ) {
              max = 10000 - (rl + ll);
              console.log("in if, ll="+ll)
              console.log("in if, rl="+rl)
              console.log("in if, max="+max)
              if (rl > max) {
                loopmax2 = max;
            }
            } else {
              max = 500 - (rl + ll);
              if (rl > max) {
                loopmax2 = max;
              } //otherwise rl is equal to the full length, result.length
            
            }
          
          //for (let i = 0; i < result.length; i++) {
          for (let i = 0; i < loopmax2; i++) {
            //for (let i = 0; i < 1; i++) {

            r = props.startAddLink({
              description: result[i].description,
              Url: result[i].Url, //, //href,
              note: "#bravebookmarks",
              amount: 0,
              createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
              faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
            });
           
            if (r === false) {
              setImportingError(true);
              break;
            }
            
          }

          if (r === false) {
            // setErrorDialog(true);
            console.log("ERROR, VVVVVVVVVVVVV returned false");
          } else {
            console.log("NO ERROR, VVVVVVVVVVVVV returned true");
            //props.history.push("/");
            //window.location.reload()

            //how many new links were added, because of the maximum of 500 I had to add this
            setMax(max);
            setRl(rl); //rl is the length of the full amount to upload
            setLoopmax(loopmax2) //loopmax2 is the modified length if rl would overflow 500
          }
        } else {
          console.log("NOT A BOOKMARKS FILE")
            setError2(true)
        }
        })
        .catch((error) => {
          console.log(
            "about to call setError because it was unable to read from the bucket"
          );
          setError(
            error + "google probably needs to be paid for 5gb more storage"
          );
        });
    } else {
      //handleNavigation()
      history.push("/");
    }
  }, []);

  if (error) return <div>Error: Unable to read from firebase storage</div>;
  if (error2) return <div>Error: The file needs to be a bookmarks file with an html extension</div>;
  if (!data) return <div>Loading...</div>;
  //importingError===true?"Error importing bookmarks":
  return (
    <div>
      {importingError === true ? (
        "Error importing bookmarks"
      ) : (
        <ImportedBookmarks rl={loopmax} max={rl} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  url: state.url,
  links: state.links,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks)
);
