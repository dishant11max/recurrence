import { useEffect, useState } from "react";

const LINES = [
  "Amor fati: let that be my love henceforth!",
  "Become who you are.",
  "He who has a why to live can bear almost any how.",
  "One must still have chaos in oneself to give birth to a dancing star.",
  "And if you gaze long enough into an abyss, the abyss will gaze back into you.",
  "The higher we soar the smaller we appear to those who cannot fly.",
  "There are no facts, only interpretations.",
  "That which does not kill us makes us stronger.",
];

export default function MotivationLine() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * LINES.length));

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % LINES.length);
    }, 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-8 flex items-center justify-start overflow-hidden">
      <p
        key={index}
        className="text-xs md:text-sm uppercase tracking-widest text-white/60 animate-fade-in"
      >
        {LINES[index]}
      </p>
    </div>
  );
}
