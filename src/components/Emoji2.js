import React, { useState } from "react";
import InputEmoji from "react-input-emoji";

export default function Emoji2() {
  const [text, setText] = useState("");

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      placeholder="Type a message"
    />
  );
}   