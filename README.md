# NicheLead AI

**AI-powered, niche-specific lead generation by [Genzic.AI](https://genzic.ai).**

Pick an industry and get a dashboard purpose-built for how that business finds,
scores, and closes leads — with AI lead scoring, automated email/SMS outreach,
a simple CRM pipeline, and analytics.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Supabase**,
and designed to scale to 30+ niches.

> This is the standalone NicheLead AI product repository. (It was split out of
> `genzic-executor`, which now contains only the email-automation / Executor tool.)

## Niches (MVP)

| Niche | Highlights |
| --- | --- |
| 🏋️ Personal Trainer | Goal / age / distance filters, consultation & challenge templates |
| ✨ Esthetician | Skin-concern / service / demographic filters, client photos, booking templates |
| 🏠 Roofing Contractor | Damage / urgency / roof-age filters, property photos, inspection & insurance templates |
| 🔑 Realtor | Buy / sell / land intent, budget / timeline / life-event filters, valuation templates |

## Core features

- **Industry Selector** — first screen; choose a niche from a dropdown that scales to 30+ industries.
- **Dynamic dashboards** — per-niche quick stats, filters, AI-scored lead feed, and outreach templates.
- **Lead discovery & AI scoring** — scored, filterable, searchable lead feed with score breakdowns.
- **Automated outreach** — email & SMS templates with live token personalization + copy/send.
- **CRM pipeline** — Kanban (New → Qualified → Contacted → Converted), lead detail, notes.
- **Analytics** — score distribution, weekly trends, funnel metrics.
- **User profile** — name, business, email & social handles auto-filled into every message.
- **Live chat** — optional Tawk.to widget (configured in Settings).
- **Fully responsive** — desktop tab nav + mobile bottom nav with iOS safe-area support.

## Architecture — built to scale to 30+ niches

Everything niche-specific lives in [`lib/niches`](lib/niches). Each niche is a single
`NicheConfig` object (stats, filters, templates, lead generator). To add a niche:

1. Create `lib/niches/<niche>.ts` exporting a `NicheConfig`.
2. Add it to the array in [`lib/niches/index.ts`](lib/niches/index.ts).

The selector, routing (`/dashboard/[niche]`), dashboard, filters, and templates all
read from that registry — no other code changes needed.

## Integrations (placeholders)

The UI is fully functional on mock data. Real side-effects are wired through env
vars (see [`.env.example`](.env.example)):

- **Supabase** — database + auth ([`supabase/schema.sql`](supabase/schema.sql))
- **Zapier (only)** — single Catch Hook fans out to email + SMS + CRM
- **Abacus.AI** — lead scoring / enrichment
- **Resend** — email · **Twilio** — SMS (both via Zapier)
- **Tawk.to** — live chat (configured in-app under Settings → Live Chat Integration)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — runs on mock data without it
npm run dev                  # http://localhost:3000
```

## Deploy (Vercel)

Import this repo into Vercel (framework auto-detected as Next.js via `vercel.json`),
add the env vars from `.env.example` in the project settings, and deploy.

---

_Powered by TanXUSA · Built for 10X Execution._
