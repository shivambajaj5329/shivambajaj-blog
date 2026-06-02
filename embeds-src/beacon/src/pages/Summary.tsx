import { Link } from "react-router-dom";
import CaloriesBars from "../components/charts/CaloriesBars";
import ExerciseProgression from "../components/charts/ExerciseProgression";
import MacrosDonut from "../components/charts/MacrosDonut";
import WeightSparkline from "../components/charts/WeightSparkline";
import {
  calories_last_7_days,
  goals,
  phase,
  week_summary,
  weight_history,
} from "../lib/seed";

function GoalBar({
  label,
  value,
  target,
  unit,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs muted stat-number">
          <span className="font-bold" style={{ color: "var(--text)" }}>
            {value}
          </span>{" "}
          / {target} {unit}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Summary() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">This week</p>
          <h1 className="text-3xl font-bold tracking-tight">Summary</h1>
          <p className="muted text-sm mt-1">May 25 – May 31, 2026</p>
        </div>
        <Link to="/goals" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Edit goals
        </Link>
      </div>

      <div className="card mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="tiny-label">Training phase</p>
            <h2 className="text-xl font-bold tracking-tight mt-1">{phase.name}</h2>
            <p className="muted text-sm mt-1">
              Week {phase.week} of {phase.duration_weeks} · {phase.tagline}
            </p>
          </div>
          <span className="pill">{phase.pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${phase.pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card">
          <p className="tiny-label mb-2">Workouts</p>
          <p className="text-3xl font-bold stat-number">{week_summary.workouts}</p>
          <p className="text-xs muted mt-1">sessions completed</p>
        </div>
        <div className="card">
          <p className="tiny-label mb-2">Lift time</p>
          <p className="text-3xl font-bold stat-number">{week_summary.lifting_min}</p>
          <p className="text-xs muted mt-1">minutes under the bar</p>
        </div>
        <div className="card">
          <p className="tiny-label mb-2">Cardio</p>
          <p className="text-3xl font-bold stat-number">{week_summary.run_km}</p>
          <p className="text-xs muted mt-1">km · {week_summary.run_min} min</p>
        </div>
        <div className="card">
          <p className="tiny-label mb-2">Avg calories</p>
          <p className="text-3xl font-bold stat-number">{week_summary.avg_calories}</p>
          <p className="text-xs muted mt-1">kcal / day</p>
        </div>
      </div>

      {/* Exercise progression — interactive */}
      <div className="card mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="tiny-label">Lift progression</p>
            <h2 className="text-lg font-bold mt-1">Pick a lift to see growth</h2>
          </div>
        </div>
        <ExerciseProgression />
      </div>

      {/* Calories — last 7 days */}
      <div className="card mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="tiny-label">Calories</p>
            <h2 className="text-lg font-bold mt-1">Last 7 days</h2>
          </div>
          <span className="text-xs muted">target {goals.calories_day}</span>
        </div>
        <CaloriesBars data={calories_last_7_days} goal={goals.calories_day} />
      </div>

      {/* Macros donut */}
      <div className="card mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="tiny-label">Macros</p>
            <h2 className="text-lg font-bold mt-1">Today's split</h2>
          </div>
          <span className="text-xs muted">% of calories</span>
        </div>
        <MacrosDonut protein={99.5} carbs={151} fat={23.9} />
      </div>

      {/* Weight trend */}
      <div className="card mb-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="tiny-label">Weight</p>
            <h2 className="text-lg font-bold mt-1">Trend</h2>
          </div>
          <span className="text-xs muted">{weight_history.length} weigh-ins</span>
        </div>
        <WeightSparkline data={weight_history} />
      </div>

      <div className="card mb-4 space-y-4">
        <p className="tiny-label">Goals · weekly progress</p>
        <GoalBar
          label="Lifting minutes"
          value={week_summary.lifting_min}
          target={goals.lifting_min_week}
          unit="min"
        />
        <GoalBar
          label="Running minutes"
          value={week_summary.run_min}
          target={goals.running_min_week}
          unit="min"
        />
        <GoalBar
          label="Avg calories"
          value={week_summary.avg_calories}
          target={goals.calories_day}
          unit="kcal/d"
        />
        <GoalBar
          label="Avg protein"
          value={week_summary.avg_protein}
          target={goals.protein_g_day}
          unit="g/d"
        />
        <GoalBar
          label="Avg carbs"
          value={week_summary.avg_carbs}
          target={goals.carbs_g_day}
          unit="g/d"
        />
        <GoalBar
          label="Avg fat"
          value={week_summary.avg_fat}
          target={goals.fat_g_day}
          unit="g/d"
        />
      </div>
    </>
  );
}
