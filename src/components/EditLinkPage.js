import React from "react";
import { connect } from "react-redux";
import LinkForm from "./LinkForm";
import { startEditLink, startRemoveLink } from "../actions/links";

export class EditLinkPage extends React.Component {
  onSubmit = (link) => {
    this.props.startEditLink(this.props.link.id, link);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveLink({ id: this.props.link.id });
    this.props.history.push("/");
    window.location.reload()
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Link</h1>
          </div>
        </div>
        <div className="content-container">
          <LinkForm link={this.props.link} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove Link
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  link: state.links.find((link) => link.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditLink: (id, link) => dispatch(startEditLink(id, link)),
  startRemoveLink: (data) => dispatch(startRemoveLink(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLinkPage);
