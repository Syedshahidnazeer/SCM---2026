const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return {
    reactStrictMode: true,
    distDir: isDev ? ".next-dev" : ".next",
    output: isDev ? undefined : "export",
    trailingSlash: !isDev,
    basePath,
    assetPrefix: basePath || undefined,
    images: {
      unoptimized: true
    }
  };
};
