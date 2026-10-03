"use client";

import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
  /** Poster image shown before the video loads. */
  poster?: string;
  /** One line on what the footage shows. Shown under the player. */
  caption?: string;
  /** True while the id is still the PENDING_ placeholder. */
  pending?: boolean;
}

export default function VideoPlayer({
  youtubeId,
  title,
  poster,
  caption,
  pending = false,
}: Props) {
  const [playing, setPlaying] = useState(false);

  if (pending) {
    // Holds the same hero slot a live video would, so the page does not collapse
    // into a photo gallery while the recording is being published. The poster
    // still carries the evidence; only the playback is missing.
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="relative aspect-video w-full">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt={`${title} gameplay`}
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg/70 p-6 text-center backdrop-blur-[2px]">
            <span className="chip">gameplay recording</span>
            <p className="max-w-sm text-sm text-muted">
              Recorded on the rehabilitation hardware this game runs on.
              Publishing the video shortly.
            </p>
          </div>
        </div>
        {caption ? (
          <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  // Click-to-load. A YouTube iframe pulls in megabytes of player JS and a
  // cookie consent flow before anyone presses play, which is a real cost on a
  // page a recruiter opens on hotel wifi. Nothing third-party is requested
  // until the visitor asks for the video.
  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface2 text-left"
        aria-label={`Play gameplay video: ${title}`}
      >
        {poster ? (
          // Plain <img> rather than next/image: these are local screenshots,
          // not remote sources, and the optimisation API is not worth the
          // config for a handful of files.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={`${title} gameplay`}
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-95"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface">
            <span className="text-4xl text-muted">▶</span>
          </div>
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-bg/85 pl-1 text-3xl text-text backdrop-blur transition-transform group-hover:scale-105">
            ▶
          </span>
        </span>
      </button>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-black">
      <div className="aspect-video w-full">
        <iframe
          // youtube-nocookie does not set tracking cookies until playback.
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-border bg-surface px-4 py-2.5 text-xs text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}