const Stats = ({ stats }) => (
  <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col items-end gap-1 pointer-events-none mix-blend-difference z-50">
    <div className="text-[10px] uppercase tracking-widest text-white/30">Total Choices</div>
    <div className="text-xs font-mono text-white/50">
      YES: {stats.yes} &nbsp;|&nbsp; NO: {stats.no}
    </div>
  </div>
);

export default Stats;