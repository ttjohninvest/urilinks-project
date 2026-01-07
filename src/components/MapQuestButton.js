import React from 'react'

class MapQuestButton extends React.Component{
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
       <a href="https://www.mapquest.com/directions?scheduleType=leave-now" target="_blank" >
       <img className="x__image" src="/images/mapquestlogo.png" alt="map quest for directions" title="opens map quest for getting directions" target="_blank" />
       </a>
         </div>
    )
  }
}

export default MapQuestButton;