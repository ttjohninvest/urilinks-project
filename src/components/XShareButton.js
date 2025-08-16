import React from 'react'

class XShareButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     url : this.props.url
    }
  }

  render(){
    let encodedURL = encodeURI(this.state.url);
    return(
      <div>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        {/* <a href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}`} className="text-size-3 nounderline"><img className="facebooklogo__image" src="/images/facebooklogo.png" title="share on facebook" /></a> */}
        </div>
    )
  }
}

export default XShareButton;