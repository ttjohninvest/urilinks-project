import React from 'react'

class XShareButton extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //  url : this.props.url
    // }
  }

  render(){
    //let encodedURL = encodeURI(this.state.url);
    return(
      <div>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" className="color-white-1" data-show-count="false" title="Share urilinks.com to your twitter news feed">T</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
         </div>
    )
  }
}

export default XShareButton;