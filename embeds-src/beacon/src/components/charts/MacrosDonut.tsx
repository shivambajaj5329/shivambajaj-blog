export default function MacrosDonut({
  protein,
  carbs,
  fat,
}: {
  protein: number;
  carbs: number;
  fat: number;
}) {
  // calories per gram
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fat * 9;
  const total = pCal + cCal + fCal || 1;

  const pPct = (pCal / total) * 100;
  const cPct = (cCal / total) * 100;
  const fPct = (fCal / total) * 100;

  const r = 38;
  const c = 2 * Math.PI * r;

  // segment lengths
  const pLen = (pPct / 100) * c;
  const cLen = (cPct / 100) * c;
  const fLen = (fPct / 100) * c;

  const proteinColor = "var(--accent)";
  const carbsColor = "var(--accent-2)";
  const fatColor = "#ff9f0a";

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" width={96} height={96} style={{ flexShrink: 0 }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--panel-soft)" strokeWidth={10} />
        <g transform="rotate(-90 50 50)">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={proteinColor}
            strokeWidth={10}
            strokeDasharray={`${pLen} ${c}`}
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={carbsColor}
            strokeWidth={10}
            strokeDasharray={`${cLen} ${c}`}
            strokeDashoffset={-pLen}
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={fatColor}
            strokeWidth={10}
            strokeDasharray={`${fLen} ${c}`}
            strokeDashoffset={-(pLen + cLen)}
          />
        </g>
      </svg>

      <div className="flex-1 space-y-2 text-xs">
        <Row color={proteinColor} label="Protein" grams={protein} pct={pPct} />
        <Row color={carbsColor} label="Carbs" grams={carbs} pct={cPct} />
        <Row color={fatColor} label="Fat" grams={fat} pct={fPct} />
      </div>
    </div>
  );
}

function Row({
  color,
  label,
  grams,
  pct,
}: {
  color: string;
  label: string;
  grams: number;
  pct: number;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: 999,
            background: color,
          }}
        />
        <span style={{ color: "var(--text)" }} className="font-semibold">
          {label}
        </span>
      </div>
      <span className="muted stat-number">
        {Math.round(grams)}g · {Math.round(pct)}%
      </span>
    </div>
  );
}
