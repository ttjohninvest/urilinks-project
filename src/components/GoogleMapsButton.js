import React from 'react'

class GoogleMapsButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     //url : this.props.url
    }
  }
 /* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" className="color-white-1 text-size-2- nounderline cursor-pointer" data-show-count="false" title="Share urilinks.com to your twitter news feed">(t)</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
        
  render(){
    let encodedURL = encodeURI(this.state.url);
    return(
      <div className="margin-top-115 margin-right-115">
       <a href="https://www.google.com/maps/" target="_blank" >
       <img className="x__image" src="/images/googlemapslogo.png" alt="google maps" title="share on x.com was twitter.com" />
       </a>
         </div>
    )
  }
}

export default GoogleMapsButton;