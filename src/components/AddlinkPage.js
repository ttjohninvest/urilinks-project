import React,{ useEffect, useState } from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";


export const AddLinkPage = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
        const fetchData = async () => {
          try {
            const db = firebase.database();
            const snapshot = await db.ref(`/users/D9LSg6elood8Yc5gd5oDMp3JNAQ2/links`).once('value');
            if (snapshot.exists()) {
              const data = snapshot.val();
              const count = Object.keys(data).length;
              console.log("count="+count)
              setCount(count);
            } else {
              console.log(0)
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
     if(count < 10) {
     props.startAddLink(link);
     } else {
      console.log("maximum links reached")
     }

     props.history.push("/");
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
