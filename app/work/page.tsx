import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Unity projects: shipped games with recorded gameplay, browser builds you " +
    "can play on itch.io, and source-available work.",
  // Self-referential, resolved against metadataBase in app/layout.tsx. See the
  // note there on why the canonical is declared per route instead of inherited.
  alternates: { canonical: "/work" },
};

/**
 * Grouped by what a visitor can actually DO with each project, not by client
 * and not by how the input arrived. Each group names its own reason for
 * existing, because the grouping is factual: it is decided by whether a browser
 * build exists.
 */
const groups: {
  id?: string;
  heading: string;
  blurb: string;
  slugs: string[];
  footnote?: string;
}[] = [
  {
    heading: "Shipped games",
    blurb:
      "Delivered as Windows installers and shown here as recorded gameplay. " +
      "Each was owned end to end, from gameplay systems through to the " +
      "installer a non-developer could run.",
    slugs: ["block-strike", "lumber-dash", "galaxy-flex"],
    footnote:
      "Ferris Wheel shipped on the same pipeline as a fourth title. Its source " +
      "project was not retained, so no case study or gameplay detail is claimed " +
      "for it here.",
  },
  {
    heading: "Playable in browser",
    blurb:
      "Published on itch.io and embedded on their own pages, so they can be " +
      "played without leaving the site. Nothing is fetched until you press play.",
    slugs: ["ufo-lander", "tower-tactics", "memory-match", "aero-timeline-shooter"],
  },
  {
    heading: "Source available",
    blurb:
      "The public repository is the proof of the code. It is not a runnable " +
      "public build, and the page says exactly why.",
    slugs: ["zombie-shooter"],
  },
];

export default function WorkPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Work</h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          {projects.length} documented projects, grouped by how you can actually
          try them: three shipped games with recorded gameplay, four browser
          builds published on itch.io, and one public repository.
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
            {g.footnote ? (
              <p className="max-w-prose text-sm text-muted">{g.footnote}</p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
