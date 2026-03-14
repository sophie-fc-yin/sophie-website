/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained build for Docker deployment.
  // On Vercel this is ignored — Vercel uses its own output format.
  output: 'standalone',
};

export default nextConfig;
