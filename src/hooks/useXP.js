import { useState, useCallback, useEffect } from "react";

const XP_KEY = "wanderecho_xp";
const STREAK_KEY = "wanderecho_streak";
const LAST_ACTIVE_KEY = "wanderecho_last_active";

export const useXP = () => {
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem(XP_KEY) || "0", 10));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem(STREAK_KEY) || "0", 10));

  useEffect(() => {
    const today = new Date().toDateString();
    const last = localStorage.getItem(LAST_ACTIVE_KEY);
    if (last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStreak((prev) => {
        const next = last === yesterday ? prev + 1 : 1;
        localStorage.setItem(STREAK_KEY, String(next));
        return next;
      });
      localStorage.setItem(LAST_ACTIVE_KEY, today);
    }
  }, []);

  const addXP = useCallback((amount) => {
    setXP((prev) => {
      const next = prev + amount;
      localStorage.setItem(XP_KEY, String(next));
      return next;
    });
  }, []);

  return { xp, streak, addXP };
};
