import { useEffect, useRef, useState } from "react";

const useTelnyx = (assistantId) => {
  const [client, setClient] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [connected, setConnected] = useState(false);
  const remoteAudioRef = useRef();

  useEffect(() => {
    if (!window.TelnyxWebRTC) return;

    const Telnyx = window.TelnyxWebRTC.TelnyxRTC;
    const newClient = new Telnyx({
      anonymous_login: {
        target_id: assistantId,
        target_type: 'ai_assistant'
      }
    });

    newClient.on('telnyx.ready', () => {
      console.log("✅ Telnyx client connected");
      setConnected(true);
    });

    newClient.on('telnyx.error', (err) => {
      console.error("❌ Telnyx error:", err);
    });

    newClient.connect();
    setClient(newClient);
  }, [assistantId]);

  const startCall = () => {
    if (!client) return;

    const opus = RTCRtpReceiver.getCapabilities('audio').codecs
      .find(c => c.mimeType.toLowerCase().includes('opus'));

    const call = client.newCall({
      destinationNumber: '',
      preferred_codecs: [opus],
      remoteElement: remoteAudioRef.current,
      audio: true,
      video: false
    });

    setActiveCall(call);
  };

  const hangUp = () => {
    if (activeCall) {
      activeCall.hangup();
      setActiveCall(null);
    }
  };

  return {
    connected,
    activeCall,
    startCall,
    hangUp,
    remoteAudioRef,
  };
};

export default useTelnyx;
