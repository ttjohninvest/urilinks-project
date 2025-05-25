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
      hashTags: [],
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

  extractHashtags=(text)=>{
    console.log("extractHashTags, text="+text)
  const regex = /#([a-zA-Z0-9_]+)/g;
  const hashtags = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[0]);
  }
  console.log("hashtags="+JSON.stringify(hashtags))
  return hashtags;
}

extractDomain(url) {
  try {
    const urlObject = new URL(url);
    return "https://"+urlObject.hostname;
  } catch (error) {
      // Handles cases where the URL is invalid
    return null;
  }
}

getFaviconUrl(url) {
  const linkElements = document.getElementsByTagName('link');
  for (let i = 0; i < linkElements.length; i++) {
    const rel = linkElements[i].getAttribute('rel');
    if (rel && (rel.includes('icon') || rel.includes('shortcut icon'))) {
      return linkElements[i].getAttribute('href');
    }
  }

  // If no link tag is found, return the default favicon URL
  return new URL('/favicon.ico', url).href;
}



  onSubmit = (e) => {
    
    // const hts = extractHashtags(this.state.note)
    // console.log("onSubmit, extractHashTags, hashTags="+JSON.stringify(hts))
    e.preventDefault();
    console.log("onSubmit");
    const faviconURL = this.extractDomain(this.state.Url)+"/favicon.ico"
    //const url = new URL(this.state.Url);
    //const faviconURL = `${url.protocol}//${url.host}/favicon.ico`;
    //const faviconURL = this.getFavicon(this.state.Url)
    console.log("1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP favicon.ico = "+faviconURL)
    console.log("1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP this.getFaviconUrl(this.state.Url) = "+this.getFaviconUrl(this.state.Url))
    console.log("onSubmit, this.state.note="+this.state.note)
    if (!this.state.description || !this.state.Url) { // || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount.",
      }));
    } else {
      if(this.state.note.trim()) {
        console.log("2 extractHashTags, this.state.note="+this.state.note)
          // this.setState({
          //  hashTags:this.extractHashtags(this.state.note)
          // })
          console.log("hashTags="+JSON.stringify(this.extractHashtags(this.state.note)))
          const extractHashtags = this.extractHashtags(this.state.note)
          //I need to write the hashtags to the database here for the logged in user
          console.log("I need to write the hashtags to the database here for the logged in user")
          
      } else {
          console.log("extractHashTag, note=empty string")
      }

      if(this.state.Url.length > 50) {

      } else {

      }

      fetch('https://ulvis.net/api/v1/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
  body: JSON.stringify({
    url: this.state.Url,
  }),
})
  .then(response => response.json())
  .then(data => 
    {
      console.log(data)
      this.setState(() => ({ error: "" }));

      this.props.onSubmit({
        description: this.state.description,
        Url: data.shortUrl,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        faviconURL:faviconURL,
      });
    }).catch(()=>{
    console.log("Error: the link was not shortened")
  })

  //  this.setState(() => ({ error: "" }));

  //     this.props.onSubmit({
  //       description: this.state.description,
  //       Url: this.state.Url,
  //       amount: parseFloat(this.state.amount, 10) * 100,
  //       createdAt: this.state.createdAt.valueOf(),
  //       note: this.state.note,
  //       faviconURL:faviconURL,
  //     });
      
      
     
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
