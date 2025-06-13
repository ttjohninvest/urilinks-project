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
  const [showDialog, setShowDialog] = useState(false);

    const handleNavigation = () => {
        setShowDialog(true);
    };

    const handleConfirmNavigation = () => {
        history.push('/');
        setShowDialog(false);
    }


  useEffect(() => {
    //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
     const text="Is it ok to upload the bookmarks?"
     if (confirm(text) == true) {
      //gs://see-my-index-project-7.firebasestorage.app/files/bookmarks_6_9_25.html
     //fetch("https://urilinks.com/bookmarks_6_9_25.html") //use the url from FileUpload.js
      //.then(response => response.json())
      //
      console.log("FetchBookmarks, props.url="+props.url)
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
            
        // setData(links)

        //write to firebase the following links
        let r=false
        //for (let i = 0; i < links.length; i++) {
        
        console.log("about to go through the for look to see the contents of the link structure:");
        for (let i = 0; i < 1; i++) {
          let element = links.item(i);
          let add_date = element.getAttribute("ADD_DATE");
          let icon = element.getAttribute("ICON");
          console.log("links[" + i + "].innerText=" + links[i].innerText);
          console.log("links[" + i + "].href=" + links[i].href);
          console.log("links[" + i + "].add_date=" + add_date);
          console.log("links[" + i + "].icon=" + icon);
          console.log("calling startAddLink");


          r = props.startAddLink({
            description: links[i].innerText,
            Url: links[i].href,
            note: "#chromebookmarks",
            amount: 0,
            createdAt: parseInt(add_date), //now.getTime(),
            faviconURL: icon //"https://youtube.com/favicon.ico"
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
//        props.history.push("/");
  //      window.location.reload()
      }

      }).catch((error) => {
          console.log("about to call setError because it was unable to read from the bucket")
          setError(error+"google probably needs to be paid for 5gb more storage")
     });
  } else {
    //handleNavigation()
    history.push("/");
  }
   
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
//importingError===true?"Error importing bookmarks":
  return (
    <div>
      {importingError===true?"Error importing bookmarks":"imported bookmarks"}
     
    </div>
  );
};

const mapStateToProps = (state) => ({
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks)
);

// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { startAddLink } from "../actions/links";
// import { withRouter } from "react-router-dom";
// import moment from "moment";
// import { history } from "../routers/AppRouter";



// const FetchBookmarks = (props) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [importingError, setImportingError] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//     const handleNavigation = () => {
//         setShowDialog(true);
//     };

//     const handleConfirmNavigation = () => {
//         history.push('/');
//         setShowDialog(false);
//     }


//   useEffect(() => {
//     //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
//      const text="Is it ok to upload the bookmarks?"
//      if (confirm(text) == true) {
//       //gs://see-my-index-project-7.firebasestorage.app/files/bookmarks_6_9_25.html
//      //fetch("https://urilinks.com/bookmarks_6_9_25.html") //use the url from FileUpload.js
//       //.then(response => response.json())
//       //
//       console.log("props.url="+props.url)
//       //fetch("https://firebasestorage.googleapis.com/v0/b/see-my-index-project-7.firebasestorage.app/o/files%2Fbookmarks_6_9_25.html?alt=media&token=6fc9650d-d319-43ab-b2ed-529b3bfcec8b")
//       fetch(props.url)
//       .then((response) => response.text())
//       .then((data) => {
//         const now = new Date();
//         //console.log("data="+data)
//         setData(data);

//         //const text = `<p>Some text</p><br /><a href="https://daily-dev-tips.com/">My website</a><hr /><a href="https://google.com">Another link</a>`;

//         let parser = new DOMParser();
//         const doc = parser.parseFromString(data, "text/html");
//         let links = doc.getElementsByTagName("a"); // This returns an HTMLCollection of all <a> tags
//         // setData(links)

//         //write to firebase the following links
//         let r=false
//         //for (let i = 0; i < links.length; i++) {
//         for (let i = 0; i < 1; i++) {
//           console.log("links[" + i + "].innerText=" + links[i].innerText);
//           console.log("links[" + i + "].href" + links[i].href);
//           console.log("calling startAddLink");


//           r = props.startAddLink({
//             description: links[i].innerText,
//             Url: links[i].href,
//             note: "#loving",
//             amount: 0,
//             createdAt: now.getTime(),
//             faviconURL: "https://youtube.com/favicon.ico"
//           });
          
//           if(r===false) {
//             setImportingError(true)
//              break
//           } 
            
           
//         }
//        if (r === false) {
//         // setErrorDialog(true);
//         console.log("ERROR, VVVVVVVVVVVVV returned false");
//       } else {
//         console.log("NO ERROR, VVVVVVVVVVVVV returned true");
//         props.history.push("/");
//         window.location.reload()
//       }

//       }).catch((error) => {
//           console.log("about to call setError because it was unable to read from the bucket")
//           setError(error+"google probably needs to be paid for 5gb more storage")
//      });
//   } else {
//     //handleNavigation()
//     history.push("/");
//   }
   
//   }, []);

//   if (error) return <div>Error: {error.message}</div>;
//   if (!data) return <div>Loading...</div>;
// //importingError===true?"Error importing bookmarks":
//   return (
//     <div>
//       {importingError===true?"Error importing bookmarks":"imported bookmarks"}
     
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   url: state.url,
// });

// const mapDispatchToProps = (dispatch) => ({
//   startAddLink: (link) => dispatch(startAddLink(link)),
// });

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks)
// );

