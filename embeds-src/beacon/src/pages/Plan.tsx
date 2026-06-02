import { Link } from "react-router-dom";
import { all_phases, days, exercises_by_day, phase } from "../lib/seed";

export default function Plan() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Program</p>
          <h1 className="text-3xl font-black tracking-tight">12-week build</h1>
          <p className="muted text-sm mt-1">Started Apr 21, 2026</p>
        </div>
        <Link to="/upload" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Upload new
        </Link>
      </div>

      <div className="card mb-4">
        <p className="tiny-label mb-3">Phases</p>
        <div className="flex items-center gap-3 mb-4 overflow-x-auto">
          {all_phases.map((p) => {
            const isCurrent = p.name === phase.name;
            const isDone = p.pct === 100;
            return (
              <div key={p.name} className="flex flex-col items-center min-w-[64px]">
                <span
                  className={`phase-dot ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
                />
                <span className="text-[11px] mt-1.5 font-semibold whitespace-nowrap">
                  {p.name}
                </span>
                <span className="text-[10px] muted">{p.duration_weeks}w</span>
              </div>
            );
          })}
        </div>
        <p className="text-sm muted">
          You're in <span className="accent font-bold">{phase.name}</span>, week {phase.week} of{" "}
          {phase.duration_weeks}.
        </p>
      </div>

      {days.map((d) => {
        const exs = exercises_by_day[d.id] ?? [];
        return (
          <div key={d.id} className="card mb-3">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="tiny-label">{d.day_of_week}</p>
                <h3 className="font-black text-lg mt-0.5">{d.day_label}</h3>
              </div>
              <span className="pill">{exs.length} lifts</span>
            </div>
            <div className="space-y-2">
              {exs.map((ex) => (
                <div key={ex.id} className="card-soft !py-2.5 flex justify-between items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{ex.exercise}</p>
                    {ex.notes && <p className="text-xs muted truncate">{ex.notes}</p>}
                  </div>
                  <span className="text-xs muted shrink-0 ml-2 stat-number">
                    {ex.sets}×{ex.reps}
                    {ex.rpe && ` @ ${ex.rpe}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
