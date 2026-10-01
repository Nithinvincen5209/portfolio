interface Props {
  images: string[];
  title: string;
}

/**
 * Screenshot gallery. Renders nothing when there are no images, so a project
 * with only a video does not get an empty heading.
 *
 * This is a deliberately simple grid rather than a lightbox: the images are a
 * secondary artefact here, and the gameplay video is the primary proof. A
 * lightbox would add JS, a focus trap and keyboard handling for marginal gain.
 */
export default function ImageGallery({ images, title }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <section aria-labelledby={`gallery-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <h2
        id={`gallery-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
      >
        Screenshots
      </h2>
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