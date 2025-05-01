import React, { useState } from "react";
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";

class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFormat: 1,
      selectedOption: "option1",
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  render() {
    return (
      <div className="content-container">
        <div className="list-header list-header__flex">
          <div className="show-for-desktop">Link(s)</div>
          <div className="list-header__flex">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="option1"
                      checked={this.state.selectedOption === "option1"}
                      onChange={this.handleOptionChange}
                    />
                    <div className="margin-left-1">links list with details</div>
                  </label>
                </div>
                <div className="margin-left-1">
                  <label>
                    <input
                      type="radio"
                      value="option2"
                      checked={this.state.selectedOption === "option2"}
                      onChange={this.handleOptionChange}
                    />
                    <div className="margin-left-1">links list with out details</div>
                  </label>
                </div>
                {/* <div className="margin-left-1">
                  <label>
                    <input
                      type="radio"
                      value="option3"
                      checked={this.state.selectedOption === "option3"}
                      onChange={this.handleOptionChange}
                    />
                    Option 3
                  </label>
                </div> */}
                
              </div>
        </div>
        
        
        {this.state.selectedOption === "option1" ? (
          <div className="list-body">
            {this.props.links.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No links</span>
              </div>
            ) : (
              this.props.links.map((link) => {
                return <LinkListItem key={link.id} {...link} />;
              })
            )}
          </div>
        ) : (
          <div className="list-body-2">
            {this.props.links.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No links</span>
              </div>
            ) : (
              this.props.links.map((link) => {
                return <LinkListItem2 key={link.id} {...link} />;
              })
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    links: selectLinks(state.links, state.filters),
  };
};

export default connect(mapStateToProps)(LinkList);
