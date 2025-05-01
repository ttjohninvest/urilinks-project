
import React, { useState } from 'react';
import { connect } from "react-redux";
import LinkListItem from "./LinkListItem";
import LinkListItem2 from "./LinkListItem2";
import selectLinks from "../selectors/links";

class LinkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFormat: 1,
      selectedValue: 'option1'
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  

  handleRadioChange = (event) => {
    console.log(event.target)
  this.setState(prevState => ({
    selectedValue: event.target.value
  }));
  }
  
  render() {
    return (
      <div className="content-container">
    <div className="list-header">
      <div className="show-for-desktop">Link(s)

      <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={this.state.selectedValue === "option1"}
          onChange={this.handleRadioChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={this.state.selectedValue === "option2"}
          onChange={this.handleRadioChange}
        />
        Option 2
      </label>
      <p>Selected value: {this.state.selectedValue}</p>
    </div>

      </div>
    </div>
    {this.state.displayFormat===1?<div className="list-body">
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
    :<div className="list-body-2">
      {this.props.links.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No links</span>
        </div>
      ) : (
        this.props.links.map((link) => {
          return <LinkListItem2 key={link.id} {...link} />;
        })
      )}
    </div>}
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