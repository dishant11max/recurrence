 const ConsumptionAnalytics = ({ daysAlive }) => {
  if (daysAlive === null) return null;

  // Rough Estimates (hrs per day average)
  const stats = [
    { label: "Sleep (Unconscious)", hoursPerDay: 8, color: "bg-white/20" },
    { label: "Work (Labor)", hoursPerDay: 4.5, color: "bg-white/40" },     { label: "Screens (Digital)", hoursPerDay: 4, color: "bg-white/60" },
    { label: "Eating/Hygiene", hoursPerDay: 2.5, color: "bg-white/30" },
    { label: "Truly Yours (Free)", hoursPerDay: 5, color: "bg-white" },
  ];

  return (
    <div className="mt-24 w-full max-w-6xl">
      <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-8">Consumption Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      
        <div className="flex flex-col justify-center">
            <div className="w-full h-12 flex border border-white/20">
              {stats.map((stat, i) => {
                 const percent = (stat.hoursPerDay / 24) * 100;
                 return (
                   <div key={i} style={{ width: `${percent}%` }} className={`${stat.color} h-full border-r border-black`} />
                 )
              })}
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mt-2 font-mono">
               <span>0%</span>
               <span>Life Distribution</span>
               <span>100%</span>
            </div>
        </div>

        
        <div className="flex flex-col gap-4">
           {stats.map((stat, i) => {
              const hoursSpent = Math.floor(daysAlive * stat.hoursPerDay);
              const yearsSpent = (hoursSpent / 24 / 365).toFixed(1);
              return (
                 <div key={i} className="flex items-center justify-between group border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                       <div className={`w-3 h-3 ${stat.color}`}></div>
                       <span className="text-sm uppercase tracking-wide text-white/80">{stat.label}</span>
                    </div>
                    <div className="text-right font-mono">
                       <span className="text-lg text-white font-bold">{hoursSpent.toLocaleString()}h</span>
                       <span className="text-xs text-white/40 ml-2">~{yearsSpent}y</span>
                    </div>
                 </div>
              )
           })}
        </div>
      </div>
    </div>
  );
};
export default ConsumptionAnalytics;