import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '10px' }}
      >
        Select Option
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          background: 'white', 
          border: '1px solid #ccc',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {options.map((option, index) => (
            <li 
              key={index} 
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => {
                console.log(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;