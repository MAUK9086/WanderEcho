import { useState } from "react";
import { FaMicrophone, FaPhoneSlash } from "react-icons/fa";
import useTelnyx from "../hooks/useTelnyx";
import { useXP } from "../hooks/useXP";

const MicButton = ({ personality }) => {
  const assistantId = import.meta.env.VITE_TELNYX_ASSISTANT_ID;
  const { connected, startCall, hangUp, remoteAudioRef } = useTelnyx(assistantId);
  const [onCall, setOnCall] = useState(false);
  const { addXP } = useXP();

  const handleClick = () => {
    if (!connected) return;
    if (!onCall) {
      startCall();
      setOnCall(true);
    } else {
      hangUp();
      setOnCall(false);
      addXP(10);
    }
  };

  const statusText = !connected
    ? "Connecting..."
    : onCall
    ? "Tap to end call"
    : "Tap to start tour";

  return (
    <>
      <style>{`
        @keyframes duoPulse {
          0%   { box-shadow: 0 0 0 0   rgba(255,75,75,0.5); }
          70%  { box-shadow: 0 0 0 22px rgba(255,75,75,0); }
          100% { box-shadow: 0 0 0 0   rgba(255,75,75,0); }
        }
        .animate-oncall { animation: duoPulse 1.8s ease-out infinite; }

        @keyframes duoIdle {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        .animate-idle { animation: duoIdle 2.5s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleClick}
          disabled={!connected}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
            !connected
              ? "bg-gray-300 cursor-not-allowed"
              : onCall
              ? "bg-[#FF4B4B] animate-oncall"
              : "bg-duo-green animate-idle"
          }`}
          style={onCall ? {} : connected ? { boxShadow: '0 6px 0 #46A302' } : {}}
          title={statusText}
        >
          {onCall ? <FaPhoneSlash size={26} /> : <FaMicrophone size={26} />}
        </button>
        <span className="text-xs font-bold text-duo-muted">{statusText}</span>
        {onCall && (
          <span className="text-xs font-extrabold text-[#FF4B4B] bg-[#FFE5E5] px-2 py-0.5 rounded-full animate-pulse">
            ● LIVE
          </span>
        )}
      </div>

      <audio ref={remoteAudioRef} autoPlay hidden />
    </>
  );
};

export default MicButton;
