import React, { useEffect, useMemo, useState } from "react";

import NoiseOverlay from "./components/NoiseOverlay";
import MotivationLine from "./components/MotivationLine";
import Counters from "./components/Counters";
import EntropyCounter from "./components/EntropyCounter";
import LifeGrid from "./components/LifeGrid";
import ConsumptionAnalytics from "./components/ConsumptionAnalytics";
import BirthDateInput from "./components/BirthDateInput";
import FooterQuote from "./components/FooterQuote";
import Stats from "./components/Stats";

import { getBirthDate, getStats, updateStats } from "./utils/storage";
import { yesQuotes } from "./data/quotes";

export default function App() {
  const [response, setResponse] = useState(null); // 'yes' | 'no' | null
  const [responseText, setResponseText] = useState("");
  const [birthDate, setBirthDate] = useState(getBirthDate());
  const [stats, setStats] = useState(getStats());
  const [now, setNow] = useState(new Date());

  // update clock every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const metrics = useMemo(() => {
    const today = now;
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    const msPerDay = 1000 * 60 * 60 * 24;
    const msPerWeek = msPerDay * 7;

    const daysSinceNY = Math.floor((today - startOfYear) / msPerDay);
    const daysLeftYear = Math.floor((endOfYear - today) / msPerDay);

    let daysAlive = null;
    let weeksLived = null;
    let weeksLeft = null;

    if (birthDate) {
      const dob = new Date(birthDate);
      daysAlive = Math.floor((today - dob) / msPerDay);
      weeksLived = Math.floor((today - dob) / msPerWeek);

      const lifeExpectancyYears = 80;
      const totalWeeks = lifeExpectancyYears * 52;
      weeksLeft = totalWeeks - weeksLived;
    }

    return { daysSinceNY, daysLeftYear, daysAlive, weeksLived, weeksLeft };
  }, [now, birthDate]);

  const handleChoice = (choice) => {
    setResponse(choice);

    if (choice === "yes") {
      const randomQuote = yesQuotes[Math.floor(Math.random() * yesQuotes.length)];
      setResponseText(randomQuote);
    } else {
      setResponseText("Then change something today.");
    }

    const newStats = updateStats(choice);
    setStats(newStats);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === "y") handleChoice("yes");
      if (key === "n") handleChoice("no");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#EAEAEA] font-sans selection:bg-white selection:text-black overflow-x-hidden p-6 md:p-12 lg:p-24 flex flex-col justify-center relative">
      <NoiseOverlay />

      <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10">
        {/* HERO SECTION */}
        <div className="flex flex-col gap-6 md:gap-12 mb-20">
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] uppercase whitespace-pre-line transform -ml-1 md:-ml-2">
            Eternal
            <br />
            Recurrence.
          </h1>

          <p className="text-lg md:text-2xl font-light tracking-tight max-w-2xl opacity-80 leading-relaxed">
            Would you choose this exact life again—every pain, every joy, every thought—forever?
          </p>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-8">
            <div className="flex gap-4">
              <button
                onClick={() => handleChoice("yes")}
                className="group relative px-10 py-4 border-2 border-[#EAEAEA] overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all"
              >
                <span className="absolute inset-0 w-full h-full bg-[#EAEAEA] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold text-xl tracking-widest group-hover:text-black transition-colors duration-300">
                  YES
                </span>
              </button>

              <button
                onClick={() => handleChoice("no")}
                className="group relative px-10 py-4 border-2 border-[#EAEAEA] overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all"
              >
                <span className="absolute inset-0 w-full h-full bg-[#EAEAEA] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold text-xl tracking-widest group-hover:text-black transition-colors duration-300">
                  NO
                </span>
              </button>
            </div>

            <div className="hidden md:flex gap-4 text-[10px] uppercase tracking-widest opacity-30">
              <span>Press Y</span>
              <span>/</span>
              <span>Press N</span>
            </div>
          </div>

          <div
            className={`mt-8 min-h-12 transition-opacity duration-700 ease-in-out ${
              response ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-3xl italic font-serif opacity-90 leading-normal">
              {responseText}
            </p>
          </div>
        </div>

        {/* DATA SECTION */}
        <div className="flex flex-col gap-2">
          <MotivationLine />
          <Counters metrics={metrics} />
          <EntropyCounter birthDate={birthDate} />
          <LifeGrid weeksLived={metrics.weeksLived} />
          <ConsumptionAnalytics daysAlive={metrics.daysAlive} />
          <BirthDateInput birthDate={birthDate} setBirthDate={setBirthDate} />
          <FooterQuote />
        </div>
      </div>

      <Stats stats={stats} />
    </div>
  );
}
