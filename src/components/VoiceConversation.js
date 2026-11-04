
import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const VOICE_URL =
  "https://urilinks-project-vercel-api-5.vercel.app/api/ai-voice";

const END_URL = VOICE_URL + "/end";
const MAX_CALL_MS = 5 * 60 * 1000;

const VoiceConversation = () => {
  const [status, setStatus] = useState("Ready");
  const [active, setActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState("");
  const [sessionCost, setSessionCost] = useState(0);

  const [totalCost, setTotalCost] = useState(() => {
    try {
      return Number(
        localStorage.getItem("urilinksVoiceTotalCost") || 0
      );
    } catch (err) {
      return 0;
    }
  });

  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const channelRef = useRef(null);
  const requestRef = useRef(null);
  const sessionRef = useRef(0);
  const busyRef = useRef(false);
  const endingRef = useRef(false);
  const serverCallRef = useRef(false);
  const startedAtRef = useRef(null);
  const timeoutRef = useRef(null);
  const countedResponsesRef = useRef(new Set());
  const mountedRef = useRef(true);
  const endCallRef = useRef(null);

  const calculateVoiceCost = (usage) => {
    if (!usage) return 0;

    const input = usage.input_token_details || {};
    const output = usage.output_token_details || {};
    const cached = input.cached_tokens_details || {};

    const inputAudio = input.audio_tokens || 0;
    const inputText = input.text_tokens || 0;
    const cachedAudio = cached.audio_tokens || 0;
    const cachedText = cached.text_tokens || 0;

    const outputAudio = output.audio_tokens || 0;
    const outputText = output.text_tokens || 0;

    return (
      Math.max(0, inputAudio - cachedAudio) * 10 +
      cachedAudio * 0.30 +
      Math.max(0, inputText - cachedText) * 0.60 +
      cachedText * 0.06 +
      outputAudio * 20 +
      outputText * 2.40
    ) / 1000000;
  };

  const recordVoiceCost = (response) => {
    if (!response || !response.usage) return;

    if (
      response.id &&
      countedResponsesRef.current.has(response.id)
    ) {
      return;
    }

    if (response.id) {
      countedResponsesRef.current.add(response.id);
    }

    const cost = calculateVoiceCost(response.usage);

    if (!mountedRef.current) return;

    setSessionCost((old) => old + cost);

    setTotalCost((old) => {
      const updated = old + cost;

      try {
        localStorage.setItem(
          "urilinksVoiceTotalCost",
          String(updated)
        );
      } catch (err) {
        console.log("Unable to save voice cost.");
      }

      return updated;
    });
  };

  // Close the browser's microphone and voice connection.
  const closeLocalAudio = () => {
    sessionRef.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (requestRef.current) {
      requestRef.current.abort();
      requestRef.current = null;
    }

    if (channelRef.current) {
      channelRef.current.close();
      channelRef.current = null;
    }

    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.srcObject = null;
    }

    busyRef.current = false;

    if (mountedRef.current) {
      setActive(false);
      setConnecting(false);
    }
  };

  // Ask the server to end the OpenAI call.
  const requestServerEnd = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error(
        "Please log in again to end the server call."
      );
    }

    const token = await user.getIdToken();
    window.voiceTestToken = token;

    const response = await fetch(END_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: "{}"
    });

    let data = {};

    try {
      data = await response.json();
    } catch (err) {
      // Keep the default error message.
    }

    if (!response.ok || data.ended !== true) {
      throw new Error(
        data.error ||
        "Server did not confirm that the call ended."
      );
    }
  };

  const endConversation = async () => {
    if (endingRef.current) return;

    const hadServerCall = serverCallRef.current;

    // Stop local audio immediately.
    closeLocalAudio();

    if (!hadServerCall) {
      if (mountedRef.current) {
        setStatus("Ready");
      }

      return;
    }

    endingRef.current = true;

    if (mountedRef.current) {
      setEnding(true);
      setStatus("Ending server call...");
      setError("");
    }

    try {
      await requestServerEnd();

      serverCallRef.current = false;
      startedAtRef.current = null;

      if (mountedRef.current) {
        setStatus("Ready");
      }

    } catch (err) {
      if (mountedRef.current) {
        setStatus("Server end not confirmed");

        setError(
          (err.message ||
            "Could not end the call on the server.") +
          " Use End Conversation again to retry."
        );
      }

    } finally {
      endingRef.current = false;

      if (mountedRef.current) {
        setEnding(false);
      }
    }
  };

  endCallRef.current = endConversation;

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      closeLocalAudio();

      // Best effort when leaving the page.
      if (
        serverCallRef.current &&
        !endingRef.current
      ) {
        requestServerEnd().catch((err) => {
          console.log(
            "Server end not confirmed on page close:",
            err.message
          );
        });
      }
    };
  }, []);


  const startVoice = async () => {
    if (busyRef.current || endingRef.current) return;

    if (serverCallRef.current) {
      setError(
        "The previous server call has not been confirmed ended. " +
        "Use End Conversation to retry."
      );
      return;
    }

    const user = firebase.auth().currentUser;

    if (!user) {
      setError("Please log in to URIlinks first.");
      return;
    }

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      !window.RTCPeerConnection
    ) {
      setError("Voice recording is not supported.");
      return;
    }

    busyRef.current = true;
    const sessionId = ++sessionRef.current;

    setError("");
    setConnecting(true);
    setStatus("Connecting...");
    setSessionCost(0);
    countedResponsesRef.current.clear();

    try {
      const token = await user.getIdToken();

      if (sessionId !== sessionRef.current) return;

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true
        });

      if (sessionId !== sessionRef.current) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        return;
      }

      streamRef.current = stream;

      const pc = new RTCPeerConnection();
      peerRef.current = pc;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        if (sessionId !== sessionRef.current) return;

        if (audioRef.current && event.streams[0]) {
          audioRef.current.srcObject = event.streams[0];

          audioRef.current.play().catch(() => {
            if (mountedRef.current) {
              setStatus(
                "Audio playback needs permission."
              );
            }
          });
        }
      };

      pc.onconnectionstatechange = () => {
        if (sessionId !== sessionRef.current) return;

        if (pc.connectionState === "failed") {
          setError("Voice connection failed.");

          if (endCallRef.current) {
            endCallRef.current();
          }
        }
      };

      const channel = pc.createDataChannel("oai-events");
      channelRef.current = channel;

      channel.onopen = () => {
        if (sessionId !== sessionRef.current) return;

        busyRef.current = false;
        setActive(true);
        setConnecting(false);
        setStatus("Connected. You can speak.");
      };

      channel.onmessage = (event) => {
        if (sessionId !== sessionRef.current) return;

        try {
          const data = JSON.parse(event.data);

          if (
            data.type ===
            "input_audio_buffer.speech_started"
          ) {
            setStatus("Listening...");
          }

          if (data.type === "response.created") {
            setStatus("AI is responding...");
          }

          if (data.type === "response.done") {
            recordVoiceCost(data.response);
            setStatus("Connected. You can speak.");
          }

          if (data.type === "error") {
            setError(
              data.error && data.error.message
                ? data.error.message
                : "Voice service error."
            );
          }

        } catch (err) {
          console.log("Voice event error:", err);
        }
      };

      const offer = await pc.createOffer();

      await pc.setLocalDescription(offer);

      if (pc.iceGatheringState !== "complete") {
        await new Promise((resolve) => {
          const check = () => {
            if (
              pc.iceGatheringState === "complete" ||
              pc.signalingState === "closed"
            ) {
              pc.removeEventListener(
                "icegatheringstatechange",
                check
              );
              resolve();
            }
          };

          pc.addEventListener(
            "icegatheringstatechange",
            check
          );

          check();
        });
      }

      if (sessionId !== sessionRef.current) return;

      const controller = new AbortController();
      requestRef.current = controller;

      const response = await fetch(VOICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/sdp",
          Authorization: "Bearer " + token
        },
        body: pc.localDescription.sdp,
        signal: controller.signal
      });

      if (!response.ok) {
        let message =
          "Unable to start voice conversation.";

        try {
          const data = await response.json();

          if (data.error) {
            message = data.error;
          }
        } catch (err) {
          // Keep the default message.
        }

        throw new Error(message);
      }

      // Server has created an OpenAI call.
      serverCallRef.current = true;
      startedAtRef.current = Date.now();

      timeoutRef.current = setTimeout(() => {
        if (endCallRef.current) {
          endCallRef.current();
        }
      }, MAX_CALL_MS);

      const answer = await response.text();

      if (sessionId !== sessionRef.current) return;

      await pc.setRemoteDescription({
        type: "answer",
        sdp: answer
      });

    } catch (err) {
      if (sessionId !== sessionRef.current) return;

      const message =
        err.name === "NotAllowedError"
          ? "Please allow microphone access."
          : err.message || "Voice connection failed.";

      closeLocalAudio();

      if (mountedRef.current) {
        setError(message);
      }

      if (
        serverCallRef.current &&
        endCallRef.current
      ) {
        endCallRef.current();

      } else if (mountedRef.current) {
        setStatus("Ready");
      }
    }
  };

  const testFirebaseVoice = async () => {
  try {
    const user = firebase.auth().currentUser;

    if (!user) {
      alert("Please log in first.");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch(
      //"https://urilinks-project-vercel-api-5.vercel.app/api/ai-voice/test-firebase",
      "https://urilinks-project-vercel-api-5.vercel.app/api/ai-voice/test-voice-lifecycle",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: "{}"
      }
    );

    const result = await response.json();

    console.log("Firebase test HTTP:", response.status);
    console.log("Firebase test result:", result);

    alert(JSON.stringify(result));
  } catch (error) {
    console.error("Firebase test error:", error);
    alert(error.message);
  }
};

  return (
    <div style={{
      padding: "12px",
      textAlign: "center",
      borderTop: "1px solid #ccc"
    }}>
<button
  type="button"
  onClick={testFirebaseVoice}
>
  Test Firebase
</button>
      <div style={{ marginBottom: "10px" }}>
        <strong>Advanced Voice Conversation</strong>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px"
      }}>

        <button
          type="button"
          onClick={startVoice}
          disabled={
            active ||
            connecting ||
            ending ||
            serverCallRef.current
          }
          style={{
            padding: "10px",
            cursor: "pointer"
          }}
        >
          🎤 Start Voice Conversation
        </button>

        <button
          type="button"
          onClick={endConversation}
          disabled={
            ending ||
            (!active &&
              !connecting &&
              !serverCallRef.current)
          }
          style={{
            padding: "10px",
            cursor: "pointer"
          }}
        >
          {ending ? "Ending..." : "End Conversation"}
        </button>

      </div>

      <div style={{
        marginTop: "10px",
        color: active ? "green" : "#555"
      }}>
        {status}
      </div>

      {error && (
        <div style={{
          color: "red",
          marginTop: "8px"
        }}>
          {error}
        </div>
      )}

      <div style={{
        marginTop: "15px",
        padding: "12px",
        backgroundColor: "#f6e9df",
        borderRadius: "8px"
      }}>

        <div>
          <strong>
            Current Voice Conversation Cost:
          </strong>
          {" $"}{sessionCost.toFixed(4)}
        </div>

        <div style={{ marginTop: "8px" }}>
          <strong>
            Total Voice Cost on This Browser:
          </strong>
          {" $"}{totalCost.toFixed(4)}
        </div>

        <div style={{
          fontSize: "12px",
          marginTop: "8px"
        }}>
          Estimated OpenAI API cost in USD
        </div>

      </div>

      <audio ref={audioRef} autoPlay />

    </div>
  );
};

export default VoiceConversation;
