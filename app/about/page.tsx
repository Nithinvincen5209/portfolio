import type { Metadata } from "next";
import { profile, skillGroups } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Unity developer with eight months of professional experience across " +
    "gameplay systems, UI, build and release, and interactive audio.",
  alternates: { canonical: "/about" },
};

const experience = {
  role: "Unity Developer (Intern)",
  org: "Remap Intelligence Solutions Pvt Ltd",
  location: "Kochi, Kerala",
  period: "Jan 2026 – Sep 2026",
  bullets: [
    "Shipped four Windows games as installers, owning gameplay, UI, packaging and release end to end.",
    "Built Block Strike, a procedural bubble-grid shooter with three difficulty tiers, combo scoring and floating-text feedback.",
    "Built Lumber Dash, a reflex game with streak-based difficulty scaling, parallax layers and particle feedback.",
    "Built Galaxy Flex, a wave-based shooter built on one generic object pool, shipped in a second D-Handle grip configuration.",
    "Implemented interactive audio in Wwise 2024.1.6 — gameplay Events, RTPCs and Switches driven from C#, with real-time parameters bound to player input.",
    "Packaged every application as an Inno Setup installer, and wrote the game design documents for each title.",
  ],
};

const education = [
  {
    period: "2024 – 2027 (expected)",
    role: "Bachelor of Computer Applications",
    org: "Indira Gandhi National Open University",
    body: "Studying alongside the internship.",
  },
  {
    period: "2023 – 2024",
    role: "Diploma in Audio Engineering",
    org: "Pune Seamedu School of Media",
    body:
      "Where the Wwise and real-time parameter work comes from: audio treated " +
      "as an interactive systems problem rather than only an asset problem.",
  },
  {
    period: "2025",
    role: "Certificate in Game Development",
    org: "Kochi Big Boy School of Gaming",
    body: "Short course completed before the internship.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted">
          Unity developer with eight months of professional experience, building
          gameplay systems that ship as working Windows builds.
        </p>
      </header>

      {/* Profile */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="prose-body">{profile.summary}</p>
        <p className="prose-body">
          The work I enjoy most sits under the game rather than on top of it:
          keeping a system predictable when it is under load, making sure a build
          can be installed by someone who did not write it, and treating audio as
          feedback the player can read. That order — systems, then feel — is the
          one I have shipped in.
        </p>
        <p className="prose-body">
          Outside the internship I publish smaller browser builds on itch.io and
          keep a 3D survival shooter in public with its Wwise definitions
          included, so the audio and AI work can be read as code rather than
          taken on trust.
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="card space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-medium text-text">{experience.role}</p>
              <p className="text-sm text-muted">
                {experience.org} · {experience.location}
              </p>
            </div>
            <p className="font-mono text-xs text-muted">{experience.period}</p>
          </div>
          <ul className="space-y-2 pt-1">
            {experience.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
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

      {/* Education */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold">Education</h2>
        <ol className="space-y-5 border-l border-border pl-5">
          {education.map((t) => (
            <li key={`${t.period}-${t.role}`} className="relative">
              <span
                className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
                aria-hidden
              />
              <p className="font-mono text-xs text-muted">{t.period}</p>
              <p className="mt-0.5 font-medium">
                {t.role}
                <span className="text-muted"> · {t.org}</span>
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
            Each repository contains the game&apos;s own scripts and, for Zombie
            Shooter, the project&apos;s Wwise Event and Switch definitions.
          </li>
          <li>
            <span className="text-text">Gameplay video is recorded, not mocked up.</span>{" "}
            The shipped games are shown running as the builds that went out.
          </li>
          <li>
            <span className="text-text">Products appear under their shipped names.</span>{" "}
            Not the Unity folder or repository name.
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
