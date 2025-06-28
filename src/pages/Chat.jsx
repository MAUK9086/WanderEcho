import React from "react";
import MicButton from "./MicButton";
import PersonalitySelector from "./PS";

const messages = [
  {
    id: 1,
    sender: "user",
    text: "I asked who was the designer of Eiffel Tower?",
    timestamp: "Jun 25, 2025, 10:13:27 PM",
  },
  {
    id: 2,
    sender: "bot",
    text: "The Eiffel Tower was designed by the French engineer Gustave Eiffel...",
    timestamp: "Jun 25, 2025, 10:13:28 PM",
  },
  {
    id: 3,
    sender: "user",
    text: "Hello.",
    timestamp: "Jun 26, 2025, 4:59:59 PM",
  },
  {
    id: 4,
    sender: "bot",
    text: "You're in the heart of Paris, where romance fills the air...",
    timestamp: "Jun 26, 2025, 4:59:52 PM",
  },
  {
    id: 5,
    sender: "bot",
    text: "Welcome to Paris! Would you like to explore a landmark or discover a hidden gem nearby?",
    timestamp: "Jun 26, 2025, 5:00:00 PM",
  },
];

const Chat = () => {
  return (
    <div className="h-[90vh] w-full bg-white shadow-lg flex flex-col overflow-hidden relative">
      {/* Controls */}
      <MicButton />
      <PersonalitySelector />

      {/* WebRTC Call Buttons */}
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={() => window.startCall()}
          id="call"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Start Echo Call
        </button>
        <button
          onClick={() => window.hangUp()}
          id="hangup"
          disabled
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Hang Up
        </button>
      </div>

      {/* Hidden audio player for Telnyx stream */}
      <audio id="remoteAudio" autoPlay hidden />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col-reverse gap-3 bg-gradient-to-br from-purple-50 to-purple-100">
        {[...messages].reverse().map((msg) => (
          <div
            key={msg.id}
            className={`w-fit max-w-[75%] px-4 py-2 rounded-xl text-sm sm:text-base ${
              msg.sender === "user"
                ? "bg-purple-600 text-white ml-auto"
                : "bg-white border border-purple-200 text-gray-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t flex items-center bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
