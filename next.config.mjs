/**
 * Stream - Decentralized Live Events Platform
 * Next.js Configuration
 *
 * This configuration handles webpack externals for WalletConnect compatibility
 * and other Next.js optimizations for the Stream platform.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
