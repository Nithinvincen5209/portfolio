import type { Project } from "@/data/projects";

/**
 * How the build was delivered.
 *
 * Deliberately not styled as a warning: delivering a Windows installer is a
 * completed release, not a problem with the project. The heading says what the
 * note is for, and the copy does not apologise for a missing play button.
 */
export default function BoundaryNote({ project }: { project: Project }) {
  if (!project.boundaryNote) return null;

  return (
    <aside className="rounded-lg border border-border bg-surface p-5">
      <h2 className="mb-1.5 text-sm font-semibold text-text">About this build</h2>
      <p className="text-sm leading-relaxed text-muted">
        {project.boundaryNote}
      </p>
    </aside>
  );
}
