import React from 'react'

class FBShareButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     url : this.props.url
    }
  }

  render(){
    let encodedURL = encodeURI(this.state.url);
    return(
      <div className="padding-top-55-"><a href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}`} 
      className="text-size-3 nounderline ib" target="_blank">
        <img className="ib facebooklogo__image margin-left-n-11 margin-top-1" src="/images/facebooklogo.png" title="share link on facebook" /></a></div>
    )
  }
}

export default FBShareButton;