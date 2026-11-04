
import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const API_URL =
  "https://urilinks-project-vercel-api-5.vercel.app/api/ai-chat";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const responseIdRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [messages, loading]);

  const sendMessage = async (event) => {
    if (event) event.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    const user = firebase.auth().currentUser;

    if (!user) {
      setError("Please log in to URIlinks first.");
      return;
    }

    setInput("");
    setError("");
    setLoading(true);

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

      responseIdRef.current = data.responseId;

      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          content: data.reply
        }
      ]);
    } catch (err) {
      setError(err.message || "Unable to contact AI.");

      setInput(message);
      setMessages((old) => old.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (loading) return;

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
              textAlign: item.role === "user"
                ? "right"
                : "left",
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

        {loading && <div>AI is responding...</div>}

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
    </div>
  );
};

export default AiChat;
