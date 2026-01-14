import { setBirthDate as saveBirthDate } from "../utils/storage";

export default function BirthDateInput({ birthDate, setBirthDate }) {
  const handleChange = (e) => {
    const val = e.target.value;
    saveBirthDate(val);
    setBirthDate(val);
  };

  return (
    <div className="mt-24 w-full max-w-6xl flex flex-col items-start gap-4">
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">
        Calibrate your timeline (Date of Birth)
      </label>
      <input
        type="date"
        value={birthDate || ""}
        onChange={handleChange}
        className="bg-transparent border-b border-white/20 text-white font-mono text-lg focus:outline-none focus:border-white transition-colors py-2 w-full md:w-auto"
      />
    </div>
  );
}
