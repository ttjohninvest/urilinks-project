import React from 'react'

class AddToAny extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //  url : this.props.url
    // }
  }

   //let encodedURL = encodeURI(this.state.url);
   
/* from addtoany.com, it is suppse to give me buttons to share with anything 
<div>
<a href="https://www.addtoany.com/share#url=https%3A%2F%2Furilinks.com&amp;title=" target="_blank">
<img src="https://static.addtoany.com/buttons/a2a.svg" width="32" height="32" style="background-color:royalblue" />
</a>
<a href="https://www.addtoany.com/add_to/facebook?linkurl=https%3A%2F%2Furilinks.com&amp;linkname=" target="_blank"><img src="https://static.addtoany.com/buttons/facebook.svg" width="32" height="32" style="background-color:royalblue"></a>
<a href="https://www.addtoany.com/add_to/mastodon?linkurl=https%3A%2F%2Furilinks.com&amp;linkname=" target="_blank"><img src="https://static.addtoany.com/buttons/mastodon.svg" width="32" height="32" style="background-color:royalblue"></a>
<a href="https://www.addtoany.com/add_to/email?linkurl=https%3A%2F%2Furilinks.com&amp;linkname=" target="_blank"><img src="https://static.addtoany.com/buttons/email.svg" width="32" height="32" style="background-color:royalblue"></a>
</div> */
  render(){
   
    return(
      <div>
<a href="https://www.addtoany.com/share#url=https%3A%2F%2Furilinks.com&amp;title=" target="_blank">
<img src="https://static.addtoany.com/buttons/a2a.svg" width="32" height="32" style="background-color:royalblue" />
</a>

</div>
    )
  }
}

export default AddToAny;