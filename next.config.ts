import type { NextConfig } from "next";

const env = {
  production: {
    mapStudyHost: "https://api.mapstudy.edu.vn",
  },
  development: {
    mapStudyHost: "https://api.mapxdev.com",
  },
  local: {
    mapStudyHost: "http://localhost:3002",
  },
  local1: {
    mapStudyHost: "http://192.168.1.134:3002",
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: false,
  outputFileTracingRoot: __dirname,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
    "node-tikzjax",
  ],
  env: {
    APP_ENV: process.env.APP_ENV,
    ...env[process.env.APP_ENV ?? ""],
  },
};

export default nextConfig;
