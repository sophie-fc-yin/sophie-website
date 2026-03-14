# Sophie Website — Implementation Plan

> This plan splits the build into parallelizable work streams.
> Each section is tagged with the recommended agent: **Claude** (primary — Max plan) or **Codex** (secondary — Plus plan, use sparingly for simple boilerplate).
> Claude handles the majority of work given Max plan capacity.

---

## Vercel Free (Hobby) Plan Constraints

These constraints apply to the entire build. Every phase must respect them.

| Constraint | Limit | Impact on Build |
|-----------|-------|-----------------|
| **Serverless Functions** | Max **12 per deployment** | All API routes + dynamic pages with server functions count. Keep API routes minimal. |
| **Function timeout** | **1 minute** max execution | Contact form POST is fine. No long-running server tasks. |
| **Function payload** | **4.5 MB** request/response body | No issue for this site. |
| **Build time** | **45 minutes** max | No issue for a site this size. |
| **Source upload** | **100 MB** max | Don't commit large assets (audio, video) to the repo. Host media on Supabase Storage or external CDN. |
| **OG image bundle** | **500 KB** max for `next/og` | Keep OG image generation minimal — no heavy fonts or embedded images. |
| **Image optimization** | Free tier included (limited) | Use `next/image` but keep image count reasonable. |
| **Bandwidth** | **100 GB/month** | Fine for a portfolio site. |
| **Commercial use** | **Not allowed** on Hobby plan | Site can showcase work and link to consulting, but cannot process payments or run a SaaS. Contact form that saves to Supabase is fine. |

### Design decisions driven by these limits:
1. **Only 1 API route** (`/api/contact`) — stays well under the 12 function limit
2. **Static generation (SSG) for all pages** — systems, writing, about, uses are all statically generated at build time. No SSR needed.
3. **Demo artifacts are static** — screenshots, exported SVGs, pre-rendered charts. NOT live API calls to AI services on page load.
4. **Media files hosted externally** — audio samples, generated thumbnails stored in Supabase Storage, not in the repo
5. **OG images kept simple** — text on dark background, no custom fonts beyond system fonts

---

## Phase 0 — Project Init (MUST run first, everything depends on this)

**Agent: Claude**
**Why Claude:** Needs to set up the project foundation that every other phase imports from. Getting types, config, and structure right affects everything downstream.

- [ ] Initialize Next.js 14 with App Router, TypeScript, Tailwind CSS, ESLint
- [ ] Install deps: `@tailwindcss/typography`, `next-mdx-remote`, `lucide-react`, `@supabase/supabase-js`
- [ ] Configure Tailwind with custom theme (colors: `#0a0a0a`, `#f0f0f0`, `#00d4aa`)
- [ ] Create `/lib/types.ts` with `System` type:
  ```ts
  {
    name, slug, tier (1|2|3),
    status ('Planned' | 'In Progress' | 'Live'),
    cardHeadline, oneLiner, problemStatement, whatItDoes,
    capabilities: string[],
    targetAudience: string[],
    techStack: { layer: string, technology: string }[],
    pipeline: string[],
    githubUrl, repoName,
    infrastructure: { vercel: string[], digitalocean: string[] }
  }
  ```
- [ ] Create `/data/systems.ts` with all 4 system entries populated from Notion
- [ ] Create all route stubs (empty page.tsx files for every route)
- [ ] Create `.env.local.example`
- [ ] Init git, initial commit

**Output:** A buildable Next.js project with types, data, and route stubs that all other phases can import from.

---

## After Phase 0, the following phases can run in parallel:

---

## Stream A — Layout & Core Components

### Phase 1 — Global Layout & Navigation

**Agent: Claude**
**Why Claude:** Layout sets the foundation for the whole site's feel. Getting the dark theme, spacing, and responsive nav right matters.

- [ ] `/app/layout.tsx` — root layout with Inter font, `#0a0a0a` background, metadata
- [ ] `/components/Nav.tsx`:
  - Left: "Sophie" in monospace
  - Right: Systems, Consulting, Writing, About, Uses
  - Active link highlight (usePathname)
  - Mobile hamburger (Tailwind only, no UI library)
  - Subtle bottom border
- [ ] `/components/Footer.tsx`:
  - Copyright + GitHub/LinkedIn icons (lucide-react)
  - "Built with Next.js · Deployed on Vercel · Backend on DigitalOcean"

