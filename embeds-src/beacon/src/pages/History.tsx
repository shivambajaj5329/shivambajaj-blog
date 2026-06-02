import { Link } from "react-router-dom";
import { recent_sessions } from "../lib/seed";

export default function History() {
  const longList = [
    ...recent_sessions,
    { id: 110, date: "2026-05-23", day_id: 5, day_label: "DAY 5 — Conditioning", duration_min: 42 },
    { id: 111, date: "2026-05-22", day_id: 4, day_label: "DAY 4 — Lower Hypertrophy", duration_min: 74 },
    { id: 112, date: "2026-05-20", day_id: 3, day_label: "DAY 3 — Upper Pull", duration_min: 69 },
    { id: 113, date: "2026-05-19", day_id: 2, day_label: "DAY 2 — Upper Push", duration_min: 64 },
    { id: 114, date: "2026-05-18", day_id: 1, day_label: "DAY 1 — Lower Strength", duration_min: 78 },
  ];

  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="tiny-label mb-1">All sessions</p>
          <h1 className="text-3xl font-black tracking-tight">History</h1>
        </div>
        <Link to="/" className="btn-ghost !min-h-0 !py-2 !px-3 text-sm">
          Home
        </Link>
      </div>

      <div className="space-y-2 mb-6">
        {longList.map((s) => (
          <div key={s.id} className="card !py-3">
            <div className="flex justify-between items-center gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{s.day_label}</p>
                <p className="text-xs muted mt-0.5">
                  {s.duration_min} min · {s.date}
                </p>
              </div>
              <span className="pill">{s.date.slice(5)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
