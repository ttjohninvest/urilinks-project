import React from "react";
import { connect } from "react-redux";
import EditForm from "./EditForm";
import { startEditLink, startRemoveLink, removeLink } from "../actions/links";

export class EditLinkPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     hideEditForm : false
    }
  }

  onSubmit = (link) => {
    this.props.startEditLink(this.props.link.id, link);

   
    // if (confirm(text) == true) {
       //this.props.history.push("/");
       window.location.href = "https://urilinks.com?signup=signup&z=1";
    //}

    
  };

  handleClose4 = () => {
    //this.setState({ hideEditForm: true }); 
    this.props.history.push("/");
    window.location.href="https://urilinks.com?signup=signup&z=1"
  }
  //onRemove = (value,event) => {
  onRemove = () => {
    //remove the links hash tags from the array of hashtags only if each hash tag is only used once
    //event.preventDefault()
    //this.props.hashtags
    //console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR, value="+value)
    this.props.removeLink({ id: this.props.link.id });
    this.props.startRemoveLink({ id: this.props.link.id });
    this.props.history.push("/");
    //window.location.reload()
    window.location.href = "https://urilinks.com?signup=signup";
  };
  render() {
    return (
      <div>
        {this.state.hideEditForm === false && <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              <span className="ib color-purple- color-black-2">Edit Link</span>
            </h1>
          </div>
        </div>
        <div className="content-container">
          <EditForm
            link={this.props.link}
            onSubmit={this.onSubmit}
            makereadonly={true}
          />
         
        </div>
        </div>}
        <button className="ib button-2w margin-left-11 margin-bottom-1" 
        onClick={() => this.handleClose4()}>Cancel</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  filters: state.filters,
  link: state.links.find((link) => link.id === props.match.params.id),
  hashtags: state.hashtags,
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditLink: (id, link) => dispatch(startEditLink(id, link)),
  startRemoveLink: (data) => dispatch(startRemoveLink(data)),
  removeLink: (data) => dispatch(removeLink(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLinkPage);
