# Chore Court — Roommate Justice System
Path Two: Vibe-Code Something Strange (Sanity Challenge, Sept 18 - Oct 4 2026)

File grievances as structured content. Try them. Sentence them to dishes.

* Public wall: Next.js `/` reads Sanity via GROQ with dereferencing (`plaintiff->`, `defendant->`, verdict join).
* Judge's Bench: `/bench` custom real-time app built with Sanity App SDK (`@sanity/sdk-react`), not Studio. Gavel buttons move cases through workflow states.
* Workflow: `filed -> deliberating -> sentenced -> served | pardoned`, appeal loops back to `deliberating`. Modeled as data next to content (`sanity/workflows/choreCourt.ts`).
* Studio: customized desk + gavel action in `sanity/` folder.
* Works with NO credentials: falls back to mock data so judges can click immediately. Add env to go live.

## Quick start (2 min, no Sanity account)

```powershell
cd chore-court/web
npm install
npm run dev
# open http://localhost:3000  (wall) and http://localhost:3000/bench (judge bench)
```

## Go live with Sanity

1. `npm i -g @sanity/cli; sanity init` inside `sanity/` (or `sanity deploy` a new project), note projectId + dataset.
2. Copy `.env.example` to `web/.env.local`, fill `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`.
3. In `sanity/`: `npm install; npm run seed` (pushes 8 funny cases via API), `npm run dev` for Studio.
4. Deploy `web/` to Vercel. Put project ID + dataset URL in your DEV post (required).

## What to put in DEV post

See `SUBMISSION.md` — prefilled Path Two template with build-process prompts, what failed, schema + GROQ, App SDK + Workflow notes.
