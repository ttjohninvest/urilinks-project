import React from 'react'

class LinkedInShareButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     url : this.props.url
    }
  }

  render(){
    let encodedURL = encodeURI(this.state.url);
    return(
      <div className="margin-left-11"><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&source=LinkedIn`} className="text-size-3">Share on LinkedIn</a></div>
    )
  }
}

export default LinkedInShareButton;