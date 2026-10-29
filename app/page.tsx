import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import {
  capabilities,
  highlights,
  playableProjects,
  profile,
  projects,
} from "@/data/projects";

// The homepage canonical is declared here rather than inherited from
// app/layout.tsx. See the note in that file for why.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Mixed on purpose, not a slice of one category: two shipped games with
  // recorded gameplay, plus the one project whose full source is public. The
  // first screen should look like a body of work, not one client.
  const featured = ["block-strike", "galaxy-flex", "zombie-shooter"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-20">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-6">
        <p className="chip">Available for Unity developer roles</p>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            Gameplay systems · UI · Interactive audio
          </p>
        </div>

        <p className="max-w-prose text-lg leading-relaxed text-muted">
          {profile.summary}
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/work" className="btn !border-accentDim !text-accent">
            View work
          </Link>
          {/* Plain <a>, not <Link>: the resume is a static file in /public, not
              an app route. Link prefetches the href and its RSC payload, which
              for a PDF means a guaranteed 404 in the console (/?_rsc -> pdf). */}
          <a href={profile.resumePdf} className="btn" download>
            Download resume
          </a>
          <a
            href={profile.github}
            className="btn"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            className="btn"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>

        {/* Verified numbers, stated once. Nothing here is an estimate. */}
        <dl className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-lg border border-border bg-surface p-4">
              <dd className="font-mono text-2xl font-semibold text-accent">
                {h.value}
              </dd>
              <dt className="mt-1 text-xs leading-tight text-muted">{h.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Profile summary                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section id="profile" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Link href="/about" className="link text-sm">
            More about me →
          </Link>
        </div>
        <div className="space-y-3">
          <p className="prose-body">
            I build gameplay systems in Unity and C# — procedural level
            generation, physics, object pooling, UI and game-state management —
            and I care about the part that comes after the feature works: whether
            the frame rate holds on someone else&apos;s machine, and whether the
            build can be installed without a developer standing next to it.
          </p>
          <p className="prose-body">
            Eight months at Remap Intelligence Solutions produced four Windows
            games, each owned end to end from gameplay through to the installer.
            Outside that engagement I have published four browser builds on
            itch.io and keep a 3D survival shooter in public, with its Wwise audio
            definitions included. The audio work is backed by an audio
            engineering diploma, and it is treated here as a systems problem
            rather than an asset-import step.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* What I build                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">What I build</h2>
          <p className="max-w-prose text-sm text-muted">
            The areas I have shipped work in, rather than a list of tools.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.heading} className="card flex flex-col gap-3">
              <h3 className="text-base font-semibold text-text">{c.heading}</h3>
              <p className="text-sm leading-relaxed text-muted">{c.body}</p>
              <ul className="mt-auto space-y-1.5 pt-1">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Selected work                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Selected work</h2>
          <Link href="/work" className="link text-sm">
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} showFeatures />
          ))}
        </div>
        <p className="text-sm text-muted">
          Block Strike, Lumber Dash and Galaxy Flex shipped as Windows
          installers; their pages show recorded gameplay. A fourth title, Ferris
          Wheel, shipped on the same pipeline but its source was not retained, so
          no case study is claimed for it.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Playable                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Playable in browser</h2>
          <Link href="/work" className="link text-sm">
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playableProjects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <p className="text-sm text-muted">
          {playableProjects.length} titles published on itch.io and embedded on
          their own pages. Nothing is fetched until you press play.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Contact                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4 rounded-lg border border-accentDim bg-accent/5 p-6">
        <h2 className="text-lg font-semibold">Get in touch</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          Open to Unity gameplay and technical roles. The fastest route is email;
          the resume is a one-page PDF and the source for two projects is public
          if you would rather read code than copy.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className="btn !border-accentDim !text-accent" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a href={profile.resumePdf} className="btn" download>
            Resume PDF
          </a>
        </div>
      </section>
    </div>
  );
}
