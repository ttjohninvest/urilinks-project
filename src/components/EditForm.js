const LIST_ALL_PUBLIC_LINKS = false;

import React from "react";
import { connect } from "react-redux";
import firebase from "firebase/app"
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import StorageSizes from "./StorageSizes";

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    //  old one
    //  this.state.link = { //this one works, for some reason the note was not including the hashtag with the new one so i updated the note with the old one
    //       showpublic: props.link ? props.link.showpublic : 0,
    //       description: props.link ? props.link.description : "",
    //       addescription: props.link && !!props.link.addescription===true ? props.link.addescription : "",
    //       Url: props.link ? props.link.Url : "",
    //       AdUrl: props.link && !!props.link.AdUrl ? props.link.AdUrl : "",
    //       note: props.link ? props.link.note : "",
    //       amount: 0, //props.link ? (props.link.amount / 100).toString() : "",
    //       createdAt: props.link ? moment(props.link.createdAt) : moment(),
    //       calendarFocused: false,
    //       error: "",
    //       hashTags: [],
    //     };
    //props.match.params.id
    //new one
    this.state = {
      // showpublic: props.link ? props.link.showpublic : 0,
      // description: props.link ? props.link.description : "",
      // addescription: props.link && !!props.link.addescription===true ? props.link.addescription : "",
      // Url: props.link && !!props.link.Url === true ? props.link.Url : "",
      // adUrl: props.link && !!props.link.adUrl ? props.link.adUrl : "",
      // buyerdiscountcode: props.link && !!props.link.buyerdiscountcode ? props.link.buyerdiscountcode : "",
      // note: props.link ? props.link.note : "",
      // amount: 0, //props.link ? (props.link.amount / 100).toString() : "",
      // createdAt: props.link && !!props.link.createdAt ? moment(props.link.createdAt) : moment(),
      // calendarFocused: false,
      // error: "",
      // hashTags: [],

      link: null,
      loading: true
    };
  }

  componentDidMount() {
    //do a fetch call to get the link data
    //const id = this.props.match.params.id;
    const id = this.props.id
    const uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref(`users/${uid}/links/${id}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            link: {
              id: snapshot.key,
              ...snapshot.val()
            },
            loading: false
          });
        } else {
          this.setState({ loading: false });
        }
      });
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

   onAdDescriptionChange = (e) => {
    const addescription = e.target.value;
    this.setState(() => ({ addescription }));
  };

  onUrlChange = (e) => {
    const Url = e.target.value;
    this.setState(() => ({ Url }));
  };

   onUrlChange2 = (e) => {
    const adUrl = e.target.value;
    this.setState(() => ({ adUrl }));
  };

    onBuyerDiscountCode = (e) => {
    const buyerdiscountcode = e.target.value;
    this.setState(() => ({ buyerdiscountcode }));
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
    if(value==="") return true
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

  onSubmit = (e) => {
    e.preventDefault();


    const theUrl = this.state.link.Url.trim();
    const theAddUrl = this.state.link.adUrl.trim();
  

    if (!this.isValidUrl1(theUrl)) {
    alert("Please enter a valid non ad URL, such as https://wikipedia.org");
    return;
  }

  if (!this.isValidUrl2(theAddUrl)) {
    alert("Please enter a valid ad URL, such as https://www.amazon.com/dp/B0D1XD1ZV3 or no ad url at all.");
    return;
  }

 

    console.log("onSubmit");
    let faviconURL;

    let str = this.state.link.Url.trim();
    if (str.substring(0, 7) === "http://") {
    } else if (str.substring(0, 8) === "https://") {
    } else str = "https://" + str;
    const newDomain = this.extractDomain(str);
    console.log("newDomain=" + newDomain);
    //return
    //faviconURL = this.extractDomain(str) + "/favicon.ico";
    faviconURL = newDomain + "/favicon.ico";
    //return
    //const url = new URL(this.link.Url);
    //const faviconURL = `${url.protocol}//${url.host}/favicon.ico`;
    //const faviconURL = this.getFavicon(this.state.link.Url)

    let str2 = this.state.link.adUrl.trim();
    if (str2.substring(0, 7) === "http://") {
    } else if (str2.substring(0, 8) === "https://") {
    } 
    if(!!this.state.link.buyerdiscountcode.trim())
    {
        if(!str2.includes(this.state.link.buyerdiscountcode.trim())) {
            //for different website vendors, their will be a different vendoraccountid,
            //so code will need to be added here to determine the vendor url do the vendoraccountid is 
            //not hard coded to vendoraccountid. Right now it is.
            //my code calls the vendoraccountid a buyerdiscountcode
      
            if(this.state.link.adUrl.trim().includes("amazon.com")) {
               
                str2 += "&tag="+this.state.link.buyerdiscountcode.trim()
           
            } else { //for now, all other vendors are hardcoded to vendoraccountid, but will have to be changed for it to work
                     //because the vendor website won't recognize vendoraccountid unless it uses it
                     //amazon.com uses tag for the account id some vendors use the account id as the vendoraccountid
               if(this.state.link.adUrl.trim().includes("&"))
                {
                    str2 += "&vendoraccountid="+this.state.link.buyerdiscountcode.trim()
                } else {
                    str2 += "?vendoraccountid="+this.state.link.buyerdiscountcode.trim()
                }
            }

          
           

        } else {
            str2+=""
        }
    }
     

    //alert(str2)
    console.log(
      "3 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP favicon.ico = " + faviconURL,
    );
    console.log(
      "3 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP this.getFaviconUrl(this.state.link.Url) = " +
        this.getFaviconUrl(this.state.link.Url),
    );
    console.log("onSubmit, this.state.link.note=" + this.state.link.note);
    if (!this.state.link.description || !this.state.link.Url) {
      // || !this.state.link.amount) {
      this.setState(() => ({
        error:
          "Please provide link text and uri/url link. The note with hash tags (i.e. #church, #mountains) is optional.",
      }));
    } else {
      if (this.state.link.note.trim()) {
        console.log("2 extractHashTags, this.state.link.note=" + this.state.link.note);
        // this.setState({
        //  hashTags:this.extractHashtags(this.state.link.note)
        // })
        console.log(
          "hashTags=" + JSON.stringify(this.extractHashtags(this.state.link.note)),
        );
        const extractHashtags = this.extractHashtags(this.state.link.note);
        //I need to write the hashtags to the database here for the logged in user
        console.log(
          "I need to write the hashtags to the database here for the logged in user",
        );
      } else {
        console.log("extractHashTag, note=empty string");
      }

      if (this.state.link.Url.length > 50) {
      } else {
      }

      // str=this.state.link.Url
      // if (this.state.link.Url.substring(0, 7) === 'http://')
      //  {}

      // else if (this.state.link.Url.substring(0, 8) === 'https://')
      // {}
      // else str = 'https://' + str;

      console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII, str=" + str);

      console.log("LinkForm.js, this.state.id="+this.state.link.id)
      console.log("LinkForm.js, this.state.addescription="+this.state.link.addescription)

      //description, Url, note, addescription, adUrl, buyerdiscountcode) => {
      this.updateCachedAdDescription(this.state.link.id, 
      this.state.link.description, 
      this.state.link.Url, 
      this.state.link.note,
      this.state.link.addescription, 
      this.state.link.adUrl, 
      this.state.link.buyerdiscountcode
    
    
    )

      this.setState(() => ({ error: "" }));

      this.props.onSubmit({
        id:this.props.id,
        showpublic: this.state.link.showpublic,
        description: this.state.link.description,
        addescription: this.state.link.addescription,
        Url: str,
        adUrl: str2,
        buyerdiscountcode:this.state.link.buyerdiscountcode.trim(),
        amount: parseFloat(this.state.link.amount, 10) * 100,
        createdAt: this.state.link.createdAt.valueOf(),
        note: this.state.link.note,
        faviconURL: faviconURL,
      });
    }
  };

  handleChange = (e) => {
  const { name, value } = e.target;

  this.setState((prevState) => ({
    link: {
      ...prevState.link,
      [name]: value,
    },
  }));
};

  render() {
     if (!this.state.link) {
    return <div>Loading...</div>;
  }
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
              checked={this.state.link.showpublic === true ? "checked" : ""}
              autoFocus
              className="ib largerCheckbox"
              value="show the public" //{this.state.link.showpublic}
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
          name="description"
          type="text"
          placeholder="Place link link text here."
          //readOnly={this.props.makereadonly===true?true:false}
          autoFocus
          className="text-input outline-none"
          value={this.state.link && this.state.link.description || ""}
          //onChange={this.onDescriptionChange}
          onChange={this.handleChange}
          title="After the data is entered, click send mail."
          maxLength={StorageSizes.description} //"100" //2048
        />
        <input
          name="Url"
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="url"
          className="text-input outline-none"
          value={this.state.link && this.state.link.Url || ""}
          //onChange={this.onUrlChange}
          onChange={this.handleChange}
          maxLength={StorageSizes.url} //"2048"
        />
        {/* <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.link.amount}
          onChange={this.onAmountChange}
        /> */}
        {/* <SingleDatePicker
          date={this.state.link.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        /> */}
        <textarea
          name="note"
          //placeholder="Add a note for your uri/url link (optional)"
          placeholder="Add a note (optional)"
          className="textarea outline-none"
          value={this.state.link && this.state.link.note || ""}
          //onChange={this.onNoteChange}
          onChange={this.handleChange}
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
          name="addescription"
          type="text"
          placeholder="Place ad link text here."
          //readOnly={this.props.makereadonly===true?true:false}
          //autoFocus
          className="ib text-input outline-none"
          value={this.state.link && this.state.link.addescription || ""}
          //onChange={this.onAdDescriptionChange}
          onChange={this.handleChange}
          title="Enter the link text for the ad. Example: Example For Sale"
          maxLength={StorageSizes.url} //2048
        />
         <input
          name="adUrl"
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="Place ad url here. Example: https://example.com or https://www.example.com"
          className="text-input outline-none"
          value={this.state.link && this.state.link.adUrl || ""}
          //onChange={this.onUrlChange2}
          onChange={this.handleChange}
          maxLength={StorageSizes.url} //"2048"
        />
        <input
          name="buyerdiscountcode"
          type="text"
          ////placeholder="Uri/Url Link, example: https://gmail.com"
          placeholder="(optional field) Place buyer discount code here which is specified as tag=affiliateId. Please check with the affiliate program documentation for your affiliate id, tag might be a different word like coupon; in amazon is is tag=affiliateId. Example: tag=7yuhtgy"
          className="text-input outline-none"
          value={this.state.link && this.state.link.buyerdiscountcode || ""}
          //onChange={this.onBuyerDiscountCode}
          onChange={this.handleChange}
          maxLength="23"
        />
        
        </div>
        </fieldset>
        <div>
          <button className="ib button-2w border5-">Save Link</button>
         
        </div>
      </form>
      {/* <button className="button-2w border5- margin-left-11- margin-bottom-1 ib" onClick={() => this.props.handleClose2()}>3Cancel</button> */}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theplan: state.theplan,
  links: state.links
});

export default connect(mapStateToProps, undefined)(EditForm);
