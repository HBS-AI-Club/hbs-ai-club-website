# HBS AI Club — Website

The website for the Harvard Business School AI Club. Built with **Next.js (App Router) + Tailwind CSS**, with all content managed in **Notion** so any board member can update it without touching code.

## How content works

Everything on the site is pulled live from the Notion workspace **"HBS AI Club Wiki" → Public Content**. Each database has a **`Show on Website`** checkbox — a row appears on the site only when that box is checked.

| Section | Notion database |
| --- | --- |
| Events (calendar + agenda) | Events |
| Speakers | Speakers |
| Leadership | Leadership (has a `Tenure` field: Current / Past board) |
| Learn | Learning Resources + Podcasts |

Edits in Notion appear on the site within ~5 minutes (incremental static regeneration).

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local` with a Notion integration token that can **read** the Public Content page:

```
NOTION_TOKEN=ntn_xxxxxxxx
```

## Deploying (Vercel)

The site auto-deploys from `main`. The only required environment variable is `NOTION_TOKEN`, set in **Vercel → Project → Settings → Environment Variables**.

> **Security:** use a **read-only** Notion integration token in production (Notion → Settings → Integrations → new internal integration → *Read content* only → connect it to the Public Content page). Never commit the token — `.env*` is gitignored.

## Structure

- `app/` — routes (home, events, speakers, leadership, learn, join, plus `[slug]` detail pages)
- `components/` — UI (animated hero + interactive canvas, nav, events calendar/agenda, cards)
- `lib/notion.ts` — the Notion data layer (database IDs live here)
- `lib/format.ts` — date/slug/category helpers
