import Link from "next/link";
import { profile } from "@/data/projects";

const nav = [
  { href: "/games", label: "Games" },
  { href: "/clinical-tools", label: "Clinical Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-semibold tracking-tight">{profile.name}</span>
          <span className="hidden text-xs text-muted sm:inline">
            {profile.role}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded px-2.5 py-1.5 text-muted transition-colors hover:bg-surface2 hover:text-text"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={profile.resumePdf}
            className="btn ml-1 !py-1.5 text-xs"
            download
          >
            Resume PDF
          </Link>
        </nav>
      </div>
    </header>
  );
}