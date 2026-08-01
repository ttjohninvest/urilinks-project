import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { storage } from "../firebase/firebase";
import setStorageUrl from "../actions/storage";
//import { getStorage, ref, getDownloadURL } from "firebase/storage";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };

    // this.handleEvent1 = this.handleEvent1.bind(this);
    // this.handleEvent2 = this.handleEvent2.bind(this);
    // this.handleEvent3 = this.handleEvent3.bind(this);
  }

  formHandler = (e) => {
    e.preventDefault();
    console.log("in formHandler");
    const file = e.target[0].files[0];
    console.log("file.type=" + file.type);
    if (file.type !== "text/html") return false;
    const uploadField = document.getElementById("file");

    if (file.size > 102130) {
      //about 100kb
      alert(
        "The bookmarks file," +
          file.name +
          ", is too big. A bookmark file needs to be under 100kb.",
      );
      //this.value = "";
      return;
    }
    this.uploadFiles(file);
  };

  uploadFiles = (file) => {
    //alert(file.name)
    //"XLFFo8DQ7LZh8oR8CnvBGInpjsZ2"
    window.document.getElementById("file-name").textContent=file.name
    let user;
    let uid;
    let uploadTask;
    if (this.props.signup.signup === true) {
      user = firebase.auth().currentUser;
      uid = user.uid;
      uploadTask = storage.ref(`files/${uid}/${file.name}`).put(file);
    } else {
      uploadTask = storage
        .ref(`files/XLFFo8DQ7LZh8oR8CnvBGInpjsZ2/${file.name}`)
        .put(file);
      uid = "XLFFo8DQ7LZh8oR8CnvBGInpjsZ2";
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        //setProgress(prog);
        this.setState({ progress: prog });
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(uid + "/" + file.name)
          .getDownloadURL()
          .then((url) => {
            //use this url in FetchBookmarks.js
            console.log("url=" + url);
            //this url needs to be put in redux
            this.props.setStorageUrl(url);
            console.log("html is file successfully uploaded");
            this.props.setCheckDidUpload();
          });
      },
    );
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.formHandler}>
          <input
            className="input-"
            id="real-file"
            type="file"
            accept=".html"
            //hidden="hidden"
            hidden
          />
          <label htmlFor="real-file" className="button-2">Choose File</label>
          <span id="file-name">No file chosen</span>
          <button type="submit" className="button-2 margin-left-77 ib">upload</button>

          
        </form>
      
        <hr />
        <h2>uploading done {this.state.progress}%</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signup: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
  setStorageUrl: (url) => dispatch(setStorageUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
