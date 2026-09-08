import React from "react"
import { useSpeechSynthesis } from 'react-speech-kit';

function ReactSpeechKit() {
  const { speak, voices } = useSpeechSynthesis();

  return (
    <button onClick={() => speak({ text: 'Hello World', voice: voices[0] })}>
      Speak
    </button>
  );
}   

export default ReactSpeechKit;