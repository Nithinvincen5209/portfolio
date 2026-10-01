"use client";

import { useState } from "react";

interface Props {
  /** itch.io page, e.g. https://nitinvincent.itch.io/ufo-lander */
  itchUrl: string;
  title: string;
}

/**
 * Click-to-load itch.io embed.
 *
 * The iframe is not in the DOM until the visitor asks for it. itch.io's embed
 * pulls in their player plus a sizeable payload, and more importantly it fires
 * third-party requests on page load, which is both a privacy cost and a
 * performance cost on a portfolio somebody opens on a slow connection. Only the
 * genuinely playable games get this; hardware-dependent projects never render
 * it at all.
 */
export default function PlayableEmbed({ itchUrl, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const embedSrc = `${itchUrl.replace(/\/$/, "")}/embed`;

  if (!loaded) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-good/40 bg-good/5 text-left"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-good/15 pl-1 text-2xl text-good transition-transform group-hover:scale-105">
              ▶
            </span>
            <span className="chip !border-good/40 !text-good">
              playable in browser
            </span>
            <span className="text-sm text-muted">
              Click to load — nothing is downloaded from itch.io until you do
            </span>
          </div>
        </button>
        <a
          className="link text-sm"
          href={itchUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Or open {title} directly on itch.io ↗
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          src={embedSrc}
          title={`${title} — playable game`}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>
          Loading from{" "}
          <a
            className="link"
            href={itchUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            itch.io
          </a>
        </span>
        <button
          type="button"
          onClick={() => setLoaded(false)}
          className="link"
        >
          Unload
        </button>
      </div>
    </div>
  );
}