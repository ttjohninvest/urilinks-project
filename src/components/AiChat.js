
import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import VoiceConversation from "./VoiceConversation";

const API_URL =
  "https://urilinks-project-vercel-api-5.vercel.app/api/ai-chat";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  const responseIdRef = useRef(null);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const sendMessageRef = useRef(null);
  const loadingRef = useRef(false);
  const voiceRepliesRef = useRef(true);
  const mountedRef = useRef(true);

  const speechSupported =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition ||
       window.webkitSpeechRecognition);

  const voiceSupported =
    typeof window !== "undefined" &&
    !!window.speechSynthesis;

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      }

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [messages, loading]);

  const stopVoice = () => {
    if (voiceSupported) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
  };

  const speakText = (text) => {
    if (!voiceSupported || !voiceRepliesRef.current) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const englishVoices = voices.filter((voice) =>
      voice.lang.toLowerCase().startsWith("en")
    );

    const femaleVoice = englishVoices.find((voice) =>
      /zira|aria|jenny|samantha|victoria|female/i.test(
        voice.name
      )
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else if (englishVoices.length > 0) {
      utterance.voice = englishVoices[0];
    }

    utterance.onstart = () => {
      if (mountedRef.current) {
        setSpeaking(true);
      }
    };

    utterance.onend = () => {
      if (mountedRef.current) {
        setSpeaking(false);
      }
    };

    utterance.onerror = () => {
      if (mountedRef.current) {
        setSpeaking(false);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (event, voiceMessage) => {
    if (event) event.preventDefault();

    const message =
      typeof voiceMessage === "string"
        ? voiceMessage.trim()
        : input.trim();

    if (!message || loadingRef.current) return;

    const user = firebase.auth().currentUser;

    if (!user) {
      setError("Please log in to URIlinks first.");
      return;
    }

    loadingRef.current = true;

    setInput("");
    setError("");
    setLoading(true);

    stopVoice();

    setMessages((old) => [
      ...old,
      { role: "user", content: message }
    ]);

    try {
      const token = await user.getIdToken();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          message: message,
          previousResponseId: responseIdRef.current
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      if (!mountedRef.current) return;

      responseIdRef.current = data.responseId;

      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          content: data.reply
        }
      ]);

      speakText(data.reply);

    } catch (err) {
      if (!mountedRef.current) return;

      setError(err.message || "Unable to contact AI.");
      setInput(message);

      setMessages((old) => old.slice(0, -1));

    } finally {
      loadingRef.current = false;

      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  sendMessageRef.current = sendMessage;

  const startTalking = () => {
    if (loadingRef.current) return;

    if (!speechSupported) {
      setError(
        "Speech recognition is not available in this browser."
      );
      return;
    }

    if (recognitionRef.current) {
      if (listening) {
        recognitionRef.current.stop();
        return;
      }
    }

    stopVoice();
    setError("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (mountedRef.current) {
        setListening(true);
      }
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      setInput(transcript);

      if (transcript && sendMessageRef.current) {
        sendMessageRef.current(null, transcript);
      }
    };

    recognition.onerror = (event) => {
      if (!mountedRef.current) return;

      setListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
      } else if (event.error === "no-speech") {
        setError("No speech was detected.");
      } else if (event.error !== "aborted") {
        setError(
          "Speech recognition error: " + event.error
        );
      }
    };

    recognition.onend = () => {
      if (mountedRef.current) {
        setListening(false);
      }

      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    try {
      recognition.start();
    } catch (err) {
      setListening(false);
      setError("Unable to start the microphone.");
    }
  };

  const changeVoiceReplies = (event) => {
    const enabled = event.target.checked;

    voiceRepliesRef.current = enabled;
    setVoiceReplies(enabled);

    if (!enabled) {
      stopVoice();
    }
  };

  const clearChat = () => {
    if (loadingRef.current) return;

    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    stopVoice();

    setListening(false);
    setMessages([]);
    setInput("");
    setError("");

    responseIdRef.current = null;
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "650px",
      margin: "0 auto",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      overflow: "hidden"
    }}>

      <div style={{
        backgroundColor: "rgba(219, 87, 5, 1)",
        color: "white",
        padding: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <strong>URIlinks AI Chat</strong>

        <button
          type="button"
          onClick={clearChat}
          disabled={loading}
        >
          Clear Chat
        </button>

      </div>

      <div style={{
        height: "400px",
        overflowY: "auto",
        padding: "12px"
      }}>

        {messages.length === 0 && (
          <div>
            Hi. What would you like to talk about?
          </div>
        )}

        {messages.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign:
                item.role === "user" ? "right" : "left",
              marginBottom: "14px"
            }}
          >
            <div style={{
              display: "inline-block",
              maxWidth: "85%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor:
                item.role === "user"
                  ? "#e9e9e9"
                  : "#f6e9df",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere"
            }}>
              {item.content}
            </div>
          </div>
        ))}

        {loading && (
          <div>AI is responding...</div>
        )}

        {listening && (
          <div style={{ color: "green" }}>
            Listening... Please speak.
          </div>
        )}

        {speaking && (
          <div style={{ color: "green" }}>
            AI is speaking...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {error && (
        <div style={{
          color: "red",
          padding: "8px"
        }}>
          {error}
        </div>
      )}

      <div style={{
        padding: "10px",
        borderTop: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      }}>

        <button
          type="button"
          onClick={startTalking}
          disabled={loading || !speechSupported}
          style={{
            padding: "10px",
            backgroundColor:
              listening ? "#ffcccc" : "#eeeeee",
            cursor: "pointer"
          }}
        >
          {listening ? "Stop Listening" : "🎤 Start Talking"}
        </button>

        <button
          type="button"
          onClick={stopVoice}
          disabled={!speaking}
          style={{ padding: "10px" }}
        >
          Stop Voice
        </button>

        <label style={{
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}>
          <input
            type="checkbox"
            checked={voiceReplies}
            onChange={changeVoiceReplies}
            disabled={!voiceSupported}
          />
          Voice Replies
        </label>

      </div>

      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          padding: "10px",
          gap: "8px",
          borderTop: "1px solid #ccc"
        }}
      >

        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder="Type your message..."
          maxLength={4000}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "10px"
          }}
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
        >
          Send
        </button>

      </form>
      <VoiceConversation />
    </div>
  );
};

export default AiChat;
