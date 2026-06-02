type Datum = { date: string; weight_kg: number };

export default function WeightSparkline({ data }: { data: Datum[] }) {
  // Data comes most-recent first; reverse for left-to-right time order
  const series = [...data].reverse();
  const w = 320;
  const h = 110;
  const padX = 14;
  const padTop = 24;
  const padBottom = 22;
  const innerW = w - padX * 2;
  const innerH = h - padTop - padBottom;

  const values = series.map((d) => d.weight_kg);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 0.5);
  const stepX = series.length > 1 ? innerW / (series.length - 1) : 0;

  const points = series.map((d, i) => {
    const x = padX + stepX * i;
    const y = padTop + innerH - ((d.weight_kg - min) / range) * innerH;
    return { x, y, value: d.weight_kg };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  // Area under the curve
  const areaPath =
    `M${points[0].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} ` +
    points.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L${points[points.length - 1].x.toFixed(1)} ${(padTop + innerH).toFixed(1)} Z`;

  const latest = series[series.length - 1];
  const first = series[0];
  const delta = latest.weight_kg - first.weight_kg;
  const deltaSign = delta > 0 ? "+" : "";

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold stat-number">{latest.weight_kg}</span>
          <span className="text-xs muted">kg</span>
        </div>
        <span
          className="text-xs font-semibold stat-number"
          style={{ color: delta > 0 ? "var(--red)" : "var(--green)" }}
        >
          {deltaSign}
          {delta.toFixed(1)} kg
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }}>
        <defs>
          <linearGradient id="weight-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#weight-grad)" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 ? 3.5 : 2}
            fill={i === points.length - 1 ? "var(--accent)" : "var(--panel)"}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />
        ))}
        <text
          x={padX}
          y={h - 6}
          fontSize={9.5}
          fill="var(--muted)"
          fontWeight={600}
        >
          {series[0].date.slice(5)}
        </text>
        <text
          x={w - padX}
          y={h - 6}
          textAnchor="end"
          fontSize={9.5}
          fill="var(--muted)"
          fontWeight={600}
        >
          {latest.date.slice(5)}
        </text>
      </svg>
    </div>
  );
}
