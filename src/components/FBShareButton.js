import React from 'react'

class FBShareButton extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //  url : this.props.url
    // }
  }

  render(){
    let encodedURL = encodeURI(this.props.url);
    return(
      <a href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}`}>Share on Facebook</a>
    )
  }
}

export default FBShareButton;