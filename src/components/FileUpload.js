
import React, { useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { storage, getStorage, ref } from "../firebase/firebase";
import setUrl  from "../actions/storage";
//import { getStorage, ref, getDownloadURL } from "firebase/storage";





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

        const user = firebase.auth().currentUser;

        //const storage2 = getStorage();
const spaceRef = ref(storage, user.uid+'/'+file.name);



// Points to the root reference
// var storageRef = firebase.storage().ref();

// // Points to 'images'
// var imagesRef = storageRef.child(user.uid);

// // Points to 'images/space.jpg'
// // Note that you can use variables to create child values

// var spaceRef = imagesRef.child(file.name);
// console.log(spaceRef.fullPath)
// console.log(spaceRef.name)
// console.log(spaceRef.parent)

        // storage
        //   .ref("files")
        //   //.child(user.uid+"//"+file.name)
        //   .child(file.name)
        spaceRef
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