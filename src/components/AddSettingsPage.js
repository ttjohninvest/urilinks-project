import React from "react";
import { connect } from "react-redux";
import SettingsForm from "./SettingsForm";
import { withRouter } from 'react-router-dom';
import { startAddSettings } from "../actions/settings";


export const AddSettingsPage = (props) => {

  const goBack = () => {
    props.history.goBack(); // Navigates back one step in the history
  };

  const  onSubmit = (settings) => {
     console.log("in onSubmit")
    
     props.startAddSettings(settings);
     props.history.push("/");
    
     
  };

  return (
    <div>
     
      
      <div className="page-header">
      <div className="content-container">
          <h1 className="page-header__title">Add Settings</h1>
        </div>
      </div>
      <div className="content-container">
        <SettingsForm onSubmit={onSubmit} />
      </div>
     
      <div><button className="button-style-1- button" onClick={goBack}>Go Back</button></div>
    </div>
  );
 
    
  }


const mapDispatchToProps = (dispatch) => ({
  startAddSettings: (settings) => dispatch(startAddSettings(settings)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(AddSettingsPage));


