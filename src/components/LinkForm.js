const LIST_ALL_PUBLIC_LINKS = false;

import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import StorageSizes from "./StorageSizes";

class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showpublic: props.link ? props.link.showpublic : 0,
      description: props.link ? props.link.description : "",
      addescription: props.link ? props.link.addescription : "",
      Url: props.link ? props.link.Url : "",
      AdUrl: props.link ? props.link.AdUrl : "",
      buyerdiscountcode: props.link && !!props.link.buyerdiscountcode ? props.link.buyerdiscountcode : "",
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

     onBuyerDiscountCode = (e) => {
    const buyerdiscountcode = e.target.value;
    this.setState(() => ({ buyerdiscountcode }));
  };


onAdDescriptionChange = (e) => {
    const addescription = e.target.value;
    this.setState(() => ({ addescription }));
  };

   onUrlChange2 = (e) => {
    const AdUrl = e.target.value;
    this.setState(() => ({ AdUrl }));
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

  updateCachedAdDescription = (linkId, description, Url, note, addescription, adUrl, buyerdiscountcode) => {

  const updateValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => updateValue(item));
    }

    if (value && typeof value === "object") {
      const updatedObject = { ...value };

      if (
        value.id === linkId ||
        value.linkid === linkId
      ) {
        console.log(
          "Updating cached addescription:",
          linkId,
          description,
          Url,
          note,
          addescription,
          adUrl,
          buyerdiscountcode

        );

        updatedObject.description = description;
        updatedObject.Url = Url;
        updatedObject.note = note;

        updatedObject.addescription = addescription
        updatedObject.adUrl = adUrl;
        updatedObject.buyerdiscountcode = buyerdiscountcode;
      }

      Object.keys(updatedObject).forEach((property) => {
        updatedObject[property] =
          updateValue(updatedObject[property]);
      });

      return updatedObject;
    }

    return value;
  };

  Object.keys(sessionStorage).forEach((key) => {
    const rawValue = sessionStorage.getItem(key);

    if (!rawValue) return;

    try {
      const parsedValue = JSON.parse(rawValue);

      const updatedValue = updateValue(parsedValue);

      sessionStorage.setItem(
        key,
        JSON.stringify(updatedValue)
      );
    } catch (error) {
      // Ignore sessionStorage values that are not JSON.
    }
  });
};

