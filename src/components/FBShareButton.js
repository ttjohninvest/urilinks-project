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
      <div><a href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}`} className="text-size-3 nounderline" target="_blank"><img className="facebooklogo__image" src="/images/facebooklogo.png" title="share on facebook" /></a></div>
    )
  }
}

export default FBShareButton;