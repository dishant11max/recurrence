import { useEffect, useState } from "react";

export default function EntropyCounter({ birthDate }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!birthDate) return;

    const dob = new Date(birthDate).getTime();

    const update = () => {
      const now = Date.now();
      setSeconds(Math.floor((now - dob) / 1000));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  if (!birthDate) return null;

  return (
    <div className="mt-12 w-full max-w-6xl">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          Entropy (Total Seconds Existed)
        </span>

        <span className="text-xl md:text-2xl font-mono text-white/70 animate-pulse-slow">
          {seconds.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
