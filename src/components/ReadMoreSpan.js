import React, { useState } from 'react';

const ReadMoreSpan = ({ text, maxChars = 150, readMoreText = 'Read More', readLessText = 'Read Less' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasReadMore = text.length > maxChars;

  return (
    <span className="ib">
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
    </span>
  );
};

export default ReadMoreSpan;   