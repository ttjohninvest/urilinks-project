import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.link ? props.link.description : "",
      Url: props.link ? props.link.Url : "",
      note: props.link ? props.link.note : "",
      amount: 0, //props.link ? (props.link.amount / 100).toString() : "",
      createdAt: props.link ? moment(props.link.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onUrlChange = (e) => {
    const Url = e.target.value;
    this.setState(() => ({ Url }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    console.log("onSubmit");
    e.preventDefault();

    if (!this.state.description || !this.state.Url) { // || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount.",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        Url: this.state.Url,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Uri/Url Link Text, example: gmail or gmail.com or any good title of your choosing"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          title="Uri, Uniform Resource Identifier"
          maxlength="2048"
        />
        <input
          type="text"
          placeholder="Uri/Url Link, example: https://gmail.com"
          className="text-input"
          value={this.state.Url}
          onChange={this.onUrlChange}
        />
        {/* <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        /> */}
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your uri/url link (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
          maxlength="1024"
        ></textarea>
        <div>
          <button className="button">Save Uri/Url Link</button>
        </div>
      </form>
    );
  }
}
