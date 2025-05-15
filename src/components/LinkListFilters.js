import React, { createRef } from "react";
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
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    items: [],
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
    console.log(
      "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUu, e.target.value=" +
        e.target.value
    );
    console.log(
      "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUu, this.props.filters.sortBy=" +
        this.props.filters.sortBy
    );
    console.log("e.target.value=" + e.target.value);

    if (this.props.filters.sortBy === "date") {
      window.localStorage.setItem("searchLinks1", e.target.value);
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", "");
    } else if (this.props.filters.sortBy === "description") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", e.target.value);
      window.localStorage.setItem("searchLinks3", "");
    } else if (this.props.filters.sortBy === "hashtag") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", e.target.value);
    } else {
    }

    if (this.props.filters.sortBy === "hashtag") {
      if (
        e.target.value.trim().length === 1 &&
        e.target.value.trim().match(/^[ -~]$/) &&
        e.target.value.trim() === "#"
      ) {
        this.props.setTextFilter(e.target.value);
      } else if (e.target.value.trim().length > 1) {
        this.props.setTextFilter(e.target.value);
      }
    } else {
      this.props.setTextFilter(e.target.value);
    }

    // window.localStorage.setItem("searchLinks", e.target.value);
    // this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    console.log("sort, e.target.value=" + e.target.value);
    if (e.target.value === "date") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sort", "date");

      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sort", "description");
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("#");
      window.localStorage.setItem("sort", "hashtag");
      this.props.sortByHashTag();
    }
  };

extractHashtags = (text) => {
  console.log("extractHashTags, text=" + text);
  const regex = /#([a-zA-Z0-9_]+)/g;
  const hashtags = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[0]);
  }
  console.log("hashtags=" + JSON.stringify(hashtags));
  return hashtags;
};

removeDuplicates=(arr)=>{
  return [...new Set(arr)];
}

  componentDidMount() {
    let hashtags =  []
    this.props.links.forEach((link)=>{
      //console.log("YYYYYYYYYYYYYYYYYYYYY, link.note="+link.note)
      let x1 = this.extractHashtags(link.note);
      hashtags.push(...x1)
    })
    let hashtags2=this.removeDuplicates(hashtags);
    hashtags2.sort((a, b) => {
           return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
         });
    console.log("YYYYYYYYYYYYYYYYYYYYY, hashtags2="+JSON.stringify(hashtags2))
   
     this.setState(prevState => ({
        items: [...prevState.items, ...hashtags2]
      }));

    const searchLinks1 = window.localStorage.getItem("searchLinks1");
    const searchLinks2 = window.localStorage.getItem("searchLinks2");
    const searchLinks3 = window.localStorage.getItem("searchLinks3");

    const sort = window.localStorage.getItem("sort");
    console.log("componentDidMount, searchLinks1=" + searchLinks1);
    console.log("componentDidMount, searchLinks2=" + searchLinks2);
    console.log("componentDidMount, searchLinks3=" + searchLinks3);
    console.log("componentDidMount, sort=" + sort);
    if (sort === "date") {
      this.props.sortByDate();
    } else if (sort === "description") {
      this.props.sortByDescription();
    } else {
      this.props.sortByHashTag();
    }

    if (sort === "date") {
      this.props.setTextFilter(searchLinks1);
    } else if (sort === "description") {
      this.props.setTextFilter(searchLinks2);
    } else if (sort === "hashtag") {
      if (searchLinks3 === "") this.props.setTextFilter("#");
      else this.props.setTextFilter(searchLinks3);
    }
    if (this.myRef.current) this.myRef.current.focus();
  }

  render() {
    return (
      <div className="content-container border-green-">
        {Array.isArray(this.state.items)?"true":"false"}
        <ul>
          <li>hashtags</li>
          
          {this.state.items.map((hashtag) => {
            return <li>hashtag</li>;
          })}
        </ul>
        <div>{this.state.items}</div>

        {/* <div className="input-group some-component">
          <div className="input-group__item">
            <input
              ref={this.myRef}
              type="text"
              className="text-input text-input-filters"
              placeholder={
                this.props.filters.sortBy === "date"
                  ? "Search for Link(s)"
                  : "Search for Link(s)"
              }
              value={this.props.filters.text}
              onChange={this.onTextChange}
              title={
                this.props.filters.sortBy === "date"
                  ? ""
                  : this.props.filters.sortBy === "description"
                  ? "Search for Link(s) (Please enter link description to find)"
                  : "Search for Link(s) (Please enter Hash Tag to find)"
              }
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
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  links: state.links,
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
