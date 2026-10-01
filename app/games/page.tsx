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
      "Shipped to a rehabilitation-engineering client and driven by patient " +
      "movement. Video and screenshots only — these need the machine.",
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
          games depend on serial hardware and physical controls, so a browser
          build of them would be misleading.
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