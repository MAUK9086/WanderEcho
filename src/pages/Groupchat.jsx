import React, { useState } from "react";
import MicButton from "./MicButton";
import PersonalitySelector from "./PS";

const messages = [
  { id: 1, sender: "Emma", text: "Hey everyone, just reached Paris!" },
  { id: 2, sender: "Liam", text: "Same here! Let’s use WanderEcho to explore nearby spots." },
  { id: 3, sender: "Olivia", text: "Guys, the AI just told me about Notre-Dame Cathedral — it’s 5 mins from here!" },
  { id: 4, sender: "Noah", text: "Nice! It recommended a local café near the Seine for me." },
  { id: 5, sender: "Emma", text: "It showed me the Eiffel Tower’s history and best photo points 😍" },
  { id: 6, sender: "Liam", text: "Let’s all meet at the tower around sunset? The view will be amazing." },
  { id: 7, sender: "Olivia", text: "Sounds good. I’ll follow the route on the map now." },
  { id: 8, sender: "Noah", text: "WanderEcho’s voice guide is actually helpful 😄" },
  { id: 9, sender: "Emma", text: "See you all in 20 mins!" }
];


const currentUser = "Liam";

const GroupChat = () => {
  const [onCall, setOnCall] = useState(false);

  const toggleCall = () => {
    setOnCall(!onCall);
  };

  return (
    <div className="h-[90vh] bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className="relative flex flex-col w-screen h-[90vh] bg-white shadow-lg rounded-lg">
        {/* Call Button */}
      <MicButton onCall={onCall} toggleCall={toggleCall} />
      <PersonalitySelector/>
        
<div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col-reverse gap-3 bg-gradient-to-br from-purple-50 to-purple-100">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm sm:text-base break-words ${
                msg.sender === currentUser
                  ? "bg-purple-600 text-white ml-auto"
                  : "bg-white border border-purple-200 text-gray-900 mr-auto"
              }`}
            >
              {msg.sender !== currentUser && (
                <div className="font-semibold text-xs text-purple-600 mb-1">
                  {msg.sender}
                </div>
              )}
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center bg-white rounded-b-lg">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
