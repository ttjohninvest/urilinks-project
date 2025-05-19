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
} from "../actions/filters";

function ExpandableArray({ mappedDataShort,mappedDataLong, maxLength, ref }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // if (text.length <= maxLength) {
  //   return <p>{text}</p>;
  // }

  const displayedArray = expanded ? mappedDataLong : mappedDataShort;

  return (
    <div>
      <div ref={ref}
        className="flexandwrap" title="your hash tags">
        {displayedArray}
        {!expanded && <span className="text-size-5">...</span>}
      </div>
      <button className="button--link" onClick={toggleExpanded}>
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}

export class LinkListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.myRef = React.createRef();


let hashtags = [];
    this.props.links.forEach((link) => {
      //console.log("YYYYYYYYYYYYYYYYYYYYY, link.note="+link.note)
      let x1 = this.extractHashtags(link.note);
      hashtags.push(...x1);
    });
    let hashtags2 = this.removeDuplicates(hashtags);
    hashtags2.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });

    const mappedDataShort = hashtags2.map((hashtag,index) => {
              if(index < 10)
                 return <div key={index} className="padding-all text-size-5"><a className="nounderline text-color-black" href="#" onClick={()=>this.setit(hashtag,event)} title="click to activate the search with this hashtag.">{hashtag}</a></div>;
              else return false
            })

 const mappedDataLong = hashtags2.map((hashtag,index) => {
              if(index < 200)
                 return <div key={index} className="padding-all text-size-5"><a className="nounderline text-color-black" href="#" onClick={()=>this.setit(hashtag,event)} title="click to activate the search with this hashtag.">{hashtag}</a></div>;
              else return false
            })




     this.state = {
    sort:"hashtag",
    items: [],
    calendarFocused: null,
    mappedDataShort:mappedDataShort,
    mappedDataLong: mappedDataLong,
    loading: true,
    //scrollTop: 0,
    height:0
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
      this.setState({sort:"date"})
      this.props.sortByDate();
    } else if (e.target.value === "description") {
      this.props.setTextFilter("");
      if (this.myRef.current) this.myRef.current.focus();
      window.localStorage.setItem("sort", "description");
      this.setState({sort:"description"})
      this.props.sortByDescription();
    } else if (e.target.value === "hashtag") {
      if (this.myRef.current) this.myRef.current.focus();
      this.props.setTextFilter("#");
      window.localStorage.setItem("sort", "hashtag");
      this.setState({sort:"hashtag"})
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

 

  removeDuplicates = (stringArray) => {
    const stringifiedArray = stringArray.join(" ");
    const lcstring = stringifiedArray.toLowerCase()
    const lcStringArray = lcstring.split(" ")
    return [...new Set(lcStringArray)];
  };

  // handleScroll(event) {
  //   this.setState({
  //     scrollTop: event.target.scrollTop,
  //   });
  // }

 

  componentDidMount() {
    // let hashtags = [];
    // this.props.links.forEach((link) => {
    //   //console.log("YYYYYYYYYYYYYYYYYYYYY, link.note="+link.note)
    //   let x1 = this.extractHashtags(link.note);
    //   hashtags.push(...x1);
    // });
    // let hashtags2 = this.removeDuplicates(hashtags);
    // hashtags2.sort((a, b) => {
    //   return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    // });
    

    // this.setState((prevState) => ({
    //   items: [...prevState.items, ...hashtags2],
    // }));

    //  const mappedData = this.state.items.map((hashtag,index) => {
    //           if(index < 200)
    //              return <div key={index} className="padding-all text-size-5"><a className="nounderline text-color-black" href="#" onClick={()=>this.setit(hashtag,event)} title="click to activate the search with this hashtag.">{hashtag}</a></div>;
    //           else return false
    //         })

    // this.setState({
    //   mappedData: mappedData
    // });

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
      this.setState({sort:"date"})
    } else if (sort === "description") {
      this.props.setTextFilter(searchLinks2);
       this.setState({sort:"description"})
    } else if (sort === "hashtag") {
      this.setState({sort:"hashtag"})
      if (searchLinks3 === "") this.props.setTextFilter("#");
      else this.props.setTextFilter(searchLinks3);
    }

    
    if (this.myRef.current) this.myRef.current.focus();

    //this.scrollableDiv.current.addEventListener('scroll', this.handleScroll);

    // console.log("this.elementRef.current.offsetWidth="+this.elementRef.current.offsetWidth)
    //console.log("this.elementRef.current.clientHeight="+this.elementRef.current.clientHeight)
    // this.props.setTheHashTagDivHeight(this.elementRef.current.clientHeight)
    // console.log("this.elementRef.current.offsetWidth="+this.elementRef.current.clientWidth)
    // console.log("this.elementRef.current.offsetHeight="+this.elementRef.current.clientHeight)
    // this.props.setTheHashTagDivHeight(this.height)

     //this.updateHeight();
     console.log("1 OOOOOOOOOOOOOOOOOOOOO height="+this.state.height)
    this.props.setTheHashTagDivHeight(this.state.height)

    
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.updateHeight();
    }
  }

   updateHeight = () => {
    const height = this.elementRef.current.offsetHeight;
    console.log("2 OOOOOOOOOOOOOOOOOOOOO height="+height)
    this.setState({ height });
  };

  //   componentWillUnmount() {
  //   this.scrollableDiv.current.removeEventListener('scroll', this.handleScroll);
  // }

  setit=(value,event)=>{
    event.preventDefault()
    //this.props.setTextFilter(e.target.value);
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP, value="+value)
    // console.log("hashtag="+hashtag)
    // console.log("hashtag="+e.target.value)

    
    this.props.setTextFilter(value);
    
   
  }

  toggleExpanded = () => {
    //setExpanded(!expanded);
    this.setState({expanded:!this.state.expanded})
  };

  

  render() {
      // const mappedData = this.state.items.map((hashtag,index) => {
      //         if(index < 200)
      //            return <div key={index} className="padding-all text-size-5"><a className="nounderline text-color-black" href="#" onClick={()=>this.setit(hashtag,event)} title="click to activate the search with this hashtag.">{hashtag}</a></div>;
      //         else return false
      //       })
             
    return (
      <div className="content-container border-green-">
         <div>
         
          <ExpandableArray mappedDataShort={this.state.mappedDataShort} mappedDataLong={this.state.mappedDataLong} maxLength={10} ref={this.elementRef} />
          
        </div>

       {/* <div ref={this.elementRef}
        className="flexandwrap" title="your hash tags">
         
             {this.state.mappedData} 
        </div> */}

        
       
        
        
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
              //value={this.props.filters.text}
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
        </div>
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
