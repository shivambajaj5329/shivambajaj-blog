import { Link } from "react-router-dom";
import { goals } from "../lib/seed";

export default function Goals() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Targets</p>
          <h1 className="text-3xl font-black tracking-tight">Weekly goals</h1>
        </div>
        <Link to="/summary" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Summary
        </Link>
      </div>

      <div className="card mb-4 space-y-4">
        <p className="tiny-label">Training</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Lifting min/week</label>
            <input type="number" defaultValue={goals.lifting_min_week} />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Running min/week</label>
            <input type="number" defaultValue={goals.running_min_week} />
          </div>
        </div>
      </div>

      <div className="card mb-4 space-y-4">
        <p className="tiny-label">Nutrition · daily</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Calories</label>
            <input type="number" defaultValue={goals.calories_day} />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Protein (g)</label>
            <input type="number" defaultValue={goals.protein_g_day} />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Carbs (g)</label>
            <input type="number" defaultValue={goals.carbs_g_day} />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Fat (g)</label>
            <input type="number" defaultValue={goals.fat_g_day} />
          </div>
        </div>
        <button type="button" className="btn-primary w-full">
          Save goals
        </button>
      </div>
    </>
  );
}
