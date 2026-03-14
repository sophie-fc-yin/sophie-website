# Agent Coordination Plan — Sophie Website Build

## How This Works

### Concurrency
On Max plan, you can run multiple Claude Code sessions in parallel. The constraint is throughput/quota, not a hard session cap. Using **Sonnet** for agents (not Opus) lets you run more in parallel without hitting limits.

**Recommended: 3-4 parallel agents at a time using Sonnet.**

### Coordination Strategy: Git Worktrees

Each agent works in its own **git worktree** (isolated branch + working directory, shared git history). This means:
- No merge conflicts during work — each agent has its own copy of the repo
- Each agent produces a branch that gets merged into `main` sequentially
- Agents that depend on earlier work wait until those branches are merged

### Merge Order

```
main
 ├── phase-0-init          (merge first — everything depends on this)
 │
 │   Then merge in any order:
 ├── phase-1-layout
 ├── phase-1b-components
 │
 │   Then (needs layout + components merged):
 ├── phase-2-home
 ├── phase-3-systems-index
 ├── phase-4-system-pages
 ├── phase-5-consulting
 ├── phase-6-about-uses
 ├── phase-7-writing
 │
 │   Then (needs above merged):
 ├── phase-8-contact
 ├── phase-9-seo
 └── phase-10-deploy
```

### File Ownership (No Conflicts)

Each agent owns specific files. No two agents touch the same file.

