import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../hooks/useRoom";
import { FaUsers, FaDoorOpen, FaPlus } from "react-icons/fa";

const GroupLobby = () => {
  const navigate = useNavigate();
  const { displayName, saveName, createRoom, joinRoom, error } = useRoom();
  const [nameInput, setNameInput] = useState(displayName);
  const [codeInput, setCodeInput] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [localError, setLocalError] = useState("");

  const ensureName = () => {
    const name = nameInput.trim() || "Traveler";
    saveName(name);
    return name;
  };

  const handleCreate = async () => {
    ensureName();
    setCreating(true);
    setLocalError("");
    try {
      const code = await createRoom();
      if (code) navigate(`/room/${code}`);
    } catch (e) {
      setLocalError("Failed to create room. Check your Firebase config.");
    }
    setCreating(false);
  };

  const handleJoin = async () => {
    const code = codeInput.trim().toUpperCase();
    if (!code || code.length < 4) {
      setLocalError("Enter a valid room code.");
      return;
    }
    ensureName();
    setJoining(true);
    setLocalError("");
    const ok = await joinRoom(code);
    if (ok) {
      navigate(`/room/${code}`);
    } else {
      setLocalError(error || "Room not found.");
    }
    setJoining(false);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-duo-bg flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-[#1CB0F6] mx-auto flex items-center justify-center text-4xl mb-4 shadow-[0_5px_0_#0B90D0]">
            👥
          </div>
          <h1 className="text-3xl font-black text-duo-text">Group Rooms</h1>
          <p className="text-duo-muted font-semibold mt-2">
            Explore together. Share discoveries in real time.
          </p>
        </div>

        {/* Display name */}
        <div className="duo-card mb-4">
          <label className="text-xs font-extrabold text-duo-muted uppercase tracking-wide block mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your traveler name..."
            maxLength={24}
            className="w-full px-4 py-2.5 rounded-2xl border-2 border-duo-border focus:border-duo-green focus:outline-none text-sm font-bold text-duo-text bg-duo-bg placeholder:text-duo-muted"
          />
        </div>

        {/* Create room */}
        <div className="duo-card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaPlus className="text-duo-green" size={14} />
            <h2 className="font-extrabold text-duo-text">Create a Room</h2>
          </div>
          <p className="text-xs text-duo-muted font-semibold mb-4">
            Start a new tour room and share the code with friends.
          </p>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full btn-duo-green py-3 text-sm"
          >
            {creating ? "Creating..." : "🚀 Create Room"}
          </button>
        </div>

        {/* Join room */}
        <div className="duo-card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaDoorOpen className="text-[#1CB0F6]" size={14} />
            <h2 className="font-extrabold text-duo-text">Join a Room</h2>
          </div>
          <p className="text-xs text-duo-muted font-semibold mb-3">
            Got a code? Enter it below to join your group.
          </p>
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            placeholder="e.g. WE4X2K"
            maxLength={8}
            className="w-full px-4 py-2.5 rounded-2xl border-2 border-duo-border focus:border-[#1CB0F6] focus:outline-none text-sm font-extrabold text-duo-text bg-duo-bg placeholder:text-duo-muted tracking-widest uppercase mb-3"
          />
          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full btn-duo-blue py-3 text-sm"
          >
            {joining ? "Joining..." : "🔗 Join Room"}
          </button>
        </div>

        {/* Error */}
        {(localError || error) && (
          <div className="bg-[#FFE5E5] border-2 border-[#FF4B4B] rounded-2xl p-3 text-sm font-bold text-[#CC3333] text-center">
            {localError || error}
          </div>
        )}

        {/* Firebase hint */}
        {!import.meta.env.VITE_FIREBASE_API_KEY && (
          <div className="mt-4 bg-[#FFF8D5] border-2 border-[#FFC800] rounded-2xl p-3 text-xs font-bold text-[#A07800] text-center">
            ⚠️ Firebase not configured — see FIREBASE_SETUP.md
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupLobby;
