import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRoom } from "../hooks/useRoom";
import MicButton from "./MicButton";
import PersonalitySelector from "./PS";
import { useXP } from "../hooks/useXP";
import { FaCopy, FaCheck, FaArrowLeft, FaUsers } from "react-icons/fa";

const Room = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { uid, displayName, messages, members, loading, listenRoom, leaveRoom, sendMessage } = useRoom();
  const [inputText, setInputText] = useState("");
  const [personality, setPersonality] = useState("Explorer");
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const { addXP } = useXP();

  useEffect(() => {
    if (uid) listenRoom(code);
    return () => leaveRoom();
  }, [uid, code]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text) return;
    await sendMessage(code, text);
    setInputText("");
    addXP(2);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const memberList = Object.values(members);
  const memberCount = memberList.length;

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] bg-duo-bg">
      {/* Header */}
      <div className="bg-white border-b-2 border-duo-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { leaveRoom(); navigate("/groupchat"); }}
              className="w-8 h-8 rounded-xl bg-duo-bg hover:bg-duo-border flex items-center justify-center transition-colors text-duo-muted"
            >
              <FaArrowLeft size={12} />
            </button>
            <div>
              <h1 className="font-extrabold text-duo-text text-sm">Room</h1>
              <div className="flex items-center gap-2">
                <code className="text-lg font-black text-[#1CB0F6] tracking-widest">{code}</code>
                <button
                  onClick={copyCode}
                  className="text-duo-muted hover:text-duo-text transition-colors"
                  title="Copy room code"
                >
                  {copied ? <FaCheck size={12} className="text-duo-green" /> : <FaCopy size={12} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Members avatars */}
            <div className="flex items-center gap-1.5 bg-[#D5EFFF] border-2 border-[#1CB0F6] rounded-full px-2.5 py-1">
              <FaUsers size={10} className="text-[#1CB0F6]" />
              <span className="text-xs font-extrabold text-[#1E40AF]">{memberCount}</span>
            </div>
            <PersonalitySelector selected={personality} onSelect={setPersonality} compact />
          </div>
        </div>

        {/* Member names row */}
        {memberList.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {memberList.slice(0, 6).map((name, i) => (
              <span key={i} className="text-xs font-bold text-duo-muted bg-duo-bg border border-duo-border rounded-full px-2 py-0.5">
                {name === displayName ? `${name} (you)` : name}
              </span>
            ))}
            {memberList.length > 6 && (
              <span className="text-xs font-bold text-duo-muted">+{memberList.length - 6} more</span>
            )}
          </div>
        )}
      </div>

      {/* Mic */}
      <div className="bg-white border-b-2 border-duo-border py-4 flex justify-center">
        <MicButton personality={personality} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {loading && (
          <div className="text-center text-duo-muted font-bold text-sm py-4">Loading messages...</div>
        )}

        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="text-4xl">👋</div>
            <p className="font-extrabold text-duo-text">Room is ready!</p>
            <p className="text-sm text-duo-muted font-semibold">
              Share the code <strong className="text-[#1CB0F6] tracking-widest">{code}</strong> with your travel buddies
            </p>
            <button
              onClick={copyCode}
              className="btn-duo-blue px-5 py-2 text-sm flex items-center gap-2"
            >
              {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
              Copy room code
            </button>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.uid === uid;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <span className="text-xs font-extrabold text-[#1CB0F6] mb-0.5 ml-1">{msg.sender}</span>
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm font-semibold leading-relaxed ${
                  isMe
                    ? "bg-duo-green text-white rounded-br-sm shadow-[0_3px_0_#46A302]"
                    : "bg-white text-duo-text border-2 border-duo-border rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t-2 border-duo-border px-4 py-3 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Share your discovery..."
          className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-duo-border focus:border-duo-green focus:outline-none text-sm font-semibold bg-duo-bg text-duo-text placeholder:text-duo-muted"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="btn-duo-green px-5 py-2.5 text-sm disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
