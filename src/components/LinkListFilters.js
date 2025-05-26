import React, { useState, createRef } from "react";

import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByDate,
  sortByDescription,
  sortByHashTag,
  setStartDate,
  setEndDate,
  sortByNoteText,
} from "../actions/filters";

function ExpandableArray({
  mappedDataShort,
  mappedDataLong,
  maxLength,
  ref,
  morehashtags,
}) {
  const [expanded, setExpanded] = useState(morehashtags);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    console.log("morehashtags");
    window.localStorage.setItem("morehashtags", !expanded);
  };

  console.log("ExpandableArray, expanded="+expanded)
  console.log("ExpandableArray, mappedDataLong.length="+mappedDataLong.length)
  console.log("ExpandableArray, mappedDataShort.length="+mappedDataShort.length)
  let displayedArray
  if(expanded===true)
    displayedArray = mappedDataLong
  else displayedArray = mappedDataShort

  return (
    <div>
      <div className="flexrow2c padding-around" title="You may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag."><span className="is-active ib right-margin-1 margin-right-1">{displayedArray.length}</span>hash tags in alphabetical order where each one is clickable</div>
      <div ref={ref} className="flexandwrap margin-top-1" title="You may click on any of these hash tags you have entered in the note section of your link earlier to find your links that are grouped by hash tag.">
        {displayedArray}
        {!expanded && <span className="text-size-5">...</span>}
      </div>
      <button className="button-m button--link" onClick={toggleExpanded}>
        {expanded ? "Show Less Hashtags" : "Show More Hashtags"}
      </button>
    </div>
  );
}

