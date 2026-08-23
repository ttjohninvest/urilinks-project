import { useState } from 'react';

const CopyButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = "text being copied to the clipboard";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button onClick={handleCopy}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;