
import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { storage } from "../firebase/firebase";
import setStorageUrl  from "../actions/storage";
//import { getStorage, ref, getDownloadURL } from "firebase/storage";

class FileUpload extends React.Component {
  constructor(props) {
  super(props)

  this.state = {
    progress:0,
  }

  // this.handleEvent1 = this.handleEvent1.bind(this);
  // this.handleEvent2 = this.handleEvent2.bind(this);
  // this.handleEvent3 = this.handleEvent3.bind(this);
  }

  /*
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent1 = this.handleEvent1.bind(this);
    this.handleEvent2 = this.handleEvent2.bind(this);
    this.myElement = React.createRef();
  }

  handleEvent1(event) {
    // Handle the first event
  }

  handleEvent2(event) {
    // Handle the second event
  }

  componentDidMount() {
    this.myElement.current.addEventListener('event1', this.handleEvent1);
    this.myElement.current.addEventListener('event2', this.handleEvent2);
  }

  componentWillUnmount() {
    this.myElement.current.removeEventListener('event1', this.handleEvent1);
    this.myElement.current.removeEventListener('event2', this.handleEvent2);
  }

  render() {
    return (
      <div ref={this.myElement}>
       
      </div>
    );
  }
}
  */

//    handleEvent1(event) {
//     console.log("handleEvent1,event="+JSON.stringify(event))
// //    if(event.target.value) {
// // this.handleEvent3.innerHTML=event.target.value
// //    } else {
// //     this.handleEvent3.innerHTML="file not uploaded yet"
// //    }
//    }

  // handleEvent2(event) {
  //   // Handle the second event
  //   this.handleEvent1.click()
  // }

  // handleEvent3(event) {
   
  // }


  // componentDidMount() {
 
  //  window.addEventListener('change', this.handleEvent1);
  //   window.addEventListener('click', this.handleEvent2);

  // }

  //  componentWillUnmount() {
  //   window.removeEventListener('event1', this.handleEvent1);
  //   window.removeEventListener('event2', this.handleEvent2);
   
  //  }

    

  formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log("file.type="+file.type)
    if(file.type !== "text/html") return false
    const uploadField = document.getElementById("file");
   
      if(file.size > 102130) { //about 100kb
        alert("The bookmarks file,"+file.name+", is too big. A bookmark file needs to be under 100kb.");
        //this.value = "";
        return
      };
    this.uploadFiles(file);
  };

  uploadFiles = (file) => {
    //
    const user = firebase.auth().currentUser;
    const uploadTask = storage.ref(`files/${user.uid}/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //setProgress(prog);
        this.setState({progress:prog})
      },
      (error) => console.log(error),
      () => {
            
          storage
          .ref("files")
          .child(user.uid+"/"+file.name)
          .getDownloadURL()
          .then((url) => {
            //use this url in FetchBookmarks.js
            console.log("url=" + url);
            //this url needs to be put in redux
            this.props.setStorageUrl(url);
            console.log("html is file successfully uploaded")
            this.props.setCheckDidUpload()
          });
      }
    );
  };

  render() {
     return (
    <div className="App">
      <form onSubmit={this.formHandler}>
        <input 
        //ref={this.element1} 
        id="real-file" type="file" className="input" accept=".html" 
        //hidden="hidden" 
        />
        {/* <button 
        //ref={this.element2}  
        id="custom-button" type="button" className="button">choose a file</button> */}
        {/* <span 
        ref={this.element3} 
        id="custom-text">no file chosen yet</span> */}
        <button type="submit">Upload</button>
      </form>
      <hr />
      <h2>Uploading done {this.state.progress}%</h2>
    </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStorageUrl: (url) => dispatch(setStorageUrl(url)),
});

export default connect(undefined, mapDispatchToProps)(FileUpload);


// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { storage } from "../firebase/firebase";
// import { setStorageUrl } from "../actions/storage";
// function FileUpload(props) {
//   const [progress, setProgress] = useState(0);
  
//   const formHandler = (e) => {
//     e.preventDefault();
//     const file = e.target[0].files[0];
//     uploadFiles(file);
//   };

//   const uploadFiles = (file) => {
//     //
//     const uploadTask = storage.ref(`files/${file.name}`).put(file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         //
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (error) => console.log(error),
//       () => {
//         storage
//           .ref("files")
//           .child(file.name)
//           .getDownloadURL()
//           .then((url) => {
//             //use this url in FetchBookmarks.js
//             console.log("url=" + url);
//             //this url needs to be put in redux
//             props.setStorageUrl(url);
//           });
//       }
//     );
//   };

//   render() {
//   return (
//     <div className="App">
//       <form onSubmit={formHandler}>
//         <input type="file" className="input" />
//         <button type="submit">Upload</button>
//       </form>
//       <hr />
//       <h2>Uploading done {progress}%</h2>
//     </div>
//   );
// }
// }

// //export default FileUpload;

// const mapDispatchToProps = (dispatch) => ({
//   setStorageUrl: (url) => dispatch(setStorageUrl(url)),
// });

// export default connect(undefined, mapDispatchToProps)(FileUpload);

// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { storage } from "../firebase/firebase";
// import { setStorageUrl } from "../actions/storage";

// function FileUpload(props) {
//   const [progress, setProgress] = useState(0);
//   const formHandler = (e) => {
//     e.preventDefault();
//     const file = e.target[0].files[0];
//     uploadFiles(file);
//   };

//   const uploadFiles = (file) => {
//     //
//     const uploadTask = storage.ref(`files/${file.name}`).put(file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         //
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (error) => console.log(error),
//       () => {
//         storage
//           .ref("files")
//           .child(file.name)
//           .getDownloadURL()
//           .then((url) => {
//             //use this url in FetchBookmarks.js
//             console.log("url=" + url);
//             //this url needs to be put in redux
//             props.setStorageUrl(url);
//           });
//       }
//     );
//   };

//   return (
//     <div className="App">
//       <form onSubmit={formHandler}>
//         <input type="file" className="input" />
//         <button type="submit">Upload</button>
//       </form>
//       <hr />
//       <h2>Uploading done {progress}%</h2>
//     </div>
//   );
// }

// const mapDispatchToProps = (dispatch) => ({
//   setStorageUrl: (url) => dispatch(setStorageUrl(url)),
// });

// export default connect(undefined, mapDispatchToProps)(FileUpload);