
```
You are an expert full-stack developer working inside an existing monorepo. 

Before doing anything, read the full project specification at `Project.md` in the root of this repo. Treat it as the single source of truth for all features, data models, and business logic.

---

## Monorepo structure

This project was scaffolded with BetterFullStack and uses Turborepo. The structure is:

- `apps/web` — Next.js 14+ frontend (App Router, TypeScript, Tailwind, shadcn/ui already installed)
- `apps/server` — Backend server (email already configured via Resend)
- `packages/db` — Prisma package with shared database client (`packages/db/prisma/schema/schema.prisma`)
- `packages/config` — Shared TypeScript config

shadcn/ui is already initialised. The following base components exist:
`button, card, checkbox, dropdown-menu, input, label, skeleton, sonner`

Base layout components already exist in `apps/web/src/components`:
`header.tsx, loader.tsx, mode-toggle.tsx, providers.tsx, theme-provider.tsx`

Do NOT re-scaffold, re-initialise, or overwrite any of the above. Build on top of what exists.

---

## Project: RWP (RealWorldProblems)

A community-driven platform where anyone can post real-world problems (anonymously or with a profile) and the community submits, votes on, and iterates on solutions.

---

## What to build — implementation plan

Execute the following in order. Output a checklist first, then begin.

---

### Step 1 — Prisma schema (`packages/db/prisma/schema/schema.prisma`)

Extend the existing schema with all tables from the spec. Include:

- `users` — id, username, email, avatar, bio, karma, githubId, githubUsername, githubToken (encrypted), createdAt
- `problems` — id, title, description, userId (nullable for anon), anonTokenHash, isAnonymous, status (open/solved), meTooCount, viewCount, createdAt
- `tags` — id, name, category, slug
- `problemTags` — join table
- `solutions` — id, problemId, userId, content, isAccepted, isCommunityFav, upvoteCount, downvoteCount, githubRepoId (nullable), createdAt
- `solutionVotes` — id, solutionId, userId, voteType (up/down), unique(solutionId, userId)
- `comments` — id, solutionId, userId, content, parentId (self-relation for threading), upvoteCount, createdAt
- `githubRepos` — id, userId, githubRepoId, owner, name, description, htmlUrl, language, topics (String[]), stars, forks, openIssues, lastCommitMsg, lastPushedAt, readmeContent, lastSyncedAt, webhookId, webhookSecret, status (active/degraded/deleted)
- `karmaEvents` — id, userId, points, reason (enum), refId, createdAt
- `notifications` — id, userId, type, data (Json), isRead, createdAt
- `meToo` — id, problemId, userId (nullable), anonHash, createdAt, unique(problemId, userId)
- `problemChains` — id, fromProblemId, toProblемId, createdBy, note, createdAt

Add `@@index` on frequently queried fields (userId, problemId, status, createdAt).
Add a `searchVector` unsupported raw column on problems and solutions for PostgreSQL full-text search.

---

### Step 2 — Additional shadcn/ui components

Install any shadcn/ui components not yet present that will be needed:
`badge, avatar, separator, textarea, select, popover, command, dialog, sheet, tabs, tooltip, scroll-area, toggle`

---

### Step 3 — Auth (`apps/web`)

Set up Better Auth or NextAuth.js with:
- Email + password provider
- Google OAuth provider
- GitHub OAuth provider (request `repo` scope for webhook registration)
- Session provider already wraps the app in `providers.tsx` — wire auth into it

Protect API routes and server actions with session checks. Expose `useSession` hook for client components.

---

### Step 4 — Environment variables

Create `apps/web/.env.example` and `apps/server/.env.example` with all required keys:

```
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GitHub App (webhooks)
GITHUB_WEBHOOK_SECRET=

# Resend (already in apps/server)
RESEND_API_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

### Step 5 — Base layout update (`apps/web/src/app/layout.tsx`)

