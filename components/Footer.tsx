import Link from "next/link";
import { profile } from "@/data/projects";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted">
        <div className="space-y-1">
          <p>
            {profile.name} — {profile.role}
          </p>
          <p className="text-xs">{profile.location}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4">
          <a className="link" href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="link" href={profile.itch} target="_blank" rel="noreferrer noopener">
            itch.io
          </a>
          <Link className="link" href={profile.resumePdf} download>
            Resume
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto w-full max-w-5xl px-5 py-4 text-xs text-muted/70">
          © {year} {profile.name}. Built with Next.js. Game footage is recorded
          from the hardware the software runs on.
        </p>
      </div>
    </footer>
  );
}