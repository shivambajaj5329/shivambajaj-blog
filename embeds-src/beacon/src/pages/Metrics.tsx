import { Link } from "react-router-dom";
import { latest_weight, weight_history } from "../lib/seed";

export default function Metrics() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Body</p>
          <h1 className="text-3xl font-black tracking-tight">Metrics</h1>
        </div>
        <Link to="/" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Home
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="card">
          <p className="tiny-label mb-2">Weight</p>
          <p className="text-2xl font-black stat-number">{latest_weight.weight_kg}</p>
          <p className="text-[11px] muted">kg</p>
        </div>
        <div className="card">
          <p className="tiny-label mb-2">RHR</p>
          <p className="text-2xl font-black stat-number">{latest_weight.resting_hr}</p>
          <p className="text-[11px] muted">bpm</p>
        </div>
        <div className="card">
          <p className="tiny-label mb-2">Sleep</p>
          <p className="text-2xl font-black stat-number">{latest_weight.sleep_h}</p>
          <p className="text-[11px] muted">hours</p>
        </div>
      </div>

      <div className="card mb-4 space-y-3">
        <p className="tiny-label">Log today</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Weight (kg)</label>
            <input type="number" step="0.1" placeholder="82.3" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">RHR (bpm)</label>
            <input type="number" placeholder="55" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Sleep (h)</label>
            <input type="number" step="0.1" placeholder="7.5" />
          </div>
        </div>
        <button type="button" className="btn-primary w-full">
          Save metrics
        </button>
      </div>

      <h3 className="tiny-label mb-2">Recent</h3>
      <div className="space-y-2 mb-6">
        {weight_history.map((w) => (
          <div key={w.date} className="card !py-3 flex justify-between items-center">
            <span className="text-sm font-medium">{w.date}</span>
            <span className="text-sm muted stat-number">
              {w.weight_kg} kg · RHR {w.resting_hr} · {w.sleep_h}h
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
