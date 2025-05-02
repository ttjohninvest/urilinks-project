import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";


const LinkList = (props) => {
  const [selectedOption, setSelectedOption] = useState("option1")

  const handleOptionChange = (event) => {
    console.log("handleOptionChange")
      setSelectedOption(event.target.value)
    
  };

  return (
      <div className="content-container">
        <div className="list-header list-header__flex- border-green-">
          <div className="show-for-desktop">Uri/Url Link(s)</div>
          <div className="list-header__flex">
                <div>
                  <label className="inline-block__flex">
                    <input
                      className="the-inline-block"
                      type="radio"
                      value="option1"
                      checked={props.selectedOption === "option1"}
                      onChange={handleOptionChange}
                    />
                    <span className="the-inline-block label-text label-text-right">links list with details</span>
                  </label>
                </div>
                <div className="margin-left-1">
                  <label className="inline-block__flex">
                    <input
                      className="the-inline-block"
                      type="radio"
                      value="option2"
                      checked={props.selectedOption === "option2"}
                      onChange={handleOptionChange}
                    />
                    <span className="the-inline-block label-text">links list with out details</span>
                  </label>
                </div>
              
                
              </div>
        </div>
        
        
        {props.selectedOption === "option1" ? (
          <div className="list-body border-green-">
            {props.links.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No links</span>
              </div>
            ) : (
              props.links.map((link) => {
                return <LinkListItem key={link.id} {...link} />;
              })
            )}
          </div>
        ) : (
          <div className="list-body-2 margin-top-1">
            {props.links.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No links</span>
              </div>
            ) : (
              props.links.map((link) => {
                return <LinkListItem2 key={link.id} {...link} />;
              })
            )}
          </div>
        )}
      </div>
    );
  
}

const mapStateToProps = (state) => {
  return {
    links: selectLinks(state.links, state.filters),
  };
};

export default connect(mapStateToProps)(LinkList);




// import React, { useState,useEffect } from "react";
// import { connect } from "react-redux";
// import LinkListItem from "./LinkListItem";
// import LinkListItem2 from "./LinkListItem2";
// import selectLinks from "../selectors/links";

// class LinkList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displayFormat: 1,
//       selectedOption: "option1",
//     };

//     this.handleOptionChange = this.handleOptionChange.bind(this);
//   }

//   handleOptionChange = (event) => {
//     this.setState({
//       selectedOption: event.target.value,
//     });
//   };

//   render() {
//     return (
//       <div className="content-container">
//         <div className="list-header list-header__flex- border-green-">
//           <div className="show-for-desktop">Uri/Url Link(s)</div>
//           <div className="list-header__flex">
//                 <div>
//                   <label className="inline-block__flex">
//                     <input
//                       className="the-inline-block"
//                       type="radio"
//                       value="option1"
//                       checked={this.state.selectedOption === "option1"}
//                       onChange={this.handleOptionChange}
//                     />
//                     <span className="the-inline-block label-text label-text-right">links list with details</span>
//                   </label>
//                 </div>
//                 <div className="margin-left-1">
//                   <label className="inline-block__flex">
//                     <input
//                       className="the-inline-block"
//                       type="radio"
//                       value="option2"
//                       checked={this.state.selectedOption === "option2"}
//                       onChange={this.handleOptionChange}
//                     />
//                     <span className="the-inline-block label-text">links list with out details</span>
//                   </label>
//                 </div>
              
                
//               </div>
//         </div>
        
        
//         {this.state.selectedOption === "option1" ? (
//           <div className="list-body border-green-">
//             {this.props.links.length === 0 ? (
//               <div className="list-item list-item--message">
//                 <span>No links</span>
//               </div>
//             ) : (
//               this.props.links.map((link) => {
//                 return <LinkListItem key={link.id} {...link} />;
//               })
//             )}
//           </div>
//         ) : (
//           <div className="list-body-2 margin-top-1">
//             {this.props.links.length === 0 ? (
//               <div className="list-item list-item--message">
//                 <span>No links</span>
//               </div>
//             ) : (
//               this.props.links.map((link) => {
//                 return <LinkListItem2 key={link.id} {...link} />;
//               })
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     links: selectLinks(state.links, state.filters),
//   };
// };

// export default connect(mapStateToProps)(LinkList);





 