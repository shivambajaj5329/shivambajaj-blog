import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { days, exercises_by_day, last_session_lookup, today_date } from "../lib/seed";

function SetRow({ exId, setNum }: { exId: number; setNum: number }) {
  const [saved, setSaved] = useState(false);
  return (
    <div
      className="grid gap-2 items-center"
      style={{ gridTemplateColumns: "28px 1fr 1fr 1fr 48px" }}
    >
      <span className="text-xs muted font-bold">#{setNum}</span>
      <input type="number" step="0.5" placeholder="kg" inputMode="decimal" className="text-center" />
      <input type="number" placeholder="reps" inputMode="numeric" className="text-center" />
      <input type="number" step="0.5" placeholder="RPE" inputMode="decimal" className="text-center" />
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            window.setTimeout(() => setSaved(false), 1200);
          }}
          className="btn-primary !min-h-0 !p-0"
          style={{ height: 44, width: 44 }}
          aria-label={`Save set ${setNum} of exercise ${exId}`}
        >
          {saved ? "✓" : "OK"}
        </button>
      </div>
    </div>
  );
}

export default function Workout() {
  const { dayId } = useParams();
  const day = days.find((d) => d.id === Number(dayId)) ?? days[0];
  const exercises = exercises_by_day[day.id] ?? [];

  return (
    <>
      <Link to="/" className="accent text-sm mb-3 inline-block font-semibold">
        Back to day overview
      </Link>
      <div className="mb-5">
        <p className="tiny-label mb-1">Workout</p>
        <h1 className="text-3xl font-black tracking-tight">{day.day_label}</h1>
        <p className="muted text-sm mt-1">{today_date}</p>
      </div>

      {exercises.map((ex) => {
        const last = last_session_lookup[ex.exercise];
        const setsCount = parseInt(ex.sets) || 4;
        return (
          <div key={ex.id} className="card mb-4">
            <div className="flex justify-between items-start mb-2 gap-3">
              <div>
                <h3 className="font-black text-lg leading-tight">{ex.exercise}</h3>
                {ex.rpe && <p className="text-xs muted mt-1">Target RPE {ex.rpe}</p>}
              </div>
              <span className="pill shrink-0">
                {ex.sets}×{ex.reps}
              </span>
            </div>
            {ex.notes && <p className="text-xs muted mb-3 italic">{ex.notes}</p>}

            {last && (
              <div className="card-soft mb-3 text-xs">
                <p className="muted mb-2">Last session · {last.date}</p>
                <div className="flex flex-wrap gap-2 muted">
                  {last.sets.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full"
                      style={{
                        background: "var(--panel-solid)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {s.weight != null ? s.weight : "—"}kg × {s.reps ?? "—"}
                      {s.rpe ? ` @ ${s.rpe}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {Array.from({ length: setsCount }, (_, i) => (
                <SetRow key={i + 1} exId={ex.id} setNum={i + 1} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="card mb-6 space-y-3">
        <div>
          <p className="tiny-label">Finish workout</p>
          <p className="text-xs muted mt-1">
            Add total lifting minutes so the weekly summary tracks training time.
          </p>
        </div>
        <div>
          <label className="text-xs muted block mb-1">Total workout minutes</label>
          <input type="number" step="1" inputMode="numeric" placeholder="75" />
        </div>
        <div>
          <label className="text-xs muted block mb-1">Notes</label>
          <input type="text" placeholder="Felt strong, tired, PR, etc." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button type="button" className="btn-ghost w-full">
            Save session
          </button>
          <Link to="/" className="btn-primary w-full">
            Save and go next day
          </Link>
        </div>
      </div>
    </>
  );
}
