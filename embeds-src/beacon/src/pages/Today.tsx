import { Link } from "react-router-dom";
import {
  today_date,
  today_dow,
  selected_date,
  next_date,
  phase,
  today_day,
  food_totals_today,
  latest_weight,
  days,
  recent_sessions,
} from "../lib/seed";

export default function Today() {
  return (
    <>
      <section className="mb-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="tiny-label mb-1">Today</p>
            <h1 className="text-4xl font-black tracking-tight">Beacon</h1>
            <p className="muted text-sm mt-1">{today_date}</p>
          </div>
          <span className="pill mt-1">{today_dow}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2 mt-4">
          <div className="min-w-0">
            <label className="tiny-label block mb-1">Jump to date</label>
            <input type="date" defaultValue={selected_date} />
          </div>
          <div className="pt-5">
            <Link to="/" className="btn-soft whitespace-nowrap" data-next={next_date}>
              Next day
            </Link>
          </div>
        </div>
      </section>

      <div className="card mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="tiny-label">Training phase</p>
            <h2 className="text-2xl font-black tracking-tight mt-1">{phase.name}</h2>
            <p className="muted text-sm mt-1">
              Week {phase.week} of {phase.duration_weeks} · {phase.tagline}
            </p>
          </div>
          <span className="pill">{phase.pct}%</span>
        </div>
        <div className="progress-track mb-3">
          <div className="progress-fill" style={{ width: `${phase.pct}%` }} />
        </div>
        <p className="text-sm muted">{phase.focus}</p>
      </div>

      <div className="card mb-4 overflow-hidden relative">
        <p className="tiny-label mb-2">Scheduled session</p>
        <h2 className="text-2xl font-black tracking-tight mb-1">{today_day.day_label}</h2>
        <p className="muted text-sm mb-4">
          Log the work, then save and move to the next day.
        </p>
        <Link to={`/workout/${today_day.id}`} className="btn-primary w-full">
          Start workout
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <Link to="/nutrition" className="card transition-transform active:scale-[.99]">
          <p className="tiny-label mb-2">Food</p>
          <p className="text-2xl font-black stat-number">{food_totals_today.calories}</p>
          <p className="text-xs muted mt-1">{food_totals_today.entries} items logged</p>
        </Link>
        <Link to="/summary" className="card transition-transform active:scale-[.99]">
          <p className="tiny-label mb-2">Summary</p>
          <p className="font-bold">Weekly progress</p>
          <p className="text-xs muted mt-1">Goals, totals, phase</p>
        </Link>
        <Link
          to="/upload"
          className="card transition-transform active:scale-[.99]"
          style={{ borderColor: "rgba(0,122,255,.22)" }}
        >
          <p className="tiny-label mb-2">Plan</p>
          <p className="font-bold accent">Upload plan</p>
          <p className="text-xs muted mt-1">CSV import</p>
        </Link>
        <Link to="/metrics" className="card transition-transform active:scale-[.99]">
          <p className="tiny-label mb-2">Body</p>
          <p className="font-bold">{latest_weight.weight_kg} kg</p>
          <p className="text-xs muted mt-1">latest weight</p>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link to="/run" className="btn-ghost">
          Log cardio
        </Link>
        <Link to="/goals" className="btn-ghost">
          Set goals
        </Link>
      </div>

      <h3 className="tiny-label mb-2">Sessions</h3>
      <div className="space-y-2 mb-6">
        {days.map((d) => (
          <Link
            key={d.id}
            to={`/workout/${d.id}`}
            className="card block transition-transform active:scale-[.99] !py-3"
          >
            <div className="flex justify-between items-center gap-3">
              <span className="font-semibold text-sm">{d.day_label}</span>
              <span className="pill shrink-0">{d.day_of_week}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="tiny-label">Recent sessions</h3>
        <Link to="/history" className="text-xs accent font-semibold">
          History
        </Link>
      </div>
      <div className="space-y-2 mb-6">
        {recent_sessions.map((s) => (
          <div key={s.id} className="card text-sm flex justify-between items-center !py-3">
            <span className="font-medium">{s.day_label || "Rest / manual"}</span>
            <span className="muted">{s.date}</span>
          </div>
        ))}
      </div>
    </>
  );
}
