import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByDate,
  sortByDescription,
  sortByHashTag,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class LinkListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    console.log("e.target.value=" + e.target.value);
    window.localStorage.setItem("searchLinks",e.target.value)
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      this.props.sortByHashTag();
    }
  };

 

  componentDidMount() {
    const searchLinks = window.localStorage.setItem("searchLinks")
    if(searchLinks) {
      this.props.setTextFilter(searchLinks);
    }
  }

  render() {
    return (
      <div className="content-container border-green-">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input text-input-filters"
              placeholder={this.props.filters.sortBy==='date'?"":"Search Links"}
              value={this.props.filters.text}
              onChange={this.onTextChange}
              title={this.props.filters.sortBy==='date'?"":this.props.filters.sortBy==='description'?"Search Links (Please enter link description to find)":"Search Links (Please enter Hash Tag to find)"}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select select-filters"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
              title="Date: Sorts into descending order (latest entered first), Link Text: Search By Uri/Url Link Text, or Hash Tag: Search By Hash Tag"
            >
              <option value="date">Date</option>
              <option value="description">Link Text</option>
              <option value="hashtag">Hash Tag</option>
            </select>
          </div>
          <div className="input-group__item- select-filters border-green-">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
