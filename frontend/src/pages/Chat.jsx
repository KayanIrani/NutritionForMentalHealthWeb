import React, { useState, useRef, useEffect } from "react";
import HomeStyles from "./css/HomeStyles.module.css";

const Chat = () => {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [ansColor, setAnsColor] = useState("green");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null); // <-- ref for scrolling

  const handleQues = async () => {
    if (!ques.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: ques }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: ques }),
    });

    const data = await res.json();
    const color = data.success ? "green" : "red";

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.data, color },
    ]);

    setQues("");
  };

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "69.7vh",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      {/* Chat area */}
      <div
        ref={chatContainerRef} // <-- attach ref here
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#3a3aff" : "#2a2a2a",
              color: msg.color || "white",
              borderRadius: "15px",
              padding: "15px 20px",
              margin: "7px 0",
              maxWidth: "70%",
              wordWrap: "break-word",
              fontSize: "20px",
            }}
          >
            {msg.sender === "user" ? (
              msg.text
            ) : (
              <span
                className={HomeStyles.typewriter}
                style={{ "--nchars": msg.text.length }}
              >
                {msg.text}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "15px",
          borderTop: "1px solid #333",
          backgroundColor: "transparent",
        }}
      >
        <input
          style={{
            flex: 1,
            maxWidth: "600px",
            backgroundColor: "#000",
            border: "2px solid #444",
            color: "white",
            borderRadius: "20px",
            padding: "10px 15px",
            outline: "none",
          }}
          onChange={(e) => setQues(e.target.value)}
          value={ques}
          type="text"
          placeholder="Type your question..."
          onKeyDown={(e) => e.key === "Enter" && handleQues()}
        />
        <button
          onClick={handleQues}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#3EA350",
            border: "none",
            color: "white",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
