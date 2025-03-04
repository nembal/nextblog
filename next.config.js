/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure basePath to match your nextblog.config.js
  basePath: '/blog',
  // Ensure images from external sources can be displayed
  images: {
    domains: [],
  },
  // Ensure MDX files are processed correctly
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig; 