isValidUrl1 = (value) => {
  try {
   
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

isValidUrl2 = (value) => {
  try {
    if(value==="") return true //the ad url can be blank
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

  onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");


    const theUrl = this.state.Url.trim();
    const theAddUrl = this.state.AdUrl.trim();
  

    if (!this.isValidUrl1(theUrl)) {
    alert("Please enter a valid non ad URL, such as https://wikipedia.org");
    return;
  }

  if (!this.isValidUrl2(theAddUrl)) {
    alert("Please enter a valid ad URL, such as https://www.amazon.com/hz/mobile/mission/?_encoding=UTF8&p=NoXxBNUZD3G2ppDiJRq6e0pUdpujrXr8GFkNKE3OUvbK4ToKMp3%2FSz6NKi5alWetFhWJaufYVHbv%2Fa8XPURQx%2B8pVJs7Rc2wsRZtMELw8FET90xJAk2h4%2BYx4Z0ieVEuOeEyAo1jRw3wvEX1XRwVHP3mEDqdVdBJ3VJ5ejJ0F3S8OJgX%2FeGC3W0pRM%2BF9CF%2BF8Es4wd2mU9nirnJ8mO%2B1k1C5KoI%2BPE%2Bq39h5Sys3BJ4nUH7CdgkUf7mpBmBTFi97CosaLNn2gv%2Bt2R3OTWgRC0KRBE%2BQqc8X%2BJyKq5WORtANDIW9QwshHKMFVILIWEjWSqPJQEYj3MeNGCoGpF60pIKWqzUG4uUx7BwIBUBoloV57kNlDdGZNNzYKHJyrNoiad6TQJeMe1sMnzK0mB9%2BGBpmdkiVgTuCMlTMetltv6LHxzHz4RJMv1nN1TptWsZjpK6YwSDYqwhPhA1fu86LYhSGY3OY3HelslEhawUyy1BMSxqQ90O3%2BZaiEIC%2FHXGOE8R5LkhfUHKUq3Y%2FEeEjICylvCuUJW2w2NXU8gUKweQ5A6H7e88le9YD%2BdoVuiAClLfg022c7ePBAgj5q0msWeYUJS6AiOQxUyV9FwkAQUTsXFCmL6N4eE%2BH5cUeY0vPCXCl7mUM8BjDGgP1pMFelXuK89cZS5xu7nlBj2QXRoVa%2F3RgWpJZC9SAtEaN0LH2gSCVDVzjU5BmaHdBl4T4VeMQ8mffBA2qykD4Xm6eU8%3D");
    return;
  }


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

    let str2 = this.state.AdUrl.trim();
    if (str2.substring(0, 7) === "http://") {
    } else if (str2.substring(0, 8) === "https://") {
    } 
    //else str2 = "https://" + str2;
    if(!!this.state.buyerdiscountcode.trim())
      str2 += "&"+this.state.buyerdiscountcode.trim()

    //return
    //const url = new URL(this.state.Url);
    //const faviconURL = `${url.protocol}//${url.host}/favicon.ico`;
    //const faviconURL = this.getFavicon(this.state.Url)
    
    console.log(
      "3 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP favicon.ico = " + faviconURL,
    );
    console.log(
      "3 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP this.getFaviconUrl(this.state.Url) = " +
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

      console.log("LinkForm.js, this.state.id="+this.state.id)
      console.log("LinkForm.js, this.state.addescription="+this.state.addescription)

      //this.updateCachedAdDescription(this.state.id, this.state.addescription)
       this.updateCachedAdDescription(this.state.link.id, 
      this.state.link.description, 
      this.state.link.Url, 
      this.state.link.note,
      this.state.link.addescription, 
      this.state.link.adUrl, 
      this.state.link.buyerdiscountcode
    
    
    )
     

      console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII, str=" + str);

      this.setState(() => ({ error: "" }));

      this.props.onSubmit({
        showpublic: this.state.showpublic,
        description: this.state.description,
        addescription: this.state.addescription,
        Url: str,
        adUrl: str2,
        buyerdiscountcode:this.state.buyerdiscountcode.trim(),
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        faviconURL: faviconURL,
      });
    }
  };
  render() {
    return (
      <div>
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
              className="ib largerCheckbox outline-none"
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
          className="text-input outline-none"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          title="After the data is entered, click send mail."
          maxLength={StorageSizes.description} //"100" //2048
        />
        <input
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="url"
          className="text-input outline-none"
          value={this.state.Url}
          onChange={this.onUrlChange}
          maxLength={StorageSizes.url} //"2048"
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
          className="textarea outline-none"
          value={this.state.note}
          onChange={this.onNoteChange}
          maxLength={
            !!this.props.theplan.plan &&
            this.props.theplan.plan.replace(/"/g, "") === "free"
              ? StorageSizes.note //1024 //2048
              : StorageSizes.note //1024 //2048
          } //"2300"
        ></textarea>
        <a href="https://emojidb.org/button-emojis" className="ib margin-left-11 margin-top-1- margin-bottom-1" target="_blank">Emoji Selection Link</a>
        <fieldset >
        <legend>Your text ad section</legend>
        <div className="flexcol3">

        
        <input
          type="text"
          placeholder="Place ad link text here."
          //readOnly={this.props.makereadonly===true?true:false}
          //autoFocus
          className="ib text-input outline-none"
          value={this.state.addescription}
          onChange={this.onAdDescriptionChange}
          title="Enter the link text for the ad. Example: Example For Sale"
          maxLength={StorageSizes.description} //"100" //2048
        />
         <input
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="Place ad url here. Example: https://example.com or https://www.example.com"
          className="text-input outline-none"
          value={this.state.AdUrl}
          onChange={this.onUrlChange2}
          maxLength={StorageSizes.url} //"2048"
        />

          <input
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="(optional field) Place buyer discount code here which is specified as tag=affiliateId. Please check with the affiliate program documentation for your affiliate id, tag might be a different word like coupon; in amazon is is tag=affiliateId. Example: tag=7yuhtgy"
          className="text-input outline-none"
          value={this.state.buyerdiscountcode}
          onChange={this.onBuyerDiscountCode}
          maxLength="23"
        />
        
        </div>
        </fieldset>
        <div>
          <button className="ib button-2w border5-">Save Link</button>
         
        </div>
      </form>
      <button className="button-2w border5- margin-left-11- margin-bottom-1 ib" onClick={() => this.props.handleClose2()}>Cancel</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theplan: state.theplan,
});

export default connect(mapStateToProps, undefined)(LinkForm);
