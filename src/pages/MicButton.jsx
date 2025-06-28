import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import useTelnyx from "../hooks/useTelnyx"; // Make sure this path is correct

const MicButton = () => {
  const assistantId = "assistant-b185fd89-a736-48d8-af9b-19573e2f3175";

  const { connected, startCall, hangUp, remoteAudioRef } = useTelnyx(assistantId);
  const [onCall, setOnCall] = useState(false);
  const [disabled, setDisabled] = useState(false); // Disable after ending call

  const handleClick = () => {
    if (!connected || disabled) return;

    if (!onCall) {
      startCall();
      setOnCall(true);
    } else {
      hangUp();
      setOnCall(false);
      setDisabled(true); // 🔒 Disable mic button permanently after call ends
    }
  };

  return (
    <>
      {/* Custom Animations */}
      <style>
        {`
          @keyframes pulseRing {
            0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.5); }
            70% { box-shadow: 0 0 0 20px rgba(168, 85, 247, 0); }
            100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
          }
          @keyframes scaleBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-call {
            animation: pulseRing 2s ease-out infinite, scaleBounce 1.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Mic Button */}
      <div className="w-full flex justify-center mt-4 sm:mt-6 relative z-50">
        <button
          onClick={handleClick}
          disabled={!connected || disabled}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 
            ${disabled ? "bg-gray-400 cursor-not-allowed"
              : onCall ? "bg-purple-600 animate-call"
              : "bg-purple-500 hover:bg-purple-600 shadow-xl"
            }`}
          title={
            disabled ? "Call ended" : onCall ? "End Call" : "Start Call"
          }
        >
          <FaMicrophone size={28} />
        </button>
      </div>

      {/* Audio output */}
      <audio ref={remoteAudioRef} autoPlay hidden />
    </>
  );
};

export default MicButton;
