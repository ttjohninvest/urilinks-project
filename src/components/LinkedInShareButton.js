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
      <div className="margin-left-11"><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&source=LinkedIn`} className="text-size-3 nounderline"><img className="linkedinlogo__image" src="/images/linkedinlogo.png" title="share on linkedin" target="_blank"/></a></div>
    )
  }
}

export default LinkedInShareButton;