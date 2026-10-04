import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { profile, projects, playableProjects } from "@/data/projects";

// The homepage canonical is declared here rather than inherited from
// app/layout.tsx. See the note in that file for why.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Explicitly mixed, not a slice of any one category.
  //
  // rehabProjects.slice(0, 3) opened the homepage with three clinical titles in a
  // row. nonPlayableProjects.slice(0, 3) was worse in a subtle way: it is also
  // the same three, because every non-playable project is a Remap game, so the
  // "rebalanced" version looked identical to the one it replaced. Zombie Shooter
  // is the one non-playable project that is not, and it is also the only one with
  // a public repository and full source.
  //
  // Two games with source and video, plus the one that shows general gameplay
  // work, so the first screen is not a single-client body of work.
  const featured = ["block-strike", "lumber-dash", "zombie-shooter"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-5">
        <p className="chip">Available for Unity developer roles</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted">
          {profile.role} building <span className="text-text">gameplay systems</span>,
          {" "}
          <span className="text-text">real-time device integration</span> and
          interactive audio in Unity. Comfortable where a game has to take input
          from real hardware mid-frame and still hold a steady framerate, and where
          the build has to ship as something a non-programmer can install.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/work" className="btn !border-accentDim !text-accent">
            See the work
          </Link>
          <Link href={profile.resumePdf} className="btn" download>
            Download resume
          </Link>
          <a
            href={profile.linkedin}
            className="btn"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* The differentiator, stated as capability rather than as a contrast with
          other portfolios. "This one shipped to clinics" defined the work by
          opposition, which invited a reader to sort it into a healthcare bucket
          and move on. Shipping ten installers is the same fact stated plainly. */}
      <section className="rounded-lg border border-accentDim bg-accent/5 p-6">
        <h2 className="mb-2 text-lg font-semibold">
          Ten shipped applications, not just prototypes
        </h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          The Remap work shipped as{" "}
          <span className="text-text">ten Windows applications</span>: four games
          and six sensor-driven measurement tools, every one packaged as an Inno
          Setup installer. The games take live input from arcade buttons and
          wrist-motion sensors over a serial-to-TCP bridge, and the measurement
          tools read the same hardware. Built for a rehabilitation-engineering
          client, but the engineering is ordinary Unity work under a tighter
          constraint than a game usually imposes.
        </p>
      </section>

      {/* Selected work */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Selected work</h2>
          <Link href="/work" className="link text-sm">
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <p className="text-sm text-muted">
          Games built around live hardware input, shown as recorded gameplay and
          screenshots. Each page explains what the hardware in the footage is, and
          whether keyboard and mouse also work.
        </p>
      </section>

      {/* Playable */}
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
          {playableProjects.length} titles published on itch.io, embedded on
          their own pages. Nothing is downloaded until you click play.
        </p>
      </section>

      {/* Measurement tooling */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">Measurement tooling</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          Six sensor-driven desktop applications for grip, pinch and
          range-of-motion measurement, each shipped as its own installer with a
          measurement and a calibration variant. They are Windows desktop
          software and are not playable in a browser.
        </p>
        <Link href="/work#measurement-tools" className="btn inline-flex">
          What they measure
        </Link>
      </section>
    </div>
  );
}