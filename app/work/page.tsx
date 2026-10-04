import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects, clinicalTools } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Unity projects: games built around live hardware input, titles playable in " +
    "browser, source-available work, and sensor-driven measurement applications.",
  // Self-referential, resolved against metadataBase in app/layout.tsx. See the
  // note there on why the canonical is declared per route instead of inherited.
  alternates: { canonical: "/work" },
};

/**
 * Grouped by what a visitor can actually DO with each project, not by client.
 *
 * This replaced two pages, /games and /clinical-tools. Keeping the measurement
 * tools in their own top-level page gave a single engagement a permanent slot in
 * the site navigation, which made one domain look like the whole career. Folding
 * them in keeps the four groups visible without any of them owning the nav.
 *
 * Each group names its own reason for existing, because the grouping is factual
 * rather than stylistic: it is decided by whether a browser build is possible.
 */
const groups: {
  id?: string;
  heading: string;
  blurb: string;
  slugs: string[];
}[] = [
  {
    heading: "Games built around hardware input",
    blurb:
      "Shipped as Windows installers. Input arrives from arcade cabinet buttons " +
      "and wrist-motion sensors over a serial-to-TCP bridge, so a browser build " +
      "would misrepresent the work. Shown as recorded gameplay and screenshots.",
    slugs: ["block-strike", "lumber-dash", "galaxy-flex"],
  },
  {
    heading: "Playable in browser",
    blurb:
      "Published on itch.io and embedded on their own case study pages, so they " +
      "can be played without leaving the site. Nothing is fetched until you click.",
    slugs: ["ufo-lander", "tower-tactics", "memory-match", "aero-timeline-shooter"],
  },
  {
    heading: "Source available",
    blurb:
      "The public repository serves as the proof of the code. It is not a " +
      "runnable public build, and the page says exactly why.",
    slugs: ["zombie-shooter"],
  },
];

export default function WorkPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Work</h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          {projects.length} projects plus a set of measurement applications, grouped
          by whether you can run them in a browser. That split is not a design
          preference: the hardware-input games were delivered as Windows installers
          rather than built for the web, so they are shown as video instead of as
          an embed that would go nowhere.
        </p>
      </header>

      {groups.map((g) => {
        const items = g.slugs
          .map((s) => projects.find((p) => p.slug === s))
          .filter((p): p is (typeof projects)[number] => Boolean(p));
        if (items.length === 0) return null;
        return (
          <section key={g.heading} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{g.heading}</h2>
              <p className="mt-1 max-w-prose text-sm text-muted">{g.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Measurement tooling. Was /clinical-tools, now a group here. */}
      <section id="measurement-tools" className="space-y-5 border-t border-border pt-8">
        <div>
          <h2 className="text-xl font-semibold">Measurement applications</h2>
          <p className="mt-1 max-w-prose text-sm text-muted">
            Six sensor-driven desktop applications for grip, pinch and
            range-of-motion measurement. Each ships as its own Inno Setup
            installer so a machine can be set up without a build pipeline, and each
            has a measurement variant plus a non-measurement variant used for
            calibration and setup.
          </p>
        </div>

        {/* Windows only, stated before the list rather than after. */}
        <aside className="rounded-lg border border-warn/30 bg-warn/5 p-5">
          <h3 className="mb-1.5 text-sm font-semibold text-warn">
            Desktop software, not browser software
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            These are Windows executables that read from serial hardware. There is
            no browser build and no demo, so there is nothing to click here — the
            installers themselves are the deliverable.
          </p>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clinicalTools.map((t) => (
            <div key={t.name} className="card flex flex-col gap-2">
              <h3 className="text-base font-semibold">{t.name}</h3>
              <p className="text-sm text-muted">{t.measures}</p>
              <dl className="mt-auto space-y-1 pt-2 text-xs text-muted">
                <div className="flex justify-between gap-2">
                  <dt>Variants</dt>
                  <dd className="font-mono">
                    {t.hasNonMeasurementVariant
                      ? "measurement + non-measurement"
                      : "measurement"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Installer</dt>
                  <dd className="font-mono">{t.installerSizeMb} MB</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="prose-body space-y-3 border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-text">Where this fits</h3>
          <p>
            Together with the four games, these were{" "}
            <span className="text-text">ten Windows applications</span> delivered
            under one engagement — four games and six measurement tools, each
            packaged as an Inno Setup installer. Gameplay, device integration,
            packaging and release were all owned end to end.
          </p>
          <p>
            One of the games also shipped in a D-Handle build, a controller coupler
            for a constrained grip, which is the kind of hardware variation the
            whole toolset was built around.
          </p>
          <p className="text-sm text-muted">
            A fourth game, Ferris Wheel, also shipped as an installer but has no
            surviving source project, so it has no page here and no detail is
            claimed for it.
          </p>
        </div>
      </section>
    </div>
  );
}