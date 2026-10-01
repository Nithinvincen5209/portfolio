import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="chip">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="max-w-prose text-sm text-muted">
        That project does not exist, or its slug changed.
      </p>
      <div className="flex gap-3">
        <Link href="/games" className="btn">
          Browse projects
        </Link>
        <Link href="/" className="btn">
          Home
        </Link>
      </div>
    </div>
  );
}