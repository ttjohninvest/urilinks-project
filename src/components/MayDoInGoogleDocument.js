import React from "react";

class MayDoInGoogleDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //url : this.props.url
    };
  }
  /* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" className="color-white-1 text-size-2- nounderline cursor-pointer" data-show-count="false" title="Share urilinks.com to your twitter news feed">(t)</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */

  render() {
    let encodedURL = encodeURI(this.state.url);
    return (
      <div className="margin-top-115 margin-right-115">
        <a href="https://docs.google.com/document/u/0/?pli=1" target="_blank">
          may do list
          {/* <img className="x__image" src="/images/googledocumentlogo.png" alt="may do list" title="may be used to keep track of a may do list" target="_blank" /> */}
        </a>
      </div>
    );
  }
}

export default MayDoInGoogleDocument;
