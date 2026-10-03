import type { Metadata } from "next";
import { profile, skillGroups } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Unity developer with eight months of professional experience shipping " +
    "therapeutic games and clinical tools for rehabilitation hardware.",
};

const timeline = [
  {
    period: "2026 — present",
    role: "Unity Developer (Intern)",
    org: "Remap Intelligence Solutions",
    body:
      "Own gameplay, device integration, packaging and release end to end " +
      "across nine Windows applications for a rehabilitation-engineering " +
      "client: three therapeutic arcade games and six clinical assessment " +
      "tools. Built the Python serial-to-TCP bridge that carries patient " +
      "movement into Unity, and packaged every application as an Inno Setup " +
      "installer.",
  },
  {
    period: "2023 — 2024",
    role: "Diploma in Audio Engineering",
    org: "Pune Seamedu School of Media",
    body:
      "Audio engineering qualification, which is where the Wwise and real-time " +
      "parameter work comes from — audio is treated here as an interactive " +
      "systems problem rather than only an asset problem.",
  },
  {
    period: "2024 — present",
    role: "Bachelor of Computer Applications",
    org: "Indira Gandhi National Open University",
    body:
      "Studying alongside the internship.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted">
          Unity developer with eight months of professional experience, working
          where game development and hardware integration have to coexist.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What I work on</h2>
        <p className="prose-body">
          The interesting problem in therapeutic game development is not the game.
          It is that the input arrives from a sensor on a serial port while the
          render loop is running, and the patient in front of the screen cannot
          buffer or retry. Everything else — procedural generation, object
          pooling, parallax — is secondary to keeping the frame steady and the
          input honest.
        </p>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.heading} className="card">
              <h3 className="mb-2 text-sm font-semibold text-text">
                {g.heading}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <ol className="space-y-5 border-l border-border pl-5">
          {timeline.map((t) => (
            <li key={`${t.period}-${t.role}`} className="relative">
              <span
                className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
                aria-hidden
              />
              <p className="font-mono text-xs text-muted">{t.period}</p>
              <p className="mt-0.5 font-medium">
                {t.role}
                {t.org ? (
                  <span className="text-muted"> · {t.org}</span>
                ) : null}
              </p>
              <p className="prose-body mt-1">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Evidence */}
      <section className="space-y-4 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-xl font-semibold">What is verifiable here</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>
            <span className="text-text">Source for two projects is public.</span>{" "}
            Each repository contains the game's own scripts and, for Zombie
            Shooter, the project's Wwise Event and Switch definitions.
          </li>
          <li>
            <span className="text-text">
              Gameplay video is recorded, not mocked up.
            </span>{" "}
            The therapeutic games are shown running on the hardware they were
            built for.
          </li>
          <li>
            <span className="text-text">
              Some projects were never built for the browser.
            </span>{" "}
            The therapeutic games were delivered to clinics as Windows
            installers, so those pages show video rather than an embed instead
            of a button that would go nowhere.
          </li>
          <li>
            <span className="text-text">Products ship under their real names.</span>{" "}
            Games appear here under the name they were shipped as, not the Unity
            folder or repository name.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <ul className="space-y-1.5 text-sm">
          <li>
            <span className="text-muted">Email · </span>
            <a className="link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <span className="text-muted">GitHub · </span>
            <a
              className="link"
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.github.replace("https://", "")}
            </a>
          </li>
          <li>
            <span className="text-muted">LinkedIn · </span>
            <a
              className="link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.linkedin.replace("https://", "")}
            </a>
          </li>
          <li>
            <span className="text-muted">itch.io · </span>
            <a
              className="link"
              href={profile.itch}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.itch.replace("https://", "")}
            </a>
          </li>
          <li>
            <span className="text-muted">Location · </span>
            {profile.location}
          </li>
        </ul>
      </section>
    </div>
  );
}