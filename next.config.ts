import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Keep the existing Sites/Cloudflare build unchanged unless the Pages
  // workflow opts in. Asset URLs are prefixed in the exported artifact.
  ...(githubPagesBasePath
    ? {
        output: "export" as const,
      }
    : {}),
};

export default nextConfig;
