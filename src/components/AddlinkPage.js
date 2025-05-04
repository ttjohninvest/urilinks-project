import React,{ useEffect, useState } from "react";
import * as firebase from "firebase";

import { get } from "firebase/database";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink, documentCountMaximum } from "../actions/links";


export const AddLinkPage = ({uid}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    //const db = firebase.database();
   
    const dataRef = firebase.database().ref(`users/${uid}/links`);
    get(dataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                setCount(snapshot.size);
            } else {
                setCount(0);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setCount(0);
        });
}, []);

const  onSubmit = (link) => {
     this.props.startAddLink(link);
     this.props.history.push("/");
  };
 
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Uri/Url Link</h1>
          </div>
        </div>
        <div className="content-container">
          <LinkForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  }


const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default connect(undefined, mapDispatchToProps)(AddLinkPage);


// export class AddLinkPage extends React.Component {
//   onSubmit = (link) => {
//      this.props.startAddLink(link);
//      this.props.history.push("/");
//   };
//   render() {
//     return (
//       <div>
//         <div className="page-header">
//           <div className="content-container">
//             <h1 className="page-header__title">Add Uri/Url Link</h1>
//           </div>
//         </div>
//         <div className="content-container">
//           <LinkForm onSubmit={this.onSubmit} />
//         </div>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   startAddLink: (link) => dispatch(startAddLink(link)),
// });

// export default connect(undefined, mapDispatchToProps)(AddLinkPage);
