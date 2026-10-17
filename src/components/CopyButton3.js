import React, { useState } from 'react';

const CopyButton3 = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  //const textToCopy = "text being copied to the clipboard";

    const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
    <button 
    className={`ib height10x- button-2w padding-top-and-bottom margin-left-11 ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    onClick={handleCopy}>
      {/* {isCopied ? 'URL Copied' : 'Copy Sharable URL to Your Page.'} */}
      {/* {`${isCopied?"URL Copied":"Copy Sharable Url for "+props.accountpagename+"'s Page"}`} */}
      {/* {`${isCopied?"URL Copied":(props.readonly)?"Copy Sharable Url to reshare "+props.accountpagename+"'s Page":"Copy Your Sharable Url." }`} */}
    {`${isCopied?"URL Copied":(props.readonly)?"Copy Sharable Url to reshare Page":"Copy Sharable Url." }`}
    </button>
    </div>
  );
};

export default CopyButton3;