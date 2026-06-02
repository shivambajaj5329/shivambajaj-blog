import { Link } from "react-router-dom";

export default function Upload() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Program</p>
          <h1 className="text-3xl font-black tracking-tight">Upload plan</h1>
        </div>
        <Link to="/plan" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Current
        </Link>
      </div>

      <div className="card mb-4">
        <p className="tiny-label mb-2">CSV format</p>
        <p className="text-sm muted mb-3">
          One row per (day, exercise). Uploading a new program deactivates the old
          one — workout history is preserved.
        </p>
        <pre
          className="text-[11px] overflow-x-auto p-3 rounded-xl"
          style={{ background: "var(--panel-soft)", color: "var(--text)" }}
        >
{`day_order,day_label,day_of_week,exercise_order,exercise,sets,reps,rpe,notes
1,DAY 1 - Lower Strength,Mon,1,Back Squat,4,4-5,7-8,Top set RPE 7-8.
1,DAY 1 - Lower Strength,Mon,2,Romanian Deadlift,3,6-8,8,Slow eccentric.`}
        </pre>
      </div>

      <div className="card space-y-3 mb-4">
        <div>
          <label className="text-xs muted block mb-1">CSV file</label>
          <input type="file" accept=".csv,text/csv" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Plan start date</label>
            <input type="date" defaultValue="2026-06-01" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Duration (weeks)</label>
            <input type="number" defaultValue={12} />
          </div>
        </div>
        <button type="button" className="btn-primary w-full">
          Upload program
        </button>
      </div>
    </>
  );
}
