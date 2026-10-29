import type { MetadataRoute } from "next";
import { allSlugs } from "@/data/projects";

// Absolute URLs are required in a sitemap, so this derives from the same env
// var as metadataBase. Without NEXT_PUBLIC_SITE_URL set in the deploy, the
// sitemap would point at localhost, so keep that var configured in Vercel.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/work", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = allSlugs().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
