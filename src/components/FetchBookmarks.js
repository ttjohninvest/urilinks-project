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
  const [linksArray, setLinksArray] = useState([]);

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
        let r=true
        let htmllinksarray=[]

        for (let i = 0; i < links.length; i++) {
        console.log("links.item(i).innerText="+links.item(i).innerText)
         htmllinksarray.push({
            description: links.item(i).innerText,
            Url: links.item(i).getAttribute('href'), //, //href,
            note: "#chromebookmarks",
            amount: 0,
            createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
            faviconURL: links.item(i).getAttribute("ICON"), //"https://google.com/favicon.ico" //icon
          })
          
        } 
         htmllinksarray.sort((a, b) => {
          return a.description > b.description ? 1 : -1;
        });
        for (let i = 0; i < htmllinksarray.length; i++) {
        console.log("htmllinksarray["+i+"].description="+htmllinksarray[i].description)

        }
        console.log("//////////////////////////////////////////////////////////////////////////////////")
          console.log("//////////////////////////////////////////////////////////////////////////////////")
          console.log("//////////////////////////////////////////////////////////////////////////////////")
          console.log("//////////////////////////////////////////////////////////////////////////////////")
        // for (let i = 0; i < props.links.length; i++) {
        // console.log("props.links[i].description="+props.links[i].description)

        // }
//let linksArray = props.links
//setLinksArray()
         props.links.sort((a, b) => {
          return a.description > b.description ? 1 : -1;
        });

        //setLinksArray(linksArray)

         for (let i = 0; i < props.links.length; i++) {
        console.log("linksArray["+i+"].description="+linksArray[i].description)

        }

let A = props.links //linksArray
let B = htmllinksarray
let result = B.filter(b => !A.some(a => a.description === b.description));

console.log("result.length="+result.length)

//         //for (let i = 0; i < links.length; i++) {
        for (let i = 0; i < result.length; i++) {
          //for (let i = 0; i < 1; i++) {
        
           r = props.startAddLink({
            description: result[i].description,
            Url: result[i].Url, //, //href,
            note: "#chromebookmarks",
            amount: 0,
            createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
            faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
          });
          
          if(r===false) {
            setImportingError(true)
             break
          } 
            
           
        }




        //for (let i = 0; i < links.length; i++) {
          for (let i = 0; i < 1; i++) {
          //let element = links.item(i);
          //let add_date = parseInt(links.item(i).getAttribute("ADD_DATE"));
          //let icon = links.item(i).getAttribute("ICON");
         r = props.startAddLink({
            description: links.item(i).innerText,
            Url: links.item(i).getAttribute('href'), //, //href,
            note: "#chromebookmarks",
            amount: 0,
            createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
            faviconURL: links.item(i).getAttribute("ICON"), //"https://google.com/favicon.ico" //icon
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
        //props.history.push("/");
        //window.location.reload()
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

  if (error) return <div>Error: Unable to read from firebase storage</div>;
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
  links:state.links
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
// import selectLinks from "../selectors/links";



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
//       console.log("FetchBookmarks, props.url="+props.url)
//       //fetch("https://firebasestorage.googleapis.com/v0/b/see-my-index-project-7.firebasestorage.app/o/files%2Fbookmarks_6_9_25.html?alt=media&token=6fc9650d-d319-43ab-b2ed-529b3bfcec8b")
//       fetch(props.url)
//       .then((response) => response.text())
//       .then((data) => {
//         const now = new Date();
        
//         setData(data);

//         let parser = new DOMParser();
//         const doc = parser.parseFromString(data, "text/html");
//         let links = doc.getElementsByTagName("a"); // This returns an HTMLCollection of all <a> tags
            
       
//         let r=false
//         let htmllinksarray=[]

//         for (let i = 0; i < links.length; i++) {
        
//          htmllinksarray.push({
//             description: links.item(i).innerText,
//             Url: links.item(i).getAttribute('href'), //, //href,
//             note: "#chromebookmarks",
//             amount: 0,
//             createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
//             faviconURL: links.item(i).getAttribute("ICON"), //"https://google.com/favicon.ico" //icon
//           })
          
//         }

// //          const A = [
// //   { id: 10, name: 'Mike' },
// //   { id: 1, name: 'Alice' },
// //   { id: 2, name: 'Bob' },
// //   { id: 3, name: 'Charlie' },
// //   { id: 4, name: 'Charlie2' }
// // ];

// // const B = [
// //   { id: 2, name: 'Bob' },
// //   { id: 4, name: 'David' },
// //   { id: 5, name: 'Eve1' },
// //   { id: 6, name: 'Eve2' },
// //   { id: 7, name: 'Eve3' }
// // ];

// // let result = B.filter(b => !A.some(a => a.id === b.id));
// // console.log(result)
// //htmllinksarray
// let A = props.links
// let B = htmllinksarray
// let result = B.filter(b => !A.some(a => a.name.trim().toLowerCase() === b.name.trim().toLowerCase()));


//         //for (let i = 0; i < links.length; i++) {
//         for (let i = 0; i < result.length; i++) {
//           //for (let i = 0; i < 1; i++) {
        
//            r = props.startAddLink({
//             description: result[i].description,
//             Url: result[i].Url, //, //href,
//             note: "#chromebookmarks",
//             amount: 0,
//             createdAt: now.getTime(), //parseInt(links.item(i).getAttribute("ADD_DATE")), //now.getTime(), //add_date.getTime(), //add_date won't work
//             faviconURL: result[i].faviconURL, //"https://google.com/favicon.ico" //icon
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
//           console.log("About to call setError because it was unable to read from the firebase storage bucket")
//           setError(error+"google probably needs to be paid for 5gb more storage")
//      });
//   } else {
//     //handleNavigation()
//     history.push("/");
//   }
   
//   }, []);

//   if (error) return <div>Error: unable to read from the firebase storage bucket</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       {importingError===true?"Error importing bookmarks":"imported bookmarks"}
     
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   url: state.url,
//   links: selectLinks(state.links, state.filters),
// });

// const mapDispatchToProps = (dispatch) => ({
//   startAddLink: (link) => dispatch(startAddLink(link)),
// });

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(FetchBookmarks)
// );





