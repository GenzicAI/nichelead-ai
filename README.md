# NicheLead AI

**Niche-specific AI Lead Generation SaaS** — built by Genzic.AI

A modular, mobile-first (and now desktop-responsive) lead generation platform with one configurable dashboard engine powering four launch niches:

- 🏋️ Personal Trainer — leads by fitness goal, location, age
- ✨ Esthetician — leads by skin concern, service type, demographic
- 🏠 Roofing — leads by roof age, damage type, urgency
- 🏢 Realtor — buyer, seller, and land leads with budget/timeline filters

### Flow

1. **Landing / industry selector** (`components/Landing.tsx`) — dark, on-brand entry screen with a dropdown and quick-select cards. Genzic.AI branding up top, "Visit Genzic.AI" / "Visit TanXUSA.com" links at the bottom.
2. **Dashboard** (`components/Dashboard.tsx`) — once an industry is chosen, renders the full niche workspace: stat cards, Filters bottom sheet, Templates slide-over, AI-scored lead feed, Campaigns, Analytics, and Settings, all driven by `lib/data.ts`. A grid icon in the header returns to the industry selector.
3. **App** (`components/App.tsx`) — thin client wrapper holding the selected niche in state and switching between the two screens above.

### Adding a new niche

Add one entry to `NICHES` and `LEADS` in `lib/data.ts` — the landing page, dashboard, filters, and templates all pick it up automatically. No other file needs to change. Built to scale to 30+ industries.

### Features

- AI lead scoring (Hot / Warm / Cool badges)
- Per-niche outreach message templates with one-tap copy
- Responsive layout: single-column mobile experience, grid-based desktop layout (stat cards, leads, campaigns, settings all reflow at `lg` breakpoints)
- Niche switcher with themed accent colors, available both pre- and post-dashboard
- Filter bottom sheet + template slide-over panel

### Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Recharts · lucide-react · Vercel

---
Built by **Genzic.AI** — Simplify. Automate. Dominate.
