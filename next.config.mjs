const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
