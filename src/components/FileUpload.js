
import React, { useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { storage } from "../firebase/firebase";
import setUrl  from "../actions/storage";





class FileUpload extends React.Component {
  constructor(props) {
  super(props)

  this.state = {
    progress:0
  }

  }

  formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    this.uploadFiles(file);
  };

  uploadFiles = (file) => {
    //

    const uploadTask = storage.ref(`files/${file.name}`).put(file);
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

        // Create a root reference
        
  const user = firebase.auth().currentUser;
  //console.log("FileUpload, user.uid="+user.uid)
//  const imagesRef = storage.ref(user.uid);
// const spaceRef = imagesRef.child(file.name)

//const storageRef = firebase.storage().ref();
//const fileRef = storageRef.child(`${user.uid}/${file.name}`);
//fileRef.put(file);
// const storageRef = firebase.storage().ref();

// storageRef.child(user.uid).put(file.name)



        storage
          .ref("files")
          .child(user.uid+"//"+file.name)
          //.child(file.name)
          .getDownloadURL()
          .then((url) => {
            //use this url in FetchBookmarks.js
            console.log("url=" + url);
            //this url needs to be put in redux
            this.props.setUrl(url);
          });
      }
    );
  };

  render() {
     return (
    <div className="App">
      <form onSubmit={this.formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      <h2>Uploading done {this.state.progress}%</h2>
    </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUrl: (url) => dispatch(setUrl(url)),
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