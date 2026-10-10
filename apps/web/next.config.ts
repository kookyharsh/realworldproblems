import "@RealWorldProjects/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  /*
  // Optional: If HMR continues to fail on ngrok, you can try this:
  webpack: (config, { isServer }) => {
    if (!isServer && config.devServer) {
      config.devServer.client = {
        webSocketURL: 'auto://0.0.0.0:0/_next/webpack-hmr',
      };
    }
    return config;
  },
  */
};

export default nextConfig;
