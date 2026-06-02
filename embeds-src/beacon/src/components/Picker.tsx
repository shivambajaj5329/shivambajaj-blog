import { useEffect, useState } from "react";

type Option = { value: string; label: string };

export default function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div>
        <label className="text-[11px] muted block mb-1 font-semibold">{label}</label>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            minHeight: 40,
            padding: "9px 13px",
            background: "var(--panel-soft)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            color: "var(--text)",
            fontSize: 14,
            fontFamily: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            textAlign: "left",
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {current?.label ?? value}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.55 }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.4)",
              zIndex: 60,
              animation: "picker-fade 180ms ease",
            }}
          />

          {/* Sheet */}
          <div
            role="dialog"
            aria-label={label}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 70,
              background: "var(--panel)",
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              borderTop: "1px solid var(--border)",
              boxShadow: "0 -10px 30px rgba(0,0,0,0.18)",
              padding: "10px 12px calc(18px + env(safe-area-inset-bottom))",
              maxHeight: "70vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              animation: "picker-slide 220ms cubic-bezier(.22,1,.36,1)",
            }}
          >
            {/* Grab handle */}
            <div
              style={{
                width: 38,
                height: 4.5,
                background: "var(--border-strong)",
                borderRadius: 999,
                margin: "4px auto 10px",
              }}
            />

            <div className="flex items-baseline justify-between mb-2 px-1">
              <span className="tiny-label">{label}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: "4px 6px",
                }}
              >
                Cancel
              </button>
            </div>

            <div style={{ overflowY: "auto", flex: 1 }}>
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "13px 12px",
                      background: active ? "var(--accent-soft)" : "transparent",
                      border: "none",
                      borderRadius: 12,
                      color: active ? "var(--accent)" : "var(--text)",
                      fontSize: 15,
                      fontFamily: "inherit",
                      fontWeight: active ? 600 : 500,
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 2,
                    }}
                  >
                    <span>{opt.label}</span>
                    {active && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <style>{`
            @keyframes picker-slide {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes picker-fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </>
      )}
    </>
  );
}
