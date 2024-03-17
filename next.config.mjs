import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  dest: 'build',
};

export default withPWA(nextConfig);
