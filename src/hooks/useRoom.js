import { useState, useEffect, useCallback, useRef } from "react";
import { ref, push, onValue, set, get, serverTimestamp } from "firebase/database";
import { db, auth, signInAnon } from "../firebase";

const NAME_KEY = "wanderecho_display_name";

const randomCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export const useRoom = () => {
  const [uid, setUid] = useState(null);
  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem(NAME_KEY) || ""
  );
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const unsubRef = useRef(null);

  // Ensure anonymous auth
  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid);
      return;
    }
    signInAnon()
      .then((cred) => setUid(cred.user.uid))
      .catch((e) => setError("Auth failed: " + e.message));
  }, []);

  const saveName = useCallback((name) => {
    localStorage.setItem(NAME_KEY, name);
    setDisplayName(name);
  }, []);

  const createRoom = useCallback(async (personality = "Explorer") => {
    if (!uid) return null;
    const code = randomCode();
    const roomRef = ref(db, `rooms/${code}`);
    await set(roomRef, {
      createdAt: serverTimestamp(),
      personality,
      members: { [uid]: displayName || "Traveler" },
    });
    return code;
  }, [uid, displayName]);

  const joinRoom = useCallback(async (code) => {
    const roomRef = ref(db, `rooms/${code}`);
    const snap = await get(roomRef);
    if (!snap.exists()) {
      setError("Room not found. Check the code and try again.");
      return false;
    }
    setError(null);
    // Register member
    await set(ref(db, `rooms/${code}/members/${uid}`), displayName || "Traveler");
    return true;
  }, [uid, displayName]);

  const listenRoom = useCallback((code) => {
    setLoading(true);
    // Messages listener
    const msgsRef = ref(db, `rooms/${code}/messages`);
    const unsub = onValue(msgsRef, (snap) => {
      const data = snap.val() || {};
      const arr = Object.entries(data)
        .map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessages(arr);
      setLoading(false);
    });

    // Members listener
    const membersRef = ref(db, `rooms/${code}/members`);
    const unsubMembers = onValue(membersRef, (snap) => {
      setMembers(snap.val() || {});
    });

    unsubRef.current = () => { unsub(); unsubMembers(); };
  }, []);

  const leaveRoom = useCallback(() => {
    if (unsubRef.current) unsubRef.current();
    setMessages([]);
    setMembers({});
  }, []);

  const sendMessage = useCallback(async (code, text) => {
    if (!uid || !text.trim()) return;
    const msgsRef = ref(db, `rooms/${code}/messages`);
    await push(msgsRef, {
      sender: displayName || "Traveler",
      uid,
      text: text.trim(),
      timestamp: Date.now(),
    });
  }, [uid, displayName]);

  return {
    uid,
    displayName,
    saveName,
    messages,
    members,
    error,
    loading,
    createRoom,
    joinRoom,
    listenRoom,
    leaveRoom,
    sendMessage,
  };
};
