# RWP — RealWorldProblems

> A community-driven platform where anyone can post real-world problems and the community works together to solve them. Open to all problem types — coding, business, design, and beyond.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Core Concept & Philosophy](#2-core-concept--philosophy)
3. [User Types](#3-user-types)
4. [Feature List](#4-feature-list)
   - [4.1 Core — Problems & Solutions](#41-core--problems--solutions)
   - [4.2 Users & Identity](#42-users--identity)
   - [4.3 GitHub Integration](#43-github-integration)
   - [4.4 Discovery & Organisation](#44-discovery--organisation)
   - [4.5 Notifications & Engagement](#45-notifications--engagement)
   - [4.6 Moderation & Quality](#46-moderation--quality)
5. [Karma System](#5-karma-system)
   - [5.1 Earning Points](#51-earning-points)
   - [5.2 Karma Unlocks](#52-karma-unlocks)
6. [Solution Verification Model](#6-solution-verification-model)
7. [Anonymous User Flow](#7-anonymous-user-flow)
8. [GitHub Integration — Deep Dive](#8-github-integration--deep-dive)
9. [Tech Stack](#9-tech-stack)
10. [Database Schema](#10-database-schema)
11. [API Endpoints](#11-api-endpoints)
12. [Release Roadmap](#12-release-roadmap)

---

## 1. Project Overview

**Name:** RWP (RealWorldProblems)  
**Tagline:** Post your problem. The world will solve it.  
**Type:** Full-stack web + mobile platform (PWA)

**Mission:** To create a living, community-driven knowledge base of real-world problems and their solutions — not just coding puzzles, but genuine challenges people face every day in business, engineering, design, science, and everyday life.

### What makes RWP different?

| Feature | RWP | Stack Overflow | Reddit |
|---|---|---|---|
| Anonymous posting | Yes | No | Yes |
| Any problem type | Yes | Coding only | Yes |
| Live GitHub repo linking | Yes | No | No |
| Two coexisting best-answer badges | Yes | No | No |
| Problems never lock | Yes | No | No |
| Karma unlocks (not paywalls) | Yes | Partial | No |
| Solution versioning | Yes (v1.1) | No | No |
| Problem chains / knowledge graph | Yes (v1.1) | No | No |

---

## 2. Core Concept & Philosophy

Anyone — logged in or anonymous — can post a real-world problem. The community discusses, submits solutions, and votes on the best ones. The problem poster can mark one solution as "accepted", but the community can independently crown a "community favourite" if a better solution emerges later.

Problems never fully close. Better solutions can always arrive — even years later.

### Core loop
```
User posts problem
    → Community submits solutions
        → Community upvotes solutions
            → Poster marks accepted  ←→  Community crowns favourite
                → Better solution arrives → cycle continues indefinitely
```

### Design principles

- **No barrier to entry** — anonymous posting removes the biggest friction point
- **Solutions stay alive** — GitHub integration means solutions evolve with the repo
- **Quality always surfaces** — dual badge system ensures the best answer wins regardless of who picks it
- **Karma rewards, never gatekeeps** — core actions always free; karma unlocks recognition and trust
- **Open forever** — problems don't close; the knowledge base compounds over time

---

## 3. User Types

### Anonymous user
- Can post problems without an account
- Receives a unique one-time management token at post time
- Cannot vote, comment, or submit solutions
- Cannot earn karma
- Sees a subtle prompt to create an account to unlock full participation

### Registered user
- Full access: post, solve, upvote, downvote (50pts+), comment, follow, watch problems
- Earns karma through quality contributions
- Can connect a GitHub account to link repos
- Has a public profile showing full activity, expertise tags, and karma score

### Moderator (karma-gated, not staff)
- 300pts: moderation queue access
- 400pts: can mark problems as duplicate and close them
- 600pts: can reopen problems closed by others
- Still a community member — no special powers beyond moderation tools

---

## 4. Feature List

> **Release tiers:**
> - `[MVP]` — must be shipped before public launch
> - `[v1.1]` — shipped in first post-launch update
> - `[v2]` — future milestone

---

### 4.1 Core — Problems & Solutions

#### Post a problem `[MVP]`
- Title, long-form description, category + fine-grained tags
- Optional file and image attachments
- Post anonymously or with a logged-in profile
- Can optionally link a GitHub repo as context
- Problems are always open — they never lock, even when marked solved

#### Submit a solution `[MVP]`
- Rich text editor with full markdown support and syntax-highlighted code blocks
- Any logged-in user can submit a solution to any problem
- Multiple solutions allowed per problem — no limit
- Can optionally attach a GitHub repo (live-synced via webhook)

#### Mark as solved `[MVP]`
- Problem poster marks one solution as "accepted"
- Accepted solution receives a prominent visual badge
- Problem tagged as `solved` in feeds and search
- Poster can switch the accepted solution at any time — no lock-in
- Marking solved does NOT close the problem — new solutions can still be submitted
- Anonymous posters use a one-time management token to mark as solved

#### Upvote / downvote solutions `[MVP]`
- Any logged-in user can upvote a solution
- Downvoting unlocked at 50 karma points
- Vote counts are public on every solution

#### Community favourite badge `[MVP]`
- Separate and independent from the poster-accepted badge
- Automatically awarded to the highest-upvoted solution on any problem
- Both badges can coexist on different solutions simultaneously
- Poster notified when a community favourite overtakes their accepted answer
- Two sort modes: "accepted first" and "top voted first"

#### Comments & discussion `[MVP]`
- Threaded comments on each solution
- Logged-in users only (anonymous users can read but not comment)
- Comment upvoting to surface the most helpful discussion

#### Solution versioning `[v1.1]`
- Solvers can update their solution post-submission
- Every version saved with timestamp and diff view
- Version history publicly visible

#### Solution battle / compare mode `[v1.1]`
- Head-to-head view of two highly-upvoted solutions
- Single focused vote: "Which is better?"
- Helps break ties more decisively than raw upvote drift

#### Problem chains `[v1.1]`
- Link a new problem to an existing one: "Solving this revealed a deeper problem"
- Creates a navigable breadcrumb chain between related problems
- V2 goal: render chains as a browsable knowledge graph

---

### 4.2 Users & Identity

#### Anonymous posting `[MVP]`
- No account, no email required to post a problem
- Unique management token generated at post time — displayed prominently
- Token allows: edit problem, delete it, mark a solution as accepted
- Token expires 30 days after last use
- Anonymous posts clearly labelled in UI

#### User profiles `[MVP]`
- Sign up via email/password or OAuth (Google, GitHub)
- Public profile showing: username, avatar, bio, karma score, problems posted, solutions submitted, expertise tags, linked GitHub repos, member since
- Profiles public by default

#### Expertise tags `[MVP]`
- Users self-select from predefined list (Python, JavaScript, React, DevOps, Product Management, UX Design, Finance, Marketing, Data Science, etc.)
- Free-text custom tags also allowed
- When a problem is posted matching user's tags → targeted notification sent
- Tags visible on profile and next to username in solution threads

#### Expertise showcase `[v1.1]`
- Unlocked at 300 karma points
- Featured section at top of user's profile
- User selects up to 3 solutions to highlight
- Functions as a professional portfolio

---

### 4.3 GitHub Integration

#### GitHub OAuth connect `[MVP]`
- Users connect GitHub from profile settings via OAuth 2.0
- Required before any repo can be linked
- Users can disconnect at any time (repos gracefully degrade)
- One GitHub account per RWP account

#### Repo linking on solutions `[MVP]`
- Link any GitHub repo when submitting a solution
- Live metadata card shows: repo name, description, language tags, stars, forks, last commit message, last updated timestamp
- Two display states:
  - **Collapsed (default):** compact metadata summary
  - **Expanded:** renders full README inline as parsed markdown
- "View on GitHub" link always visible

#### Repo linking on problems `[MVP]`
- Poster attaches a GitHub repo as context
- Same collapsed/expand metadata card
- Labelled "context repo" to distinguish from solution repos

#### Repo showcase on profiles `[MVP]`
- Users pin up to 6 GitHub repos on their profile
- Auto-updated whenever user pushes commits
- Displayed as a responsive card grid

#### Webhook auto-sync `[MVP]`
- Platform registers a GitHub webhook when a repo is linked
- Listens for `push` events — refreshes metadata immediately on push
- 24-hour cron job as fallback sync for missed webhooks
- Last synced timestamp stored and visible

#### Graceful degradation `[MVP]`
- If GitHub disconnected: all linked repos show "last known state" with a warning badge
- No broken UI — static snapshot with warning
- Reconnecting GitHub resumes live syncing automatically
- Deleted repos show: "Repo no longer available"

---

### 4.4 Discovery & Organisation

#### Tags & categories `[MVP]`
- Top-level categories: Coding / Technical, Business, Design, Science, Finance, Life / General
- Fine-grained tags within categories
- Problems can have up to 5 tags
- Tag pages with dedicated feeds
- Tag following with notifications

#### Search `[MVP]`
- Full-text search across problem titles, descriptions, solution content, tags
- Filters: solved/unsolved, date range, tag, minimum "me too" count
- Sort: relevance, newest, most solutions, most upvoted solutions

#### Feed sorting `[MVP]`
- Global options: Newest, Trending, Most upvoted solutions, Unsolved only
- Logged-in users get personalised feed weighted by expertise and followed tags
- Filter combinations supported

#### "I have this problem too" button `[MVP]`
- Usable by both anonymous and logged-in users
- Public counter shown on every problem card
- High count boosts feed ranking
- Logged-in users subscribed to solution notifications on click
- Counter milestones trigger notifications to the poster (10 / 50 / 100)

#### Unsolved boost `[v1.1]`
- Problems unsolved after 7 days (configurable):
  - Bumped higher in unsolved feed
  - Targeted notification sent to high-karma users whose expertise matches
- Prevents quality problems dying from low early traffic

#### Top solvers leaderboard `[v1.1]`
- Public, ranked by karma score
- Filterable by expertise tag
- Users appear once they hit 700 karma points
- Shows: username, karma score, accepted solution count, top expertise tags

---

### 4.5 Notifications & Engagement

#### In-app notifications `[MVP]`

| Event | Recipient |
|---|---|
| New solution submitted to your problem | Problem poster |
| Your solution was upvoted | Solution author |
| Your solution was marked accepted | Solution author |
| Accepted solution was switched away from yours | Previous accepted author |
| New community favourite emerged on your problem | Problem poster |
| Someone commented on your solution | Solution author |
| Your problem hit a "me too" milestone | Problem poster |
| New problem in your expertise tag | Matching users |
| GitHub repo synced / sync failed | Repo owner |

#### Email notifications `[v1.1]`
- Opt-in only — off by default
- Instant or daily digest modes
- Configurable per event type
- One-click unsubscribe in every email

#### Follow / watch a problem `[v1.1]`
- Any logged-in user can watch any problem
- Notified on: new solutions, problem solved, community favourite changing
- Watched problems in a "Watching" tab on profile

---

### 4.6 Moderation & Quality

#### Report / flag `[MVP]`
- Report categories: spam, off-topic, abusive, duplicate, misinformation
- Flagged content goes into moderation queue
- 300+ karma users have queue access
- Reporter notified when report is resolved

#### Duplicate detection `[v1.1]`
- Similarity check runs before problem is submitted
- Non-blocking prompt suggests similar existing problems
- 400+ karma users can manually mark as duplicate and close

#### AI triage `[v2]`
- LLM auto-suggests tags, generates one-sentence summary, flags low-quality posts
- Runs server-side on every new problem submission
- Natural integration point with R.O.T.I research

---

## 5. Karma System

Karma represents trust earned through quality contributions. It rewards, never gatekeeps.

> Anonymous users cannot earn karma — creating a meaningful incentive to register without forcing it.

---

### 5.1 Earning Points

| Action | Points |
|---|---|
| Your solution is upvoted | +5 per upvote |
| Your solution is marked accepted | +15 |
| Your solution earns community favourite | +10 |
| Your problem gets 10+ "me too" clicks | +5 |
| Your solution is downvoted | −2 per downvote |

- Points awarded per unique vote (no gaming)
- Karma cannot go below 0
- Full karma history visible on profile

---

### 5.2 Karma Unlocks

| Points | Unlock |
|---|---|
| 25 | Comment without rate limit (new users: 1/min cooldown) |
| 50 | Can downvote solutions |
| 75 | Posts skip new-user moderation queue |
| 100 | Edit own posts + unlock custom profile bio |
| 150 | Add/edit tags on other users' problems |
| 200 | Priority flag — actioned faster by mod queue |
| 250 | Suggest Wikipedia-style edits to any post |
| 300 | Moderation queue access + expertise showcase on profile |
| 400 | Mark problems as duplicate and close them |
| 500 | "Trusted solver" public badge + access to private Solver Lounge |
| 600 | Reopen problems closed by others |
| 700 | Listed on Top Solvers leaderboard |
| 1000 | Nominate problems for homepage "Featured" slot |

**Design principle:** Thresholds of 25–150pts should be reachable within one week of active participation to build habit early.

---

## 6. Solution Verification Model

RWP uses a dual-badge system rather than a single "correct answer" model.

### Accepted badge
- Set exclusively by the problem poster
- Meaning: "This solution worked for me personally"
- Changeable at any time — no lock-in
- Anonymous posters set this via management token

### Community favourite badge
- Set automatically by the platform
- Meaning: "The community believes this is the best solution"
- Always reflects the current highest-voted solution
- Updates dynamically — can change as votes shift
- Can coexist with accepted badge on a different solution

### Why two badges?
The poster's needs and community consensus don't always align. A poster might accept the first solution that works for them even if a more thorough solution arrives later. The dual-badge system ensures both perspectives are permanently visible and neither gets buried.

### Sort behaviour
- Default: accepted first, then by vote count
- Alternate: vote count only (community favourite always at top)
- User preference saved per session

---

## 7. Anonymous User Flow

### Posting flow
1. User clicks "Post a problem" — no login prompt
2. Fills title, description, tags, optional attachments
3. On submit: system generates a unique management token
4. Confirmation screen shows management link prominently with: "Save this link — it's the only way to manage your post"
5. Optional: enter email to receive the link (email not stored beyond delivery)
6. Post goes live immediately

### Managing the post
- Management token allows: edit problem, delete problem, mark solution as accepted
- Token expires 30 days after last use
- Lost tokens cannot be recovered — communicated clearly upfront

### Account upgrade prompt
- Non-intrusive banner on management page: "Create an account to track replies, earn karma, and never lose access to your posts"
- If account is created, anonymous post can optionally be claimed and associated with it

---

## 8. GitHub Integration — Deep Dive

### OAuth flow
1. User clicks "Connect GitHub" in profile settings
2. Redirected to GitHub OAuth authorization
3. Approves scopes: `read:user`, `repo`
4. Server exchanges auth code for access token
5. Token stored encrypted alongside GitHub user ID and username
6. Repo linking now available everywhere

### Repo metadata fetched (GitHub REST API)
- `GET /repos/{owner}/{repo}` → name, description, url, language, topics, stars, forks, open issues, last push timestamp
- `GET /repos/{owner}/{repo}/commits` → last commit message + author date
- `GET /repos/{owner}/{repo}/readme` → base64-encoded README, decoded and rendered as sanitised markdown

### Webhook setup
```json
POST https://api.github.com/repos/{owner}/{repo}/hooks
{
  "config": {
    "url": "https://rwp.app/api/webhooks/github",
    "content_type": "json",
    "secret": "<per-repo HMAC secret>"
  },
  "events": ["push"],
  "active": true
}
```
- Each webhook has a unique HMAC secret per repo
- Payloads verified server-side before processing
- On push: metadata refreshed, `last_synced_at` updated

### Fallback cron
- Runs every 24 hours
- Queries all repos where `last_synced_at` > 23 hours ago
- Re-fetches metadata via REST API
- Safety net for missed webhooks

---

## 10. Database Schema

### users
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
username        VARCHAR(32) UNIQUE NOT NULL
email           VARCHAR(255) UNIQUE
email_verified  BOOLEAN DEFAULT false
avatar_url      TEXT
bio             TEXT
karma           INTEGER DEFAULT 0
github_id       INTEGER UNIQUE
github_username VARCHAR(64)
github_token    TEXT  -- encrypted
created_at      TIMESTAMP DEFAULT now()
updated_at      TIMESTAMP DEFAULT now()
```

### problems
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
title           VARCHAR(300) NOT NULL
description     TEXT NOT NULL
user_id         UUID REFERENCES users(id)  -- NULL if anonymous
anon_token_hash TEXT  -- bcrypt hash of management token
is_anonymous    BOOLEAN DEFAULT false
status          ENUM('open', 'solved') DEFAULT 'open'
me_too_count    INTEGER DEFAULT 0
view_count      INTEGER DEFAULT 0
created_at      TIMESTAMP DEFAULT now()
updated_at      TIMESTAMP DEFAULT now()
```

### tags
```sql
id        UUID PRIMARY KEY DEFAULT gen_random_uuid()
name      VARCHAR(64) UNIQUE NOT NULL
category  VARCHAR(64) NOT NULL
slug      VARCHAR(64) UNIQUE NOT NULL
```

### problem_tags
```sql
problem_id  UUID REFERENCES problems(id)
tag_id      UUID REFERENCES tags(id)
PRIMARY KEY (problem_id, tag_id)
```

### solutions
```sql
id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
problem_id        UUID REFERENCES problems(id)
user_id           UUID REFERENCES users(id)
content           TEXT NOT NULL
is_accepted       BOOLEAN DEFAULT false
is_community_fav  BOOLEAN DEFAULT false
upvote_count      INTEGER DEFAULT 0
downvote_count    INTEGER DEFAULT 0
github_repo_id    UUID REFERENCES github_repos(id)  -- nullable
created_at        TIMESTAMP DEFAULT now()
updated_at        TIMESTAMP DEFAULT now()
```

### solution_votes
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
solution_id  UUID REFERENCES solutions(id)
user_id      UUID REFERENCES users(id)
vote_type    ENUM('up', 'down')
created_at   TIMESTAMP DEFAULT now()
UNIQUE (solution_id, user_id)
```

### comments
```sql
id            UUID PRIMARY KEY DEFAULT gen_random_uuid()
solution_id   UUID REFERENCES solutions(id)
user_id       UUID REFERENCES users(id)
content       TEXT NOT NULL
parent_id     UUID REFERENCES comments(id)  -- threading
upvote_count  INTEGER DEFAULT 0
created_at    TIMESTAMP DEFAULT now()
updated_at    TIMESTAMP DEFAULT now()
```

### github_repos
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id         UUID REFERENCES users(id)
github_repo_id  INTEGER NOT NULL
owner           VARCHAR(128) NOT NULL
name            VARCHAR(128) NOT NULL
description     TEXT
html_url        TEXT NOT NULL
language        VARCHAR(64)
topics          TEXT[]
stars           INTEGER DEFAULT 0
forks           INTEGER DEFAULT 0
open_issues     INTEGER DEFAULT 0
last_commit_msg TEXT
last_pushed_at  TIMESTAMP
readme_content  TEXT
last_synced_at  TIMESTAMP
webhook_id      INTEGER
webhook_secret  TEXT  -- encrypted
status          ENUM('active', 'degraded', 'deleted') DEFAULT 'active'
created_at      TIMESTAMP DEFAULT now()
```

### karma_events
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id     UUID REFERENCES users(id)
points      INTEGER NOT NULL  -- positive or negative
reason      ENUM('solution_upvoted', 'solution_accepted', 'community_favourite', 'me_too_milestone', 'solution_downvoted')
ref_id      UUID  -- ID of solution/problem that triggered the event
created_at  TIMESTAMP DEFAULT now()
```

### notifications
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id     UUID REFERENCES users(id)
type        VARCHAR(64) NOT NULL
data        JSONB  -- flexible payload per notification type
is_read     BOOLEAN DEFAULT false
created_at  TIMESTAMP DEFAULT now()
```

### me_too
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
problem_id  UUID REFERENCES problems(id)
user_id     UUID REFERENCES users(id)  -- nullable
anon_hash   TEXT  -- IP+session hash for anonymous tracking
created_at  TIMESTAMP DEFAULT now()
UNIQUE (problem_id, user_id)
```

### problem_chains
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
from_problem_id  UUID REFERENCES problems(id)
to_problem_id    UUID REFERENCES problems(id)
created_by       UUID REFERENCES users(id)
note             TEXT
created_at       TIMESTAMP DEFAULT now()
```

---

## 11. API Endpoints

### Problems
```
GET    /api/problems                    List problems (feed, filters, sorting)
POST   /api/problems                    Create a problem
GET    /api/problems/:id                Get a single problem with solutions
PATCH  /api/problems/:id                Edit a problem (owner or anon token)
DELETE /api/problems/:id                Delete a problem (owner or anon token)
POST   /api/problems/:id/me-too         Register a "me too" click
```

### Solutions
```
GET    /api/problems/:id/solutions      List solutions for a problem
POST   /api/problems/:id/solutions      Submit a solution
PATCH  /api/solutions/:id               Edit a solution
DELETE /api/solutions/:id               Delete a solution
POST   /api/solutions/:id/accept        Mark as accepted (poster only)
POST   /api/solutions/:id/vote          Upvote or downvote
```

### Comments
```
GET    /api/solutions/:id/comments      List comments
POST   /api/solutions/:id/comments      Post a comment
PATCH  /api/comments/:id                Edit a comment
DELETE /api/comments/:id                Delete a comment
```

### Users
```
GET    /api/users/:username             Get public profile
GET    /api/users/me                    Get own profile (auth required)
PATCH  /api/users/me                    Update own profile
GET    /api/users/me/notifications      Get notifications
PATCH  /api/users/me/notifications/read Mark all as read
```

### GitHub Integration
```
POST   /api/github/connect              Initiate GitHub OAuth
GET    /api/github/callback             OAuth callback handler
DELETE /api/github/disconnect           Disconnect GitHub account
GET    /api/github/repos                List user's GitHub repos
POST   /api/github/repos/link           Link a repo (registers webhook)
DELETE /api/github/repos/:id/unlink     Unlink a repo (removes webhook)
POST   /api/webhooks/github             Receive GitHub push webhook events
```

### Search & Tags
```
GET    /api/search                      Full-text search
GET    /api/tags                        List all tags
GET    /api/tags/:slug/problems         Problems for a specific tag
```

---

## 12. Release Roadmap

### MVP — launch requirements
- [ ] Anonymous problem posting with management token
- [ ] User registration + OAuth (Google + GitHub)
- [ ] Solution submission with markdown + code support
- [ ] Upvote system (downvote gated at 50pts)
- [ ] Accepted badge + community favourite badge (dual system)
- [ ] Dual-badge display with two sort modes
- [ ] Threaded comments on solutions
- [ ] Tags, categories, tag pages, tag following
- [ ] Full-text search with filters
- [ ] "I have this problem too" button
- [ ] In-app notifications (all types)
- [ ] GitHub OAuth connect
- [ ] Repo linking on solutions, problems, and profiles
- [ ] Collapsed / expand README preview
- [ ] Webhook auto-sync + 24hr cron fallback
- [ ] Graceful GitHub degradation
- [ ] Karma earning + full unlock tier system
- [ ] Report / flag system with mod queue
- [ ] Public user profiles with karma history
- [ ] Feed sorting (newest, trending, most upvoted, unsolved)
- [ ] PWA support (installable, offline-ready)

### v1.1 — post-launch
- [ ] Solution versioning with diff view
- [ ] Solution battle / compare mode
- [ ] Problem chains
- [ ] Expertise showcase on profiles
- [ ] Email notifications (opt-in)
- [ ] Follow / watch a problem
- [ ] Unsolved boost system
- [ ] Top solvers leaderboard (filterable by tag)
- [ ] Duplicate detection on problem submit
- [ ] Typesense integration for faster search

### v2 — future
- [ ] AI triage (auto-tagging, summarisation, quality flagging)
- [ ] Problem chains knowledge graph view
- [ ] Native mobile app (React Native)
- [ ] Public API for third-party integrations
- [ ] Organisation accounts (teams share a problem space)
- [ ] Embeddable widget for external sites