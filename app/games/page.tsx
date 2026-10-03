import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Games",
  description:
    "All projects: rehabilitation therapeutic games, playable itch.io titles, " +
    "clinical tools, and source-available work.",
};

const groups: { heading: string; blurb: string; slugs: string[] }[] = [
  {
    heading: "Therapeutic games",
    blurb:
      "Shipped to a rehabilitation-engineering client as Windows installers and " +
      "driven in the clinic by patient movement. Video and screenshots only — " +
      "these were never built as browser games.",
    slugs: ["block-strike", "lumber-dash", "galaxy-flex"],
  },
  {
    heading: "Playable in browser",
    blurb:
      "Published on itch.io and embedded on their case study pages, so they can " +
      "be played without leaving the site.",
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

export default function GamesPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Games</h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          {projects.length} projects, grouped by what a visitor can actually do
          with them. The distinction is not a design preference: the therapeutic
          games were delivered to clinics as Windows installers, not built for
          the browser, so they are shown as video rather than as an embed.
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
    </div>
  );
}