interface Props {
  images: string[];
  title: string;
  /** Stable id source. Slugs are unique; titles are not guaranteed to be. */
  slug: string;
}

/**
 * Screenshot gallery. Renders nothing when there are no images, so a project
 * with only a video does not get an empty heading.
 *
 * A deliberately simple grid rather than a lightbox: the images are a secondary
 * artefact here, and the video is the primary proof. A lightbox would add JS, a
 * focus trap and keyboard handling for marginal gain.
 */
export default function ImageGallery({ images, title, slug }: Props) {
  if (!images || images.length === 0) return null;

  const headingId = `gallery-${slug}`;

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={headingId}
          className="text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Screenshots
        </h2>
        <span className="font-mono text-xs text-muted/70">{images.length}</span>
      </div>
      <div
        className={`grid gap-3 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {images.map((src, i) => (
          <figure
            key={src}
            className="overflow-hidden rounded-lg border border-border bg-surface2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} gameplay screenshot ${i + 1} of ${images.length}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}