import type { Metadata } from "next";
import { clinicalTools } from "@/data/projects";

export const metadata: Metadata = {
  title: "Clinical Tools",
  description:
    "Grip, pinch and range-of-motion assessment applications built for a " +
    "rehabilitation-engineering client and shipped as Windows installers.",
};

export default function ClinicalToolsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Clinical assessment tools</h1>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">
          Beside the therapeutic games, the same engagement delivered a set of
          desktop assessment applications for therapists. Each ships as its own
          Windows installer so a clinic can deploy it without a build pipeline,
          and each has a measurement variant plus a non-measurement variant used
          for calibration and setup.
        </p>
      </header>

      {/* Windows only, stated before the list rather than after. */}
      <aside className="rounded-lg border border-warn/30 bg-warn/5 p-5">
        <h2 className="mb-1.5 text-sm font-semibold text-warn">
          Desktop software, not browser software
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          These are Windows executables installed on clinic machines and read
          from serial hardware. There is no browser build and no demo, so there
          is nothing to click on this page — the installers themselves are the
          deliverable.
        </p>
      </aside>

      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clinicalTools.map((t) => (
            <div key={t.name} className="card flex flex-col gap-2">
              <h2 className="text-base font-semibold">{t.name}</h2>
              <p className="text-sm text-muted">{t.measures}</p>
              <dl className="mt-auto space-y-1 pt-2 text-xs text-muted">
                <div className="flex justify-between gap-2">
                  <dt>Variants</dt>
                  <dd className="font-mono">
                    {t.hasNonMeasurementVariant
                      ? "measurement + non-measurement"
                      : "measurement"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Installer</dt>
                  <dd className="font-mono">{t.installerSizeMb} MB</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-body space-y-3 border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-text">
          Where this fits
        </h2>
        <p>
          Together with the three therapeutic games, these were{" "}
          <span className="text-text">nine Windows applications</span> delivered
          under one engagement — three games and six clinical tools, each
          packaged as an Inno Setup installer. Gameplay, device integration,
          packaging and release were all owned end to end.
        </p>
        <p>
          One of the games also shipped in a D-Handle build, a controller coupler
          for patients with a constrained grip, which is the kind of hardware
          variation the whole toolset was built around.
        </p>
      </section>
    </div>
  );
}