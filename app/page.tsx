import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { profile, rehabProjects, playableProjects } from "@/data/projects";

export default function HomePage() {
  const featured = rehabProjects.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-5">
        <p className="chip">Available for Unity developer roles</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted">
          {profile.role} building <span className="text-text">therapeutic games</span>{" "}
          and <span className="text-text">clinical assessment tools</span> that
          run on real rehabilitation hardware, driven in the clinic by patient movement
          over a serial-to-TCP bridge and delivered as Windows installers.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/games" className="btn !border-accentDim !text-accent">
            See the games
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

      {/* The differentiator, stated up front rather than buried. */}
      <section className="rounded-lg border border-accentDim bg-accent/5 p-6">
        <h2 className="mb-2 text-lg font-semibold">
          Most portfolios show game projects. This one shipped to clinics.
        </h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          The work here was delivered as{" "}
          <span className="text-text">nine Windows applications</span> for a
          rehabilitation-engineering client: therapeutic arcade games plus
          clinical grip, pinch and range-of-motion assessment tools, every one
          packaged as an Inno Setup installer for client deployment. The games
          are steered by patient movement, and the tools read real sensor data
          over a serial bridge at 115200 baud.
        </p>
      </section>

      {/* Featured rehab work */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Therapeutic games</h2>
          <Link href="/games" className="link text-sm">
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <p className="text-sm text-muted">
          These run on the rehabilitation machine and were delivered as Windows
          installers. Each page shows recorded gameplay, screenshots, and what
          the hardware in the footage actually is.
        </p>
      </section>

      {/* Playable, the opposite of the above. */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">Playable in browser</h2>
          <Link href="/games" className="link text-sm">
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

      {/* Clinical tools */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">Clinical assessment tools</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          Grip, pinch and range-of-motion measurement applications, each shipped
          as its own installer with a measurement and a calibration variant. They
          are Windows desktop software and are not playable in a browser.
        </p>
        <Link href="/clinical-tools" className="btn inline-flex">
          What they measure
        </Link>
      </section>
    </div>
  );
}