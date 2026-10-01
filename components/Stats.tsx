interface Props {
  stats: { label: string; value: string }[];
}

/** Verified numbers. Values come from the projects themselves, not estimates. */
export default function Stats({ stats }: Props) {
  if (!stats || stats.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="card !p-4">
          <dd className="font-mono text-xl font-semibold text-accent">
            {s.value}
          </dd>
          <dt className="mt-1 text-xs leading-tight text-muted">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}