---
title: "How We Built an AI-Powered Blog Writing System"
date: 2025-01-28
slug: "how-we-built-an-ai-powered-blog-writing-system"
description: "The architecture, agents, and honest trade-offs behind automating trend detection, drafting, and publishing for this blog — and what still requires a human in the loop."
tags: ["behind-the-scenes", "AI", "automation", "blogging", "personal"]
author: "Shivam Bajaj"
draft: false
---

A few months ago, I found myself doing the same thing every Sunday evening: opening a dozen tabs, skimming Hacker News, scrolling Reddit threads, jotting topics into a Notion doc, and then staring at a blank editor wondering where to start. It wasn't writer's block exactly. It was the *pre-writing* friction — the scanning, sorting, and sifting before a single sentence gets written.

So I did what any engineer would do. I automated it.

![The scraping pipeline running in a terminal window](/images/how-we-built-an-ai-powered-blog-writing-system/photo-1.jpg)

---

## Why Bother?

I want to publish consistently. Not because an SEO dashboard told me to, but because writing is how I process what I'm learning. The problem is that the signal-to-noise ratio on tech content right now is brutal. Everyone's publishing something. Most of it is thin. I wanted a system that could surface *genuinely interesting* stuff worth writing about — and then help me actually write it — without turning this into a second full-time job.

The goal wasn't to remove myself from the process. It was to remove the *tedious* parts of the process so the parts that actually require judgment get more of my attention.

---

## What the System Does

Here's the honest version: it's a pipeline of agents that scan, curate, draft, and stage content — then hands off to me for editorial review before anything goes live.

PLEASE ADD AN ARCHITECTURE DIAGRAM HERE TO MAKE IT BETTER

The workflow breaks down into five stages.

### 1. Trend Detection

Three scrapers run on a cron schedule — one each for Hacker News, Reddit (a handful of subreddits: r/programming, r/MachineLearning, r/devops, r/webdev), and dev.to. They pull top posts by engagement within a 48-hour window, strip the noise, and dump structured data into a queue: title, source, engagement score, links, and a short content summary where available.

This isn't rocket science. But it's incredibly useful to wake up to a ranked list of what the tech internet actually cared about yesterday, rather than what the algorithm decided to show me.

### 2. Topic Curation

Raw trend data is messy. A story about a JavaScript framework update might show up three times from three different angles. An LLM-powered curation agent deduplicates, clusters related signals, and scores topics against a few criteria: is this something I've covered before? Is it specific enough to write about with depth? Does it connect to anything in my existing content?

The output is a short list — usually five to eight topics — ranked by relevance and novelty. This is where the first real judgment call happens. I review this list. Sometimes I take the top suggestion. Sometimes I ignore the whole thing because something else is on my mind. The list is a starting point, not a mandate.

### 3. Style Analysis

This one took the most iteration to get right. Before drafting anything, the system pulls a sample of recent posts from the site and runs a style analysis pass — sentence length distribution, tone markers, structural patterns, common phrases, how I typically open sections. The goal is to build a working style profile that the drafting agent can actually use.

ADD PICTURE HERE TO MAKE IT ENGAGING

It's imperfect. Early drafts came back sounding like a GPT-flavored version of me — technically correct but weirdly formal. Like someone doing an impression of me after reading two articles. We've tuned it considerably since then, and the drafts are noticeably better now, but I'll come back to the limitations.

### 4. Drafting

Given a topic, the style profile, and any reference links from the curation stage, the drafting agent produces a full post — frontmatter, sections, the works. It follows the structural patterns I tend to use: hook first, foundational context, component breakdown, implications.

The draft lands in a GitHub branch as a Markdown file. Not published. Not staged for production. Just a draft in the repo, waiting for me.

The Hugo + PaperMod + Vercel pipeline handles the actual publishing once I merge. Until then, it's just a file.

### 5. Iterative Editing

This is where it gets interesting. Instead of one-shot drafting, the system runs a self-critique loop — the draft gets evaluated against a rubric (clarity, accuracy, voice consistency, structural completeness), weaknesses get flagged, and a revision pass runs before the draft ever reaches me.

It's not perfect. But it means I'm not starting from "this draft is rough." I'm starting from "this draft is pretty good, let me make it mine."

---

## What It Can't Do

Lots of things. Let me be specific.

**It doesn't know what I actually think.** The system can synthesize what the internet thinks about a topic. It cannot synthesize my opinion. Any post that requires a point of view — which is most posts worth reading — needs me to actually have that point of view and put it in there.

**It gets the voice approximately right.** Reading a draft from this system, you can tell it's *trying* to sound like me. The structure is right. The sentence rhythm is close. But there's a flatness to it sometimes — like it knows the shape of how I write but not the weight. The edits I make are usually about adding that weight: a specific memory, a concrete opinion, a moment of genuine uncertainty.

**It can't verify claims.** The drafting agent will confidently write things that sound plausible but need fact-checking. Numbers, dates, attribution — I check all of it before anything goes live. This is non-negotiable.

**It doesn't know when a topic is actually interesting to me.** The curation agent ranks by engagement signals. But sometimes the most interesting thing to write about is something nobody's talking about yet. That's a human call.

---

## What It Does Really Well

The Sunday evening problem is solved. I no longer spend an hour and a half scanning before I can start thinking. The trend feed lands in my inbox, I spend fifteen minutes on it, and I either kick off a draft or don't.

The structural scaffolding is genuinely useful. Even when I rewrite a draft heavily, having the skeleton there — the section headers, the logical flow — saves real time. It's easier to edit than to create from nothing.

And honestly? The style analysis feedback loop has made me more aware of my own patterns. Seeing a style profile written about your own writing is a little strange. But it's clarifying.

---

## The Stack, Quickly

- **Scrapers**: Python, running on a simple cron job
- **LLM layer**: GPT-4o for curation and drafting, with structured prompts per agent
- **Repo integration**: GitHub API — drafts land as PRs in a `drafts/` branch
- **Publishing**: Hugo + PaperMod + Vercel — merge to main, it's live
- **Orchestration**: Nothing fancy. A lightweight Python script sequences the agents. No LangChain, no AutoGen — just functions calling functions.

I deliberately kept the orchestration simple. Every time I've added abstraction layers "for scale," I've regretted it when something breaks at 11pm.

---

## Would I Recommend Building This?

If you publish frequently and the pre-writing friction is a real problem: yes, with caveats.

The caveats: it takes real time to tune the style layer. The first twenty drafts will embarrass you. You'll need to build in the human review step and actually use it — the moment you start auto-publishing without review is the moment the system publishes something you'll regret.

But if you treat it as a writing *assistant* rather than a writing *replacement*, it's worth the investment. The best version of this system is one where it handles the scanning, structuring, and scaffolding — and you handle the thinking.

That split still feels right to me.

---

*The code for the scraping and curation layer is something I'm thinking about open-sourcing once it's cleaner. If that's interesting to you, the newsletter is the best place to hear about it first.*
