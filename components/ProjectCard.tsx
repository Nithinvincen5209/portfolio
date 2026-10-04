import Link from "next/link";
import type { Project } from "@/data/projects";

// Labels describe what the project IS, not which client it was for. "Rehabilitation
// game" on two of the first three cards read as a specialism badge before a
// reader has read a word of the copy.
const categoryLabel: Record<Project["category"], string> = {
  rehab: "Hardware input",
  playable: "Playable",
  tools: "Measurement tool",
  source: "Source available",
};

const categoryTone: Record<Project["category"], string> = {
  rehab: "!border-accentDim !text-accent",
  playable: "!border-good/40 !text-good",
  tools: "!border-border !text-muted",
  source: "!border-warn/40 !text-warn",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="card card-hover flex flex-col gap-3 no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-text">{project.name}</h3>
        <span className={`chip shrink-0 ${categoryTone[project.category]}`}>
          {categoryLabel[project.category]}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
        {project.tech.length > 4 ? (
          <span className="chip">+{project.tech.length - 4}</span>
        ) : null}
      </div>
    </Link>
  );
}