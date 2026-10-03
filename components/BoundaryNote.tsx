import type { Project } from "@/data/projects";

export default function BoundaryNote({ project }: { project: Project }) {
  if (!project.boundaryNote) return null;

  // Deliberately not styled as a warning. This is an intentional design
  // decision, not a problem with the project, so it reads as an explanation
  // rather than an error the visitor should worry about.
  return (
    <aside className="rounded-lg border border-border bg-surface p-5">
      <h2 className="mb-1.5 text-sm font-semibold text-text">
        Why there is no play button
      </h2>
      <p className="text-sm leading-relaxed text-muted">
        {project.boundaryNote}
      </p>
    </aside>
  );
}