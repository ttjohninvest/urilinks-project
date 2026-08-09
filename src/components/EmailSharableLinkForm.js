const LIST_ALL_PUBLIC_LINKS = false;

import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

class EmailSharableLinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showpublic: props.link ? props.link.showpublic : 0,
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

  onShowpublicChange = (e) => {
    const showpublic = e.target.checked;
    console.log("onShowpublicChange, showpublic=" + showpublic);
    this.setState(() => ({ showpublic }));
  };

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

  getUsableDomain = (d) => {
    //www and three dots
    //not www and three dots
    console.log("d=" + d);
    let s1 = d;
    const d1 = d.split(".");
    const dotsCount = s1.split(".").length - 1;
    console.log("d1=" + JSON.stringify(d1));
    console.log("dotsCount=" + dotsCount);
    console.log(d1[0]);
    console.log(d1[1]);
    console.log(d1[2]);
    console.log(d1[1] + d1[2]);
    console.log(d1[1] + "." + d1[2]);
    ////
    //s1=d1[1]+"."+d1[2]
    //console.log("d1[1].d1[2]="+s1)
    if (s1.substring(0, 4) === "www") {
      console.log(1);
    } else if (dotsCount === 1) {
      console.log(2);
    } else if (dotsCount === 2) {
      console.log(3);
      s1 = d1[1] + "." + d1[2];
    } else if (dotsCount === 3) {
      console.log(4);
      s1 = d1[2] + "." + d1[3];
    } else if (dotsCount === 4) {
      console.log(5);
      s1 = d1[3] + "." + d1[4];
    } else if (dotsCount === 4) {
      console.log(6);
      s1 = d1[4] + "." + d1[5];
    } else if (dotsCount === 5) {
      console.log(7);
      s1 = d1[5] + "." + d1[6];
    } else if (dotsCount === 6) {
      console.log(8);
      s1 = d1[6] + "." + d1[7];
    } else if (dotsCount === 7) {
      console.log(9);
      s1 = d1[7] + "." + d1[8];
    } else if (dotsCount === 8) {
      console.log(10);
      s1 = d1[8] + "." + d1[9];
    }
    console.log(11);
    console.log("s1=" + s1);
    return s1;
  };

  extractDomain(url) {
    try {
      const urlObject = new URL(url);
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>, urlObject.hostname=" +
          urlObject.hostname,
      );
      const usableDomain = this.getUsableDomain(urlObject.hostname);
      console.log("usableDomain=" + usableDomain);
      return "https://" + usableDomain;
      //return "https://" + urlObject.hostname;
    } catch (error) {
      // Handles cases where the URL is invalid
      return null;
    }
  }

  getFaviconUrl(url) {
    const linkElements = document.getElementsByTagName("link");
    for (let i = 0; i < linkElements.length; i++) {
      const rel = linkElements[i].getAttribute("rel");
      if (rel && (rel.includes("icon") || rel.includes("shortcut icon"))) {
        return linkElements[i].getAttribute("href");
      }
    }

    // If no link tag is found, return the default favicon URL
    return new URL("/favicon.ico", url).href;
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
    let faviconURL;

    let str = this.state.Url.trim();
    if (str.substring(0, 7) === "http://") {
    } else if (str.substring(0, 8) === "https://") {
    } else str = "https://" + str;
    const newDomain = this.extractDomain(str);
    console.log("newDomain=" + newDomain);
    //return
    //faviconURL = this.extractDomain(str) + "/favicon.ico";
    faviconURL = newDomain + "/favicon.ico";
    //return
    //const url = new URL(this.state.Url);
    //const faviconURL = `${url.protocol}//${url.host}/favicon.ico`;
    //const faviconURL = this.getFavicon(this.state.Url)
    console.log(
      "1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP favicon.ico = " + faviconURL,
    );
    console.log(
      "1 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP this.getFaviconUrl(this.state.Url) = " +
        this.getFaviconUrl(this.state.Url),
    );
    console.log("onSubmit, this.state.note=" + this.state.note);
    if (!this.state.description || !this.state.Url) {
      // || !this.state.amount) {
      this.setState(() => ({
        error:
          "Please provide link text and uri/url link. The note with hash tags (i.e. #church, #mountains) is optional.",
      }));
    } else {
      if (this.state.note.trim()) {
        console.log("2 extractHashTags, this.state.note=" + this.state.note);
        // this.setState({
        //  hashTags:this.extractHashtags(this.state.note)
        // })
        console.log(
          "hashTags=" + JSON.stringify(this.extractHashtags(this.state.note)),
        );
        const extractHashtags = this.extractHashtags(this.state.note);
        //I need to write the hashtags to the database here for the logged in user
        console.log(
          "I need to write the hashtags to the database here for the logged in user",
        );
      } else {
        console.log("extractHashTag, note=empty string");
      }

      if (this.state.Url.length > 50) {
      } else {
      }

      // str=this.state.Url
      // if (this.state.Url.substring(0, 7) === 'http://')
      //  {}

      // else if (this.state.Url.substring(0, 8) === 'https://')
      // {}
      // else str = 'https://' + str;

      console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII, str=" + str);

      this.setState(() => ({ error: "" }));

      this.props.onSubmit({
        showpublic: this.state.showpublic,
        description: this.state.description,
        Url: str,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        faviconURL: faviconURL,
      });
    }
  };
  render() {
    return (
      <form className="form form-bg" onSubmit={this.onSubmit}>
        {this.state.error && (
          <p className="form__error flexrow2w">{this.state.error}</p>
        )}
        {LIST_ALL_PUBLIC_LINKS === true && (
          <div className="flexrowz9">
            <input
              id="showpublicid"
              //name="showpublicname"
              type="checkbox"
              ////placeholder="Uri/Url Link Text, example: gmail or gmail.com or any good title of your choosing"
              //placeholder=""
              checked={this.state.showpublic === true ? "checked" : ""}
              autoFocus
              className="ib largerCheckbox"
              value="show the public" //{this.state.showpublic}
              onChange={this.onShowpublicChange}
              title="check to show the link to the public"
              //maxLength=""
            />
            <label className="ib" htmlFor="showpublicid">
              <span className="ib margin-left-11">show the public</span>
            </label>
          </div>
        )}
        <input
          type="text"
          placeholder="text"
          //readOnly={this.props.makereadonly===true?true:false}
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          title="After the data is entered, click send mail."
          maxLength="2048"
        />
        <input
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="url"
          className="text-input"
          value={this.state.Url}
          onChange={this.onUrlChange}
          maxLength="2048"
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
          //placeholder="Add a note for your uri/url link (optional)"
          placeholder="Add a note (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
          maxLength={
            !!this.props.theplan.plan && this.props.theplan.plan.replace(/"/g, "") === "free" ? 2048 : 2048
          } //"2300"
        ></textarea>
        <div>
          <button className="button-2w border5 pointereventsauto">
            Email Link
          </button>
          {/* <button className="button">Save Uri/Url Link</button> */}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  theplan: state.theplan,
});

export default connect(mapStateToProps, undefined)(EmailSharableLinkForm);
