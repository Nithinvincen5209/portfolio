import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BoundaryNote from "@/components/BoundaryNote";
import ImageGallery from "@/components/ImageGallery";
import PlayableEmbed from "@/components/PlayableEmbed";
import Stats from "@/components/Stats";
import VideoPlayer from "@/components/VideoPlayer";
import { getProject, projects } from "@/data/projects";

// All slugs are known at build time, so every page is static.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const ytId = project.media.youtubeId;
  const isPending = ytId?.startsWith("PENDING_") ?? false;
  const hasVideo = Boolean(ytId);

  // The itch.io embed only renders when both identifiers are present. Falling
  // back to the project page link keeps the page honest if one is ever missing,
  // rather than pointing an iframe at an undefined id.
  const canEmbed = Boolean(project.playable && project.itchEmbedId);

  return (
    <article className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <Link href="/games" className="link text-sm">
          ← All projects
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl">{project.name}</h1>
          <span className="chip">
            {project.playable ? "Playable in browser" : "Video & screenshots"}
          </span>
        </div>
        <p className="max-w-prose text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
      </header>

      {/*
        Order matters here. For a rehabilitation game the video is the proof, so
        it takes the hero slot immediately under the title. For a playable game
        the embed takes it instead. Never both: two competing 16:9 blocks in a
        column pushes the actual writing below the fold.
      */}
      {canEmbed ? (
        <PlayableEmbed
          itchUrl={project.itchUrl!}
          itchEmbedId={project.itchEmbedId!}
          title={project.name}
        />
      ) : hasVideo ? (
        <VideoPlayer
          youtubeId={ytId!}
          title={`${project.name} gameplay`}
          poster={project.media.poster}
          caption={project.media.videoCaption}
          pending={isPending}
        />
      ) : null}

      {/* Explains the absent play button while it is still what the eye hits. */}
      <BoundaryNote project={project} />

      {/* Summary */}
      <p className="max-w-prose text-base leading-relaxed text-text">
        {project.summary}
      </p>

      {/* Verified numbers */}
      <Stats stats={project.stats ?? []} />

      {/* Case study body */}
      {project.sections.map((s) => (
        <section key={s.heading} className="space-y-2">
          <h2 className="text-lg font-semibold">{s.heading}</h2>
          <p className="prose-body">{s.body}</p>
        </section>
      ))}

      {/* Screenshots: supporting evidence, deliberately last. */}
      <ImageGallery
        images={project.media.images}
        title={project.name}
        slug={project.slug}
      />

      {/* Tech + links */}
      <footer className="space-y-4 border-t border-border pt-6">
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Built with
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.repoUrl || project.itchUrl ? (
          <div className="flex flex-wrap gap-3">
            {project.repoUrl ? (
              <a
                className="btn"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Source on GitHub ↗
              </a>
            ) : null}
            {project.itchUrl ? (
              <a
                className="btn"
                href={project.itchUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Play on itch.io ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </footer>
    </article>
  );
}