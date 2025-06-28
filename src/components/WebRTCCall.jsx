import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const WebRTCCall = forwardRef((props, ref) => {
  const [clientReady, setClientReady] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const audioRef = useRef(null);
  const clientRef = useRef(null);
  const callRef = useRef(null);

  useImperativeHandle(ref, () => ({
    startCall,
    hangUp,
  }));

  useEffect(() => {
    const client = new TelnyxWebRTC.TelnyxRTC({
      anonymous_login: {
        target_id: "assistant-b185fd89-a736-48d8-af9b-19573e2f3175",
        target_type: "ai_assistant",
      },
    });

    clientRef.current = client;

    client.on("telnyx.ready", () => {
      console.log("✅ Telnyx client connected.");
      setClientReady(true);
    });

    client.connect();

    return () => {
      client.disconnect();
    };
  }, []);

  const startCall = () => {
    try {
      const call = clientRef.current.newCall({
        destinationNumber: "",
        audio: true,
        video: false,
        // ❌ Do NOT add remoteElement
      });

      call.on("remoteTrack", (event) => {
        const [remoteStream] = event.streams;
        const audioElement = audioRef.current;

        if (audioElement && remoteStream) {
          audioElement.srcObject = remoteStream;
          audioElement
            .play()
            .catch((err) => console.error("🔇 Audio play error:", err));
        }
      });

      callRef.current = call;
      setCallActive(true);
    } catch (err) {
      console.error("❌ Error in startCall:", err);
    }
  };

  const hangUp = () => {
    if (callRef.current) {
      callRef.current.hangup();
      setCallActive(false);
    }
  };

  return (
    <div style={{ display: "none" }}>
      <audio ref={audioRef} autoPlay />
    </div>
  );
});

export default WebRTCCall;
