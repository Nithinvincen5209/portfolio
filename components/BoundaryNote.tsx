import Link from "next/link";
import type { Project } from "@/data/projects";

export default function BoundaryNote({ project }: { project: Project }) {
  if (!project.boundaryNote) return null;

  return (
    <aside className="rounded-lg border border-warn/30 bg-warn/5 p-5">
      <h2 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-warn">
        <span aria-hidden>⚠</span>
        Why there is no play button
      </h2>
      <p className="text-sm leading-relaxed text-muted">
        {project.boundaryNote}
      </p>
    </aside>
  );
}