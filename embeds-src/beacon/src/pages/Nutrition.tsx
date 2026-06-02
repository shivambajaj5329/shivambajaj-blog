import { Link } from "react-router-dom";
import {
  ai_enabled,
  food_entries_today,
  food_totals_today,
  recent_food_days,
  selected_date,
} from "../lib/seed";

export default function Nutrition() {
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">Food log</p>
          <h1 className="text-3xl font-black tracking-tight">Mon, Jun 1</h1>
        </div>
        <Link to="/" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Home
        </Link>
      </div>

      <div className="card mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="tiny-label">11:59 PM day total</p>
            <p className="text-xs muted mt-1">
              Recalculated from every food item logged for this date.
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black stat-number accent">
              {food_totals_today.calories}
            </p>
            <p className="text-xs muted">kcal</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="card-soft !p-3">
            <p className="text-lg font-black stat-number">
              {Math.round(food_totals_today.protein_g)}g
            </p>
            <p className="text-[11px] muted">protein</p>
          </div>
          <div className="card-soft !p-3">
            <p className="text-lg font-black stat-number">
              {Math.round(food_totals_today.carbs_g)}g
            </p>
            <p className="text-[11px] muted">carbs</p>
          </div>
          <div className="card-soft !p-3">
            <p className="text-lg font-black stat-number">
              {Math.round(food_totals_today.fat_g)}g
            </p>
            <p className="text-[11px] muted">fat</p>
          </div>
        </div>
      </div>

      <div className="card mb-5 space-y-4">
        <div>
          <p className="tiny-label">ChatGPT estimate</p>
          <h2 className="text-xl font-black tracking-tight mt-1">Quick add food</h2>
          <p className="text-sm muted mt-1">
            Type what you ate or upload a photo. It saves estimated items so you can edit anything off.
          </p>
          {!ai_enabled && (
            <p className="text-xs muted mt-2">
              Set <code>OPENAI_API_KEY</code> on the server to enable this. Manual logging still works.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 116px" }}>
            <div>
              <label className="text-xs muted block mb-1">Describe meal</label>
              <textarea placeholder="I had 2 bananas and one cup cottage cheese" disabled={!ai_enabled} />
            </div>
            <div>
              <label className="text-xs muted block mb-1">Time</label>
              <input type="time" defaultValue="12:00" disabled={!ai_enabled} />
            </div>
          </div>
          <button type="button" className="btn-soft w-full" disabled={!ai_enabled}>
            Estimate from text
          </button>
        </div>

        <div className="divider"></div>

        <div className="space-y-3">
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 116px" }}>
            <div>
              <label className="text-xs muted block mb-1">Food photo</label>
              <input type="file" accept="image/*" disabled={!ai_enabled} />
            </div>
            <div>
              <label className="text-xs muted block mb-1">Time</label>
              <input type="time" defaultValue="12:00" disabled={!ai_enabled} />
            </div>
          </div>
          <div>
            <label className="text-xs muted block mb-1">Optional hint</label>
            <input type="text" placeholder="e.g. grilled chicken bowl, large plate" disabled={!ai_enabled} />
          </div>
          <button type="button" className="btn-soft w-full" disabled={!ai_enabled}>
            Estimate from photo
          </button>
        </div>
      </div>

      <div className="card space-y-3 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="tiny-label">Manual entry</p>
            <p className="text-xs muted">Most accurate when you already know calories and macros.</p>
          </div>
          <span className="pill">{food_totals_today.entries} items</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Date</label>
            <input type="date" defaultValue={selected_date} />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Time eaten</label>
            <input type="time" defaultValue="12:00" />
          </div>
        </div>

        <div>
          <label className="text-xs muted block mb-1">Food</label>
          <input type="text" placeholder="banana, cottage cheese, rice bowl..." />
        </div>
        <div>
          <label className="text-xs muted block mb-1">Serving / quantity</label>
          <input type="text" placeholder="1 banana · 1 cup · 200g" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs muted block mb-1">Calories</label>
            <input type="number" inputMode="numeric" placeholder="105" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Protein (g)</label>
            <input type="number" step="0.1" inputMode="decimal" placeholder="2" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Carbs (g)</label>
            <input type="number" step="0.1" inputMode="decimal" placeholder="27" />
          </div>
          <div>
            <label className="text-xs muted block mb-1">Fat (g)</label>
            <input type="number" step="0.1" inputMode="decimal" placeholder="0.3" />
          </div>
        </div>
        <button type="button" className="btn-primary w-full">
          Add food manually
        </button>
      </div>

      <h3 className="tiny-label mb-2">Foods eaten</h3>
      <div className="space-y-2 mb-6">
        {food_entries_today.map((e) => (
          <div key={e.id} className="card !p-4">
            <div className="flex gap-3">
              {e.photo_url && (
                <img
                  src={e.photo_url}
                  alt={e.food_name}
                  className="shrink-0"
                  style={{
                    width: 68,
                    height: 68,
                    objectFit: "cover",
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                  }}
                />
              )}
              <div className="flex justify-between gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="pill">{e.eaten_at}</span>
                    {e.source === "ai_photo" && (
                      <span
                        className="pill"
                        style={{
                          background: "var(--accent-soft)",
                          color: "var(--accent)",
                          borderColor: "rgba(0,122,255,.22)",
                        }}
                      >
                        📷 from photo
                      </span>
                    )}
                    {e.source === "ai_text" && (
                      <span
                        className="pill"
                        style={{
                          background: "var(--accent-soft)",
                          color: "var(--accent)",
                          borderColor: "rgba(0,122,255,.22)",
                        }}
                      >
                        ✨ from text
                      </span>
                    )}
                  </div>
                  <h3 className="font-black truncate">{e.food_name}</h3>
                  {e.serving && <p className="text-sm muted mt-0.5">{e.serving}</p>}
                  {e.notes && <p className="text-xs muted mt-1">{e.notes}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-black stat-number">{e.calories ?? 0}</p>
                  <p className="text-[11px] muted">kcal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-3 text-xs muted">
              <div className="flex gap-2 flex-wrap">
                <span>P {(e.protein_g ?? 0).toFixed(1)}g</span>
                <span>C {(e.carbs_g ?? 0).toFixed(1)}g</span>
                <span>F {(e.fat_g ?? 0).toFixed(1)}g</span>
              </div>
              <button type="button" style={{ color: "var(--red)" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="tiny-label mb-2">Recent day totals</h3>
      <div className="space-y-2 mb-6">
        {recent_food_days.map((n) => (
          <div key={n.date} className="card block !py-3 transition-transform active:scale-[.99]">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">{n.date}</p>
                <p className="text-xs muted">{n.entries} food items</p>
              </div>
              <div className="text-right text-xs muted">
                <p>
                  <span className="font-bold">{n.calories}</span> kcal
                </p>
                <p>{n.protein_g}g protein</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
