import { useMemo, useState } from "react";
import Picker from "../Picker";
import { exercise_history } from "../../lib/seed";
import type { ExercisePoint } from "../../lib/seed";

// Epley estimated 1RM
function est1RM(weight: number, reps: number) {
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

export default function ExerciseProgression() {
  const exercises = Object.keys(exercise_history);
  const [picked, setPicked] = useState(exercises[0]);
  const [metric, setMetric] = useState<"top" | "e1rm">("top");
  const [hovered, setHovered] = useState<number | null>(null);

  const data: ExercisePoint[] = exercise_history[picked] ?? [];

  const series = useMemo(
    () =>
      data.map((d) => ({
        date: d.date,
        value: metric === "top" ? d.top_weight : est1RM(d.top_weight, d.top_reps),
        weight: d.top_weight,
        reps: d.top_reps,
      })),
    [data, metric]
  );

  const w = 320;
  const h = 184;
  const padL = 28;
  const padR = 14;
  const padTop = 22;
  const padBottom = 30;
  const innerW = w - padL - padR;
  const innerH = h - padTop - padBottom;

  const values = series.map((p) => p.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = Math.max(maxV - minV, 1);
  const stepX = series.length > 1 ? innerW / (series.length - 1) : 0;

  const points = series.map((d, i) => ({
    x: padL + stepX * i,
    y: padTop + innerH - ((d.value - minV) / range) * innerH,
    ...d,
  }));

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath =
    `M${points[0].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} ` +
    points.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L${points[points.length - 1].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} Z`;

  // y-axis ticks: min, mid, max rounded
  const yTicks = [minV, (minV + maxV) / 2, maxV].map((v) => Math.round(v * 2) / 2);

  const latest = series[series.length - 1];
  const first = series[0];
  const delta = latest.value - first.value;
  const deltaPct = (delta / first.value) * 100;
  const deltaUp = delta >= 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Picker
          label="Exercise"
          value={picked}
          onChange={setPicked}
          options={exercises.map((ex) => ({ value: ex, label: ex }))}
        />
        <Picker
          label="Metric"
          value={metric}
          onChange={(v) => setMetric(v as "top" | "e1rm")}
          options={[
            { value: "top", label: "Top set weight" },
            { value: "e1rm", label: "Estimated 1RM" },
          ]}
        />
      </div>

      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold stat-number">{latest.value}</span>
          <span className="text-xs muted">
            kg · Week {series.length} · {latest.weight}kg × {latest.reps}
          </span>
        </div>
        <span
          className="text-xs font-semibold stat-number"
          style={{ color: deltaUp ? "var(--green)" : "var(--red)" }}
        >
          {deltaUp ? "+" : ""}
          {delta.toFixed(1)} kg ({deltaUp ? "+" : ""}
          {deltaPct.toFixed(0)}%)
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="ex-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* y axis grid + labels */}
        {yTicks.map((tickVal, i) => {
          const yPos = padTop + innerH - ((tickVal - minV) / range) * innerH;
          return (
            <g key={i}>
              <line
                x1={padL}
                x2={w - padR}
                y1={yPos}
                y2={yPos}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={padL - 4}
                y={yPos + 3}
                textAnchor="end"
                fontSize={9}
                fill="var(--muted)"
                fontWeight={600}
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#ex-grad)" />
        <path
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glowing halo behind the latest point */}
        {(() => {
          const p = points[points.length - 1];
          return (
            <>
              <circle
                cx={p.x}
                cy={p.y}
                r={11}
                fill="var(--accent)"
                opacity={0.15}
                className="glow-pulse-outer"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={7}
                fill="var(--accent)"
                opacity={0.28}
                className="glow-pulse-inner"
              />
            </>
          );
        })()}

        {/* Visible point dots + week labels */}
        {points.map((p, i) => {
          const isLast = i === points.length - 1;
          const isHovered = hovered === i;
          return (
            <g key={`dot-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 4 : isLast ? 3.5 : 2}
                fill={isLast || isHovered ? "var(--accent)" : "var(--panel)"}
                stroke="var(--accent)"
                strokeWidth={1.5}
                style={{ transition: "r 0.12s ease" }}
              />
              <text
                x={p.x}
                y={h - 8}
                textAnchor="middle"
                fontSize={9}
                fill={isLast || isHovered ? "var(--accent)" : "var(--muted)"}
                fontWeight={isLast || isHovered ? 700 : 600}
                style={{ transition: "fill 0.12s ease" }}
              >
                W{i + 1}
              </text>
            </g>
          );
        })}

        {/* Hover/tap hit areas (transparent) */}
        {points.map((p, i) => (
          <circle
            key={`hit-${i}`}
            cx={p.x}
            cy={p.y}
            r={14}
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(i)}
            onClick={() => setHovered((h) => (h === i ? null : i))}
          />
        ))}

        {/* Tooltip */}
        {hovered !== null && (() => {
          const p = points[hovered];
          const d = series[hovered];
          const ttW = 96;
          const ttH = 36;
          const below = p.y < 50;
          let ttX = p.x - ttW / 2;
          ttX = Math.max(padL - 4, Math.min(w - padR - ttW + 4, ttX));
          const ttY = below ? p.y + 10 : p.y - ttH - 10;
          const cx = p.x;
          const arrowY = below ? ttY : ttY + ttH;
          const arrowDir = below ? -1 : 1;

          return (
            <g style={{ pointerEvents: "none" }}>
              {/* vertical guide line */}
              <line
                x1={p.x}
                x2={p.x}
                y1={padTop}
                y2={padTop + innerH}
                stroke="var(--accent)"
                strokeWidth={1}
                strokeDasharray="2 3"
                opacity={0.4}
              />
              {/* tooltip body */}
              <rect
                x={ttX}
                y={ttY}
                width={ttW}
                height={ttH}
                rx={7}
                fill="var(--text)"
              />
              {/* small triangle pointer */}
              <polygon
                points={`${cx - 4},${arrowY} ${cx + 4},${arrowY} ${cx},${arrowY + arrowDir * 5}`}
                fill="var(--text)"
              />
              <text
                x={ttX + ttW / 2}
                y={ttY + 14}
                textAnchor="middle"
                fontSize={10}
                fill="var(--bg)"
                fontWeight={700}
              >
                Week {hovered + 1} · {d.date.slice(5)}
              </text>
              <text
                x={ttX + ttW / 2}
                y={ttY + 27}
                textAnchor="middle"
                fontSize={10}
                fill="var(--bg)"
                fontWeight={500}
                opacity={0.85}
              >
                {d.weight}kg × {d.reps}
              </text>
            </g>
          );
        })()}
      </svg>

      <style>{`
        .glow-pulse-outer {
          animation: glow-pulse 2.2s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .glow-pulse-inner {
          animation: glow-pulse-inner 2.2s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes glow-pulse {
          0%, 100% { transform: scale(0.92); opacity: 0.15; }
          50%      { transform: scale(1.25); opacity: 0.28; }
        }
        @keyframes glow-pulse-inner {
          0%, 100% { transform: scale(0.95); opacity: 0.28; }
          50%      { transform: scale(1.15); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
