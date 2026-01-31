import React, { useState } from 'react';

const ReadMore = ({ text, maxChars = 150, readMoreText = 'Read More', readLessText = 'Read Less' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasReadMore = text.length > maxChars;

  return (
    <>
      {isExpanded || !hasReadMore ? (
        <span>{text}</span>
      ) : (
        <span>{text.slice(0, maxChars)}...</span>
      )}
      {hasReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '4px' }}
        >
          {isExpanded ? readLessText : readMoreText}
        </button>
      )}
    </>
  );
};

export default ReadMore;   