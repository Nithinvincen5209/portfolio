"use client";

import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
  /** Poster image shown before the video loads. */
  poster?: string;
  /** Local seconds to seek to for the poster frame, shown in the hint. */
  posterAtSeconds?: number;
  /** True while the id is still the PENDING_ placeholder. */
  pending?: boolean;
}

export default function VideoPlayer({
  youtubeId,
  title,
  poster,
  posterAtSeconds,
  pending = false,
}: Props) {
  const [playing, setPlaying] = useState(false);

  if (pending) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-warn/40 bg-warn/5 p-6 text-center">
        <span className="chip !border-warn/40 !text-warn">video pending</span>
        <p className="max-w-sm text-sm text-muted">
          Gameplay recording for <span className="text-text">{title}</span> is
          ready to publish. It will appear here once uploaded.
        </p>
      </div>
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
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bg/80 pl-1 text-2xl text-text backdrop-blur transition-transform group-hover:scale-105">
            ▶
          </span>
        </span>
        {posterAtSeconds ? (
          <span className="absolute bottom-2 right-2 rounded bg-bg/80 px-1.5 py-0.5 font-mono text-[10px] text-muted">
            poster @ {posterAtSeconds}s
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
      <iframe
        // youtube-nocookie does not set tracking cookies until playback.
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}