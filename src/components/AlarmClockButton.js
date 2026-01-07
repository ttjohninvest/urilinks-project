import React from 'react'

class AlarmClockButton extends React.Component{
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
       <a href="https://kukuklok.com/" target="_blank" >
       <img className="x__image" src="/images/alarm-clock.png" alt="alarm clock" title="opens alarm clock" target="_blank" />
       </a>
         </div>
    )
  }
}

export default AlarmClockButton;