import React from 'react'

class MessengerButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     
    }
  }

  render(){
   
    return(
      <div><a href={`https://messenger.com`} className="text-size-3 nounderline" target="_blank"><img className="facebooklogo__image" src="/images/Messenger_Logo_PNG4.png" title="open facebook messenger" /></a></div>
    )
  }
}

export default MessengerButton;