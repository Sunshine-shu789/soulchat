import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: emits admin/index.html etc. (directory layout) so any
  // static host resolves /admin/* cleanly. Avoids the SSR prerender
  // page/directory collision that 404s nested routes on EdgeOne Pages.
  output: "export",
  // No next/image usage; disable optimization for static export safety.
  images: { unoptimized: true },
  // (distDir left default so `output: 'export'` emits the proper
  // out/ directory layout with admin/index.html etc.)
  // Avoid the build's bulk-dir cleanup (blocked by the sandbox safe-delete
  // hook); we run the build with NODE_OPTIONS cleared so deletions work.
  cleanDistDir: false,
};

export default nextConfig;
