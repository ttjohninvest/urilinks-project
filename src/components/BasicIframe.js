import React from "react";

const BasicIframe = (props) => {
  return (
//     <iframe 
//   src="https://www.youtube.com/embed/BFvjiS5V1tE" 
//   width="600" 
//   height="400" 
//   title="Example Website">
// </iframe>
    <iframe 
  //width="560" 
  //height="315" 
  className="width100"
  style={{height:'315px'}}
  src={props.src} 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowFullScreen>
</iframe>
  );
};

export default BasicIframe;