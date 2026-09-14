import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (emojiData) => {
    setChosenEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>
        {chosenEmoji || 'Add Emoji'}
      </button>
      
      {showPicker && (
        <Picker onEmojiClick={onEmojiClick} />
      )}
      
      <p>Selected: {chosenEmoji || 'None'}</p>
    </div>
  );
}

export default Emoji;   