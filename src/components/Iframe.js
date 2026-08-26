import React from "react";

const BasicIframe = () => {
  return (
    <iframe
      src="https://www.example.com"
      width="600"
      height="400"
      title="Example Embed"
      allow="accelerometer; encrypted-media; gyroscope"
    />
  );
};

export default BasicIframe;