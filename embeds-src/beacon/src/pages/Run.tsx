import { Link } from "react-router-dom";
import { runs_recent } from "../lib/seed";

export default function Run() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Cardio</p>
          <h1 className="text-3xl font-black tracking-tight">Log a run</h1>
        </div>
        <Link to="/" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Home
        </Link>
      </div>

      <div className="card mb-4 space-y-3">
        <div>
          <label className="text-xs muted block mb-1">Date</label>
          <input type="date" defaultValue="2026-06-01" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Duration (min)</label>
            <input type="number" inputMode="numeric" placeholder="30" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Distance (km)</label>
            <input type="number" step="0.1" inputMode="decimal" placeholder="5.0" />
          </div>
        </div>
        <div>
          <label className="text-xs muted block mb-1">Notes</label>
          <input type="text" placeholder="easy z2, tempo, intervals..." />
        </div>
        <button type="button" className="btn-primary w-full">
          Save run
        </button>
      </div>

      <h3 className="tiny-label mb-2">Recent runs</h3>
      <div className="space-y-2 mb-6">
        {runs_recent.map((r) => (
          <div key={r.id} className="card !py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">
                  {r.distance_km} km · {r.duration_min} min
                </p>
                {r.notes && <p className="text-xs muted mt-1">{r.notes}</p>}
              </div>
              <span className="pill">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
