---
title: "Beacon"
date: 2026-06-01
summary: "Self-hosted daily tracker for lifts, runs, food, and weekly goals. FastAPI + SQLite + HTMX, single Docker container, lives on Tailscale."
tagline: "One small daily check-in. Lifts, runs, food, weight — all in one place."
tech: ["FastAPI", "SQLite", "HTMX", "Tailwind", "Docker", "Tailscale"]
status: "Active — self-hosted"
github: ""
demo: ""
gallery:
  - src: "/projects/beacon/today.png"
    caption: "Today's session — last-session lookup makes progressive overload effortless"
  - src: "/projects/beacon/workout.png"
    caption: "Inline set logging with HTMX — each set saves without leaving the page"
  - src: "/projects/beacon/nutrition.png"
    caption: "Manual food log with time-of-day filter"
  - src: "/projects/beacon/summary.png"
    caption: "Weekly roll-up: lifting minutes, run distance, macros vs. goals"
weight: 2
ShowReadingTime: false
ShowWordCount: false
ShowBreadCrumbs: true
showtoc: false
hidemeta: true
---

## Why it exists

Every other fitness tracker tries to do too much, locks you into a subscription, or sells your data. I wanted **one screen per day**: what's on the program today, what I ate, how much I ran. A single SQLite file I own, nothing in the cloud, accessible from any device on my Tailscale network.

## What's interesting

**Last-session lookup is the killer feature.** Open an exercise and you see exactly what you did last time — weight, reps, RPE. Progressive overload happens without thinking about it.

**HTMX, not SPA.** Each set saves on its own with an inline fragment swap. No build step, no state management, no "you have unsaved changes" anxiety. The whole frontend is Jinja2 + Tailwind CDN + a sprinkle of HTMX.

**Single-process by design.** One uvicorn worker. SQLite is single-writer, so adding workers would just create lock contention. ~180 MB image, <100 MB RAM idle. Runs forever on a cheap homeserver.

**Auth is Tailscale.** No login screen, no password reset flow, no session tokens. If you're on my tailnet you're me, if you're not you can't reach it. Massive simplification.

## Stack

- **Backend:** FastAPI (Python 3.12), single uvicorn worker
- **Storage:** SQLite (one file, easy to back up with `cp`)
- **Frontend:** Jinja2 + Tailwind CDN + HTMX — no build step
- **Container:** ~180 MB image, runs in Docker Compose
- **Network:** Tailscale-only, no public exposure

## Optional: photo-based food estimation

If you set `OPENAI_API_KEY`, snapping a photo of your plate runs it through `gpt-4o-mini` and prefills calories + macros. Strictly opt-in, and the estimate is always editable before it saves.
