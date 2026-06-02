type Datum = { day: string; value: number };

export default function CaloriesBars({
  data,
  goal,
}: {
  data: Datum[];
  goal: number;
}) {
  const w = 320;
  const h = 150;
  const padX = 14;
  const padTop = 18;
  const padBottom = 26;
  const innerW = w - padX * 2;
  const innerH = h - padTop - padBottom;

  const max = Math.max(goal, ...data.map((d) => d.value)) * 1.15;
  const slot = innerW / data.length;
  const barW = slot * 0.55;
  const goalY = padTop + innerH - (goal / max) * innerH;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }}>
      {/* Goal line */}
      <line
        x1={padX}
        x2={w - padX}
        y1={goalY}
        y2={goalY}
        stroke="var(--muted-2)"
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.7}
      />
      <text
        x={w - padX}
        y={goalY - 5}
        textAnchor="end"
        fontSize={9}
        fill="var(--muted)"
        fontWeight={600}
      >
        goal {goal}
      </text>

      {/* Bars */}
      {data.map((d, i) => {
        const x = padX + slot * i + (slot - barW) / 2;
        const barH = (d.value / max) * innerH;
        const y = padTop + innerH - barH;
        const isToday = i === data.length - 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(barH, 2)}
              rx={4}
              fill={isToday ? "var(--accent)" : "var(--border-strong)"}
            />
            <text
              x={x + barW / 2}
              y={h - 10}
              textAnchor="middle"
              fontSize={10}
              fill={isToday ? "var(--accent)" : "var(--muted)"}
              fontWeight={600}
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
