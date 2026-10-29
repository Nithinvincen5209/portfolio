import Link from "next/link";
import type { Project } from "@/data/projects";

// Labels describe what the project IS, not which client it was for. "Hardware
// input" used to sit here and made every shipped game read as a device project
// before a reader had read a word of the copy.
const categoryLabel: Record<Project["category"], string> = {
  shipped: "Shipped game",
  playable: "Playable",
  source: "Source available",
};

const categoryTone: Record<Project["category"], string> = {
  shipped: "!border-accentDim !text-accent",
  playable: "!border-good/40 !text-good",
  source: "!border-warn/40 !text-warn",
};

interface Props {
  project: Project;
  /** Show two feature bullets. Used on the home page where space allows. */
  showFeatures?: boolean;
}

export default function ProjectCard({ project, showFeatures = false }: Props) {
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

      {showFeatures ? (
        <ul className="space-y-1.5">
          {project.features.slice(0, 2).map((f) => (
            <li key={f} className="flex gap-2 text-sm text-muted">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      ) : null}

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
