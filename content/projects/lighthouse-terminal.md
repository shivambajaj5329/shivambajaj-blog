---
title: "Lighthouse Terminal"
date: 2026-06-01
summary: "A personal markets cockpit — watchlist, per-symbol charts, and composite alerts (AND / OR / THEN) that fire as light-of-death beams. Decision support only, never executes orders."
tagline: "Composite alerts that fire as light-of-death beams. Decision support, not execution."
tech: ["React", "TypeScript", "Vite", "Recharts", "FastAPI", "Redis", "Postgres"]
status: "Live - Self Hosted"
github: ""
demo: ""
embed: "/embeds/lighthouse-terminal/"
embed_height: "780px"
weight: 1
ShowReadingTime: false
ShowWordCount: false
ShowBreadCrumbs: true
showtoc: false
hidemeta: true
---

## Live demo

The prototype below is the real frontend running against an in-browser mock feed. Charts tick, alerts fire, the THEN state machine advances — exactly what the real app does, just with synthetic ticks instead of a broker stream.

> Try it: pick a symbol, set up an alert, watch the beam fire when the condition trips.

## Why it exists

I wanted alerts that compose. Every consumer trading app gives you "price crosses X" and stops there. What I actually want is *"if RSI > 70 AND volume > 2× average, THEN if it pulls back to the 20EMA within 10 minutes, **then** fire."* That's a small state machine, not a threshold.

So I built the combinator: AND / OR / THEN nodes over snapshot predicates, with a separate evaluator for the THEN sequences. The UI surfaces in-flight THEN alerts so you can see what's "armed" vs. what already fired.

## Architecture

```
                    schwab-py            (later)
                       │
                  ┌────▼────┐   ticks    ┌─────────┐
                  │ streamer├───────────►│  Redis  │  pub/sub + hot window
                  └─────────┘            └────┬────┘
                  ┌─────────┐  indicators     │
                  │  engine ├─────────────────┤
                  └─────────┘                 │
                  ┌─────────┐  fire/step      │
                  │evaluator├─────────────────┤  (the combinator tree)
                  └─────────┘                 │
   browser ◄── WS ──┌─────────┐◄──────────────┘
                    │   api   │  FastAPI: REST + WS
                    └────┬────┘
                         │  Postgres: rules (JSONB tree), fire/step events
                    ┌────▼────┐
                    │   web   │  React + Vite + recharts
                    └─────────┘
```

The seam that matters: every view consumes `(snapshot, alerts) → events`. The mock engine in `web/src/engine/mockFeed.ts` is the only thing that gets deleted when the real WebSocket feed exists. **The views never change.**

## Phases

- **P0 (live above):** mock feed + client evaluator + 3 views (Chart / Alerts / Sequences). Pitchable.
- **P1:** FastAPI read API, Postgres rule persistence, WS live fires. Swap mock feed for WS.
- **P2:** schwab-py streamer + incremental indicators in the engine service.
- **P3:** news worker (RSS + Finnhub), per-ticker digest.
- **P4 (optional):** LLM rule parser + analyst summaries.

## The line I'm not crossing

**No execution. Decision support only.** The app never places orders. The complexity budget for adding broker order routing — auth, idempotency, position sync, risk controls, regulatory — is enormous, and the moment you cross it the project stops being a tool and starts being a startup. Lighthouse is for *seeing*, not *acting*.
