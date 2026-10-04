# Portfolio

Unity developer portfolio for **Nithin Vincent** — ten shipped Windows
applications: four hardware-input games, playable browser titles, and six
measurement tools, plus the engineering work behind them.

Live site: the deployed `*.vercel.app` URL (see the repository's About field).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3.
Static prerendering: every route is generated at build time.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typecheck + prerender all 13 routes
npm run start    # serve the production build
npm run typecheck
```

Use `npm.cmd` in PowerShell if script execution is restricted.

## How projects are described

All content lives in **`data/projects.ts`**. The home page, `/work`, the
`/work/[slug]` case studies and `/about` all read from that one array, so a claim
cannot appear on one page and be missing from another.

`/work` replaced two earlier pages, `/games` and `/clinical-tools`. Splitting one
client's work across a games page and a tools page made the specialism the first
thing a visitor read. Both old paths are now permanent 308 redirects to `/work`
(`next.config.ts`), and `/games/:slug` to `/work/:slug`, so old links and search
results survive the move.

### The `playable` field is the important one

It is the single switch deciding what a visitor gets:

| `playable` | Rendering |
|---|---|
| `true` | itch.io embed, click-to-load |
| `false` | YouTube video + screenshot gallery, never an iframe |

The four hardware-input games and the six measurement tools were delivered to a
rehabilitation-engineering client as **Windows installers (Inno Setup)** — ten in
all — not built for the browser. So those pages show recorded gameplay and say
plainly why there is no play button. A dead button would be worse than an
explanation.

### The boundary note argues delivery, not impossibility

The hardware games *do* accept keyboard and mouse alongside the hardware input.
An earlier version of this site claimed they were driven "not by a keyboard",
which was false. Correcting that broke the original justification for withholding
an embed — "a browser build could not work" — so the notes now rest on what is
actually true and checkable: these were never built as browser games, they ship
as installers. That is a fact about packaging, it cannot be argued with, and it
is true of the installers built here.

## itch.io embeds

The iframe points at `https://itch.io/embed/{id}` using the numeric
`itchEmbedId`, **not** at `{itchUrl}/embed`. The latter is an itch.io help page
that serves `X-Frame-Options: SAMEORIGIN`, so the browser refuses to frame it
from another origin and the game silently fails to load. `itchUrl` is still used
for the "open on itch.io" link, because the two URLs are not interchangeable.

A stalled embed offers the direct itch.io link after 12 seconds. A cross-origin
iframe reports nothing useful — a refused frame and a slow frame look identical
from the parent — so the load event is the only reliable signal and the timer is
a safety net.

## Media

`public/media/` holds screenshots and poster frames. The original gameplay
recordings are 28–61 MB each and are **not** in git; they are hosted as public
YouTube uploads and embedded click-to-load through `youtube-nocookie`, which sets
no tracking cookies until playback. Nothing third-party is requested until a
visitor presses play.

## Environment

`NEXT_PUBLIC_SITE_URL` sets the absolute origin used for canonical URLs, Open
Graph tags and `og:url`. It defaults to `http://localhost:3000` so a local build
never emits links to a placeholder host. Set it to the deployed origin in the
Vercel project settings. See `.env.example`.

## Verified claims only

Every number on the site is sourced from the projects themselves — script counts,
scene counts, installer sizes — rather than estimated. The `stats` field on each
project is documented as verified-or-absent on purpose. Nothing appears here that
cannot be checked.

The shipped-app count is checked against the installer folder rather than a note:
ten `.iss` scripts and ten `.exe` installers, 24.4–45.3 MB. Two traps worth
knowing before recounting it:

- The installers are **not** all named `*Setup*.exe`. `Grip Non-Measure.exe` has
  no `_Setup` in the name, so a `*Setup*.exe` glob reports nine and is wrong.
- `Ferris Wheel` ships as an installer but has no surviving source project on this
  machine. It is counted and named, but has no case study page and no
  gameplay-detail claims, because there is nothing local to check them against.

## Tone

Capability-first. The site opens on what is transferable — real-time input
integration, object pooling, procedural systems, packaging — and gives the
rehabilitation delivery context once, as the reason the work is production-grade.
Reader-facing labels ("Measurement tools", "Hardware & Integration") deliberately
differ from the internal `category` values, which still say `"rehab"` for
filtering.