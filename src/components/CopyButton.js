import React, { useState } from 'react';

const CopyButton = (props) => {
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
    <button 
    className={`margin-left-11- height48 button-2w ib ${isMobile() === false ? "" : "width295 margin-top-1"}`}
    onClick={handleCopy}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;