import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Tab = {
  to: string;
  label: string;
  matches: (path: string) => boolean;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const tabs: Tab[] = [
  {
    to: "/",
    label: "Today",
    matches: (p) => p === "/" || p.startsWith("/workout") || p.startsWith("/history"),
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
      </svg>
    ),
  },
  {
    to: "/run",
    label: "Cardio",
    matches: (p) => p.startsWith("/run"),
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}>
        <circle cx="13" cy="4" r="2" />
        <path d="M5 21l3-6 4-2 2 5 4 1" />
        <path d="M8 11l3-2 3 2 2 4" />
      </svg>
    ),
  },
  {
    to: "/nutrition",
    label: "Food",
    matches: (p) => p.startsWith("/nutrition"),
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}>
        <path d="M4 4v8a4 4 0 0 0 4 4v5" />
        <path d="M8 4v8" />
        <path d="M16 4c0 4 2 4 2 8s-2 4-2 8v1" />
      </svg>
    ),
  },
  {
    to: "/summary",
    label: "Summary",
    matches: (p) =>
      p.startsWith("/summary") || p.startsWith("/goals") || p.startsWith("/metrics"),
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}>
        <line x1="6" y1="20" x2="6" y2="13" />
        <line x1="12" y1="20" x2="12" y2="8" />
        <line x1="18" y1="20" x2="18" y2="4" />
      </svg>
    ),
  },
  {
    to: "/plan",
    label: "Plan",
    matches: (p) => p.startsWith("/plan") || p.startsWith("/upload"),
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}>
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4v-1h6v1" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 nav-shell z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-2xl mx-auto grid grid-cols-5 text-center">
        {tabs.map((t) => {
          const active = t.matches(pathname);
          return (
            <button
              key={t.to}
              onClick={() => navigate(t.to)}
              type="button"
              className={`nav-link ${active ? "active" : ""} py-3 text-[11px] flex flex-col items-center font-semibold`}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span className="nav-glyph">{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
