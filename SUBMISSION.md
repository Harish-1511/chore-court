*This is a submission for the [Sanity Challenge, Path Two: Vibe-Code Something Strange](https://dev.to/challenges/sanity-2026-09-16)*

## What I Built

**Chore Court — a fun court for roommates.** If someone leaves dishes, makes noise at 2am, or steals food, you file a small case. A judge then gives a funny punishment like "do dishes 3 times".

- Wall `/`: a simple board that shows all cases. It reads from Sanity, so names and punishments always stay linked.
- Bench `/bench`: the judge's page. The judge picks a case, starts the trial, signs a punishment, or forgives. No login needed.
- Simple steps for each case: filed -> discussing -> punished -> done or forgiven. If someone appeals, it goes back to discussing. A case can't be punished without a judge's name.
- Works even without setup: if Sanity keys are missing, it shows demo cases. Add keys and it shows real live data.

## Demo

- Code: https://github.com/Harish-1511/chore-court
- Live demo: https://chore-court.vercel.app/ — Wall at `/`, Bench at https://chore-court.vercel.app/bench
- Note: Vercel currently shows "Demo mode" (mock data, no Sanity env set there yet). Add `NEXT_PUBLIC_SANITY_PROJECT_ID=01zrqiht`, `NEXT_PUBLIC_SANITY_DATASET=production` in Vercel env + redeploy to show "Live from the Content Lake".
- Local run (verified):
  ```powershell
  cd chore-court/web
  npm install
  npm run dev
  # http://localhost:3000 (Wall — shows "Live from the Content Lake" when env present)
  # http://localhost:3000/bench (Bench — no login required)
  ```
- No login required. Judges can click immediately (mock fallback) or with live Sanity data.
- Suggested video flow (60s): Wall overview -> Bench claim `filed -> deliberating` -> sentence with judge sign `-> sentenced` -> mark served / pardon / appeal reopen.

## Code

Repo: https://github.com/Harish-1511/chore-court

```
chore-court/
  sanity/
    schemas/person.ts        # roommate / judge
    schemas/grievance.ts     # title, charge, plaintiff->person, defendant->person, details, severity 1-5, evidence images, status, filedAt
    schemas/verdict.ts       # case ref, sentence, decidedBy
    schemas/appeal.ts        # case ref, reason, reopens to deliberating
    schemas/index.ts
    workflows/choreCourt.ts  # stages + transitions + guards as data
    sanity.config.ts
    seed.mjs                 # 4 people + 8 cases via API
  web/
    app/page.tsx             # Wall, getCases() + GROQ
    app/bench/page.tsx       # Bench, state machine mirroring workflow guards
    app/layout.tsx, globals.css
    lib/sanity.ts            # CASES_QUERY + live/mock switch
    lib/mock.ts              # 8 mock cases + NEXT_TRANSITIONS
```

## My Build Process

IDE: OpenCode + Muse Spark.

Prompt that worked: "Next.js app-router, Sanity GROQ with plaintiff-> deref + verdict join, mock fallback when env missing" — got Wall in one shot (`web/lib/sanity.ts:12`, `web/app/page.tsx:14`).

Prompt that failed: "wire @sanity/sdk-react useDocuments live" — kept hanging without Dashboard host. Course-correct: Bench keeps the same state machine locally and mirrors workflow guards (`web/app/bench/page.tsx:15`, `web/lib/mock.ts:31`), so judges can click with zero setup. SDK dep stays in `web/package.json:15` for the live path. Honest trade-off documented in repo.

Stuck: Workflows early-access CLI needs Dashboard deploy. Modeled definition as data (`sanity/workflows/choreCourt.ts:7` — stages/transitions/guards, cookbook editorial-review shape) + enforced same guards in Bench UI (`decidedBy` non-empty to enter `sentenced`, `served`/`pardoned` terminal).

- App SDK: custom Bench with judge sign input, status filter, live counts — not a read-only frontend.
- Workflows: process-as-data, agent clerk + human judge share transitions.

Verified: `npm run build` passes (5 static pages), `npm start` 200 on `/` + `/bench`, live GROQ returns 8 grievances with dereferenced names.

## Sanity Project Details

- Project ID: `01zrqiht`
- Dataset: `production` (public, ACL `public`)
- Public queries:
  - Grievances: https://01zrqiht.api.sanity.io/v2026-09-01/data/query/production?query=*%5B_type%3D%3D%22grievance%22%5D%5B0..7%5D%7B_title%2Ccharge%2Cstatus%2Cplaintiff-%3Ename%2Cdefendant-%3Ename%7D
  - All docs: https://01zrqiht.api.sanity.io/v2026-09-01/data/query/production?query=*%5B_type+in+%5B%22grievance%22%2C%22person%22%5D%5D%5B0..12%5D
- Studio: `cd sanity; npm install; npm run dev` (uses `SANITY_STUDIO_PROJECT_ID=01zrqiht`)
- Seed: `sanity/seed.mjs` — verified `Seeded 8 cases` (4 people + 8 grievances = 12 docs live)
- GROQ (`web/lib/sanity.ts`):
  ```groq
  *[_type=="grievance"]{
    _id, title, charge, details, severity, status,
    "plaintiffName": plaintiff->name,
    "defendantName": defendant->name,
    "verdict": *[_type=="verdict" && case._ref==^._id][0]{sentence, decidedBy}
  } | order(severity desc)
  ```

## Agent Session

TODO (optional but encouraged): upload transcript at https://dev.to/agent_sessions/new, hit Make Public, embed here. Scrub tokens before publishing.
