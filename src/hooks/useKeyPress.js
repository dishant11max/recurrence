import { useEffect } from "react";

export default function useKeyPress(keys, callback) {
  useEffect(() => {
    const handler = (e) => {
      const k = e.key.toLowerCase();
      if (keys.includes(k)) callback(k);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keys, callback]);
}