**Dependencies:** Phase 0
**Can parallel with:** Streams B, C, D, E

---

### Phase 1b — Shared UI Components

**Agent: Claude**
**Why Claude:** These components are reused everywhere — getting the design language consistent matters.

- [ ] `/components/StatusBadge.tsx` — Live (pulsing green dot), In Progress (yellow), Planned (gray)
- [ ] `/components/TierBadge.tsx` — Tier 1 (green), Tier 2 (blue), Tier 3 (purple)
- [ ] `/components/CapabilityTag.tsx` — small pills for capability labels
- [ ] `/components/SystemCard.tsx` — card using above components + system data
  - Name (monospace), tier badge, status badge, one-liner, capability tags
  - Infrastructure note (Vercel vs DigitalOcean)
  - "View system →" link + GitHub icon

**Dependencies:** Phase 0 (needs types.ts)
**Can parallel with:** Streams B, C, D, E

---

## Stream B — Pages (Content-Heavy)

### Phase 2 — Home Page

**Agent: Claude**
**Why Claude:** Copy-sensitive. Needs to follow the tone/voice rules from the Component Map & Copy Guide. Hero text, CTA wording, and card presentation all need editorial judgment.

- [ ] `/app/page.tsx` with three sections:
  1. **Hero** — headline, subtext, "See the systems →" CTA, subtle CSS background
  2. **Featured Systems** — 3 SystemCards (one per tier: ops-bot, comment-agent, content-pipeline)
  3. **Consulting CTA** — pain-point sentence + "See consulting →" link
- [ ] Fully responsive, no SaaS-style card shadows

**Dependencies:** Phase 0, Stream A (Nav, Footer, SystemCard)
**Can parallel with:** Phases 5, 6 (if components are ready)

---

### Phase 5 — Consulting Page

**Agent: Claude**
**Why Claude:** The most copy-sensitive page on the site. Tone must be peer-level, not vendor-level. The narrative structure (reality → shift → offer → services → CTA) requires editorial judgment. Directly references the Copy Guide rules.

- [ ] `/app/consulting/page.tsx` — five sections:
  1. Opening — creator's reality (no heading, large text)
  2. The Shift — what's possible + link to /systems
  3. "How I Work" — collaboration framing
  4. "What's Available" — 3 service blocks (Audit, Build, Agents)
  5. Soft CTA — "If any of this sounds familiar, let's talk." + mailto (replaced by form in Phase 8)
- [ ] Generous whitespace, text-heavy, essay-like feel

**Dependencies:** Phase 0, Stream A
**Can parallel with:** Phases 2, 6

---

### Phase 6 — About & /uses Pages

**Agent: Claude**
**Why Claude:** About page needs to follow the Copy Guide's tone rules (show the why, not a resume). /uses page is simple but should match the site's design language.

- [ ] `/app/about/page.tsx`:
  - The why, current focus, who to work with, contact
  - "Currently" block: location (BC, Canada), focus, stack
- [ ] `/app/uses/page.tsx`:
  - Languages: Python, TypeScript, SQL
  - Frontend: Next.js, Tailwind, React
  - Infrastructure: Vercel (frontend), DigitalOcean (workers, Droplets, App Platform)
  - Databases: Supabase (PostgreSQL + pgvector), Redis
  - AI/LLM: OpenAI API, Anthropic Claude API
  - Orchestration: n8n, custom Python pipeline runners
  - Dev Tools: VS Code, Claude Code, Cursor

**Dependencies:** Phase 0, Stream A
**Can parallel with:** Phases 2, 5

---

## Stream C — Systems Pages (Most Complex)

### Phase 3 — Systems Index

**Agent: Claude**
**Why Claude:** Needs to feel like browsing open-source projects. Card layout, infrastructure callouts, and the overall page feel need attention.

- [ ] `/app/systems/page.tsx`
  - Header: "Systems" + subtext
  - SystemCard grid (all 4 systems)
  - Bottom callout about Vercel/DigitalOcean split
  - Feel: like browsing open-source projects

**Dependencies:** Phase 0, SystemCard component (Stream A)
**Can parallel with:** Phase 4 (if SystemCard is ready)

---

### Phase 4 — System Page Template + Architecture Diagrams

