# Setup Guide

This document covers every way to run and deploy the site — local development, Docker, and Vercel.

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 20+ | Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to manage versions |
| npm | 10+ | Comes with Node.js |
| Docker | 24+ | Only required if running via Docker |
| Docker Compose | v2 (plugin) | Bundled with Docker Desktop |

> **Note on Python backends:** The AI systems (`youtube-comment-agent`, `creator-ops-bot`, etc.) live in separate repos and use [UV](https://github.com/astral-sh/uv) as their package manager. UV is not required for this frontend project.

---

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for contact form) | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (for contact form) | Supabase service role key — server-side only, never exposed to the browser |

The site builds and runs without these set. The contact form API route will fail gracefully if Supabase is not configured.

---

## Option A — Local Development (Native)

Fastest iteration loop. Hot reload, no containers.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other useful commands

```bash
# Type-check without building
npx tsc --noEmit

# Lint
npm run lint

# Production build (verify before deploying)
npm run build

# Serve the production build locally
npm run start
```

---

## Option B — Docker (Production Image)

Runs the exact same image that would run on a self-hosted server (DigitalOcean Droplet, App Platform, etc.). Uses a multi-stage build — final image is Alpine-based and contains no source files or dev dependencies.

### Build and run

```bash
# Build the production image and start the container
docker compose up --build

# Run in the background
docker compose up --build -d

# Stop
docker compose down
```

Open [http://localhost:3000](http://localhost:3000).

### Passing environment variables to Docker

Create a `.env.local` file (see above). Docker Compose reads it automatically via the `${VAR}` references in `docker-compose.yml`.

Alternatively, pass them inline:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-key \
docker compose up --build
```

### Hot-reload dev via Docker (optional)

If you want full hot reload inside a container (useful for matching a CI environment exactly):

```bash
docker compose --profile dev up dev
```

This mounts your local source files into the container and runs `npm run dev`. Slower than native dev but environment-consistent.

### Inspecting the image

```bash
# See final image size
docker images sophie-website:local

# Open a shell inside the running container
docker compose exec web sh
```

---

## Option C — Vercel (Production Deploy)

The site is deployed to Vercel. Vercel ignores the `output: 'standalone'` config and uses its own build pipeline.

### First deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your Vercel project and deploy
vercel
```

### Add environment variables on Vercel

In the Vercel dashboard: **Project → Settings → Environment Variables**

Add both `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for the Production environment.

### Subsequent deploys

Push to `main` — Vercel deploys automatically via the GitHub integration.

---

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (font, background, metadata)
│   ├── page.tsx            # Home
│   ├── systems/
│   │   ├── page.tsx        # Systems index
│   │   └── [slug]/page.tsx # Individual system page
│   ├── consulting/page.tsx
│   ├── writing/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   └── uses/page.tsx
├── components/             # Shared UI components (added in later phases)
├── content/
│   └── writing/            # MDX blog posts
├── data/
│   └── systems.ts          # All system entries (source of truth)
├── lib/
│   ├── types.ts            # Shared TypeScript types
│   └── supabase.ts         # Supabase client (added in Phase 8)
├── public/                 # Static assets
├── Dockerfile              # Multi-stage production image
├── docker-compose.yml      # Local Docker orchestration
├── vercel.json             # Vercel deploy config + security headers
├── tailwind.config.ts      # Custom theme (colors, typography plugin)
└── .env.local.example      # Environment variable template
```

---

## Adding a New System

All system data lives in `/data/systems.ts`. To add a new system:

1. Add an entry to the `systems` array following the `System` type in `/lib/types.ts`
2. Set a unique `slug` — this becomes the URL (`/systems/your-slug`)
3. Run `npm run build` to verify it compiles cleanly

No database changes needed — the systems index and detail pages are statically generated from this file at build time.

---

## Vercel Constraints (Hobby Plan)

| Constraint | Limit |
|-----------|-------|
| Serverless functions | Max 12 per deployment |
| Function timeout | 60 seconds |
| Build time | 45 minutes |
| Source upload | 100 MB |
| Bandwidth | 100 GB/month |

The site is designed to stay well within these limits. All pages except `/api/contact` are statically generated. Do not add `force-dynamic` or additional API routes without checking the function count.
