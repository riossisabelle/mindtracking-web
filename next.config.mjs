/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Gera build leve para Docker
  output: 'standalone',

  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
