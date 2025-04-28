import React from "react";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startAddLink } from "../actions/links";

export class AddLinkPage extends React.Component {
  onSubmit = (link) => {
    this.props.startAddLink(link);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Link</h1>
          </div>
        </div>
        <div className="content-container">
          <LinkForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddLink: (link) => dispatch(startAddLink(link)),
});

export default connect(undefined, mapDispatchToProps)(AddLinkPage);
