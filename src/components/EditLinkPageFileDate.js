import Constants from "./Constants"
import React from "react";
import { connect } from "react-redux";
import LinkFormFileDate from "./LinkFormFileDate";
import {
  startEditLinkFileDate,
  startRemoveLinkFileDate,
} from "../actions/linksfiledate";

 
  // const baseUrl =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://urilinks.com";

   let baseUrl = ""
  
  if(Constants.NODE_DEV === "development") {
    baseUrl = "http://localhost:3000"
  } else {
    baseUrl = "https://urilinks.com"
  }



export class EditLinkPageFileDate extends React.Component {
  onSubmit = (linkfiledate) => {
    this.props.startEditLinkFileDate(this.props.linkfiledate.id, linkfiledate);

    this.props.history.push("/");
    //window.location.reload()
    window.location.href = baseUrl + "?signup=signup";
  };
  //onRemove = (value,event) => {
  onRemove = () => {
    //remove the links hash tags from the array of hashtags only if each hash tag is only used once
    //event.preventDefault()
    //this.props.hashtags
    //console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR, value="+value)
    this.props.startRemoveLinkFileDate({ id: this.props.linkfiledate.id });
    this.props.history.push("/");
    //window.location.reload()
    window.location.href = baseUrl + "?signup=signup";
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Link FileDate</h1>
          </div>
        </div>
        <div className="content-container">
          <LinkFormFileDate
            link={this.props.linkfiledate}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>
            Remove bookmark
          </button>
          {/* <button className="button button--secondary" onClick={()=>this.onRemove(this.props.filters.text, event)}>
            Remove Link
          </button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  filtersfiledate: state.filtersfiledate,
  linkfiledate: state.linksfiledate.find(
    (linkfiledate) => linkfiledate.id === props.match.params.id,
  ),
  hashtagsfiledate: state.hashtagsfiledate,
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditLinkFileDate: (id, linkfiledate) =>
    dispatch(startEditLinkFileDate(id, linkfiledate)),
  startRemoveLinkFileDate: (data) => dispatch(startRemoveLinkFileDate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLinkPageFileDate);
