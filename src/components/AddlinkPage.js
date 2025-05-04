import React,{ useEffect, useState } from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";


export const AddLinkPage = (props) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState('');
  const [maximumPage, setMaximumPage] = useState(false);
  
  useEffect(() => {

       const fetchData = async () => {
          try {
            const user = firebase.auth().currentUser;
            if (user) {
              const uid = user.uid;
              setUserId(uid)
              console.log("User ID:", uid);
            } else {
               console.log("No user is currently logged in.");
            }
            const db = firebase.database();
            const snapshot = await db.ref(`/users/${user.uid}/links`).once('value');
            if (snapshot.exists()) {
              const data = snapshot.val();
              const count = Object.keys(data).length;
              console.log("count="+count)
              setCount(count);
            } else {
              console.log("else part, count="+0)
              setCount(0)
              
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setCount(-1); // Indicate an error
          }
        };
    
        fetchData();
}, []);

const  onSubmit = (link) => {
     console.log("in onSubmit")
     if(count < 34) {
     props.startAddLink(link);
     } else {
      console.log("maximum links reached")
      setMaximumPage(true)
     }

     props.history.push("/");
  };
 
    return (
      <div>
        {!maximumPage?<div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Uri/Url Link</h1>
          </div>
        </div>
        <div className="content-container">
          <LinkForm onSubmit={onSubmit} />
        </div>:<div>maximum</div>}
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
