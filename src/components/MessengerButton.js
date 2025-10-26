import React from 'react'

class MessengerButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     
    }
  }

  render(){
   
    return(
      <div><a href={`https://messenger.com`} className="text-size-3 nounderline" target="_blank"><img className="messengerlogo__image" src="/images/messenger.png" title="open facebook messenger" /></a></div>
    )
  }
}

export default MessengerButton;