import React from 'react'

class AddToAny extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //  url : this.props.url
    // }
  }

   //let encodedURL = encodeURI(this.state.url);
   

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