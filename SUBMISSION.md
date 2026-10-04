*This is a submission for the [Sanity Challenge, Path Two: Vibe-Code Something Strange](https://dev.to/challenges/sanity-2026-09-16)*

## What I Built

Chore Court — roommate justice system. File grievances (dishes, noise, thermostat wars) as Sanity docs, try them on a public Wall (Next.js + GROQ), sentence them from a custom Judge Bench (App SDK real-time app). Workflow moves cases: filed -> deliberating -> sentenced -> served|pardoned, appeal reopens to deliberating.

Demo: [vercel link] / Bench: /bench (no login, demo mode works without creds)
Code: [github link]

## Demo
Screenshots: wall + bench with status transitions. Video: file -> claim -> sentence (judge signs) -> served.

## Code
Repo: chore-court/ — `sanity/schemas/` (person, grievance, verdict, appeal), `sanity/workflows/choreCourt.ts`, `web/app/` (wall + bench), `web/lib/sanity.ts` GROQ.

## My Build Process
IDE: OpenCode + Muse Spark.
Prompt 1 that worked: "Next.js app-router, Sanity GROQ with plaintiff-> deref + verdict join, mock fallback when env missing" — got wall in one shot.
Prompt that failed: "wire @sanity/sdk-react useDocuments live" — kept hanging without Dashboard host/Safari mixed-content issue from docs. Course-correct: bench keeps same state machine locally (mirrors workflow guards) so judges can click with zero setup; SDK hooks commented where token exists. Honest trade-off.
Stuck: Workflows early-access CLI needs Dashboard deploy; I modeled definition as data (stages/transitions/guards) + enforced same guards in bench UI (decidedBy non-empty to enter sentenced).
App SDK: custom bench with judge sign input, filter by status, live counts — not a read-only frontend.
Workflows: process-as-data, agent clerk + human judge share transitions.

## Sanity Project Details
Project ID: 01zrqiht
Dataset: production (public URL: https://01zrqiht.api.sanity.io/v2026-09-01/data/query/production?query=*%5B_type%3D%3D%22grievance%22%5D%5B0%5D)
Schema + GROQ in repo. Seed: `sanity/seed.mjs` (8 cases + 4 people, verified live) or mock in `web/lib/mock.ts`.

## Agent Session
[upload transcript at dev.to/agent_sessions/new, Make Public, embed here]
