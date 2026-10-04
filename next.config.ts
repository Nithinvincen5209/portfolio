import type { NextConfig } from "next";

const config: NextConfig = {
  /**
   * /games and /clinical-tools were folded into /work so that one client domain
   * no longer holds a permanent slot in the navigation. Both are redirected
   * rather than deleted: the pages have been public since the site launched and
   * are already linked from the resume PDF, the GitHub README and search
   * results, and a 404 on a link a recruiter may have already opened is worse
   * than the duplication it avoids.
   */
  async redirects() {
    return [
      { source: "/games", destination: "/work", permanent: true },
      // Case studies moved with the index. /games/block-strike and friends were
      // public from launch, so each slug needs its own rule; the index redirect
      // above does not cover them.
      { source: "/games/:slug", destination: "/work/:slug", permanent: true },
      { source: "/clinical-tools", destination: "/work", permanent: true },
    ];
  },
};

export default config;