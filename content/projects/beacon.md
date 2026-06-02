---
title: "Beacon"
date: 2026-06-01
summary: "Self-hosted daily tracker for lifts, runs, food, and weekly goals. FastAPI + SQLite + HTMX, single Docker container, lives on Tailscale."
tagline: "One small daily check-in. Lifts, runs, food, weight — all in one place."
tech: ["FastAPI", "SQLite", "HTMX", "Tailwind", "Docker", "Tailscale"]
status: "Active — self-hosted"
github: ""
demo: ""
embed: "/embeds/beacon/"
embed_style: "phone"
weight: 2
ShowReadingTime: false
ShowWordCount: false
ShowBreadCrumbs: true
showtoc: false
hidemeta: true
---

## Why I built it

A few things kept bothering me at once.

I lift, and I wanted a fast log that gets out of my way between sets. The apps I tried all wanted notification permissions before they'd show me anything, hid the one piece of information I actually wanted ("what did I do last week on this lift") behind a couple of taps, and asked me to subscribe to remove a banner. I wasn't going to pay a monthly fee to write numbers down.

The bigger problem was that my workout history was sitting in someone else's database. If the app pivoted, got acquired, raised prices, or shipped a redesign I didn't like, years of data would be either gone or paywalled. I'd rather have it in a file I own, on hardware I own, that I can back up by typing `cp`.

I also wanted food and lifting in the same place. Most apps treat them as separate worlds, which means you're switching between two interfaces to answer simple questions like "did I hit protein on a hard squat day."

So I built one screen per day, with everything on it.

## What makes it actually nice to use

The single thing I'd point to is the **last-session lookup**. Open any exercise and the top of the card shows exactly what you did last time — weight, reps, how hard it felt. I never have to remember whether I squatted 130 or 132.5 the previous Monday. It's right there, every time, on the same screen as the inputs for today. That alone is most of why progressive overload sticks for me. The number I need to beat is one glance away from the box I type it into.

The other thing is the lack of friction. Logging a set is three numbers and a tap. No modal, no confirmation step, no "are you sure", no spinner. HTMX does an inline swap and the set saves without the page moving. I can log a working set in the rest interval between two other working sets without losing my place. Apps that interrupt the workout to ask me to rate the session, share to a feed, or watch a tip-of-the-day don't survive contact with the squat rack.

Food works the same way. A manual entry box if I already know the numbers, a text box that runs through `gpt-4o-mini` if I want to type "two bananas, oatmeal, 30g whey", and a photo upload if I'd rather just point my phone at the plate. The AI fills in estimates, I edit anything that looks off, the meal saves. It's not magic — it's just less typing.

## Why I'm proud of it

It's the app I actually open every day. That's a higher bar than it sounds.

**It can't really go down.** There is no production environment beyond my house. No status page, no on-call rotation, no SaaS-shaped pager going off at 3am. If my house has power and my router's blinking, it works.

**It costs zero dollars a month, forever.** I'm not paying anyone to track the fact that I ate oatmeal.

**I own the database.** It's a single file. I can grep it, dump it, version it, drop it on a thumb drive. If I ever stop running this app, every set I've ever done is still mine in a format any program can read.

**It's one Docker container.** Redeploys are `docker compose up -d --build`. No Kubernetes, no Helm, no CI pipeline. The "infrastructure" is one yaml file in a folder.

**It's small enough to keep entirely in my head.** I can change anything in it on a Sunday afternoon and have the change running on my phone before dinner.

## Stack

- **FastAPI** + a single uvicorn worker
- **SQLite** — one file at `/data/liftlog.db`
- **Jinja2 + HTMX + Tailwind CDN** for the frontend, no build step
- **Docker Compose**, ~180 MB image, idles under 100 MB of RAM
- **Tailscale** for both auth and network

SQLite is single-writer, so there's no point in running more workers; they'd just block each other on the same file. One process, one database, no Redis, no message queue, no service mesh. The whole codebase is small enough that I can read it on a flight without scrolling much.

## On the OpenAI integration

The food page can optionally use `gpt-4o-mini` to estimate calories and macros from a meal description or a photo. It's opt-in via `OPENAI_API_KEY` because the rest of the app works fine without it, and because I want to be able to run this somewhere with no outbound network access if I ever feel like it.

The estimates are useful but not magic. I always glance before saving, and anything's editable before it commits. The point isn't to outsource thinking — it's to skip typing "chicken thigh, 200g, ~340 kcal, 30g protein" when I already know what I ate.
