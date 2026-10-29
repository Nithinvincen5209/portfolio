import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Absolute URLs for canonical links, OG images and the sitemap all derive from
// this. Set NEXT_PUBLIC_SITE_URL to the deployed origin (e.g. the .vercel.app
// URL, or a custom domain) so shares and crawlers get correct absolute URLs.
// It falls back to localhost so a local dev build never emits a link to a host
// that does not belong to this project.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Shared by the page metadata and the generated OG/Twitter tags. Kept as one
// string so a rewrite cannot leave the two out of sync.
const description =
  "Unity developer with eight months of professional experience building " +
  "gameplay systems, UI and interactive audio. Four shipped Windows games, " +
  "four browser builds, and public source for a 3D shooter.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  // NO canonical here on purpose.
  //
  // This used to carry `alternates: { canonical: "/" }`, and because metadata is
  // merged down the tree, every route inherited it: all eight case studies, /work
  // and /about each emitted a canonical pointing at the homepage. That is a
  // "this page is a duplicate of /" instruction, so the one thing a portfolio
  // cannot afford is for its case studies to be de-indexed in favour of the home
  // page. Each route now declares its own canonical.
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-5xl px-5 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
