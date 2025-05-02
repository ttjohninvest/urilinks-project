import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const LinkListItem = ({ id, description, Url, note, amount, createdAt }) => {
  const myRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      console.log("Clicked!");
    };

    const element = myRef.current;

    if (element) {
      element.addEventListener("click", handleClick);

      // Cleanup function to remove the event listener
      return () => {
        element.removeEventListener("click", handleClick);
      };
    }
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div className="border-bottom-1">
      <div className="border-blue-">
        <div className="list-item__flex border-green-">
          <div className="border-orange-">
            <h3 className="">
              <a
                ref={myRef}
                className="nounderline text-size-1"
                href={Url}
                target="_blank"
                title={Url}
              >
                {description}
              </a>
            </h3>
          </div>
          <div className="border-orange-">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${id}`}>
                <div>
                  <h3 className="">edit or remove</h3>
                </div>
              </Link>
            </h3>
          </div>
        </div>

        <div className="list-item__sub-title- padding-left-1 text-size-1">
          Entered: {moment(createdAt).format("MMMM Do, YYYY")}
        </div>
      </div>
      <h3 className="list-item__data  text-size-1 font-weight-1">{note}</h3>
    </div>
  );
};

export default LinkListItem;

// import React, {useRef,useEffect} from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import numeral from "numeral";

// //const LinkListItem = ({ id, description, Url, note, amount, createdAt }) => (
//   class LinkListItem extends React.Component {

//     constructor(props) {
//       super(props);
//       // this.state = {
//       //   displayFormat: 1,
//       //   selectedOption: "option1",
//       // };

//       //this.handleOptionChange = this.handleOptionChange.bind(this);
//       const myRef = useRef(null);

//       useEffect(() => {
//         const handleClick = (event) => {
//           console.log('Clicked!');
//         };

//         const element = myRef.current;

//         if (element) {
//           element.addEventListener('click', handleClick);

//           // Cleanup function to remove the event listener
//           return () => {
//             element.removeEventListener('click', handleClick);
//           };
//         }
//       }, []); // Empty dependency array ensures this runs only on mount and unmount
//     }

//     // handleOptionChange = (event) => {
//     //   this.setState({
//     //     selectedOption: event.target.value,
//     //   });
//     // };

//   render() {
//     return(<div className="border-bottom-1">
//       <div className="border-blue-">
//         <div className="list-item__flex border-green-">
//           <div className="border-orange-">
//             <h3 className="">
//               <a
//                 ref={myRef}
//                 className="nounderline text-size-1"
//                 href={this.props.Url}
//                 target="_blank"
//                 title={this.props.Url}
//               >
//                 {this.props.description}
//               </a>
//             </h3>
//           </div>
//           <div className="border-orange-">
//             <h3 className="">
//               <Link className="nounderline  text-size-1" to={`/edit/${this.props.id}`}>
//                 <div>
//                   <h3 className="">edit or remove</h3>
//                 </div>
//               </Link>
//             </h3>
//           </div>
//         </div>

//         <div className="list-item__sub-title- padding-left-1 text-size-1">
//           Entered: {moment(createdAt).format("MMMM Do, YYYY")}
//         </div>
//       </div>
//       <h3 className="list-item__data  text-size-1 font-weight-1">{this.props.note}</h3>
//     </div>)
//   }
//   }

// export default LinkListItem;