**Agent: Claude**
**Why Claude:** Architecture diagrams need to accurately represent each system's pipeline from the Notion docs. The page template needs to handle different demo artifact types per system (scatter plots vs. audio players vs. alert cards). Requires understanding the full system context.

- [ ] `/app/systems/[slug]/page.tsx` — driven by `/data/systems.ts`
  - System name (monospace) + badges
  - "The Problem" — from creator's perspective
  - "What It Does" — plain English
  - Architecture diagram (React/SVG component)
  - Tech stack table
  - Demo output section (varies per system — see below)
  - GitHub link
  - "← Back to Systems"

- [ ] `/components/ArchitectureDiagram.tsx` — base component for pipeline diagrams
- [ ] `/components/diagrams/CommentAgentDiagram.tsx`:
  YouTube API → Comment Ingestion → Preprocessing → Embedding → Clustering → Cluster Labeling → Insight Extraction → Dashboard
- [ ] `/components/diagrams/ContentPipelineDiagram.tsx`:
  Topic Input → Script Gen → Script Review → Voice Synthesis → Video Gen → Thumbnail → Metadata → Upload → Notification
- [ ] `/components/diagrams/AudienceRadarDiagram.tsx`:
  Data Sources → Ingestion Agents → Preprocessing → Embedding → Topic Clustering → Velocity Scoring → Relevance Filtering → Alert Generation → Delivery
- [ ] `/components/diagrams/CreatorOpsBotDiagram.tsx`:
  Trigger → Content Reformatting → Cross-posting → Scheduled Queue → Comment Matching → Auto-reply → Activity Log

- [ ] Demo output placeholder components (per system):
  - Comment Agent: data table, scatter plot embed, insight text block, stats callout
  - Content Pipeline: terminal log component, audio player, image embed, collapsible text
  - Audience Radar: alert card, velocity chart, multi-platform feed, trending list
  - Creator Ops Bot: before/after comparison, time-saved stat, workflow screenshot

**Dependencies:** Phase 0, Stream A
**Can parallel with:** Streams B, D, E

---

## Stream D — Writing / Blog

### Phase 7 — MDX Blog System

**Agent: Claude**
**Why Claude:** The sample article needs Sophie's voice. The editorial layout (Substack-like, not card grid) needs design judgment.

- [ ] `/content/writing/why-your-comment-section-is-your-best-research-tool.mdx`
  - Frontmatter: title, date, description, tags
  - 200-word placeholder article in Sophie's voice
- [ ] `/lib/writing.ts` — reads MDX files, returns sorted `{ slug, title, date, description, tags }[]`
- [ ] `/app/writing/page.tsx` — article list (editorial layout, not card grid)
- [ ] `/app/writing/[slug]/page.tsx` — full MDX rendering, article heading, date, body, back link

**Dependencies:** Phase 0, Stream A
**Can parallel with:** Streams B, C, E

---

## Stream E — Infrastructure & Integration

### Phase 8 — Contact Form + Supabase

**Agent: Claude**
**Why Claude:** Involves server-side API route, Supabase integration, env var handling, and security considerations (input validation, rate limiting). Needs to wire into the consulting page correctly.

- [ ] Supabase table schema: `contact_requests` (id, created_at, what_to_automate, platform, timeline, email, status)
- [ ] `/lib/supabase.ts` — Supabase client init
- [ ] `/app/api/contact/route.ts` — POST handler with validation, Supabase insert
- [ ] `/components/ContactForm.tsx` — 4 fields + submit, loading/success/error states
- [ ] Wire into `/app/consulting/page.tsx` replacing mailto
- [ ] Update `.env.local.example`

**Dependencies:** Phase 0, Phase 5 (consulting page)
**Can parallel with:** Streams B, C, D (but needs Phase 5 done to wire in)

---

### Phase 9 — SEO, OG Images & Sitemap

**Agent: Codex**
**Why Codex:** Boilerplate SEO setup. Standard Next.js patterns for metadata, sitemap, robots.

- [ ] Update `/app/layout.tsx` with full metadata (title template, description, openGraph, twitter)
- [ ] `/app/opengraph-image.tsx` via next/og — dark background, name, tagline
- [ ] Per-page metadata overrides for system pages and writing pages
- [ ] `/app/sitemap.ts` — all system + writing URLs
- [ ] `/app/robots.ts` — allow all crawlers

