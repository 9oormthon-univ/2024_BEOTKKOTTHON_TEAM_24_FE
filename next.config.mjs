import withPWA from 'next-pwa';

const PWA = withPWA({
  dest: 'build',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default PWA(nextConfig);