Update the root layout to include:
- Top navbar (extend existing `header.tsx`): RWP logo left, search bar center, auth buttons or avatar dropdown right, dark mode toggle
- Three-column layout on desktop: narrow left sidebar, main content area, right sidebar
- Left sidebar: nav links (Home, Top, Unsolved, Tags, Leaderboard)
- Right sidebar: community stats (total problems, solutions, users), top tags list, "Post a problem" CTA button
- Fully responsive — sidebars collapse into a bottom sheet or hamburger on mobile
- Keep existing `providers.tsx`, `theme-provider.tsx`, and `mode-toggle.tsx` wired up

---

### Step 6 — Problem feed page (`apps/web/src/app/page.tsx`)

Build the homepage feed. UI pattern: Reddit classic view.

Each problem card shows:
- Left: upward arrow icon + "me too" count (like Reddit vote column but for problem relatability)
- Main: title (linked to problem detail), tag pills, posted by (username or "posted anonymously" in muted italic), time ago, solution count badge, open/solved status badge
- Sort tabs at top: Hot, New, Top, Unsolved

Fetch problems via TanStack Query with cursor-based pagination (load more button or infinite scroll).

---

### Step 7 — Problem detail page (`apps/web/src/app/problems/[id]/page.tsx`)

Layout mirrors a Reddit post page:

- Problem section at top: title, full description (rendered markdown), tags, poster info, "me too" button + count, GitHub context repo card (if attached)
- "Submit a solution" form below problem (TipTap rich text editor + optional GitHub repo attach)
- Solutions list below form, each solution card has:
  - Left column: Reddit-style vertical vote arrows (up arrow, count, down arrow). Up = orange on hover/active, down = blue. Disabled if not logged in.
  - Main column: solution content (rendered markdown), GitHub repo card (if attached, collapsed by default with expand to show README), badges row ("✓ Accepted" green badge and/or "▲ Community Favourite" purple badge), commenter thread (collapsed by default, expand to show)
- Sort solutions by: Top Voted (default) | Newest | Accepted First

---

### Step 8 — Post a problem (`apps/web/src/app/problems/new/page.tsx`)

Form page or modal (prefer modal triggered from sidebar CTA and navbar):
- Title input (max 300 chars with live counter)
- TipTap rich text editor for description (markdown + code blocks)
- Tag multi-select (searchable, up to 5 tags)
- GitHub repo linker (appears only if GitHub account connected — shows repo search dropdown)
- Anonymous toggle (switch: "Post as [username]" vs "Post anonymously")
- On submit for anonymous: show management token screen with copy button and optional email field

Validate with Zod. POST to `/api/problems`.

---

### Step 9 — Voting system

Implement upvote/downvote for solutions:
- `POST /api/solutions/[id]/vote` with body `{ voteType: 'up' | 'down' }`
- Prisma transaction: upsert vote record, recalculate upvoteCount/downvoteCount on solution
- After vote: re-evaluate `isCommunityFav` across all solutions on that problem (highest upvote count = community fav, update atomically)
- Optimistic UI update via TanStack Query mutation with rollback on error
- Reddit-style arrow components with orange/blue active states

---

### Step 10 — Karma system

Implement karma event logging on every relevant action using Prisma transactions:

| Trigger | Points |
|---|---|
| Solution upvoted | +5 |
| Solution marked accepted | +15 |
| Solution earns community favourite | +10 |
| Problem gets 10+ me too | +5 |
| Solution downvoted | −2 |

- Each event creates a `karmaEvents` record and atomically increments `users.karma`
- Karma cannot go below 0
- Expose karma-gated middleware/helper: `requiresKarma(userId, threshold)` — used to guard downvoting (50pts), moderation actions (300pts), etc.

---

### Step 11 — GitHub integration

Implement the full GitHub integration:

**OAuth connect flow:**
- `GET /api/github/connect` → redirect to GitHub OAuth
- `GET /api/github/callback` → exchange code for token, store encrypted on user record
- `DELETE /api/github/disconnect` → remove token, set all user's repos to `degraded`

**Repo linking:**
- `GET /api/github/repos` → fetch user's repos from GitHub API and return list
- `POST /api/github/repos/link` → save repo metadata to `githubRepos`, register webhook via GitHub API
- `DELETE /api/github/repos/[id]/unlink` → delete webhook from GitHub, remove repo record

