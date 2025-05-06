import React from "react";
import moment from "moment";

export default class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings1: "option1", //props.settings1,
      settings2: "option2", //props.settings2,
      createdAt: moment(), //moment(props.createdAt),
      error: "",
    };
  }
  onSettings1Change = (e) => {
    const settings1 = e.target.value;
    this.setState(() => ({ settings1 }));
  };
  onSettings2Change = (e) => {
    const settings2 = e.target.value;
    this.setState(() => ({ settings2 }));
  };
 
  onSubmit = (e) => {
    console.log("onSubmit");
    e.preventDefault();

    if (!this.state.settings1 || !this.state.settings2) {
      this.setState(() => ({
        error: "Please provide settings1 and settings2.",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        settings1: this.state.settings1,
        settings2: this.state.settings2,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
         Put Settings Here
        <div>
          <button className="button">Save Settings</button>
        </div>
      </form>
    );
  }
}
