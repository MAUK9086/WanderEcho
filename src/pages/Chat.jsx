import React, { useState, useRef, useEffect } from "react";
import MicButton from "./MicButton";
import PersonalitySelector from "./PS";
import { useXP } from "../hooks/useXP";

const PERSONALITY_INFO = {
  "Historian":   { emoji: "🧠", color: "text-[#6B21A8]", bg: "bg-[#E8D5FF]" },
  "Storyteller": { emoji: "🎭", color: "text-[#9A3412]", bg: "bg-[#FFE4D5]" },
  "Explorer":    { emoji: "🧭", color: "text-[#065F46]", bg: "bg-[#D1FAE5]" },
  "Local Guide": { emoji: "🏡", color: "text-[#1E40AF]", bg: "bg-[#DBEAFE]" },
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "👋 Hello, explorer! I'm your WanderEcho guide. Start a voice call and ask me about any landmark, history, or hidden gem near you!",
    timestamp: Date.now(),
  },
];

const Chat = () => {
  const [personality, setPersonality] = useState("Explorer");
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("wanderecho_messages");
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [inputText, setInputText] = useState("");
  const bottomRef = useRef(null);
  const { addXP } = useXP();

  useEffect(() => {
    localStorage.setItem("wanderecho_messages", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text, timestamp: Date.now() },
    ]);
    setInputText("");
    addXP(2);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem("wanderecho_messages");
  };

  const pInfo = PERSONALITY_INFO[personality] || PERSONALITY_INFO["Explorer"];

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] bg-duo-bg">
      {/* Header */}
      <div className="bg-white border-b-2 border-duo-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${pInfo.bg} flex items-center justify-center text-xl`}>
            {pInfo.emoji}
          </div>
          <div>
            <h1 className="font-extrabold text-duo-text text-sm">Voice Tour</h1>
            <p className={`text-xs font-bold ${pInfo.color}`}>{personality} mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PersonalitySelector selected={personality} onSelect={setPersonality} compact />
          <button
            onClick={clearChat}
            className="text-xs text-duo-muted hover:text-duo-text font-bold px-2 py-1 rounded-lg hover:bg-duo-bg transition-colors"
            title="Clear chat"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Mic section */}
      <div className="bg-white border-b-2 border-duo-border py-5 flex flex-col items-center gap-1">
        <MicButton personality={personality} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className={`w-8 h-8 rounded-2xl ${pInfo.bg} flex items-center justify-center text-sm mr-2 flex-shrink-0 self-end`}>
                {pInfo.emoji}
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm font-semibold leading-relaxed ${
                msg.sender === "user"
                  ? "bg-duo-green text-white rounded-br-sm shadow-[0_3px_0_#46A302]"
                  : "bg-white text-duo-text border-2 border-duo-border rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="bg-white border-t-2 border-duo-border px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a place, landmark, or history..."
          className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-duo-border focus:border-duo-green focus:outline-none text-sm font-semibold bg-duo-bg text-duo-text placeholder:text-duo-muted"
        />
        <button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          className="btn-duo-green px-5 py-2.5 text-sm disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
