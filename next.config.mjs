import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  turbopack: {},
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
});