**Webhook receiver:**
- `POST /api/webhooks/github` → verify HMAC signature, parse push event, refresh repo metadata from GitHub API, update `lastSyncedAt`

**Fallback cron (Inngest):**
- Inngest function runs every 24 hours
- Queries all repos where `lastSyncedAt` is older than 23 hours
- Re-fetches metadata for each via GitHub REST API

**GitHub repo card component:**
- Collapsed state: repo name, description, language badge, stars, forks, "updated X ago", last commit message, "View on GitHub" link
- Expanded state: renders `readmeContent` as sanitised markdown inline
- Warning state: shows "GitHub disconnected — last known data" badge when status is `degraded`

---

### Step 12 — In-app notifications

- `GET /api/notifications` → fetch unread + recent notifications for current user
- `PATCH /api/notifications/read` → mark all or specific as read
- Bell icon in header showing unread count badge
- Dropdown panel listing recent notifications with icons per type
- Create notification records server-side on every relevant event (new solution, upvote, accepted, community fav, me too milestone, expertise tag match)

---

### Step 13 — Search

- `GET /api/search?q=...` → full-text search using PostgreSQL `tsvector` across problem titles, descriptions, and solution content
- Support filters: `?status=unsolved`, `?tag=python`, `?sort=newest`
- Build `/search` results page with the same problem card component used in the feed
- Add debounced search input in the header that shows a dropdown of top 5 results as you type, with a "See all results" link

---

### Step 14 — User profile page (`apps/web/src/app/u/[username]/page.tsx`)

- Avatar, username, karma score with tier label, member since, expertise tags (editable by owner)
- Tabs: Problems Posted | Solutions Submitted | GitHub Repos
- Solutions tab: sorted by upvote count, each showing accepted/community fav badge if applicable
- GitHub repos tab: grid of pinned repo cards (same component from Step 11)
- Karma history accessible via a "View karma history" expandable section

---

### Step 15 — "Me too" button

- Button on every problem card and detail page
- `POST /api/problems/[id]/me-too`
- Logged-in: stored in `meToo` table with userId, unique constraint prevents double-clicking
- Anonymous: stored with IP+session hash in `anonHash`
- Increments `problems.meTooCount` atomically
- At 10 me-toos: triggers karma event for poster (+5pts) and creates a notification
- Optimistic UI counter update

---

## UI design rules — Reddit-inspired

- **Colour palette:** neutral white/gray base, orange (#FF4500) as primary accent for upvotes, CTA buttons, active states. Green (#46D160) for accepted badge. Purple (#7B2FBE) for community favourite badge. Full dark mode support using CSS variables.
- **Vote arrows:** left-side vertical layout exactly like Reddit. Upvote arrow turns orange on active. Downvote arrow turns blue (#0079D3) on active. Show count between arrows.
- **Problem cards:** compact rows with clear visual hierarchy. No heavy borders — use subtle separators. Hover state lifts card slightly via background change (not box shadow).
- **Badges:** small pill badges inline with solution header. Green "✓ Accepted", purple "▲ Community Fav". Both can appear simultaneously.
- **Tags:** pill-shaped, muted colour per category (blue for coding, green for business, purple for design, etc.)
- **Typography:** Inter or system sans-serif. 15px base. Comfortable line height. Muted secondary text for metadata (time, counts).
- **Anonymous indicator:** muted italic grey "posted anonymously" in place of username.
- **Code blocks in solutions:** syntax highlighted, dark background even in light mode, monospace font.
- **Mobile:** single column. Vote arrows move to bottom of card as a horizontal row (like Reddit mobile).

---

## Code quality rules

- TypeScript strict mode throughout — no `any`
- Zod schemas defined once in `packages/db` or a shared `packages/validators` and imported by both web and server
- All mutations use Prisma transactions where multiple records are affected
- API routes return consistent `{ data, error }` shaped responses
- All protected routes check session — unauthenticated requests return 401
- Component files: one component per file, named exports, co-located types
- No inline styles — Tailwind classes only

---

Read `Project.md` first. Output the full implementation checklist. Then begin executing from Step 1.
```

---

