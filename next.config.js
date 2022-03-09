/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    })
    return config
  },
  pageExtensions: [
    // `.page.tsx` for page components
    "page.tsx",
    // `.api.ts` for API routes
    "api.ts",
  ],
}

module.exports = nextConfig
