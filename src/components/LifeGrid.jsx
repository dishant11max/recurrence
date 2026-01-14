import { useEffect, useRef, useState } from "react";

export default function LifeGrid({ weeksLived }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  // Measure container width
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setWidth(rect.width);
    };

    window.addEventListener("resize", updateSize);
    requestAnimationFrame(updateSize); // ✅ ensures width isn't 0 on first paint

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;

    const ctx = canvas.getContext("2d");

    const cols = 52;
    const rows = 80;
    const TOTAL_WEEKS = cols * rows;

    const rawWidth = width / cols;
    const gap = Math.max(1, Math.floor(rawWidth * 0.2));

    const cellWidth = Math.floor(rawWidth - gap);
    const cellHeight = Math.max(2, Math.floor(cellWidth * 0.3));

    const realWidth = cols * cellWidth + (cols - 1) * gap;
    const realHeight = rows * cellHeight + (rows - 1) * gap;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(realWidth * dpr);
    canvas.height = Math.floor(realHeight * dpr);
    canvas.style.width = `${realWidth}px`;
    canvas.style.height = `${realHeight}px`;

    // ✅ reset transform so scale doesn't stack
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, realWidth, realHeight);

    const drawRect = (i, color) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * (cellWidth + gap);
      const y = row * (cellHeight + gap);

      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellWidth, cellHeight);
    };

    // If birthdate not set
    if (weeksLived == null) {
      for (let i = 0; i < TOTAL_WEEKS; i++) {
        drawRect(i, "#333"); // ✅ visible on black
      }
      return;
    }

    for (let i = 0; i < TOTAL_WEEKS; i++) {
      if (i < weeksLived) {
        drawRect(i, "#888"); // lived
      } else if (i === weeksLived) {
        drawRect(i, "#fff"); // current
      } else {
        drawRect(i, "#262626"); // remaining (visible)
      }
    }
  }, [weeksLived, width]);

  return (
    <div className="mt-24 w-full max-w-6xl" ref={containerRef}>
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2">
          Visual Timeline (1 Square = 1 Week)
        </h3>

        <div className="flex flex-col gap-8 items-start w-full">
          <div className="relative w-full overflow-hidden">
            <canvas ref={canvasRef} className="opacity-90 block" />
          </div>

          {/* Legend */}
          <div className="flex flex-col md:flex-row justify-between w-full text-[10px] uppercase tracking-widest text-white/40 font-mono">
            <div className="flex gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#888]" /> Lived
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#fff]" /> Current
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#262626]" /> Remaining
              </span>
            </div>

            <div className="mt-2 md:mt-0">Expected Lifespan: 80 Years</div>
          </div>

          <div className="flex flex-col gap-2 text-xs text-white/50 max-w-md mt-4">
            <p>Each bar represents one week of existence.</p>
            <p>
              The bright white bar is <strong>now</strong>. It is burning.
            </p>
            <p className="mt-4 text-white/90 italic">
              "This life as you now live it and have lived it, you will have to live once more and innumerable times
              more."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
