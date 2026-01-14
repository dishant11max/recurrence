export default function Counters({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl mt-24 border-t border-white/10 pt-12">
      <CounterItem label="Days Alive" value={metrics.daysAlive !== null ? metrics.daysAlive.toLocaleString() : "—"} />
      <CounterItem label="Weeks Lived" value={metrics.weeksLived !== null ? metrics.weeksLived.toLocaleString() : "—"} />
      <CounterItem label="Days left this year" value={metrics.daysLeftYear} />
      <CounterItem label="Est. Weeks Left (80y)" value={metrics.weeksLeft !== null ? metrics.weeksLeft.toLocaleString() : "—"} />
    </div>
  );
}

function CounterItem({ label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</span>
      <span className="text-3xl md:text-5xl font-bold tracking-tighter leading-none font-mono text-white/90">
        {value}
      </span>
    </div>
  );
}
