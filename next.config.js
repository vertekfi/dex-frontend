/** @type {import('next').NextConfig} */
const path = require('path');
const transpiled = require('next-transpile-modules')(['echarts', 'zrender']);

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.resolve.alias['~'] = path.join(__dirname, 'src');
    return config;
  },

  images: {
    domains: ['avatar.tobi.sh'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/**',
      },
    ],
  },
};

module.exports = transpiled(nextConfig);