**Dependencies:** All pages exist (Phases 2–7)
**Can parallel with:** Phase 10

---

### Phase 10 — Deployment Config

**Agent: Codex**
**Why Codex:** Standard config files, no ambiguity.

- [ ] `.gitignore` — .env.local, .next/, node_modules/, .DS_Store
- [ ] `vercel.json` — framework: nextjs, security headers
- [ ] `.github/workflows/deploy.yml` — build on push to main
- [ ] `README.md` — positioning, tech stack table, infra overview, local dev instructions

**Dependencies:** Phase 0
**Can parallel with:** Everything

---

## Parallelization Map

```
Phase 0 (Claude) ─── MUST COMPLETE FIRST
    │
    ├──► Stream A: Layout + Components (Claude)
    │       Phase 1  — Nav, Footer, Layout
    │       Phase 1b — StatusBadge, TierBadge, CapabilityTag, SystemCard
    │
    ├──► Stream B: Content Pages (Claude)
    │       Phase 2  — Home               ←── needs Stream A
    │       Phase 5  — Consulting          ←── needs Stream A
    │       Phase 6  — About + Uses        ←── needs Stream A
    │
    ├──► Stream C: Systems Pages (Claude)
    │       Phase 3  — Systems Index       ←── needs Stream A
    │       Phase 4  — System Template + Diagrams
    │
    ├──► Stream D: Blog (Claude)
    │       Phase 7  — MDX setup + article page
    │
    ├──► Stream E: Infrastructure (Claude + Codex)
    │       Phase 8  — Contact Form + Supabase (Claude) ←── needs Phase 5
    │       Phase 9  — SEO + OG (Codex)                 ←── needs Phases 2-7
    │       Phase 10 — Deploy config (Codex)
    │
    └──► Phase 10 can start immediately (just config files)
```

## Recommended Execution Order

### Wave 1 (Sequential — no parallelism possible)
| Task | Agent | Est. Time |
|------|-------|-----------|
| Phase 0 — Project Init | Claude | 15 min |

### Wave 2 (All parallel)
| Task | Agent | Est. Time |
|------|-------|-----------|
| Phase 1 + 1b — Layout & Components | Claude | 20 min |
| Phase 6 — About + Uses | Claude | 10 min |
| Phase 7 — MDX Blog | Claude | 15 min |
| Phase 10 — Deploy Config | Codex | 5 min |

### Wave 3 (Parallel, depends on Wave 2 components)
| Task | Agent | Est. Time |
|------|-------|-----------|
| Phase 2 — Home Page | Claude | 15 min |
| Phase 5 — Consulting Page | Claude | 15 min |
| Phase 3 — Systems Index | Claude | 10 min |
| Phase 4 — System Pages + Diagrams | Claude | 30 min |

### Wave 4 (Depends on Wave 3)
| Task | Agent | Est. Time |
|------|-------|-----------|
| Phase 8 — Contact Form + Supabase | Claude | 15 min |
| Phase 9 — SEO + OG + Sitemap | Codex | 10 min |

---

## Agent Assignment Summary

| Agent | Phases | Rationale |
|-------|--------|-----------|
| **Claude** | 0, 1, 1b, 2, 3, 4, 5, 6, 7, 8 | Primary agent — tone, architecture, components, integration, all pages |
| **Codex** | 9, 10 | Boilerplate SEO config, deploy setup, standard patterns |

**Split:** ~85% Claude (Max plan), ~15% Codex (Plus plan)

---

## AI Systems Build Timeline (Separate from site)

These are the actual Python backend projects that produce demo artifacts for the site. They live in separate repos.

| System | Start | Why | Repo |
|--------|-------|-----|------|
| **Audience Radar** ingestion | Week 1 (NOW) | Needs 1-2 weeks of data collection before demo artifacts are usable | `audience-radar-agent` |
| **Creator Ops Bot** | Week 1-2 | Fastest to build, easiest to demo, unblocks Tier 1 system page | `creator-ops-bot` |
| **Comment Intelligence Agent** | Week 2-3 | High priority, needs real YouTube data run | `youtube-comment-agent` |
| **Content Production Pipeline** | Week 3-4 | Most complex, but self-contained data (no external audience needed) | `creator-content-factory` |

Start Audience Radar ingestion immediately — it's the only system that requires lead time for demo data.