| Agent | Files Owned |
|-------|-------------|
| Phase 0 | `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `/lib/types.ts`, `/data/systems.ts`, `.env.local.example`, all route stubs |
| Phase 1 | `/app/layout.tsx`, `/components/Nav.tsx`, `/components/Footer.tsx` |
| Phase 1b | `/components/StatusBadge.tsx`, `/components/TierBadge.tsx`, `/components/CapabilityTag.tsx`, `/components/SystemCard.tsx` |
| Phase 2 | `/app/page.tsx` |
| Phase 3 | `/app/systems/page.tsx` |
| Phase 4 | `/app/systems/[slug]/page.tsx`, `/components/ArchitectureDiagram.tsx`, `/components/diagrams/*` |
| Phase 5 | `/app/consulting/page.tsx` |
| Phase 6 | `/app/about/page.tsx`, `/app/uses/page.tsx` |
| Phase 7 | `/app/writing/page.tsx`, `/app/writing/[slug]/page.tsx`, `/lib/writing.ts`, `/content/writing/*` |
| Phase 8 | `/app/api/contact/route.ts`, `/components/ContactForm.tsx`, `/lib/supabase.ts` |
| Phase 9 | `/app/sitemap.ts`, `/app/robots.ts`, `/app/opengraph-image.tsx` |
| Phase 10 | `.gitignore`, `vercel.json`, `.github/workflows/deploy.yml`, `README.md` |

---

## Execution Waves

### Wave 1 — Run alone (everything depends on this)

Run Phase 0, merge to main, then proceed.

### Wave 2 — Run 4 agents in parallel

After Phase 0 is merged to main:
- Agent: Phase 1 (Layout)
- Agent: Phase 1b (Components)
- Agent: Phase 7 (Writing/MDX)
- Agent: Phase 10 (Deploy config)

Merge all to main when done.

### Wave 3 — Run 4 agents in parallel

After Wave 2 is merged to main:
- Agent: Phase 2 (Home)
- Agent: Phase 3+4 combined (Systems index + system pages + diagrams)
- Agent: Phase 5 (Consulting)
- Agent: Phase 6 (About + Uses)

Merge all to main when done.

### Wave 4 — Run 2 agents in parallel

After Wave 3 is merged to main:
- Agent: Phase 8 (Contact form)
- Agent: Phase 9 (SEO)

Merge all to main. Done.

---

## Agent Prompts

Copy-paste each prompt into a new Claude Code session. Each agent should be run with `--model sonnet` to conserve quota.

---

### WAVE 1

---

#### Agent: Phase 0 — Project Init

```
You are building the foundation for a Next.js personal website. This is Phase 0 — every other agent depends on your output.

BRANCH: Create and work on branch `phase-0-init`

TASK:
1. Initialize a Next.js 14 project in the current directory with:
   - App Router, TypeScript, Tailwind CSS, ESLint
   - Do NOT use `src/` directory — put `app/` at the root

2. Install these additional dependencies:
   - @tailwindcss/typography
   - next-mdx-remote
   - lucide-react
   - @supabase/supabase-js

3. Configure Tailwind (`tailwind.config.ts`) with custom theme:
   - Extend colors: background: '#0a0a0a', foreground: '#f0f0f0', accent: '#00d4aa'
   - Add @tailwindcss/typography plugin
   - Content paths: app, components, content

4. Create `/lib/types.ts` with this exact type:
   ```ts
   export type SystemStatus = 'Planned' | 'In Progress' | 'Live';
   export type Tier = 1 | 2 | 3;

   export interface TechStackEntry {
     layer: string;
     technology: string;
   }

   export interface System {
     name: string;
     slug: string;
     tier: Tier;
     status: SystemStatus;
     cardHeadline: string;
     oneLiner: string;
     problemStatement: string;
     whatItDoes: string;
     capabilities: string[];
     targetAudience: string[];
     techStack: TechStackEntry[];
     pipeline: string[];
     githubUrl: string;
     repoName: string;
     infrastructure: {
       vercel: string[];
       digitalocean: string[];
     };
   }
   ```

5. Create `/data/systems.ts` with 4 system entries. Import the System type. Here's the full data:

   System 1 — Creator Ops Bot:
   - slug: 'creator-ops-bot', tier: 1, status: 'Planned'
   - cardHeadline: "Stop spending 2 hours a day on tasks a bot can do in 10 minutes."
   - oneLiner: "Automates cross-posting, scheduling, and comment replies across your platforms — so you can stop doing the repetitive work and focus on creating."
   - problemStatement: "Creators who are starting to make real money hit a wall: the operational load. Every video needs cross-posting, every post needs scheduling, every common comment needs a reply. It's endless, repetitive work."
   - whatItDoes: "Automates the repeatable daily tasks — auto cross-posting across platforms, scheduling social posts from a simple input, and auto-replying to common comment patterns."
   - capabilities: ['Workflow Orchestration', 'Automation']
   - targetAudience: ['Consulting Clients']
   - techStack: [{ layer: 'Orchestration', technology: 'n8n / Python + cron' }, { layer: 'Platform APIs', technology: 'YouTube Data API, Twitter/X API, Instagram Graph API' }, { layer: 'Scheduling', technology: 'Cron / n8n scheduler' }, { layer: 'Comment handling', technology: 'Pattern matching + template engine' }, { layer: 'Logging', technology: 'Simple file/DB activity log' }, { layer: 'Infrastructure', technology: 'DigitalOcean Droplet or App Platform' }]
   - pipeline: ['Trigger (new video / scheduled time / new comment)', 'Content Reformatting', 'Cross-posting Agent', 'Scheduled Post Queue', 'Comment Pattern Matching', 'Auto-reply Engine', 'Activity Log']
   - repoName: 'creator-ops-bot', githubUrl: ''
   - infrastructure: { vercel: ['System page on website'], digitalocean: ['Bot runtime', 'Cron scheduler'] }

   System 2 — Creator Comment Intelligence Agent:
   - slug: 'comment-intelligence-agent', tier: 2, status: 'In Progress'
   - cardHeadline: "What are 50,000 of your viewers actually asking?"
   - oneLiner: "Analyzes thousands of YouTube comments to surface your audience's real questions, frustrations, and content gaps — automatically."
   - problemStatement: "Creators publish content, read a handful of comments, and move on. But buried in thousands of comments is some of the most valuable audience research available anywhere — questions people keep asking, frustrations that keep surfacing, topics they're desperate for more of."
   - whatItDoes: "Ingests large volumes of YouTube comments, generates semantic embeddings, clusters them by meaning, and runs an insight agent over the clusters to surface actionable findings."
   - capabilities: ['Embeddings', 'Clustering', 'Insight Extraction']
   - targetAudience: ['Consulting Clients', 'Hiring Managers']
   - techStack: [{ layer: 'Data source', technology: 'YouTube Data API v3' }, { layer: 'Embeddings', technology: 'OpenAI text-embedding-3-small' }, { layer: 'Clustering', technology: 'HDBSCAN / scikit-learn' }, { layer: 'Orchestration', technology: 'Python + asyncio' }, { layer: 'Insight agent', technology: 'OpenAI GPT-4o + Claude API' }, { layer: 'Output', technology: 'Next.js dashboard' }, { layer: 'Infrastructure', technology: 'DigitalOcean App Platform' }]
   - pipeline: ['YouTube API', 'Comment Ingestion', 'Preprocessing & Deduplication', 'Embedding Generation', 'Clustering (HDBSCAN)', 'Cluster Labeling Agent', 'Insight Extraction Agent', 'Dashboard Output']
   - repoName: 'youtube-comment-agent', githubUrl: ''
   - infrastructure: { vercel: ['Dashboard UI', 'API routes'], digitalocean: ['Ingestion pipeline', 'Embedding generation', 'Clustering worker'] }

   System 3 — AI Content Production Pipeline:
   - slug: 'content-production-pipeline', tier: 3, status: 'In Progress'
   - cardHeadline: "From topic to publish-ready video — without touching it."
   - oneLiner: "A fully automated content production pipeline that takes a topic as input and produces a script, voiceover, video, thumbnail, and upload — end to end."
   - problemStatement: "Content creation for most creators is a manual assembly line: write a script, record, edit, generate a thumbnail, write a description, upload, cross-post. Every step requires manual effort."
   - whatItDoes: "Takes a topic or brief as input and orchestrates a fully automated workflow that produces a publish-ready video draft — script, voiceover, video generation, and upload — without manual intervention."
   - capabilities: ['Workflow Orchestration', 'Async Pipelines', 'Automation']
   - targetAudience: ['Consulting Clients', 'Hiring Managers']
   - techStack: [{ layer: 'Orchestration', technology: 'Python + Celery or Prefect' }, { layer: 'Script generation', technology: 'OpenAI GPT-4o' }, { layer: 'Voice synthesis', technology: 'ElevenLabs API' }, { layer: 'Video generation', technology: 'Runway ML or HeyGen' }, { layer: 'Image generation', technology: 'DALL-E 3' }, { layer: 'Upload', technology: 'YouTube Data API v3' }, { layer: 'Storage', technology: 'AWS S3' }, { layer: 'Notifications', technology: 'Slack webhook' }]
   - pipeline: ['Topic Input', 'Script Generation Agent', 'Script Review (human-in-the-loop)', 'Voice Synthesis (ElevenLabs)', 'Video Generation (Runway)', 'Thumbnail Generation (DALL-E)', 'Metadata Generation', 'Upload Pipeline (YouTube API)', 'Notification']
   - repoName: 'creator-content-factory', githubUrl: ''
   - infrastructure: { vercel: ['System page', 'Pipeline status UI'], digitalocean: ['Pipeline orchestrator', 'Media processing workers', 'Asset storage'] }

   System 4 — Creator Audience Radar:
   - slug: 'audience-radar', tier: 2, status: 'Planned'
   - cardHeadline: "Know what your audience is talking about before it peaks."
   - oneLiner: "Monitors YouTube, Reddit, Twitter, and Discord simultaneously to surface emerging topics in your niche — before everyone else covers them."
   - problemStatement: "Trends move fast. A topic blows up on Reddit, spills into Twitter, and by the time a creator notices three days later, five other channels have already covered it."
   - whatItDoes: "Monitors multiple social platforms simultaneously, detects emerging topics and audience signals in real time, and sends alerts when something relevant is gaining momentum."
   - capabilities: ['Multi-source Ingestion', 'Topic Detection', 'Alert Generation', 'Embeddings']
   - targetAudience: ['Consulting Clients', 'Technical Peers']
   - techStack: [{ layer: 'Data sources', technology: 'YouTube API, Reddit API (PRAW), Twitter API v2, Discord API' }, { layer: 'Scheduling', technology: 'Celery Beat / Prefect / cron' }, { layer: 'Embeddings', technology: 'OpenAI / sentence-transformers' }, { layer: 'Trend detection', technology: 'HDBSCAN + velocity scoring' }, { layer: 'Relevance scoring', technology: 'Cosine similarity against niche embeddings' }, { layer: 'Alert delivery', technology: 'Slack webhook / SendGrid' }, { layer: 'Storage', technology: 'PostgreSQL + pgvector' }, { layer: 'Dashboard', technology: 'Next.js' }]
   - pipeline: ['Data Sources (YouTube, Reddit, Twitter/X, Discord)', 'Platform-specific Ingestion Agents', 'Preprocessing & Normalization', 'Embedding Generation', 'Topic Clustering & Trend Detection', 'Velocity Scoring', 'Relevance Filtering', 'Alert Generation', 'Delivery (Slack / Email / Dashboard)']
   - repoName: 'audience-radar-agent', githubUrl: ''
   - infrastructure: { vercel: ['Dashboard UI', 'Alert display'], digitalocean: ['Ingestion agents', 'Embedding pipeline', 'Trend detection workers', 'Scheduler'] }

6. Create empty route stub files (just `export default function PageName() { return null; }`) for:
   - /app/page.tsx (home)
   - /app/systems/page.tsx
   - /app/systems/[slug]/page.tsx
   - /app/consulting/page.tsx
   - /app/writing/page.tsx
   - /app/writing/[slug]/page.tsx
   - /app/about/page.tsx
   - /app/uses/page.tsx

7. Create `.env.local.example`:
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

8. Verify the project builds with `npm run build`. Fix any errors.

9. Git add and commit all files with message: "Phase 0: Project init with Next.js 14, types, system data, and route stubs"

IMPORTANT CONSTRAINTS (Vercel Hobby Plan):
- All pages should be statically generated (SSG) by default. Do NOT use `force-dynamic` or server-side rendering.
- Only 1 API route will exist (`/api/contact` — added later). Keep this in mind.
- No `src/` directory. App router at root.
```

---

### WAVE 2 (run all 4 in parallel after Phase 0 is merged to main)

---

#### Agent: Phase 1 — Layout & Navigation

```
You are building the global layout and navigation for a dark, minimal, technical personal website. The project is already initialized with Next.js 14, Tailwind CSS, and TypeScript.

BRANCH: Create and work on branch `phase-1-layout`

DESIGN SYSTEM:
- Background: #0a0a0a
- Text: #f0f0f0
- Accent: #00d4aa (cool teal)
- Font: Inter (via next/font/google)
- No rounded-2xl, no heavy shadows
- Monospace for system names and code-like labels
- Aesthetic: research lab / engineering docs, NOT marketing portfolio

FILES YOU OWN (only create/modify these):
- /app/layout.tsx
- /components/Nav.tsx
- /components/Footer.tsx

TASK:

1. `/app/layout.tsx`:
   - Import Inter from next/font/google
   - Set up as root layout with <html lang="en"> and dark background
   - Include site metadata: title "Sophie Yin — AI Systems for Creators", description matching the site tagline
   - Render <Nav /> above {children} and <Footer /> below
   - Apply Inter font class to body
   - Body classes: bg-[#0a0a0a] text-[#f0f0f0] antialiased

2. `/components/Nav.tsx`:
   - Client component ('use client')
   - Left side: "Sophie" in monospace font (font-mono), links to /
   - Right side links: Systems (/systems), Consulting (/consulting), Writing (/writing), About (/about)
   - Uses usePathname() to highlight active link with accent color (#00d4aa)
   - Mobile: hamburger button (3 lines) that toggles a dropdown menu
   - Tailwind only — no external UI library
   - Subtle bottom border (border-b border-white/10)
   - Container max width, centered, px-6
   - Nav is sticky at top (sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm)

3. `/components/Footer.tsx`:
   - Server component
   - Three elements in a row (stacked on mobile):
     - "© 2026 Sophie Yin"
     - GitHub + LinkedIn icon links using lucide-react (Github, Linkedin icons), open in new tab
     - "Built with Next.js · Deployed on Vercel · Backend on DigitalOcean"
   - Subtle top border (border-t border-white/10)
   - Muted text color (text-white/40)
   - Container matches nav width

Commit with message: "Phase 1: Global layout with dark theme, navigation, and footer"
```

---

#### Agent: Phase 1b — Shared UI Components

```
You are building shared UI components for a dark, minimal, technical personal website. The project is already initialized with Next.js 14, Tailwind CSS, and TypeScript.

BRANCH: Create and work on branch `phase-1b-components`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- No rounded-2xl or heavy shadows
- Monospace for system names

IMPORTANT: Import the System type from '@/lib/types'. It already exists.

FILES YOU OWN (only create/modify these):
- /components/StatusBadge.tsx
- /components/TierBadge.tsx
- /components/CapabilityTag.tsx
- /components/SystemCard.tsx

TASK:

1. `/components/StatusBadge.tsx`:
   - Props: { status: 'Planned' | 'In Progress' | 'Live' }
   - Live: green pulsing dot (animate-pulse) + "Live" text in green
   - In Progress: yellow dot + "In Progress" in yellow
   - Planned: gray dot + "Planned" in gray
   - Small, inline badge style (flex items-center gap-1.5 text-xs)

2. `/components/TierBadge.tsx`:
   - Props: { tier: 1 | 2 | 3 }
   - Tier 1: green border + text, label "Tier 1"
   - Tier 2: blue border + text, label "Tier 2"
   - Tier 3: purple border + text, label "Tier 3"
   - Small pill style (px-2 py-0.5 text-xs border rounded-full)

3. `/components/CapabilityTag.tsx`:
   - Props: { label: string }
   - Small pill with subtle background (bg-white/5 text-white/60 text-xs px-2 py-0.5 rounded)

4. `/components/SystemCard.tsx`:
   - Props: { system: System } (import from @/lib/types)
   - Displays: name (font-mono text-lg), tier badge, status badge
   - One-liner description
   - Row of capability tags
   - Infrastructure note: "Vercel: [list] · DigitalOcean: [list]" in small muted text
   - "View system →" link to /systems/[slug]
   - GitHub icon link if githubUrl exists (lucide-react Github icon)
   - Card style: border border-white/10 p-6 rounded-lg hover:border-[#00d4aa]/30 transition
   - No heavy shadows

Commit with message: "Phase 1b: StatusBadge, TierBadge, CapabilityTag, and SystemCard components"
```

---

#### Agent: Phase 7 — MDX Blog System

```
You are building the writing/blog section for a Next.js 14 personal website. The project already exists with App Router, TypeScript, Tailwind, and next-mdx-remote installed.

BRANCH: Create and work on branch `phase-7-writing`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Editorial layout — Substack-like, not a card grid
- Generous whitespace, readable line lengths (max-w-2xl)

FILES YOU OWN (only create/modify these):
- /lib/writing.ts
- /app/writing/page.tsx
- /app/writing/[slug]/page.tsx
- /content/writing/why-your-comment-section-is-your-best-research-tool.mdx

TASK:

1. `/content/writing/why-your-comment-section-is-your-best-research-tool.mdx`:
   Frontmatter: title, date (2026-03-10), description, tags: ['audience-intelligence', 'youtube', 'creator-tools']
   Body: 200-word placeholder article. Voice: practical, hype-free, creator-focused. No buzzwords. Write as if Sophie is explaining something useful to a fellow creator.

2. `/lib/writing.ts`:
   - Function `getAllPosts()`: reads all .mdx files from /content/writing/ using fs and path
   - Parses frontmatter with gray-matter (add to deps if needed — check package.json first, if not there, install it)
   - Returns sorted array (newest first) of: { slug, title, date, description, tags }
   - Function `getPostBySlug(slug)`: returns frontmatter + raw MDX content for a single post

3. `/app/writing/page.tsx`:
   - Static page (no 'use client')
   - Heading: "Writing" + subtext: "Practical notes on AI systems, automation, and the creator economy."
   - Lists articles: each shows title (linked to /writing/[slug]), date (formatted nicely), description, tag pills
   - Editorial feel — vertical list with generous spacing, not a card grid
   - Max width for readability (max-w-2xl mx-auto)

4. `/app/writing/[slug]/page.tsx`:
   - Uses generateStaticParams to pre-render all posts at build time (SSG)
   - Renders MDX content via next-mdx-remote (use serialize + MDXRemote)
   - Shows: title (large), date, body with prose styling (@tailwindcss/typography: prose prose-invert)
   - "← Back to Writing" link at bottom
   - Generate metadata per post (title, description for SEO)

IMPORTANT: All pages must be statically generated. Use generateStaticParams. No 'force-dynamic'.

Verify it builds: `npm run build`

Commit with message: "Phase 7: MDX blog system with writing index, article rendering, and sample post"
```

---

#### Agent: Phase 10 — Deploy Config

```
You are setting up deployment configuration for a Next.js 14 personal website that will be deployed on Vercel's free Hobby plan.

BRANCH: Create and work on branch `phase-10-deploy`

FILES YOU OWN (only create/modify these):
- .gitignore
- vercel.json
- .github/workflows/deploy.yml
- README.md

TASK:

1. `.gitignore`:
   ```
   # deps
   node_modules/

   # next
   .next/
   out/

   # env
   .env
   .env.local
   .env.*.local

   # system
   .DS_Store
   *.swp
   *.swo

   # debug
   npm-debug.log*
   ```

2. `vercel.json`:
   ```json
   {
     "framework": "nextjs",
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
         ]
       }
     ]
   }
   ```

3. `.github/workflows/deploy.yml`:
   Simple CI that runs on push to main:
   - Checkout, setup Node 20, npm ci, npm run build
   - This is just for CI validation — Vercel handles actual deployment via its GitHub integration

4. `README.md`:
   Title: Sophie Yin — AI Systems for Creators and Digital Media
   Sections:
   - Overview: "Technical portfolio, consulting platform, and AI systems showcase."
   - Tech Stack table: Frontend (Next.js), Deployment Frontend (Vercel), Backend Workers (DigitalOcean), Database (Supabase), Content (MDX), AI Primary (OpenAI), AI Secondary (Anthropic Claude), Version Control (GitHub)
   - Infrastructure: "Frontend and API routes run on Vercel. Background workers and data pipelines run on DigitalOcean."
   - Local Development: `npm install`, `cp .env.local.example .env.local`, `npm run dev`
   - Demo Systems: list the 4 systems with repo names
   - Deployment: "Connected to Vercel via GitHub integration. Push to main triggers deploy."

Commit with message: "Phase 10: Deployment config — Vercel, GitHub Actions CI, gitignore, README"
```

---

### WAVE 3 (run all 4 in parallel after Wave 2 branches are merged to main)

---

#### Agent: Phase 2 — Home Page

```
You are building the home page for Sophie Yin's personal website — a dark, minimal, technical site showcasing AI systems for the creator economy.

BRANCH: Create and work on branch `phase-2-home`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Monospace for system names, no heavy shadows
- Feel: research lab, not marketing portfolio

IMPORTANT TONE RULES (from the Copy Guide):
- Hero: name THEIR world, not your service
- Don't start with "I am a..." or credentials
- No: innovative, cutting-edge, passionate, synergy
- CTA: "See the systems" not "Learn more"
- Featured system cards should make a creator think "I wish I had that"

FILES YOU OWN (only modify these):
- /app/page.tsx

EXISTING COMPONENTS TO IMPORT:
- SystemCard from '@/components/SystemCard'
- { systems } from '@/data/systems' (array of System objects)

TASK:

Build /app/page.tsx with three sections:

1. **Hero Section**:
   - Headline: "AI Systems for Creators and Digital Media" (text-4xl md:text-5xl font-bold)
   - Subtext: "Designing intelligent systems that automate content workflows, analyze audience signals, and scale digital media operations." (text-lg text-white/60, max-w-2xl)
   - CTA button: "See the systems →" linking to /systems (border border-[#00d4aa] text-[#00d4aa] hover:bg-[#00d4aa]/10 px-6 py-3)
   - Optional: subtle CSS-only background effect (grid pattern or noise — keep it minimal)
   - Generous vertical padding (py-24 md:py-32)

2. **Featured Systems** (3 cards):
   - Filter systems to show one per tier: creator-ops-bot (Tier 1), comment-intelligence-agent (Tier 2), content-production-pipeline (Tier 3)
   - Use SystemCard component for each
   - Section heading: "Featured Systems" (text-2xl font-bold)
   - Grid: 1 column mobile, 3 columns desktop (grid grid-cols-1 md:grid-cols-3 gap-6)

3. **Consulting CTA Block**:
   - Text: "Most creator operations are built on manual effort that doesn't scale. If that sounds familiar, here's how I can help."
   - Link: "See consulting →" to /consulting
   - Subtle background (bg-white/5 border border-white/10 rounded-lg p-8)

All sections: max-w-6xl mx-auto px-6. Fully responsive.

This is a static page (no 'use client' needed unless you add interactivity).

Verify: `npm run build`

Commit with message: "Phase 2: Home page with hero, featured systems, and consulting CTA"
```

---

#### Agent: Phase 3+4 — Systems Index + System Pages + Diagrams

```
You are building the systems section — the most important part of Sophie Yin's personal website. This includes the systems index page, individual system detail pages, and architecture diagrams.

BRANCH: Create and work on branch `phase-3-4-systems`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Monospace for system names
- Feel: like browsing open-source projects, not a portfolio gallery

IMPORTANT TONE RULES:
- Open with the PROBLEM, not the solution
- Don't start with "This project uses..."
- No overly modest framing ("just a side project")
- Let sample outputs speak — they're more persuasive than descriptions

FILES YOU OWN (only create/modify these):
- /app/systems/page.tsx
- /app/systems/[slug]/page.tsx
- /components/ArchitectureDiagram.tsx
- /components/diagrams/CommentAgentDiagram.tsx
- /components/diagrams/ContentPipelineDiagram.tsx
- /components/diagrams/AudienceRadarDiagram.tsx
- /components/diagrams/CreatorOpsBotDiagram.tsx

EXISTING COMPONENTS TO IMPORT:
- SystemCard from '@/components/SystemCard'
- StatusBadge from '@/components/StatusBadge'
- TierBadge from '@/components/TierBadge'
- CapabilityTag from '@/components/CapabilityTag'
- { systems } from '@/data/systems'
- Types from '@/lib/types'

TASK:

### Part 1: Systems Index (/app/systems/page.tsx)
- Header: "Systems" (text-4xl font-bold) + "Production AI infrastructure for the creator economy." (text-white/60)
- Grid of SystemCards (1 col mobile, 2 col desktop)
- Bottom callout: "These systems run on a split infrastructure — frontend and API routes on Vercel, background workers and data pipelines on DigitalOcean." (bg-white/5 border border-white/10 p-6 rounded-lg)

### Part 2: System Detail Page (/app/systems/[slug]/page.tsx)
- Uses generateStaticParams from systems data (SSG — Vercel Hobby plan)
- Finds system by slug from systems array
- 404 if not found (use notFound() from next/navigation)
- Page structure:
  1. System name (font-mono text-3xl) + TierBadge + StatusBadge
  2. Capability tags row
  3. "The Problem" section — system.problemStatement
  4. "What It Does" section — system.whatItDoes
  5. Architecture Diagram — render the appropriate diagram component based on slug
  6. "Tech Stack" — two-column table (Layer | Technology) from system.techStack
  7. "Sample Output" — placeholder callout: "Demo output coming soon. This system is currently [status]." with a border-dashed border
  8. GitHub link (if exists) — prominent button with Github icon from lucide-react
  9. "← Back to Systems" link
- Generate metadata per system page

### Part 3: Architecture Diagrams
Build these as React components using Tailwind divs and SVG arrows. NOT static images.

`/components/ArchitectureDiagram.tsx`:
- Base wrapper component
- Props: { children: ReactNode, title?: string }
- Dark background (bg-white/5), horizontal scrollable on mobile (overflow-x-auto)
- Label showing "Vercel" and "DigitalOcean" infrastructure boundaries

Each diagram component renders a left-to-right pipeline of boxes connected by arrows:

`/components/diagrams/CommentAgentDiagram.tsx`:
Steps: YouTube API → Comment Ingestion → Preprocessing → Embedding Generation → Clustering (HDBSCAN) → Cluster Labeling → Insight Extraction → Dashboard
- YouTube API through Preprocessing: labeled "Data Ingestion"
- Embedding through Insight Extraction: labeled "DigitalOcean"
- Dashboard: labeled "Vercel"

`/components/diagrams/ContentPipelineDiagram.tsx`:
Steps: Topic Input → Script Generation → Script Review → Voice Synthesis → Thumbnail Generation → Metadata Generation → Upload Pipeline → Notification
- Topic Input + Script Review: labeled "Human Input"
- All processing steps: labeled "DigitalOcean"
- Notification: labeled "Delivery"

`/components/diagrams/AudienceRadarDiagram.tsx`:
Steps: Data Sources (YT/Reddit/Twitter/Discord) → Ingestion Agents → Normalization → Embedding → Topic Clustering → Velocity Scoring → Relevance Filtering → Alert Generation → Delivery
- Ingestion through Alert Generation: labeled "DigitalOcean"
- Delivery: labeled "Slack / Email / Dashboard"

`/components/diagrams/CreatorOpsBotDiagram.tsx`:
Steps: Trigger → Content Reformatting → Cross-posting → Scheduled Queue → Comment Matching → Auto-reply → Activity Log
- All steps: labeled "DigitalOcean"

Each box: bg-white/10 border border-white/20 px-3 py-2 rounded text-sm font-mono
Arrows: simple SVG or CSS borders between boxes
Infrastructure labels: small colored badges above groups of boxes

IMPORTANT: All pages must use generateStaticParams for SSG. No dynamic server rendering.

Verify: `npm run build`

Commit with message: "Phase 3+4: Systems index, system detail pages, and architecture diagrams"
```

---

#### Agent: Phase 5 — Consulting Page

```
You are building the consulting page for Sophie Yin's personal website. This is the most copy-sensitive page — tone must be peer-level, not vendor-level.

BRANCH: Create and work on branch `phase-5-consulting`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Generous whitespace, text-heavy, feels like reading an essay not scanning a pricing page
- Max width for readability (max-w-2xl mx-auto)

CRITICAL TONE RULES:
- Talk about THEIR situation before YOUR capabilities
- Use "I" not "we" — personal, not corporate
- Peer voice: "I work with..." NOT "I offer..." or "My services include..."
- NEVER use: leverage, innovative, cutting-edge, passionate, synergy, empower, holistic
- No pricing, no "limited spots", no "book a free 30-minute discovery call"
- CTA: open a door, don't push someone through it

FILES YOU OWN (only modify these):
- /app/consulting/page.tsx

TASK:

Build /app/consulting/page.tsx with 5 sections. Static page, no 'use client'.

1. **Opening** (no heading, large text — text-xl md:text-2xl leading-relaxed):
   "You didn't start creating to spend your week cross-posting, editing transcripts, and manually responding to the same questions in your comments. But here you are."

   "The creators who are pulling ahead right now aren't working harder — they've built systems that handle the repeatable stuff so they can focus on what actually moves the needle."

2. **The Shift** (mt-16):
   "Most channels are sitting on a goldmine of audience intelligence buried in their comments, watch data, and community signals. Very few are actually using it."

   Link: "See what that looks like in practice →" linking to /systems (text-[#00d4aa])

3. **How I Work** (mt-16):
   "I work with creators and media businesses to build the infrastructure that makes this possible — automation pipelines, audience analysis tools, and agent systems that run in the background while you create."

   "This isn't consulting in the traditional sense. It's closer to bringing in a systems engineer who's also obsessed with the creator economy."

4. **What's Available** (mt-16, heading: "What's Available"):
   Three service blocks, each with a name, who-it's-for line, and what-you-walk-away-with line:

   **AI Systems Audit**
   For creators who feel like something could be automated but aren't sure where to start. Walk away with a clear map of what's worth building and in what order.

   **AI Infrastructure Build**
   Design and implement a production workflow end-to-end — from data ingestion to output. Built to run reliably, not just demo well.

   **Custom Agent Systems**
   Autonomous agents that monitor, analyze, and surface insights from your platforms — so you're not checking dashboards manually or missing signals in the noise.

   Style each as a subtle card (border border-white/10 p-6 rounded-lg)

5. **Soft CTA** (mt-16):
   "If any of this sounds familiar, let's talk."

   mailto link styled as a minimal button: "sophie@example.com →" (border border-[#00d4aa] text-[#00d4aa] px-6 py-3 rounded hover:bg-[#00d4aa]/10)

   Small note below: "No forms, no 12-field intake process. Just an email."

Page metadata: title "Consulting — Sophie Yin", description about AI systems consulting for creators.

Verify: `npm run build`

Commit with message: "Phase 5: Consulting page with narrative-first copy and peer-level tone"
```

---

#### Agent: Phase 6 — About & Uses Pages

```
You are building the About and Uses pages for Sophie Yin's personal website — a dark, minimal, technical site.

BRANCH: Create and work on branch `phase-6-about-uses`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Readable line lengths (max-w-2xl mx-auto)

TONE RULES FOR ABOUT:
- Show the WHY behind the work, not a resume
- No chronological career history
- No tech list as bullet points ("Proficient in Python, AWS...")
- Don't use "passionate" — show it, don't say it
- Should sound like Sophie, not a LinkedIn profile

FILES YOU OWN (only create/modify these):
- /app/about/page.tsx
- /app/uses/page.tsx

TASK:

1. `/app/about/page.tsx`:
   Static page with these content blocks:

   **The Why** (no heading, large opening text):
   Placeholder: "I got into AI systems because I kept seeing the same problem — creators and media businesses sitting on incredible data and doing nothing with it. Not because they didn't want to, but because the infrastructure to make it useful didn't exist for them. So I started building it."

   **Current Focus** (heading: "Currently"):
   - Location: British Columbia, Canada
   - Focus: AI systems for the creator economy
   - Building: production pipelines, audience intelligence tools, and agent systems
   - Stack: Next.js, Supabase, OpenAI, Anthropic Claude, DigitalOcean, Vercel

   Style as a subtle card with label/value pairs.

   **Who I Want to Work With** (heading: "Who I work with"):
   "Creators and media businesses who are serious about building systems — not just trying tools. If you're looking for someone to set up ChatGPT, I'm probably not the right fit. If you want production infrastructure that runs while you sleep, let's talk."

   **Contact** (heading: "Get in touch"):
   Email link + GitHub + LinkedIn (lucide-react icons)

   Page metadata: title "About — Sophie Yin"

2. `/app/uses/page.tsx`:
   Static page. Heading: "Uses" / Subheading: "The actual tools and infrastructure I work with."

   Sections (clean text lists with section headings):
   - **Languages**: Python, TypeScript, SQL
   - **Frontend**: Next.js, Tailwind CSS, React
   - **Infrastructure**: Vercel (frontend, edge functions, API routes), DigitalOcean (background workers, Droplets, App Platform)
   - **Databases**: Supabase (PostgreSQL + pgvector), Redis
   - **AI / LLM**: OpenAI API (GPT-4o, text-embedding-3-large), Anthropic Claude API (insight extraction, long-context analysis)
   - **Orchestration**: n8n, custom Python pipeline runners
   - **Dev Tools**: VS Code, Claude Code, Cursor

   Each section: heading (text-lg font-mono text-[#00d4aa]) + items as a simple list

   Page metadata: title "Uses — Sophie Yin"

Verify: `npm run build`

Commit with message: "Phase 6: About page with personal narrative and Uses page with full stack listing"
```

---

### WAVE 4 (run both in parallel after Wave 3 branches are merged to main)

---

#### Agent: Phase 8 — Contact Form + Supabase

```
You are adding a contact form wired to Supabase for Sophie Yin's personal website. This replaces the mailto link on the consulting page.

BRANCH: Create and work on branch `phase-8-contact`

DESIGN SYSTEM:
- Background: #0a0a0a, Text: #f0f0f0, Accent: #00d4aa
- Form should feel minimal and low-barrier, not corporate

VERCEL HOBBY PLAN CONSTRAINTS:
- This is the ONLY API route in the entire project (max 12 functions allowed)
- Function timeout: 1 minute max (more than enough)
- Payload limit: 4.5 MB (no issue)
- All other pages are SSG — this is the only server-side functionality

FILES YOU OWN (only create/modify these):
- /lib/supabase.ts
- /app/api/contact/route.ts
- /components/ContactForm.tsx
- /app/consulting/page.tsx (modify to add ContactForm)

TASK:

1. `/lib/supabase.ts`:
   - Creates a Supabase client using @supabase/supabase-js
   - Uses NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from env
   - Export the client for server-side use only

2. `/app/api/contact/route.ts`:
   - POST handler only
   - Expects JSON body: { what_to_automate: string, platform: string, timeline: string, email: string }
   - Validates: all fields required, email must contain @, all fields max 1000 chars
   - Inserts into Supabase table `contact_requests` with status 'new'
   - Returns 200 with { success: true } or 400/500 with error message
   - Basic rate limiting: check if same email submitted in last 24 hours, reject if so

3. `/components/ContactForm.tsx`:
   - Client component ('use client')
   - 4 fields:
     - "What would you like to automate or build?" (textarea)
     - "What platform(s) are you on?" (input — YouTube, Instagram, etc.)
     - "Timeline — is this urgent or exploratory?" (input)
     - "Your email" (input type email)
   - Submit button: "Let's talk" (styled like site CTAs — border border-[#00d4aa] text-[#00d4aa])
   - States: idle, loading (disabled + spinner), success ("Message sent. I'll be in touch."), error (show error message)
   - POST to /api/contact on submit
   - No <form> tag — use div with button onClick
   - Inputs styled: bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30

4. Update `/app/consulting/page.tsx`:
   - Replace the mailto link and "No forms" note at the bottom with the ContactForm component
   - Keep the "If any of this sounds familiar, let's talk." text above the form
   - The page becomes a mix of server and client — keep the ContactForm as a client island

NOTE: The Supabase table must be created manually by the user. Add a comment in supabase.ts documenting the table schema:
```sql
CREATE TABLE contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  what_to_automate TEXT NOT NULL,
  platform TEXT NOT NULL,
  timeline TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);
```

Verify: `npm run build` (will build even without Supabase credentials — the API route only runs at request time, not build time)

Commit with message: "Phase 8: Contact form with Supabase integration on consulting page"
```

---

#### Agent: Phase 9 — SEO, OG Images & Sitemap

```
You are adding SEO optimization, Open Graph images, and a sitemap to a Next.js 14 personal website.

BRANCH: Create and work on branch `phase-9-seo`

VERCEL HOBBY PLAN CONSTRAINT: OG image bundle must be under 500KB. Keep it simple — text on dark background, no custom fonts beyond system fonts.

FILES YOU OWN (only create/modify these):
- /app/sitemap.ts
- /app/robots.ts
- /app/opengraph-image.tsx

DO NOT modify layout.tsx (it already has base metadata from Phase 1).

TASK:

1. `/app/opengraph-image.tsx`:
   - Uses next/og ImageResponse
   - Size: 1200x630
   - Dark background (#0a0a0a)
   - Text: "Sophie Yin" (large, white) + "AI Systems for Creators and Digital Media" (smaller, #00d4aa)
   - Keep it simple — no images, no custom fonts (use system fonts to stay under 500KB)
   - Export as default, with alt text, size, and contentType metadata

2. `/app/sitemap.ts`:
   - Returns sitemap with all routes:
     - / (home)
     - /systems
     - /systems/creator-ops-bot
     - /systems/comment-intelligence-agent
     - /systems/content-production-pipeline
     - /systems/audience-radar
     - /consulting
     - /writing
     - /about
     - /uses
   - Import systems from @/data/systems to generate system page URLs dynamically
   - Import getAllPosts from @/lib/writing to generate writing URLs dynamically (if the function exists; if not, hardcode an empty array for writing posts)
   - Base URL: https://sophieyin.com (placeholder)
   - Set lastModified to current date

3. `/app/robots.ts`:
   - Allow all crawlers
   - Point to sitemap URL
   - Standard Next.js robots metadata export

Verify: `npm run build`

Commit with message: "Phase 9: OG image, sitemap, and robots.txt for SEO"
```

---

## How to Run This

### Step-by-step:

1. **Wave 1**: Open 1 Claude Code session. Run Phase 0 prompt. When done, merge to main:
   ```bash
   git checkout main && git merge phase-0-init
   ```

2. **Wave 2**: Open 4 Claude Code sessions (use `--model sonnet`). Paste one prompt into each. When all done, merge each branch to main one at a time:
   ```bash
   git checkout main
   git merge phase-1-layout
   git merge phase-1b-components
   git merge phase-7-writing
   git merge phase-10-deploy
   ```

3. **Wave 3**: Open 4 Claude Code sessions. Paste one prompt into each. When all done, merge:
   ```bash
   git checkout main
   git merge phase-2-home
   git merge phase-3-4-systems
   git merge phase-5-consulting
   git merge phase-6-about-uses
   ```

4. **Wave 4**: Open 2 Claude Code sessions. Paste one prompt into each. Merge:
   ```bash
   git checkout main
   git merge phase-8-contact
   git merge phase-9-seo
   ```

5. Final: `npm run build` to verify everything works together. Deploy to Vercel.

### If a merge has conflicts:
Each agent owns specific files so conflicts should be rare. If they happen, it will likely be in package.json (multiple agents installing deps). Resolve by keeping all additions.