export class LinkListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.SHORT_HASHTAG_LENGTH = 30;
    this.elementRef = React.createRef();
    this.myRef = React.createRef();

    
    let morehashtags = window.localStorage.getItem("morehashtags");
    console.log("constructor, LinkListFilter, morehashtags=" + morehashtags);
    this.state = {
      sort: "hashtag",
      items: [],
      calendarFocused: null,
      mappedDataShort: [],
      mappedDataLong: [],
      loading: true,
      //scrollTop: 0,
      height: 0,
      hashtags:[],
      hashtags2:[],
      morehashtags: morehashtags === "true" ? true : false,
    };

    this.setit = this.setit.bind(this);
    //this.handleScroll = this.handleScroll.bind(this);
  }

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
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "description") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", e.target.value);
      window.localStorage.setItem("searchLinks3", "");
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "hashtag") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", e.target.value);
      window.localStorage.setItem("searchLinks4", "");
    } else if (this.props.filters.sortBy === "notetext") {
      window.localStorage.setItem("searchLinks1", "");
      window.localStorage.setItem("searchLinks2", "");
      window.localStorage.setItem("searchLinks3", "");
      window.localStorage.setItem("searchLinks4", e.target.value);
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
      this.setState({ sort: "date" });
      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sort", "description");
      this.setState({ sort: "description" });
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("#");
      window.localStorage.setItem("sort", "hashtag");
      this.setState({ sort: "hashtag" });
      this.props.sortByHashTag();
    } else if (e.target.value === "notetext") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("");
      window.localStorage.setItem("sort", "notetext");
      this.setState({ sort: "notetext" });
      this.props.sortByNoteText();
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

  removeDuplicates = (stringArray) => {
    const stringifiedArray = stringArray.join(" ");
    const lcstring = stringifiedArray.toLowerCase();
    const lcStringArray = lcstring.split(" ");
    return [...new Set(lcStringArray)];
  };

  componentDidMount() {

    this.props.setTheHashTagDivHeight(this.state.height);
    const morehashtags = window.localStorage.getItem("morehashtags");

    


    const searchLinks1 = window.localStorage.getItem("searchLinks1");
    const searchLinks2 = window.localStorage.getItem("searchLinks2");
    const searchLinks3 = window.localStorage.getItem("searchLinks3");
    const searchLinks4 = window.localStorage.getItem("searchLinks4");

    console.log("componentDidMount, searchLinks1=" + searchLinks1);
    console.log("componentDidMount, searchLinks2=" + searchLinks2);
    console.log("componentDidMount, searchLinks3=" + searchLinks3);
    console.log("componentDidMount, searchLinks4=" + searchLinks4);

    const sort = window.localStorage.getItem("sort");
    console.log("componentDidMount, sort=" + sort);
    if (sort === "date") {
      this.props.sortByDate();
    } else if (sort === "description") {
      this.props.sortByDescription();
    } else if (sort === "hashtag") {
      this.props.sortByHashTag();
    } else if (sort === "notetext") {
      this.props.sortByNoteText();
    }

    if (sort === "date") {
      this.props.setTextFilter(searchLinks1);
      this.setState({ sort: "date" });
    } else if (sort === "description") {
      this.props.setTextFilter(searchLinks2);
      this.setState({ sort: "description" });
    } else if (sort === "notetext") {
      this.props.setTextFilter(searchLinks4);
      this.setState({ sort: "notetext" });
    } else if (sort === "hashtag") {
      this.setState({ sort: "hashtag" });
      if (searchLinks3 === "") this.props.setTextFilter("#");
      else this.props.setTextFilter(searchLinks3);
    }

    if (this.myRef.current) this.myRef.current.focus();

   

    let hashtags=[]

    //if(this.props.links.length>0) {
    this.props.links.forEach((link) => {
      //console.log("YYYYYYYYYYYYYYYYYYYYY, link.note="+link.note)
      let x1 = this.extractHashtags(link.note);
      hashtags.push(...x1);
    });
    
  
    // let hashtags2 = this.removeDuplicates(hashtags);
    // hashtags2.sort((a, b) => {
    //   return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    // });
   
    let htshort=[]
      htshort = hashtags.map((hashtag, index) => {
        if (index < this.SHORT_HASHTAG_LENGTH)
          return (
            <div key={index} className="padding-all text-size-5">
              {/* <a
                className="nounderline text-color-black"
                href="#"
                onClick={() => this.setit(hashtag, event)}
                title="click to activate the search with this hashtag."
              > */}
                {hashtag}
              {/* </a> */}
            </div>
          );
        else return false;
      });
    
      //let htlong = []
      
      // htlong = hashtags2.map((hashtag, index) => {
      //   if (index < 200)
      //     return (
      //       <div key={index} className="padding-all text-size-5">
      //         <a
      //           className="nounderline text-color-black"
      //           href="#"
      //           onClick={() => this.setit(hashtag, event)}
      //           title="click to activate the search with this hashtag."
      //         >
      //           {hashtag}
      //         </a>
      //       </div>
      //     );
      //   else return false;
      // });

    //   this.setState({
    //   mappedDataLong:htlong
    // })

     this.setState({
      mappedDataShort:hashtags,
      // mappedDataLong,
      morehashtags: morehashtags === "true" ? true : false,
    });
    

    // this.setState(()=>{return{
    //   mappedDataShort,
    //   mappedDataLong,
    //   morehashtags: morehashtags === "true" ? true : false,
    // }});

    //  this.setState({
    //   // mappedDataShort,
    //   // mappedDataLong,
    //   morehashtags: morehashtags === "true" ? true : false,
    // });
    const thePos = parseInt(window.localStorage.getItem("scrollY"));
    window.scrollTo(0, thePos);
  }

  componentWillUnmount() {
    // this.setState({
    //   mappedDataShort:[],
    //   mappedDataLong:[],
    //   morehashtags: false,
    // });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.updateHeight();
    }
  }

  updateHeight = () => {
    const height = this.elementRef.current.offsetHeight;
    console.log("2 OOOOOOOOOOOOOOOOOOOOO height=" + height);
    this.setState({ height });
  };

  setit = (value, event) => {
    event.preventDefault();
    //value is the user selected hashtag
    this.props.setTextFilter(value);
    window.localStorage.setItem("scrollY",window.scrollY)

    document.querySelector('#link-summary-id').scrollIntoView({
    behavior: 'smooth',
})
  };

  // useEffect(() => {
  //   const hasRefreshed = sessionStorage.getItem('hasRefreshed');
  //   if (!hasRefreshed) {
  //     sessionStorage.setItem('hasRefreshed', 'true');
  //     window.location.reload();
  //   }
  // }, []);

  refreshIt=()=>{
    window.location.reload();
  }

  render() {
    return (
      <div className="content-container border-green-">
        

        <div>
          {(((this.state.mappedDataShort && this.state.mappedDataShort.length > 1) 
          || (this.state.mappedDataLong && this.state.mappedDataLong.length > 1)))
          && <ExpandableArray
            mappedDataShort={this.state.mappedDataShort}
            mappedDataLong={this.state.mappedDataLong}
            maxLength={this.SHORT_HASHTAG_LENGTH}
            ref={this.elementRef}
            morehashtags={this.state.morehashtags}
          />} {/*:this.refreshIt()}*/}
        </div>

        <div className="input-group some-component">
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
              //value={this.state.sort}
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
              //value={this.state.sort}
              onChange={this.onSortChange}
              title="Date: Sorts into descending order (latest entered first), Link Text: Search By Uri/Url Link Text, or Hash Tag: Search By Hash Tag"
            >
              <option value="hashtag" title="search by hash tag">
                Hash Tag
              </option>

              <option
                value="description"
                title="search through the uri/url link texts"
              >
                Link Text
              </option>

              <option value="notetext" title="search through the notes">
                Note Text
              </option>
              <option
                value="date"
                title="search through the uri/url link texts with a date range"
              >
                Date
              </option>
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
  links: state.links,
  //newAccount: state.newAccount,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByDescription: () => dispatch(sortByDescription()),
  sortByHashTag: () => dispatch(sortByHashTag()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByNoteText: () => dispatch(sortByNoteText()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkListFilters);
