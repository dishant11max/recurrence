import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";


// --- UTILS & HELPERS ---

const STORAGE_KEY_BIRTHDATE = 'eternal_birthdate';
const STORAGE_KEY_STATS = 'eternal_stats';

const getStoredDate = () => localStorage.getItem(STORAGE_KEY_BIRTHDATE);
const setStoredDate = (date) => localStorage.setItem(STORAGE_KEY_BIRTHDATE, date);

const getStoredStats = () => {
  const stored = localStorage.getItem(STORAGE_KEY_STATS);
  return stored ? JSON.parse(stored) : { yes: 0, no: 0 };
};

const updateStoredStats = (type) => {
  const current = getStoredStats();
  const updated = { ...current, [type]: current[type] + 1 };
  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updated));
  return updated;
};

// --- COMPONENTS ---

// 1. NOISE OVERLAY (Cinematic Texture)
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// 2. MOTIVATIONAL LINE (Rotating)
const MotivationLine = () => {
  const lines = [
    "Amor fati: let that be my love henceforth!",
    "Become who you are.",
    "He who has a why to live can bear almost any how.",
    "One must still have chaos in oneself to be able to give birth to a dancing star.",
    "And if you gaze long enough into an abyss, the abyss will gaze back into you.",
    "The higher we soar the smaller we appear to those who cannot fly.",
    "There are no facts, only interpretations.",
    "That which does not kill us makes us stronger."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Rotate every 10 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="h-8 flex items-center justify-start overflow-hidden">
      <p         key={index}         className="text-xs md:text-sm uppercase tracking-widest opacity-60 animate-fade-in"
      >
        {lines[index]}
      </p>
    </div>
  );
};

// 3. TIME COUNTERS
const Counters = ({ birthDate, metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl mt-24 border-t border-white/10 pt-12">
      <CounterItem label="Days Alive" value={metrics.daysAlive !== null ? metrics.daysAlive.toLocaleString() : "—"} />
      <CounterItem label="Weeks Lived" value={metrics.weeksLived !== null ? metrics.weeksLived.toLocaleString() : "—"} />
      <CounterItem label="Days left this year" value={metrics.daysLeftYear} />
      <CounterItem label="Est. Weeks Left (80y)" value={metrics.weeksLeft !== null ? metrics.weeksLeft.toLocaleString() : "—"} />
    </div>
  );
};

const CounterItem = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</span>
    <span className="text-3xl md:text-5xl font-bold tracking-tighter leading-none font-mono text-white/90">
      {value}
    </span>
  </div>
);

// 4. ENTROPY COUNTER (Live Seconds)


// 5. VISUAL LIFE GRID (Weeks)


// 6. CONSUMPTION ANALYTICS

// 7. BIRTHDATE INPUT
const BirthDateInput = ({ birthDate, setBirthDate }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    setStoredDate(val);
    setBirthDate(val);
  };

  return (
    <div className="mt-24 w-full max-w-6xl flex flex-col items-start gap-4">
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">
        Calibrate your timeline (Date of Birth)
      </label>
      <input         type="date"         value={birthDate || ''}
        onChange={handleChange}
        className="bg-transparent border-b border-white/20 text-white font-mono text-lg focus:outline-none focus:border-white transition-colors py-2 w-full md:w-auto"
      />
    </div>
  );
};

// 8. FOOTER QUOTE (ETERNAL RECURRENCE)


// 9. STATS TRACKING (Corner)

// --- MAIN APP ---



const root = createRoot(document.getElementById('root'));
root.render(<App />);