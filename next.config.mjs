/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/LocalJobs",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
