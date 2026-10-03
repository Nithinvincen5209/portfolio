"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** itch.io project page, e.g. https://nitinvincent.itch.io/ufo-lander */
  itchUrl: string;
  /**
   * Numeric embed id from itch.io's embed code. The iframe must point at
   * https://itch.io/embed/{id}, NOT at `{itchUrl}/embed` -- the latter is an
   * itch.io help page that sends `X-Frame-Options: SAMEORIGIN`, which makes the
   * browser refuse to frame it from another origin.
   */
  itchEmbedId: string;
  title: string;
}

/** How long to wait for the embed before offering the direct link instead. */
const STALL_MS = 12000;

/**
 * Click-to-load itch.io embed.
 *
 * The iframe is not in the DOM until the visitor asks for it. itch.io's player
 * pulls in their own JS and fires third-party requests, which is a privacy and
 * a performance cost on a portfolio somebody opens on hotel wifi. Only the
 * genuinely playable games get this; hardware-dependent projects never render it.
 */
export default function PlayableEmbed({ itchUrl, itchEmbedId, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [stalled, setStalled] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  // A cross-origin iframe reports nothing useful: a refused frame and a slow
  // frame are indistinguishable from the parent. The load event is the one
  // reliable signal, so a timer is the only fallback available. This also covers
  // networks where itch.io is unreachable over IPv6.
  useEffect(() => {
    if (!loaded || stalled) return;
    const timer = setTimeout(() => setStalled(true), STALL_MS);
    return () => clearTimeout(timer);
  }, [loaded, stalled]);

  const embedSrc = `https://itch.io/embed/${itchEmbedId}`;

  if (!loaded) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-good/40 bg-good/5 text-left transition-colors hover:border-good"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-good/15 pl-1 text-3xl text-good transition-transform group-hover:scale-105">
              ▶
            </span>
            <span className="chip !border-good/40 !text-good">
              playable in browser
            </span>
            <span className="text-sm text-muted">
              Click to load {title}
              <br />
              <span className="text-xs text-muted/70">
                Nothing is requested from itch.io until you do
              </span>
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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          ref={frameRef}
          src={embedSrc}
          title={`${title} — playable in browser`}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          onLoad={() => setStalled(false)}
          className="h-full w-full"
        />
      </div>

      {stalled ? (
        <p
          role="status"
          className="rounded border border-warn/30 bg-warn/5 p-3 text-sm text-muted"
        >
          The game is taking longer than expected to load, or this network is
          blocking itch.io.{" "}
          <a
            className="link"
            href={itchUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Open {title} on itch.io
          </a>{" "}
          instead.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>
          Playing from{" "}
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
          onClick={() => {
            setLoaded(false);
            setStalled(false);
          }}
          className="link"
        >
          Unload
        </button>
      </div>
    </div>
  );
}